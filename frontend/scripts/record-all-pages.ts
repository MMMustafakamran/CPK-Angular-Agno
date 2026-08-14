/**
 * Automated Screen Recording & Demonstration Pipeline
 *
 * For each doc page, this script:
 * 1. Opens the official CopilotKit doc URL, scrolls to and spotlights the code snippet.
 * 2. Opens the full-screen VS Code IDE view with project file tree, active tab, and highlighted lines.
 * 3. Opens the clean frontend demo (/demo), types the test prompt, and captures the streaming AI / tool output.
 * 4. Exports pristine 1080p MP4 videos into `./recordings/`.
 *
 * Usage:
 *   npx tsx scripts/record-all-pages.ts                # Records all pages
 *   npx tsx scripts/record-all-pages.ts --page=quickstart # Records one specific page
 */

import { chromium, type Page } from 'playwright';
import { execSync, spawn } from 'node:child_process';
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

/** Smoothly scrolls the window down in human-like steps */
async function smoothScrollDown(page: Page, totalPixels: number = 600, durationMs: number = 2500): Promise<void> {
  const steps = 30;
  const distancePerStep = totalPixels / steps;
  const interval = durationMs / steps;

  for (let i = 0; i < steps; i++) {
    await page.evaluate((dist) => window.scrollBy({ top: dist, behavior: 'smooth' }), distancePerStep);
    await sleep(interval);
  }
}

/** Injects an animated spotlight highlight overlay onto a selector */
async function spotlightElement(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    args: ['--start-maximized', '--force-dark-mode'],
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

  // Prevent white flash during transitions
  await page.addInitScript(() => {
    document.documentElement.style.backgroundColor = '#1e1e1e';
  });

  try {
    // ----------------------------------------------------
    // STEP 1: DOC PAGE & SMOOTH SCROLL TO CODE SNIPPET
    // ----------------------------------------------------
    console.log(`\n📖 Step 1: Navigating to Official Doc (${config.docUrl})...`);
    try {
      await page.goto(config.docUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(1500);

      // Human-like smooth scroll down the doc page
      console.log(`   Scrolling down doc page to show code snippet...`);
      await smoothScrollDown(page, 500, 2200);

      // Highlight code block
      const hasCode = await page.$('pre, code, div[class*="code"]');
      if (hasCode) {
        await spotlightElement(page, 'pre, code, div[class*="code"]');
      }
      await sleep(3500);
    } catch (e) {
      console.warn(`Doc navigation note: ${e}`);
      await sleep(2000);
    }

    // ----------------------------------------------------
    // STEP 2: SHOW PROJECT CODE IN IDE & SMOOTH SCROLL
    // ----------------------------------------------------
    console.log(`\n💻 Step 2: Displaying Project Code in IDE (${config.ideFile}:${config.ideLine})...`);
    const ideUrl = `http://localhost:4200/ide?file=${encodeURIComponent(config.ideFile)}&line=${config.ideLine}`;
    await page.goto(ideUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await sleep(1000);

    // Smoothly scroll down inside the editor to the target line
    await page.evaluate((targetLine) => {
      const container = document.getElementById('editor-container');
      const targetEl = document.getElementById(`line-${targetLine}`);
      if (container && targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, config.ideLine);

    // Also trigger VS Code desktop goto if available
    try {
      execSync(`code -r -g "${config.ideFile}:${config.ideLine}"`, { stdio: 'ignore' });
    } catch {}

    await sleep(4500);

    // ----------------------------------------------------
    // STEP 3: FRONTEND DEMO & PROMPT EXECUTION
    // ----------------------------------------------------
    console.log(`\n🚀 Step 3: Opening Demo and Sending Prompt (${config.prompt})...`);
    await page.goto(config.demoUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await sleep(2000);

    // Locate chat input in CopilotChat or headless textarea
    const inputLocator = page.locator('textarea, input[type="text"], [contenteditable="true"]').first();
    await inputLocator.waitFor({ timeout: 8000 });
    await inputLocator.click();

    // Type with natural keystroke cadence
    for (const char of config.prompt) {
      await page.keyboard.type(char, { delay: 45 });
    }
    await sleep(500);

    // Send the message
    await page.keyboard.press('Enter');

    // Also click send button if available
    try {
      const sendBtn = page.locator('button[type="submit"], button:has-text("Send"), .copilotKitSendButton').first();
      if (await sendBtn.isVisible()) {
        await sendBtn.click();
      }
    } catch {}

    console.log(`⏳ Waiting for AI agent response / tool rendering...`);
    // Wait for response
    await sleep(config.waitAfterPromptMs ?? 9000);

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
