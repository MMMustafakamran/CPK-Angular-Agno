import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-inspector-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode],
  template: `
    <app-route-header path="/inspector" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          Open the demo. Look at the corner of the viewport for the Inspector
          launcher, then open <strong>Agents → Agent</strong> and send a message
          with <strong>Agents → AG-UI Events</strong> open.
        </p>
        <p class="mt-2 text-slate-700">
          <strong>Pass:</strong> the badge at the top of the demo reads
          <code>cpk-web-inspector mounted</code>, the launcher is in the
          bottom-left corner (the page's CSS override, applied in
          <code>src/styles.css</code>), the agent is listed, and events move
          while a message streams. <strong>Fail:</strong> no launcher, or the
          badge stays on <code>no cpk-web-inspector</code>.
        </p>
      </ui-try-it>

      <ui-panel heading="Nothing to mount">
        <p class="text-sm text-slate-700">
          The demo component installs no inspector. The
          <code>CopilotKit</code> service creates
          <code>cpk-web-inspector</code>, hands it the application core, and
          appends it to <code>document.body</code> after the first browser
          render. The component below only mounts a chat — something has to
          inject <code>CopilotKit</code> — and probes for the element so the
          mount is visible in a recording.
        </p>
        <ui-source
          path="src/app/features/inspector/inspector-demo.component.ts"
        />
      </ui-panel>

      <ui-panel heading="Visibility is a provider option">
        <p class="text-sm text-slate-700">
          The page controls the Inspector through <code>enableInspector</code>
          on <code>provideCopilotKit</code>. This harness leaves it at its
          default (on in a development browser build, off in production and
          during server rendering) and records the doc's opt-out beside it.
        </p>
        <ui-source path="src/app/app.config.ts" />
      </ui-panel>

      <ui-callout tone="warn" title="Version floor, not a suggestion">
        The page describes <code>@copilotkit/angular</code> ≥ 0.4.0. This repo
        ran on 0.3.1 until this route was added, and 0.3.1 neither depends on
        <code>@copilotkit/web-inspector</code> nor accepts
        <code>enableInspector</code> — the option is not in its
        <code>CopilotKitConfig</code>, so the page's only code sample does not
        type-check there. The page states the floor for the
        <em>deletion</em> advice, not for the behaviour it documents. See the
        README's known issues.
      </ui-callout>

      <ui-callout tone="warn" title="Nothing here to delete">
        The page's main warning is about a hand-written
        <code>WebInspector</code> component from its previous revision, whose
        <code>DestroyRef.onDestroy</code> unconditionally removes the element
        the framework now drives. This harness never had one, so there is no
        removal to demonstrate — recorded as not-applicable rather than passed.
      </ui-callout>
    </div>
  `,
})
export default class InspectorPage {}
