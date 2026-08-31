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
import { Component, computed, effect, signal } from '@angular/core';
import { injectAgentStore } from '@copilotkit/angular';

interface Transition {
  at: Date;
  /** Keys whose value differs from the previous snapshot. */
  changed: string[];
  /** True when a run was in flight — i.e. the agent, not the browser, wrote. */
  duringRun: boolean;
  json: string;
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
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
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

  protected readonly isRunning = computed(() => this.store().isRunning());
  protected readonly stateJson = computed(() =>
    JSON.stringify(this.store().state() ?? null, null, 2),
  );

  protected readonly transitions = signal<Transition[]>([]);

  /** Previous snapshot, so a transition can name the keys that actually moved. */
  private previous: Record<string, unknown> | null = null;

  constructor() {
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
