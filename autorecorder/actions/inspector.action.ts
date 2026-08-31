import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

/**
 * Driving the CopilotKit Inspector.
 *
 * The Inspector is a Lit web component (`@copilotkit/web-inspector`) whose nav
 * lives behind NESTED shadow roots, so `document.querySelector` cannot see it
 * and a one-level shadow walk finds only the outer host. Matching `div`/`span`
 * on `textContent` resolves to whichever ancestor container happens to contain
 * the words -- a panel wrapper, not the nav button. Clicking that wrapper's
 * centre is a no-op, and the cursor lands mid-panel: the clip looks like it did
 * something and has not.
 *
 * Three rules follow, and they are why this file looks the way it does:
 *
 *   1. **Walk shadow roots recursively.** One level is not enough.
 *   2. **Target `data-inspector-menu-key`, never text.** The nav renders that
 *      attribute on each leaf button. Labels are translated, renamed between
 *      releases, and duplicated on containers; the key is none of those things.
 *   3. **Click with a real mouse at resolved coordinates.** `el.click()` fires
 *      the handler without moving the cursor overlay, so the video shows a
 *      panel changing with no visible interaction.
 *
 * And one rule about honesty: assert the panel actually became active, and
 * throw if it did not. A recording that quietly skips the single interaction it
 * exists to show is worse than a failed one, because it looks like a pass.
 *
 * -- Which panels, for THIS repo -------------------------------------------
 * The Angular quickstart's confirm-setup step names two, in order: open
 * **Agents** and see the agent listed, then send a message and watch **AG-UI
 * Events** move. This action does both in that order, because reproducing the
 * documented steps is the test.
 *
 * A sibling repo's version of this file skips `agents` on the grounds that it
 * renders empty for a single-agent app. That reasoning does not transfer here:
 * this runtime declares two agents (`default` and `support`), and an empty
 * Agents panel would be a finding about the doc's step, not a reason to film a
 * different panel. So it is opened, and whatever it shows is what the clip
 * shows.
 *
 * -- Why the shadow walks below are LOOPS, not recursive functions ----------
 * Every walk is an explicit stack loop containing NO named inner function, and
 * that is load-bearing.
 *
 * `page.evaluate` serialises its callback and ships the source to the browser.
 * tsx compiles this suite through esbuild with `keepNames`, which rewrites any
 * named function binding -- `const walk = (root) => ...` included -- into a
 * call to esbuild's `__name` helper. That helper is injected into the Node
 * module scope and does not exist in the page, so such a callback dies on
 * arrival with `ReferenceError: __name is not defined`.
 *
 * If you add another `page.evaluate` in this suite: no named functions inside
 * it, and do not wrap it in a `.catch()` that hides this class of failure.
 *
 * -- Version floor ---------------------------------------------------------
 * `data-inspector-menu-key` exists in @copilotkit/web-inspector 1.69.x, which
 * `@copilotkit/angular@0.4.0` pins exactly. On 0.3.1 the framework does not
 * mount the Inspector at all, so the throws below are the correct outcome
 * there rather than a silent fallback to text matching.
 */

/** Nav keys the Inspector renders. All seven verified present in 1.69.3. */
export type InspectorMenuKey =
  | 'agents'
  | 'ag-ui-events'
  | 'agent-context'
  | 'frontend-tools'
  | 'capabilities'
  | 'threads'
  | 'memories';

/**
 * Opens the Inspector overlay. Returns false when no trigger is on screen.
 *
 * Two ways in, because the launcher's internals are not part of any contract:
 * an explicit trigger button inside the shadow roots, and failing that the
 * `cpk-web-inspector` host itself -- what the framework appends to
 * `document.body`, and what the guide tells the reader to click.
 */
