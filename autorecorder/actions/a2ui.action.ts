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
import {
  closeNotepadNote,
  openNotepadWindow,
  typeInNotepad,
} from './notepad';

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
  /** The closing run to the bottom of the page. */
  outroMs: 4000,
  /** Reading room after the last keystroke, before the window closes. */
  noteHoldMs: 4000,
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

/** The identifier the clip is built around. */
const FOCUS: UndefinedRef = {
  token: 'beautifulCatalog',
  occurrence: 1,
  note: 'the beautiful-chat case returns beautifulCatalog — never defined',
};

/** Its neighbour in the same switch, shown without moving the page. */
const SECOND: UndefinedRef = {
  token: 'fixedCatalog',
  occurrence: 1,
  note: 'a2ui-fixed-schema returns fixedCatalog — never defined',
};

const TOKENS = [FOCUS, SECOND];

/**
 * Blows the code blocks up until they are readable on video.
 *
 * This is the single thing that made earlier cuts useless. The docs render code
 * at ~13px; in a 1920x1080 capture that is illegible on playback, so a tour that
 * highlights one identifier was pointing at a grey smudge. Zooming only `pre`
 * leaves the Fumadocs scroller, sticky header and heading offsets alone — a zoom
 * on `html` reflows all of them and the scroll targets stop landing.
 *
 * `zoom` (not `transform: scale`) on purpose: it participates in layout, so
 * `getBoundingClientRect` and `page.mouse` still agree on where a token is.
 */
async function magnifyCodeBlocks(page: Page, factor = 1.45): Promise<void> {
  // A stylesheet, not inline styles on the nodes. Fumadocs re-renders the code
  // blocks during hydration, which throws away anything written to
  // `pre.style` -- the first cut that "zoomed" did exactly that and shipped a
  // page of 13px code. A rule in a <style> tag applies to whatever `pre` exists
  // at paint time, including the replacements.
  const ok = (await page
    .evaluate((z) => {
      const style = document.createElement('style');
      style.id = 'a2ui-magnify';
      style.textContent = `pre { zoom: ${z} !important; }`;
      document.head.appendChild(style);
      return document.querySelectorAll('pre').length;
    }, factor)
    .catch(() => 0)) as number;

  if (ok === 0) {
    console.warn(
      `   ⚠️ No <pre> blocks to magnify — the clip will be unreadable.`,
    );
  }
  // Let the reflow settle before anything measures a token's position.
  await sleep(700);
}

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
      // A FUNCTION, not the element. Fumadocs swaps #nd-docs-layout during
      // hydration, so an element captured once is detached moments later --
      // and a detached node accepts scrollTop writes, reports 0 forever, and
      // never throws. That is what pinned every earlier cut to the top of the
      // page while the logs reported a clean run. Re-query on every access.
      (window as any).__a2uiScroller = () =>
        (document.getElementById('nd-docs-layout') ??
          Array.from(document.querySelectorAll('main, article, div')).find(
            (el) =>
              el instanceof HTMLElement &&
              el.scrollHeight > el.clientHeight + 40 &&
              /auto|scroll/.test(getComputedStyle(el).overflowY),
          ) ??
          null) as HTMLElement | null;
    })
    .catch(() => {});
}

/** Current offset of the doc scroller. */
async function scrollPos(page: Page): Promise<number> {
  return (await page
    .evaluate(() => {
      const el = (window as any).__a2uiScroller?.() as HTMLElement | null;
      return el ? el.scrollTop : window.scrollY;
    })
    .catch(() => 0)) as number;
}

/**
 * Eased scroll to an absolute offset, driven by real wheel events.
 *
 * NOT `el.scrollTop = y`. This layout accepts the assignment, reports no error
 * and does not move — `#nd-docs-layout` reads back 0 immediately afterwards, so
 * earlier cuts recorded a page frozen at the top while the log happily reported
 * every identifier "found" (the TreeWalker locates tokens whether or not they
 * are on screen, so the selection drags were happening off-screen). Wheel events
 * go through the compositor and actually scroll it; `core/overlays/cursor.ts`
 * hit the same wall and says so.
 *
 * Cubic in-out rather than linear: the ease-out is what makes a long descent
 * land on the snippet instead of stopping dead on it.
 */
