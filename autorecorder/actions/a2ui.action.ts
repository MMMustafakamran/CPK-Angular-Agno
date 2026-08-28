/**
 * A2UI — a guided read of the guide itself, because the guide is the defect.
 *
 * https://docs.copilotkit.ai/angular/agno/guides/a2ui
 *
 * `a2ui: {}` in frontend/server.ts turns the middleware on and `/info` duly
 * reports `a2uiEnabled: true`, but supplying `a2ui.catalog` is what actually
 * registers the `render_a2ui` renderer — and the guide's catalog snippets are
 * not self-contained. `a2uiConfigForFeature` returns four catalogs
 * (`beautifulCatalog`, `declarativeCatalog`, `fixedCatalog`) and `app.config.ts`
 * hands `productCatalog` to `provideCopilotKit`; the page defines none of them,
 * and the props in `fixedDefinitions` are built out of a `dynamicString` that
 * never appears either. Nothing a reader copies out of this guide will render.
 *
 * So this recording is not a chat demo. It is one continuous descent to the
 * `a2uiConfigForFeature` snippet, a selection dragged across the four returns,
 * then across the individual identifiers. A voiceover is muxed over it by
 * `ci/lib/mux.mjs`; the holds below are the script's beats, kept short on
 * purpose — earlier cuts lingered and read as a stall rather than a point.
 *
 * The prompt in `pages.config.ts` is deliberately not sent any more: asking the
 * agent produced a paragraph of prose, which showed the symptom but not the
 * cause. The cause is on this page and can be pointed at.
 */
import { type Page } from 'playwright';

import { humanGlide, sleep } from '../core/overlays/cursor';
import { ensureOverlays } from '../core/overlays/taskbar';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';
import { closeNotepadNote, showNotepadNote } from './notepad';

/**
 * The written finding, left on screen over the guide once the tour has shown
 * it. Lowercase and clipped on purpose: this is a person jotting down what they
 * just hit, not a report — a formal paragraph here reads as authored narration
 * and undercuts the "I tried to follow this page" framing the clip is built on.
 */
const NOTE_LINES = [
  'a2ui guide notes',
  '',
  'used but never defined:',
  '  beautifulCatalog',
  '  declarativeCatalog',
  '  fixedCatalog',
  '  productCatalog',
  '  dynamicString',
  '',
  'fixedDefinitions is defined but never',
  'wrapped into fixedCatalog',
  '',
  'copy any snippet here and it wont compile',
];

/** Every beat's duration in one place, because they are voiceover timing. */
const BEAT = {
  /** Rest on the title before any motion. */
  settleMs: 1000,
  /** The single uninterrupted descent to the catalog snippet. */
  descentMs: 4500,
  /** Dead air after the scroll stops, before the cursor moves in. */
  beforeSelectMs: 2500,
  /** How long each highlight stays up. */
  holdMs: 3000,
  /** Short repositioning scrolls between identifiers. */
  hopMs: 1800,
  /** The closing run to the bottom of the page. */
  outroMs: 4000,
  /**
   * Time the finished note stays up, on top of showNotepadNote's own 4s tail.
   * The typing is the beat here; this is just reading room at the end.
   */
  noteHoldMs: 2500,
} as const;

/**
 * One identifier the guide uses without ever defining it, in the order the tour
 * visits them. `occurrence` is 1-based; `dynamicString` appears five times and
 * the first is the one sitting in a readable `z.object({ ... })`.
 */
interface UndefinedRef {
  token: string;
  occurrence: number;
  /** Log line, and the beat the narration is written against. */
  note: string;
}

const NARROW_REFS: UndefinedRef[] = [
  {
    token: 'beautifulCatalog',
    occurrence: 1,
    note: 'the beautiful-chat case returns beautifulCatalog — never defined',
  },
  {
    token: 'fixedCatalog',
    occurrence: 1,
    note: 'a2ui-fixed-schema returns fixedCatalog — never defined',
  },
  {
    token: 'dynamicString',
    occurrence: 1,
    note: 'fixedDefinitions builds its Zod props out of dynamicString — never defined, never imported',
  },
  {
    token: 'productCatalog',
    occurrence: 1,
    note: 'app.config.ts hands productCatalog to provideCopilotKit — never defined',
  },
];

/**
 * Resolves the element that actually scrolls on the docs site and stashes it.
 *
 * Fumadocs puts the scroller on `#nd-docs-layout` rather than the document, so
 * `window.scrollTo` silently does nothing there. Resolved once and reused, so
 * every scroll in the tour drives the same element.
 */
