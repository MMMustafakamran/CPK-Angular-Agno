/**
 * Shared state — the browser writes agent state, then the agent reads it back.
 *
 * https://docs.copilotkit.ai/angular/agno/guides/shared-state
 *
 * The old single-turn version proved too little. It wrote `priority: high`
 * once, asked one question, and accepted a sentence containing "high" as the
 * pass. That answer is reachable without the write ever landing — the word is
 * in the question — so a broken round-trip and a working one produced the same
 * clip.
 *
 * This drives four phases instead, each one an observation the next depends on:
 *
 *   1. BASELINE   ask before writing anything. The agent must say `normal`,
 *                 the state's initial value. A "high" here means the model is
 *                 guessing and every later phase is worthless.
 *   2. WRITE HIGH press the guide's button, confirm the diagnostics panel logs
 *                 a browser-sourced transition, then ask again.
 *   3. WRITE LOW  press the other button and ask again. Two different values in
 *                 sequence is what separates a real read from a lucky guess.
 *   4. CONTEXT    switch the timezone and ask about username + timezone, which
 *                 exercises the read-only accessor rather than state.
 *
 * The diagnostics strip (`app-shared-state-diagnostics`, harness-only) is on
 * screen throughout, so the clip shows each write landing in the store *before*
 * the agent is asked about it. When a phase fails, the panel says whether the
 * browser write was lost or the agent ignored a state it demonstrably had.
 */
import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

/** Read the diagnostics panel's live state JSON, for the run log. */
async function readDiagState(page: Page): Promise<string> {
  return page
    .locator('[data-testid="diag-state"]')
    .first()
    .innerText()
    .then((t) => t.replace(/\s+/g, ' ').trim())
    .catch(() => '(diagnostics panel not found)');
}

/** How many transitions the panel has logged so far. */
async function countTransitions(page: Page): Promise<number> {
  return page
    .locator('[data-testid="diag-log"] li')
    .count()
    .catch(() => 0);
}

/** Click a button the way a person would, and say so if it is missing. */
async function pressButton(
  page: Page,
  selector: string,
  label: string,
): Promise<boolean> {
  const button = page.locator(selector).first();
  const box = await button.boundingBox().catch(() => null);
  if (!box) {
    console.warn(`   ⚠️ "${label}" not found — skipping this phase.`);
    return false;
  }
  await humanGlide(page, box.x + box.width / 2, box.y + box.height / 2, 20);
  await sleep(400);
  await humanClick(page);
  await sleep(900);
  return true;
}

/** Rest the cursor on the diagnostics panel so the clip reads the evidence. */
async function restOnDiagnostics(page: Page, ms = 1600): Promise<void> {
  const box = await page
    .locator('app-shared-state-diagnostics')
    .first()
    .boundingBox()
    .catch(() => null);
  if (!box) return;
  await humanGlide(page, box.x + box.width / 2, box.y + 40, 22);
  await sleep(ms);
}

/**
 * One turn: ask, wait for the reply, then log what the store held at the moment
 * the question was asked. The pairing is the diagnostic — an answer is only
 * meaningful next to the state that produced it.
 */
async function ask(
  page: Page,
  phase: string,
  prompt: string,
  waitMs: number,
): Promise<void> {
  const state = await readDiagState(page);
  console.log(`   ❓ [${phase}] state at ask time: ${state}`);
  const before = await sendPrompt(page, prompt);
  await waitForAgentResponseCompletion(page, waitMs, before);
}

export const runSharedStateAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  const waitMs = config.waitAfterPromptMs ?? 4000;
  const [baselineQ, highQ, lowQ, contextQ] = promptSet(config);

  // ── 1. Baseline ──────────────────────────────────────────────────────────
  // Nothing written yet. The answer here is the control.
  console.log(`   🧪 [1/4] Baseline — asking before any browser write.`);
  await restOnDiagnostics(page, 1200);
  await ask(page, 'baseline', baselineQ, waitMs);

  // ── 2. Browser writes high ───────────────────────────────────────────────
  console.log(`   🔄 [2/4] Writing priority=high from the browser...`);
  const beforeHigh = await countTransitions(page);
  const pressedHigh = await pressButton(
    page,
    'app-workspace button:has-text("Mark high priority")',
    'Mark high priority',
  );
  if (pressedHigh) {
    const afterHigh = await countTransitions(page);
    console.log(
      afterHigh > beforeHigh
        ? `   ✓ store logged the write (${beforeHigh} → ${afterHigh} transitions)`
        : `   ⚠️ no transition logged — the write did not reach the store`,
    );
    await restOnDiagnostics(page, 1400);
  }
  await ask(page, 'after high', highQ, waitMs);

  // ── 3. Browser writes low ────────────────────────────────────────────────
  // The second value is what makes this a read rather than a coincidence.
  console.log(`   🔄 [3/4] Writing priority=low from the browser...`);
  const beforeLow = await countTransitions(page);
  const pressedLow = await pressButton(
    page,
    'app-workspace button:has-text("Mark low priority")',
    'Mark low priority',
  );
  if (pressedLow) {
    const afterLow = await countTransitions(page);
    console.log(
      afterLow > beforeLow
        ? `   ✓ store logged the write (${beforeLow} → ${afterLow} transitions)`
        : `   ⚠️ no transition logged — the write did not reach the store`,
    );
    await restOnDiagnostics(page, 1400);
  }
  await ask(page, 'after low', lowQ, waitMs);

  // ── 4. Read-only context ─────────────────────────────────────────────────
  // A different mechanism from the three above: the accessor re-registers when
  // its signal changes, and nothing is written to agent state at all.
  console.log(`   🌍 [4/4] Switching the account timezone to Europe/London...`);
  await pressButton(
    page,
    'app-account-context button:has-text("Use London time")',
    'Use London time',
  );
  await ask(page, 'context', contextQ, waitMs);

  console.log(`   📋 final state: ${await readDiagState(page)}`);
  await restOnDiagnostics(page, 2000);
};

/**
 * Four prompts, in phase order. `config.prompt` is the first turn by the
 * recorder's own convention, so it seeds phase 1; the rest fall back to
 * literals rather than sending `undefined` if `prompts[]` is ever short.
 */
function promptSet(config: PageRecordConfig): [string, string, string, string] {
  const p = config.prompts ?? [];
  return [
    p[0] ?? config.prompt,
    p[1] ?? 'I just changed it. What priority is my workspace set to now?',
    p[2] ?? 'I changed it again. What is the priority now?',
    p[3] ??
      'What is my username and timezone, and what priority is my workspace set to?',
  ];
}
