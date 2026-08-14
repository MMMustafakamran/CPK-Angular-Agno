/**
 * Automated Screen Recording & Demonstration Pipeline
 *
 * For each doc page, this script:
 * 1. Shows a visible moving mouse cursor with natural movement physics.
 * 2. Navigates to the official CopilotKit doc URL, scrolls down naturally, and spotlights the code snippet.
 * 3. Switches to the VS Code IDE view, clicks the file in the explorer, scrolls through code, and highlights lines.
 * 4. Switches to the clean frontend demo (/demo), clicks the input, types the prompt with natural keystroke cadence, clicks Send, and captures the streaming AI / tool output.
 * 5. Exports pristine 1080p MP4 videos into `./recordings/`.
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
    id: 'a2ui',
    name: 'A2UI Schemas & Styling',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/a2ui',
    ideFile: 'src/app/features/a2ui/a2ui-chat.component.ts',
    ideLine: 15,
    demoUrl: 'http://localhost:4200/a2ui/demo',
    prompt: 'Show flight status for flight AA100',
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
  {
    id: 'threads',
    name: 'Threads & Conversations',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless',
    ideFile: 'src/app/features/threads/threads-demo.component.ts',
    ideLine: 20,
    demoUrl: 'http://localhost:4200/threads/demo',
    prompt: 'Start a new conversation thread for support',
  },
  {
    id: 'memory',
    name: 'Agent Memory',
    docUrl: 'https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless',
    ideFile: 'src/app/features/memory/memory-demo.component.ts',
    ideLine: 20,
    demoUrl: 'http://localhost:4200/memory/demo',
    prompt: 'Remember that I prefer TypeScript and Angular',
  },
];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Injects a visible OS mouse cursor arrow that moves naturally during screen recordings */
async function installVirtualMouse(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const injectCursor = () => {
      if (document.getElementById('playwright-virtual-mouse')) return;
      const cursor = document.createElement('div');
      cursor.id = 'playwright-virtual-mouse';
      cursor.style.position = 'fixed';
      cursor.style.top = '0';
      cursor.style.left = '0';
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.zIndex = '2147483647';
      cursor.style.pointerEvents = 'none';
      cursor.style.transform = 'translate(-2px, -2px)';
      cursor.style.transition = 'transform 0.04s ease-out';
      cursor.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.6));">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#ffffff" stroke="#111111" stroke-width="1.5"/>
        </svg>
      `;
      document.documentElement.appendChild(cursor);

      window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }, { passive: true });

      window.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-2px, -2px) scale(0.82)';
      }, { passive: true });

      window.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-2px, -2px) scale(1)';
      }, { passive: true });
    };

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', injectCursor);
    } else {
      injectCursor();
    }
  });
}

/** Smooth human-like curved mouse glide */
async function humanGlide(page: Page, targetX: number, targetY: number, steps: number = 25): Promise<void> {
  await page.mouse.move(targetX, targetY, { steps });
}

/** Smooth human scroll down using both physical wheel and scrollBy */
async function humanScrollDown(page: Page, totalPixels: number = 600, speedMs: number = 70): Promise<void> {
  const steps = Math.floor(totalPixels / 50);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, 50);
    await page.evaluate(() => {
      window.scrollBy({ top: 50, behavior: 'smooth' });
      const main = document.querySelector('main, article, [class*="overflow-y-auto"]');
      if (main) main.scrollBy({ top: 50, behavior: 'smooth' });
    });
    await sleep(speedMs);
  }
}

/** Injects an animated spotlight highlight overlay onto a selector */
async function spotlightElement(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      (el as HTMLElement).style.outline = '4px solid #6366f1';
      (el as HTMLElement).style.outlineOffset = '6px';
      (el as HTMLElement).style.boxShadow = '0 0 35px rgba(99, 102, 241, 0.7)';
      (el as HTMLElement).style.transition = 'all 0.6s ease-in-out';
    }
  }, selector);
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
  await installVirtualMouse(page);

  // Zero-white-flash: force dark canvas on every navigation
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.innerHTML = 'html, body { background-color: #1e1e1e !important; }';
    document.head?.appendChild(style);
    document.documentElement.style.backgroundColor = '#1e1e1e';
  });

  try {
    // ----------------------------------------------------
    // STEP 1: DOC PAGE & NATURAL HUMAN MOVEMENT
    // ----------------------------------------------------
    console.log(`\n📖 Step 1: Navigating to Official Doc (${config.docUrl})...`);
    try {
      await page.goto(config.docUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(1000);

      // Move mouse into reading position
      await humanGlide(page, 960, 450, 30);
      await sleep(400);

      // Natural smooth scrolling down the doc page
      console.log(`   Human-like scrolling down doc page...`);
      await humanScrollDown(page, 550, 70);
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
    await page.goto(ideUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await sleep(800);

    // Move mouse over the Explorer on the left
    await humanGlide(page, 160, 220, 20);
    await page.mouse.down();
    await sleep(120);
    await page.mouse.up();
    await sleep(400);

    // Glide mouse into the code editor
    await humanGlide(page, 650, 400, 25);

    // Smoothly scroll down inside the editor to the target line
    await page.evaluate((targetLine) => {
      const container = document.getElementById('editor-container');
      const targetEl = document.getElementById(`line-${targetLine}`);
      if (container && targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, config.ideLine);

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
    await page.goto(config.demoUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await sleep(1500);

    // Locate chat input in CopilotChat or headless textarea
    const inputLocator = page.locator('textarea, input[type="text"], [contenteditable="true"]').first();
    await inputLocator.waitFor({ timeout: 8000 });

    const inputBox = await inputLocator.boundingBox();
    if (inputBox) {
      // Glide mouse to the chat input box and click
      await humanGlide(page, inputBox.x + 80, inputBox.y + inputBox.height / 2, 25);
      await page.mouse.down();
      await sleep(100);
      await page.mouse.up();
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
          await page.mouse.down();
          await sleep(120);
          await page.mouse.up();
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
      const finalMp4 = join(RECORDINGS_DIR, `${config.id}.mp4`);

      try {
        const tempPath = await video.path();
        if (tempPath && existsSync(tempPath)) {
          if (existsSync(finalWebm)) unlinkSync(finalWebm);
          renameSync(tempPath, finalWebm);
          console.log(`🎥 WebM Video saved: ${finalWebm}`);

          // Convert to MP4 via FFmpeg
          try {
            console.log(`🔄 Converting to MP4: ${finalMp4}...`);
            execSync(`ffmpeg -y -i "${finalWebm}" -c:v libx264 -pix_fmt yuv420p "${finalMp4}"`, { stdio: 'ignore' });
            console.log(`✨ Final MP4 ready: ${finalMp4}`);
          } catch (err) {
            console.warn(`FFmpeg conversion note: ${err}`);
          }
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