async function smoothScrollTo(
  page: Page,
  targetTop: number,
  durationMs: number,
): Promise<void> {
  const start = await scrollPos(page);
  const max = (await page
    .evaluate(() => {
      const el = (window as any).__a2uiScroller?.() as HTMLElement | null;
      return el
        ? el.scrollHeight - el.clientHeight
        : Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          );
    })
    .catch(() => 0)) as number;

  const end = Math.max(0, Math.min(targetTop, max));
  const distance = end - start;
  if (Math.abs(distance) < 8) return;

  const steps = 60;
  const tick = Math.max(16, durationMs / steps);
  let previous = 0;

  // Neither scroll method works everywhere, so prove one on the first real tick
  // and keep it. Wheel is preferred (it keeps the compositor's own smoothing),
  // but the recorder's chrome overlay swallows it on this layout; bare Chromium
  // does not, which is why this only reproduced inside a recording. The
  // fallback must be `+= dy` — assigning an absolute scrollTop is accepted and
  // ignored here. Same discovery as core/overlays/cursor.ts.
  let useWheel = true;
  let proven = false;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const progress =
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const delta = Math.round((progress - previous) * distance);
    previous = progress;

    if (delta !== 0) {
      if (useWheel) {
        // Skip the probe on the ease-in's sub-pixel opening ticks: they move
        // nothing either way and would wrongly condemn the wheel.
        const canProve = !proven && Math.abs(delta) >= 3;
        const before = canProve ? await scrollPos(page) : 0;

        await page.mouse.wheel(0, delta);

        if (canProve) {
          proven = true;
          if (Math.abs((await scrollPos(page)) - before) < 1) useWheel = false;
        }
      }

      if (!useWheel) {
        await page
          .evaluate((dy) => {
            const el = (window as any).__a2uiScroller?.() as HTMLElement | null;
            if (el) el.scrollTop += dy;
            else window.scrollBy(0, dy);
          }, delta)
          .catch(() => {});
      }
    }

    await sleep(tick);
  }

  await sleep(250);

  // Loud on failure. A scroll that silently does nothing is the exact defect
  // this function exists to fix, and it is invisible in the logs otherwise.
  const landed = await scrollPos(page);
  if (Math.abs(landed - end) > 150) {
    console.warn(
      `   ⚠️ Scroll landed at ${Math.round(landed)}, wanted ${Math.round(end)} — the doc layout may have changed its scroller.`,
    );
  }
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
        const scroller = (window as any).__a2uiScroller?.() as HTMLElement | null;
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

/**
 * Repaints a selection as a fixed overlay so it survives the next click.
 *
 * A real text selection is the right way to *make* the highlight — the drag is
 * what the viewer reads as a person marking a word. But opening Notepad clicks
 * the page, and any click collapses the selection, so the token went un-marked
 * for exactly the stretch where the note explains it. This draws the same blue
 * box and nothing can clear it but us.
 */
async function pinHighlight(page: Page, rect: TokenRect): Promise<void> {
  await page
    .evaluate(
      ({ left, right, y }) => {
        const box = document.createElement('div');
        box.className = 'a2ui-pinned-highlight';
        box.style.cssText = [
          'position:fixed',
          `left:${left - 2}px`,
          `top:${y - 15}px`,
          `width:${right - left + 4}px`,
          'height:30px',
          'background:rgba(59,130,246,.45)',
          'border-radius:3px',
          'z-index:2147483000',
          'pointer-events:none',
        ].join(';');
        document.body.appendChild(box);
      },
      { left: rect.left, right: rect.right, y: rect.y },
    )
    .catch(() => {});
}

