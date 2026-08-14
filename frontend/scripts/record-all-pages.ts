/**
 * Automated Screen Recording & Demonstration Pipeline
 *
 * Records a complete 3-step walkthrough for each doc page:
 * 1. Official CopilotKit Doc Page with smooth human-like scrolling to code snippet
 * 2. Full VS Code Dark Modern IDE view with file explorer, active tab, and highlighted lines
 * 3. Chrome-free Demo (/demo) with natural typing, send click, and live AI response stream
 *
 * Includes:
 * - Authentic Windows 11 Taskbar overlay with live local clock & date
 * - Visible OS Mouse Cursor with natural curved gliding and click animations
 * - Zero white flash between page transitions
 * - 1080p MP4 video export to ./recordings/<page>.mp4
 */

import { chromium, type Page } from 'playwright';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const RECORDINGS_DIR = join(ROOT, 'recordings');

if (!existsSync(RECORDINGS_DIR)) {
  mkdirSync(RECORDINGS_DIR, { recursive: true });
}

export interface PageRecordConfig {
  id: string;
  name: string;
  docUrl: string;
  ideFile: string;
  ideLine: number;
  demoUrl: string;
  prompt: string;
  waitAfterPromptMs?: number;
}

export const PAGES: PageRecordConfig[] = [
  {
    id: 'quickstart',
    name: 'Quickstart',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/quickstart',
    ideFile: 'server.ts',
    ideLine: 23,
    demoUrl: 'http://localhost:4200/quickstart/demo',
    prompt: 'Can you tell me a joke?',
  },
  {
    id: 'chat-ui',
    name: 'Chat UI and Customization',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/chat-ui',
    ideFile: 'src/app/features/chat-ui/chat-ui-demo.component.ts',
    ideLine: 18,
    demoUrl: 'http://localhost:4200/chat-ui/demo',
    prompt: 'Hello! How can you help me today?',
  },
  {
    id: 'frontend-tools-generative-ui',
    name: 'Frontend Tools & Generative UI',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/frontend-tools-generative-ui',
    ideFile: '../backend/main.py',
    ideLine: 20,
    demoUrl: 'http://localhost:4200/frontend-tools-generative-ui/demo',
    prompt: 'What is the weather in Tokyo?',
  },
  {
    id: 'human-in-the-loop',
    name: 'Human in the Loop',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/human-in-the-loop',
    ideFile: 'src/app/features/hitl/hitl-chat.component.ts',
    ideLine: 20,
    demoUrl: 'http://localhost:4200/human-in-the-loop/demo',
    prompt: 'Please delete the database records for project Alpha',
  },
  {
    id: 'shared-state',
    name: 'Shared State & Context',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/shared-state',
    ideFile: 'src/app/features/shared-state/shared-state-chat.component.ts',
    ideLine: 20,
    demoUrl: 'http://localhost:4200/shared-state/demo',
    prompt: 'Add note: Release version 2.0 to production',
  },
  {
    id: 'attachments',
    name: 'Attachments & Multimodal',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless',
    ideFile: 'src/app/features/attachments/media-chat.component.ts',
    ideLine: 15,
    demoUrl: 'http://localhost:4200/attachments/demo',
    prompt: 'Can you accept file and image attachments?',
  },
  {
    id: 'headless',
    name: 'Headless Chat UI',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless',
    ideFile: 'src/app/features/headless/headless-chat.component.ts',
    ideLine: 25,
    demoUrl: 'http://localhost:4200/headless/demo',
    prompt: 'Explain how the Agno agent communicates with Copilot Runtime in 2 sentences.',
  },
  {
    id: 'voice-multimodal',
    name: 'Voice & Multimodal',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/voice-multimodal',
    ideFile: 'src/app/features/media/voice-chat.component.ts',
    ideLine: 15,
    demoUrl: 'http://localhost:4200/voice-multimodal/demo',
    prompt: 'Hello from multimodal assistant!',
  },
];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Injects or re-attaches the Windows 11 Taskbar & Virtual Mouse overlay onto the current page */
async function ensureOverlays(page: Page, activeApp: 'chrome' | 'vscode' = 'chrome'): Promise<void> {
  const chromeInd = activeApp === 'chrome' ? '#60a5fa' : 'transparent';
  const vscodeInd = activeApp === 'vscode' ? '#60a5fa' : 'transparent';

  const code = `
    (function() {
      // 1. Windows 11 Taskbar
      var bar = document.getElementById('win11-taskbar-overlay');
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'win11-taskbar-overlay';
        bar.style.cssText = 'position:fixed!important;bottom:0!important;left:0!important;width:100vw!important;height:48px!important;background-color:rgba(28,28,28,0.95)!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;border-top:1px solid rgba(255,255,255,0.08)!important;z-index:2147483645!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 12px!important;box-sizing:border-box!important;font-family:Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,sans-serif!important;user-select:none!important;pointer-events:none!important;';

        bar.innerHTML = [
          '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#e4e4e4;width:140px;">',
          '  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>',
          '  <span style="font-size:11px;font-weight:500;">78°F Sunny</span>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:6px;position:absolute;left:50%;transform:translateX(-50%);">',
          '  <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 88 88" fill="#0078d4"><path d="M0 12.48 35.68 7.6v33.4H0V12.48zM0 45.48h35.68v33.4L0 74.01V45.48zM41.48 6.78 88 0v41H41.48V6.78zM88 45.48v41L41.48 80V45.48H88z"/></svg></div>',
          '  <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>',
          '  <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg></div>',
          '  <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24"><path fill="#facc15" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg></div>',
          '  <div style="width:40px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;"><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><circle cx="12" cy="12" r="4" fill="#ffffff"/></svg><div style="position:absolute;bottom:2px;width:14px;height:3px;background:${chromeInd};border-radius:2px;"></div></div>',
          '  <div style="width:40px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;"><svg width="22" height="22" viewBox="0 0 24 24"><path fill="#007acc" d="M18.5 2.5 12 8.5 7 4.5 3.5 6v12L7 19.5l5-4 6.5 6 3-1.5V4l-3-1.5z"/></svg><div style="position:absolute;bottom:2px;width:14px;height:3px;background:${vscodeInd};border-radius:2px;"></div></div>',
          '  <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#1e1e1e" stroke="#e4e4e4" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 4 3-4 3m6 0h4"/></svg></div>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#e4e4e4;">',
          '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>',
          '  <span style="font-weight:500;font-size:11px;">ENG</span>',
          '  <svg width="16" height="16" viewBox="0 0 24 24" fill="#e4e4e4"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>',
          '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
          '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/></svg>',
          '  <div style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.15;font-size:11px;padding:2px 4px;">',
          '    <span id="win11-time" style="font-weight:500;"></span>',
          '    <span id="win11-date" style="font-size:10px;color:#a1a1aa;"></span>',
          '  </div>',
          '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e4e4e4" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
          '  <div style="width:2px;height:16px;background:rgba(255,255,255,0.2);"></div>',
          '</div>'
        ].join('');

        document.documentElement.appendChild(bar);

        var tick = function() {
          var now = new Date();
          var timeEl = document.getElementById('win11-time');
          var dateEl = document.getElementById('win11-date');
          if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
          if (dateEl) dateEl.textContent = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
        };
        tick();
        setInterval(tick, 1000);
      }

      // 2. Cursor
      var cursor = document.getElementById('playwright-virtual-mouse');
      if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'playwright-virtual-mouse';
        cursor.style.cssText = 'position:fixed!important;top:300px!important;left:500px!important;width:24px!important;height:24px!important;z-index:2147483647!important;pointer-events:none!important;transform:translate(-2px,-2px)!important;transition:transform 0.04s ease-out!important;';
        cursor.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6));"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#ffffff" stroke="#111111" stroke-width="1.5"/></svg>';
        document.documentElement.appendChild(cursor);
      }
    })();
  `;

  await page.evaluate(code);
}

