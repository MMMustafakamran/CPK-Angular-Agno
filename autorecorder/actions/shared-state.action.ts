/**
 * Shared state — the browser writes agent state, then the agent reads it back.
 *
 * https://docs.copilotkit.ai/angular/agno/guides/shared-state
 *
 * Clicking "Mark high priority" before prompting is what makes the answer
 * evidence: the agent can only say "high" if the write reached it, so the video
 * shows the round trip rather than a plausible sentence.
 */
import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

export const runSharedStateAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  console.log(`   🔄 Writing state from the browser first...`);
  const priorityBtn = page
    .locator('app-workspace button:has-text("Mark high priority")')
    .first();

  const btnBox = await priorityBtn.boundingBox().catch(() => null);
  if (btnBox) {
    await humanGlide(page, btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2, 20);
    await sleep(400);
    await humanClick(page);
    await sleep(1000);
  } else {
    console.warn(`   ⚠️ "Mark high priority" not found — the agent will read the default state.`);
  }

  const msgCount = await sendPrompt(page, config.prompt);
  await waitForAgentResponseCompletion(page, config.waitAfterPromptMs ?? 4000, msgCount);

  // The two read-only context components are the guide's other half — nothing
  // to click, so the cursor just rests on them.
  const accountContext = page.locator('app-account-context').first();
  const ctxBox = await accountContext.boundingBox().catch(() => null);
  if (ctxBox) {
    console.log(`   🎯 Resting on the read-only context components.`);
    await humanGlide(page, ctxBox.x + ctxBox.width / 2, ctxBox.y + ctxBox.height / 2, 22);
    await sleep(1500);
  }
};
