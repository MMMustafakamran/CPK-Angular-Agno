/**
 * Voice and multimodal input — the microphone is real, the transcription is not.
 *
 * https://docs.copilotkit.ai/angular/agno/guides/voice-multimodal
 *
 * The control renders and records; this runtime configures no transcription
 * service, so transcription fails by design. The click is filmed, the reason is
 * written down, and the chat is then prompted by keyboard — so the recording
 * ends on a real answer rather than on a failure that could be read as the whole
 * page being broken.
 */
import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

import { closeNotepadNote, showNotepadNote } from './notepad';

export const runVoiceAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
) => {
  const micBtn = page
    .locator(
      'copilot-chat-start-transcribe-button button, button[aria-label*="Transcribe" i]',
    )
    .first();

  const micBox = await micBtn
    .waitFor({ state: 'visible', timeout: 8000 })
    .then(() => micBtn.boundingBox())
    .catch(() => null);

  if (micBox) {
    console.log(`   🎙️ Clicking the microphone control...`);
    await humanGlide(page, micBox.x + micBox.width / 2, micBox.y + micBox.height / 2, 22);
    await sleep(400);
    await humanClick(page);
    await sleep(1800);
  } else {
    console.warn(`   ⚠️ transcribe control not found — the composer may not expose it.`);
  }

  await showNotepadNote(page, 'voice-notes.txt', [
    'voice / transcription',
    '',
    '- the microphone control renders and records in the browser',
    '- this Copilot Runtime configures no transcription service,',
    '  so the transcribe request fails — expected, not a defect',
    '- attachments on the same composer work: image/* and application/pdf',
    '',
    'pkgs:',
    '@copilotkit/angular 0.3.1',
    '@copilotkit/runtime 1.68.1',
  ]);
  await closeNotepadNote(page);
  await sleep(800);

  // Typed, not spoken — so the page still ends on a real agent reply.
  console.log(`   ⌨️ Falling back to the keyboard for the actual turn...`);
  const msgCount = await sendPrompt(page, config.prompt);
  await waitForAgentResponseCompletion(page, config.waitAfterPromptMs ?? 4000, msgCount);
};
