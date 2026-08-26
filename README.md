# CopilotKit + Agno Test Suite — Angular

A navigable, working test harness for the Angular section of the CopilotKit Agno documentation — each guide is a route that actually runs the thing it describes.

| | |
|---|---|
| **Doc sync date** | 2026-08-12 (docs last fetched live) |
| **CopilotKit packages** | `@copilotkit/angular` 0.3.1 · `@copilotkit/runtime` 1.67.1 |
| **AG-UI packages** | `@ag-ui/agno` 0.0.5 |
| **Frontend** | Angular 22.1.1 · TypeScript 6.0 · Tailwind 4 · zoneless |
| **Runtime** | Node 24.16.0 · Copilot Runtime v2 Node listener on :8200 |
| **Backend** | Python 3.13.13 · Agno 2.8.7 · FastAPI/AgentOS on :8000 |
| **Build status** | No CI. Locally verified: `ng build` ✅ · 13 doc routes + 11 demo routes serve 200 ✅ · live agent run with tool call ✅ · human-in-the-loop pause ✅ · shared-state snapshot ✅ · A2UI **not** observed over the wire ⚠️ (see Known issues) |

---

## 2. Overview

[Agno](https://docs.agno.com) is a Python agent framework. Its `AgentOS` server can expose an agent over [AG-UI](https://ag-ui.com), the event protocol CopilotKit speaks. `@copilotkit/angular` is the first-party, signal-based Angular frontend for AG-UI agents, and it supports zoneless applications.

This repo is a **living test harness** for that pairing. Each route implements what its guide teaches — not a restatement of it. Every line of CopilotKit code in `frontend/src/app/features/` is taken from the live docs; where a doc snippet is not self-contained, it is displayed on the route page as a quoted sample and explicitly *not* mounted, rather than being completed with invented code.

Tracks: **<https://docs.copilotkit.ai/angular/agno>**

Scope is the eight pages named at build time: the quickstart plus the seven task guides. The last guide covers four topics at once and is split into four routes here.

---

## 3. Architecture

```
Browser (Angular 22, zoneless)
  │  @copilotkit/angular — provideCopilotKit, <copilot-chat>, signal APIs
  │  POST http://localhost:8200/api/copilotkit
  ▼
Copilot Runtime  ·  localhost:8200        ← Node, frontend/server.ts
  │  agents: { default, support } → new AgnoAgent({ url })
  │  a2ui: {}  → A2UIMiddleware
  │  POST http://localhost:8000/agui      ← AG-UI over SSE
  ▼
Agno AgentOS  ·  localhost:8000           ← Python / FastAPI
  │  AgentOS(agents=[agent], interfaces=[AGUI(agent=agent)])
  ▼
OpenAI  (gpt-4o)
```

Three points worth noting:

- **Three processes, not two.** Unlike the React/Next quickstart — where the runtime lives inside the Next app as an API route — Angular has no server route to host it, so the Copilot Runtime is its own Node process. This is the single biggest structural difference from the React version of this harness.
- **The backend for this framework is Python.** Agno is a Python library; the agent runs under `uvicorn`, not Node.
- **The model key never reaches the browser**, and never reaches the runtime either. Only the Agno process holds it.

**Why two agent ids.** `default` and `support` both resolve to the same Agno process. `default` is the id CopilotKit's prebuilt components use with no configuration; `support` exists so that the Chat UI and Threads guides' snippets — which are written as `agentId="support"` — run exactly as published instead of needing an edit.

---

## 4. Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 22+ (built on 24.16.0) | The Angular quickstart specifies Node 22. |
| npm | 10+ (built on 12.0.1) | Or pnpm/yarn. |
| Angular CLI | 20, 21, or 22 (built on 22.1.3) | `@copilotkit/angular` supports these three majors only. |
| Python | 3.13+ (built on 3.13.13) | Per `backend/.python-version`. |
| [`uv`](https://docs.astral.sh/uv/) | 0.11+ (built on 0.11.20) | Used for the backend. `pip` works too. |
| OpenAI API key | — | Required. |
| CopilotKit license key | — | **Optional.** Only affects the Threads and Memory routes. |

`@angular/cdk` must share your Angular major version. If you hit a peer-dependency error, pin it explicitly (`@angular/cdk@^22` on Angular 22).

---

## 5. Setup

**1. Clone**

```bash
git clone <this-repo> agno && cd agno
```

**2. Install frontend deps**

```bash
cd frontend && npm install && cd ..
```

**3. Install backend deps**

```bash
cd backend && uv sync && cd ..
```

**4. Configure the environment**

```bash
cp .env.example backend/.env
```

Then edit `backend/.env`:

| Variable | Where | What it does |
|---|---|---|
| `OPENAI_API_KEY` | `backend/.env` | **Required.** The model key. |
| `AGNO_AGENT_URL` | shell for the runtime | Where the runtime finds the agent. Defaults to `http://localhost:8000/agui`. |
| `PORT` | shell for the runtime | Runtime port. Defaults to `8200`. |
| `COPILOTKIT_TELEMETRY_DISABLED` | shell for the runtime | Opt out of anonymous runtime telemetry. |

> The Angular app's `runtimeUrl` is hardcoded to `http://localhost:8200/api/copilotkit` in `frontend/src/app/app.config.ts`, following the quickstart. If you change `PORT`, change that too.

**5. Update to latest packages (optional)**

To upgrade packages across frontend and backend while respecting peer dependency constraints:

**Frontend:**
```bash
cd frontend
npm run deps:update
cd ..
```
*(Or directly: `npx npm-check-updates -u --peer && npm install`)*

**Backend:**
```bash
cd backend
uv lock --upgrade
uv sync
cd ..
```

**Default ports:** frontend **4200**, runtime **8200**, agent **8000**.

---

## 6. Running the project

Three processes. The two Node ones share a terminal; the Python agent gets its own.

**Terminal 1 — the agent:**

```bash
cd backend
uv run main.py
```

Success looks like:

```
INFO:     Uvicorn running on http://localhost:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

**Terminal 2 — the runtime and the app together:**

```bash
cd frontend
npm run dev
```

`dev` runs the Copilot Runtime and `ng serve` side by side under `concurrently`, with each line prefixed by which process wrote it. Success looks like:

```
[runtime] Copilot Runtime listening at http://localhost:8200/api/copilotkit
[runtime] Agno agent: http://localhost:8000/agui
[angular]   ➜  Local:   http://localhost:4200/
```

Ctrl-C stops both. `--kill-others` means a crash in either one takes the other down rather than leaving half a stack running — if the runtime dies you'll see `Sending SIGTERM to other processes..` and the app exits too, instead of a chat that silently can't reach anything.

To run them separately — different terminals, independent restarts — the underlying scripts are still there:

```bash
npm run runtime   # Copilot Runtime only, :8200
npm start         # Angular dev server only, :4200
```

Open **<http://localhost:4200>**. The Introduction route probes both backends and shows a connection panel — check it first if anything misbehaves.

The one-command check the quickstart prescribes:

```bash
curl -s http://localhost:8200/api/copilotkit/info
```

It should list `default` and `support` under `agents`.

---

## 7. What to expect — walkthrough per section

Every route shows a status badge and a link to the doc page it tests.

### How each route is split

Routes with a live feature are split in two, following the reference harness:

| | |
|---|---|
| **`<route>`** | Notes, pass/fail criteria, and **the exact source** of the implementation. No live chat here. |
| **`<route>/demo`** | Just the running feature, with no sidebar or page chrome — built for screen recording. Reached via **Open demo ↗** in the route header. |

Two consequences worth knowing:

- **The code on a page is never a re-typed approximation.** `scripts/generate-sources.ts` reads the real files off disk at build time into `src/app/lib/generated-sources.ts`, so what you compare against the doc is what actually runs. Angular's esbuild pipeline has no `?raw` import, which is why this is a prestart/prebuild step rather than an import.
- **Demo routes share the app-root provider**, so a conversation started in one demo continues in another. That's deliberate — Quickstart, Frontend tools, A2UI, and Headless all drive the `default` agent and show the *same* conversation through four different interfaces.

### Getting Started

**`/` — Introduction**
Orientation plus a live connection check of both backends. **Pass:** two green dots, `200` from the runtime's `/info` and the agent's `/status`. **Fail:** a red dot — that process isn't running.

**`/quickstart` — Quickstart**
The minimum viable path: an `AgnoAgent` in the runtime, `provideCopilotKit`, one `<copilot-chat>`. **Try:** `Can you tell me a joke?` **Pass:** tokens stream in one at a time and render as markdown. **Fail:** nothing streams.

### Guides

**`/chat-ui` — Chat UI and customization**
Three surfaces in tabs — only one mounts at a time, since the popup and docked sidebar both use fixed positioning. **Try:** `What is CopilotKit?`, then switch tabs. **Pass:** the inline chat shows the guide's blue user bubbles and pale-blue assistant bubbles; the custom-message tab renders replies through a hand-written component labelled "Assistant"; the popup and sidebar open, trap focus, and close on Escape. **Fail:** a surface renders blank, or all tabs look identical.

**`/frontend-tools-generative-ui` — Frontend tools and generative UI**
A server-side tool call rendered by an Angular component. **Try:** `What's the weather in Tokyo?` **Pass:** the call renders through `WeatherCardComponent` — "Loading weather for Tokyo", then the city in bold with the result beneath. **Fail:** a plain-text answer with no card, meaning the renderer name and the agent's tool name have drifted apart.

**`/a2ui` — A2UI schemas, styling, and recovery**
Declarative generative UI. **Try:** `Show me a card comparing two flight options.` **Pass:** a rendered declarative surface appears in the chat. **Currently observed:** prose instead — see Known issues #2. **Fail (different failure):** raw JSON or protocol operations printed as text.

**`/voice-multimodal` — Voice and multimodal input**
**Try:** attach a PNG or PDF via the picker, drag-and-drop, and paste; then press the microphone. **Pass (attachments):** files are accepted and sent as content parts; a file over 10 MiB is rejected. **Pass (voice):** the browser asks for microphone permission and records. **Expected failure (voice):** transcription then fails — this runtime reports `audioFileTranscriptionEnabled: false`, and the guide is explicit that a visible microphone does not make an unavailable transcription service succeed.

**`/human-in-the-loop` — Human-in-the-loop and interrupts**
**Try:** `Delete my account, but ask me to approve it first.` **Pass:** an Approve / Reject card renders in the message stream and **nothing further streams until you click**. After clicking, the run resumes with your decision. **Fail:** two options as plain text, or the agent continues without waiting. The interrupt controller is also mounted but stays idle — this Agno agent emits no AG-UI interrupts.

**`/shared-state` — Shared state and agent context**
**Try:** press **Mark high priority**, then ask `What is my current priority?`; press **Use London time**, then ask `What timezone am I in, and which record am I looking at?` **Pass:** the agent reports `high`, then `Europe/London` and `record-42`; asking it to add a note updates the list on the left. **Fail:** the agent has no idea what you're referring to.

### Threads, memory, attachments, headless

These four routes all come from the single `threads-memory-attachments-headless` guide.

**`/threads` — Threads.** **Pass (unlicensed — the case here):** the headless list renders its controls with no threads, and the drawer renders its *locked* state. That locked state is the correct result: it proves the drawer mounted and read the platform's `threads` license feature. **Pass (licensed):** threads list and selecting a row replays that conversation. **Fail:** a blank area with no locked state.

**`/memory` — Memory.** **Pass (this runtime):** "Memory is not available for this runtime." — the `isAvailable()` gate resolved false and the guide's fallback rendered, which is the whole point of the sample. **Fail:** an empty panel with neither list nor fallback, or a thrown error.

**`/attachments` — Attachments.** **Try:** add a file via picker, drag-and-drop, and paste. **Pass:** all three paths work, a file over 10 MiB is rejected, and a failed upload logs its `reason` and `message` through `onUploadFailed`. **Fail:** drag-and-drop or paste does nothing.

**`/headless` — Headless UI.** **Try:** type into the bare textarea and press Send. **Pass:** the message appears in the hand-written transcript, "Agent is working…" shows during the run, and the reply streams — with no CopilotKit chrome anywhere. A conversation started on Quickstart is already visible here. **Fail:** Send does nothing.

**`/status`** — Every route and its status in one table.

---

## 8. Testing checklist / current status

Verified 2026-08-12 against a live stack (real OpenAI key, no license key).

| Doc page | Route | Status | Notes |
|---|---|---|---|
| `/angular/agno` | `/` | 📖 Reference | Landing page + live probe of both backends. |
| `/angular/agno/quickstart` | `/quickstart` | ✅ Working | Verified end-to-end: streamed reply from gpt-4o. |
| `/angular/agno/guides/chat-ui` | `/chat-ui` | ✅ Working | All four surfaces; three mounted, `CopilotChatView` referenced only. |
| `/angular/agno/guides/frontend-tools-generative-ui` | `/frontend-tools-generative-ui` | ✅ Working | `registerRenderToolCall` verified over the wire: `getWeather` called with `{"city":"Tokyo"}`. `registerFrontendTool` samples shown, not mounted — see Known issues #4. |
| `/angular/agno/guides/a2ui` | `/a2ui` | ⚠️ Partial | Inert without a frontend catalog — that, not the runtime middleware, is the switch. See Known issues #2. |
| `/angular/agno/guides/voice-multimodal` | `/voice-multimodal` | ⚠️ Partial | Attachments work. Transcription unavailable by design — `audioFileTranscriptionEnabled: false`. |
| `/angular/agno/guides/human-in-the-loop` | `/human-in-the-loop` | ✅ Working | Verified: `requestApproval` emitted with **no** tool result, run pauses awaiting the browser. Interrupt half idle — agent emits none. |
| `/angular/agno/guides/shared-state` | `/shared-state` | ✅ Working | Verified: `STATE_SNAPSHOT` carries `{"notes":[],"priority":"normal"}`. |
| `/angular/agno/guides/threads-…-headless` | `/threads` | ⚠️ Partial | Premium. `/info` reports `threadEndpoints.mutations: false`. |
| `/angular/agno/guides/threads-…-headless` | `/memory` | ⚠️ Partial | Premium; runtime provides no memory routes, so the fallback renders. |
| `/angular/agno/guides/threads-…-headless` | `/attachments` | ✅ Working | Picker, drag-and-drop, paste. |
| `/angular/agno/guides/threads-…-headless` | `/headless` | ✅ Working | Shares the `default` conversation with the other demos. |

**Legend:** ✅ Working · ⚠️ Partial (blocked by something outside this repo) · 📖 Reference · ❌ Broken · 🚧 Not started

---

## 9. Automated Screen Recording Pipeline

Screen recording lives in [`autorecorder/`](autorecorder/) — a portable
Playwright suite shared across the CopilotKit framework repos and adapted to this
one. It produces one 1080p `.webm` per doc page: read the doc, switch to a
simulated VS Code and show the code that implements it, switch back to the
browser and drive the live feature.

> The older [`autorecord/`](autorecord/) folder is the **legacy** recorder kept
> for reference only. It is not maintained; everything below refers to
> `autorecorder/`.

### Standard 3-step walkthrough per page
1. **Doc page** (`https://docs.copilotkit.ai/angular/agno/...`) — smooth scrolling
   at reading cadence, cursor resting on a code block.
2. **Project code** — a VS Code Dark+ simulator rendering this repo's own source
   from disk, Shiki-highlighted, with the page's line range selected. Multi-file
   pages switch tabs.
3. **Live demo** (`/<page>/demo`) — the chrome-free demo surface, driven with a
   visible cursor: prompts typed key by key, token-stream completion detection,
   tool cards, approval clicks, attachment uploads, tab switches, and a Windows 11
   Notepad window for pages whose finding is a limitation rather than a feature.

### One command, from a cold repo

[`ci/`](ci/README.md) drives the whole thing — doc-drift check, preflight,
dependency install, all three servers, recording, mux and report — from a single
Node process, and is what the nightly GitHub Actions workflow runs:

```bash
npm run automate                              # everything, all pages
npm run automate -- --pages=quickstart,threads
npm run automate -- --limit=3 --ignore-doc-drift
```

It starts the servers itself, so the section below applies only when you would
rather drive the recorder by hand against servers you started yourself.

### How to run

The backend (`:8000`), the Copilot Runtime (`:8200`) and the Angular dev server
(`:4200`) must all be up — the recorder refuses to start otherwise.

```bash
cd backend  && uv run main.py     # :8000
cd frontend && npm run dev        # runtime :8200 + ng serve :4200
```

Then:

```bash
cd autorecorder
npm install
npx playwright install chromium

npm run doctor              # is the configuration sane? exits non-zero if not
npm run doctor:online       # also probes every doc/demo URL and the selectors
npm run record -- --list    # what will be recorded
npm run record -- --quickstart   # one page
npm run record              # all 11, in nav order
npm run manifest            # record what the run produced (commit the result)
```

### Output

`autorecorder/videos/AGNO-angular-<NN>-<FeatureName>.webm`, 1920x1080.

`videos/` is **gitignored** — recordings are build output. What is committed is
`videos/manifest.json` and `videos/MANIFEST.md`, which record each clip's hash,
the source files it shows, and whether it has gone stale against them.

Three pages record a documented limitation rather than a working feature and say
so on screen: `a2ui` (the guide's catalog snippets are not self-contained),
`voice-multimodal` (no transcription service configured) and `threads` (licensed
endpoints, unlicensed runtime). See
[`autorecorder/README.md`](autorecorder/README.md) for the full scope table and
[`autorecorder/ADAPT.md`](autorecorder/ADAPT.md) for the porting contract.

---

## 10. Known issues / doc-vs-implementation discrepancies

Found while building against `@copilotkit/angular` **0.3.1** and `@copilotkit/runtime` **1.67.1**.

**1. The Open Generative UI sample does not typecheck as written**

[Frontend tools and generative UI](https://docs.copilotkit.ai/angular/agno/guides/frontend-tools-generative-ui) declares `const setDashboardFilter: SandboxFunction<{ filter: string }>` and then puts it in `openGenerativeUI.sandboxFunctions`. But `OpenGenerativeUIConfig.sandboxFunctions` is typed `SandboxFunction[]`, i.e. `SandboxFunction<Record<string, unknown>>[]`, and `SandboxFunction` is invariant in its `handler` parameter. The build fails with:

```
Type 'SandboxFunction<{ filter: string; }>' is not assignable to
type 'SandboxFunction<Record<string, unknown>>'.
```

The generic parameter is effectively unusable at that call site. This repo keeps the guide's declaration and casts at the array site — the same `as unknown as` idiom the docs themselves use for the equivalent `component` variance problem in the Human-in-the-loop Showcase snippet.

**2. "The A2UI renderer activates automatically" is misleading — the catalog is the switch**

[A2UI](https://docs.copilotkit.ai/angular/agno/guides/a2ui) says the browser renderer "activates automatically. No extra configuration is needed", and the [Copilot Runtime](https://docs.copilotkit.ai/angular/agno/backend/copilot-runtime) page says `a2ui: {}` applies `A2UIMiddleware` to all registered agents. Both are configured here and `/api/copilotkit/info` reports `"a2uiEnabled": true`.

Nothing renders. Across four runs against the Agno agent — including one that explicitly instructed the model to use the tool, and one that advertised `render_a2ui` in the run input — the agent never called it, and request `input_tokens` stayed at ~205–278.

The cause is the **missing frontend catalog**, not the middleware. Supplying `a2ui.catalog` to `provideCopilotKit` is what registers the built-in `render_a2ui` tool renderer and pushes the catalog id, component schemas, and generation guidelines into agent context. With no catalog, there is nothing for the agent to generate against and no renderer to receive it — so `a2uiEnabled: true` on the server is necessary but not sufficient, and the guide's "no extra configuration is needed" reads as if it were.

Still open here, because the catalog cannot be built from the guide's own code (see issue #4). The route is marked Partial. Building one is the fix; it needs `createCatalog` plus a Lit renderer per component, and two traps the docs do not mention:

- **Catalogs must use Zod 3, not Zod 4.** `createCatalog` serialises each `props` schema with `zod-to-json-schema@3`, which reads Zod 3's internal `_def.typeName`. Zod 4 no longer exposes it, so a Zod 4 catalog silently produces an **empty schema** and the agent gets nothing to generate against. Use Zod 4's own `zod/v3` compatibility entry, which costs no extra dependency.
- **Do not import the protocol's `DynamicString` from the renderer package.** `@copilotkit/a2ui-renderer` nests its own standalone `zod@3.25`, so comparing its `ZodObject` against the one from `zod/v3` sends TypeScript into a recursive structural comparison between two nominally distinct generic classes — heap exhaustion on a single component. Restate the primitive locally (`z.union([z.string(), z.object({ path: z.string() })])`) and cast once at the `createCatalog` boundary; the binder identifies it structurally, not by type identity.

**3. `openGenerativeUIEnabled` is a runtime-side flag the guide never mentions**

`/info` reports `"openGenerativeUIEnabled": false` even with `openGenerativeUI.sandboxFunctions` configured on the frontend. The guide presents Open Generative UI purely as a frontend `provideCopilotKit` option and documents no server-side counterpart, so it is unclear whether the sandboxed renderer can be driven with the runtime reporting false.

**4. Several guide snippets are Showcase excerpts that are not self-contained**

Five samples are quoted from the live Angular Showcase with their supporting code omitted, so they cannot be compiled as published. Each is displayed on its route page as a quoted sample, clearly marked as not mounted:

| Guide | Snippet | Missing |
|---|---|---|
| Frontend tools | `createBackgroundTool` | `resolveGradient`, `BackgroundToolArgs`, imports |
| A2UI | `fixedDefinitions` | `dynamicString` |
| A2UI | `a2uiConfigForFeature` | `beautifulCatalog`, `declarativeCatalog`, `fixedCatalog`, and any `createCatalog` call |
| Voice | `voiceWeatherRendererConfigs` | `VOICE_WEATHER_TOOL_NAMES`, `VoiceWeatherArgs`, `WeatherToolCard` |
| Voice | `createMultimodalMessage` | `SampleSpec`, `MediaAgentMessage` |
| Human-in-the-loop | `InterruptFeatureComponent` | `agentIdForCurrentIntegration`, `parseInterruptPayload`, `usesFrontendSchedulingTool`, `integrationId`, `ScheduleMeetingArgs`, `InterruptSlot`, `TimePickerCard` |
| Headless | `HeadlessChatController` | `agentIdForCurrentIntegration`, `createMessageId`, `ShowcaseMessage` |

Because no A2UI catalog can be built from the guide's own code, the A2UI route runs on the default catalog.

**5. The Chat UI guide gives two different components the same name and selector**

Both the inline-chat sample and the custom-assistant-message sample are `SupportChatComponent` / `app-support-chat`, and the popup/sidebar sample is `AppComponent` / `app-root`. Mounting all three at once is impossible as published. This repo keeps the first as `SupportChatComponent` and renames the other two (`CustomMessageChatComponent`, `PopupSidebarComponent`), noted on the route page.

**6. `agentId="support"` has no backing agent in the quickstart**

The Chat UI and Threads guides use `agentId="support"` throughout, but the quickstart only ever registers `default`. Run as published against a quickstart runtime, those snippets resolve to a non-existent agent. This repo registers a second `support` agent pointing at the same Agno process so the snippets work unedited.

**7. The Angular/Agno quickstart has no backend step**

[The quickstart](https://docs.copilotkit.ai/angular/agno/quickstart) contains the literal comment `<!-- setup skipped: agent-setup is not bundled for agno -->` where the Agno setup should be, and its runtime step only says to "register this backend as the `default` agent" with a link to the generic Copilot Runtime page — which shows a Next.js route handler and `BuiltInAgent`, not `AgnoAgent`. The `AgnoAgent` binding had to come from the **React** Agno quickstart (`https://docs.copilotkit.ai/agno/quickstart`). `frontend/server.ts` is therefore a composition of two doc pages: the Angular quickstart's Node server shape with the React quickstart's `AgnoAgent` construction.

**8. `zod` is an undocumented direct dependency**

`registerRenderToolCall`, `registerHumanInTheLoop`, and `SandboxFunction` samples all `import { z } from "zod"`, but the quickstart's install command is `npm install @copilotkit/angular @angular/cdk @copilotkit/runtime`. `zod` only resolves transitively; added explicitly here.

**9. The production bundle exceeds Angular's default budget**

Predicted by the quickstart's own troubleshooting box, and confirmed: a build fails at **4.65 MB** against the default 1 MB `initial` budget. `angular.json` raises it to 5 MB warning / 7 MB error. The build also emits CommonJS bailout warnings for `whatwg-url`, `@jetbrains/websandbox`, `partial-json`, and `chalk`.

**10. Agno tool names must be camelCase to match the guides**

The renderer name in `registerRenderToolCall({ name })` must equal the agent's tool name exactly. The guides are written against `getWeather(city)`, so `backend/main.py` declares `@tool(name="getWeather")` with a `city` parameter. A Python-idiomatic `get_weather(location)` would stream a plain-text answer with no card and look like a frontend bug.

**11. Frontend-only tools need no Python declaration**

`requestApproval` exists only in the browser, and the agent called it normally — verified over the wire, with the run pausing for the browser's response. CopilotKit forwards frontend tools to the agent in the AG-UI run input. The inverse still bites: a tool declared on the agent with **no** frontend handler registered will hang the run forever.

---

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Chat sends, nothing streams back | Runtime or Agno process down | Check the Introduction route's connection panel; `curl http://localhost:8200/api/copilotkit/info`. |
| `/info` returns nothing | Runtime not started | `npm run runtime` from `frontend/`. |
| A run starts, then hangs forever | The agent called a browser tool with no registered handler, so no result ever returns | Every tool the agent can call must have a matching `registerFrontendTool` / `registerHumanInTheLoop` mounted. |
| Tool runs but the custom card doesn't render | Renderer name ≠ tool name | `registerRenderToolCall({ name })` must equal the Agno tool name exactly, including case. |
| Chat renders unstyled | Missing stylesheet | `@import "@copilotkit/angular/styles.css";` must be in `src/styles.css`. |
| CORS errors from the browser | Runtime CORS off | Keep `cors: true` in `createCopilotNodeListener`. The Agno process separately allows `localhost:4200` via `cors_allowed_origins`. |
| Connection errors mentioning `localhost` | DNS resolving to IPv6 while the server binds IPv4 | Use `127.0.0.1` in `AGNO_AGENT_URL`. |
| Production build fails on size | CopilotKit pulls in markdown and syntax-highlighting deps | Already raised in `angular.json`; see Known issues #9. |
| Peer-dependency error on install | `@angular/cdk` major mismatch | Install the matching major, e.g. `@angular/cdk@^22` on Angular 22. |
| Thread list empty, drawer shows a lock | No license key | Expected — not a bug. |
| Source panels say "Source not generated" | Generated map is stale | `npm run gen:sources` (runs automatically on `npm start` / `npm run build`). |
| Backend exits immediately | No `OPENAI_API_KEY` | `cp .env.example backend/.env` and fill it in. |

---

## 12. Doc drift detection

`/doc-sync` keeps this repo honest about the docs it mirrors. Press **Sync docs now** (on the landing page or on `/doc-sync`) and it fetches the markdown source behind all 9 tracked doc pages, diffs each against the copy stored in `doc-snapshot/`, replaces that copy, and reports what moved — ranked by whether the change can actually break an implementation.

Doc pages are fetched by appending `.md` to their URL, which returns the authored MDX rather than the rendered HTML. Every response is checked for `text/markdown` before it is allowed near the snapshot: a URL that misses the markdown handler still answers `200` with the HTML app shell, and writing that in would destroy the baseline. A run commits all pages or none.

**Severity is decided by where the edit landed**, not how big it was:

| Level | Trigger |
|---|---|
| **High** | a changed line inside a fenced code block, a changed fence count, or a page that now 404s and is gone from the sitemap |
| **Medium** | a changed heading, changed frontmatter `title`/`description`, or prose in the same section as changed code |
| **Low** | other prose |

**Sections checked** lists every tracked page in nav order with a mark — `✓` unchanged, `!` changed, `+` stored, `✗` 404, `~` unstable, `·` not checked. Expanding a row shows the comparison: for a changed page the diff (`−` existing snapshot, `+` newly fetched), and for an unchanged one the two matching hashes, which is the evidence the check ran.

**`doc-snapshot/CHANGELOG.md`** is the record that survives a re-sync. Because syncing replaces the copy it just compared against, the run *after* a change reports nothing — so the changelog is written at the moment of discovery and never rewritten later. Only changed pages are recorded; a clean run does not touch the file. It keeps the three most recent dated entries, counted rather than aged.

**One sync date.** `syncedAt` in `doc-snapshot/manifest.json`, rewritten on every run. There is no hand-maintained date to keep in step with it.

### How it is wired on Angular

Angular has no server-action equivalent, so the boundary is plain HTTP. Everything that fetches docs or touches the snapshot lives in `frontend/src/app/lib/doc-sync/` and is imported **only** from `frontend/src/server.ts`, which exposes two endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /api/doc-sync` | current manifest summary + the latest report |
| `POST /api/doc-sync/run` | runs the sync, returns the result |

They sit on the SSR server rather than the Copilot Runtime because that is the Angular app's own server: `ng serve` routes through it in development (`ssr.entry` in `angular.json`) and it ships in `dist/`, so the button works in both without a second process. The browser half is `DocSyncClient`, a root-provided service holding signals — nothing in the browser bundle imports `node:fs`, which the build verifies by never resolving those modules into `dist/browser`.

**To test it**, edit any `doc-snapshot/pages/*.md` file and press the button — a line inside a code fence for High, a `##` heading for Medium, a sentence for Low. The comparison reads the stored file itself, so nothing else needs changing. Both `/doc-sync` and the changelog label the result as a local snapshot edit rather than upstream drift.

Commit `doc-snapshot/` — `pages/`, `manifest.json` and `CHANGELOG.md` are the baseline every diff is taken against. `reports/` is gitignored.

---

## 13. Project structure

```
agno/
├── CLAUDE.md                  # build instructions this harness follows
├── README.md
├── .env.example
│
├── frontend/                  # Angular 22 app + the Copilot Runtime process
│   ├── AGENTS.md              # Angular style rules this repo's own code follows
│   ├── server.ts              # ★ CopilotRuntime + AgnoAgent binding  → :8200
│   ├── scripts/
│   │   ├── generate-sources.ts  # ★ reads real files → generated-sources.ts
│   │   ├── sync-docs.ts         # ★ automated doc-snapshot sync script
│   │   └── record-all-pages.ts  # ★ Playwright automated video recording suite
│   ├── recordings/            # ★ Output high-definition .webm recordings
│   └── src/
│       ├── styles.css         # CopilotKit stylesheet + the guides' CSS verbatim
│       └── app/
│           ├── app.config.ts        # ★ provideCopilotKit, a2ui, openGenerativeUI
│           ├── app.routes.ts        # doc routes in chrome, demo routes outside it
│           ├── lib/
│           │   ├── nav-config.ts    # ★ single source of truth: routes, docs, status
│           │   └── generated-sources.ts   # GENERATED — do not edit
│           ├── components/          # harness chrome (nav, header, source, health)
│           ├── features/            # ★ the doc code that actually runs
│           │   ├── quickstart/  chat-ui/  tools/  a2ui/
│           │   └── media/  hitl/  shared-state/  threads/  memory/
│           │       attachments/  headless/
│           └── pages/               # one page per doc route + demos.ts + status
│
└── backend/                   # Python agent — Agno AgentOS over AG-UI  → :8000
    ├── pyproject.toml
    └── main.py                # ★ agent, getWeather tool, AgentOS + AGUI interface
```

The nav, every route header, the demo links, and the status table all derive from `frontend/src/app/lib/nav-config.ts`, so a route's status is stated once.

**`features/` vs everything else.** Files under `features/` are doc code, kept as published — including where that conflicts with `frontend/AGENTS.md` (several set `changeDetection: OnPush` explicitly, which AGENTS.md says to omit on v22+). Every deviation from a published snippet is called out in the file's header comment. Everything outside `features/` is this harness's own code and follows AGENTS.md.

---

## 14. References

**Getting Started** — [Angular + Agno quickstart](https://docs.copilotkit.ai/angular/agno/quickstart)

**Guides** — [Chat UI and customization](https://docs.copilotkit.ai/angular/agno/guides/chat-ui) · [Frontend tools and generative UI](https://docs.copilotkit.ai/angular/agno/guides/frontend-tools-generative-ui) · [A2UI](https://docs.copilotkit.ai/angular/agno/guides/a2ui) · [Voice and multimodal](https://docs.copilotkit.ai/angular/agno/guides/voice-multimodal) · [Human-in-the-loop and interrupts](https://docs.copilotkit.ai/angular/agno/guides/human-in-the-loop) · [Shared state and agent context](https://docs.copilotkit.ai/angular/agno/guides/shared-state) · [Threads, memory, attachments, and headless UI](https://docs.copilotkit.ai/angular/agno/guides/threads-memory-attachments-headless)

**Backend** — [Copilot Runtime](https://docs.copilotkit.ai/angular/agno/backend/copilot-runtime) · [React Agno quickstart](https://docs.copilotkit.ai/agno/quickstart) (source of the `AgnoAgent` binding)

**External** — [Agno docs](https://docs.agno.com) · [AG-UI protocol](https://ag-ui.com) · [Angular API reference](https://docs.copilotkit.ai/reference/angular)