async function resolveDocScroller(page: Page): Promise<void> {
  await page
    .evaluate(() => {
      const candidates = [
        document.getElementById('nd-docs-layout'),
        document.querySelector('main'),
        document.querySelector('article'),
      ];
      const nested = candidates.find(
        (el) =>
          el instanceof HTMLElement && el.scrollHeight > el.clientHeight + 40,
      ) as HTMLElement | undefined;
      (window as any).__a2uiScroller = nested ?? null;
    })
    .catch(() => {});
}

/**
 * Eased scroll to an absolute offset.
 *
 * Cubic in-out rather than linear: the ease-out at the end is what makes a long
 * descent land on the snippet instead of stopping dead on it.
 */
async function smoothScrollTo(
  page: Page,
  targetTop: number,
  durationMs: number,
): Promise<void> {
  await page
    .evaluate(
      async ({ target, duration }) => {
        const el = (window as any).__a2uiScroller as HTMLElement | null;
        const read = () => (el ? el.scrollTop : window.scrollY);
        const write = (y: number) => {
          if (el) el.scrollTop = y;
          else window.scrollTo(0, y);
        };

        const start = read();
        const max = el
          ? el.scrollHeight - el.clientHeight
          : Math.max(
              0,
              document.documentElement.scrollHeight - window.innerHeight,
            );
        const end = Math.max(0, Math.min(target, max));
        const distance = end - start;
        if (Math.abs(distance) < 8) return;

        const steps = Math.max(24, Math.round(duration / 16));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const progress =
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          write(start + distance * progress);
          await new Promise((r) => setTimeout(r, duration / steps));
        }
      },
      { target: targetTop, duration: durationMs },
    )
    .catch(() => {});
  await sleep(250);
}

interface TokenRect {
  x: number;
  y: number;
  left: number;
  right: number;
  width: number;
  /** Offset of the token from the top of the scroller's content. */
  docTop: number;
}

/**
 * Bounding box of one identifier inside a rendered code block.
 *
 * Ranges rather than element boxes: Shiki wraps a line in several spans and an
 * identifier may share a span with the punctuation around it, so selecting the
 * element would highlight `{ catalog: beautifulCatalog };` instead of the word
 * under discussion. A Range over the text node's exact offsets highlights the
 * identifier and nothing else. Returns null when the token is off-screen or
 * absent, which the caller treats as a doc change worth reporting.
 */
async function locateToken(
  page: Page,
  token: string,
  occurrence: number,
): Promise<TokenRect | null> {
  return (await page
    .evaluate(
      ({ needle, nth }) => {
        const scroller = (window as any).__a2uiScroller as HTMLElement | null;
        const roots = Array.from(
          document.querySelectorAll('pre, code'),
        ) as HTMLElement[];

        let seen = 0;
        for (const root of roots) {
          const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null,
          );
          let node: Node | null;
          while ((node = walker.nextNode())) {
            const text = node.nodeValue ?? '';
            let from = 0;
            for (;;) {
              const idx = text.indexOf(needle, from);
              if (idx === -1) break;
              from = idx + needle.length;

              // Reject substrings of a longer identifier (`fixedCatalog`
              // must not match inside `fixedCatalogEntry`).
              const before = text[idx - 1] ?? '';
              const after = text[idx + needle.length] ?? '';
              if (/[A-Za-z0-9_$]/.test(before) || /[A-Za-z0-9_$]/.test(after)) {
                continue;
              }

              seen++;
              if (seen !== nth) continue;

              const range = document.createRange();
              range.setStart(node, idx);
              range.setEnd(node, idx + needle.length);
              const r = range.getBoundingClientRect();
              range.detach?.();
              if (r.width === 0 && r.height === 0) return null;

              const scrollerTop = scroller
                ? scroller.getBoundingClientRect().top - scroller.scrollTop
                : -window.scrollY;

              return {
                x: r.left + r.width / 2,
                y: r.top + r.height / 2,
                left: r.left,
                right: r.right,
                width: r.width,
                docTop: r.top - scrollerTop,
              };
            }
          }
        }
        return null;
      },
      { needle: token, nth: occurrence },
    )
    .catch(() => null)) as TokenRect | null;
}

/**
 * Scrolls a token into the upper third and returns its post-scroll box.
 *
 * Two lookups on purpose: the first tells us where the token lives in the
 * document, and the second is the only rect the cursor can trust, because the
 * first one is stale the moment the scroll moves.
 */
async function bringIntoView(
  page: Page,
  token: string,
  occurrence: number,
  durationMs: number,
): Promise<TokenRect | null> {
  const probe = await locateToken(page, token, occurrence);
  if (!probe) return null;
  await smoothScrollTo(page, Math.max(0, probe.docTop - 300), durationMs);
  return locateToken(page, token, occurrence);
}