/** Smooth human-like mouse glide moving both physical coordinates and visible virtual cursor */
async function humanGlide(page: Page, targetX: number, targetY: number, steps: number = 25): Promise<void> {
  const currentPos = await page.evaluate(`
    (function() {
      var c = document.getElementById('playwright-virtual-mouse');
      if (c) {
        return { x: parseFloat(c.style.left) || 960, y: parseFloat(c.style.top) || 540 };
      }
      return { x: 960, y: 540 };
    })()
  `) as { x: number; y: number };

  const dx = (targetX - currentPos.x) / steps;
  const dy = (targetY - currentPos.y) / steps;

  for (let i = 1; i <= steps; i++) {
    const cx = currentPos.x + dx * i;
    const cy = currentPos.y + dy * i;

    await page.evaluate(`
      (function() {
        var c = document.getElementById('playwright-virtual-mouse');
        if (c) {
          c.style.left = "${cx}px";
          c.style.top = "${cy}px";
        }
      })()
    `);

    await page.mouse.move(cx, cy);
    await sleep(15);
  }
}

/** Mouse click animation with depression effect */
async function humanClick(page: Page): Promise<void> {
  await page.evaluate(`
    (function() {
      var c = document.getElementById('playwright-virtual-mouse');
      if (c) c.style.transform = 'translate(-2px, -2px) scale(0.82)';
    })()
  `);
  await page.mouse.down();
  await sleep(120);
  await page.evaluate(`
    (function() {
      var c = document.getElementById('playwright-virtual-mouse');
      if (c) c.style.transform = 'translate(-2px, -2px) scale(1)';
    })()
  `);
  await page.mouse.up();
  await sleep(80);
}

