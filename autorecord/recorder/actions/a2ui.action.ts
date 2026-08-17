import { type Page } from 'playwright';
import { humanClick, humanGlide, sleep } from '../overlays/cursor';
import {
  closeNotepadNote,
  openNotepadWindow,
  typeInNotepad,
} from '../overlays/notepad';
import { waitForAgentResponseCompletion } from './index';
import { type PageActionHandler, type PageRecordConfig } from '../types';

export const runA2uiAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  console.log(
    `   🎨 [A2UI Action]: Testing declarative A2UI demo, chat prompt & typing developer evaluation in Notepad...`,
  );

  // 1. Wait for the chat composer to be visible in A2UI demo
  const inputLocator = page
    .locator('textarea, input[type="text"], [contenteditable="true"]')
    .first();
  await inputLocator.waitFor({ state: 'visible', timeout: 15000 });
  await sleep(600);

  // 2. Focus input and type test prompt
  const inputBox = await inputLocator.boundingBox();
  if (inputBox) {
    console.log(`   👉 Focusing A2UI chat input...`);
    await humanGlide(
      page,
      inputBox.x + 80,
      inputBox.y + inputBox.height / 2,
      22,
    );
    await humanClick(page);
  } else {
    await inputLocator.click();
  }
  await sleep(400);

  const prompt = config.prompt || 'Show me a card comparing two flight options.';
  for (const char of prompt) {
    await page.keyboard.type(char, { delay: 40 });
  }
  await sleep(500);

  // 3. Submit prompt via Send button
  const sendBtn = page
    .locator(
      'button[aria-label*="Send message" i], button[aria-label*="Send" i], button[type="submit"], button:has-text("Send"), .copilotKitSendButton',
    )
    .first();

  if (await sendBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    const btnBox = await sendBtn.boundingBox();
    if (btnBox) {
      console.log(`   👉 Clicking Send button...`);
      await humanGlide(
        page,
        btnBox.x + btnBox.width / 2,
        btnBox.y + btnBox.height / 2,
        20,
      );
      await humanClick(page);
    } else {
      await sendBtn.click();
    }
  } else {
    await page.keyboard.press('Enter');
  }

  // 4. Wait for agent token streaming and response completion
  await waitForAgentResponseCompletion(page, 4000);

  // 5. Glide cursor over completed agent response (showing prose text instead of generative card)
  const lastMsg = page
    .locator('.copilotKitAssistantMessage, [data-message-role="assistant"], [data-role="assistant"]')
    .last();
  if (await lastMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
    const msgBox = await lastMsg.boundingBox();
    if (msgBox) {
      console.log(`   🎯 Focusing cursor on agent response...`);
      await humanGlide(page, msgBox.x + 60, msgBox.y + 40, 22);
      await sleep(1500);
    }
  }

  // 6. Open Windows 11 Notepad and type developer evaluation note
  console.log(`   📝 Opening Notepad to type developer evaluation notes...`);
  await openNotepadWindow(page, 'a2ui-issue.txt', {
    right: '32px',
    top: '95px',
    width: '680px',
    height: '560px',
  });

  await typeInNotepad(
    page,
    [
      'a2ui error / limitation:',
      '',
      '- runtime middleware is enabled (a2ui: {})',
      '- chat conversation streams response in plain prose text',
      '- A2UI declarative card does not render because frontend catalog is missing',
      '- the official guide references undefined catalogs (beautifulCatalog, declarativeCatalog, fixedCatalog) and dynamicString',
      '- without a complete createCatalog definition, the agent cannot generate declarative A2UI components',
      '',
      'pkgs:',
      '@angular/core: 22.1.x',
      '@copilotkit/angular: 0.3.1',
      '@copilotkit/runtime: 1.67.1',
      '@ag-ui/agno: 0.0.5',
    ],
    1550,
    280,
  );

  // 7. Reading pause on the completed note
  console.log(`   📖 Pausing for reading typed Notepad error report...`);
  await sleep(5000);

  // 8. Smoothly close Notepad overlay
  await closeNotepadNote(page);
  await sleep(1200);
};
