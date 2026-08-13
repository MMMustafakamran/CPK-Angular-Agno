/**
 * Copilot Runtime for this harness.
 *
 * Shape comes from the Angular quickstart's Node runtime server
 * (https://docs.copilotkit.ai/angular/agno/quickstart), with the agent
 * swapped for the `AgnoAgent` binding the Agno quickstart specifies
 * (https://docs.copilotkit.ai/agno/quickstart) — the Angular/Agno quickstart
 * defers the backend step to "register this backend as the `default` agent".
 *
 * `default` and `support` resolve to the same Agno process. `support` exists so
 * the doc snippets that use `agentId="support"` (Chat UI, Threads) run verbatim.
 *
 * `a2ui: {}` enables A2UIMiddleware for every registered agent, per
 * https://docs.copilotkit.ai/angular/agno/backend/copilot-runtime
 */
import { createServer } from "node:http";
import { CopilotRuntime } from "@copilotkit/runtime/v2";
import { createCopilotNodeListener } from "@copilotkit/runtime/v2/node";
import { AgnoAgent } from "@ag-ui/agno";

const agentUrl = process.env["AGNO_AGENT_URL"] ?? "http://localhost:8000/agui";

const runtime = new CopilotRuntime({
  agents: {
    default: new AgnoAgent({ url: agentUrl }),
    support: new AgnoAgent({ url: agentUrl }),
  },
  a2ui: {},
});

const port = Number(process.env["PORT"] ?? 8200);

createServer(
  createCopilotNodeListener({
    runtime,
    basePath: "/api/copilotkit",
    cors: true,
  }),
).listen(port, () => {
  console.log(
    `Copilot Runtime listening at http://localhost:${port}/api/copilotkit`,
  );
  console.log(`Agno agent: ${agentUrl}`);
});