export async function openInspector(page: Page): Promise<boolean> {
  console.log(`   Opening CopilotKit Inspector overlay...`);
  const triggerPos = await page.evaluate(() => {
    const stack: (Document | ShadowRoot)[] = [document];
    const seen = new Set<Document | ShadowRoot>();
    let btn: HTMLElement | null = null;
    while (stack.length > 0) {
      const root = stack.pop();
      if (!root || seen.has(root)) continue;
      seen.add(root);
      btn = root.querySelector(
        'button[aria-label*="Inspector" i], button[aria-label*="Console" i], #trigger, .trigger',
      ) as HTMLElement | null;
      if (btn) break;
      for (const el of Array.from(root.querySelectorAll('*'))) {
        if (el.shadowRoot) stack.push(el.shadowRoot);
      }
    }
    if (!btn) {
      // Fall back to the host element the framework mounts. The launcher fills
      // the host's box, so the host's centre is the launcher's centre.
      const host = document.querySelector('cpk-web-inspector');
      if (!host) return null;
      const hr = host.getBoundingClientRect();
      if (hr.width === 0 || hr.height === 0) return null;
      return { x: hr.left + hr.width / 2, y: hr.top + hr.height / 2 };
    }
    const r = btn.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  if (!triggerPos) {
    console.warn(
      '   [!] Inspector trigger not found. The framework mounts it only in a ' +
        'development browser build, and only when `enableInspector` is not ' +
        'false -- check provideCopilotKit in src/app/app.config.ts.',
    );
    return false;
  }

  await humanGlide(page, triggerPos.x, triggerPos.y, 22);
  await humanClick(page);
  await sleep(2500);
  return true;
}

/**
 * Selects one Inspector nav panel and proves it became active.
 *
 * Leaves live inside collapsible groups, so a leaf that is not in the DOM yet
 * is looked for again after opening each group. Groups toggle, so they are only
 * touched when the leaf is genuinely missing -- clicking them all up front
 * would close whichever one was already open.
 *
 * @throws if the nav item cannot be found, or does not go active once clicked.
 */
export async function openInspectorPanel(
  page: Page,
  menuKey: InspectorMenuKey,
): Promise<void> {
  const locate = async (): Promise<{ x: number; y: number } | null> =>
    page.evaluate((key) => {
      const stack: (Document | ShadowRoot)[] = [document];
      const seen = new Set<Document | ShadowRoot>();
      let tab: HTMLElement | null = null;
      while (stack.length > 0) {
        const root = stack.pop();
        if (!root || seen.has(root)) continue;
        seen.add(root);
        tab = root.querySelector(
          `button[data-inspector-menu-key="${key}"]`,
        ) as HTMLElement | null;
        if (tab) break;
        for (const el of Array.from(root.querySelectorAll('*'))) {
          if (el.shadowRoot) stack.push(el.shadowRoot);
        }
      }
      if (!tab) return null;
      tab.scrollIntoView({ block: 'center', inline: 'center' });
      const r = tab.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return null;
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, menuKey);

  let pos = await locate();

  if (!pos) {
    // The leaf's group is collapsed. Open groups one at a time, re-checking
    // after each, so an already-open group is never toggled shut.
    const groups: string[] = await page.evaluate(() => {
      const stack: (Document | ShadowRoot)[] = [document];
      const seen = new Set<Document | ShadowRoot>();
      const out: string[] = [];
      while (stack.length > 0) {
        const root = stack.pop();
        if (!root || seen.has(root)) continue;
        seen.add(root);
        for (const el of Array.from(
          root.querySelectorAll(
            'button[data-inspector-group]:not([data-inspector-menu-key])',
          ),
        )) {
          const g = el.getAttribute('data-inspector-group');
          if (g && !out.includes(g)) out.push(g);
        }
        for (const el of Array.from(root.querySelectorAll('*'))) {
          if (el.shadowRoot) stack.push(el.shadowRoot);
        }
      }
      return out;
    });

    for (const group of groups) {
      await page.evaluate((g) => {
        const stack: (Document | ShadowRoot)[] = [document];
        const seen = new Set<Document | ShadowRoot>();
        while (stack.length > 0) {
          const root = stack.pop();
          if (!root || seen.has(root)) continue;
          seen.add(root);
          const hit = root.querySelector(
            `button[data-inspector-group="${g}"]:not([data-inspector-menu-key])`,
          ) as HTMLElement | null;
          if (hit) {
            hit.click();
            return;
          }
          for (const el of Array.from(root.querySelectorAll('*'))) {
            if (el.shadowRoot) stack.push(el.shadowRoot);
          }
        }
      }, group);
      await sleep(600);
      pos = await locate();
      if (pos) break;
    }
  }

  if (!pos) {
    throw new Error(
      `[Inspector] Could not find the "${menuKey}" nav item ` +
        `(button[data-inspector-menu-key="${menuKey}"]) in any shadow root. ` +
        'Either the nav markup changed, or @copilotkit/web-inspector is older ' +
        'than 1.69 and does not carry the attribute at all.',
    );
  }

  console.log(
    `   Target "${menuKey}" at (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
  );
  await humanGlide(page, pos.x, pos.y, 20);
  await humanClick(page);
  await sleep(1200);

  const active = await page.evaluate((key) => {
    const stack: (Document | ShadowRoot)[] = [document];
    const seen = new Set<Document | ShadowRoot>();
    let tab: HTMLElement | null = null;
    while (stack.length > 0) {
      const root = stack.pop();
      if (!root || seen.has(root)) continue;
      seen.add(root);
      tab = root.querySelector(
        `button[data-inspector-menu-key="${key}"]`,
      ) as HTMLElement | null;
      if (tab) break;
      for (const el of Array.from(root.querySelectorAll('*'))) {
        if (el.shadowRoot) stack.push(el.shadowRoot);
      }
    }
    return (
      tab?.getAttribute('aria-current') === 'page' ||
      !!tab?.className.includes('inspector-nav-control-active')
    );
  }, menuKey);

  if (!active) {
    throw new Error(
      `[Inspector] Clicked the "${menuKey}" nav item but it did not become ` +
        'active -- the panel did not switch.',
    );
  }
  console.log(`   "${menuKey}" panel is active.`);
}

/**
 * Picks an agent in the Inspector's sidebar selector.
 *
 * The quickstart's step is "Open **Agents**, then **Agent**. Your agent is
 * listed." Opening the Agent panel alone does not list anything -- it renders
 * "No agent selected" until an agent is chosen from
 * `[data-inspector-sidebar-agent-selector]`. That second interaction is what
 * this does, so the clip performs the documented step rather than half of it.
 *
 * The selector carries a data attribute; the options inside it do not, so they
 * are matched on exact trimmed text against the agent id. That is a weaker
 * hook than a key, and it is the reason this returns false rather than throwing
 * -- a renamed option should degrade the clip, not fail a run whose real
 * subject is the mount.
 */
export async function selectInspectorAgent(
  page: Page,
  agentId: string,
): Promise<boolean> {
  const openerPos = await page.evaluate(() => {
    const stack: (Document | ShadowRoot)[] = [document];
    const seen = new Set<Document | ShadowRoot>();
    let el: HTMLElement | null = null;
    while (stack.length > 0) {
      const root = stack.pop();
      if (!root || seen.has(root)) continue;
      seen.add(root);
      el = root.querySelector(
        '[data-inspector-sidebar-agent-selector]',
      ) as HTMLElement | null;
      if (el) break;
      for (const node of Array.from(root.querySelectorAll('*'))) {
        if (node.shadowRoot) stack.push(node.shadowRoot);
      }
    }
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  if (!openerPos) {
    console.warn('   [!] Agent selector not found in the sidebar.');
    return false;
  }

  await humanGlide(page, openerPos.x, openerPos.y, 20);
  await humanClick(page);
  await sleep(900);

  const optionPos = await page.evaluate((id) => {
    const stack: (Document | ShadowRoot)[] = [document];
    const seen = new Set<Document | ShadowRoot>();
    let hit: HTMLElement | null = null;
    while (stack.length > 0 && !hit) {
      const root = stack.pop();
      if (!root || seen.has(root)) continue;
      seen.add(root);
      for (const node of Array.from(
        root.querySelectorAll('button, [role="option"], li'),
      )) {
        if ((node.textContent || '').trim() === id) {
          hit = node as HTMLElement;
          break;
        }
      }
      for (const node of Array.from(root.querySelectorAll('*'))) {
        if (node.shadowRoot) stack.push(node.shadowRoot);
      }
    }
    if (!hit) return null;
    hit.scrollIntoView({ block: 'center', inline: 'center' });
    const r = hit.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, agentId);

  if (!optionPos) {
    console.warn(`   [!] No option matching the agent id "${agentId}".`);
    return false;
  }

  await humanGlide(page, optionPos.x, optionPos.y, 18);
  await humanClick(page);
  await sleep(1500);
  console.log(`   Selected agent "${agentId}" in the Inspector sidebar.`);
  return true;
}

/** Read the Inspector's visible text, for the run log. Empty when absent. */
async function readInspectorText(page: Page): Promise<string> {
  return page
    .evaluate(() => {
      const host = document.querySelector('cpk-web-inspector');
      const text = host?.shadowRoot?.textContent ?? '';
      return text.replace(/\s+/g, ' ').trim().slice(0, 220);
    })
    .catch(() => '');
}

export const runInspectorAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  // The mount is the page's central claim, so report it before doing anything
  // that depends on it.
  const mounted = await page.locator('cpk-web-inspector').count();
  console.log(
    mounted
      ? `   cpk-web-inspector is mounted -- nothing on the page put it there.`
      : `   [!] no cpk-web-inspector on the page.`,
  );

  // Run first, so AG-UI Events has traffic to show instead of an empty list.
  console.log(`   [Inspector] Sending a message to populate the event stream...`);
  const before = await sendPrompt(page, config.prompt, { timeoutMs: 12000 });
  await waitForAgentResponseCompletion(page, 1500, before);

  const opened = await openInspector(page);
  if (!opened) {
    throw new Error(
      '[Inspector] The launcher never appeared, so the page’s central ' +
        'claim -- that @copilotkit/angular mounts the Inspector for you -- ' +
        'could not be filmed.',
    );
  }

  // The quickstart's confirm-setup step, in its own order: the agent is listed,
  // then the events are moving.
  console.log(`   Selecting the Agents panel (quickstart step 1)...`);
  await openInspectorPanel(page, 'agents');
  await sleep(2000);
  // Opening the panel is only half the documented step. On arrival it reads
  // "No agent selected"; the agent is listed once one is picked in the sidebar.
  console.log(`   Agents panel on arrival: ${await readInspectorText(page)}`);
  await selectInspectorAgent(page, 'default');
  await sleep(2000);
  console.log(`   Agents panel after selecting: ${await readInspectorText(page)}`);

  console.log(`   Selecting the AG-UI Events panel (quickstart step 2)...`);
  await openInspectorPanel(page, 'ag-ui-events');
  await sleep(4000);
  console.log(`   AG-UI Events panel reads: ${await readInspectorText(page)}`);

  // Rest over the panel so the closing frames are the evidence, not the cursor.
  await humanGlide(page, 960, 500, 25);
  await sleep(config.waitAfterPromptMs ?? 4000);
};