/** Removes every pinned highlight. */
async function unpinHighlights(page: Page): Promise<void> {
  await page
    .evaluate(() => {
      document
        .querySelectorAll('.a2ui-pinned-highlight')
        .forEach((el) => el.remove());
    })
    .catch(() => {});
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

  await magnifyCodeBlocks(page);
  await humanGlide(page, 960, 620, 26);

  // Rest on the title before moving: the page reflows once as fonts and the
  // sidebar land, and a cursor glide started into that reflow lands nowhere.
  await sleep(BEAT.settleMs);

  const missing: string[] = [];

  // One uninterrupted descent to the catalog-selection snippet, and then the
  // tour stays there. Earlier cuts visited five identifiers scattered across
  // the page, which meant scrolling down, back up for `dynamicString`, then
  // down again -- on screen that reads as hunting, not as an argument. Both
  // catalogs below live in the same `a2uiConfigForFeature` block, so once the
  // descent lands nothing moves again until the closing sweep.
  const rect = await bringIntoView(page, FOCUS.token, 1, BEAT.descentMs);
  await sleep(BEAT.beforeSelectMs);

  if (!rect) {
    missing.push(FOCUS.token);
    console.warn(
      `   ⚠️ '${FOCUS.token}' not found on the live page — the guide may have been fixed.`,
    );
  } else {
    console.log(`   ↧ ${FOCUS.token}: ${FOCUS.note}`);
    await selectToken(page, rect);
    await sleep(BEAT.holdMs);
    await clearSelection(page);
    await sleep(600);
  }

  // The second one, in the same snippet and without scrolling: one undefined
  // name could be an oversight, two in one switch is the page. Its highlight
  // stays up for the rest of the clip -- the note is written *about* it, so
  // clearing it first would leave the writing pointing at nothing.
  const second = await locateToken(page, SECOND.token, 1);
  if (!second) {
    missing.push(SECOND.token);
  } else {
    console.log(`   ↧ ${SECOND.token}: ${SECOND.note}`);
    await selectToken(page, second);
    await sleep(BEAT.holdMs);
    // Hand the mark over to an overlay before anything clicks.
    await pinHighlight(page, second);
  }

  // Write the finding out by hand instead of flashing a caption over it. The
  // window is parked hard right so the highlighted `fixedCatalog` stays visible
  // to its left: the claim and the code it is about share the frame, and the
  // typing gives the voiceover something to run against.
  await openNotepadWindow(page, 'a2ui-notes.txt', {
    top: '150px',
    right: '48px',
    width: '560px',
    height: '430px',
    fontSize: '20px',
  });
  await typeInNotepad(page, NOTE_LINES, 1600, 260);
  await sleep(BEAT.noteHoldMs);
  await closeNotepadNote(page);
  await unpinHighlights(page);
  await clearSelection(page);
  await sleep(600);

  // Close by running out the rest of the page. The claim is about what is
  // absent, and absence only reads on screen if the page ends without it.
  console.log(`   🔎 Running out the page — no definition appears...`);
  await smoothScrollTo(page, 10_000_000, BEAT.outroMs);
  await sleep(1200);

  if (missing.length === TOKENS.length) {
    // Every identifier gone at once is the guide being rewritten, not a flaky
    // lookup. The recording is then showing nothing, and that must be visible
    // in the run report rather than passing quietly.
    throw new Error(
      `None of the undefined catalog identifiers (${TOKENS.map((r) => r.token).join(', ')}) ` +
        `were found on ${config.docUrl} — the a2ui guide has changed and this tour needs rewriting.`,
    );
  }

  if (missing.length > 0) {
    console.warn(
      `   ⚠️ Not found on the live page: ${missing.join(', ')} — check the guide before trusting this clip.`,
    );
  }

  console.log(
    `   ✅ Doc tour complete: ${TOKENS.length - missing.length} undefined identifier(s) shown, none of them defined anywhere on the page.`,
  );
};
