import { type Page } from 'playwright';
import { humanClick, humanGlide, sleep } from '../overlays/cursor';
import {
  closeNotepadNote,
  openNotepadWindow,
  typeInNotepad,
} from '../overlays/notepad';
import { waitForAgentResponseCompletion } from './index';
import { type PageActionHandler, type PageRecordConfig } from '../types';

export const runThreadsAction: PageActionHandler = async (
  page: Page,
  _config: PageRecordConfig,
) => {
  console.log(
    `   🧵 [Threads Action]: Describing issue at start, testing headless threads & drawer, chatting, and elaborating at end...`,
  );

  // 1. Wait for thread demo components to mount on left
  const threadList = page.locator('app-thread-list').first();
  await threadList.waitFor({ state: 'visible', timeout: 15000 });
  await sleep(600);

  // 2. Open Notepad on the right at the start to describe the issue slightly
  console.log(`   📝 Opening Notepad to describe initial threads issue...`);
  await openNotepadWindow(page, 'threads-issue.txt', {
    right: '28px',
    top: '95px',
    width: '640px',
    height: '560px',
  });

  await typeInNotepad(
    page,
    [
      'threads error',
      '',
      'integrated ThreadListComponent and CopilotThreadsDrawer from copilot-kit-angular',
      '- headless list keeps showing "Loading conversations..." and no threads',
      '- drawer sidebar does not open or show any thread list',
    ],
    1550,
    280,
  );
  await sleep(1500);

  // 3. Test the Headless list on the left (injectThreads)
  console.log(`   👉 Testing Headless thread list (injectThreads)...`);
  const newBtn = page.locator('app-thread-list button:has-text("New conversation")').first();
  if (await newBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
    const box = await newBtn.boundingBox();
    if (box) {
      await humanGlide(page, box.x + box.width / 2, box.y + box.height / 2, 22);
      await sleep(250);
      await humanClick(page);
      await sleep(1000);
    }
  }

  // Check and click Retry button if present
  const retryBtn = page.locator('app-thread-list button:has-text("Retry")').first();
  if (await retryBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    const rBox = await retryBtn.boundingBox();
    if (rBox) {
      await humanGlide(page, rBox.x + rBox.width / 2, rBox.y + rBox.height / 2, 20);
      await sleep(250);
      await humanClick(page);
      await sleep(1000);
    }
  }

  // 4. Test CopilotThreadsDrawer (show that drawer remains empty / closed)
  console.log(`   👉 Testing CopilotThreadsDrawer sidebar...`);
  const drawerEl = page.locator('copilot-threads-drawer').first();
  if (await drawerEl.isVisible({ timeout: 4000 }).catch(() => false)) {
    const dBox = await drawerEl.boundingBox();
    if (dBox) {
      await humanGlide(page, dBox.x + 30, dBox.y + 30, 22);
      await sleep(350);
      await humanClick(page);
      await sleep(1200);
    }
  }

  // 5. Test live chat conversation beside the drawer
  console.log(`   👉 Testing agent chat conversation...`);
  const chatTextarea = page
    .locator('app-conversations textarea.copilot-chat-textarea, app-conversations textarea')
    .first();
  await chatTextarea.waitFor({ state: 'visible', timeout: 10000 });

  const areaBox = await chatTextarea.boundingBox();
  if (areaBox) {
    await humanGlide(page, areaBox.x + 30, areaBox.y + areaBox.height / 2, 22);
    await sleep(250);
    await humanClick(page);
    await sleep(300);

    const testPrompt = 'Hello! Can you help me test multi-turn thread conversations?';
    await chatTextarea.pressSequentially(testPrompt, { delay: 35 });
    await sleep(350);

    // Guarantee Angular signal receives the input event
    await page.evaluate((text) => {
      const textarea = document.querySelector('app-conversations textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, testPrompt);
    await sleep(300);

    // Click Send button
    const sendBtn = page
      .locator(
        'app-conversations copilot-chat-send-button button, app-conversations button.copilot-chat-send-button, app-conversations button[aria-label*="Send" i], app-conversations button[type="submit"]',
      )
      .first();
    if (await sendBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      const sBox = await sendBtn.boundingBox();
      if (sBox) {
        await humanGlide(page, sBox.x + sBox.width / 2, sBox.y + sBox.height / 2, 20);
        await sleep(200);
        await humanClick(page);
      } else {
        await chatTextarea.press('Enter');
      }
    } else {
      await chatTextarea.press('Enter');
    }

    // Wait for agent token streaming and response completion
    await waitForAgentResponseCompletion(page, 4000);
  }

  // 6. Glide cursor over completed agent response
  const lastMsg = page
    .locator(
      'app-conversations copilot-chat-assistant-message, app-conversations .copilot-chat-message-assistant, app-conversations [data-role="assistant"]',
    )
    .last();
  if (await lastMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
    const msgBox = await lastMsg.boundingBox();
    if (msgBox) {
      await humanGlide(page, msgBox.x + 60, msgBox.y + 40, 22);
      await sleep(1500);
    }
  }

  // 7. Elaborate in Notepad at the end with full technical context
  console.log(`   📝 Elaborating full technical context in Notepad at end...`);
  await typeInNotepad(
    page,
    [
      '',
      '- agent chat responds, but threads are not registered / saved',
      '- backend lacks cloud authentication / intelligence key',
      '- thread mutations & persistence cannot sync to frontend',
      '',
      'pkgs:',
      '@angular/cdk 22',
      '@copilotkit/angular 0.3.1',
      '@copilotkit/runtime 1.68.1',
    ],
    1550,
    380,
  );

  // 8. Reading pause on the elaborated note
  console.log(`   📖 Pausing for reading complete elaborated error report...`);
  await sleep(5000);

  // 9. Smoothly close Notepad overlay
  await closeNotepadNote(page);
  await sleep(1200);
};
