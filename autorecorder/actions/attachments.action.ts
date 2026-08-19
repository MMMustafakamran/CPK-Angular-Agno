/**
 * Attachments — attach a file the way a person does, then ask about it.
 *
 * https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless
 *
 * The picker is a native OS dialog, which Playwright cannot film. So the cursor
 * really does travel to the "+" control and open the CDK menu — that part is
 * the video — and the file itself is then placed on the `input[type=file]`
 * through a DataTransfer, which is the same event the dialog would have raised.
 *
 * The fixture is a 1x1 PNG written at record time rather than committed: this
 * config has `enabled: true` with no `onUpload`, so the file is inlined as
 * base64 into the message, and a real screenshot would be a large payload for
 * no gain. Nothing here inspects the image.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

/** A valid 1x1 PNG. */
const DUMMY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const FIXTURE_NAME = 'sample_chart.png';

/** Writes the fixture into `autorecorder/assets/` and returns its base64. */
function ensureFixture(rootPath: string): string {
  const dir = join(rootPath, 'autorecorder', 'assets');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, FIXTURE_NAME), Buffer.from(DUMMY_PNG_BASE64, 'base64'));
  return DUMMY_PNG_BASE64;
}

export const runAttachmentsAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
  rootPath: string,
) => {
  const base64 = ensureFixture(rootPath);

  // ── Open the attachment menu on camera ────────────────────────────────────
  const addBtn = page
    .locator(
      'button[aria-label*="Add photos or files" i], button[aria-label*="attach" i], .cdk-menu-trigger',
    )
    .first();

  const addBox = await addBtn
    .waitFor({ state: 'visible', timeout: 8000 })
    .then(() => addBtn.boundingBox())
    .catch(() => null);

  if (addBox) {
    console.log(`   📎 Opening the attachment menu...`);
    await humanGlide(page, addBox.x + addBox.width / 2, addBox.y + addBox.height / 2, 22);
    await sleep(350);
    await humanClick(page);
    await sleep(600);
  } else {
    console.warn(`   ⚠️ attachment "+" control not found — attaching headlessly.`);
  }

  const menuItem = page
    .locator('[role="menuitem"]:has-text("Add photos or files"), .cdk-menu-item')
    .first();
  const menuBox = await menuItem
    .isVisible({ timeout: 4000 })
    .then((v) => (v ? menuItem.boundingBox() : null))
    .catch(() => null);

  if (menuBox) {
    await humanGlide(page, menuBox.x + menuBox.width / 2, menuBox.y + menuBox.height / 2, 20);
    await sleep(350);
    await humanClick(page);
  }

  // ── Hand the file to the input the dialog would have filled ───────────────
  console.log(`   📁 Placing ${FIXTURE_NAME} on the file input...`);
  const attached = await page.evaluate(
    async ({ b64, filename }) => {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (!input) return false;

      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const file = new File([bytes], filename, { type: 'image/png' });
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    },
    { b64: base64, filename: FIXTURE_NAME },
  );

  if (!attached) {
    console.warn(`   ⚠️ no input[type=file] in the DOM — the queue will stay empty.`);
  }
  await sleep(1500);

  // ── Show the queued thumbnail before sending ──────────────────────────────
  const queue = page
    .locator('copilot-chat-attachment-queue, [data-testid="copilot-attachment-queue"]')
    .first();
  const queueBox = await queue.boundingBox().catch(() => null);
  if (queueBox) {
    console.log(`   🎯 Showing the queued attachment.`);
    await humanGlide(page, queueBox.x + queueBox.width / 2, queueBox.y + queueBox.height / 2, 22);
    await sleep(1200);
  }

  // The composer moves down once the queue appears, so the prompt is typed
  // after the attachment, never before.
  const msgCount = await sendPrompt(page, config.prompt);
  await waitForAgentResponseCompletion(page, config.waitAfterPromptMs ?? 4000, msgCount);
};