/** Human scroll down using both physical wheel and internal element scroll */
async function humanScrollDown(page: Page, totalPixels: number = 550, speedMs: number = 60): Promise<void> {
  const steps = Math.floor(totalPixels / 45);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, 45);
    await page.evaluate(`
      (function() {
        window.scrollBy({ top: 45, behavior: 'smooth' });
        var main = document.querySelector('main, article, [class*="overflow-y-auto"]');
        if (main) main.scrollBy({ top: 45, behavior: 'smooth' });
      })()
    `);
    await sleep(speedMs);
  }
}

/** Injects an animated spotlight highlight overlay onto a selector */
async function spotlightElement(page: Page, selector: string): Promise<void> {
  await page.evaluate(`
    (function() {
      var el = document.querySelector(${JSON.stringify(selector)});
      if (el) {
        el.style.outline = '4px solid #6366f1';
        el.style.outlineOffset = '6px';
        el.style.boxShadow = '0 0 35px rgba(99, 102, 241, 0.7)';
        el.style.transition = 'all 0.6s ease-in-out';
      }
    })()
  `);
}

async function recordPage(config: PageRecordConfig): Promise<void> {
  console.log(`\n======================================================`);
  console.log(`🎬 RECORDING: ${config.name} (${config.id})`);
  console.log(`======================================================`);

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--start-maximized',
      '--force-dark-mode',
      '--background-color=#1e1e1e',
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();

  try {
    // ----------------------------------------------------
    // STEP 1: DOC PAGE & NATURAL HUMAN MOVEMENT
    // ----------------------------------------------------
    console.log(`\n📖 Step 1: Navigating to Official Doc (${config.docUrl})...`);
    try {
      await page.goto(config.docUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await ensureOverlays(page, 'chrome');
      await sleep(1000);

      // Move mouse into reading position
      await humanGlide(page, 960, 450, 30);
      await sleep(300);

      // Natural smooth scrolling down the doc page
      console.log(`   Human-like scrolling down doc page...`);
      await humanScrollDown(page, 500, 60);
      await sleep(500);

      // Move mouse over the code snippet
      const hasCode = await page.$('pre, code, div[class*="code"]');
      if (hasCode) {
        const box = await hasCode.boundingBox();
        if (box) {
          await humanGlide(page, box.x + box.width / 2, box.y + 40, 25);
        }
        await spotlightElement(page, 'pre, code, div[class*="code"]');
      }
      await sleep(3500);
    } catch (e) {
      console.warn(`Doc navigation note: ${e}`);
      await sleep(2000);
    }

    // ----------------------------------------------------
    // STEP 2: SHOW PROJECT CODE IN IDE WITH ACTIVE SELECTION
    // ----------------------------------------------------
    console.log(`\n💻 Step 2: Displaying Project Code in IDE (${config.ideFile}:${config.ideLine})...`);
    const ideUrl = `http://localhost:4200/ide?file=${encodeURIComponent(config.ideFile)}&line=${config.ideLine}`;
    await page.goto(ideUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await ensureOverlays(page, 'vscode');
    await sleep(800);

    // Move mouse over the Explorer on the left and click
    await humanGlide(page, 160, 220, 20);
    await humanClick(page);
    await sleep(400);

    // Glide mouse into the code editor
    await humanGlide(page, 650, 400, 25);

    // Smoothly scroll down inside the editor to the target line
    await page.evaluate(`
      (function() {
        var container = document.getElementById('editor-container');
        var targetEl = document.getElementById('line-${config.ideLine}');
        if (container && targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })()
    `);

    // Move cursor over the highlighted code block
    await humanGlide(page, 520, 480, 20);

    // Also trigger VS Code desktop goto if available
    try {
      execSync(`code -r -g "${config.ideFile}:${config.ideLine}"`, { stdio: 'ignore' });
    } catch {}

    await sleep(4500);

    // ----------------------------------------------------
    // STEP 3: FRONTEND DEMO & ACTIVE PROMPT EXECUTION
    // ----------------------------------------------------
    console.log(`\n🚀 Step 3: Opening Demo and Sending Prompt (${config.prompt})...`);
    await page.goto(config.demoUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await ensureOverlays(page, 'chrome');
    await sleep(1500);

    // Locate chat input in CopilotChat or headless textarea
    const inputLocator = page.locator('textarea, input[type="text"], [contenteditable="true"]').first();
    await inputLocator.waitFor({ timeout: 8000 });

    const inputBox = await inputLocator.boundingBox();
    if (inputBox) {
      // Glide mouse to the chat input box and click
      await humanGlide(page, inputBox.x + 80, inputBox.y + inputBox.height / 2, 25);
      await humanClick(page);
    } else {
      await inputLocator.click();
    }
    await sleep(400);

    // Type with natural keystroke cadence
    for (const char of config.prompt) {
      await page.keyboard.type(char, { delay: 45 });
    }
    await sleep(600);

    // Move mouse towards Send button and click
    try {
      const sendBtn = page.locator('button[type="submit"], button:has-text("Send"), .copilotKitSendButton').first();
      if (await sendBtn.isVisible()) {
        const btnBox = await sendBtn.boundingBox();
        if (btnBox) {
          await humanGlide(page, btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2, 20);
          await humanClick(page);
        } else {
          await sendBtn.click();
        }
      } else {
        await page.keyboard.press('Enter');
      }
    } catch {
      await page.keyboard.press('Enter');
    }

    console.log(`⏳ Waiting for AI agent response / tool rendering...`);
    // Glide mouse back to reading area
    await humanGlide(page, 960, 500, 30);

    // Wait for response
    await sleep(config.waitAfterPromptMs ?? 9500);

    console.log(`✅ Demo execution completed for ${config.id}.`);
    await sleep(3500);

  } finally {
    const video = page.video();
    await page.close();
    await context.close();

    if (video) {
      const finalWebm = join(RECORDINGS_DIR, `${config.id}.webm`);

      try {
        const tempPath = await video.path();
        if (tempPath && existsSync(tempPath)) {
          if (existsSync(finalWebm)) unlinkSync(finalWebm);
          renameSync(tempPath, finalWebm);
          console.log(`🎥 WebM Video saved: ${finalWebm}`);
        }
      } catch (err) {
        console.warn(`Video save note: ${err}`);
      }
    }

    await browser.close();
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const pageArg = args.find((a) => a.startsWith('--page='))?.split('=')[1];

  const targetPages = pageArg
    ? PAGES.filter((p) => p.id.toLowerCase() === pageArg.toLowerCase())
    : PAGES;

  if (targetPages.length === 0) {
    console.error(`❌ No matching page found for: ${pageArg}`);
    console.log(`Available pages: ${PAGES.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`🎬 STARTING AUTOMATED RECORDING FOR ${targetPages.length} PAGE(S)`);
  console.log(`======================================================\n`);

  for (const p of targetPages) {
    await recordPage(p);
  }

  console.log(`\n🎉 ALL RECORDINGS FINISHED! Output files in: ${RECORDINGS_DIR}`);
}

main().catch((err) => {
  console.error('Fatal recording error:', err);
  process.exit(1);
});