/**
 * Drags a selection from one point to another, the way a reader highlights
 * something they are about to complain about.
 *
 * Press, then travel in many small steps: a single jump to the far edge selects
 * the same characters but shows no sweep, and the sweep is the part the viewer
 * follows.
 */
async function dragSelect(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
): Promise<void> {
  await humanGlide(page, from.x, from.y, 26);
  await sleep(450);

  await page.mouse.down();
  await sleep(160);

  const travel = Math.hypot(to.x - from.x, to.y - from.y);
  const steps = Math.max(18, Math.round(travel / 3));
  await humanGlide(page, to.x, to.y, steps);
  await sleep(180);

  await page.mouse.up();
}

/** Highlights a single identifier edge to edge. */
async function selectToken(page: Page, rect: TokenRect): Promise<void> {
  await dragSelect(
    page,
    { x: Math.max(2, rect.left - 3), y: rect.y },
    { x: rect.right + 3, y: rect.y },
  );
}

/** Clears the highlight before the next beat, so selections never stack up. */
async function clearSelection(page: Page): Promise<void> {
  await page
    .evaluate(() => window.getSelection()?.removeAllRanges())
    .catch(() => {});
}

export const runA2uiAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  console.log(`   📖 Reading the guide itself: ${config.docUrl}`);

  await page.goto(config.docUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await page
    .waitForSelector('pre', { state: 'visible', timeout: 15000 })
    .catch(() => {});
  await ensureOverlays(page, 'chrome');
  await resolveDocScroller(page);

  // Rest on the title before moving: the page reflows once as fonts and the
  // sidebar land, and a cursor glide started into that reflow lands nowhere.
  await sleep(BEAT.settleMs);

  const missing: string[] = [];

  // One uninterrupted descent to the catalog-selection snippet. Everything
  // after this is small moves within a page the viewer has already arrived at.
  const blockStart = await bringIntoView(
    page,
    'beautifulCatalog',
    1,
    BEAT.descentMs,
  );
  await sleep(BEAT.beforeSelectMs);

  // The whole `a2uiConfigForFeature` body first: four returns, four catalogs,
  // none of them defined. Dragging beautifulCatalog -> fixedCatalog spans the
  // switch cases in between, which is the shape of the claim.
  const blockEnd = await locateToken(page, 'fixedCatalog', 1);
  if (blockStart && blockEnd) {
    console.log(
      `   ▭ a2uiConfigForFeature returns four catalogs; the guide defines none of them`,
    );
    await dragSelect(
      page,
      { x: Math.max(2, blockStart.left - 6), y: blockStart.y },
      { x: blockEnd.right + 6, y: blockEnd.y },
    );
    await sleep(BEAT.holdMs);
    await clearSelection(page);
    await sleep(500);
  }

  // Then each identifier on its own, so the viewer sees the exact word.
  for (const ref of NARROW_REFS) {
    const rect = await bringIntoView(
      page,
      ref.token,
      ref.occurrence,
      BEAT.hopMs,
    );
    if (!rect) {
      missing.push(ref.token);
      console.warn(
        `   ⚠️ '${ref.token}' not found on the live page — the guide may have been fixed.`,
      );
      continue;
    }

    console.log(`   ↧ ${ref.token}: ${ref.note}`);
    await selectToken(page, rect);
    await sleep(BEAT.holdMs);
    await clearSelection(page);
    await sleep(500);
  }

  // Close by running out the rest of the page. The claim is about what is
  // absent, and absence only reads on screen if the page ends without it.
  console.log(`   🔎 Running out the page — no definition appears...`);
  await smoothScrollTo(page, 10_000_000, BEAT.outroMs);
  await sleep(1200);

  // Write it down, over the page rather than after it: the bottom of the guide
  // stays visible behind the window, so the note and the thing it is about are
  // on screen together.
  await showNotepadNote(page, 'a2ui-notes.txt', NOTE_LINES);
  await sleep(BEAT.noteHoldMs);
  await closeNotepadNote(page);
  await sleep(800);

  if (missing.length === NARROW_REFS.length) {
    // Every identifier gone at once is the guide being rewritten, not a flaky
    // lookup. The recording is then showing nothing, and that must be visible
    // in the run report rather than passing quietly.
    throw new Error(
      `None of the undefined catalog identifiers (${NARROW_REFS.map((r) => r.token).join(', ')}) ` +
        `were found on ${config.docUrl} — the a2ui guide has changed and this tour needs rewriting.`,
    );
  }

  if (missing.length > 0) {
    console.warn(
      `   ⚠️ Not found on the live page: ${missing.join(', ')} — check the guide before trusting this clip.`,
    );
  }

  console.log(
    `   ✅ Doc tour complete: ${NARROW_REFS.length - missing.length} undefined identifier(s) shown, none of them defined anywhere on the page.`,
  );
};
