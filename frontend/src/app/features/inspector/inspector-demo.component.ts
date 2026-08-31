/**
 * Inspector page, as rewritten on 30 Aug.
 * https://docs.copilotkit.ai/angular/agno/inspector
 *
 * The page's claim is that there is nothing to mount: `@copilotkit/angular`
 * creates `cpk-web-inspector` itself and appends it to `document.body` after
 * the first browser render, so this component installs nothing. It only puts a
 * chat on screen (something has to inject `CopilotKit` for the inspector
 * service to be constructed) and reports whether the element the framework is
 * supposed to have created is actually there.
 *
 * The probe is the test, not a feature the page asks for: it is how a recording
 * shows the mount succeeded or failed without anyone squinting at a corner of
 * the viewport.
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { CopilotChat } from '@copilotkit/angular';

@Component({
  selector: 'app-inspector-demo',
  imports: [CopilotChat],
  template: `
    <div class="flex h-screen flex-col">
      <div
        class="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm"
      >
        <span
          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
          [class]="
            mounted()
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-800'
          "
        >
          {{ mounted() ? 'cpk-web-inspector mounted' : 'no cpk-web-inspector' }}
        </span>
        <span class="text-[var(--muted)]">
          Nothing on this page mounts it — the launcher in the corner is the
          framework's own.
        </span>
      </div>
      <div class="min-h-0 flex-1">
        <copilot-chat />
      </div>
    </div>
  `,
})
export class InspectorDemoComponent {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly mounted = signal(false);

  constructor() {
    // The mount is a dynamic import inside the service, so it lands a tick or
    // two after the first render rather than during it.
    afterNextRender(() => {
      if (!this.isBrowser) return;
      const check = () =>
        this.mounted.set(
          this.document.querySelector('cpk-web-inspector') !== null,
        );
      check();
      setTimeout(check, 500);
      setTimeout(check, 2000);
    });
  }
}
