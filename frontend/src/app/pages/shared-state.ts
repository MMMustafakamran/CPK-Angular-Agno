import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-shared-state-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode],
  template: `
    <app-route-header path="/shared-state" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          Open the demo and work down the panel at the bottom — it logs every
          <code>store().state()</code> transition, so each write can be seen
          landing <em>before</em> the agent is asked about it.
        </p>
        <ol
          class="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700"
        >
          <li>
            <strong>Baseline.</strong> Before touching anything, ask
            <em>what priority is my workspace currently set to?</em>. The panel
            shows the agent's real state is <code>&#123;&#125;</code> — the guide's
            <code>EMPTY_STATE</code> is a render-time fallback that was never
            sent to the agent. A confident <code>normal</code> here is the model
            reading the left-hand panel's text, not agent state. See Known
            issues #16.
          </li>
          <li>
            <strong>Write high.</strong> Press <strong>Mark high priority</strong>.
            A <code>browser</code> transition appears naming
            <code>priority</code>, and the state becomes
            <code>&#123; "priority": "high" &#125;</code> — note that
            <code>notes</code> is absent, not empty. Ask again — expect
            <code>high</code>.
          </li>
          <li>
            <strong>Write low.</strong> Press <strong>Mark low priority</strong>
            and ask again — expect <code>low</code>.
          </li>
          <li>
            <strong>Context, not state.</strong> Press
            <strong>Use London time</strong>, then ask
            <em>what is my username and timezone?</em> — expect <code>Ada</code>
            and <code>Europe/London</code>, with <strong>no</strong> new
            transition in the log, because context is not agent state.
          </li>
        </ol>
        <p class="mt-2 text-slate-700">
          <strong>Pass:</strong> all four. Step 1 matters most — an agent that
          answers <code>high</code> before any write is echoing the question,
          and every later step is then meaningless.
          <strong>Fail, and where to look:</strong> no transition logged after a
          button press means the browser write never reached the store; a
          transition logged but the agent still answering the old value means
          the write never reached the agent; a wrong timezone with a correct
          priority isolates the fault to the read-only context accessor rather
          than to state.
        </p>
      </ui-try-it>

      <ui-panel heading="Two different data flows">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 text-slate-600">
              <th class="py-2 pr-4 font-semibold">Data flow</th>
              <th class="py-2 font-semibold">Use</th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr class="border-b border-slate-100">
              <td class="py-2 pr-4">
                Agent and application both read and write the value
              </td>
              <td class="py-2">
                <code>injectAgentStore</code> and <code>agent.setState</code>
              </td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                The application owns the value and the agent only reads it
              </td>
              <td class="py-2">
                <code>connectAgentContext</code> or
                <code>CopilotKitAgentContext</code>
              </td>
            </tr>
          </tbody>
        </table>
      </ui-panel>

      <ui-panel heading="Read and write agent state">
        <p class="mb-3 text-sm text-slate-700">
          Read through <code>store().state()</code> so Angular tracks changes;
          write through the plain AG-UI agent at <code>store().agent</code>,
          replacing the object rather than mutating it.
        </p>
        <ui-source path="src/app/features/shared-state/workspace.component.ts" />
      </ui-panel>

      <ui-callout title="The agent has to agree on the state shape">
        The guide's component expects
        <code>{{ '{' }} notes, priority {{ '}' }}</code>. The Agno agent in
        <code>backend/main.py</code> is started with that same
        <code>session_state</code> shape, plus
        <code>add_session_state_to_context=True</code> so the model can see it
        and <code>enable_agentic_state=True</code> so it can update it. Without
        that alignment the panel would sit on its <code>EMPTY_STATE</code>
        defaults forever.
      </ui-callout>

      <ui-panel heading="Read-only context — accessor form">
        <p class="mb-3 text-sm text-slate-700">
          The internal effect removes the old context and registers the new
          value whenever a read signal changes, and removes the last
          registration when the owning injector is destroyed.
        </p>
        <ui-source
          path="src/app/features/shared-state/account-context.component.ts"
        />
      </ui-panel>

      <ui-panel heading="Read-only context — directive form">
        <p class="mb-3 text-sm text-slate-700">
          Render the directive only once you have a complete context: if it
          starts without one, later input changes do not create the first
          registration.
        </p>
        <ui-source
          path="src/app/features/shared-state/selection-context.component.ts"
        />
      </ui-panel>

      <ui-panel heading="All three, against one chat">
        <ui-source
          path="src/app/features/shared-state/shared-state-chat.component.ts"
        />
      </ui-panel>
    </div>
  `,
})
export default class SharedStatePage {}
