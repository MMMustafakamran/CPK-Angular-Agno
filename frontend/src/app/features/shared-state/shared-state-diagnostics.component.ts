/**
 * HARNESS-ONLY. Not from the guide, and deliberately not mounted by any of the
 * guide's own components — workspace/account-context/selection-context stay
 * byte-identical to what the doc publishes, per the repo's verbatim rule.
 *
 * Why it exists: the guide's own sample proves shared state only through the
 * agent's prose. "high" in a sentence is weak evidence — the model could infer
 * it from the question, and a stale or silently-dropped write looks exactly the
 * same on screen. This panel makes the browser-side half observable, so a
 * failure can be located instead of guessed at:
 *
 *   - every `store().state()` transition, timestamped, with the keys that moved
 *   - whether a transition arrived while a run was in flight (agent-driven) or
 *     with the agent idle (browser-driven) — the two are what STATE_SNAPSHOT
 *     round-tripping looks like from here
 *   - what the read-only context accessors currently hold, so a wrong answer
 *     can be pinned to the context, not the state
 *
 * It reads the same public surface the guide uses (`injectAgentStore`) and
 * writes nothing, so mounting it cannot change what the page under test does.
 */
import { DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CopilotKit, injectAgentStore } from '@copilotkit/angular';

interface Transition {
  at: Date;
  /** Keys whose value differs from the previous snapshot. */
  changed: string[];
  /** True when a run was in flight — i.e. the agent, not the browser, wrote. */
  duringRun: boolean;
  json: string;
}

interface ContextEntry {
  description: string;
  value: string;
}

const MAX_ROWS = 12;

@Component({
  selector: 'app-shared-state-diagnostics',
  imports: [DatePipe],
  template: `
    <section class="diag">
      <header class="diag__bar">
        <strong>State diagnostics</strong>
        <span class="diag__pill" [class.diag__pill--live]="isRunning()">
          {{ isRunning() ? 'run in flight' : 'agent idle' }}
        </span>
        <span class="diag__meta">agent: default</span>
        <span class="diag__meta">{{ transitions().length }} transitions</span>
      </header>

      <div class="diag__grid">
        <div>
          <h4>Live agent state</h4>
          <pre data-testid="diag-state">{{ stateJson() }}</pre>
          <p class="diag__note">
            Written by the guide's buttons through <code>agent.setState</code>,
            and by the agent through <code>STATE_SNAPSHOT</code>. If a button
            press does not appear here, the write never reached the store and no
            answer from the agent can be trusted.
          </p>
        </div>

        <div>
          <h4>Registered context (read-only)</h4>
          @if (contextEntries().length === 0) {
            <p class="diag__empty">No context registered for this agent.</p>
          } @else {
            <ul class="diag__ctx" data-testid="diag-context">
              @for (c of contextEntries(); track c.description) {
                <li>
                  <span class="diag__keys">{{ c.description }}</span>
                  <span class="diag__json">{{ c.value }}</span>
                </li>
              }
            </ul>
          }
          <p class="diag__note">
            This is the half the guide gives you no way to see. Pressing
            <strong>Use London time</strong> writes nothing to agent state, so
            no transition is logged and the button appears dead — the value
            changes only here, and on the next run's payload. Polled, because
            the Angular service exposes signals for agents, threads, licence and
            suggestions but none for context.
          </p>
        </div>

        <div>
          <h4>Transitions</h4>
          @if (transitions().length === 0) {
            <p class="diag__empty">
              Nothing yet. Press a priority button, or send a message.
            </p>
          } @else {
            <ol class="diag__log" data-testid="diag-log">
              @for (t of transitions(); track t.at.getTime()) {
                <li>
                  <code>{{ t.at | date: 'HH:mm:ss.SSS' }}</code>
                  <span
                    class="diag__src"
                    [class.diag__src--agent]="t.duringRun"
                  >{{ t.duringRun ? 'agent' : 'browser' }}</span>
                  <span class="diag__keys">{{
                    t.changed.length ? t.changed.join(', ') : 'no keys moved'
                  }}</span>
                  <span class="diag__json">{{ t.json }}</span>
                </li>
              }
            </ol>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .diag {
        border-top: 2px solid #4f46e5;
        background: #0b1220;
        color: #dbe3f0;
        font-size: 0.78rem;
      }
      .diag__bar {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        padding: 0.5rem 0.85rem;
        border-bottom: 1px solid #24304a;
        background: #131c2f;
      }
      .diag__pill {
        padding: 0.1rem 0.5rem;
        border-radius: 999px;
        background: #22304d;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      .diag__pill--live {
        background: #3b2f18;
        color: #e6c07b;
      }
      .diag__meta {
        color: #8494b3;
        font-size: 0.7rem;
      }
      .diag__grid {
        display: grid;
        grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr) minmax(0, 1.2fr);
        gap: 1rem;
        padding: 0.75rem 0.85rem;
      }
      h4 {
        margin: 0 0 0.35rem;
        color: #7dd3fc;
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      pre {
        margin: 0;
        max-height: 8rem;
        overflow: auto;
        padding: 0.5rem;
        border: 1px solid #24304a;
        border-radius: 0.4rem;
        background: #060b16;
        font-size: 0.74rem;
      }
      .diag__note,
      .diag__empty {
        margin: 0.4rem 0 0;
        color: #8494b3;
        font-size: 0.68rem;
        line-height: 1.5;
      }
      .diag__ctx {
        margin: 0;
        max-height: 8rem;
        overflow: auto;
        padding-left: 1.1rem;
      }
      .diag__ctx li {
        padding: 0.15rem 0;
      }
      .diag__ctx .diag__json {
        display: block;
        white-space: normal;
        word-break: break-word;
      }
      .diag__log {
        margin: 0;
        max-height: 8rem;
        overflow: auto;
        padding-left: 1.1rem;
      }
      .diag__log li {
        display: flex;
        gap: 0.5rem;
        align-items: baseline;
        padding: 0.15rem 0;
        white-space: nowrap;
      }
      .diag__src {
        padding: 0 0.35rem;
        border-radius: 0.25rem;
        background: #22304d;
        color: #a9b8d6;
        font-size: 0.66rem;
        font-weight: 700;
      }
      .diag__src--agent {
        background: #14342a;
        color: #8ee7a5;
      }
      .diag__keys {
        color: #f0abfc;
      }
      .diag__json {
        overflow: hidden;
        color: #8494b3;
        text-overflow: ellipsis;
      }
    `,
  ],
})
export class SharedStateDiagnosticsComponent {
  private readonly store = injectAgentStore('default');
  private readonly copilotKit = inject(CopilotKit);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Registered agent context, polled.
   *
   * `CopilotKit` exposes signals for agents, runtime status, thread endpoints,
   * intelligence, licence status and suggestions — but not for context, so
   * there is no reactive way to observe `connectAgentContext` re-registering.
   * `core.getContextForAgent` is public and read-only; polling it is the only
   * hook available, and the need to poll is itself part of the finding.
   */
  protected readonly contextEntries = signal<ContextEntry[]>([]);

