import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideCopilotKit,
  type SandboxFunction,
} from '@copilotkit/angular';
import { z } from 'zod';

import { routes } from './app.routes';

/**
 * Host function exposed to sandboxed Open Generative UI, verbatim from
 * https://docs.copilotkit.ai/angular/agno/guides/frontend-tools-generative-ui
 */
const setDashboardFilter: SandboxFunction<{ filter: string }> = {
  name: 'setDashboardFilter',
  description: 'Set the active dashboard filter',
  parameters: z.object({ filter: z.string() }),
  handler: async ({ filter }) => {
    sessionStorage.setItem('dashboard-filter', filter);
    return { applied: filter };
  },
};


/**
 * One provider at the application root, so a conversation started on any demo
 * route continues on every other route.
 *
 * `runtimeUrl` points at the Copilot Runtime from the quickstart — the
 * supported path, where the browser never talks to the Agno agent directly.
 * The `AgnoAgent` binding itself lives server-side in frontend/server.ts.
 *
 * `a2ui.recovery` and `openGenerativeUI.sandboxFunctions` are the A2UI and
 * generative-UI guide options. No `a2ui.catalog` is set yet — supplying one is
 * what actually registers the render_a2ui renderer, so A2UI stays inert until
 * a catalog is added. See README known issues.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideClientHydration(),
    provideCopilotKit({
      runtimeUrl: 'http://localhost:8200/api/copilotkit',
      // The Inspector mounts itself from 0.4.0 on; `enableInspector` is the
      // only control the page gives you. Left `true` so the launcher is on
      // screen for the /inspector recording — the doc's own sample is the
      // opposite, `enableInspector: false` to hide it during development.
      // Production and server renders drop it regardless of this flag.
      // https://docs.copilotkit.ai/angular/agno/inspector
      enableInspector: true,
      a2ui: {
        recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
      },
      openGenerativeUI: {
        // `sandboxFunctions` is typed `SandboxFunction[]`, i.e.
        // `SandboxFunction<Record<string, unknown>>[]`, so the guide's
        // `SandboxFunction<{ filter: string }>` is not assignable to it as
        // written. Cast at the array site, the same idiom the docs use for the
        // equivalent `component` variance problem. See README known issues.
        sandboxFunctions: [setDashboardFilter as unknown as SandboxFunction],
      },
    }),
  ],
};