  protected readonly isRunning = computed(() => this.store().isRunning());
  protected readonly stateJson = computed(() =>
    JSON.stringify(this.store().state() ?? null, null, 2),
  );

  protected readonly transitions = signal<Transition[]>([]);

  /** Previous snapshot, so a transition can name the keys that actually moved. */
  private previous: Record<string, unknown> | null = null;

  constructor() {
    const poll = setInterval(() => this.readContext(), 750);
    this.destroyRef.onDestroy(() => clearInterval(poll));
    this.readContext();

    effect(() => {
      const next = this.store().state() as Record<string, unknown> | undefined;
      const json = JSON.stringify(next ?? null);
      if (json === JSON.stringify(this.previous)) return;

      const changed = keysThatMoved(this.previous, next ?? null);
      this.previous = (next as Record<string, unknown>) ?? null;

      this.transitions.update((rows) =>
        [
          {
            at: new Date(),
            changed,
            // Read untracked-ish: isRunning is already a signal read inside the
            // same effect, which is fine — a re-run only re-checks the guard.
            duringRun: this.store().isRunning(),
            json,
          },
          ...rows,
        ].slice(0, MAX_ROWS),
      );
    });
  }

  /** Snapshot the registered context, shortest description first. */
  private readContext(): void {
    let entries: ContextEntry[] = [];
    try {
      entries = (this.copilotKit.core.getContextForAgent('default') ?? []).map(
        (c) => ({
          description: String(c.description ?? '(no description)'),
          value: typeof c.value === 'string' ? c.value : JSON.stringify(c.value),
        }),
      );
    } catch {
      // A core without the accessor is a finding for the caller, not a crash
      // for the page under test.
      entries = [];
    }
    if (
      JSON.stringify(entries) !== JSON.stringify(this.contextEntries())
    ) {
      this.contextEntries.set(entries);
    }
  }
}

/** Keys present in either object whose JSON value differs. */
function keysThatMoved(
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null,
): string[] {
  const keys = new Set([
    ...Object.keys(before ?? {}),
    ...Object.keys(after ?? {}),
  ]);
  return [...keys].filter(
    (k) => JSON.stringify(before?.[k]) !== JSON.stringify(after?.[k]),
  );
}
