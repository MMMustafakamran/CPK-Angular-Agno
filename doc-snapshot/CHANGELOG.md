# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the sync on
`/doc-sync`. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-08-26

### 19:44 UTC — 29 pages, highest severity high

**Medium — Angular**

`/angular/agno` · route `/` · under “Next steps”

0 code lines, 368 prose lines changed.

````diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted Enterprise Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for agno -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/agno/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [Enterprise Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for agno -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/agno/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
````

**Medium — Angular**

`/angular/agno/quickstart` · route `/quickstart` · under “Next steps”

0 code lines, 368 prose lines changed.

````diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted Enterprise Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for agno -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/agno/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [Enterprise Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for agno -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/agno/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
````

**Medium — Angular docs**

`/angular/agno/using-these-docs` · under “Angular docs”

0 code lines, 40 prose lines changed.

````diff
- # Angular docs
- 
- > Use the Angular quickstart, task guides, feature examples, source views, and typed API reference.
- 
- Use these pages based on what you want to build:
- 
- 1. Start with the [Angular quickstart](/angular/agno) to install the package, configure `provideCopilotKit`, and render the first standalone chat component.
- 2. Choose your agent backend in the sidebar. That selection changes backend setup and agent-framework examples without taking you out of the Angular docs.
- 3. Use the shared [Runtime](/angular/agno/backend/copilot-runtime) and [Enterprise Intelligence](/angular/agno/premium/overview) docs for server architecture, persistence, hosting, and operations. These concepts do not change with the frontend; only frontend-specific code does.
- 4. Use the task guides for [chat UI](/angular/agno/guides/chat-ui), [frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui), [human-in-the-loop flows](/angular/agno/guides/human-in-the-loop), [shared state](/angular/agno/guides/shared-state), [threads, memory, attachments, and headless UI](/angular/agno/guides/threads-memory-attachments-headless), and [troubleshooting](/angular/agno/guides/troubleshooting).
- 5. Browse [Angular feature examples](/angular/agno/features) for all 41 supported features. Forty entries include a runnable example, and every entry links to source and API docs.
- 6. Use the [Angular API reference](/reference/angular) for components, functions, services, directives, inputs, outputs, signals, and lifecycle rules.
- 
- Code labeled as a Showcase example is extracted from the runnable Angular
- Showcase source during the docs build. This keeps the guide and the application
- on the same implementation instead of maintaining a second copy.
- 
- JSON Renderer is not applicable to the Angular package. Use the [generative UI guide](/angular/agno/guides/frontend-tools-generative-ui#choose-a-generative-ui-path) for A2UI and the other Angular rendering paths.
- 
- For cleanup, errors, server rendering, hydration, and zoneless updates, see [Production and lifecycle](/reference/angular/production-lifecycle).
+ # Angular docs
+ 
+ > Use the Angular quickstart, task guides, feature examples, source views, and typed API reference.
+ 
+ Use these pages based on what you want to build:
+ 
+ 1. Start with the [Angular quickstart](/angular/agno) to install the package, configure `provideCopilotKit`, and render the first standalone chat component.
+ 2. Choose your agent backend in the sidebar. That selection changes backend setup and agent-framework examples without taking you out of the Angular docs.
+ 3. Use the shared [Runtime](/angular/agno/backend/copilot-runtime) and [CopilotKit Intelligence](/angular/agno/premium/overview) docs for server architecture, persistence, hosting, and operations. These concepts do not change with the frontend; only frontend-specific code does.
+ 4. Use the task guides for [chat UI](/angular/agno/guides/chat-ui), [frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui), [human-in-the-loop flows](/angular/agno/guides/human-in-the-loop), [shared state](/angular/agno/guides/shared-state), [threads, memory, attachments, and headless UI](/angular/agno/guides/threads-memory-attachments-headless), and [troubleshooting](/angular/agno/guides/troubleshooting).
+ 5. Browse [Angular feature examples](/angular/agno/features) for all 41 supported features. Forty entries include a runnable example, and every entry links to source and API docs.
+ 6. Use the [Angular API reference](/reference/angular) for components, functions, services, directives, inputs, outputs, signals, and lifecycle rules.
+ 
+ Code labeled as a Showcase example is extracted from the runnable Angular
+ Showcase source during the docs build. This keeps the guide and the application
+ on the same implementation instead of maintaining a second copy.
+ 
+ JSON Renderer is not applicable to the Angular package. Use the [generative UI guide](/angular/agno/guides/frontend-tools-generative-ui#choose-a-generative-ui-path) for A2UI and the other Angular rendering paths.
+ 
+ For cleanup, errors, server rendering, hydration, and zoneless updates, see [Production and lifecycle](/reference/angular/production-lifecycle).
  
````

**High — Angular feature examples**

`/angular/agno/features` · under “Shared setup”

16 code lines, 28 prose lines changed.

````diff
- # Angular feature examples
- 
- > Browse examples, source, API docs, and support state for all 41 Angular features.
- 
- The catalog covers all 41 supported Angular features. Forty entries include a runnable example. Every entry links to its source and the closest API documentation.
- 
- ## Shared setup
- 
- Install `@copilotkit/angular` and the matching `@angular/cdk` major. Register the provider in your application config:
- 
- ```ts title="src/app/app.config.ts"
- import { ApplicationConfig } from "@angular/core";
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig: ApplicationConfig = {
-   providers: [provideCopilotKit({ runtimeUrl: "/api/copilotkit" })],
- };
- ```
- 
- The source link opens the standalone Angular component used for that feature.
- 
- <AngularFeatureCatalog />
+ # Angular feature examples
+ 
+ > Browse examples, source, API docs, and support state for all 41 Angular features.
+ 
+ The catalog covers all 41 supported Angular features. Forty entries include a runnable example. Every entry links to its source and the closest API documentation.
+ 
+ ## Shared setup
+ 
+ Install `@copilotkit/angular` and the matching `@angular/cdk` major. Register the provider in your application config:
+ 
+ ```ts title="src/app/app.config.ts"
+ import { ApplicationConfig } from "@angular/core";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig: ApplicationConfig = {
+   providers: [provideCopilotKit({ runtimeUrl: "/api/copilotkit" })],
+ };
+ ```
+ 
+ The source link opens the standalone Angular component used for that feature.
+ 
+ <AngularFeatureCatalog />
  
````

**High — Chat UI and customization**

`/angular/agno/guides/chat-ui` · route `/chat-ui` · under “Next steps”

224 code lines, 130 prose lines changed.

````diff
- # Chat UI and customization
- 
- > Add a full Angular chat, choose its layout, and customize messages, slots, labels, and styles.
- 
- `CopilotChat` gives you a complete chat surface backed by the agent from your
- Copilot Runtime. It owns message streaming, suggestions, the composer,
- attachments, transcription, and the active thread.
- 
- This guide starts from the provider in the [Angular quickstart](/angular/agno) and
- shows how to choose and customize the visible chat.
- 
- ## Choose a chat surface
- 
- | Surface | Use it when |
- | --- | --- |
- | `CopilotChat` | Chat belongs inside an existing page or panel. |
- | `CopilotPopup` | Chat should open from a floating launcher. |
- | `CopilotSidebar` | Chat should sit beside the main application or open as an overlay. |
- | `CopilotChatView` | You own the agent wiring and only need the chat layout. |
- 
- All four are standalone Angular components.
- 
- ## Add an inline chat
- 
- Import `CopilotChat`, give its host a real height, and point it at an agent when
- you do not want the default agent.
- 
- ```ts title="src/app/support-chat.component.ts"
- import { ChangeDetectionStrategy, Component } from "@angular/core";
- import { CopilotChat } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-support-chat",
-   imports: [CopilotChat],
-   changeDetection: ChangeDetectionStrategy.OnPush,
-   template: `
-     <section class="chat-shell" aria-label="Support assistant">
-       <copilot-chat agentId="support" />
-     </section>
-   `,
-   styles: `
-     .chat-shell {
-       height: min(48rem, 80vh);
-       overflow: hidden;
-       border: 1px solid #dbe3eb;
-       border-radius: 1rem;
-     }
-   `,
- })
- export class SupportChatComponent {}
- ```
- 
- Import the package stylesheet once in the application's global stylesheet:
- 
- ```css title="src/styles.css"
- @import "@copilotkit/angular/styles.css";
- ```
- 
- ## Use a popup or sidebar
- 
- Both modal surfaces manage focus, Escape closing, and launcher-focus restore.
- Their `open` model supports two-way binding.
- 
- ```ts title="src/app/app.component.ts"
- import { Component, signal } from "@angular/core";
- import { CopilotPopup, CopilotSidebar } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-root",
-   imports: [CopilotPopup, CopilotSidebar],
-   template: `
-     <copilot-popup
-       [(open)]="popupOpen"
-       title="Support assistant"
-       [clickOutsideToClose]="true"
-     />
- 
-     <copilot-sidebar
-       [(open)]="sidebarOpen"
-       mode="docked"
-       position="right"
-       title="Workspace assistant"
-       [width]="480"
-     />
-   `,
- })
- export class AppComponent {
-   readonly popupOpen = signal(false);
-   readonly sidebarOpen = signal(false);
- }
- ```
- 
- Compact viewports render the sidebar as a modal even when `mode` is `"docked"`.
- Only one open docked sidebar can own the page margin at a time.
- 
- ## Replace an assistant message
- 
- Pass a standalone component class to `assistantMessageComponent`. CopilotKit
- creates it for each assistant message and binds its `message` input.
- 
- ```ts title="src/app/custom-assistant-message.component.ts"
- import { ChangeDetectionStrategy, Component, input } from "@angular/core";
- 
- type AssistantMessage = {
-   id: string;
-   role: "assistant";
-   content?: string;
- };
- 
- @Component({
-   selector: "app-custom-assistant-message",
-   changeDetection: ChangeDetectionStrategy.OnPush,
-   template: `
-     <article class="answer">
-       <span class="answer__label">Assistant</span>
-       <p>{{ message().content }}</p>
-     </article>
-   `,
- })
- export class CustomAssistantMessageComponent {
-   readonly message = input.required<AssistantMessage>();
- }
- ```
- 
- ```ts title="src/app/support-chat.component.ts"
- import { Component } from "@angular/core";
- import { CopilotChat } from "@copilotkit/angular";
- import { CustomAssistantMessageComponent } from "./custom-assistant-message.component";
- 
- @Component({
-   selector: "app-support-chat",
-   imports: [CopilotChat],
-   template: `
-     <copilot-chat
-       [assistantMessageComponent]="assistantMessageComponent"
-       assistantMessageClass="support-answer"
-     />
-   `,
- })
- export class SupportChatComponent {
-   protected readonly assistantMessageComponent =
-     CustomAssistantMessageComponent;
- }
- ```
- 
- `CopilotChat` also accepts component or template slots for reasoning messages,
- the composer, and content after the transcript. Use `CopilotChatView` directly
- when you need its scroll view, disclaimer, feather, input-container, or
- scroll-to-bottom slots.
- 
- ## Scope CSS changes
- 
- The package stylesheet exposes stable chat classes. Put a scope class on your
- feature host so the change stays local.
- 
- ```css title="src/styles.css"
- .support-chat .copilotKitUserMessage {
-   color: white;
-   background: #2563eb;
-   border-radius: 0.75rem;
- }
- 
- .support-chat .copilotKitAssistantMessage {
-   padding: 0.75rem;
-   color: #172554;
-   background: #eff6ff;
-   border-radius: 0.75rem;
- }
- ```
- 
- ## Next steps
- 
- - [CopilotChat API](/reference/angular/components/CopilotChat)
- - [CopilotChatView slots](/reference/angular/components/CopilotChatView)
- - [CopilotPopup API](/reference/angular/components/CopilotPopup)
- - [CopilotSidebar API](/reference/angular/components/CopilotSidebar)
- - [Runnable chat examples](/angular/agno/features#agentic-chat)
+ # Chat UI and customization
+ 
+ > Add a full Angular chat, choose its layout, and customize messages, slots, labels, and styles.
+ 
+ `CopilotChat` gives you a complete chat surface backed by the agent from your
+ Copilot Runtime. It owns message streaming, suggestions, the composer,
+ attachments, transcription, and the active thread.
+ 
+ This guide starts from the provider in the [Angular quickstart](/angular/agno) and
+ shows how to choose and customize the visible chat.
+ 
+ ## Choose a chat surface
+ 
+ | Surface | Use it when |
+ | --- | --- |
+ | `CopilotChat` | Chat belongs inside an existing page or panel. |
+ | `CopilotPopup` | Chat should open from a floating launcher. |
+ | `CopilotSidebar` | Chat should sit beside the main application or open as an overlay. |
+ | `CopilotChatView` | You own the agent wiring and only need the chat layout. |
+ 
+ All four are standalone Angular components.
+ 
+ ## Add an inline chat
+ 
+ Import `CopilotChat`, give its host a real height, and point it at an agent when
+ you do not want the default agent.
+ 
+ ```ts title="src/app/support-chat.component.ts"
+ import { ChangeDetectionStrategy, Component } from "@angular/core";
+ import { CopilotChat } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-support-chat",
+   imports: [CopilotChat],
+   changeDetection: ChangeDetectionStrategy.OnPush,
+   template: `
+     <section class="chat-shell" aria-label="Support assistant">
+       <copilot-chat agentId="support" />
+     </section>
+   `,
+   styles: `
+     .chat-shell {
+       height: min(48rem, 80vh);
+       overflow: hidden;
+       border: 1px solid #dbe3eb;
+       border-radius: 1rem;
+     }
+   `,
+ })
+ export class SupportChatComponent {}
+ ```
+ 
+ Import the package stylesheet once in the application's global stylesheet:
+ 
+ ```css title="src/styles.css"
+ @import "@copilotkit/angular/styles.css";
+ ```
+ 
+ ## Use a popup or sidebar
+ 
+ Both modal surfaces manage focus, Escape closing, and launcher-focus restore.
+ Their `open` model supports two-way binding.
+ 
+ ```ts title="src/app/app.component.ts"
+ import { Component, signal } from "@angular/core";
+ import { CopilotPopup, CopilotSidebar } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-root",
+   imports: [CopilotPopup, CopilotSidebar],
+   template: `
+     <copilot-popup
+       [(open)]="popupOpen"
+       title="Support assistant"
+       [clickOutsideToClose]="true"
+     />
+ 
+     <copilot-sidebar
+       [(open)]="sidebarOpen"
+       mode="docked"
+       position="right"
+       title="Workspace assistant"
+       [width]="480"
+     />
+   `,
+ })
+ export class AppComponent {
+   readonly popupOpen = signal(false);
+   readonly sidebarOpen = signal(false);
+ }
+ ```
+ 
+ Compact viewports render the sidebar as a modal even when `mode` is `"docked"`.
+ Only one open docked sidebar can own the page margin at a time.
+ 
+ ## Replace an assistant message
+ 
+ Pass a standalone component class to `assistantMessageComponent`. CopilotKit
+ creates it for each assistant message and binds its `message` input.
+ 
+ ```ts title="src/app/custom-assistant-message.component.ts"
+ import { ChangeDetectionStrategy, Component, input } from "@angular/core";
+ 
+ type AssistantMessage = {
+   id: string;
+   role: "assistant";
+   content?: string;
+ };
+ 
+ @Component({
+   selector: "app-custom-assistant-message",
+   changeDetection: ChangeDetectionStrategy.OnPush,
+   template: `
+     <article class="answer">
+       <span class="answer__label">Assistant</span>
+       <p>{{ message().content }}</p>
+     </article>
+   `,
+ })
+ export class CustomAssistantMessageComponent {
+   readonly message = input.required<AssistantMessage>();
+ }
+ ```
+ 
+ ```ts title="src/app/support-chat.component.ts"
+ import { Component } from "@angular/core";
+ import { CopilotChat } from "@copilotkit/angular";
+ import { CustomAssistantMessageComponent } from "./custom-assistant-message.component";
+ 
+ @Component({
+   selector: "app-support-chat",
+   imports: [CopilotChat],
+   template: `
+     <copilot-chat
+       [assistantMessageComponent]="assistantMessageComponent"
+       assistantMessageClass="support-answer"
+     />
+   `,
+ })
+ export class SupportChatComponent {
+   protected readonly assistantMessageComponent =
+     CustomAssistantMessageComponent;
+ }
+ ```
+ 
+ `CopilotChat` also accepts component or template slots for reasoning messages,
+ the composer, and content after the transcript. Use `CopilotChatView` directly
+ when you need its scroll view, disclaimer, feather, input-container, or
+ scroll-to-bottom slots.
+ 
+ ## Scope CSS changes
+ 
+ The package stylesheet exposes stable chat classes. Put a scope class on your
+ feature host so the change stays local.
+ 
+ ```css title="src/styles.css"
+ .support-chat .copilotKitUserMessage {
+   color: white;
+   background: #2563eb;
+   border-radius: 0.75rem;
+ }
+ 
+ .support-chat .copilotKitAssistantMessage {
+   padding: 0.75rem;
+   color: #172554;
+   background: #eff6ff;
+   border-radius: 0.75rem;
+ }
+ ```
+ 
+ ## Next steps
+ 
+ - [CopilotChat API](/reference/angular/components/CopilotChat)
+ - [CopilotChatView slots](/reference/angular/components/CopilotChatView)
+ - [CopilotPopup API](/reference/angular/components/CopilotPopup)
+ - [CopilotSidebar API](/reference/angular/components/CopilotSidebar)
+ - [Runnable chat examples](/angular/agno/features#agentic-chat)
  
````

**High — Frontend tools and generative UI**

`/angular/agno/guides/frontend-tools-generative-ui` · route `/frontend-tools-generative-ui` · under “Next steps”

220 code lines, 134 prose lines changed.

````diff
- # Frontend tools and generative UI
- 
- > Let an agent run browser code and render typed, protocol-driven, or sandboxed UI in Angular.
- 
- Frontend tools let an agent call code inside the user's browser. Add a renderer
- to the same registration when the tool should show progress or a result in
- chat.
- 
- ## Register a browser tool
- 
- Call `registerFrontendTool` from an Angular injection context. The live
- Showcase example builds a typed tool config around a writable signal:
- 
- ```typescript
- // features/tools/tool-feature-model.ts
- /** Create the frontend tool that applies a requested CSS gradient. */
- export function createBackgroundTool(
-   background: WritableSignal<string>,
- ): FrontendToolConfig<BackgroundToolArgs> {
-   return {
-     name: "change_background",
-     description: "Change the application background to a CSS gradient.",
-     parameters: z.object({
-       background: z.string().optional(),
-       color: z.string().optional(),
-     }),
-     handler: async (args) => {
-       const next = resolveGradient(args.background ?? args.color);
-       background.set(next);
-       return { background: next };
-     },
-   };
- }
- ```
- 
- Register that config from a component or service with
- `registerFrontendTool(createBackgroundTool(background))`. The registration is
- removed when that injector is destroyed.
- 
- The schema advertises the input shape and supplies TypeScript inference.
- Runtime arguments arrive as parsed JSON; validate inside the handler when the
- action needs a hard trust boundary. The handler receives the calling agent,
- the raw tool call, and an optional abort signal as its second argument.
- 
- ## Render a tool result
- 
- A renderer is a standalone component with a required `toolCall` signal input.
- Its status moves through `"in-progress"`, `"executing"`, and `"complete"`.
- 
- ```ts title="src/app/weather-card.component.ts"
- import { Component, input } from "@angular/core";
- import {
-   type AngularToolCall,
-   type ToolRenderer,
- } from "@copilotkit/angular";
- 
- type WeatherArgs = { city: string };
- 
- @Component({
-   selector: "app-weather-card",
-   template: `
-     @let call = toolCall();
-     @if (call.status === "complete") {
-       <article>
-         <strong>{{ call.args.city }}</strong>
-         <p>{{ call.result }}</p>
-       </article>
-     } @else {
-       <p>Loading weather for {{ call.args.city ?? "…" }}</p>
-     }
-   `,
- })
- export class WeatherCardComponent implements ToolRenderer<WeatherArgs> {
-   readonly toolCall = input.required<AngularToolCall<WeatherArgs>>();
- }
- ```
- 
- Pass the class as `component` when the tool runs in the browser:
- 
- ```ts
- registerFrontendTool({
-   name: "getWeather",
-   description: "Get the current weather for a city",
-   parameters: z.object({ city: z.string() }),
-   component: WeatherCardComponent,
-   handler: async ({ city }, { signal }) => {
-     const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
-       signal,
-     });
-     return response.text();
-   },
- });
- ```
- 
- Use `registerRenderToolCall` instead when the tool runs on the server and the
- browser only renders its call:
- 
- ```ts
- registerRenderToolCall({
-   name: "getWeather",
-   args: z.object({ city: z.string() }),
-   component: WeatherCardComponent,
- });
- ```
- 
- ## Choose a generative UI path
- 
- | Path | Best fit | Angular setup |
- | --- | --- | --- |
- | Your components | Known data shapes and application actions | `registerFrontendTool` or `registerRenderToolCall` with a component |
- | A2UI | A server emits A2UI operations or snapshots | Runtime capability turns on the built-in renderer; an optional `a2ui` config supplies a catalog or theme |
- | Open Generative UI | The agent produces streamed HTML, CSS, and script expressions | Set `openGenerativeUI` in `provideCopilotKit` |
- | MCP Apps | An MCP server returns an interactive app resource | Add `provideMCPApps()` from `@copilotkit/angular/mcp-apps` |
- 
- ### Open Generative UI
- 
- An `openGenerativeUI` object opts the frontend into the built-in sandboxed
- renderer. Expose narrow host functions when generated UI must ask the
- application to act.
- 
- ```ts title="src/app/app.config.ts"
- import { ApplicationConfig } from "@angular/core";
- import {
-   provideCopilotKit,
-   type SandboxFunction,
- } from "@copilotkit/angular";
- import { z } from "zod";
- 
- const setDashboardFilter: SandboxFunction<{ filter: string }> = {
-   name: "setDashboardFilter",
-   description: "Set the active dashboard filter",
-   parameters: z.object({ filter: z.string() }),
-   handler: async ({ filter }) => {
-     sessionStorage.setItem("dashboard-filter", filter);
-     return { applied: filter };
-   },
- };
- 
- export const appConfig: ApplicationConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "/api/copilotkit",
-       openGenerativeUI: {
-         sandboxFunctions: [setDashboardFilter],
-       },
-     }),
-   ],
- };
- ```
- 
- Generated code runs in a sandboxed iframe without same-origin access. It calls
- only the host functions you list in `sandboxFunctions`.
- 
- ### MCP Apps
- 
- ```ts title="src/app/app.config.ts"
- import { ApplicationConfig } from "@angular/core";
- import { provideCopilotKit } from "@copilotkit/angular";
- import { provideMCPApps } from "@copilotkit/angular/mcp-apps";
- 
- export const appConfig: ApplicationConfig = {
-   providers: [
-     provideCopilotKit({ runtimeUrl: "/api/copilotkit" }),
-     provideMCPApps(),
-   ],
- };
- ```
- 
- MCP resource and tool requests travel through the selected AG-UI agent. The
- browser provider does not take a server URL.
- 
- ## Next steps
- 
- - [registerFrontendTool API](/reference/angular/functions/registerFrontendTool)
- - [registerRenderToolCall API](/reference/angular/functions/registerRenderToolCall)
- - [Activity renderers](/reference/angular/functions/registerRenderActivityMessage)
- - [Runnable tool and generative UI examples](/angular/agno/features#frontend-tools)
+ # Frontend tools and generative UI
+ 
+ > Let an agent run browser code and render typed, protocol-driven, or sandboxed UI in Angular.
+ 
+ Frontend tools let an agent call code inside the user's browser. Add a renderer
+ to the same registration when the tool should show progress or a result in
+ chat.
+ 
+ ## Register a browser tool
+ 
+ Call `registerFrontendTool` from an Angular injection context. The live
+ Showcase example builds a typed tool config around a writable signal:
+ 
+ ```typescript
+ // features/tools/tool-feature-model.ts
+ /** Create the frontend tool that applies a requested CSS gradient. */
+ export function createBackgroundTool(
+   background: WritableSignal<string>,
+ ): FrontendToolConfig<BackgroundToolArgs> {
+   return {
+     name: "change_background",
+     description: "Change the application background to a CSS gradient.",
+     parameters: z.object({
+       background: z.string().optional(),
+       color: z.string().optional(),
+     }),
+     handler: async (args) => {
+       const next = resolveGradient(args.background ?? args.color);
+       background.set(next);
+       return { background: next };
+     },
+   };
+ }
+ ```
+ 
+ Register that config from a component or service with
+ `registerFrontendTool(createBackgroundTool(background))`. The registration is
+ removed when that injector is destroyed.
+ 
+ The schema advertises the input shape and supplies TypeScript inference.
+ Runtime arguments arrive as parsed JSON; validate inside the handler when the
+ action needs a hard trust boundary. The handler receives the calling agent,
+ the raw tool call, and an optional abort signal as its second argument.
+ 
+ ## Render a tool result
+ 
+ A renderer is a standalone component with a required `toolCall` signal input.
+ Its status moves through `"in-progress"`, `"executing"`, and `"complete"`.
+ 
+ ```ts title="src/app/weather-card.component.ts"
+ import { Component, input } from "@angular/core";
+ import {
+   type AngularToolCall,
+   type ToolRenderer,
+ } from "@copilotkit/angular";
+ 
+ type WeatherArgs = { city: string };
+ 
+ @Component({
+   selector: "app-weather-card",
+   template: `
+     @let call = toolCall();
+     @if (call.status === "complete") {
+       <article>
+         <strong>{{ call.args.city }}</strong>
+         <p>{{ call.result }}</p>
+       </article>
+     } @else {
+       <p>Loading weather for {{ call.args.city ?? "…" }}</p>
+     }
+   `,
+ })
+ export class WeatherCardComponent implements ToolRenderer<WeatherArgs> {
+   readonly toolCall = input.required<AngularToolCall<WeatherArgs>>();
+ }
+ ```
+ 
+ Pass the class as `component` when the tool runs in the browser:
+ 
+ ```ts
+ registerFrontendTool({
+   name: "getWeather",
+   description: "Get the current weather for a city",
+   parameters: z.object({ city: z.string() }),
+   component: WeatherCardComponent,
+   handler: async ({ city }, { signal }) => {
+     const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
+       signal,
+     });
+     return response.text();
+   },
+ });
+ ```
+ 
+ Use `registerRenderToolCall` instead when the tool runs on the server and the
+ browser only renders its call:
+ 
+ ```ts
+ registerRenderToolCall({
+   name: "getWeather",
+   args: z.object({ city: z.string() }),
+   component: WeatherCardComponent,
+ });
+ ```
+ 
+ ## Choose a generative UI path
+ 
+ | Path | Best fit | Angular setup |
+ | --- | --- | --- |
+ | Your components | Known data shapes and application actions | `registerFrontendTool` or `registerRenderToolCall` with a component |
+ | A2UI | A server emits A2UI operations or snapshots | Runtime capability turns on the built-in renderer; an optional `a2ui` config supplies a catalog or theme |
+ | Open Generative UI | The agent produces streamed HTML, CSS, and script expressions | Set `openGenerativeUI` in `provideCopilotKit` |
+ | MCP Apps | An MCP server returns an interactive app resource | Add `provideMCPApps()` from `@copilotkit/angular/mcp-apps` |
+ 
+ ### Open Generative UI
+ 
+ An `openGenerativeUI` object opts the frontend into the built-in sandboxed
+ renderer. Expose narrow host functions when generated UI must ask the
+ application to act.
+ 
+ ```ts title="src/app/app.config.ts"
+ import { ApplicationConfig } from "@angular/core";
+ import {
+   provideCopilotKit,
+   type SandboxFunction,
+ } from "@copilotkit/angular";
+ import { z } from "zod";
+ 
+ const setDashboardFilter: SandboxFunction<{ filter: string }> = {
+   name: "setDashboardFilter",
+   description: "Set the active dashboard filter",
+   parameters: z.object({ filter: z.string() }),
+   handler: async ({ filter }) => {
+     sessionStorage.setItem("dashboard-filter", filter);
+     return { applied: filter };
+   },
+ };
+ 
+ export const appConfig: ApplicationConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "/api/copilotkit",
+       openGenerativeUI: {
+         sandboxFunctions: [setDashboardFilter],
+       },
+     }),
+   ],
+ };
+ ```
+ 
+ Generated code runs in a sandboxed iframe without same-origin access. It calls
+ only the host functions you list in `sandboxFunctions`.
+ 
+ ### MCP Apps
+ 
+ ```ts title="src/app/app.config.ts"
+ import { ApplicationConfig } from "@angular/core";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ import { provideMCPApps } from "@copilotkit/angular/mcp-apps";
+ 
+ export const appConfig: ApplicationConfig = {
+   providers: [
+     provideCopilotKit({ runtimeUrl: "/api/copilotkit" }),
+     provideMCPApps(),
+   ],
+ };
+ ```
+ 
+ MCP resource and tool requests travel through the selected AG-UI agent. The
+ browser provider does not take a server URL.
+ 
+ ## Next steps
+ 
+ - [registerFrontendTool API](/reference/angular/functions/registerFrontendTool)
+ - [registerRenderToolCall API](/reference/angular/functions/registerRenderToolCall)
+ - [Activity renderers](/reference/angular/functions/registerRenderActivityMessage)
+ - [Runnable tool and generative UI examples](/angular/agno/features#frontend-tools)
  
````

**High — A2UI schemas, styling, and recovery**

`/angular/agno/guides/a2ui` · route `/a2ui` · under “Next steps”

236 code lines, 152 prose lines changed.

````diff
- # A2UI schemas, styling, and recovery
- 
- > Configure typed A2UI catalogs, Angular-owned styles, and incomplete-stream recovery.
- 
- A2UI renders declarative interface operations and snapshots inside Angular
- chat. Configure it with a catalog of allowed components; the renderer creates
- only components that the catalog defines.
- 
- ## What is A2UI?
- 
- A2UI is CopilotKit's declarative generative UI path for Angular. Instead of
- asking an agent to emit arbitrary component code, you give it a typed catalog
- and render only the operations that match that catalog.
- 
- ## Choose a schema strategy
- 
- Catalog component definitions use Zod schemas for their props. A broad catalog
- lets the agent compose several application primitives. A fixed catalog narrows
- the generated interface to a specific domain and set of shapes.
- 
- The flight example keeps its component vocabulary deliberately small:
- 
- ```typescript
- // features/a2ui/a2ui-catalogs.ts
- const fixedDefinitions = {
-   Card: { props: z.object({ child: z.string() }) },
-   Title: { props: z.object({ text: dynamicString }) },
-   Airport: { props: z.object({ code: dynamicString }) },
-   Arrow: { props: z.object({}) },
-   AirlineBadge: { props: z.object({ name: dynamicString }) },
-   PriceTag: { props: z.object({ amount: dynamicString }) },
-   Button: {
-     props: z.object({
-       child: z.string(),
-       variant: z.enum(["primary", "secondary", "ghost"]).optional(),
-       action: z.unknown().optional(),
-     }),
-   },
- };
- ```
- 
- Give each catalog a stable `catalogId`, then select it in the `a2ui` option
- passed to `provideCopilotKit`. The Showcase chooses a general catalog, a fixed
- flight catalog, or the recovery variant from the active feature:
- 
- ```typescript
- // features/a2ui/a2ui-catalogs.ts
- export function a2uiConfigForFeature(feature: string): A2UIConfig | undefined {
-   switch (feature) {
-     case "beautiful-chat":
-       return { catalog: beautifulCatalog };
-     case "declarative-gen-ui":
-       return { catalog: declarativeCatalog };
-     case "a2ui-recovery":
-       return {
-         catalog: declarativeCatalog,
-         recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
-       };
-     case "a2ui-fixed-schema":
-       return { catalog: fixedCatalog };
-     default:
-       return undefined;
-   }
- }
- ```
- 
- In an application config, pass the chosen catalog and lifecycle policy through
- the Angular provider:
- 
- ```ts title="src/app/app.config.ts"
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
-   a2ui: {
-     catalog: productCatalog,
-     recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
-   },
- });
- ```
- 
- By default, CopilotKit includes the catalog schema in agent context. Set
- `includeSchema: false` only when the server already supplies equivalent schema
- and generation instructions. Otherwise the agent cannot reliably know which
- components and props are valid.
- 
- ## Style rendered components
- 
- Catalog renderers return web-component templates with application-owned class
- names. Style those classes in the global stylesheet so generated surfaces and
- their nested elements receive the same rules:
- 
- ```css
- /* styles.css */
- .a2ui-row {
-   display: flex;
-   flex-wrap: wrap;
-   align-items: stretch;
-   width: 100%;
- }
- 
- .a2ui-row > * {
-   flex: 1 1 10rem;
-   min-width: 0;
- }
- 
- .a2ui-column {
-   display: flex;
-   flex-direction: column;
-   width: 100%;
- }
- 
- [data-testid="declarative-card"],
- .a2ui-chart-card,
- .a2ui-flight-card {
-   display: block;
-   padding: 1rem;
-   border: 1px solid var(--line);
-   border-radius: 0.9rem;
-   background: white;
-   box-shadow: 0 8px 22px -18px rgb(15 23 42 / 0.4);
- }
- 
- .a2ui-metric {
-   display: grid;
-   min-width: 8rem;
-   gap: 0.25rem;
- }
- 
- .a2ui-metric > span,
- .a2ui-metric > small {
-   color: var(--muted);
-   font-size: 0.75rem;
- }
- 
- .a2ui-metric > strong {
-   font-size: 1.4rem;
- }
- 
- .a2ui-status,
- .a2ui-airline {
-   display: inline-flex;
-   width: fit-content;
-   padding: 0.25rem 0.55rem;
-   border-radius: 999px;
-   background: #eef2ff;
-   font-size: 0.75rem;
-   font-weight: 700;
- }
- 
- .a2ui-status-success {
-   background: #dcfce7;
-   color: #166534;
- }
- .a2ui-status-warning {
-   background: #fef3c7;
-   color: #92400e;
- }
- .a2ui-status-error {
-   background: #fee2e2;
-   color: #991b1b;
- }
- ```
- 
- Keep semantic state in explicit classes such as `a2ui-status-success` rather
- than asking the model to invent colors. You can also pass an A2UI `theme`
- through `provideCopilotKit` for renderer-level theme values; catalog CSS
- remains the right place for product-specific layout and visual states.
- 
- ## Recover incomplete streams
- 
- An interrupted stream can leave an A2UI surface without a terminal lifecycle
- event. Configure `recovery.showAfterMs` to avoid flashing recovery UI during a
- normal pause and `recovery.showAfterAttempts` to wait through transient retry
- attempts. The Showcase uses two seconds and two attempts, as shown in the
- catalog-selection snippet above.
- 
- Use `recovery.debugExposure` only when users should see protocol diagnostics.
- Keep it hidden in consumer-facing chat, or choose a collapsed or verbose mode
- for internal debugging. Recovery thresholds affect client display; the server
- still owns activity lifecycle status and retry behavior.
- 
- ## Angular support boundaries
- 
- - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the Angular 22 policy.
-   Do not add it to an Angular integration; use A2UI with a typed catalog instead.
- - **JSON Renderer is not applicable.** JSON Renderer does not provide an Angular renderer; use A2UI for declarative Angular interfaces.
- 
- These are authoritative framework support states, not missing examples.
- 
- ## Next steps
- 
- - [Dynamic catalog](/angular/agno/features#declarative-gen-ui)
- - [Fixed schema](/angular/agno/features#a2ui-fixed-schema)
- - [Recovery behavior](/angular/agno/features#a2ui-recovery)
- - [Other generative UI paths](/angular/agno/guides/frontend-tools-generative-ui)
+ # A2UI schemas, styling, and recovery
+ 
+ > Configure typed A2UI catalogs, Angular-owned styles, and incomplete-stream recovery.
+ 
+ A2UI renders declarative interface operations and snapshots inside Angular
+ chat. Configure it with a catalog of allowed components; the renderer creates
+ only components that the catalog defines.
+ 
+ ## What is A2UI?
+ 
+ A2UI is CopilotKit's declarative generative UI path for Angular. Instead of
+ asking an agent to emit arbitrary component code, you give it a typed catalog
+ and render only the operations that match that catalog.
+ 
+ ## Choose a schema strategy
+ 
+ Catalog component definitions use Zod schemas for their props. A broad catalog
+ lets the agent compose several application primitives. A fixed catalog narrows
+ the generated interface to a specific domain and set of shapes.
+ 
+ The flight example keeps its component vocabulary deliberately small:
+ 
+ ```typescript
+ // features/a2ui/a2ui-catalogs.ts
+ const fixedDefinitions = {
+   Card: { props: z.object({ child: z.string() }) },
+   Title: { props: z.object({ text: dynamicString }) },
+   Airport: { props: z.object({ code: dynamicString }) },
+   Arrow: { props: z.object({}) },
+   AirlineBadge: { props: z.object({ name: dynamicString }) },
+   PriceTag: { props: z.object({ amount: dynamicString }) },
+   Button: {
+     props: z.object({
+       child: z.string(),
+       variant: z.enum(["primary", "secondary", "ghost"]).optional(),
+       action: z.unknown().optional(),
+     }),
+   },
+ };
+ ```
+ 
+ Give each catalog a stable `catalogId`, then select it in the `a2ui` option
+ passed to `provideCopilotKit`. The Showcase chooses a general catalog, a fixed
+ flight catalog, or the recovery variant from the active feature:
+ 
+ ```typescript
+ // features/a2ui/a2ui-catalogs.ts
+ export function a2uiConfigForFeature(feature: string): A2UIConfig | undefined {
+   switch (feature) {
+     case "beautiful-chat":
+       return { catalog: beautifulCatalog };
+     case "declarative-gen-ui":
+       return { catalog: declarativeCatalog };
+     case "a2ui-recovery":
+       return {
+         catalog: declarativeCatalog,
+         recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
+       };
+     case "a2ui-fixed-schema":
+       return { catalog: fixedCatalog };
+     default:
+       return undefined;
+   }
+ }
+ ```
+ 
+ In an application config, pass the chosen catalog and lifecycle policy through
+ the Angular provider:
+ 
+ ```ts title="src/app/app.config.ts"
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+   a2ui: {
+     catalog: productCatalog,
+     recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
+   },
+ });
+ ```
+ 
+ By default, CopilotKit includes the catalog schema in agent context. Set
+ `includeSchema: false` only when the server already supplies equivalent schema
+ and generation instructions. Otherwise the agent cannot reliably know which
+ components and props are valid.
+ 
+ ## Style rendered components
+ 
+ Catalog renderers return web-component templates with application-owned class
+ names. Style those classes in the global stylesheet so generated surfaces and
+ their nested elements receive the same rules:
+ 
+ ```css
+ /* styles.css */
+ .a2ui-row {
+   display: flex;
+   flex-wrap: wrap;
+   align-items: stretch;
+   width: 100%;
+ }
+ 
+ .a2ui-row > * {
+   flex: 1 1 10rem;
+   min-width: 0;
+ }
+ 
+ .a2ui-column {
+   display: flex;
+   flex-direction: column;
+   width: 100%;
+ }
+ 
+ [data-testid="declarative-card"],
+ .a2ui-chart-card,
+ .a2ui-flight-card {
+   display: block;
+   padding: 1rem;
+   border: 1px solid var(--line);
+   border-radius: 0.9rem;
+   background: white;
+   box-shadow: 0 8px 22px -18px rgb(15 23 42 / 0.4);
+ }
+ 
+ .a2ui-metric {
+   display: grid;
+   min-width: 8rem;
+   gap: 0.25rem;
+ }
+ 
+ .a2ui-metric > span,
+ .a2ui-metric > small {
+   color: var(--muted);
+   font-size: 0.75rem;
+ }
+ 
+ .a2ui-metric > strong {
+   font-size: 1.4rem;
+ }
+ 
+ .a2ui-status,
+ .a2ui-airline {
+   display: inline-flex;
+   width: fit-content;
+   padding: 0.25rem 0.55rem;
+   border-radius: 999px;
+   background: #eef2ff;
+   font-size: 0.75rem;
+   font-weight: 700;
+ }
+ 
+ .a2ui-status-success {
+   background: #dcfce7;
+   color: #166534;
+ }
+ .a2ui-status-warning {
+   background: #fef3c7;
+   color: #92400e;
+ }
+ .a2ui-status-error {
+   background: #fee2e2;
+   color: #991b1b;
+ }
+ ```
+ 
+ Keep semantic state in explicit classes such as `a2ui-status-success` rather
+ than asking the model to invent colors. You can also pass an A2UI `theme`
+ through `provideCopilotKit` for renderer-level theme values; catalog CSS
+ remains the right place for product-specific layout and visual states.
+ 
+ ## Recover incomplete streams
+ 
+ An interrupted stream can leave an A2UI surface without a terminal lifecycle
+ event. Configure `recovery.showAfterMs` to avoid flashing recovery UI during a
+ normal pause and `recovery.showAfterAttempts` to wait through transient retry
+ attempts. The Showcase uses two seconds and two attempts, as shown in the
+ catalog-selection snippet above.
+ 
+ Use `recovery.debugExposure` only when users should see protocol diagnostics.
+ Keep it hidden in consumer-facing chat, or choose a collapsed or verbose mode
+ for internal debugging. Recovery thresholds affect client display; the server
+ still owns activity lifecycle status and retry behavior.
+ 
+ ## Angular support boundaries
+ 
+ - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the Angular 22 policy.
+   Do not add it to an Angular integration; use A2UI with a typed catalog instead.
+ - **JSON Renderer is not applicable.** JSON Renderer does not provide an Angular renderer; use A2UI for declarative Angular interfaces.
+ 
+ These are authoritative framework support states, not missing examples.
+ 
+ ## Next steps
+ 
+ - [Dynamic catalog](/angular/agno/features#declarative-gen-ui)
+ - [Fixed schema](/angular/agno/features#a2ui-fixed-schema)
+ - [Recovery behavior](/angular/agno/features#a2ui-recovery)
+ - [Other generative UI paths](/angular/agno/guides/frontend-tools-generative-ui)
  
````

**High — Voice and multimodal input**

`/angular/agno/guides/voice-multimodal` · route `/voice-multimodal` · under “Next steps”

94 code lines, 126 prose lines changed.

````diff
- # Voice and multimodal input
- 
- > Add speech transcription, file attachments, and typed media content to an Angular chat.
- 
- `CopilotChat` includes a microphone control and an attachment composer. Voice
- input is transcribed through Copilot Runtime and inserted into the composer as
- text. Multimodal input sends image or document content parts with the user's
- message.
- 
- ## What is voice and multimodal input?
- 
- Voice input turns recorded speech into editable text before a message is sent.
- Multimodal input attaches typed image or document content parts to that
- message, so a compatible model can reason about more than text.
- 
- ## Accept voice input
- 
- No component option is required to display the microphone. The browser asks
- for microphone permission, records the audio, and sends it to the Runtime
- transcription endpoint. The resulting text remains editable before the user
- sends it.
- 
- Serve production applications over HTTPS so browsers can grant microphone
- access. Your Runtime must also have transcription configured; a visible
- microphone does not make an unavailable transcription service succeed.
- 
- Voice requests can call the same backend tools as typed requests. Register
- renderers only for the exact tool names your backend exposes:
- 
- ```typescript
- // features/media/media-feature.component.ts
- export const voiceWeatherRendererConfigs: readonly RenderToolCallConfig<VoiceWeatherArgs>[] =
-   VOICE_WEATHER_TOOL_NAMES.map((name) => ({
-     name,
-     args: z.record(z.unknown()),
-     component:
-       WeatherToolCard as unknown as RenderToolCallConfig<VoiceWeatherArgs>["component"],
-   }));
- ```
- 
- The renderer registration is optional. It changes how matching tool calls are
- displayed, not how speech is captured or transcribed.
- 
- ## Configure attachments
- 
- Define an `AttachmentsConfig` and bind it to the chat surface. The runnable
- Showcase accepts images and PDFs up to 10 MiB:
- 
- ```typescript
- // features/media/media-feature.component.ts
- const MULTIMODAL_ATTACHMENTS: AttachmentsConfig = {
-   enabled: true,
-   accept: "image/*,application/pdf",
-   maxSize: 10 * 1024 * 1024,
- };
- ```
- 
- ```html title="media-chat.component.html"
- <copilot-chat [attachments]="multimodalAttachments" />
- ```
- 
- The `accept` value filters the file picker and `maxSize` provides immediate
- client feedback. They are not server-side security controls. Validate file
- type, size, and content again wherever uploads are stored or processed. Use
- the configuration's upload callbacks when files should go to object storage
- instead of traveling inline with a message.
- 
- ## Send media programmatically
- 
- For a bundled sample or custom uploader, add a user message whose `content`
- contains normal AG-UI content parts. The Showcase constructs a text part plus
- an image or document part:
- 
- ```typescript
- // features/media/media-model.ts
- export function createMultimodalMessage(
-   spec: Pick<SampleSpec, "filename" | "mimeType" | "autoPrompt">,
-   base64: string,
-   size: number,
-   id: string,
- ): MediaAgentMessage {
-   return {
-     id,
-     role: "user",
-     content: [
-       { type: "text", text: spec.autoPrompt },
-       {
-         type: spec.mimeType === "application/pdf" ? "document" : "image",
-         source: {
-           type: "data",
-           value: base64,
-           mimeType: spec.mimeType,
-         },
-         metadata: { filename: spec.filename, size },
-       },
-     ],
-   };
- }
- ```
- 
- Add that message to the selected agent and run the agent. Keep the MIME type
- authoritative: use an `image` part for images and a `document` part for PDFs
- and other documents. The chosen model and backend converter must support each
- MIME type you accept.
- 
- ## Next steps
- 
- - [Voice input](/angular/agno/features#voice)
- - [Multimodal attachments](/angular/agno/features#multimodal)
- - [Chat UI configuration](/angular/agno/guides/chat-ui)
+ # Voice and multimodal input
+ 
+ > Add speech transcription, file attachments, and typed media content to an Angular chat.
+ 
+ `CopilotChat` includes a microphone control and an attachment composer. Voice
+ input is transcribed through Copilot Runtime and inserted into the composer as
+ text. Multimodal input sends image or document content parts with the user's
+ message.
+ 
+ ## What is voice and multimodal input?
+ 
+ Voice input turns recorded speech into editable text before a message is sent.
+ Multimodal input attaches typed image or document content parts to that
+ message, so a compatible model can reason about more than text.
+ 
+ ## Accept voice input
+ 
+ No component option is required to display the microphone. The browser asks
+ for microphone permission, records the audio, and sends it to the Runtime
+ transcription endpoint. The resulting text remains editable before the user
+ sends it.
+ 
+ Serve production applications over HTTPS so browsers can grant microphone
+ access. Your Runtime must also have transcription configured; a visible
+ microphone does not make an unavailable transcription service succeed.
+ 
+ Voice requests can call the same backend tools as typed requests. Register
+ renderers only for the exact tool names your backend exposes:
+ 
+ ```typescript
+ // features/media/media-feature.component.ts
+ export const voiceWeatherRendererConfigs: readonly RenderToolCallConfig<VoiceWeatherArgs>[] =
+   VOICE_WEATHER_TOOL_NAMES.map((name) => ({
+     name,
+     args: z.record(z.unknown()),
+     component:
+       WeatherToolCard as unknown as RenderToolCallConfig<VoiceWeatherArgs>["component"],
+   }));
+ ```
+ 
+ The renderer registration is optional. It changes how matching tool calls are
+ displayed, not how speech is captured or transcribed.
+ 
+ ## Configure attachments
+ 
+ Define an `AttachmentsConfig` and bind it to the chat surface. The runnable
+ Showcase accepts images and PDFs up to 10 MiB:
+ 
+ ```typescript
+ // features/media/media-feature.component.ts
+ const MULTIMODAL_ATTACHMENTS: AttachmentsConfig = {
+   enabled: true,
+   accept: "image/*,application/pdf",
+   maxSize: 10 * 1024 * 1024,
+ };
+ ```
+ 
+ ```html title="media-chat.component.html"
+ <copilot-chat [attachments]="multimodalAttachments" />
+ ```
+ 
+ The `accept` value filters the file picker and `maxSize` provides immediate
+ client feedback. They are not server-side security controls. Validate file
+ type, size, and content again wherever uploads are stored or processed. Use
+ the configuration's upload callbacks when files should go to object storage
+ instead of traveling inline with a message.
+ 
+ ## Send media programmatically
+ 
+ For a bundled sample or custom uploader, add a user message whose `content`
+ contains normal AG-UI content parts. The Showcase constructs a text part plus
+ an image or document part:
+ 
+ ```typescript
+ // features/media/media-model.ts
+ export function createMultimodalMessage(
+   spec: Pick<SampleSpec, "filename" | "mimeType" | "autoPrompt">,
+   base64: string,
+   size: number,
+   id: string,
+ ): MediaAgentMessage {
+   return {
+     id,
+     role: "user",
+     content: [
+       { type: "text", text: spec.autoPrompt },
+       {
+         type: spec.mimeType === "application/pdf" ? "document" : "image",
+         source: {
+           type: "data",
+           value: base64,
+           mimeType: spec.mimeType,
+         },
+         metadata: { filename: spec.filename, size },
+       },
+     ],
+   };
+ }
+ ```
+ 
+ Add that message to the selected agent and run the agent. Keep the MIME type
+ authoritative: use an `image` part for images and a `document` part for PDFs
+ and other documents. The chosen model and backend converter must support each
+ MIME type you accept.
+ 
+ ## Next steps
+ 
+ - [Voice input](/angular/agno/features#voice)
+ - [Multimodal attachments](/angular/agno/features#multimodal)
+ - [Chat UI configuration](/angular/agno/guides/chat-ui)
  
````

**High — Human-in-the-loop and interrupts**

`/angular/agno/guides/human-in-the-loop` · route `/human-in-the-loop` · under “Next steps”

386 code lines, 160 prose lines changed.

````diff
- # Human-in-the-loop and interrupts
- 
- > Pause an Angular agent flow for a user decision, then resume it from a typed component or interrupt controller.
- 
- Human-in-the-loop flows pause agent work until a person supplies a decision.
- Angular has two paths with different owners.
- 
- | Pattern | Who chooses the pause? | Angular API |
- | --- | --- | --- |
- | Human-in-the-loop tool | The agent calls a registered browser tool | `registerHumanInTheLoop` |
- | Interrupt | The backend agent emits an AG-UI interrupt | `AgentStore.interruptController`, `injectInterrupt` |
- 
- Use a tool when the model should decide whether to ask. Use an interrupt when
- the backend workflow must stop at a fixed checkpoint.
- 
- ## Register a decision tool
- 
- The renderer receives a `toolCall` signal. Call `respond(result)` once the user
- has made a choice.
- 
- ```ts title="src/app/approval-card.component.ts"
- import { Component, input } from "@angular/core";
- import {
-   type HumanInTheLoopToolCall,
-   type HumanInTheLoopToolRenderer,
- } from "@copilotkit/angular";
- 
- type ApprovalArgs = {
-   action: string;
-   reason: string;
- };
- 
- @Component({
-   selector: "app-approval-card",
-   template: `
-     @let call = toolCall();
-     <article>
-       <h3>Approve {{ call.args.action ?? "this action" }}?</h3>
-       <p>{{ call.args.reason }}</p>
- 
-       @if (call.status !== "complete") {
-         <button type="button" (click)="call.respond({ approved: true })">
-           Approve
-         </button>
-         <button type="button" (click)="call.respond({ approved: false })">
-           Reject
-         </button>
-       }
-     </article>
-   `,
- })
- export class ApprovalCardComponent
-   implements HumanInTheLoopToolRenderer<ApprovalArgs>
- {
-   readonly toolCall =
-     input.required<HumanInTheLoopToolCall<ApprovalArgs>>();
- }
- ```
- 
- Register the tool from the component or service that owns the decision UI:
- 
- ```ts title="src/app/approval-tools.service.ts"
- import { Injectable } from "@angular/core";
- import { registerHumanInTheLoop } from "@copilotkit/angular";
- import { z } from "zod";
- import { ApprovalCardComponent } from "./approval-card.component";
- 
- @Injectable()
- export class ApprovalToolsService {
-   constructor() {
-     registerHumanInTheLoop({
-       name: "requestApproval",
-       description: "Ask the user before a consequential action",
-       parameters: z.object({
-         action: z.string(),
-         reason: z.string(),
-       }),
-       component: ApprovalCardComponent,
-     });
-   }
- }
- ```
- 
- There is no handler. CopilotKit supplies one that waits for `respond`, returns
- the decision to the agent, and continues the run. The registration is removed
- when the owning injector is destroyed.
- 
- ## Handle an interrupt from the store
- 
- An interrupt is a state of one conversation: this agent, this thread, this run
- is waiting for a decision. The store that already exposes that conversation's
- messages and state exposes its pending interrupt too, so a component that holds
- a store needs nothing else:
- 
- ```ts title="src/app/ticket-approval.component.ts"
- import { Component } from "@angular/core";
- import { injectAgentStore } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-ticket-approval",
-   template: `
-     @let interrupts = store().interruptController;
- 
-     @if (interrupts.hasInterrupt()) {
-       <section>
-         <p>{{ interrupts.interrupt()?.message }}</p>
-         <button type="button" (click)="interrupts.resolve({ approved: true })">
-           Approve
-         </button>
-         <button type="button" (click)="interrupts.cancel()">Reject</button>
-       </section>
-     }
-   `,
- })
- export class TicketApprovalComponent {
-   protected readonly store = injectAgentStore("ticketing");
- }
- ```
- 
- The controller is created and connected with the store, then destroyed when the
- store is torn down or replaced. Standard AG-UI interrupts already retained by
- the agent are visible immediately, and legacy `on_interrupt` events are observed
- for the store's full lifetime.
- 
- ## Handle an interrupt with a typed controller
- 
- `injectInterrupt` subscribes to one agent and exposes the pending decision as
- signals. It supports standard AG-UI interrupts and the legacy
- `on_interrupt` custom event. Use it when the store default is not enough — a
- typed payload, an `enabled` filter, or a `handler` that prepares data for the
- view.
- 
- <Callout type="warn">
-   Do not render an `injectInterrupt` controller and
-   `store().interruptController` for the same decision. Both independently
-   observe the agent, so the same interrupt becomes visible in both and two UI
-   actions could attempt to resume it. Render only the specialized controller
-   when you need filtering or typed handling.
- </Callout>
- 
- ```ts title="src/app/interrupt-panel.component.ts"
- import { Component } from "@angular/core";
- import { injectInterrupt } from "@copilotkit/angular";
- 
- type ReviewRequest = {
-   title?: string;
-   choices?: Array<{ id: string; label: string }>;
- };
- 
- @Component({
-   selector: "app-interrupt-panel",
-   template: `
-     @if (controller.event(); as event) {
-       @let request = asReviewRequest(event.value);
-       <section aria-labelledby="review-title">
-         <h2 id="review-title">{{ request.title ?? "Review required" }}</h2>
- 
-         @for (choice of request.choices ?? []; track choice.id) {
-           <button type="button" (click)="resolve(choice.id)">
-             {{ choice.label }}
-           </button>
-         }
- 
-         <button type="button" (click)="cancel()">Cancel</button>
-       </section>
-     }
- 
-     @if (controller.error()) {
-       <p role="alert">The decision could not be submitted.</p>
-     }
-   `,
- })
- export class InterruptPanelComponent {
-   protected readonly controller =
-     injectInterrupt<ReviewRequest>("default");
- 
-   protected asReviewRequest(value: unknown): ReviewRequest {
-     return typeof value === "object" && value !== null
-       ? (value as ReviewRequest)
-       : {};
-   }
- 
-   protected resolve(choiceId: string): void {
-     this.controller.resolve({ choiceId }).catch(() => undefined);
-   }
- 
-   protected cancel(): void {
-     this.controller.cancel().catch(() => undefined);
-   }
- }
- ```
- 
- The controller clears stale decisions when the thread changes. Calls to
- `resolve` or `cancel` share one in-flight resume promise, so a double click
- does not start two resume runs.
- 
- The runnable Showcase uses the same controller API in its route-aware feature:
- 
- ```typescript
- // features/interrupt/interrupt-feature.component.ts
- export class InterruptFeatureComponent {
-   private readonly route = inject(ActivatedRoute);
-   protected readonly feature =
-     (this.route.snapshot.data["feature"] as string | undefined) ??
-     "gen-ui-interrupt";
-   protected readonly isHeadless = this.feature === "interrupt-headless";
-   private readonly agentId = agentIdForCurrentIntegration(this.feature);
-   protected readonly controller = injectInterrupt({ agentId: this.agentId });
-   protected readonly payload = computed(() =>
-     parseInterruptPayload(this.controller.event()?.value),
-   );
-   protected readonly pickedLabel = signal<string | null>(null);
-   private lastInterruptEvent: object | null = null;
- 
-   constructor() {
-     effect(() => {
-       const event = this.controller.event();
-       if (event && event !== this.lastInterruptEvent) {
-         this.lastInterruptEvent = event;
-         this.pickedLabel.set(null);
-       }
-     });
- 
-     if (usesFrontendSchedulingTool(this.feature, integrationId())) {
-       const config: HumanInTheLoopConfig<ScheduleMeetingArgs> = {
-         agentId: this.agentId,
-         name: "schedule_meeting",
-         description:
-           "Ask the user to pick a meeting time and return the selected slot.",
-         parameters: z.object({
-           topic: z.string(),
-           attendee: z.string().optional(),
-         }),
-         component:
-           TimePickerCard as unknown as HumanInTheLoopConfig<ScheduleMeetingArgs>["component"],
-       };
-       registerHumanInTheLoop(config);
-     }
-   }
- 
-   /** Resolve the active decision while retaining its visible confirmation. */
-   protected resolve(slot: InterruptSlot): void {
-     this.pickedLabel.set(slot.label);
-     this.controller
-       .resolve({
-         chosen_time: slot.iso,
-         chosen_label: slot.label,
-       })
-       .catch(() => undefined);
-   }
- 
-   /** Cancel only the currently displayed interrupt. */
-   protected cancel(): void {
-     this.controller.cancel().catch(() => undefined);
-   }
- }
- ```
- 
- Use the controller's `enabled` option when several components listen to the
- same agent and each should accept only certain interrupt payloads. Use
- `handler` when the view needs async data prepared before it appears.
- 
- ## Place the decision UI
- 
- The tool renderer appears in the tool-call flow inside chat. An interrupt
- controller is headless: bind its signals anywhere in the application, including
- a route-level dialog, side panel, or task view.
- 
- ## Next steps
- 
- - [registerHumanInTheLoop API](/reference/angular/functions/registerHumanInTheLoop)
- - [injectInterrupt API](/reference/angular/functions/injectInterrupt)
- - [Runnable interrupt examples](/angular/agno/features#gen-ui-interrupt)
+ # Human-in-the-loop and interrupts
+ 
+ > Pause an Angular agent flow for a user decision, then resume it from a typed component or interrupt controller.
+ 
+ Human-in-the-loop flows pause agent work until a person supplies a decision.
+ Angular has two paths with different owners.
+ 
+ | Pattern | Who chooses the pause? | Angular API |
+ | --- | --- | --- |
+ | Human-in-the-loop tool | The agent calls a registered browser tool | `registerHumanInTheLoop` |
+ | Interrupt | The backend agent emits an AG-UI interrupt | `AgentStore.interruptController`, `injectInterrupt` |
+ 
+ Use a tool when the model should decide whether to ask. Use an interrupt when
+ the backend workflow must stop at a fixed checkpoint.
+ 
+ ## Register a decision tool
+ 
+ The renderer receives a `toolCall` signal. Call `respond(result)` once the user
+ has made a choice.
+ 
+ ```ts title="src/app/approval-card.component.ts"
+ import { Component, input } from "@angular/core";
+ import {
+   type HumanInTheLoopToolCall,
+   type HumanInTheLoopToolRenderer,
+ } from "@copilotkit/angular";
+ 
+ type ApprovalArgs = {
+   action: string;
+   reason: string;
+ };
+ 
+ @Component({
+   selector: "app-approval-card",
+   template: `
+     @let call = toolCall();
+     <article>
+       <h3>Approve {{ call.args.action ?? "this action" }}?</h3>
+       <p>{{ call.args.reason }}</p>
+ 
+       @if (call.status !== "complete") {
+         <button type="button" (click)="call.respond({ approved: true })">
+           Approve
+         </button>
+         <button type="button" (click)="call.respond({ approved: false })">
+           Reject
+         </button>
+       }
+     </article>
+   `,
+ })
+ export class ApprovalCardComponent
+   implements HumanInTheLoopToolRenderer<ApprovalArgs>
+ {
+   readonly toolCall =
+     input.required<HumanInTheLoopToolCall<ApprovalArgs>>();
+ }
+ ```
+ 
+ Register the tool from the component or service that owns the decision UI:
+ 
+ ```ts title="src/app/approval-tools.service.ts"
+ import { Injectable } from "@angular/core";
+ import { registerHumanInTheLoop } from "@copilotkit/angular";
+ import { z } from "zod";
+ import { ApprovalCardComponent } from "./approval-card.component";
+ 
+ @Injectable()
+ export class ApprovalToolsService {
+   constructor() {
+     registerHumanInTheLoop({
+       name: "requestApproval",
+       description: "Ask the user before a consequential action",
+       parameters: z.object({
+         action: z.string(),
+         reason: z.string(),
+       }),
+       component: ApprovalCardComponent,
+     });
+   }
+ }
+ ```
+ 
+ There is no handler. CopilotKit supplies one that waits for `respond`, returns
+ the decision to the agent, and continues the run. The registration is removed
+ when the owning injector is destroyed.
+ 
+ ## Handle an interrupt from the store
+ 
+ An interrupt is a state of one conversation: this agent, this thread, this run
+ is waiting for a decision. The store that already exposes that conversation's
+ messages and state exposes its pending interrupt too, so a component that holds
+ a store needs nothing else:
+ 
+ ```ts title="src/app/ticket-approval.component.ts"
+ import { Component } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-ticket-approval",
+   template: `
+     @let interrupts = store().interruptController;
+ 
+     @if (interrupts.hasInterrupt()) {
+       <section>
+         <p>{{ interrupts.interrupt()?.message }}</p>
+         <button type="button" (click)="interrupts.resolve({ approved: true })">
+           Approve
+         </button>
+         <button type="button" (click)="interrupts.cancel()">Reject</button>
+       </section>
+     }
+   `,
+ })
+ export class TicketApprovalComponent {
+   protected readonly store = injectAgentStore("ticketing");
+ }
+ ```
+ 
+ The controller is created and connected with the store, then destroyed when the
+ store is torn down or replaced. Standard AG-UI interrupts already retained by
+ the agent are visible immediately, and legacy `on_interrupt` events are observed
+ for the store's full lifetime.
+ 
+ ## Handle an interrupt with a typed controller
+ 
+ `injectInterrupt` subscribes to one agent and exposes the pending decision as
+ signals. It supports standard AG-UI interrupts and the legacy
+ `on_interrupt` custom event. Use it when the store default is not enough — a
+ typed payload, an `enabled` filter, or a `handler` that prepares data for the
+ view.
+ 
+ <Callout type="warn">
+   Do not render an `injectInterrupt` controller and
+   `store().interruptController` for the same decision. Both independently
+   observe the agent, so the same interrupt becomes visible in both and two UI
+   actions could attempt to resume it. Render only the specialized controller
+   when you need filtering or typed handling.
+ </Callout>
+ 
+ ```ts title="src/app/interrupt-panel.component.ts"
+ import { Component } from "@angular/core";
+ import { injectInterrupt } from "@copilotkit/angular";
+ 
+ type ReviewRequest = {
+   title?: string;
+   choices?: Array<{ id: string; label: string }>;
+ };
+ 
+ @Component({
+   selector: "app-interrupt-panel",
+   template: `
+     @if (controller.event(); as event) {
+       @let request = asReviewRequest(event.value);
+       <section aria-labelledby="review-title">
+         <h2 id="review-title">{{ request.title ?? "Review required" }}</h2>
+ 
+         @for (choice of request.choices ?? []; track choice.id) {
+           <button type="button" (click)="resolve(choice.id)">
+             {{ choice.label }}
+           </button>
+         }
+ 
+         <button type="button" (click)="cancel()">Cancel</button>
+       </section>
+     }
+ 
+     @if (controller.error()) {
+       <p role="alert">The decision could not be submitted.</p>
+     }
+   `,
+ })
+ export class InterruptPanelComponent {
+   protected readonly controller =
+     injectInterrupt<ReviewRequest>("default");
+ 
+   protected asReviewRequest(value: unknown): ReviewRequest {
+     return typeof value === "object" && value !== null
+       ? (value as ReviewRequest)
+       : {};
+   }
+ 
+   protected resolve(choiceId: string): void {
+     this.controller.resolve({ choiceId }).catch(() => undefined);
+   }
+ 
+   protected cancel(): void {
+     this.controller.cancel().catch(() => undefined);
+   }
+ }
+ ```
+ 
+ The controller clears stale decisions when the thread changes. Calls to
+ `resolve` or `cancel` share one in-flight resume promise, so a double click
+ does not start two resume runs.
+ 
+ The runnable Showcase uses the same controller API in its route-aware feature:
+ 
+ ```typescript
+ // features/interrupt/interrupt-feature.component.ts
+ export class InterruptFeatureComponent {
+   private readonly route = inject(ActivatedRoute);
+   protected readonly feature =
+     (this.route.snapshot.data["feature"] as string | undefined) ??
+     "gen-ui-interrupt";
+   protected readonly isHeadless = this.feature === "interrupt-headless";
+   private readonly agentId = agentIdForCurrentIntegration(this.feature);
+   protected readonly controller = injectInterrupt({ agentId: this.agentId });
+   protected readonly payload = computed(() =>
+     parseInterruptPayload(this.controller.event()?.value),
+   );
+   protected readonly pickedLabel = signal<string | null>(null);
+   private lastInterruptEvent: object | null = null;
+ 
+   constructor() {
+     effect(() => {
+       const event = this.controller.event();
+       if (event && event !== this.lastInterruptEvent) {
+         this.lastInterruptEvent = event;
+         this.pickedLabel.set(null);
+       }
+     });
+ 
+     if (usesFrontendSchedulingTool(this.feature, integrationId())) {
+       const config: HumanInTheLoopConfig<ScheduleMeetingArgs> = {
+         agentId: this.agentId,
+         name: "schedule_meeting",
+         description:
+           "Ask the user to pick a meeting time and return the selected slot.",
+         parameters: z.object({
+           topic: z.string(),
+           attendee: z.string().optional(),
+         }),
+         component:
+           TimePickerCard as unknown as HumanInTheLoopConfig<ScheduleMeetingArgs>["component"],
+       };
+       registerHumanInTheLoop(config);
+     }
+   }
+ 
+   /** Resolve the active decision while retaining its visible confirmation. */
+   protected resolve(slot: InterruptSlot): void {
+     this.pickedLabel.set(slot.label);
+     this.controller
+       .resolve({
+         chosen_time: slot.iso,
+         chosen_label: slot.label,
+       })
+       .catch(() => undefined);
+   }
+ 
+   /** Cancel only the currently displayed interrupt. */
+   protected cancel(): void {
+     this.controller.cancel().catch(() => undefined);
+   }
+ }
+ ```
+ 
+ Use the controller's `enabled` option when several components listen to the
+ same agent and each should accept only certain interrupt payloads. Use
+ `handler` when the view needs async data prepared before it appears.
+ 
+ ## Place the decision UI
+ 
+ The tool renderer appears in the tool-call flow inside chat. An interrupt
+ controller is headless: bind its signals anywhere in the application, including
+ a route-level dialog, side panel, or task view.
+ 
+ ## Next steps
+ 
+ - [registerHumanInTheLoop API](/reference/angular/functions/registerHumanInTheLoop)
+ - [injectInterrupt API](/reference/angular/functions/injectInterrupt)
+ - [Runnable interrupt examples](/angular/agno/features#gen-ui-interrupt)
  
````

**High — Shared state and agent context**

`/angular/agno/guides/shared-state` · route `/shared-state` · under “Next steps”

174 code lines, 126 prose lines changed.

````diff
- # Shared state and agent context
- 
- > Read and write agent state with Angular signals, and send application-owned context to the agent.
- 
- Shared state and agent context solve two different data flows.
- 
- | Data flow | Use |
- | --- | --- |
- | Agent and application both read and write the value | `injectAgentStore` and `agent.setState` |
- | The application owns the value and the agent only reads it | `connectAgentContext` or `CopilotKitAgentContext` |
- 
- ## Read agent state
- 
- `injectAgentStore` returns a signal that resolves one agent. The store exposes
- messages, state, and run status as nested signals.
- 
- ```ts title="src/app/workspace.component.ts"
- import { Component, computed } from "@angular/core";
- import { injectAgentStore } from "@copilotkit/angular";
- 
- type WorkspaceState = {
-   notes: string[];
-   priority: "low" | "normal" | "high";
- };
- 
- const EMPTY_STATE: WorkspaceState = {
-   notes: [],
-   priority: "normal",
- };
- 
- @Component({
-   selector: "app-workspace",
-   template: `
-     <p>Priority: {{ state().priority }}</p>
-     <ul>
-       @for (note of state().notes; track note) {
-         <li>{{ note }}</li>
-       }
-     </ul>
-     <button type="button" (click)="setPriority('high')">
-       Mark high priority
-     </button>
-   `,
- })
- export class WorkspaceComponent {
-   readonly store = injectAgentStore("default");
-   readonly state = computed(
-     () => (this.store().state() as WorkspaceState | undefined) ?? EMPTY_STATE,
-   );
- 
-   protected setPriority(priority: WorkspaceState["priority"]): void {
-     const agent = this.store().agent;
-     const current = (agent.state as WorkspaceState | undefined) ?? EMPTY_STATE;
-     agent.setState({ ...current, priority });
-   }
- }
- ```
- 
- Read through `store().state()` so Angular tracks changes. Write through the
- plain AG-UI agent at `store().agent`. Replace the object instead of mutating it
- in place.
- 
- The same store gives you:
- 
- - `store().messages()` for the current conversation
- - `store().isRunning()` for loading controls
- - `store().agent` for `setState`, `addMessage`, `runAgent`, and `abortRun`
- 
- ## Send read-only application context
- 
- Use `connectAgentContext` for values such as the signed-in user's name,
- selected record, timezone, or current screen. Pass an accessor so signal reads
- stay reactive.
- 
- ```ts title="src/app/account-context.component.ts"
- import { Component, signal } from "@angular/core";
- import { connectAgentContext } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-account-context",
-   template: `
-     <button type="button" (click)="timezone.set('Europe/London')">
-       Use London time
-     </button>
-   `,
- })
- export class AccountContextComponent {
-   readonly userName = signal("Ada");
-   readonly timezone = signal("America/Los_Angeles");
- 
-   constructor() {
-     connectAgentContext(() => ({
-       description: "Current account and timezone",
-       value: JSON.stringify({
-         userName: this.userName(),
-         timezone: this.timezone(),
-       }),
-     }));
-   }
- }
- ```
- 
- The internal effect removes the old context and registers the new value when a
- read signal changes. It removes the final registration when the owning
- injector is destroyed. If you already have an `Injector`, pass it as
- `{ injector }`; that injector takes precedence over the ambient one.
- 
- ## Bind context in a template
- 
- Use `CopilotKitAgentContext` when the context is already shaped in the
- template.
- 
- ```ts title="src/app/selection-context.component.ts"
- import { Component, computed, signal } from "@angular/core";
- import { CopilotKitAgentContext } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-selection-context",
-   imports: [CopilotKitAgentContext],
-   template: `
-     <div [copilotkitAgentContext]="selectionContext()"></div>
-   `,
- })
- export class SelectionContextComponent {
-   readonly selectedId = signal("record-42");
-   readonly selectionContext = computed(() => ({
-     description: "The record selected in the application",
-     value: this.selectedId(),
-   }));
- }
- ```
- 
- Render the directive only after you have a complete context. If it starts
- without one, later input changes do not create the first registration.
- 
- ## Keep ownership clear
- 
- - Use shared state for data that the agent may change.
- - Use context for application-owned facts.
- - Keep durable user preferences in your own data store; publish only the part
-   the current agent needs.
- - Scope `injectAgentStore` to the same agent id as the chat or workflow that
-   reads the state.
- 
- ## Next steps
- 
- - [injectAgentStore API](/reference/angular/functions/injectAgentStore)
- - [connectAgentContext API](/reference/angular/functions/connectAgentContext)
- - [CopilotKitAgentContext API](/reference/angular/directives/CopilotKitAgentContext)
- - [Runnable state examples](/angular/agno/features#shared-state-read-write)
+ # Shared state and agent context
+ 
+ > Read and write agent state with Angular signals, and send application-owned context to the agent.
+ 
+ Shared state and agent context solve two different data flows.
+ 
+ | Data flow | Use |
+ | --- | --- |
+ | Agent and application both read and write the value | `injectAgentStore` and `agent.setState` |
+ | The application owns the value and the agent only reads it | `connectAgentContext` or `CopilotKitAgentContext` |
+ 
+ ## Read agent state
+ 
+ `injectAgentStore` returns a signal that resolves one agent. The store exposes
+ messages, state, and run status as nested signals.
+ 
+ ```ts title="src/app/workspace.component.ts"
+ import { Component, computed } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ type WorkspaceState = {
+   notes: string[];
+   priority: "low" | "normal" | "high";
+ };
+ 
+ const EMPTY_STATE: WorkspaceState = {
+   notes: [],
+   priority: "normal",
+ };
+ 
+ @Component({
+   selector: "app-workspace",
+   template: `
+     <p>Priority: {{ state().priority }}</p>
+     <ul>
+       @for (note of state().notes; track note) {
+         <li>{{ note }}</li>
+       }
+     </ul>
+     <button type="button" (click)="setPriority('high')">
+       Mark high priority
+     </button>
+   `,
+ })
+ export class WorkspaceComponent {
+   readonly store = injectAgentStore("default");
+   readonly state = computed(
+     () => (this.store().state() as WorkspaceState | undefined) ?? EMPTY_STATE,
+   );
+ 
+   protected setPriority(priority: WorkspaceState["priority"]): void {
+     const agent = this.store().agent;
+     const current = (agent.state as WorkspaceState | undefined) ?? EMPTY_STATE;
+     agent.setState({ ...current, priority });
+   }
+ }
+ ```
+ 
+ Read through `store().state()` so Angular tracks changes. Write through the
+ plain AG-UI agent at `store().agent`. Replace the object instead of mutating it
+ in place.
+ 
+ The same store gives you:
+ 
+ - `store().messages()` for the current conversation
+ - `store().isRunning()` for loading controls
+ - `store().agent` for `setState`, `addMessage`, `runAgent`, and `abortRun`
+ 
+ ## Send read-only application context
+ 
+ Use `connectAgentContext` for values such as the signed-in user's name,
+ selected record, timezone, or current screen. Pass an accessor so signal reads
+ stay reactive.
+ 
+ ```ts title="src/app/account-context.component.ts"
+ import { Component, signal } from "@angular/core";
+ import { connectAgentContext } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-account-context",
+   template: `
+     <button type="button" (click)="timezone.set('Europe/London')">
+       Use London time
+     </button>
+   `,
+ })
+ export class AccountContextComponent {
+   readonly userName = signal("Ada");
+   readonly timezone = signal("America/Los_Angeles");
+ 
+   constructor() {
+     connectAgentContext(() => ({
+       description: "Current account and timezone",
+       value: JSON.stringify({
+         userName: this.userName(),
+         timezone: this.timezone(),
+       }),
+     }));
+   }
+ }
+ ```
+ 
+ The internal effect removes the old context and registers the new value when a
+ read signal changes. It removes the final registration when the owning
+ injector is destroyed. If you already have an `Injector`, pass it as
+ `{ injector }`; that injector takes precedence over the ambient one.
+ 
+ ## Bind context in a template
+ 
+ Use `CopilotKitAgentContext` when the context is already shaped in the
+ template.
+ 
+ ```ts title="src/app/selection-context.component.ts"
+ import { Component, computed, signal } from "@angular/core";
+ import { CopilotKitAgentContext } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-selection-context",
+   imports: [CopilotKitAgentContext],
+   template: `
+     <div [copilotkitAgentContext]="selectionContext()"></div>
+   `,
+ })
+ export class SelectionContextComponent {
+   readonly selectedId = signal("record-42");
+   readonly selectionContext = computed(() => ({
+     description: "The record selected in the application",
+     value: this.selectedId(),
+   }));
+ }
+ ```
+ 
+ Render the directive only after you have a complete context. If it starts
+ without one, later input changes do not create the first registration.
+ 
+ ## Keep ownership clear
+ 
+ - Use shared state for data that the agent may change.
+ - Use context for application-owned facts.
+ - Keep durable user preferences in your own data store; publish only the part
+   the current agent needs.
+ - Scope `injectAgentStore` to the same agent id as the chat or workflow that
+   reads the state.
+ 
+ ## Next steps
+ 
+ - [injectAgentStore API](/reference/angular/functions/injectAgentStore)
+ - [connectAgentContext API](/reference/angular/functions/connectAgentContext)
+ - [CopilotKitAgentContext API](/reference/angular/directives/CopilotKitAgentContext)
+ - [Runnable state examples](/angular/agno/features#shared-state-read-write)
  
````

**High — Threads, memory, attachments, and headless UI**

`/angular/agno/guides/threads-memory-attachments-headless` · route `/threads`, `/memory`, `/attachments`, `/headless` · under “Next steps”

462 code lines, 140 prose lines changed.

````diff
- # Threads, memory, attachments, and headless UI
- 
- > Build persistent and multimodal Angular agent experiences, or own the complete UI with signal-based APIs.
- 
- `CopilotChat` covers the common conversation path. Use the lower-level Angular
- APIs when you need saved threads, user memory, file input, or a fully custom
- interface.
- 
- ## Resume a specific thread
- 
- Pass `threadId` to connect the chat to an existing conversation:
- 
- ```html
- <copilot-chat agentId="support" [threadId]="selectedThreadId()" />
- ```
- 
- For a custom thread list, use `injectThreads`. Its inputs accept plain values
- or signals.
- 
- ```ts title="src/app/thread-list.component.ts"
- import { Component } from "@angular/core";
- import { injectThreads } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-thread-list",
-   template: `
-     <button type="button" (click)="threads.startNewThread()">
-       New conversation
-     </button>
- 
-     @if (threads.isLoading()) {
-       <p>Loading conversations…</p>
-     } @else {
-       @for (thread of threads.threads(); track thread.id) {
-         <button type="button" (click)="select(thread.id)">
-           {{ thread.name ?? "Untitled conversation" }}
-         </button>
-       }
-     }
- 
-     @if (threads.listError()) {
-       <button type="button" (click)="threads.refetchThreads()">Retry</button>
-     }
-   `,
- })
- export class ThreadListComponent {
-   readonly threads = injectThreads({
-     agentId: "support",
-     limit: 20,
-   });
- 
-   protected select(threadId: string): void {
-     // Store this id and bind it to CopilotChat's threadId input.
-     console.log(threadId);
-   }
- }
- ```
- 
- The list is server-authoritative and uses realtime updates when the platform
- supplies a WebSocket URL. Rename, archive, unarchive, and delete return
- promises. Deletion is permanent; ask the user before calling `deleteThread`.
- 
- `CopilotThreadsDrawer` supplies a ready-made list, selection, filtering,
- pagination, and mutation controls. Put the drawer and chat under the same
- `provideCopilotChatConfiguration` provider so selection and new-thread actions
- update the chat. The drawer reads the platform's `threads` license feature and
- shows its locked state when that feature is unavailable.
- 
- ```ts
- import { Component } from "@angular/core";
- import {
-   CopilotChat,
-   CopilotThreadsDrawer,
-   provideCopilotChatConfiguration,
- } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-conversations",
-   imports: [CopilotChat, CopilotThreadsDrawer],
-   providers: [provideCopilotChatConfiguration({ agentId: "support" })],
-   template: `
-     <copilot-threads-drawer agentId="support" [limit]="20" />
-     <copilot-chat />
-   `,
- })
- export class ConversationsComponent {}
- ```
- 
- ## Read and manage memory
- 
- `injectMemories` exposes the current runtime-authenticated user's memory list.
- Check `isAvailable()` before showing memory controls because a runtime may not
- provide the memory routes.
- 
- ```ts title="src/app/memory-list.component.ts"
- import { Component } from "@angular/core";
- import { injectMemories } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-memory-list",
-   template: `
-     @if (!memory.isAvailable()) {
-       <p>Memory is not available for this runtime.</p>
-     } @else {
-       @for (item of memory.memories(); track item.id) {
-         <article>
-           <p>{{ item.content }}</p>
-           <button type="button" (click)="remove(item.id)">Forget</button>
-         </article>
-       }
-     }
-   `,
- })
- export class MemoryListComponent {
-   readonly memory = injectMemories();
- 
-   protected remove(id: string): void {
-     this.memory.removeMemory(id).catch(() => undefined);
-   }
- 
-   protected addPreference(): void {
-     this.memory
-       .addMemory({
-         kind: "operational",
-         content: "Prefer concise status updates.",
-       })
-       .catch(() => undefined);
-   }
- }
- ```
- 
- `updateMemory` supersedes a memory with a full replacement and returns a new
- record with a new id. Re-send `content`, `kind`, and any
- `sourceThreadIds` you want to keep.
- 
- ## Enable attachments
- 
- Pass an `AttachmentsConfig` to `CopilotChat`. The built-in input supports the
- file picker, drag and drop, and paste.
- 
- ```ts title="src/app/media-chat.component.ts"
- import { Component } from "@angular/core";
- import {
-   CopilotChat,
-   type AttachmentsConfig,
- } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-media-chat",
-   imports: [CopilotChat],
-   template: `
-     <copilot-chat [attachments]="attachments" />
-   `,
- })
- export class MediaChatComponent {
-   protected readonly attachments: AttachmentsConfig = {
-     enabled: true,
-     accept: "image/*,application/pdf",
-     maxSize: 10 * 1024 * 1024,
-     onUploadFailed: (error) => {
-       console.error(error.reason, error.message);
-     },
-   };
- }
- ```
- 
- Without `onUpload`, files are read as base64. Supply `onUpload` to place large
- files in your own storage and return a URL. The selected model and backend must
- support each content type you allow.
- 
- ## Build a headless chat
- 
- `injectAgentStore` gives you the state needed to render your own transcript and
- composer. Add the user message to the agent, then run that same agent through
- `CopilotKitCore`.
- 
- ```ts title="src/app/headless-chat.component.ts"
- import { Component, inject, signal } from "@angular/core";
- import { CopilotKit, injectAgentStore } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-headless-chat",
-   template: `
-     <div aria-live="polite">
-       @for (message of store().messages(); track message.id) {
-         <article [attr.data-role]="message.role">
-           {{ message.content }}
-         </article>
-       }
-       @if (store().isRunning()) {
-         <p>Agent is working…</p>
-       }
-     </div>
- 
-     <textarea
-       aria-label="Message"
-       [value]="draft()"
-       (input)="updateDraft($event)"
-     ></textarea>
-     <button
-       type="button"
-       [disabled]="store().isRunning() || !draft().trim()"
-       (click)="send()"
-     >
-       Send
-     </button>
-   `,
- })
- export class HeadlessChatComponent {
-   private readonly copilotKit = inject(CopilotKit);
-   readonly store = injectAgentStore("default");
-   readonly draft = signal("");
- 
-   protected updateDraft(event: Event): void {
-     this.draft.set((event.target as HTMLTextAreaElement).value);
-   }
- 
-   protected async send(): Promise<void> {
-     const content = this.draft().trim();
-     if (!content || this.store().isRunning()) return;
- 
-     const agent = this.store().agent;
-     agent.addMessage({
-       id: crypto.randomUUID(),
-       role: "user",
-       content,
-     });
-     this.draft.set("");
-     await this.copilotKit.core.runAgent({ agent });
-   }
- }
- ```
- 
- Add error handling around `runAgent` in production and disable repeated sends
- while `isRunning()` is true. The store tears down its agent subscription with
- the owning injector.
- 
- The runnable Showcase factors that flow into this signal-first controller:
- 
- ```typescript
- // features/headless/headless-chat.ts
- /** Signal-first controller shared by the two native Angular headless demos. */
- export abstract class HeadlessChatController {
-   private readonly copilotKit = inject(CopilotKit);
-   private readonly destroyRef = inject(DestroyRef);
-   protected readonly agentStore: ReturnType<typeof injectAgentStore>;
-   protected readonly inputValue = signal("");
-   protected readonly error = signal<string | null>(null);
-   protected readonly messages = computed(
-     () => this.agentStore().messages() as ShowcaseMessage[],
-   );
-   protected readonly isRunning = computed(() => this.agentStore().isRunning());
- 
-   protected constructor(feature: string) {
-     this.agentStore = injectAgentStore(agentIdForCurrentIntegration(feature));
-   }
- 
-   protected updateInput(event: Event): void {
-     this.inputValue.set((event.target as HTMLTextAreaElement).value);
-   }
- 
-   protected handleComposerKeydown(event: KeyboardEvent): void {
-     if (event.key !== "Enter" || event.shiftKey) return;
-     event.preventDefault();
-     void this.send();
-   }
- 
-   protected async send(override?: string): Promise<void> {
-     const text = (override ?? this.inputValue()).trim();
-     if (!text || this.isRunning()) return;
- 
-     this.error.set(null);
-     const agent = this.agentStore().agent;
-     const message = {
-       id: createMessageId(),
-       role: "user" as const,
-       content: text,
-     };
-     agent.addMessage(message);
-     this.inputValue.set("");
- 
-     try {
-       await this.copilotKit.core.runAgent({ agent });
-     } catch (error) {
-       if (this.destroyRef.destroyed) return;
-       console.error("[showcase-angular:headless] Agent run failed", error);
-       this.error.set(
-         error instanceof Error ? error.message : "The agent run failed.",
-       );
-     }
-   }
- }
- ```
- 
- ## Next steps
- 
- - [injectThreads API](/reference/angular/functions/injectThreads)
- - [injectAgentStore API](/reference/angular/functions/injectAgentStore)
- - [CopilotChat attachments input](/reference/angular/components/CopilotChat)
- - [Runnable headless example](/angular/agno/features#headless-simple)
- - [Runnable multimodal example](/angular/agno/features#multimodal)
+ # Threads, memory, attachments, and headless UI
+ 
+ > Build persistent and multimodal Angular agent experiences, or own the complete UI with signal-based APIs.
+ 
+ `CopilotChat` covers the common conversation path. Use the lower-level Angular
+ APIs when you need saved threads, user memory, file input, or a fully custom
+ interface.
+ 
+ ## Resume a specific thread
+ 
+ Pass `threadId` to connect the chat to an existing conversation:
+ 
+ ```html
+ <copilot-chat agentId="support" [threadId]="selectedThreadId()" />
+ ```
+ 
+ For a custom thread list, use `injectThreads`. Its inputs accept plain values
+ or signals.
+ 
+ ```ts title="src/app/thread-list.component.ts"
+ import { Component } from "@angular/core";
+ import { injectThreads } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-thread-list",
+   template: `
+     <button type="button" (click)="threads.startNewThread()">
+       New conversation
+     </button>
+ 
+     @if (threads.isLoading()) {
+       <p>Loading conversations…</p>
+     } @else {
+       @for (thread of threads.threads(); track thread.id) {
+         <button type="button" (click)="select(thread.id)">
+           {{ thread.name ?? "Untitled conversation" }}
+         </button>
+       }
+     }
+ 
+     @if (threads.listError()) {
+       <button type="button" (click)="threads.refetchThreads()">Retry</button>
+     }
+   `,
+ })
+ export class ThreadListComponent {
+   readonly threads = injectThreads({
+     agentId: "support",
+     limit: 20,
+   });
+ 
+   protected select(threadId: string): void {
+     // Store this id and bind it to CopilotChat's threadId input.
+     console.log(threadId);
+   }
+ }
+ ```
+ 
+ The list is server-authoritative and uses realtime updates when the platform
+ supplies a WebSocket URL. Rename, archive, unarchive, and delete return
+ promises. Deletion is permanent; ask the user before calling `deleteThread`.
+ 
+ `CopilotThreadsDrawer` supplies a ready-made list, selection, filtering,
+ pagination, and mutation controls. Put the drawer and chat under the same
+ `provideCopilotChatConfiguration` provider so selection and new-thread actions
+ update the chat. The drawer reads the platform's `threads` license feature and
+ shows its locked state when that feature is unavailable.
+ 
+ ```ts
+ import { Component } from "@angular/core";
+ import {
+   CopilotChat,
+   CopilotThreadsDrawer,
+   provideCopilotChatConfiguration,
+ } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-conversations",
+   imports: [CopilotChat, CopilotThreadsDrawer],
+   providers: [provideCopilotChatConfiguration({ agentId: "support" })],
+   template: `
+     <copilot-threads-drawer agentId="support" [limit]="20" />
+     <copilot-chat />
+   `,
+ })
+ export class ConversationsComponent {}
+ ```
+ 
+ ## Read and manage memory
+ 
+ `injectMemories` exposes the current runtime-authenticated user's memory list.
+ Check `isAvailable()` before showing memory controls because a runtime may not
+ provide the memory routes.
+ 
+ ```ts title="src/app/memory-list.component.ts"
+ import { Component } from "@angular/core";
+ import { injectMemories } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-memory-list",
+   template: `
+     @if (!memory.isAvailable()) {
+       <p>Memory is not available for this runtime.</p>
+     } @else {
+       @for (item of memory.memories(); track item.id) {
+         <article>
+           <p>{{ item.content }}</p>
+           <button type="button" (click)="remove(item.id)">Forget</button>
+         </article>
+       }
+     }
+   `,
+ })
+ export class MemoryListComponent {
+   readonly memory = injectMemories();
+ 
+   protected remove(id: string): void {
+     this.memory.removeMemory(id).catch(() => undefined);
+   }
+ 
+   protected addPreference(): void {
+     this.memory
+       .addMemory({
+         kind: "operational",
+         content: "Prefer concise status updates.",
+       })
+       .catch(() => undefined);
+   }
+ }
+ ```
+ 
+ `updateMemory` supersedes a memory with a full replacement and returns a new
+ record with a new id. Re-send `content`, `kind`, and any
+ `sourceThreadIds` you want to keep.
+ 
+ ## Enable attachments
+ 
+ Pass an `AttachmentsConfig` to `CopilotChat`. The built-in input supports the
+ file picker, drag and drop, and paste.
+ 
+ ```ts title="src/app/media-chat.component.ts"
+ import { Component } from "@angular/core";
+ import {
+   CopilotChat,
+   type AttachmentsConfig,
+ } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-media-chat",
+   imports: [CopilotChat],
+   template: `
+     <copilot-chat [attachments]="attachments" />
+   `,
+ })
+ export class MediaChatComponent {
+   protected readonly attachments: AttachmentsConfig = {
+     enabled: true,
+     accept: "image/*,application/pdf",
+     maxSize: 10 * 1024 * 1024,
+     onUploadFailed: (error) => {
+       console.error(error.reason, error.message);
+     },
+   };
+ }
+ ```
+ 
+ Without `onUpload`, files are read as base64. Supply `onUpload` to place large
+ files in your own storage and return a URL. The selected model and backend must
+ support each content type you allow.
+ 
+ ## Build a headless chat
+ 
+ `injectAgentStore` gives you the state needed to render your own transcript and
+ composer. Add the user message to the agent, then run that same agent through
+ `CopilotKitCore`.
+ 
+ ```ts title="src/app/headless-chat.component.ts"
+ import { Component, inject, signal } from "@angular/core";
+ import { CopilotKit, injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-headless-chat",
+   template: `
+     <div aria-live="polite">
+       @for (message of store().messages(); track message.id) {
+         <article [attr.data-role]="message.role">
+           {{ message.content }}
+         </article>
+       }
+       @if (store().isRunning()) {
+         <p>Agent is working…</p>
+       }
+     </div>
+ 
+     <textarea
+       aria-label="Message"
+       [value]="draft()"
+       (input)="updateDraft($event)"
+     ></textarea>
+     <button
+       type="button"
+       [disabled]="store().isRunning() || !draft().trim()"
+       (click)="send()"
+     >
+       Send
+     </button>
+   `,
+ })
+ export class HeadlessChatComponent {
+   private readonly copilotKit = inject(CopilotKit);
+   readonly store = injectAgentStore("default");
+   readonly draft = signal("");
+ 
+   protected updateDraft(event: Event): void {
+     this.draft.set((event.target as HTMLTextAreaElement).value);
+   }
+ 
+   protected async send(): Promise<void> {
+     const content = this.draft().trim();
+     if (!content || this.store().isRunning()) return;
+ 
+     const agent = this.store().agent;
+     agent.addMessage({
+       id: crypto.randomUUID(),
+       role: "user",
+       content,
+     });
+     this.draft.set("");
+     await this.copilotKit.core.runAgent({ agent });
+   }
+ }
+ ```
+ 
+ Add error handling around `runAgent` in production and disable repeated sends
+ while `isRunning()` is true. The store tears down its agent subscription with
+ the owning injector.
+ 
+ The runnable Showcase factors that flow into this signal-first controller:
+ 
+ ```typescript
+ // features/headless/headless-chat.ts
+ /** Signal-first controller shared by the two native Angular headless demos. */
+ export abstract class HeadlessChatController {
+   private readonly copilotKit = inject(CopilotKit);
+   private readonly destroyRef = inject(DestroyRef);
+   protected readonly agentStore: ReturnType<typeof injectAgentStore>;
+   protected readonly inputValue = signal("");
+   protected readonly error = signal<string | null>(null);
+   protected readonly messages = computed(
+     () => this.agentStore().messages() as ShowcaseMessage[],
+   );
+   protected readonly isRunning = computed(() => this.agentStore().isRunning());
+ 
+   protected constructor(feature: string) {
+     this.agentStore = injectAgentStore(agentIdForCurrentIntegration(feature));
+   }
+ 
+   protected updateInput(event: Event): void {
+     this.inputValue.set((event.target as HTMLTextAreaElement).value);
+   }
+ 
+   protected handleComposerKeydown(event: KeyboardEvent): void {
+     if (event.key !== "Enter" || event.shiftKey) return;
+     event.preventDefault();
+     void this.send();
+   }
+ 
+   protected async send(override?: string): Promise<void> {
+     const text = (override ?? this.inputValue()).trim();
+     if (!text || this.isRunning()) return;
+ 
+     this.error.set(null);
+     const agent = this.agentStore().agent;
+     const message = {
+       id: createMessageId(),
+       role: "user" as const,
+       content: text,
+     };
+     agent.addMessage(message);
+     this.inputValue.set("");
+ 
+     try {
+       await this.copilotKit.core.runAgent({ agent });
+     } catch (error) {
+       if (this.destroyRef.destroyed) return;
+       console.error("[showcase-angular:headless] Agent run failed", error);
+       this.error.set(
+         error instanceof Error ? error.message : "The agent run failed.",
+       );
+     }
+   }
+ }
+ ```
+ 
+ ## Next steps
+ 
+ - [injectThreads API](/reference/angular/functions/injectThreads)
+ - [injectAgentStore API](/reference/angular/functions/injectAgentStore)
+ - [CopilotChat attachments input](/reference/angular/components/CopilotChat)
+ - [Runnable headless example](/angular/agno/features#headless-simple)
+ - [Runnable multimodal example](/angular/agno/features#multimodal)
  
````

**High — Troubleshooting Angular apps**

`/angular/agno/guides/troubleshooting` · under “Continue through the shared stack”

68 code lines, 220 prose lines changed.

````diff
- # Troubleshooting Angular apps
- 
- > Diagnose Angular runtime connections, agent resolution, tools, threads, interrupts, SSR, and rendering failures.
- 
- Use this page for failures in the Angular application layer. Runtime and
- protocol diagnostics remain available in the shared troubleshooting pages, so
- you can investigate the complete request without switching frontend docs.
- 
- ## Start at the connection boundary
- 
- Confirm that the browser is calling the same Copilot Runtime URL your server
- actually exposes:
- 
- ```ts title="src/app/app.config.ts"
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "/api/copilotkit",
-     }),
-   ],
- };
- ```
- 
- Then inspect `GET {runtimeUrl}/info`. A healthy response lists the expected
- agent ids. If the request fails:
- 
- - verify the path, origin, proxy, and deployment base URL;
- - verify the runtime process is running and allows the Angular origin;
- - check authentication headers without logging their values;
- - try `127.0.0.1` when local `localhost` resolution is unreliable.
- 
- The [`CopilotKit` service](/reference/angular/services/CopilotKit) exposes
- `runtimeConnectionStatus`, `runtimeUrl`, and the resolved `agents` as signals.
- Use them in a temporary diagnostic component:
- 
- ```ts title="src/app/copilot-diagnostics.component.ts"
- import { Component, inject } from "@angular/core";
- import { CopilotKit } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-copilot-diagnostics",
-   standalone: true,
-   template: `
-     <p>Runtime: {{ copilotKit.runtimeConnectionStatus() }}</p>
-     <p>Agents: {{ agentIds().join(", ") || "none" }}</p>
-   `,
- })
- export class CopilotDiagnosticsComponent {
-   protected readonly copilotKit = inject(CopilotKit);
-   protected readonly agentIds = () =>
-     Object.keys(this.copilotKit.agents());
- }
- ```
- 
- Remove diagnostics that expose topology or identifiers before production.
- 
- ## Agent id does not resolve
- 
- `injectAgentStore("support")` and `<copilot-chat agentId="support" />` must use
- an id returned by the runtime or registered through `agents` or
- `selfManagedAgents`. After the runtime finishes connecting,
- `injectAgentStore` throws an error that includes the requested id and known
- agents when no match exists.
- 
- If you intend to use the default agent, either register an agent named
- `default` or pass the real id explicitly everywhere the chat, state, tools, or
- interrupt controller selects an agent.
- 
- ## A frontend tool is missing or never runs
- 
- Registrations are injector-scoped. Call `registerFrontendTool`,
- `registerRenderToolCall`, or `registerHumanInTheLoop` from a field initializer,
- constructor, provider factory, or another active injection context.
- 
- Check these in order:
- 
- 1. The component or service that registers the tool is instantiated.
- 2. Its injector has not been destroyed by route or conditional-view changes.
- 3. The registered `agentId` matches the chat's agent.
- 4. The tool description tells the model when it should call the tool.
- 5. The input schema accepts the arguments emitted by the agent.
- 6. The handler catches expected application failures and returns a deliberate
-    result instead of silently throwing.
- 
- For a source-backed registration, see
- [Frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui).
- 
- ## A thread list or mutation fails
- 
- Use `listError()` for user-visible thread-list and mutation failures. The
- broader `error()` signal can also contain developer configuration errors such
- as a missing runtime URL or unavailable thread endpoints.
- 
- Mutation methods return promises. Handle rejection and confirm before permanent
- deletion:
- 
- ```ts
- await threads.renameThread(threadId, nextName).catch((error) => {
-   console.error("Thread rename failed", error);
- });
- ```
- 
- See [`injectThreads`](/reference/angular/functions/injectThreads) for loading,
- pagination, realtime, and optimistic-mutation behavior.
- 
- ## An interrupt cannot resume
- 
- Read `injectInterrupt().error()` after a failed predicate, handler, or resume.
- Expired decisions use `InterruptExpiredError`. Resolve or cancel every pending
- interrupt id when the backend emits multiple simultaneous decisions.
- 
- The controller clears stale decisions when a thread changes or a new run
- starts. Do not cache it outside the injector that created it.
- 
- ## SSR, hydration, or zoneless problems
- 
- - Keep provider configuration and initial component inputs identical between
-   the server render and first browser render.
- - Do not start agent runs, resume interrupts, or access browser APIs during
-   server rendering.
- - Put application-owned DOM and media work behind an Angular platform guard or
-   `afterNextRender`.
- - Read CopilotKit signals from templates or computed signals so zoneless
-   change detection observes updates.
- 
- The complete contract is in
- [Angular production and lifecycle](/reference/angular/production-lifecycle).
- 
- ## Watch the live event stream
- 
- The [Inspector](/angular/agno/inspector) overlays the running application and reports the
- AG-UI event stream, the advertised agents, agent state, your registered tools,
- and the context you sent. It is a web component that an Angular application
- mounts itself; that page has the mount component and the production guard.
- 
- ## Continue through the shared stack
- 
- - [Common Copilot issues](/angular/agno/troubleshooting/common-issues)
- - [Runtime endpoints](/angular/agno/backend/runtime-endpoints)
- - [Runtime debug mode](/angular/agno/troubleshooting/debug-mode)
- - [AG-UI Event Inspector](/angular/agno/troubleshooting/event-inspector)
- - [Authentication](/angular/agno/auth)
+ # Troubleshooting Angular apps
+ 
+ > Diagnose Angular runtime connections, agent resolution, tools, threads, interrupts, SSR, and rendering failures.
+ 
+ Use this page for failures in the Angular application layer. Runtime and
+ protocol diagnostics remain available in the shared troubleshooting pages, so
+ you can investigate the complete request without switching frontend docs.
+ 
+ ## Start at the connection boundary
+ 
+ Confirm that the browser is calling the same Copilot Runtime URL your server
+ actually exposes:
+ 
+ ```ts title="src/app/app.config.ts"
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "/api/copilotkit",
+     }),
+   ],
+ };
+ ```
+ 
+ Then inspect `GET {runtimeUrl}/info`. A healthy response lists the expected
+ agent ids. If the request fails:
+ 
+ - verify the path, origin, proxy, and deployment base URL;
+ - verify the runtime process is running and allows the Angular origin;
+ - check authentication headers without logging their values;
+ - try `127.0.0.1` when local `localhost` resolution is unreliable.
+ 
+ The [`CopilotKit` service](/reference/angular/services/CopilotKit) exposes
+ `runtimeConnectionStatus`, `runtimeUrl`, and the resolved `agents` as signals.
+ Use them in a temporary diagnostic component:
+ 
+ ```ts title="src/app/copilot-diagnostics.component.ts"
+ import { Component, inject } from "@angular/core";
+ import { CopilotKit } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-copilot-diagnostics",
+   standalone: true,
+   template: `
+     <p>Runtime: {{ copilotKit.runtimeConnectionStatus() }}</p>
+     <p>Agents: {{ agentIds().join(", ") || "none" }}</p>
+   `,
+ })
+ export class CopilotDiagnosticsComponent {
+   protected readonly copilotKit = inject(CopilotKit);
+   protected readonly agentIds = () =>
+     Object.keys(this.copilotKit.agents());
+ }
+ ```
+ 
+ Remove diagnostics that expose topology or identifiers before production.
+ 
+ ## Agent id does not resolve
+ 
+ `injectAgentStore("support")` and `<copilot-chat agentId="support" />` must use
+ an id returned by the runtime or registered through `agents` or
+ `selfManagedAgents`. After the runtime finishes connecting,
+ `injectAgentStore` throws an error that includes the requested id and known
+ agents when no match exists.
+ 
+ If you intend to use the default agent, either register an agent named
+ `default` or pass the real id explicitly everywhere the chat, state, tools, or
+ interrupt controller selects an agent.
+ 
+ ## A frontend tool is missing or never runs
+ 
+ Registrations are injector-scoped. Call `registerFrontendTool`,
+ `registerRenderToolCall`, or `registerHumanInTheLoop` from a field initializer,
+ constructor, provider factory, or another active injection context.
+ 
+ Check these in order:
+ 
+ 1. The component or service that registers the tool is instantiated.
+ 2. Its injector has not been destroyed by route or conditional-view changes.
+ 3. The registered `agentId` matches the chat's agent.
+ 4. The tool description tells the model when it should call the tool.
+ 5. The input schema accepts the arguments emitted by the agent.
+ 6. The handler catches expected application failures and returns a deliberate
+    result instead of silently throwing.
+ 
+ For a source-backed registration, see
+ [Frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui).
+ 
+ ## A thread list or mutation fails
+ 
+ Use `listError()` for user-visible thread-list and mutation failures. The
+ broader `error()` signal can also contain developer configuration errors such
+ as a missing runtime URL or unavailable thread endpoints.
+ 
+ Mutation methods return promises. Handle rejection and confirm before permanent
+ deletion:
+ 
+ ```ts
+ await threads.renameThread(threadId, nextName).catch((error) => {
+   console.error("Thread rename failed", error);
+ });
+ ```
+ 
+ See [`injectThreads`](/reference/angular/functions/injectThreads) for loading,
+ pagination, realtime, and optimistic-mutation behavior.
+ 
+ ## An interrupt cannot resume
+ 
+ Read `injectInterrupt().error()` after a failed predicate, handler, or resume.
+ Expired decisions use `InterruptExpiredError`. Resolve or cancel every pending
+ interrupt id when the backend emits multiple simultaneous decisions.
+ 
+ The controller clears stale decisions when a thread changes or a new run
+ starts. Do not cache it outside the injector that created it.
+ 
+ ## SSR, hydration, or zoneless problems
+ 
+ - Keep provider configuration and initial component inputs identical between
+   the server render and first browser render.
+ - Do not start agent runs, resume interrupts, or access browser APIs during
+   server rendering.
+ - Put application-owned DOM and media work behind an Angular platform guard or
+   `afterNextRender`.
+ - Read CopilotKit signals from templates or computed signals so zoneless
+   change detection observes updates.
+ 
+ The complete contract is in
+ [Angular production and lifecycle](/reference/angular/production-lifecycle).
+ 
+ ## Watch the live event stream
+ 
+ The [Inspector](/angular/agno/inspector) overlays the running application and reports the
+ AG-UI event stream, the advertised agents, agent state, your registered tools,
+ and the context you sent. It is a web component that an Angular application
+ mounts itself; that page has the mount component and the production guard.
+ 
+ ## Continue through the shared stack
+ 
+ - [Common Copilot issues](/angular/agno/troubleshooting/common-issues)
+ - [Runtime endpoints](/angular/agno/backend/runtime-endpoints)
+ - [Runtime debug mode](/angular/agno/troubleshooting/debug-mode)
+ - [AG-UI Event Inspector](/angular/agno/troubleshooting/event-inspector)
+ - [Authentication](/angular/agno/auth)
  
````

**High — CopilotKit CLI**

`/angular/agno/cli` · under “Next steps”

14 code lines, 358 prose lines changed.

````diff
- # CopilotKit CLI
- 
- > Use the CopilotKit CLI to create apps, sign in to Cloud-Hosted Enterprise Intelligence, select projects, provision runtime API keys, import historical conversations, and install agent skills.
- 
- 
- 
- ## What is this?
- 
- The CopilotKit CLI helps you create CopilotKit apps connected to Enterprise Intelligence, whether cloud-hosted or self-hosted. It handles browser sign-in, project selection, project-scoped runtime API keys, historical thread import, and local project configuration so your app can use durable threads and conversation history.
- 
- Use the CLI when you want to start a new app, import historical ADK or LangGraph conversations, or install CopilotKit agent skills for your coding agent.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start managed Intelligence onboarding"
-   body="Sign up or sign in, finish organization onboarding when required, then return to the CLI to select a project and connect your app."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_cli_intro_signup"
- />
- 
- ## Prerequisites
- 
- - Node.js 20+
- - A CopilotKit account for Cloud-Hosted Enterprise Intelligence
- - An OpenAI API key or another model provider key for the starter app you choose
- 
- <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
-   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
- </Callout>
- 
- ## Start a new app
- 
- <Callout type="info" title="Creating vs. adding to an existing app">
-   `create` (aliased as `init`) scaffolds a brand-new project in its own directory — it prompts for an app name and does not detect or bootstrap an app you already have. To add CopilotKit to an existing app, follow the manual installation in the [Quickstart](/angular/agno/quickstart) instead.
- </Callout>
- 
- <Steps>
-   <Step>
-     ### Run create
- 
-     ```bash title="Terminal"
-     npx copilotkit@latest create
-     ```
- 
-     The CLI prompts for the app name and framework, opens browser sign-in when needed, scaffolds the starter, and connects the app to a cloud-hosted Enterprise Intelligence project.
-   </Step>
- 
-   <Step>
-     ### Sign up or sign in
- 
-     If you are not already signed in, the CLI opens a browser login flow. During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
- 
-     If the browser does not open, the CLI prints a login URL and supports a manual paste fallback.
-   </Step>
- 
-   <Step>
-     ### Select or create an organization
- 
-     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
-   </Step>
- 
-   <Step>
-     ### Return to the terminal
- 
-     After organization onboarding, return to the terminal. The original CLI command resumes and prompts you to select or create a project.
-   </Step>
- 
-   <Step>
-     ### Select or create a project
- 
-     Choose an existing cloud-hosted project or create a new one. A project is where your app's threads, messages, and platform metadata are stored.
- 
-     The CLI writes the selected project to `.copilotkit/project.json`:
- 
-     ```json title=".copilotkit/project.json"
-     {
-       "projectId": "proj_...",
-       "projectSlug": "support-assistant",
-       "clerkOrgId": "org_..."
-     }
-     ```
-   </Step>
- 
-   <Step>
-     ### Use the generated environment
- 
-     The CLI writes the hosted platform URLs and project-scoped runtime API key to `.env`.
- 
-     ```bash title=".env"
-     INTELLIGENCE_API_URL=https://...
-     INTELLIGENCE_GATEWAY_WS_URL=wss://...
-     INTELLIGENCE_API_KEY=cpk_...
-     ```
- 
-     Keep `INTELLIGENCE_API_KEY` on the server side. It is a runtime key for the selected project, not a frontend token.
-   </Step>
- 
-   <Step>
-     ### Start development
- 
-     ```bash title="Terminal"
-     npm run dev
-     ```
- 
-     The starter runs your local app and runtime while storing durable threads in the cloud-hosted project selected by the CLI.
-   </Step>
- </Steps>
- 
- ## Import and synchronize historical conversations
- 
- Use `import` from a CopilotKit app created with the CLI and Enterprise Intelligence enabled. The importer targets the Enterprise Intelligence project already selected for the current directory.
- 
- <Tabs groupId="cli-import-source" items={["ADK", "LangGraph"]}>
-   <Tab value="ADK">
- 
-     ```bash
-     npx copilotkit@latest import --source adk --dry-run
-     ```
- 
-   </Tab>
-   <Tab value="LangGraph">
- 
-     ```bash
-     npx copilotkit@latest import --source langgraph --dry-run
-     ```
- 
-   </Tab>
- </Tabs>
- 
- The command runs interactively by default. Start with `--dry-run` to discover source agent keys, conversation counts, skips, and the estimated upload size without opening an import batch.
- 
- If you need to import into a different project, select it before continuing with the real import:
- 
- ```bash title="Terminal"
- npx copilotkit@latest project select
- ```
- 
- This changes the project selected for the current directory and writes its project-scoped runtime key to the starter's generated `.env`.
- 
- Before the real import, export the destination values from that `.env`:
- 
- ```bash title="Terminal"
- export INTELLIGENCE_API_URL="https://..."
- export INTELLIGENCE_API_KEY="cpk_..."
- ```
- 
- The importer reads `--api-url` and `--api-key` or the current process environment. It does not load `.env` or `.copilotkit/project.json` automatically. `COPILOTKIT_API_KEY` is also accepted for the key.
- 
- Project selection updates the app configuration; the importer still receives its destination through flags or exported environment variables.
- 
- For the full adoption flow, see [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless). Source-specific setup lives in [Synchronize ADK threads](/angular/google-adk/threads-import) and [Synchronize LangGraph threads](/angular/langgraph-python/threads-import).
- 
- ## Auth commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest login` | Opens the browser sign-in flow and stores a local CLI session. |
- | `npx copilotkit@latest whoami` | Shows the signed-in user and active organization. |
- | `npx copilotkit@latest logout` | Clears the local CLI session. |
- 
- ## Project commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest project select` | Selects or creates a cloud-hosted Enterprise Intelligence project for the current directory. |
- | `npx copilotkit@latest import --source adk --dry-run` | Previews historical Google ADK conversation threads before import. |
- | `npx copilotkit@latest import --source langgraph --dry-run` | Previews historical LangGraph conversation threads before import. |
- | `npx copilotkit@latest license create` | Issues a CopilotKit license token for flows that require one. |
- | `npx copilotkit@latest license list` | Lists license metadata for the current user or organization. |
- 
- Re-running `project select` is safe when you need to move a CLI-created app to a different cloud-hosted project. The command updates `.copilotkit/project.json` and provisions a project-scoped API key for the selected project.
- 
- ## Skills commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest skills install` | Installs CopilotKit agent skills for supported coding agents. |
- | `npx copilotkit@latest skills onboard` | Installs skills, then starts agent-assisted onboarding for an existing app. |
- 
- ## Next steps
- 
- - **Cloud-hosted platform:** [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plans in the hosted web app
- - **Add threads:** use the [Threads Drawer](/angular/agno/guides/threads-memory-attachments-headless) for a drop-in thread switcher, or [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) to build your own thread UI
- - **Synchronize thread history:** [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless) — import existing ADK or LangGraph conversations and keep future CopilotKit runs synchronized
- - **Self-hosting:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — run the Enterprise Intelligence Platform in your own Kubernetes cluster
+ # CopilotKit CLI
+ 
+ > Use the CopilotKit CLI to create apps, sign in to cloud-hosted CopilotKit Intelligence, select projects, provision runtime API keys, import historical conversations, and install agent skills.
+ 
+ 
+ 
+ ## What is this?
+ 
+ The CopilotKit CLI helps you create CopilotKit apps connected to CopilotKit Intelligence, whether cloud-hosted or self-hosted. It handles browser sign-in, project selection, project-scoped runtime API keys, historical thread import, and local project configuration so your app can use durable threads and conversation history.
+ 
+ Use the CLI when you want to start a new app, import historical ADK or LangGraph conversations, or install CopilotKit agent skills for your coding agent.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start managed Intelligence onboarding"
+   body="Sign up or sign in, finish organization onboarding when required, then return to the CLI to select a project and connect your app."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_cli_intro_signup"
+ />
+ 
+ ## Prerequisites
+ 
+ - Node.js 20+
+ - A CopilotKit account for cloud-hosted CopilotKit Intelligence
+ - An OpenAI API key or another model provider key for the starter app you choose
+ 
+ <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
+   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
+ </Callout>
+ 
+ ## Start a new app
+ 
+ <Callout type="info" title="Creating vs. adding to an existing app">
+   `create` (aliased as `init`) scaffolds a brand-new project in its own directory — it prompts for an app name and does not detect or bootstrap an app you already have. To add CopilotKit to an existing app, follow the manual installation in the [Quickstart](/angular/agno/quickstart) instead.
+ </Callout>
+ 
+ <Steps>
+   <Step>
+     ### Run create
+ 
+     ```bash title="Terminal"
+     npx copilotkit@latest create
+     ```
+ 
+     The CLI prompts for the app name and framework, opens browser sign-in when needed, scaffolds the starter, and connects the app to a cloud-hosted CopilotKit Intelligence project.
+   </Step>
+ 
+   <Step>
+     ### Sign up or sign in
+ 
+     If you are not already signed in, the CLI opens a browser login flow. During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
+ 
+     If the browser does not open, the CLI prints a login URL and supports a manual paste fallback.
+   </Step>
+ 
+   <Step>
+     ### Select or create an organization
+ 
+     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
+   </Step>
+ 
+   <Step>
+     ### Return to the terminal
+ 
+     After organization onboarding, return to the terminal. The original CLI command resumes and prompts you to select or create a project.
+   </Step>
+ 
+   <Step>
+     ### Select or create a project
+ 
+     Choose an existing cloud-hosted project or create a new one. A project is where your app's threads, messages, and platform metadata are stored.
+ 
+     The CLI writes the selected project to `.copilotkit/project.json`:
+ 
+     ```json title=".copilotkit/project.json"
+     {
+       "projectId": "proj_...",
+       "projectSlug": "support-assistant",
+       "clerkOrgId": "org_..."
+     }
+     ```
+   </Step>
+ 
+   <Step>
+     ### Use the generated environment
+ 
+     The CLI writes the hosted platform URLs and project-scoped runtime API key to `.env`.
+ 
+     ```bash title=".env"
+     INTELLIGENCE_API_URL=https://...
+     INTELLIGENCE_GATEWAY_WS_URL=wss://...
+     INTELLIGENCE_API_KEY=cpk_...
+     ```
+ 
+     Keep `INTELLIGENCE_API_KEY` on the server side. It is a runtime key for the selected project, not a frontend token.
+   </Step>
+ 
+   <Step>
+     ### Start development
+ 
+     ```bash title="Terminal"
+     npm run dev
+     ```
+ 
+     The starter runs your local app and runtime while storing durable threads in the cloud-hosted project selected by the CLI.
+   </Step>
+ </Steps>
+ 
+ ## Import and synchronize historical conversations
+ 
+ Use `import` from a CopilotKit app created with the CLI and CopilotKit Intelligence enabled. The importer targets the CopilotKit Intelligence project already selected for the current directory.
+ 
+ <Tabs groupId="cli-import-source" items={["ADK", "LangGraph"]}>
+   <Tab value="ADK">
+ 
+     ```bash
+     npx copilotkit@latest import --source adk --dry-run
+     ```
+ 
+   </Tab>
+   <Tab value="LangGraph">
+ 
+     ```bash
+     npx copilotkit@latest import --source langgraph --dry-run
+     ```
+ 
+   </Tab>
+ </Tabs>
+ 
+ The command runs interactively by default. Start with `--dry-run` to discover source agent keys, conversation counts, skips, and the estimated upload size without opening an import batch.
+ 
+ If you need to import into a different project, select it before continuing with the real import:
+ 
+ ```bash title="Terminal"
+ npx copilotkit@latest project select
+ ```
+ 
+ This changes the project selected for the current directory and writes its project-scoped runtime key to the starter's generated `.env`.
+ 
+ Before the real import, export the destination values from that `.env`:
+ 
+ ```bash title="Terminal"
+ export INTELLIGENCE_API_URL="https://..."
+ export INTELLIGENCE_API_KEY="cpk_..."
+ ```
+ 
+ The importer reads `--api-url` and `--api-key` or the current process environment. It does not load `.env` or `.copilotkit/project.json` automatically. `COPILOTKIT_API_KEY` is also accepted for the key.
+ 
+ Project selection updates the app configuration; the importer still receives its destination through flags or exported environment variables.
+ 
+ For the full adoption flow, see [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless). Source-specific setup lives in [Synchronize ADK threads](/angular/google-adk/threads-import) and [Synchronize LangGraph threads](/angular/langgraph-python/threads-import).
+ 
+ ## Auth commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest login` | Opens the browser sign-in flow and stores a local CLI session. |
+ | `npx copilotkit@latest whoami` | Shows the signed-in user and active organization. |
+ | `npx copilotkit@latest logout` | Clears the local CLI session. |
+ 
+ ## Project commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest project select` | Selects or creates a cloud-hosted CopilotKit Intelligence project for the current directory. |
+ | `npx copilotkit@latest import --source adk --dry-run` | Previews historical Google ADK conversation threads before import. |
+ | `npx copilotkit@latest import --source langgraph --dry-run` | Previews historical LangGraph conversation threads before import. |
+ | `npx copilotkit@latest license create` | Issues a CopilotKit license token for flows that require one. |
+ | `npx copilotkit@latest license list` | Lists license metadata for the current user or organization. |
+ 
+ Re-running `project select` is safe when you need to move a CLI-created app to a different cloud-hosted project. The command updates `.copilotkit/project.json` and provisions a project-scoped API key for the selected project.
+ 
+ ## Skills commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest skills install` | Installs CopilotKit agent skills for supported coding agents. |
+ | `npx copilotkit@latest skills onboard` | Installs skills, then starts agent-assisted onboarding for an existing app. |
+ 
+ ## Next steps
+ 
+ - **Cloud-hosted platform:** [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plans in the hosted web app
+ - **Add threads:** use the [Threads Drawer](/angular/agno/guides/threads-memory-attachments-headless) for a drop-in thread switcher, or [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) to build your own thread UI
+ - **Synchronize thread history:** [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless) — import existing ADK or LangGraph conversations and keep future CopilotKit runs synchronized
+ - **Self-hosting:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — run CopilotKit Intelligence in your own Kubernetes cluster
  
````

**Medium — Build with agents**

`/angular/agno/build-with-agents` · under “Common Configuration Patterns”

0 code lines, 1134 prose lines changed.

````diff
- # Build with agents
- 
- > Give your AI coding agent up-to-date knowledge of CopilotKit's APIs, patterns, and best practices.
- AI coding agents may not have up-to-date knowledge of CopilotKit's APIs, patterns, and best practices. The resources on this page give them accurate, current knowledge directly in their context.
- 
- ## CopilotKit Skills
- 
- Skills are folders of instructions, references, and scripts that coding agents can discover and use to work with CopilotKit accurately. Installing them gives your agent authoritative guidance on setup, development, debugging, integration, and upgrades — without relying on potentially outdated training data.
- 
- <Callout type="info">
-   Skills are the recommended way to give your agent CopilotKit knowledge. They work natively in Claude Code, Cursor, Codex, Gemini CLI, and any tool supporting the [agentskills.io](https://agentskills.io) standard.
- </Callout>
- 
- Most of these skills help you **build with** CopilotKit. If you're just getting started, these three cover the most common tasks:
- 
- | Skill | Use it to |
- | --- | --- |
- | `copilotkit-setup` | Add CopilotKit to a project and get a chat working |
- | `copilotkit-develop` | Build AI features — chat UI, frontend tools, and shared agent context |
- | `copilotkit-integrations` | Connect an agent framework (LangGraph, CrewAI, Mastra, and more) |
- 
- The full [skills directory](https://github.com/CopilotKit/CopilotKit/tree/main/skills) adds more for specific tasks — like `copilotkit-debug` and `copilotkit-upgrade` — plus `copilotkit-contribute`, which is for working on the CopilotKit project itself rather than building with it. You don't need to memorize the list; your agent discovers the installed skills and picks the right one for each task.
- 
- <Steps>
-   <Step>
-     ### Install the skills
- 
-     Run this from the root of the project you're building in:
- 
-     ```bash
-     npx skills add CopilotKit/CopilotKit/skills -y
-     ```
- 
-     This installs the skills into your project, where any coding agent working there (Claude Code, Codex, Cursor, or Gemini CLI) discovers them automatically. There's no per-agent configuration to do.
- 
-     <Callout type="info">
-       Want to choose what gets installed? Run `npx skills add CopilotKit/CopilotKit/skills` without `-y` to pick specific skills, target agents, and scope interactively — or add `-g` to install globally for every project.
-     </Callout>
- 
-   </Step>
-   <Step>
-     ### Start building
- 
-     Open a new agent session and use a starter prompt to put the skills to work:
- 
-     ```
-     Help me build a CopilotKit app. Use the copilotkit-setup skill to get started.
-     ```
- 
-     Your agent will discover the installed skills and use the right one for each task — setup, development, debugging, or integration.
-   </Step>
- </Steps>
- 
- ## MCP Docs Server
- 
- The CopilotKit MCP server equips AI coding agents with deep knowledge about CopilotKit's APIs, patterns, and best practices. When connected to your
- development environment, it enables AI assistants to:
- 
- - Provide expert guidance
- - Generate accurate code
- - Give your AI agents a user interface
- - Help you implement CopilotKit features correctly
- 
- ### Cursor
- 
- [Cursor](https://cursor.sh/) is an AI-powered code editor built for productivity. It features built-in AI assistance and supports MCP for extending AI capabilities with external tools.
- 
- <Steps>
-   <Step>
-     ### Open MCP Settings in Cursor
-     1. Press `Shift+Command+J` (Mac) or `Shift+Ctrl+J` (Windows/Linux) to open Cursor's settings.
-     2. Look for "MCP Tools" in the left sidebar categories.
-     3. Click "Add Custom MCP".
-     This will open the mcp.json file in the editor, which you need to edit.
-   </Step>
-   <Step>
-     ### Add MCP Server to Cursor
-     Copy CopilotKit MCP's configuration and paste it under the mcpServers key in the mcp.json file.
- 
-     <Tabs groupId="transport" items={['HTTP', 'SSE']} default="HTTP">
-       <Tab value="HTTP">
-         ```json
-         {
-           "mcpServers": {
-             "CopilotKit MCP": {
-               "command": "npx",
-               "args": [
-                 "mcp-remote",
-                 "https://mcp.copilotkit.ai"
-               ]
-             }
-           }
-         }
-         ```
-       </Tab>
-       <Tab value="SSE">
-         ```json
-         {
-           "mcpServers": {
-             "CopilotKit MCP": {
-               "url": "https://mcp.copilotkit.ai/sse"
-             }
-           }
-         }
-         ```
-       </Tab>
-     </Tabs>
- 
-   </Step>
- </Steps>
- 
- ### Claude Web
- 
- [Claude](https://claude.ai/) is Anthropic's AI assistant accessible through a web interface. It supports MCP integrations, called Connectors, to connect with external tools and services.
- 
- <Steps>
-   <Step>
-     Navigate to the [Connectors](https://claude.ai/settings/connectors) settings
-     page in Claude. 1. Click on your user in the bottom left of the chat box and
-     then select "Settings" from the menu options that appear. 2. In the menu
-     along the left side of the Settings page, select "Connectors"
-   </Step>
-   <Step>Click "Add custom connector"</Step>
-   <Step>
-     1. In the Name field, enter a memorable name for the CopilotKit connector,
-     like `CopilotKit` 2. In the URL field, enter the following: ```
-     https://mcp.copilotkit.ai/sse ```
-   </Step>
-   <Step>Click "Add"</Step>
- </Steps>
- 
- ### Claude Desktop
- 
- [Claude Desktop](https://claude.ai/download) is the desktop application version of Claude, offering the same AI capabilities with local system integration and MCP support.
- 
- <div className="-mt-2 text-sm text-muted-foreground">
-   These steps are the same as those for Claude Web, above. The only difference
-   is that the Connectors link below navigates to the Connectors settings in the
-   Claude desktop app, instead of the Claude web app.
- </div>
- 
- <Steps>
-   <Step>
-     Navigate to the [Connectors](claude://claude.ai/settings/connectors)
-     settings page in Claude. 1. Click on your user in the bottom left of the
-     chat box and then select "Settings" from the menu options that appear. 2. In
-     the menu along the left side of the Settings page, select "Connectors"
-   </Step>
-   <Step>Click "Add custom connector"</Step>
-   <Step>
-     1. In the Name field, enter a memorable name for the CopilotKit connector,
-     like `CopilotKit` 2. In the URL field, enter the following: ```
-     https://mcp.copilotkit.ai/sse ```
-   </Step>
-   <Step>Click "Add"</Step>
- </Steps>
- 
- ### Claude Code
- 
- [Claude Code](https://docs.claude.com/en/docs/claude-code) is Anthropic's official CLI for Claude. It supports MCP integrations to connect with external tools and services, enhancing AI capabilities with specialized knowledge.
- 
- <Steps>
-   <Step>
-     ### Add MCP Server to Claude Code
-     Use the Claude Code CLI to add the CopilotKit MCP server:
- 
-     ```bash
-     claude mcp add --transport sse copilotkit-mcp https://mcp.copilotkit.ai/sse
-     ```
- 
-     **Expected Output:**
-     ```
-     Added SSE MCP server copilotkit-mcp with URL: https://mcp.copilotkit.ai/sse to local config
-     File modified: /home/[username]/.claude.json [project: /path/to/your/project]
-     ```
- 
-   </Step>
-   <Step>
-     ### Verify Connection
-     Check that the server is properly connected:
- 
-     ```bash
-     claude mcp list
-     ```
- 
-     **Expected Output:**
-     ```
-     Checking MCP server health...
- 
-     copilotkit-mcp: https://mcp.copilotkit.ai/sse (SSE) - ✓ Connected
-     ```
- 
-     <div className="mt-4 p-4 rounded-lg bg-muted">
-       <div className="font-medium text-sm mb-2">💡 Server Name Requirements</div>
-       <div className="text-sm text-muted-foreground">
-         Server names can only contain letters, numbers, hyphens, and underscores. Avoid spaces in server names.
-       </div>
-     </div>
- 
-   </Step>
-   <Step>
-     ### Using MCP Tools in Claude Code
-     Once configured, the CopilotKit MCP server tools are automatically available when you interact with Claude Code for CopilotKit-related development tasks. The AI will intelligently use these tools when relevant to your queries.
- 
-     **What the MCP Server Provides:**
-     - Expert guidance for CopilotKit development
-     - Accurate code generation for CopilotKit features
-     - Best practices and implementation patterns
-     - Deep understanding of CopilotKit APIs
- 
-     **Management Commands:**
-     ```bash
-     # View server details
-     claude mcp get copilotkit-mcp
- 
-     # Remove server if needed
-     claude mcp remove copilotkit-mcp -s local
-     ```
- 
-   </Step>
- </Steps>
- 
- ### Windsurf
- 
- [Windsurf](https://codeium.com/windsurf) is Codeium's agentic IDE that combines AI-powered coding assistance with traditional development tools. It features the Cascade AI assistant with MCP integration.
- 
- <Steps>
-   <Step>
-     ### Access Windsurf MCP Settings
-     1. Open Windsurf Settings (click the settings button in the bottom right)
-     2. Navigate to the "Cascade" section
-     3. Look for "Model Context Protocol" or "MCP" settings
-     4. Enable MCP support if not already enabled
-   </Step>
-   <Step>
-     ### Add MCP Server to Windsurf
-     You can add CopilotKit MCP in several ways:
- 
-     <Tabs groupId="windsurf-setup" items={['Using the Built-in Server Browser', 'Manual Configuration']} default="Using the Built-in Server Browser">
-       <Tab value="Using the Built-in Server Browser">
-         1. In the Cascade section, click "Add Server"
-         2. Select "Add custom server"
-         3. Choose the transport type:
-            - **SSE/HTTP** for remote servers
-            - **stdio** for local command-based servers
-       </Tab>
-       <Tab value="Manual Configuration">
-         Add the server configuration to your mcp_config.json file:
- 
-         <Tabs groupId="windsurf-transport" items={['HTTP Transport', 'SSE Transport', 'stdio Transport (Local)']} default="HTTP Transport">
-           <Tab value="HTTP Transport">
-             ```json
-             {
-               "mcpServers": {
-                 "CopilotKit MCP": {
-                   "url": "https://mcp.copilotkit.ai",
-                   "disabled": false,
-                   "timeout": 30
-                 }
-               }
-             }
-             ```
-           </Tab>
-           <Tab value="SSE Transport">
-             ```json
-             {
-               "mcpServers": {
-                 "CopilotKit MCP": {
-                   "url": "https://mcp.copilotkit.ai/sse",
-                   "disabled": false,
-                   "timeout": 30
-                 }
-               }
-             }
-             ```
-           </Tab>
-           <Tab value="stdio Transport (Local)">
-             ```json
-             {
-               "mcpServers": {
-                 "CopilotKit MCP": {
-                   "command": "npx",
-                   "args": ["mcp-remote", "https://mcp.copilotkit.ai"]
-                 }
-               }
-             }
-             ```
-           </Tab>
-         </Tabs>
-       </Tab>
-     </Tabs>
- 
-   </Step>
-   <Step>
-     ### Configuration File Location
-     The MCP configuration is typically stored at:
- 
-     <Tabs groupId="windsurf-os" items={['macOS', 'Windows', 'Linux']} default="macOS">
-       <Tab value="macOS">
-         ```
-         ~/.codeium/windsurf/mcp_config.json
-         ```
-       </Tab>
-       <Tab value="Windows">
-         ```
-         %APPDATA%\.codeium\windsurf\mcp_config.json
-         ```
-       </Tab>
-       <Tab value="Linux">
-         ```
-         ~/.config/codeium/windsurf/mcp_config.json
-         ```
-       </Tab>
-     </Tabs>
- 
-   </Step>
-   <Step>
-     ### Using MCP Tools in Windsurf
-     Once configured, CopilotKit MCP tools will be available in Windsurf's Cascade AI assistant:
- 
-     - Open the Cascade panel (AI chat interface)
-     - The MCP tools are automatically available to the AI
-     - You can reference specific tools using `@CopilotKit MCP` in your conversations
-     - Windsurf will intelligently choose which tools to use based on your requests
- 
-     ### Managing Your MCP Servers
-     In the Windsurf MCP settings, you can:
-     - Enable/Disable individual servers
-     - View server status and connection health
-     - Configure tool permissions and auto-approval settings
-     - Monitor server logs for debugging
-     - Restart servers if they become unresponsive
- 
-     The AI will seamlessly integrate CopilotKit MCP functionality into your development workflow!
- 
-   </Step>
- </Steps>
- 
- ### Cline
- 
- [Cline](https://github.com/cline/cline) is a VS Code extension that provides autonomous AI coding assistance. It can perform complex tasks using MCP tools to interact with external systems.
- 
- <Steps>
-   <Step>
-     ### Open Cline MCP Settings
-     1. Open the Cline extension panel in VS Code
-     2. Click the menu (⋮) in the top right corner of the Cline panel
-     3. Select "MCP Servers" from the dropdown menu
-     
-     This will open the MCP Servers interface where you can manage your server connections.
-   </Step>
-   <Step>
-     ### Add MCP Server to Cline
-     In the MCP Servers interface, you have three main options:
- 
-     <Tabs groupId="cline-setup" items={['Remote Server Setup', 'Configuration File Setup']} default="Remote Server Setup">
-       <Tab value="Remote Server Setup">
-         1. Click on the "Remote Servers" tab
-         2. Enter a Server Name (e.g., "CopilotKit MCP")
-         3. Enter the Server URL:
-         ```
-         https://mcp.copilotkit.ai/sse
-         ```
-         4. Click "Add Server" to connect
-       </Tab>
-       <Tab value="Configuration File Setup">
-         Alternatively, you can configure via the advanced settings:
-         1. In the "Installed" tab, click "Configure MCP Servers"
-         2. Add the following configuration to your settings file:
-         ```json
-         {
-           "mcpServers": {
-             "CopilotKit MCP": {
-               "url": "https://mcp.copilotkit.ai/sse",
-               "disabled": false,
-               "timeout": 30
-             }
-           }
-         }
-         ```
-       </Tab>
-     </Tabs>
- 
-   </Step>
-   <Step>
-     ### Using MCP Tools in Cline
-     Once connected, Cline can automatically use the tools provided by CopilotKit MCP when you interact with the AI assistant. The MCP tools will be available without requiring manual selection - Cline's AI will intelligently choose which tools to use based on your requests.
- 
-     **Server Status Indicators:**
-     - Green dot: Connected and ready to use
-     - Yellow dot: Connecting in progress
-     - Red dot: Connection error
- 
-     You can manage server settings, restart connections, or disable servers from the "Installed" tab in the MCP Servers interface.
- 
-   </Step>
- </Steps>
- 
- ### GitHub Copilot
- 
- [GitHub Copilot](https://github.com/features/copilot) is Microsoft's AI pair programmer integrated into VS Code and other editors. It supports MCP to extend its capabilities with external tools and services.
- 
- <Steps>
-   <Step>
-     ### Enable MCP Support in VS Code
-     1. Open VS Code Settings (`Cmd+,` on Mac or `Ctrl+,` on Windows/Linux)
-     2. Search for "MCP" in the settings search bar
-     3. Enable the `chat.mcp.enabled` setting
-   </Step>
-   <Step>
-     ### Add MCP Server to GitHub Copilot
-     You can configure MCP servers for GitHub Copilot in several ways:
- 
-     <Tabs groupId="copilot-config" items={['Workspace Configuration (Recommended)', 'User Settings Configuration', 'Command Palette']} default="Workspace Configuration (Recommended)">
-       <Tab value="Workspace Configuration (Recommended)">
-         Create a `.vscode/mcp.json` file in your project root:
-         ```json
-         {
-           "servers": {
-             "CopilotKit MCP": {
-               "url": "https://mcp.copilotkit.ai/sse"
-             }
-           }
-         }
-         ```
-       </Tab>
-       <Tab value="User Settings Configuration">
-         Add to your VS Code `settings.json`:
-         ```json
-         {
-           "mcp": {
-             "servers": {
-               "CopilotKit MCP": {
-                 "url": "https://mcp.copilotkit.ai/sse"
-               }
-             }
-           }
-         }
-         ```
-       </Tab>
-       <Tab value="Command Palette">
-         1. Open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
-         2. Type "MCP: Add Server" and select the command
-         3. Choose "HTTP (sse)" as the server type
-         4. Enter the server URL: `https://mcp.copilotkit.ai/sse`
-         5. Provide a name for the server: `CopilotKit MCP`
-       </Tab>
-     </Tabs>
- 
-   </Step>
-   <Step>
-     ### Using MCP Tools with GitHub Copilot
-     1. Open Copilot Chat in VS Code (click the Copilot icon in the activity bar)
-     2. Switch to Agent mode from the chat dropdown menu
-     3. Click the Tools (🔧) button to view available MCP tools
-     4. Your CopilotKit MCP tools will be listed and can be used automatically
- 
-     GitHub Copilot will intelligently use the MCP tools when relevant to your queries. You can also reference tools directly using `#` followed by the tool name.
- 
-   </Step>
-   <Step>
-     ### Managing MCP Servers
-     Use the "MCP: List Servers" command to view and manage your configured servers:
- 
-     - Start/Stop/Restart servers
-     - View server logs for debugging
-     - Browse available tools and resources
- 
-   </Step>
- </Steps>
- 
- ### Codex
- 
- [Codex](https://developers.openai.com/codex) is OpenAI's coding agent. Its CLI reads MCP servers from `~/.codex/config.toml`, where each server is defined under an `[mcp_servers.<name>]` table.
- 
- <Steps>
-   <Step>
-     ### Add MCP Server to Codex
-     Add CopilotKit MCP to `~/.codex/config.toml`. Codex launches command-based (stdio) servers, so bridge the remote server with `mcp-remote`:
- 
-     ```toml title="~/.codex/config.toml"
-     [mcp_servers.copilotkit]
-     command = "npx"
-     args = ["mcp-remote", "https://mcp.copilotkit.ai"]
-     ```
- 
-     Or add it from the terminal with the Codex CLI:
- 
-     ```bash
-     codex mcp add copilotkit -- npx mcp-remote https://mcp.copilotkit.ai
-     ```
-   </Step>
-   <Step>
-     ### Verify Connection
-     List the configured MCP servers to confirm CopilotKit is registered:
- 
-     ```bash
-     codex mcp list
-     ```
- 
-     Once configured, the CopilotKit MCP tools are available to Codex and are used automatically when relevant to your CopilotKit development tasks.
-   </Step>
- </Steps>
- 
- ### Other
- 
- For MCP-compatible applications not listed above, use these universal integration patterns. MCP (Model Context Protocol) is an open standard that allows AI applications to connect with external tools and data sources.
- 
- #### Connection Methods
- 
- Most MCP-compatible applications support one or both of these connection methods:
- 
- <Tabs groupId="universal-transport" items={['SSE', 'stdio']} default="SSE">
-   <Tab value="SSE">
-     For web-based or remote integrations:
-     ```
-     https://mcp.copilotkit.ai/sse
-     ```
-   </Tab>
-   <Tab value="stdio">
-     For local command-line integrations:
-     ```json
-     {
-       "command": "npx",
-       "args": ["mcp-remote", "https://mcp.copilotkit.ai"]
-     }
-     ```
-   </Tab>
- </Tabs>
- 
- #### Integration Steps
- 
- 1. **Find MCP Settings** - Look for "MCP," "Model Context Protocol," or "Tools" in your application settings
- 2. **Add Server** - Use the SSE URL: `https://mcp.copilotkit.ai/sse`
- 3. **Test Connection** - Restart your application and verify the server appears in available tools
- 
- #### Common Configuration Patterns
- 
- <Tabs groupId="config-patterns" items={['JSON Configuration File', 'Application Settings']} default="JSON Configuration File">
-   <Tab value="JSON Configuration File">
-     Many applications use a configuration file (locations vary by app):
-     ```json
-     {
-       "servers": {
-         "CopilotKit MCP": {
-           "url": "https://mcp.copilotkit.ai/sse"
-         }
-       }
-     }
-     ```
-   </Tab>
-   <Tab value="Application Settings">
-     Some apps integrate MCP into their main settings:
-     ```json
-     {
-       "mcp": {
-         "enabled": true,
-         "servers": {
-           "CopilotKit MCP": {
-             "url": "https://mcp.copilotkit.ai/sse"
-           }
-         }
-       }
-     }
-     ```
-   </Tab>
- </Tabs>
+ # Build with agents
+ 
+ > Give your AI coding agent up-to-date knowledge of CopilotKit's APIs, patterns, and best practices.
+ AI coding agents may not have up-to-date knowledge of CopilotKit's APIs, patterns, and best practices. The resources on this page give them accurate, current knowledge directly in their context.
+ 
+ ## CopilotKit Skills
+ 
+ Skills are folders of instructions, references, and scripts that coding agents can discover and use to work with CopilotKit accurately. Installing them gives your agent authoritative guidance on setup, development, debugging, integration, and upgrades — without relying on potentially outdated training data.
+ 
+ <Callout type="info">
+   Skills are the recommended way to give your agent CopilotKit knowledge. They work natively in Claude Code, Cursor, Codex, Gemini CLI, and any tool supporting the [agentskills.io](https://agentskills.io) standard.
+ </Callout>
+ 
+ Most of these skills help you **build with** CopilotKit. If you're just getting started, these three cover the most common tasks:
+ 
+ | Skill | Use it to |
+ | --- | --- |
+ | `copilotkit-setup` | Add CopilotKit to a project and get a chat working |
+ | `copilotkit-develop` | Build AI features — chat UI, frontend tools, and shared agent context |
+ | `copilotkit-integrations` | Connect an agent framework (LangGraph, CrewAI, Mastra, and more) |
+ 
+ The full [skills directory](https://github.com/CopilotKit/CopilotKit/tree/main/skills) adds more for specific tasks — like `copilotkit-debug` and `copilotkit-upgrade` — plus `copilotkit-contribute`, which is for working on the CopilotKit project itself rather than building with it. You don't need to memorize the list; your agent discovers the installed skills and picks the right one for each task.
+ 
+ <Steps>
+   <Step>
+     ### Install the skills
+ 
+     Run this from the root of the project you're building in:
+ 
+     ```bash
+     npx skills add CopilotKit/CopilotKit/skills -y
+     ```
+ 
+     This installs the skills into your project, where any coding agent working there (Claude Code, Codex, Cursor, or Gemini CLI) discovers them automatically. There's no per-agent configuration to do.
+ 
+     <Callout type="info">
+       Want to choose what gets installed? Run `npx skills add CopilotKit/CopilotKit/skills` without `-y` to pick specific skills, target agents, and scope interactively — or add `-g` to install globally for every project.
+     </Callout>
+ 
+   </Step>
+   <Step>
+     ### Start building
+ 
+     Open a new agent session and use a starter prompt to put the skills to work:
+ 
+     ```
+     Help me build a CopilotKit app. Use the copilotkit-setup skill to get started.
+     ```
+ 
+     Your agent will discover the installed skills and use the right one for each task — setup, development, debugging, or integration.
+   </Step>
+ </Steps>
+ 
+ ## MCP Docs Server
+ 
+ The CopilotKit MCP server equips AI coding agents with deep knowledge about CopilotKit's APIs, patterns, and best practices. When connected to your
+ development environment, it enables AI assistants to:
+ 
+ - Provide expert guidance
+ - Generate accurate code
+ - Give your AI agents a user interface
+ - Help you implement CopilotKit features correctly
+ 
+ ### Cursor
+ 
+ [Cursor](https://cursor.sh/) is an AI-powered code editor built for productivity. It features built-in AI assistance and supports MCP for extending AI capabilities with external tools.
+ 
+ <Steps>
+   <Step>
+     ### Open MCP Settings in Cursor
+     1. Press `Shift+Command+J` (Mac) or `Shift+Ctrl+J` (Windows/Linux) to open Cursor's settings.
+     2. Look for "MCP Tools" in the left sidebar categories.
+     3. Click "Add Custom MCP".
+     This will open the mcp.json file in the editor, which you need to edit.
+   </Step>
+   <Step>
+     ### Add MCP Server to Cursor
+     Copy CopilotKit MCP's configuration and paste it under the mcpServers key in the mcp.json file.
+ 
+     <Tabs groupId="transport" items={['HTTP', 'SSE']} default="HTTP">
+       <Tab value="HTTP">
+         ```json
+         {
+           "mcpServers": {
+             "CopilotKit MCP": {
+               "command": "npx",
+               "args": [
+                 "mcp-remote",
+                 "https://mcp.copilotkit.ai"
+               ]
+             }
+           }
+         }
+         ```
+       </Tab>
+       <Tab value="SSE">
+         ```json
+         {
+           "mcpServers": {
+             "CopilotKit MCP": {
+               "url": "https://mcp.copilotkit.ai/sse"
+             }
+           }
+         }
+         ```
+       </Tab>
+     </Tabs>
+ 
+   </Step>
+ </Steps>
+ 
+ ### Claude Web
+ 
+ [Claude](https://claude.ai/) is Anthropic's AI assistant accessible through a web interface. It supports MCP integrations, called Connectors, to connect with external tools and services.
+ 
+ <Steps>
+   <Step>
+     Navigate to the [Connectors](https://claude.ai/settings/connectors) settings
+     page in Claude. 1. Click on your user in the bottom left of the chat box and
+     then select "Settings" from the menu options that appear. 2. In the menu
+     along the left side of the Settings page, select "Connectors"
+   </Step>
+   <Step>Click "Add custom connector"</Step>
+   <Step>
+     1. In the Name field, enter a memorable name for the CopilotKit connector,
+     like `CopilotKit` 2. In the URL field, enter the following: ```
+     https://mcp.copilotkit.ai/sse ```
+   </Step>
+   <Step>Click "Add"</Step>
+ </Steps>
+ 
+ ### Claude Desktop
+ 
+ [Claude Desktop](https://claude.ai/download) is the desktop application version of Claude, offering the same AI capabilities with local system integration and MCP support.
+ 
+ <div className="-mt-2 text-sm text-muted-foreground">
+   These steps are the same as those for Claude Web, above. The only difference
+   is that the Connectors link below navigates to the Connectors settings in the
+   Claude desktop app, instead of the Claude web app.
+ </div>
+ 
+ <Steps>
+   <Step>
+     Navigate to the [Connectors](claude://claude.ai/settings/connectors)
+     settings page in Claude. 1. Click on your user in the bottom left of the
+     chat box and then select "Settings" from the menu options that appear. 2. In
+     the menu along the left side of the Settings page, select "Connectors"
+   </Step>
+   <Step>Click "Add custom connector"</Step>
+   <Step>
+     1. In the Name field, enter a memorable name for the CopilotKit connector,
+     like `CopilotKit` 2. In the URL field, enter the following: ```
+     https://mcp.copilotkit.ai/sse ```
+   </Step>
+   <Step>Click "Add"</Step>
+ </Steps>
+ 
+ ### Claude Code
+ 
+ [Claude Code](https://docs.claude.com/en/docs/claude-code) is Anthropic's official CLI for Claude. It supports MCP integrations to connect with external tools and services, enhancing AI capabilities with specialized knowledge.
+ 
+ <Steps>
+   <Step>
+     ### Add MCP Server to Claude Code
+     Use the Claude Code CLI to add the CopilotKit MCP server:
+ 
+     ```bash
+     claude mcp add --transport sse copilotkit-mcp https://mcp.copilotkit.ai/sse
+     ```
+ 
+     **Expected Output:**
+     ```
+     Added SSE MCP server copilotkit-mcp with URL: https://mcp.copilotkit.ai/sse to local config
+     File modified: /home/[username]/.claude.json [project: /path/to/your/project]
+     ```
+ 
+   </Step>
+   <Step>
+     ### Verify Connection
+     Check that the server is properly connected:
+ 
+     ```bash
+     claude mcp list
+     ```
+ 
+     **Expected Output:**
+     ```
+     Checking MCP server health...
+ 
+     copilotkit-mcp: https://mcp.copilotkit.ai/sse (SSE) - ✓ Connected
+     ```
+ 
+     <div className="mt-4 p-4 rounded-lg bg-muted">
+       <div className="font-medium text-sm mb-2">💡 Server Name Requirements</div>
+       <div className="text-sm text-muted-foreground">
+         Server names can only contain letters, numbers, hyphens, and underscores. Avoid spaces in server names.
+       </div>
+     </div>
+ 
+   </Step>
+   <Step>
+     ### Using MCP Tools in Claude Code
+     Once configured, the CopilotKit MCP server tools are automatically available when you interact with Claude Code for CopilotKit-related development tasks. The AI will intelligently use these tools when relevant to your queries.
+ 
+     **What the MCP Server Provides:**
+     - Expert guidance for CopilotKit development
+     - Accurate code generation for CopilotKit features
+     - Best practices and implementation patterns
+     - Deep understanding of CopilotKit APIs
+ 
+     **Management Commands:**
+     ```bash
+     # View server details
+     claude mcp get copilotkit-mcp
+ 
+     # Remove server if needed
+     claude mcp remove copilotkit-mcp -s local
+     ```
+ 
+   </Step>
+ </Steps>
+ 
+ ### Windsurf
+ 
+ [Windsurf](https://codeium.com/windsurf) is Codeium's agentic IDE that combines AI-powered coding assistance with traditional development tools. It features the Cascade AI assistant with MCP integration.
+ 
+ <Steps>
+   <Step>
+     ### Access Windsurf MCP Settings
+     1. Open Windsurf Settings (click the settings button in the bottom right)
+     2. Navigate to the "Cascade" section
+     3. Look for "Model Context Protocol" or "MCP" settings
+     4. Enable MCP support if not already enabled
+   </Step>
+   <Step>
+     ### Add MCP Server to Windsurf
+     You can add CopilotKit MCP in several ways:
+ 
+     <Tabs groupId="windsurf-setup" items={['Using the Built-in Server Browser', 'Manual Configuration']} default="Using the Built-in Server Browser">
+       <Tab value="Using the Built-in Server Browser">
+         1. In the Cascade section, click "Add Server"
+         2. Select "Add custom server"
+         3. Choose the transport type:
+            - **SSE/HTTP** for remote servers
+            - **stdio** for local command-based servers
+       </Tab>
+       <Tab value="Manual Configuration">
+         Add the server configuration to your mcp_config.json file:
+ 
+         <Tabs groupId="windsurf-transport" items={['HTTP Transport', 'SSE Transport', 'stdio Transport (Local)']} default="HTTP Transport">
+           <Tab value="HTTP Transport">
+             ```json
+             {
+               "mcpServers": {
+                 "CopilotKit MCP": {
+                   "url": "https://mcp.copilotkit.ai",
+                   "disabled": false,
+                   "timeout": 30
+                 }
+               }
+             }
+             ```
+           </Tab>
+           <Tab value="SSE Transport">
+             ```json
+             {
+               "mcpServers": {
+                 "CopilotKit MCP": {
+                   "url": "https://mcp.copilotkit.ai/sse",
+                   "disabled": false,
+                   "timeout": 30
+                 }
+               }
+             }
+             ```
+           </Tab>
+           <Tab value="stdio Transport (Local)">
+             ```json
+             {
+               "mcpServers": {
+                 "CopilotKit MCP": {
+                   "command": "npx",
+                   "args": ["mcp-remote", "https://mcp.copilotkit.ai"]
+                 }
+               }
+             }
+             ```
+           </Tab>
+         </Tabs>
+       </Tab>
+     </Tabs>
+ 
+   </Step>
+   <Step>
+     ### Configuration File Location
+     The MCP configuration is typically stored at:
+ 
+     <Tabs groupId="windsurf-os" items={['macOS', 'Windows', 'Linux']} default="macOS">
+       <Tab value="macOS">
+         ```
+         ~/.codeium/windsurf/mcp_config.json
+         ```
+       </Tab>
+       <Tab value="Windows">
+         ```
+         %APPDATA%\.codeium\windsurf\mcp_config.json
+         ```
+       </Tab>
+       <Tab value="Linux">
+         ```
+         ~/.config/codeium/windsurf/mcp_config.json
+         ```
+       </Tab>
+     </Tabs>
+ 
+   </Step>
+   <Step>
+     ### Using MCP Tools in Windsurf
+     Once configured, CopilotKit MCP tools will be available in Windsurf's Cascade AI assistant:
+ 
+     - Open the Cascade panel (AI chat interface)
+     - The MCP tools are automatically available to the AI
+     - You can reference specific tools using `@CopilotKit MCP` in your conversations
+     - Windsurf will intelligently choose which tools to use based on your requests
+ 
+     ### Managing Your MCP Servers
+     In the Windsurf MCP settings, you can:
+     - Enable/Disable individual servers
+     - View server status and connection health
+     - Configure tool permissions and auto-approval settings
+     - Monitor server logs for debugging
+     - Restart servers if they become unresponsive
+ 
+     The AI will seamlessly integrate CopilotKit MCP functionality into your development workflow!
+ 
+   </Step>
+ </Steps>
+ 
+ ### Cline
+ 
+ [Cline](https://github.com/cline/cline) is a VS Code extension that provides autonomous AI coding assistance. It can perform complex tasks using MCP tools to interact with external systems.
+ 
+ <Steps>
+   <Step>
+     ### Open Cline MCP Settings
+     1. Open the Cline extension panel in VS Code
+     2. Click the menu (⋮) in the top right corner of the Cline panel
+     3. Select "MCP Servers" from the dropdown menu
+     
+     This will open the MCP Servers interface where you can manage your server connections.
+   </Step>
+   <Step>
+     ### Add MCP Server to Cline
+     In the MCP Servers interface, you have three main options:
+ 
+     <Tabs groupId="cline-setup" items={['Remote Server Setup', 'Configuration File Setup']} default="Remote Server Setup">
+       <Tab value="Remote Server Setup">
+         1. Click on the "Remote Servers" tab
+         2. Enter a Server Name (e.g., "CopilotKit MCP")
+         3. Enter the Server URL:
+         ```
+         https://mcp.copilotkit.ai/sse
+         ```
+         4. Click "Add Server" to connect
+       </Tab>
+       <Tab value="Configuration File Setup">
+         Alternatively, you can configure via the advanced settings:
+         1. In the "Installed" tab, click "Configure MCP Servers"
+         2. Add the following configuration to your settings file:
+         ```json
+         {
+           "mcpServers": {
+             "CopilotKit MCP": {
+               "url": "https://mcp.copilotkit.ai/sse",
+               "disabled": false,
+               "timeout": 30
+             }
+           }
+         }
+         ```
+       </Tab>
+     </Tabs>
+ 
+   </Step>
+   <Step>
+     ### Using MCP Tools in Cline
+     Once connected, Cline can automatically use the tools provided by CopilotKit MCP when you interact with the AI assistant. The MCP tools will be available without requiring manual selection - Cline's AI will intelligently choose which tools to use based on your requests.
+ 
+     **Server Status Indicators:**
+     - Green dot: Connected and ready to use
+     - Yellow dot: Connecting in progress
+     - Red dot: Connection error
+ 
+     You can manage server settings, restart connections, or disable servers from the "Installed" tab in the MCP Servers interface.
+ 
+   </Step>
+ </Steps>
+ 
+ ### GitHub Copilot
+ 
+ [GitHub Copilot](https://github.com/features/copilot) is Microsoft's AI pair programmer integrated into VS Code and other editors. It supports MCP to extend its capabilities with external tools and services.
+ 
+ <Steps>
+   <Step>
+     ### Enable MCP Support in VS Code
+     1. Open VS Code Settings (`Cmd+,` on Mac or `Ctrl+,` on Windows/Linux)
+     2. Search for "MCP" in the settings search bar
+     3. Enable the `chat.mcp.enabled` setting
+   </Step>
+   <Step>
+     ### Add MCP Server to GitHub Copilot
+     You can configure MCP servers for GitHub Copilot in several ways:
+ 
+     <Tabs groupId="copilot-config" items={['Workspace Configuration (Recommended)', 'User Settings Configuration', 'Command Palette']} default="Workspace Configuration (Recommended)">
+       <Tab value="Workspace Configuration (Recommended)">
+         Create a `.vscode/mcp.json` file in your project root:
+         ```json
+         {
+           "servers": {
+             "CopilotKit MCP": {
+               "url": "https://mcp.copilotkit.ai/sse"
+             }
+           }
+         }
+         ```
+       </Tab>
+       <Tab value="User Settings Configuration">
+         Add to your VS Code `settings.json`:
+         ```json
+         {
+           "mcp": {
+             "servers": {
+               "CopilotKit MCP": {
+                 "url": "https://mcp.copilotkit.ai/sse"
+               }
+             }
+           }
+         }
+         ```
+       </Tab>
+       <Tab value="Command Palette">
+         1. Open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
+         2. Type "MCP: Add Server" and select the command
+         3. Choose "HTTP (sse)" as the server type
+         4. Enter the server URL: `https://mcp.copilotkit.ai/sse`
+         5. Provide a name for the server: `CopilotKit MCP`
+       </Tab>
+     </Tabs>
+ 
+   </Step>
+   <Step>
+     ### Using MCP Tools with GitHub Copilot
+     1. Open Copilot Chat in VS Code (click the Copilot icon in the activity bar)
+     2. Switch to Agent mode from the chat dropdown menu
+     3. Click the Tools (🔧) button to view available MCP tools
+     4. Your CopilotKit MCP tools will be listed and can be used automatically
+ 
+     GitHub Copilot will intelligently use the MCP tools when relevant to your queries. You can also reference tools directly using `#` followed by the tool name.
+ 
+   </Step>
+   <Step>
+     ### Managing MCP Servers
+     Use the "MCP: List Servers" command to view and manage your configured servers:
+ 
+     - Start/Stop/Restart servers
+     - View server logs for debugging
+     - Browse available tools and resources
+ 
+   </Step>
+ </Steps>
+ 
+ ### Codex
+ 
+ [Codex](https://developers.openai.com/codex) is OpenAI's coding agent. Its CLI reads MCP servers from `~/.codex/config.toml`, where each server is defined under an `[mcp_servers.<name>]` table.
+ 
+ <Steps>
+   <Step>
+     ### Add MCP Server to Codex
+     Add CopilotKit MCP to `~/.codex/config.toml`. Codex launches command-based (stdio) servers, so bridge the remote server with `mcp-remote`:
+ 
+     ```toml title="~/.codex/config.toml"
+     [mcp_servers.copilotkit]
+     command = "npx"
+     args = ["mcp-remote", "https://mcp.copilotkit.ai"]
+     ```
+ 
+     Or add it from the terminal with the Codex CLI:
+ 
+     ```bash
+     codex mcp add copilotkit -- npx mcp-remote https://mcp.copilotkit.ai
+     ```
+   </Step>
+   <Step>
+     ### Verify Connection
+     List the configured MCP servers to confirm CopilotKit is registered:
+ 
+     ```bash
+     codex mcp list
+     ```
+ 
+     Once configured, the CopilotKit MCP tools are available to Codex and are used automatically when relevant to your CopilotKit development tasks.
+   </Step>
+ </Steps>
+ 
+ ### Other
+ 
+ For MCP-compatible applications not listed above, use these universal integration patterns. MCP (Model Context Protocol) is an open standard that allows AI applications to connect with external tools and data sources.
+ 
+ #### Connection Methods
+ 
+ Most MCP-compatible applications support one or both of these connection methods:
+ 
+ <Tabs groupId="universal-transport" items={['SSE', 'stdio']} default="SSE">
+   <Tab value="SSE">
+     For web-based or remote integrations:
+     ```
+     https://mcp.copilotkit.ai/sse
+     ```
+   </Tab>
+   <Tab value="stdio">
+     For local command-line integrations:
+     ```json
+     {
+       "command": "npx",
+       "args": ["mcp-remote", "https://mcp.copilotkit.ai"]
+     }
+     ```
+   </Tab>
+ </Tabs>
+ 
+ #### Integration Steps
+ 
+ 1. **Find MCP Settings** - Look for "MCP," "Model Context Protocol," or "Tools" in your application settings
+ 2. **Add Server** - Use the SSE URL: `https://mcp.copilotkit.ai/sse`
+ 3. **Test Connection** - Restart your application and verify the server appears in available tools
+ 
+ #### Common Configuration Patterns
+ 
+ <Tabs groupId="config-patterns" items={['JSON Configuration File', 'Application Settings']} default="JSON Configuration File">
+   <Tab value="JSON Configuration File">
+     Many applications use a configuration file (locations vary by app):
+     ```json
+     {
+       "servers": {
+         "CopilotKit MCP": {
+           "url": "https://mcp.copilotkit.ai/sse"
+         }
+       }
+     }
+     ```
+   </Tab>
+   <Tab value="Application Settings">
+     Some apps integrate MCP into their main settings:
+     ```json
+     {
+       "mcp": {
+         "enabled": true,
+         "servers": {
+           "CopilotKit MCP": {
+             "url": "https://mcp.copilotkit.ai/sse"
+           }
+         }
+       }
+     }
+     ```
+   </Tab>
+ </Tabs>
  
````

**Medium — Threads & Persistence Architecture**

`/angular/agno/premium/threads-explained` · under “Next steps”

0 code lines, 322 prose lines changed.

````diff
- # Threads & Persistence Architecture
- 
- > Architecture and mental model behind CopilotKit threads: how persistent conversations work, how reconnection replays history, and what to expect from thread lifecycle operations.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Want to see threads in your own app?"
-   body="Persistent threads ship with the Enterprise Intelligence Platform on the free Developer tier."
-   surface="docs_learn_threads"
- />
- 
- Start with the [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) to understand what Rich Threads provide
- and choose between the prebuilt Drawer and a custom headless UI. This page
- explains the persistence and replay architecture beneath both paths. For the
- client-side lifecycle (minting a `threadId`, hydrating history on load, and
- switching or starting threads), see [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless).
- 
- ## What are threads?
- 
- A thread is a persistent, server-side container for a multi-turn conversation between a user and an agent. Unlike ephemeral chat sessions that disappear when the page reloads, threads store the full event history (every message, tool call, and state change), so conversations can be paused, resumed, and replayed across sessions and devices.
- 
- Threads are a platform-level concept, not tied to any specific agent framework. Whether your backend uses LangGraph, Mastra, CrewAI, or any other framework, threads work the same way.
- 
- ## Key concepts
- 
- ### Thread vs. Run
- 
- A **thread** is the durable container. A **run** is a single agent execution within that thread. One thread can have many runs. Each time the user sends a message and the agent responds, that is a new run, and the thread accumulates events across all of its runs.
- 
- ### How the pieces fit together
- 
- From a developer's perspective, threads involve three things:
- 
- | What you use | What it does |
- |-------------|-------------|
- | Frontend thread API | Lists, renames, archives, and deletes threads. Supports pagination and stays in sync across tabs and devices via WebSocket. |
- | `CopilotChat` with `threadId` | Connects to a specific thread, loads its history, and streams new events in realtime. |
- | `CopilotRuntime` | Server-side layer that executes agents, stores thread data on the Enterprise Intelligence Platform, and relays events to connected clients. |
- 
- You interact with the first two. The runtime and platform handle persistence and sync behind the scenes.
- 
- To wire these pieces into a custom chat UI, follow [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless).
- 
- ### Auto-naming
- 
- When a new thread is created and the first run completes, the runtime automatically generates a short name (2–5 words) using the LLM. This runs asynchronously, so it doesn't block thread creation or the agent's response. The generated name appears through the frontend thread API via realtime sync.
- 
- Auto-naming is enabled by default. Disable it with `generateThreadNames: false` on the runtime. Users can always override the generated name via `renameThread()`.
- 
- ### Archive vs. delete
- 
- Threads support two removal operations with different semantics:
- 
- - **Archive** is a soft delete. The thread remains stored but disappears from the default list. Show archived threads by setting `includeArchived: true` in the frontend thread API. Threads can also be unarchived, which restores them to the active list.
- - **Delete** is permanent and irreversible. The thread and its history are removed entirely.
- 
- Neither operation has a built-in confirmation dialog, so your application should implement its own if needed.
- 
- ## How it works
- 
- The client-side steps (minting a `threadId`, hydrating history on load, and switching or starting threads) live in [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless). This section covers what the platform does underneath: persisting runs, replaying them, and keeping every connected client in sync.
- 
- ### Persistence and replay
- 
- As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread on the Enterprise Intelligence Platform. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
- 
- When a client opens an existing thread, the platform checks whether a run is in progress:
- 
- - **No active run.** The platform returns the historical events only, and the client replays them to reconstruct the conversation.
- - **Active run.** The platform returns the historical events *plus* opens a WebSocket connection. The client replays the history, then receives live events as they stream in.
- 
- In either case the transition from replayed history to live updates is seamless. If a tool call from a previous thread completes while the client is switching away, its result is discarded rather than inserted into the new thread, so stale output never leaks between conversations.
- 
- ### Realtime sync
- 
- The frontend thread client maintains a WebSocket subscription for thread metadata changes. When any client creates, renames, archives, or deletes a thread, the update is pushed to all connected clients automatically. This is how a thread created on one tab appears in the sidebar on another tab without polling.
- 
- ### Future runs and native persistence
- 
- Importing history is a one-time adoption step. Afterward, future conversations
- that run through CopilotKit are persisted to Enterprise Intelligence. When the
- agent also keeps a durable LangGraph checkpointer or LangGraph Platform
- deployment wired, the same runs continue through LangGraph's native persistence.
- An ADK agent behaves similarly when it remains connected to a durable session
- service that retains its sessions.
- 
- That coordinated future persistence lets teams retain native framework storage
- and analytics while adding the Rich Threads experience for users. It is not a
- general replication link between databases: frontend thread operations such as
- rename, archive, and delete change the Enterprise Intelligence thread and do not
- mutate records in LangGraph, ADK, or another native store.
- 
- ### Pessimistic updates
- 
- Thread mutations (`rename`, `archive`, `delete`) use a pessimistic update model: the client waits for the server to confirm via WebSocket before updating the thread list. This means:
- 
- - The thread list doesn't change until the server confirms the operation.
- - If the server rejects the mutation, the UI never shows an incorrect state.
- - The returned promise resolves only after server confirmation, or rejects on failure.
- 
- ## Error handling
- 
- ### Mutation failures
- 
- All mutation methods (`renameThread`, `archiveThread`, `deleteThread`) return promises that reject with an `Error` if the server cannot complete the operation. Common causes:
- 
- - **Network failure.** The client can't reach the runtime.
- - **Thread not found.** Another client deleted the thread before your mutation arrived.
- - **Authorization failure.** The user doesn't have permission to modify the thread.
- - **Timeout.** The server didn't respond within 15 seconds.
- 
- The thread client exposes the most recent list or mutation error and clears it
- after the next successful operation.
- 
- ### WebSocket disconnection
- 
- If the WebSocket connection drops (network change, server restart, laptop sleep):
- 
- - **Thread list.** The frontend thread API stops receiving realtime updates, so the list becomes stale until the connection is re-established. Reconnection is automatic with exponential backoff.
- - **Active conversation.** If `CopilotChat` loses its WebSocket mid-run, the agent's output may be interrupted. Reloading the page, or switching away and back to the thread, triggers the reconnection flow, which replays any missed events.
- 
- ### Thread locked
- 
- If a thread already has an active run and another client tries to start a new run on the same thread, the request is rejected with a **409 Conflict**. This prevents two agent runs from interleaving events on the same thread. The existing run must complete or be stopped before a new one can begin.
- 
- The runtime acquires a Redis-backed lock on the thread for the duration of each run. You can tune this behavior on the runtime:
- 
- | Option | Default | Max | Description |
- |--------|---------|-----|-------------|
- | `lockTtlSeconds` | `20` | `3600` (1 hour) | How long the lock is held before it expires automatically. |
- | `lockHeartbeatIntervalSeconds` | `15` | `3000` (50 min) | How often the runtime renews the lock during a run. The heartbeat always runs; you only need to adjust the interval. |
- | `lockKeyPrefix` | — | — | Custom Redis key prefix for the thread lock. Useful when multiple apps share a Redis instance. |
- 
- If a run completes normally, the lock is released immediately. The TTL is a safety net for cases where the runtime crashes without releasing the lock.
- 
- ## Design decisions
- 
- ### Why event replay instead of message snapshots?
- 
- Threads store the raw event stream rather than a snapshot of the final message list. This enables:
- 
- - **Partial replay.** When reconnecting, the client only fetches events it missed rather than reloading the entire history.
- - **Faithful reproduction.** Streaming tokens, tool calls, and state changes replay exactly as they originally occurred.
- 
- The trade-off is that replay is more complex than loading a message array. The platform handles this complexity so your application doesn't have to.
- 
- ### When threads are the wrong tool
- 
- - **Ephemeral interactions.** If your users don't need conversation history (e.g., a one-shot Q&A widget), threads add unnecessary complexity. Use `CopilotChat` without a `threadId`.
- - **Client-only state.** If you need local-only chat history without server persistence, manage messages in frontend state or localStorage instead.
- 
- ## Next steps
- 
- - **Client lifecycle:** [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless) — how a `threadId` is minted, hydrated, and switched on the client
- - **Overview:** [Rich Threads](/angular/agno/guides/threads-memory-attachments-headless) — understand the feature and choose an implementation path
- - **Step-by-step guide:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — build a custom thread-management UI
- 
- 
- 
- - **Angular guide:** <a href="/angular/agno/guides/threads-memory-attachments-headless">Threads, memory, attachments, and headless UI</a>
- - **API reference:** <a href="/reference/angular/functions/injectThreads">injectThreads</a> — options, signals, and mutations
+ # Threads & Persistence Architecture
+ 
+ > Architecture and mental model behind CopilotKit threads: how persistent conversations work, how reconnection replays history, and what to expect from thread lifecycle operations.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Want to see threads in your own app?"
+   body="Persistent threads ship with CopilotKit Intelligence on the free Developer tier."
+   surface="docs_learn_threads"
+ />
+ 
+ Start with the [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) to understand what Rich Threads provide
+ and choose between the prebuilt Drawer and a custom headless UI. This page
+ explains the persistence and replay architecture beneath both paths. For the
+ client-side lifecycle (minting a `threadId`, hydrating history on load, and
+ switching or starting threads), see [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless).
+ 
+ ## What are threads?
+ 
+ A thread is a persistent, server-side container for a multi-turn conversation between a user and an agent. Unlike ephemeral chat sessions that disappear when the page reloads, threads store the full event history (every message, tool call, and state change), so conversations can be paused, resumed, and replayed across sessions and devices.
+ 
+ Threads are a platform-level concept, not tied to any specific agent framework. Whether your backend uses LangGraph, Mastra, CrewAI, or any other framework, threads work the same way.
+ 
+ ## Key concepts
+ 
+ ### Thread vs. Run
+ 
+ A **thread** is the durable container. A **run** is a single agent execution within that thread. One thread can have many runs. Each time the user sends a message and the agent responds, that is a new run, and the thread accumulates events across all of its runs.
+ 
+ ### How the pieces fit together
+ 
+ From a developer's perspective, threads involve three things:
+ 
+ | What you use | What it does |
+ |-------------|-------------|
+ | Frontend thread API | Lists, renames, archives, and deletes threads. Supports pagination and stays in sync across tabs and devices via WebSocket. |
+ | `CopilotChat` with `threadId` | Connects to a specific thread, loads its history, and streams new events in realtime. |
+ | `CopilotRuntime` | Server-side layer that executes agents, stores thread data in CopilotKit Intelligence, and relays events to connected clients. |
+ 
+ You interact with the first two. The runtime and platform handle persistence and sync behind the scenes.
+ 
+ To wire these pieces into a custom chat UI, follow [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless).
+ 
+ ### Auto-naming
+ 
+ When a new thread is created and the first run completes, the runtime automatically generates a short name (2–5 words) using the LLM. This runs asynchronously, so it doesn't block thread creation or the agent's response. The generated name appears through the frontend thread API via realtime sync.
+ 
+ Auto-naming is enabled by default. Disable it with `generateThreadNames: false` on the runtime. Users can always override the generated name via `renameThread()`.
+ 
+ ### Archive vs. delete
+ 
+ Threads support two removal operations with different semantics:
+ 
+ - **Archive** is a soft delete. The thread remains stored but disappears from the default list. Show archived threads by setting `includeArchived: true` in the frontend thread API. Threads can also be unarchived, which restores them to the active list.
+ - **Delete** is permanent and irreversible. The thread and its history are removed entirely.
+ 
+ Neither operation has a built-in confirmation dialog, so your application should implement its own if needed.
+ 
+ ## How it works
+ 
+ The client-side steps (minting a `threadId`, hydrating history on load, and switching or starting threads) live in [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless). This section covers what the platform does underneath: persisting runs, replaying them, and keeping every connected client in sync.
+ 
+ ### Persistence and replay
+ 
+ As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread in CopilotKit Intelligence. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
+ 
+ When a client opens an existing thread, the platform checks whether a run is in progress:
+ 
+ - **No active run.** The platform returns the historical events only, and the client replays them to reconstruct the conversation.
+ - **Active run.** The platform returns the historical events *plus* opens a WebSocket connection. The client replays the history, then receives live events as they stream in.
+ 
+ In either case the transition from replayed history to live updates is seamless. If a tool call from a previous thread completes while the client is switching away, its result is discarded rather than inserted into the new thread, so stale output never leaks between conversations.
+ 
+ ### Realtime sync
+ 
+ The frontend thread client maintains a WebSocket subscription for thread metadata changes. When any client creates, renames, archives, or deletes a thread, the update is pushed to all connected clients automatically. This is how a thread created on one tab appears in the sidebar on another tab without polling.
+ 
+ ### Future runs and native persistence
+ 
+ Importing history is a one-time adoption step. Afterward, future conversations
+ that run through CopilotKit are persisted to CopilotKit Intelligence. When the
+ agent also keeps a durable LangGraph checkpointer or LangGraph Platform
+ deployment wired, the same runs continue through LangGraph's native persistence.
+ An ADK agent behaves similarly when it remains connected to a durable session
+ service that retains its sessions.
+ 
+ That coordinated future persistence lets teams retain native framework storage
+ and analytics while adding the Rich Threads experience for users. It is not a
+ general replication link between databases: frontend thread operations such as
+ rename, archive, and delete change the CopilotKit Intelligence thread and do not
+ mutate records in LangGraph, ADK, or another native store.
+ 
+ ### Pessimistic updates
+ 
+ Thread mutations (`rename`, `archive`, `delete`) use a pessimistic update model: the client waits for the server to confirm via WebSocket before updating the thread list. This means:
+ 
+ - The thread list doesn't change until the server confirms the operation.
+ - If the server rejects the mutation, the UI never shows an incorrect state.
+ - The returned promise resolves only after server confirmation, or rejects on failure.
+ 
+ ## Error handling
+ 
+ ### Mutation failures
+ 
+ All mutation methods (`renameThread`, `archiveThread`, `deleteThread`) return promises that reject with an `Error` if the server cannot complete the operation. Common causes:
+ 
+ - **Network failure.** The client can't reach the runtime.
+ - **Thread not found.** Another client deleted the thread before your mutation arrived.
+ - **Authorization failure.** The user doesn't have permission to modify the thread.
+ - **Timeout.** The server didn't respond within 15 seconds.
+ 
+ The thread client exposes the most recent list or mutation error and clears it
+ after the next successful operation.
+ 
+ ### WebSocket disconnection
+ 
+ If the WebSocket connection drops (network change, server restart, laptop sleep):
+ 
+ - **Thread list.** The frontend thread API stops receiving realtime updates, so the list becomes stale until the connection is re-established. Reconnection is automatic with exponential backoff.
+ - **Active conversation.** If `CopilotChat` loses its WebSocket mid-run, the agent's output may be interrupted. Reloading the page, or switching away and back to the thread, triggers the reconnection flow, which replays any missed events.
+ 
+ ### Thread locked
+ 
+ If a thread already has an active run and another client tries to start a new run on the same thread, the request is rejected with a **409 Conflict**. This prevents two agent runs from interleaving events on the same thread. The existing run must complete or be stopped before a new one can begin.
+ 
+ The runtime acquires a Redis-backed lock on the thread for the duration of each run. You can tune this behavior on the runtime:
+ 
+ | Option | Default | Max | Description |
+ |--------|---------|-----|-------------|
+ | `lockTtlSeconds` | `20` | `3600` (1 hour) | How long the lock is held before it expires automatically. |
+ | `lockHeartbeatIntervalSeconds` | `15` | `3000` (50 min) | How often the runtime renews the lock during a run. The heartbeat always runs; you only need to adjust the interval. |
+ | `lockKeyPrefix` | — | — | Custom Redis key prefix for the thread lock. Useful when multiple apps share a Redis instance. |
+ 
+ If a run completes normally, the lock is released immediately. The TTL is a safety net for cases where the runtime crashes without releasing the lock.
+ 
+ ## Design decisions
+ 
+ ### Why event replay instead of message snapshots?
+ 
+ Threads store the raw event stream rather than a snapshot of the final message list. This enables:
+ 
+ - **Partial replay.** When reconnecting, the client only fetches events it missed rather than reloading the entire history.
+ - **Faithful reproduction.** Streaming tokens, tool calls, and state changes replay exactly as they originally occurred.
+ 
+ The trade-off is that replay is more complex than loading a message array. The platform handles this complexity so your application doesn't have to.
+ 
+ ### When threads are the wrong tool
+ 
+ - **Ephemeral interactions.** If your users don't need conversation history (e.g., a one-shot Q&A widget), threads add unnecessary complexity. Use `CopilotChat` without a `threadId`.
+ - **Client-only state.** If you need local-only chat history without server persistence, manage messages in frontend state or localStorage instead.
+ 
+ ## Next steps
+ 
+ - **Client lifecycle:** [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless) — how a `threadId` is minted, hydrated, and switched on the client
+ - **Overview:** [Rich Threads](/angular/agno/guides/threads-memory-attachments-headless) — understand the feature and choose an implementation path
+ - **Step-by-step guide:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — build a custom thread-management UI
+ 
+ 
+ 
+ - **Angular guide:** <a href="/angular/agno/guides/threads-memory-attachments-headless">Threads, memory, attachments, and headless UI</a>
+ - **API reference:** <a href="/reference/angular/functions/injectThreads">injectThreads</a> — options, signals, and mutations
  
````

**High — Inspector**

`/angular/agno/inspector` · under “Next steps”

144 code lines, 172 prose lines changed.

````diff
- # Inspector
- 
- > Mount the CopilotKit Inspector in an Angular application and keep it out of production builds.
- 
- The Inspector is a debugging overlay for the live connection between your Angular
- application and your agents. It opens from a floating launcher and reports what
- the application and the runtime exchange as a run happens.
- 
- Its navigation has three groups — **Threads**, **Agents**, and **Learning** — and
- opens on Threads, whose contents depend on the runtime's license state. The
- agent-debugging views sit under Agents:
- 
- | View                 | What it shows                                                        |
- | -------------------- | -------------------------------------------------------------------- |
- | **AG-UI Events**     | The raw event stream between your application and the agent.          |
- | **Available Agents** | The agents the runtime advertises to your application.                |
- | **Agent State**      | The selected agent's state as it updates.                             |
- | **Frontend Tools**   | The tools you registered, with their parameter schemas.               |
- | **Context**          | The context you sent to the agent, including readables and documents. |
- 
- ## Mount the element
- 
- The Inspector is `cpk-web-inspector`, a framework-agnostic web component in
- `@copilotkit/web-inspector`. `@copilotkit/angular` does not depend on that
- package and does not mount the element, so an Angular application creates it and
- supplies the core itself.
- 
- Install the package as a dev dependency to keep it out of your production
- dependency graph:
- 
- ```bash
- npm install --save-dev @copilotkit/web-inspector
- ```
- 
- Add a component that owns the element's lifecycle. It reuses an existing element
- or creates one after the first browser render, supplies the core, appends the
- element to `document.body`, and removes it when the component is destroyed:
- 
- ```ts title="src/app/web-inspector.ts"
- import { afterNextRender, Component, DestroyRef, inject } from "@angular/core";
- import { CopilotKit } from "@copilotkit/angular";
- import { WEB_INSPECTOR_TAG } from "@copilotkit/web-inspector";
- import type { WebInspectorElement } from "@copilotkit/web-inspector";
- 
- @Component({
-   selector: "app-web-inspector",
-   template: "",
- })
- export class WebInspector {
-   readonly #copilotKit = inject(CopilotKit);
-   readonly #destroyRef = inject(DestroyRef);
- 
-   constructor() {
-     afterNextRender(() => {
-       const existing =
-         document.querySelector<WebInspectorElement>(WEB_INSPECTOR_TAG);
-       const inspector =
-         existing ??
-         (document.createElement(WEB_INSPECTOR_TAG) as WebInspectorElement);
- 
-       // Supply the application's core instead of letting the element find one.
-       inspector.core = this.#copilotKit.core;
-       inspector.setAttribute("auto-attach-core", "false");
- 
-       if (!existing) {
-         document.body.appendChild(inspector);
-       }
- 
-       this.#destroyRef.onDestroy(() => {
-         if (inspector.isConnected) {
-           inspector.remove();
-         }
-       });
-     });
-   }
- }
- ```
- 
- Render the component once, from the root component, behind a development-only
- `@defer`:
- 
- ```ts title="src/app/app.ts"
- import { Component, isDevMode } from "@angular/core";
- import { WebInspector } from "./web-inspector";
- 
- @Component({
-   selector: "app-root",
-   imports: [WebInspector],
-   template: `
-     <!-- your application -->
- 
-     @defer (when isDev) {
-       <app-web-inspector />
-     }
-   `,
- })
- export class App {
-   protected readonly isDev = isDevMode();
- }
- ```
- 
- ## Supply the application's core
- 
- `inspector.core = copilotKit.core` is what makes the Inspector report your
- application rather than show an empty panel. Without an assigned core, the
- element searches development globals such as `window.__COPILOTKIT_CORE__` for
- one. Setting `auto-attach-core="false"` disables that search, so the element
- observes the core you assigned and nothing else.
- 
- Assign `core` directly. It is a property, not an attribute, and
- `auto-attach-core` is the only attribute the element observes.
- 
- ## Position the launcher
- 
- The launcher defaults to the top-right corner, and the element positions itself
- with an inline transform. Override both from your global stylesheet. A
- bottom-left corner keeps the launcher clear of the close button on a chat panel
- or sidebar:
- 
- ```css title="src/styles.css"
- cpk-web-inspector {
-   /* The panel is draggable and sets an inline transform. Neutralize it before
-      choosing a corner. */
-   transform: none !important;
-   top: auto !important;
-   bottom: 1rem !important;
-   left: 1rem !important;
-   right: auto !important;
- }
- ```
- 
- ## Keep it out of production builds
- 
- The element has no production guard of its own, so exclude it in the same place
- you mount it. `@defer (when isDev)` compiles the component and its
- `@copilotkit/web-inspector` import into a lazy chunk, and `isDevMode()` returns
- `false` in a production build, so that chunk is never requested. Removing the
- component and its `<app-web-inspector />` usage removes the Inspector entirely.
- 
- ## Server rendering
- 
- `afterNextRender` runs only in the browser, so the element is never created
- during a server render. The deferred import also keeps the package out of the
- server bundle. Both matter: the web component registers itself against
- `customElements`, which does not exist on the server.
- 
- ## Clean up on destroy
- 
- The element lives in `document.body`, outside the component's own view, so
- Angular does not remove it. `DestroyRef.onDestroy` removes it explicitly.
- Without that cleanup, a route change that destroys the component leaves an
- orphaned panel bound to a core the application no longer uses.
- 
- ## Next steps
- 
- - [Troubleshooting Angular apps](/angular/agno/guides/troubleshooting)
- - [AG-UI Event Inspector](/angular/agno/troubleshooting/event-inspector)
- - [Angular API: CopilotKit](/reference/angular/services/CopilotKit)
+ # Inspector
+ 
+ > Mount the CopilotKit Inspector in an Angular application and keep it out of production builds.
+ 
+ The Inspector is a debugging overlay for the live connection between your Angular
+ application and your agents. It opens from a floating launcher and reports what
+ the application and the runtime exchange as a run happens.
+ 
+ Its navigation has three groups — **Threads**, **Agents**, and **Learning** — and
+ opens on Threads, whose contents depend on the runtime's license state. The
+ agent-debugging views sit under Agents:
+ 
+ | View                 | What it shows                                                        |
+ | -------------------- | -------------------------------------------------------------------- |
+ | **AG-UI Events**     | The raw event stream between your application and the agent.          |
+ | **Available Agents** | The agents the runtime advertises to your application.                |
+ | **Agent State**      | The selected agent's state as it updates.                             |
+ | **Frontend Tools**   | The tools you registered, with their parameter schemas.               |
+ | **Context**          | The context you sent to the agent, including readables and documents. |
+ 
+ ## Mount the element
+ 
+ The Inspector is `cpk-web-inspector`, a framework-agnostic web component in
+ `@copilotkit/web-inspector`. `@copilotkit/angular` does not depend on that
+ package and does not mount the element, so an Angular application creates it and
+ supplies the core itself.
+ 
+ Install the package as a dev dependency to keep it out of your production
+ dependency graph:
+ 
+ ```bash
+ npm install --save-dev @copilotkit/web-inspector
+ ```
+ 
+ Add a component that owns the element's lifecycle. It reuses an existing element
+ or creates one after the first browser render, supplies the core, appends the
+ element to `document.body`, and removes it when the component is destroyed:
+ 
+ ```ts title="src/app/web-inspector.ts"
+ import { afterNextRender, Component, DestroyRef, inject } from "@angular/core";
+ import { CopilotKit } from "@copilotkit/angular";
+ import { WEB_INSPECTOR_TAG } from "@copilotkit/web-inspector";
+ import type { WebInspectorElement } from "@copilotkit/web-inspector";
+ 
+ @Component({
+   selector: "app-web-inspector",
+   template: "",
+ })
+ export class WebInspector {
+   readonly #copilotKit = inject(CopilotKit);
+   readonly #destroyRef = inject(DestroyRef);
+ 
+   constructor() {
+     afterNextRender(() => {
+       const existing =
+         document.querySelector<WebInspectorElement>(WEB_INSPECTOR_TAG);
+       const inspector =
+         existing ??
+         (document.createElement(WEB_INSPECTOR_TAG) as WebInspectorElement);
+ 
+       // Supply the application's core instead of letting the element find one.
+       inspector.core = this.#copilotKit.core;
+       inspector.setAttribute("auto-attach-core", "false");
+ 
+       if (!existing) {
+         document.body.appendChild(inspector);
+       }
+ 
+       this.#destroyRef.onDestroy(() => {
+         if (inspector.isConnected) {
+           inspector.remove();
+         }
+       });
+     });
+   }
+ }
+ ```
+ 
+ Render the component once, from the root component, behind a development-only
+ `@defer`:
+ 
+ ```ts title="src/app/app.ts"
+ import { Component, isDevMode } from "@angular/core";
+ import { WebInspector } from "./web-inspector";
+ 
+ @Component({
+   selector: "app-root",
+   imports: [WebInspector],
+   template: `
+     <!-- your application -->
+ 
+     @defer (when isDev) {
+       <app-web-inspector />
+     }
+   `,
+ })
+ export class App {
+   protected readonly isDev = isDevMode();
+ }
+ ```
+ 
+ ## Supply the application's core
+ 
+ `inspector.core = copilotKit.core` is what makes the Inspector report your
+ application rather than show an empty panel. Without an assigned core, the
+ element searches development globals such as `window.__COPILOTKIT_CORE__` for
+ one. Setting `auto-attach-core="false"` disables that search, so the element
+ observes the core you assigned and nothing else.
+ 
+ Assign `core` directly. It is a property, not an attribute, and
+ `auto-attach-core` is the only attribute the element observes.
+ 
+ ## Position the launcher
+ 
+ The launcher defaults to the top-right corner, and the element positions itself
+ with an inline transform. Override both from your global stylesheet. A
+ bottom-left corner keeps the launcher clear of the close button on a chat panel
+ or sidebar:
+ 
+ ```css title="src/styles.css"
+ cpk-web-inspector {
+   /* The panel is draggable and sets an inline transform. Neutralize it before
+      choosing a corner. */
+   transform: none !important;
+   top: auto !important;
+   bottom: 1rem !important;
+   left: 1rem !important;
+   right: auto !important;
+ }
+ ```
+ 
+ ## Keep it out of production builds
+ 
+ The element has no production guard of its own, so exclude it in the same place
+ you mount it. `@defer (when isDev)` compiles the component and its
+ `@copilotkit/web-inspector` import into a lazy chunk, and `isDevMode()` returns
+ `false` in a production build, so that chunk is never requested. Removing the
+ component and its `<app-web-inspector />` usage removes the Inspector entirely.
+ 
+ ## Server rendering
+ 
+ `afterNextRender` runs only in the browser, so the element is never created
+ during a server render. The deferred import also keeps the package out of the
+ server bundle. Both matter: the web component registers itself against
+ `customElements`, which does not exist on the server.
+ 
+ ## Clean up on destroy
+ 
+ The element lives in `document.body`, outside the component's own view, so
+ Angular does not remove it. `DestroyRef.onDestroy` removes it explicitly.
+ Without that cleanup, a route change that destroys the component leaves an
+ orphaned panel bound to a core the application no longer uses.
+ 
+ ## Next steps
+ 
+ - [Troubleshooting Angular apps](/angular/agno/guides/troubleshooting)
+ - [AG-UI Event Inspector](/angular/agno/troubleshooting/event-inspector)
+ - [Angular API: CopilotKit](/reference/angular/services/CopilotKit)
  
````

**Medium — CopilotKit Intelligence**

`/angular/agno/premium/overview` · under “Can I start cloud-hosted and move to self-hosted later?”

0 code lines, 150 prose lines changed.

````diff
- # Enterprise Intelligence Platform
- 
- > Enterprise Intelligence Platform overview for CopilotKit — features, cloud-hosted and self-hosted deployment options, threads, hosted inspection, and production operations.
- 
- 
- 
- ## What is the Enterprise Intelligence Platform?
- 
- The Enterprise Intelligence Platform is CopilotKit's production layer for durable threads, persistence, hosted inspection, and operational visibility. It sits beside your CopilotKit runtime and gives production agentic applications shared infrastructure without changing the frontend SDK, AG-UI protocol, or agent framework you use.
- 
- Start here when you are deciding what the platform gives you and where it should run. The rest of the Intelligence Platform docs are deeper dives into the specific feature or hosting path you choose.
- 
- <Callout type="info" title="See this in Inspector">
-   Open Inspector on localhost. Go to **Learning**.
-   Memory and learning tools for this session appear here.
- 
-   More detail: [Inspector](/angular/agno/inspector).
- </Callout>
- 
- 
- ## What the platform adds
- 
- | Capability | What it gives you | Deeper dive |
- |---|---|---|
- | Durable threads and persistence | Resumable conversations that survive reloads, devices, and browser sessions. | [Threads](/angular/agno/guides/threads-memory-attachments-headless) and [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
- | Cloud-hosted Intelligence features | Projects, project API keys, conversation history, thread inspection, and plan management. | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) |
- | Premium UI capabilities | Platform-gated UI surfaces such as Fully Headless Chat UI. | [Fully Headless Chat UI](/angular/agno/guides/threads-memory-attachments-headless) |
- | Self-hosting | The same platform running inside your own Kubernetes cluster, VPC, or data boundary. | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) |
- 
- ## Hosting options
- 
- | Option | Choose it when | What you operate |
- |---|---|---|
- | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) | You want CopilotKit to run the platform for you: hosted projects, API keys, thread history, dashboard inspection, and plan management. | Your app, your runtime, your agent, and your model provider credentials. |
- | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) | You need the platform inside your own VPC, Kubernetes cluster, data residency boundary, or enterprise operations model. | The `copilot-intelligence` Helm release, Postgres, Redis, ingress, OIDC, secrets, upgrades, and monitoring. |
- 
- Both options use the same CopilotKit application surface. Your frontend still uses CopilotKit APIs, your runtime still speaks AG-UI, and your agents keep the same framework integration. The deployment choice changes the platform endpoint and credentials your runtime uses.
- 
- ## Plans and access
- 
- The cloud-hosted version includes self-service plans for individual developers and teams, plus enterprise options for larger deployments. You manage cloud-hosted plans in the web app.
- 
- Self-hosted access is available on the Team self-hosted plan or a custom Enterprise plan. Use it when you have a concrete compliance, residency, network, or platform-operations requirement that makes a hosted service the wrong fit.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Create a free Enterprise Intelligence Platform account"
-   body="Start with the cloud-hosted Developer tier, create a project, and inspect persistent threads from the web app."
-   surface="docs_premium_overview"
- />
- 
- ## Which page should I read next?
- 
- | Goal | Read this |
- |---|---|
- | Decide what the platform includes | Stay on this overview. |
- | Connect an app to hosted projects and API keys | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) |
- | Run the platform in your own cluster | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) |
- | Understand the runtime/platform architecture | [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) |
- | Add persistent conversations to an app | [Threads](/angular/agno/guides/threads-memory-attachments-headless) |
- | Understand thread replay and realtime sync | [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
- 
- ## FAQs
- 
- ### Does my application code change between hosting options?
- 
- No. Your frontend UI, CopilotKit runtime, and agent integration stay focused on CopilotKit APIs. The deployment mode changes which platform URL and credentials your runtime uses.
- 
- ### What is the difference between a project API key and a license key?
- 
- A project API key connects your runtime to one cloud-hosted Enterprise Intelligence project. A license key unlocks self-hosted Enterprise Intelligence capabilities and does not require runtime traffic to go through the cloud-hosted service.
- 
- ### Can I start cloud-hosted and move to self-hosted later?
- 
- Yes. The application integration is intentionally the same. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan. Plan the migration around data movement, identity, network endpoints, and operational ownership rather than a frontend rewrite.
+ # CopilotKit Intelligence
+ 
+ > CopilotKit Intelligence overview for CopilotKit — features, cloud-hosted and self-hosted deployment options, threads, hosted inspection, and production operations.
+ 
+ 
+ 
+ ## What is CopilotKit Intelligence?
+ 
+ CopilotKit Intelligence is CopilotKit's production layer for durable threads, persistence, hosted inspection, and operational visibility. It sits beside your CopilotKit runtime and gives production agentic applications shared infrastructure without changing the frontend SDK, AG-UI protocol, or agent framework you use.
+ 
+ Start here when you are deciding what the platform gives you and where it should run. The rest of the Intelligence docs are deeper dives into the specific feature or hosting path you choose.
+ 
+ <Callout type="info" title="See this in Inspector">
+   Open Inspector on localhost. Go to **Learning**.
+   Memory and learning tools for this session appear here.
+ 
+   More detail: [Inspector](/angular/agno/inspector).
+ </Callout>
+ 
+ 
+ ## What the platform adds
+ 
+ | Capability | What it gives you | Deeper dive |
+ |---|---|---|
+ | Durable threads and persistence | Resumable conversations that survive reloads, devices, and browser sessions. | [Threads](/angular/agno/guides/threads-memory-attachments-headless) and [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
+ | Cloud-hosted Intelligence features | Projects, project API keys, conversation history, thread inspection, and plan management. | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) |
+ | Premium UI capabilities | Platform-gated UI surfaces such as Fully Headless Chat UI. | [Fully Headless Chat UI](/angular/agno/guides/threads-memory-attachments-headless) |
+ | Self-hosting | The same platform running inside your own Kubernetes cluster, VPC, or data boundary. | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) |
+ 
+ ## Hosting options
+ 
+ | Option | Choose it when | What you operate |
+ |---|---|---|
+ | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) | You want CopilotKit to run the platform for you: hosted projects, API keys, thread history, dashboard inspection, and plan management. | Your app, your runtime, your agent, and your model provider credentials. |
+ | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) | You need the platform inside your own VPC, Kubernetes cluster, data residency boundary, or enterprise operations model. | The `copilot-intelligence` Helm release, Postgres, Redis, ingress, OIDC, secrets, upgrades, and monitoring. |
+ 
+ Both options use the same CopilotKit application surface. Your frontend still uses CopilotKit APIs, your runtime still speaks AG-UI, and your agents keep the same framework integration. The deployment choice changes the platform endpoint and credentials your runtime uses.
+ 
+ ## Plans and access
+ 
+ The cloud-hosted version includes self-service plans for individual developers and teams, plus the Enterprise Intelligence tier for larger deployments. You manage cloud-hosted plans in the web app.
+ 
+ Self-hosted access is available on the Team self-hosted plan or a custom Enterprise plan. Use it when you have a concrete compliance, residency, network, or platform-operations requirement that makes a hosted service the wrong fit.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Create a free CopilotKit Intelligence account"
+   body="Start with the cloud-hosted Developer tier, create a project, and inspect persistent threads from the web app."
+   surface="docs_premium_overview"
+ />
+ 
+ ## Which page should I read next?
+ 
+ | Goal | Read this |
+ |---|---|
+ | Decide what the platform includes | Stay on this overview. |
+ | Connect an app to hosted projects and API keys | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) |
+ | Run the platform in your own cluster | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) |
+ | Understand the runtime/platform architecture | [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) |
+ | Add persistent conversations to an app | [Threads](/angular/agno/guides/threads-memory-attachments-headless) |
+ | Understand thread replay and realtime sync | [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
+ 
+ ## FAQs
+ 
+ ### Does my application code change between hosting options?
+ 
+ No. Your frontend UI, CopilotKit runtime, and agent integration stay focused on CopilotKit APIs. The deployment mode changes which platform URL and credentials your runtime uses.
+ 
+ ### What is the difference between a project API key and a license key?
+ 
+ A project API key connects your runtime to one cloud-hosted CopilotKit Intelligence project. A license key unlocks self-hosted CopilotKit Intelligence capabilities and does not require runtime traffic to go through the cloud-hosted service.
+ 
+ ### Can I start cloud-hosted and move to self-hosted later?
+ 
+ Yes. The application integration is intentionally the same. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan. Plan the migration around data movement, identity, network endpoints, and operational ownership rather than a frontend rewrite.
  
````

**Medium — Cloud-hosted CopilotKit Intelligence**

`/angular/agno/premium/managed-intelligence-platform` · under “Next steps”

0 code lines, 252 prose lines changed.

````diff
- # Cloud-Hosted Enterprise Intelligence
- 
- > How the cloud-hosted version of the CopilotKit Enterprise Intelligence Platform works — login, organizations, projects, project API keys, conversation history, thread inspection, and plan management.
- 
- Cloud-Hosted Enterprise Intelligence is the CopilotKit-operated deployment of the same Enterprise Intelligence Platform you can also self-host. Use it when you want durable threads, project-scoped API keys, conversation history, the hosted web app, and plan management without operating Kubernetes infrastructure.
- 
- ![The Cloud-Hosted Enterprise Intelligence ready page with starter commands and project navigation.](/angular/agno/images/enterprise-intelligence/managed-ready.png)
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start hosted onboarding"
-   body="Sign up or sign in, finish organization onboarding, then return to the CLI or hosted app to select a project."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_premium_managed_intelligence_platform_intro"
- />
- 
- ## What the cloud-hosted version provides
- 
- The cloud-hosted version runs the Enterprise Intelligence Platform for you. Your application keeps using the CopilotKit SDK and runtime APIs, while the hosted service stores project-scoped platform data: threads, events, runtime connection metadata, and API keys.
- 
- The hosted web app is the control surface for developers and administrators. End users of your application do not sign in to this dashboard. Your app still controls end-user identity and passes user context through the runtime, while the hosted service scopes stored threads to the project your app is connected to.
- 
- Use Cloud-Hosted Enterprise Intelligence when you want the fastest path to production. Use [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) when your organization needs the platform inside its own VPC, cluster, or data boundary.
- 
- ## Hosted onboarding
- 
- Start at [dashboard.operations.copilotkit.ai](https://dashboard.operations.copilotkit.ai) or in the CopilotKit CLI.
- 
- <Steps>
-   <Step>
-     ### Sign up or sign in
- 
-     During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
-   </Step>
- 
-   <Step>
-     ### Select or create an organization
- 
-     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
-   </Step>
- 
-   <Step>
-     ### Continue where you started
- 
-     After organization onboarding, the browser resumes the exact CLI or hosted-app destination that sent you there. If the CLI opened the browser, return to the terminal and let the original command continue.
-   </Step>
- 
-   <Step>
-     ### Select or create a project
- 
-     The resumed CLI or hosted app asks you to choose the project that will hold your app's threads, events, runtime connection metadata, and API keys, or create a new one. In the dashboard, the ready page offers two common paths:
- 
-     - `npx copilotkit@latest create` for a new app.
-     - `npx copilotkit@latest skills onboard` for adding CopilotKit to an existing app with agent-assisted onboarding.
-   </Step>
- </Steps>
- 
- The [CopilotKit CLI](/angular/agno/cli) uses the same sign-in system. When the CLI needs dashboard access, it opens a browser login flow and then stores a local CLI session so project selection can happen from your terminal.
- 
- ## Projects
- 
- A project is the cloud-hosted boundary for one app or environment. Create separate projects for production, staging, demos, and experiments so their API keys and conversation history stay separate.
- 
- ![The Cloud-Hosted Enterprise Intelligence project list.](/angular/agno/images/enterprise-intelligence/managed-projects.png)
- 
- Inside a project, the web app shows the conversation history connected to that project. Each thread row shows the thread name, agent, and active or archived status.
- 
- ![A Cloud-Hosted Enterprise Intelligence project showing conversation history.](/angular/agno/images/enterprise-intelligence/managed-project-thread-list.png)
- 
- ## API keys
- 
- Project API keys connect your runtime to the cloud-hosted project. The CLI provisions a project-scoped key during `create` and `project select`, writes it to `.env` as `INTELLIGENCE_API_KEY`, and records the selected project in `.copilotkit/project.json`.
- 
- ![The Cloud-Hosted Enterprise Intelligence API keys page.](/angular/agno/images/enterprise-intelligence/managed-api-keys.png)
- 
- When you create an API key in the web app, the plaintext token is shown once. Store it in your runtime environment, not in frontend code. Deleting a key invalidates any application still using it.
- 
- ## Threads and conversation history
- 
- Threads are persistent conversations stored by the Enterprise Intelligence Platform. In the hosted web app, you can open a thread to inspect the agent, app user, status, update time, and recorded event timeline.
- 
- ![A Cloud-Hosted Enterprise Intelligence thread detail page with metadata and event history.](/angular/agno/images/enterprise-intelligence/managed-thread-detail.png)
- 
- Thread actions map to the same lifecycle your app sees through its
- thread-management API:
- 
- - Rename changes the display name.
- - Archive hides the thread from the active list without deleting its history.
- - Delete permanently removes the thread.
- 
- Use the thread detail page when you need to debug persistence, confirm that a runtime is writing events, or inspect the event sequence behind a conversation. Raw event payloads are available from the event disclosures when you need deeper debugging.
- 
- ## Plan management
- 
- The pricing page is where you inspect your current plan, manage billing, compare tiers, and see plan limits such as thread retention, maximum thread count, multimodal storage, cloud hosting, and self-hosting availability.
- 
- ![The Cloud-Hosted Enterprise Intelligence plan management page.](/angular/agno/images/enterprise-intelligence/managed-pricing.png)
- 
- Some capabilities may appear in the dashboard as early access. Those capabilities follow the early-access program and are not covered on this page.
- 
- ## Cloud-hosted vs. self-hosted
- 
- <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
-   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
- </Callout>
- 
- | Choose this | When |
- |---|---|
- | Cloud-Hosted Enterprise Intelligence | You want hosted projects, managed API keys, conversation history, thread inspection, and plan management without running platform infrastructure. |
- | Self-hosted Enterprise Intelligence Platform | You need the same platform inside your own Kubernetes cluster for residency, compliance, network isolation, or enterprise operations requirements. |
- 
- Your application code should stay focused on the CopilotKit frontend SDK and
- runtime. The deployment mode changes which platform endpoint and credentials
- your runtime uses, not how the frontend lists threads or renders chat. Moving
- from cloud-hosted projects to self-hosting requires the Team Self-hosted plan
- or a custom Enterprise plan. That purchase does not replace the identity system
- in a customer-run deployment.
- 
- ## Next steps
- 
- - **Explore Rich Threads:** [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) — understand persistent, resumable conversations and choose an implementation path
- - **Use the CLI:** [CopilotKit CLI](/angular/agno/cli) — sign in, scaffold apps, select cloud-hosted projects, and write project configuration
- - **Add threads:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — list, create, rename, archive, and delete persistent conversations in a custom UI
- - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
- - **Self-host the platform:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — install and operate the Helm chart in your own cluster
+ # Cloud-hosted CopilotKit Intelligence
+ 
+ > How the cloud-hosted version of CopilotKit Intelligence works — login, organizations, projects, project API keys, conversation history, thread inspection, and plan management.
+ 
+ Cloud-hosted CopilotKit Intelligence is the CopilotKit-operated deployment of the same CopilotKit Intelligence you can also self-host. Use it when you want durable threads, project-scoped API keys, conversation history, the hosted web app, and plan management without operating Kubernetes infrastructure.
+ 
+ ![The cloud-hosted CopilotKit Intelligence ready page with starter commands and project navigation.](/angular/agno/images/enterprise-intelligence/managed-ready.png)
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start hosted onboarding"
+   body="Sign up or sign in, finish organization onboarding, then return to the CLI or hosted app to select a project."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_premium_managed_intelligence_platform_intro"
+ />
+ 
+ ## What the cloud-hosted version provides
+ 
+ The cloud-hosted version runs CopilotKit Intelligence for you. Your application keeps using the CopilotKit SDK and runtime APIs, while the hosted service stores project-scoped platform data: threads, events, runtime connection metadata, and API keys.
+ 
+ The hosted web app is the control surface for developers and administrators. End users of your application do not sign in to this dashboard. Your app still controls end-user identity and passes user context through the runtime, while the hosted service scopes stored threads to the project your app is connected to.
+ 
+ Use cloud-hosted CopilotKit Intelligence when you want the fastest path to production. Use [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) when your organization needs the platform inside its own VPC, cluster, or data boundary.
+ 
+ ## Hosted onboarding
+ 
+ Start at [dashboard.operations.copilotkit.ai](https://dashboard.operations.copilotkit.ai) or in the CopilotKit CLI.
+ 
+ <Steps>
+   <Step>
+     ### Sign up or sign in
+ 
+     During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
+   </Step>
+ 
+   <Step>
+     ### Select or create an organization
+ 
+     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
+   </Step>
+ 
+   <Step>
+     ### Continue where you started
+ 
+     After organization onboarding, the browser resumes the exact CLI or hosted-app destination that sent you there. If the CLI opened the browser, return to the terminal and let the original command continue.
+   </Step>
+ 
+   <Step>
+     ### Select or create a project
+ 
+     The resumed CLI or hosted app asks you to choose the project that will hold your app's threads, events, runtime connection metadata, and API keys, or create a new one. In the dashboard, the ready page offers two common paths:
+ 
+     - `npx copilotkit@latest create` for a new app.
+     - `npx copilotkit@latest skills onboard` for adding CopilotKit to an existing app with agent-assisted onboarding.
+   </Step>
+ </Steps>
+ 
+ The [CopilotKit CLI](/angular/agno/cli) uses the same sign-in system. When the CLI needs dashboard access, it opens a browser login flow and then stores a local CLI session so project selection can happen from your terminal.
+ 
+ ## Projects
+ 
+ A project is the cloud-hosted boundary for one app or environment. Create separate projects for production, staging, demos, and experiments so their API keys and conversation history stay separate.
+ 
+ ![The cloud-hosted CopilotKit Intelligence project list.](/angular/agno/images/enterprise-intelligence/managed-projects.png)
+ 
+ Inside a project, the web app shows the conversation history connected to that project. Each thread row shows the thread name, agent, and active or archived status.
+ 
+ ![A cloud-hosted CopilotKit Intelligence project showing conversation history.](/angular/agno/images/enterprise-intelligence/managed-project-thread-list.png)
+ 
+ ## API keys
+ 
+ Project API keys connect your runtime to the cloud-hosted project. The CLI provisions a project-scoped key during `create` and `project select`, writes it to `.env` as `INTELLIGENCE_API_KEY`, and records the selected project in `.copilotkit/project.json`.
+ 
+ ![The cloud-hosted CopilotKit Intelligence API keys page.](/angular/agno/images/enterprise-intelligence/managed-api-keys.png)
+ 
+ When you create an API key in the web app, the plaintext token is shown once. Store it in your runtime environment, not in frontend code. Deleting a key invalidates any application still using it.
+ 
+ ## Threads and conversation history
+ 
+ Threads are persistent conversations stored by CopilotKit Intelligence. In the hosted web app, you can open a thread to inspect the agent, app user, status, update time, and recorded event timeline.
+ 
+ ![A cloud-hosted CopilotKit Intelligence thread detail page with metadata and event history.](/angular/agno/images/enterprise-intelligence/managed-thread-detail.png)
+ 
+ Thread actions map to the same lifecycle your app sees through its
+ thread-management API:
+ 
+ - Rename changes the display name.
+ - Archive hides the thread from the active list without deleting its history.
+ - Delete permanently removes the thread.
+ 
+ Use the thread detail page when you need to debug persistence, confirm that a runtime is writing events, or inspect the event sequence behind a conversation. Raw event payloads are available from the event disclosures when you need deeper debugging.
+ 
+ ## Plan management
+ 
+ The pricing page is where you inspect your current plan, manage billing, compare tiers, and see plan limits such as thread retention, maximum thread count, multimodal storage, cloud hosting, and self-hosting availability.
+ 
+ ![The cloud-hosted CopilotKit Intelligence plan management page.](/angular/agno/images/enterprise-intelligence/managed-pricing.png)
+ 
+ Some capabilities may appear in the dashboard as early access. Those capabilities follow the early-access program and are not covered on this page.
+ 
+ ## Cloud-hosted vs. self-hosted
+ 
+ <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
+   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
+ </Callout>
+ 
+ | Choose this | When |
+ |---|---|
+ | cloud-hosted CopilotKit Intelligence | You want hosted projects, managed API keys, conversation history, thread inspection, and plan management without running platform infrastructure. |
+ | Self-hosted CopilotKit Intelligence | You need the same platform inside your own Kubernetes cluster for residency, compliance, network isolation, or enterprise operations requirements. |
+ 
+ Your application code should stay focused on the CopilotKit frontend SDK and
+ runtime. The deployment mode changes which platform endpoint and credentials
+ your runtime uses, not how the frontend lists threads or renders chat. Moving
+ from cloud-hosted projects to self-hosting requires the Team Self-hosted plan
+ or a custom Enterprise plan. That purchase does not replace the identity system
+ in a customer-run deployment.
+ 
+ ## Next steps
+ 
+ - **Explore Rich Threads:** [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) — understand persistent, resumable conversations and choose an implementation path
+ - **Use the CLI:** [CopilotKit CLI](/angular/agno/cli) — sign in, scaffold apps, select cloud-hosted projects, and write project configuration
+ - **Add threads:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — list, create, rename, archive, and delete persistent conversations in a custom UI
+ - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
+ - **Self-host the platform:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — install and operate the Helm chart in your own cluster
  
````

**High — Connect your runtime to Intelligence**

`/angular/agno/premium/connect-your-runtime` · under “Troubleshooting”

75 code lines, 140 prose lines changed.

````diff
- # Connect your runtime to Intelligence
- 
- > Wire an existing CopilotKit runtime to the Enterprise Intelligence Platform — construct CopilotKitIntelligence with a project API key, identify users, and confirm the credential is actually being used.
- 
- Connecting a runtime to Intelligence takes two things: construct a
- `CopilotKitIntelligence` client with your project API key, and pass it to your
- runtime as `intelligence`. The runtime reads the key from the client you pass,
- not from the environment.
- 
- This page is that wiring step. For what the platform is and why you would use it,
- see the [Enterprise Intelligence Platform overview](/angular/agno/premium/overview) and the
- [architecture page](/angular/agno/premium/intelligence-platform).
- 
- ## Before you start
- 
- You need a project API key. Either provision one with the CLI:
- 
- ```bash title="Terminal"
- npx copilotkit login
- npx copilotkit project select
- ```
- 
- `project select` writes a project-scoped key to `.env` as `INTELLIGENCE_API_KEY`.
- You can also copy a key from the
- [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform).
- 
- ```bash title=".env"
- INTELLIGENCE_API_KEY=cpk-...
- ```
- 
- <Callout type="warn">
-   This is a server-side secret. Do not give it a `NEXT_PUBLIC_` or `VITE_`
-   prefix — that ships it to the browser.
- </Callout>
- 
- ## Wire the runtime
- 
- Construct the client once and pass it to `CopilotRuntime` as `intelligence`.
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- import {
-   CopilotRuntime,
-   CopilotKitIntelligence,
-   createCopilotRuntimeHandler,
- } from "@copilotkit/runtime/v2";
- 
- const intelligence = new CopilotKitIntelligence({
-   // apiUrl and wsUrl default to the managed platform — leave them unset.
-   apiKey: process.env.INTELLIGENCE_API_KEY!,
- });
- 
- const runtime = new CopilotRuntime({
-   agents,
-   intelligence,
-   // Threads are per-user. Without this every visitor shares one history.
-   identifyUser: (request) => ({
-     id: request.headers.get("x-user-id") ?? "anonymous",
-   }),
- });
- 
- export const { GET, POST } = createCopilotRuntimeHandler({ runtime });
- ```
- 
- `apiKey` is the only required field. The key scopes the project, so there is no
- separate organization or project id to pass.
- 
- ## Confirm the credential is actually used
- 
- A build that compiles and a chat that replies both prove nothing about
- Intelligence — a runtime in SSE mode does all of that with the key unread. So a
- green round trip in the browser is not evidence on its own.
- 
- Confirm it from the product side instead. Open your project in the
- [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform) and send a
- message in your app. A thread should appear. If none does, the runtime never
- reached the platform and is running in SSE mode, whatever the browser showed.
- 
- ## Self-hosted deployments
- 
- `apiUrl` and `wsUrl` default to the managed platform. Override them **together**
- or not at all — the API and realtime planes are deployed on different hosts, so
- the websocket URL cannot be derived from the API URL, and setting one alone
- leaves the other plane pointed at the managed host.
- 
- ```ts
- const intelligence = new CopilotKitIntelligence({
-   apiUrl: "https://api.intelligence.internal",
-   wsUrl: "wss://realtime.intelligence.internal",
-   apiKey: process.env.INTELLIGENCE_API_KEY!,
- });
- ```
- 
- Pass the bare websocket base: the client appends `/runner` and `/client` itself,
- and prepends `/api` to every REST call. Passing `apiUrl: ".../api"` produces
- double-prefixed `/api/api/threads`.
- 
- See [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) for the full
- deployment path.
- 
- ## Troubleshooting
- 
- | Symptom | Cause |
- | --- | --- |
- | Chat works, no threads in the dashboard | `intelligence` was never passed to `CopilotRuntime`; the runtime is in SSE mode. |
- | Opaque auth error on the first request | `INTELLIGENCE_API_KEY` is empty or belongs to a different project. |
- | Socket sits in `connecting`, then "did not settle in time" | `wsUrl` overridden alone, or pointed at the API host. |
- | `/api/api/...` in request logs | `apiUrl` included a `/api` suffix. |
+ # Connect your runtime to Intelligence
+ 
+ > Wire an existing CopilotKit runtime to CopilotKit Intelligence — construct CopilotKitIntelligence with a project API key, identify users, and confirm the credential is actually being used.
+ 
+ Connecting a runtime to Intelligence takes two things: construct a
+ `CopilotKitIntelligence` client with your project API key, and pass it to your
+ runtime as `intelligence`. The runtime reads the key from the client you pass,
+ not from the environment.
+ 
+ This page is that wiring step. For what the platform is and why you would use it,
+ see the [CopilotKit Intelligence overview](/angular/agno/premium/overview) and the
+ [architecture page](/angular/agno/premium/intelligence-platform).
+ 
+ ## Before you start
+ 
+ You need a project API key. Either provision one with the CLI:
+ 
+ ```bash title="Terminal"
+ npx copilotkit login
+ npx copilotkit project select
+ ```
+ 
+ `project select` writes a project-scoped key to `.env` as `INTELLIGENCE_API_KEY`.
+ You can also copy a key from the
+ [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform).
+ 
+ ```bash title=".env"
+ INTELLIGENCE_API_KEY=cpk-...
+ ```
+ 
+ <Callout type="warn">
+   This is a server-side secret. Do not give it a `NEXT_PUBLIC_` or `VITE_`
+   prefix — that ships it to the browser.
+ </Callout>
+ 
+ ## Wire the runtime
+ 
+ Construct the client once and pass it to `CopilotRuntime` as `intelligence`.
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ import {
+   CopilotRuntime,
+   CopilotKitIntelligence,
+   createCopilotRuntimeHandler,
+ } from "@copilotkit/runtime/v2";
+ 
+ const intelligence = new CopilotKitIntelligence({
+   // apiUrl and wsUrl default to the managed platform — leave them unset.
+   apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ 
+ const runtime = new CopilotRuntime({
+   agents,
+   intelligence,
+   // Threads are per-user. Without this every visitor shares one history.
+   identifyUser: (request) => ({
+     id: request.headers.get("x-user-id") ?? "anonymous",
+     name: request.headers.get("x-user-name") ?? "Anonymous",
+   }),
+ });
+ 
+ export const { GET, POST } = createCopilotRuntimeHandler({ runtime });
+ ```
+ 
+ `apiKey` is the only required field. The key scopes the project, so there is no
+ separate organization or project id to pass.
+ 
+ ## Confirm the credential is actually used
+ 
+ A build that compiles and a chat that replies both prove nothing about
+ Intelligence — a runtime in SSE mode does all of that with the key unread. So a
+ green round trip in the browser is not evidence on its own.
+ 
+ Confirm it from the product side instead. Open your project in the
+ [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform) and send a
+ message in your app. A thread should appear. If none does, the runtime never
+ reached the platform and is running in SSE mode, whatever the browser showed.
+ 
+ ## Self-hosted deployments
+ 
+ `apiUrl` and `wsUrl` default to the managed platform. Override them **together**
+ or not at all — the API and realtime planes are deployed on different hosts, so
+ the websocket URL cannot be derived from the API URL, and setting one alone
+ leaves the other plane pointed at the managed host.
+ 
+ ```ts
+ const intelligence = new CopilotKitIntelligence({
+   apiUrl: "https://api.intelligence.internal",
+   wsUrl: "wss://realtime.intelligence.internal",
+   apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ ```
+ 
+ Pass the bare websocket base: the client appends `/runner` and `/client` itself,
+ and prepends `/api` to every REST call. Passing `apiUrl: ".../api"` produces
+ double-prefixed `/api/api/threads`.
+ 
+ See [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) for the full
+ deployment path.
+ 
+ ## Troubleshooting
+ 
+ | Symptom | Cause |
+ | --- | --- |
+ | Chat works, no threads in the dashboard | `intelligence` was never passed to `CopilotRuntime`; the runtime is in SSE mode. |
+ | Opaque auth error on the first request | `INTELLIGENCE_API_KEY` is empty or belongs to a different project. |
+ | Socket sits in `connecting`, then "did not settle in time" | `wsUrl` overridden alone, or pointed at the API host. |
+ | `/api/api/...` in request logs | `apiUrl` included a `/api` suffix. |
  
````

**High — Self-host CopilotKit Intelligence**

`/angular/agno/premium/self-hosting` · under “Next steps”

6 code lines, 1136 prose lines changed.

````diff
- # Self-Hosting Enterprise Intelligence
- 
- > Deploy the CopilotKit Enterprise Intelligence Platform to your own Kubernetes cluster with the copilot-intelligence Helm chart — install, configure, and operate the app-api, app-frontend, and realtime-gateway services with your own Postgres, Redis, ingress, and OIDC provider.
- 
- 
- ## What is this?
- 
- Enterprise Intelligence — the platform that powers threads, shared state, and the inspector — can be self-hosted on your own Kubernetes cluster using the `copilot-intelligence` Helm chart. You run the control plane and data plane inside your own network boundary; the chart leaves you in charge of identity, storage, and secrets.
- 
- **What you bring:**
- 
- - Postgres and Redis — your own, or the bundled Bitnami subcharts
- - An OIDC provider for identity
- - Secrets via External Secrets Operator, direct Kubernetes Secrets, or chart-managed credentials
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Planning a self-hosted Enterprise Intelligence deployment?"
-   body="Self-hosting is available on the Team self-hosted plan or a custom Enterprise plan for VPC, on-prem, and data-residency deployments."
-   ctaLabel="Talk to an engineer"
-   surface="docs_premium_self_hosting_intro"
-   href="https://copilotkit.ai/talk-to-an-engineer"
-   analyticsEvent="talk_to_us_clicked"
- />
- 
- **What the chart deploys:**
- 
- | Component | Role | Port |
- |---|---|---|
- | `app-api` | Backend service | 4201 |
- | `app-frontend` | Web UI | 8080 |
- | `realtime-gateway` *(optional)* | WebSocket service for realtime sync | 4401 |
- 
- Plus a `database-migrations` Job, a `thread-culler` CronJob, and the usual supporting resources (Services, Ingress, HPAs, PodDisruptionBudgets, ConfigMaps, and — when ESO is enabled — ExternalSecret resources).
- 
- ## When should I use this?
- 
- - Your organization requires Enterprise Intelligence to run inside your own VPC or data center for compliance, data residency, or security reasons
- - You want to connect Enterprise Intelligence to internal databases, identity providers, or secret stores that are not reachable from the cloud-hosted version
- - You need to operate the platform under your existing Kubernetes tooling, CI/CD, and monitoring stack
- - You have an Enterprise Intelligence Platform license and the platform-engineering capacity to run a production Kubernetes workload
- 
- <Callout type="info" title="Validate locally before committing to a real cluster">
- The chart installs the same way against a local Docker Desktop or k3d cluster as against a production one, so walk this guide end-to-end on your laptop first. Two local paths are supported:
- 
- - **Bundled overlay** — install with the `values-quickstart-local.yaml` overlay shipped in the chart. It enables in-cluster Postgres, Redis, and (optionally) Keycloak; you drive the install yourself, following this guide.
- - **One-shot script** — `scripts/local-demo.sh` spins up a disposable k3d cluster, installs the released chart from GHCR, and brings up bundled Keycloak in one command:
- 
- ```bash title="Terminal"
- ./scripts/local-demo.sh --version <chart-version>
- ```
- 
- Both paths use the same install commands described below — pick whichever fits.
- </Callout>
- 
- ## Prerequisites
- 
- Before starting, make sure the following are in place. [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) explains the application/runtime/platform layers in more depth.
- 
- **License and registry access:**
- 
- - A valid Enterprise Intelligence Platform license key (contact your CopilotKit account team if you do not have one)
- - Read access to the chart OCI registry at `oci://ghcr.io/copilotkit/charts/intelligence` (anonymous pulls are allowed for the released chart)
- - The latest released chart version. Check the [chart releases](https://github.com/CopilotKit/Intelligence/pkgs/container/charts%2Fintelligence) on GHCR; substitute the value into the `<chart-version>` placeholder used throughout this guide (e.g. `0.1.0-rc.16`).
- 
- **Cluster and tooling:**
- 
- - Kubernetes ≥ 1.28
- - Helm ≥ 3.12
- - `kubectl` configured against the target cluster with an admin-equivalent context
- 
- **Platform prerequisites (cluster-wide, installed once):**
- 
- - An ingress controller — either `nginx-ingress` or the AWS Load Balancer Controller
- - `cert-manager` (or a cloud-managed certificate alternative such as AWS ACM) for TLS on the public hostnames
- - `External Secrets Operator` if you plan to sync secrets from AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager (recommended for production, but not required — see [Secrets](#create-secrets))
- 
- **External dependencies (reachable from the cluster):**
- 
- - PostgreSQL ≥ 14 — managed (Amazon RDS, Aurora, Cloud SQL) or operator-deployed in-cluster
- - Redis ≥ 7 (or a Valkey-compatible service such as Amazon ElastiCache)
- - An OIDC identity provider — Keycloak, Okta, Azure AD, Auth0, Google Workspace, or equivalent
- 
- **Optional:**
- 
- - Amazon OpenSearch (only when analytics features are in use)
- - An S3-compatible object store (only when the realtime gateway is configured to persist AG-UI events)
- 
- ## Implementation
- 
- <Steps>
-   <Step>
-     ### Prepare your Kubernetes cluster
- 
-     Ensure `kubectl` points to the cluster that will run Enterprise Intelligence.
- 
-     ```bash title="Terminal"
-     kubectl config current-context
-     kubectl auth can-i create namespace --all-namespaces
-     ```
- 
-     Confirm the context names your target cluster and that the permission check returns `yes`. If not, fix your kubeconfig before proceeding.
-   </Step>
- 
-   <Step>
-     ### Install platform prerequisites
- 
-     These components are cluster-wide and installed once per cluster, independently of the application chart.
- 
-     <Tabs items={["AWS (EKS)", "On-prem / generic", "Local (Docker Desktop / k3d)"]}>
-       <Tab value="AWS (EKS)">
-         ```bash title="Terminal"
-         # AWS Load Balancer Controller (kube-system)
-         helm repo add eks https://aws.github.io/eks-charts
-         helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
-           -n kube-system \
-           --set clusterName=<YOUR_CLUSTER_NAME>
- 
-         # cert-manager
-         helm repo add jetstack https://charts.jetstack.io
-         helm install cert-manager jetstack/cert-manager \
-           -n cert-manager --create-namespace \
-           --set installCRDs=true
- 
-         # External Secrets Operator (optional — see Secrets step)
-         helm repo add external-secrets https://charts.external-secrets.io
-         helm install external-secrets external-secrets/external-secrets \
-           -n external-secrets --create-namespace
-         ```
-       </Tab>
-       <Tab value="On-prem / generic">
-         ```bash title="Terminal"
-         # NGINX Ingress Controller
-         helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
-         helm install ingress-nginx ingress-nginx/ingress-nginx \
-           -n ingress-nginx --create-namespace
- 
-         # cert-manager
-         helm repo add jetstack https://charts.jetstack.io
-         helm install cert-manager jetstack/cert-manager \
-           -n cert-manager --create-namespace \
-           --set installCRDs=true
-         ```
-       </Tab>
-       <Tab value="Local (Docker Desktop / k3d)">
-         ```bash title="Terminal"
-         # NGINX Ingress Controller as ClusterIP — you will reach it via
-         # `kubectl port-forward` later, so no LoadBalancer service is needed.
-         helm upgrade --install ingress-nginx ingress-nginx \
-           --repo https://kubernetes.github.io/ingress-nginx \
-           --namespace ingress-nginx --create-namespace \
-           --set controller.service.type=ClusterIP \
-           --wait
-         ```
- 
-         cert-manager and External Secrets Operator are not required for a local validation pass — TLS is terminated outside the cluster and secrets are managed by the chart (Path C below) or pre-created by hand (Path B).
-       </Tab>
-     </Tabs>
- 
-     After each controller is running, its pods should be `Ready` in their respective namespaces.
-   </Step>
- 
-   <Step>
-     ### Provision external dependencies
- 
-     Intelligence needs Postgres, Redis, and an OIDC issuer. You can either point the chart at managed services you already run, or enable the bundled Bitnami subcharts for in-cluster Postgres and Redis (appropriate for evaluation and small self-hosted installs).
- 
-     **Using managed services (recommended for production):**
- 
-     - Create a Postgres database and user. Record the host, port (default `5432`), database name, username, and password.
-     - Create a Redis instance with TLS enabled. Record the host, port (default `6379`), and password.
-     - Configure an OIDC client in your identity provider. Record the issuer URL, client ID, and client secret.
- 
-     **Using the bundled in-cluster subcharts:**
- 
-     Set `postgresql.enabled: true` and `redis-subchart.enabled: true` in your values file (covered in the next step). A matching `StorageClass` must exist in the cluster. The bundled Keycloak subchart is available via `keycloak.enabled: true` if you also need a quick OIDC provider for evaluation; do not use the bundled Keycloak for production workloads. See [Bundled Keycloak (eval only)](#bundled-keycloak-eval-only) for the realm and credentials it creates.
- 
-     The chart already ships a tested overlay for this shape — `values-quickstart-local.yaml` — which enables bundled Postgres + Redis, sets `migrations.enabled: true`, sizes resources for a laptop, and creates disposable secrets so the install runs end-to-end with no manual prep. Layer your own overlay on top of it (see the next step) to plug in your IdP and ingress.
-   </Step>
- 
-   <Step>
-     ### Create a values file
- 
-     The released chart ships several example values files for the common deployment shapes. Pick the one closest to your environment and copy it into a working overlay you can edit. Pull and untar the chart so you have local copies to diff against:
- 
-     ```bash title="Terminal"
-     helm pull oci://ghcr.io/copilotkit/charts/intelligence --version <chart-version> --untar
- 
-     # AWS-flavored (ALB, IRSA, External Secrets from AWS Secrets Manager)
-     cp intelligence/values-aws-example.yaml my-values.yaml
- 
-     # Or on-prem-flavored (nginx, manual Kubernetes Secrets)
-     cp intelligence/values-onprem-example.yaml my-values.yaml
- 
-     # Or self-hosted eval (bundled Keycloak + in-cluster Postgres/Redis)
-     cp intelligence/values-self-hosted-eval.yaml.example my-values.yaml
-     ```
- 
-     The chart untars into a directory named `intelligence/` (the published chart name on GHCR; the chart's `nameOverride` keeps release-prefixed resources named `cpki-*`).
- 
-     Edit `my-values.yaml` to set at minimum:
- 
-     - `database.host`, `database.port`, `database.name` — your Postgres connection (`name` defaults to `intelligence`)
-     - `redis.host`, `redis.port`, `redis.tls` — your Redis connection (TLS is on by default; managed Redis requires it)
-     - `auth.issuer` — your OIDC provider's issuer URL
-     - `auth.existingSecret` — name of the Kubernetes Secret containing `auth-secret`, `auth-client-id`, `auth-client-secret` (or use one of the alternate paths in [Secrets](#create-secrets))
-     - `ingress.ui.host` — the hostname users will load the Intelligence UI on (for example `intelligence.example.com`)
-     - `ingress.api.host` — optional dedicated API hostname. When omitted, the `ui.host` rule routes `/api` and `/auth` paths to `app-api`, so a single hostname is fine for most installs.
-     - `ingress.tls` — TLS configuration for the hosts above
-     - `migrations.enabled: true` — **required for first install**; defaults to `false`. Without it the database schema is never applied and `app-api` will crashloop. (The eval overlay `values-quickstart-local.yaml` sets this for you when you layer on top of it.)
- 
-     <Callout type="warn" title="OIDC issuer URL — trailing slash matters">
-       Some providers (Auth0 in particular) only accept the issuer URL with a trailing slash (e.g. `https://your-tenant.auth0.com/`). A missing or extra slash produces an opaque "issuer mismatch" failure at login time. Match the value exactly to what your provider's discovery endpoint advertises.
-     </Callout>
- 
-     See the [Configuration reference](#configuration-reference) section for the full set of values.
-   </Step>
- 
-   <Step id="create-secrets">
-     ### Create secrets
- 
-     The chart supports three paths for secrets management. Pick exactly one.
- 
-     **Path A — External Secrets Operator (recommended for production):**
- 
-     1. Ensure your secret backend (AWS Secrets Manager, Vault, etc.) has entries for the database URL, Redis URL, and auth credentials.
-     2. Create a `ClusterSecretStore` (or `SecretStore`) that references that backend.
-     3. In `my-values.yaml`, set `externalSecrets.enabled: true`, `externalSecrets.store.kind`, and `externalSecrets.store.name` to match. The chart then generates `ExternalSecret` resources that sync those entries into Kubernetes Secrets at the names `app-api` expects.
- 
-     **Path B — Direct Kubernetes Secrets (you manage the rotations):**
- 
-     Leave `externalSecrets.enabled: false` (the default) and create the Secrets manually before installing:
- 
-     ```bash title="Terminal"
-     kubectl create namespace copilot-intelligence
- 
-     kubectl create secret generic cpki-db \
-       --from-literal=database-url='postgresql://user:pass@host:5432/intelligence' \
-       -n copilot-intelligence
- 
-     kubectl create secret generic cpki-redis \
-       --from-literal=redis-url='rediss://:password@host:6379' \
-       -n copilot-intelligence
- 
-     kubectl create secret generic cpki-auth \
-       --from-literal=auth-secret="$(openssl rand -hex 32)" \
-       --from-literal=auth-client-id='<OIDC client id>' \
-       --from-literal=auth-client-secret='<OIDC client secret>' \
-       -n copilot-intelligence
-     ```
- 
-     Reference these names in your values file via `database.existingSecret`, `redis.existingSecret`, and `auth.existingSecret`. The Secret keys are lowercase-hyphenated (`auth-secret`, `database-url`, `runner-auth-secret`); the workloads consume them as the corresponding uppercase env vars (`AUTH_SECRET`, `DATABASE_URL`, `RUNNER_AUTH_SECRET`).
- 
-     **Path C — Chart-managed self-hosted secrets (simplest BYOC):**
- 
-     Useful when you do not run a secret manager and prefer Helm to create the Kubernetes Secrets directly from values you provide at install time. Set `selfHostedSecrets.enabled: true` and supply the credentials inline:
- 
-     ```yaml title="my-values.yaml"
-     selfHostedSecrets:
-       enabled: true
-       db:
-         url: "postgresql://user:pass@host:5432/intelligence"
-       redis:
-         url: "rediss://:password@host:6379"
-       auth:
-         # Auto-generated when left empty.
-         secret: ""
-         clientId: "<OIDC client id>"
-         clientSecret: "<OIDC client secret>"
-       realtimeGateway:
-         # Auto-generated when left empty.
-         runnerAuthSecret: ""
-         secretKeyBase: ""
-       beam:
-         # Auto-generated when left empty.
-         releaseCookie: ""
-     ```
- 
-     The chart auto-generates `auth.secret`, the realtime-gateway runner/key-base, and the BEAM cookie when those fields are empty, so you only need to provide what you actually have.
-   </Step>
- 
-   <Step>
-     ### Install the chart
- 
-     The release can be installed directly from the GHCR OCI registry — no local untar is required for the install itself. Use `helm upgrade --install` so the same command works for first-time installs and upgrades.
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <chart-version> \
-       -f my-values.yaml \
-       -n copilot-intelligence \
-       --create-namespace \
-       --wait \
-       --timeout 10m
-     ```
- 
-     Layering multiple values files is supported and is the recommended pattern for evaluation: combine the chart's bundled `values-quickstart-local.yaml` (in-cluster Postgres/Redis, eval-sized resources, `migrations.enabled: true`, disposable secrets) with your own overlay (IdP, ingress, anything cluster-specific). Pull the chart first so you have a local copy of `values-quickstart-local.yaml` to reference:
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <chart-version> \
-       -f intelligence/values-quickstart-local.yaml \
-       -f my-values.yaml \
-       -n copilot-intelligence --create-namespace \
-       --wait --timeout 10m
-     ```
- 
-     `--wait` blocks until the `Deployments` report healthy replicas; `--timeout 10m` allows enough time for image pulls and the initial database migration job. Right-most `-f` files win on conflicts, so put your overlay last.
- 
-     <Callout type="info" title="When the migrations Job runs">
-     The migrations Job runs as a **pre-install/pre-upgrade** hook (weight `-5`) when secrets are pre-created (Path A or Path B above), so the schema is ready before app pods start. It runs as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm (Path C, or when using `postgresql.enabled: true`), because the Secret resources don't exist until Helm has created them.
-     </Callout>
-   </Step>
- 
-   <Step>
-     ### Verify the install
- 
-     Check that every pod is `Running` and the ingress is ready:
- 
-     ```bash title="Terminal"
-     kubectl get pods -n copilot-intelligence
-     kubectl get ingress -n copilot-intelligence
-     ```
- 
-     You should see `app-api`, `app-frontend`, and — if enabled — `realtime-gateway` pods running. The migrations `Job` will appear as `Completed`.
- 
-     Confirm the API health check reports `ok`:
- 
-     ```bash title="Terminal"
-     curl https://<ingress.api.host>/api/health
-     ```
- 
-     The endpoint returns `200 OK` only when the database is reachable — a failed health check is almost always a database connectivity problem.
- 
-     Service-specific health endpoints, useful when port-forwarding to an individual pod:
- 
-     | Service | Path |
-     |---|---|
-     | `app-api` | `/api/health` |
-     | `app-frontend` | `/healthz` |
-     | `realtime-gateway` | `/health` |
- 
-     Finally, browse to `https://<ingress.ui.host>` and log in via your OIDC provider. A successful login confirms end-to-end wiring.
- 
-     <Callout type="info" title="Local validation — port-forward the ingress controller">
-     On a local cluster (Docker Desktop, k3d) without a public DNS name, port-forward the **ingress controller** rather than the frontend service so the UI host rule still routes `/api` and `/auth` to `app-api`. Set `ingress.ui.host: "localhost"` in your overlay, then leave this terminal open for as long as you're using the app:
- 
-     ```bash title="Terminal"
-     kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80
-     ```
- 
-     Browse to `http://localhost:8080`. Port-forwarding the `app-frontend` service directly bypasses the ingress and breaks `/api` and `/auth` routing.
-     </Callout>
-   </Step>
- 
-   <Step>
-     ### Upgrade and uninstall
- 
-     **Upgrade** — bump the version in your install command and re-run it. Because the install command already uses `helm upgrade --install`, the same invocation works for both fresh installs and upgrades:
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <new-chart-version> \
-       -f my-values.yaml \
-       -n copilot-intelligence \
-       --wait
-     ```
- 
-     Before upgrading, regenerate the example values for the target version (`helm pull ... --version <new-chart-version> --untar`) and diff against your overlay to catch new keys.
- 
-     **Uninstall** — releases leave PersistentVolumes in place by default if you enabled bundled subcharts; delete them manually if you intend to tear down state.
- 
-     ```bash title="Terminal"
-     helm uninstall copilot-intelligence -n copilot-intelligence
-     ```
-   </Step>
- </Steps>
- 
- ## Bundled Keycloak (eval only)
- 
- When `keycloak.enabled: true`, the chart deploys the Bitnami Keycloak subchart with a pre-seeded realm and demo user. This is for evaluation and demos — not production. The realm import creates:
- 
- - **Realm:** `cpk-dev`
- - **OIDC client:** `cpk-self-hosted` with secret `cpk-self-hosted-secret` (override via `auth.keycloakClient.clientId` / `auth.keycloakClient.clientSecret`)
- - **Demo user:** `engineer` / `engineer` (override via `auth.keycloakDemoUser`)
- - **Redirect URIs / web origins:** default `["*"]` for eval flexibility (override via `auth.keycloakClient.redirectUris` / `webOrigins`)
- 
- The chart auto-wires `auth.issuer` to the in-cluster Keycloak service, so leaving `auth.issuer` empty when `keycloak.enabled: true` is intentional.
- 
- For production self-hosted deployments, leave `keycloak.enabled: false` and point `auth.issuer` at your own IdP.
- 
- ## Configuration reference
- 
- The tables below summarize the most common values. For every option, see `values.yaml` in the pulled chart.
- 
- ### Global
- 
- | Key | Description | Default |
- |---|---|---|
- | `global.imageRegistry` | Registry prefix for unqualified image names | `""` |
- | `global.intelligenceImageRegistry` | Registry prefix specifically for the five Intelligence service images | `""` |
- | `global.imagePullSecrets` | Image pull secrets for private registries | `[]` |
- | `global.storageClass` | StorageClass override for bundled subcharts | `""` |
- 
- ### Database
- 
- | Key | Description | Default |
- |---|---|---|
- | `database.host` | Postgres host | `""` (required) |
- | `database.port` | Postgres port | `5432` |
- | `database.name` | Database name | `intelligence` |
- | `database.existingSecret` | Pre-existing Secret with `database-url` | `""` |
- | `database.secretKeys.url` | Key inside the Secret holding the connection string | `database-url` |
- 
- ### Redis
- 
- | Key | Description | Default |
- |---|---|---|
- | `redis.host` | Redis host | `""` (required) |
- | `redis.port` | Redis port | `6379` |
- | `redis.tls` | Require TLS (ElastiCache defaults to on) | `true` |
- | `redis.existingSecret` | Pre-existing Secret with `redis-url` | `""` |
- | `redis.secretKeys.url` | Key inside the Secret holding the connection URL | `redis-url` |
- 
- ### OpenSearch (optional)
- 
- | Key | Description | Default |
- |---|---|---|
- | `openSearch.host` | OpenSearch domain endpoint | `""` |
- | `openSearch.port` | Port | `443` |
- | `openSearch.tls` | Require TLS | `true` |
- | `openSearch.existingSecret` | Pre-existing Secret with `opensearch-url` | `""` |
- 
- ### Authentication
- 
- | Key | Description | Default |
- |---|---|---|
- | `auth.deploymentMode` | `self-hosted` (single org) or `hosted` (multi-org) | `self-hosted` |
- | `auth.issuer` | OIDC issuer URL (auto-set when `keycloak.enabled: true`) | `""` |
- | `auth.existingSecret` | Secret with `auth-secret`, `auth-client-id`, `auth-client-secret` | `""` |
- | `auth.defaultOrganizationId` | Default organization ID in self-hosted mode | `default` |
- | `auth.providerId` | Stable identifier for the OIDC provider | `enterprise-sso` |
- | `auth.providerName` | Display name shown in the UI | `Enterprise SSO` |
- | `auth.trustHost` | Trust the `X-Forwarded-Host` header (set behind a reverse proxy) | `"true"` |
- 
- ### Ingress
- 
- | Key | Description | Default |
- |---|---|---|
- | `ingress.enabled` | Create Ingress resources | `true` |
- | `ingress.className` | `nginx` or `alb` | `nginx` |
- | `ingress.ui.host` | UI hostname; the rule for this host routes `/api` and `/auth` to `app-api` and `/` to `app-frontend` | `""` (required) |
- | `ingress.api.host` | Optional dedicated API hostname. When set, this hostname routes `/` to `app-api`. When empty, no separate API rule is created — the UI host already serves the API. | `""` |
- | `ingress.realtimePlane.host` | Optional dedicated realtime hostname (only used when `realtimeGateway.enabled: true`) | `""` |
- | `ingress.tls` | TLS configuration | `[]` |
- | `ingress.websocket.enabled` | Add WebSocket-friendly annotations (auto-enabled when realtime-gateway is enabled with nginx) | `false` |
- | `ingress.annotations` | Additional ingress annotations | `{}` |
- 
- ### Services (`appApi`, `appFrontend`, `realtimeGateway`)
- 
- | Key | Description | Default (`appApi`) | Default (`appFrontend`) | Default (`realtimeGateway`) |
- |---|---|---|---|---|
- | `<svc>.enabled` | Enable the service | `true` | `true` | `false` |
- | `<svc>.replicaCount` | Replicas | `2` | `2` | `2` |
- | `<svc>.image.repository` | Image repository (published chart fully-qualifies these to `ghcr.io/copilotkit/intelligence/<svc>`) | `intelligence/app-api` | `intelligence/app-frontend` | `intelligence/realtime-gateway` |
- | `<svc>.image.tag` | Image tag (defaults to chart `appVersion`) | `""` | `""` | `""` |
- | `<svc>.resources` | CPU/memory requests | `250m` / `512Mi` | `100m` / `128Mi` | `500m` / `512Mi` |
- | `<svc>.autoscaling.enabled` | Enable HPA | `true` | `false` | `true` |
- | `<svc>.autoscaling.minReplicas` | HPA minimum | `2` | `2` | `2` |
- | `<svc>.autoscaling.maxReplicas` | HPA maximum | `10` | `4` | `10` |
- | `<svc>.serviceAccount.annotations` | Annotations on the ServiceAccount (IRSA, workload identity) | `{}` | `{}` | `{}` |
- | `<svc>.podAnnotations` | Pod template annotations (e.g. for Stakater Reloader on ESO secret rotation) | `{}` | n/a | `{}` |
- 
- ### Realtime gateway (additional keys)
- 
- | Key | Description | Default |
- |---|---|---|
- | `realtimeGateway.enabled` | Enable the gateway | `false` |
- | `realtimeGateway.host` | `PHX_HOST` override | `""` |
- | `realtimeGateway.existingSecret` | Secret containing keys `runner-auth-secret` and `secret-key-base` (mapped to env vars `RUNNER_AUTH_SECRET` / `SECRET_KEY_BASE`) | `""` |
- | `realtimeGateway.beam.clustering.enabled` | BEAM clustering across replicas | `true` |
- | `realtimeGateway.beam.cookieSecret.name` | Secret containing the BEAM cookie | `cpki-beam-cookie` |
- 
- Enabling the realtime gateway requires that either `realtimeGateway.existingSecret` is set, or that `externalSecrets.secrets.realtimeGateway.enabled` or `selfHostedSecrets.enabled` is `true` — the chart fails validation otherwise.
- 
- ### External Secrets Operator integration
- 
- | Key | Description | Default |
- |---|---|---|
- | `externalSecrets.enabled` | Generate `ExternalSecret` resources | `false` |
- | `externalSecrets.store.kind` | `ClusterSecretStore` or `SecretStore` | `ClusterSecretStore` |
- | `externalSecrets.store.name` | SecretStore name | `""` (required when enabled) |
- | `externalSecrets.refreshInterval` | How often ESO syncs | `1h` |
- | `externalSecrets.secrets.*` | Per-secret mappings — see `values.yaml` | — |
- 
- ### Self-hosted (chart-managed) secrets
- 
- | Key | Description | Default |
- |---|---|---|
- | `selfHostedSecrets.enabled` | Create Kubernetes Secrets from inline values; auto-generates blank fields | `false` |
- | `selfHostedSecrets.db.url` | Postgres connection URL | `""` (required when enabled) |
- | `selfHostedSecrets.redis.url` | Redis connection URL | `""` (required when enabled) |
- | `selfHostedSecrets.auth.clientId` / `clientSecret` | OIDC client credentials | `""` (required when enabled) |
- | `selfHostedSecrets.auth.secret` | Internal auth signing secret | auto-generated when empty |
- | `selfHostedSecrets.realtimeGateway.runnerAuthSecret` / `secretKeyBase` | Runtime gateway secrets | auto-generated when empty |
- | `selfHostedSecrets.beam.releaseCookie` | BEAM clustering cookie | auto-generated when empty |
- 
- ### Bundled subcharts (evaluation only)
- 
- | Key | Description | Default |
- |---|---|---|
- | `postgresql.enabled` | Deploy in-cluster Postgres | `false` |
- | `postgresql.auth.password` | Postgres password (set at deploy time) | `""` |
- | `redis-subchart.enabled` | Deploy in-cluster Redis (aliased to avoid collision with `redis.*`) | `false` |
- | `redis-subchart.auth.password` | Redis password | `""` |
- | `keycloak.enabled` | Deploy bundled Keycloak for quick eval | `false` |
- 
- ### Object storage (realtime gateway event persistence)
- 
- | Key | Description | Default |
- |---|---|---|
- | `objectStorage.enabled` | Persist AG-UI events from the realtime gateway to S3-compatible storage | `false` |
- | `objectStorage.bucket` | Bucket name | `""` |
- | `objectStorage.region` | Bucket region | `us-east-1` |
- | `objectStorage.endpoint` | S3-compatible endpoint override (e.g. for MinIO) | `""` |
- | `objectStorage.forcePathStyle` | Force path-style addressing (required for MinIO) | `false` |
- | `objectStorage.existingSecret` | Secret with static access keys (optional if using IRSA) | `""` |
- 
- ### Database migrations
- 
- | Key | Description | Default |
- |---|---|---|
- | `migrations.enabled` | Run the migrations Job. **Required for first install** — defaults to `false`. | `false` |
- | `migrations.image.repository` | Migrations image repository | `intelligence/db-migrations` |
- | `migrations.activeDeadlineSeconds` | Job deadline | `1800` |
- | `migrations.backoffLimit` | Retry count before failing | `3` |
- 
- The migrations Job runs as a **pre-install/pre-upgrade** Helm hook (weight `-5`) when secrets are pre-created (External Secrets path or manual `existingSecret`) and as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm itself (`selfHostedSecrets.enabled` or `postgresql.enabled`).
- 
- ### Thread culler (CronJob)
- 
- | Key | Description | Default |
- |---|---|---|
- | `threadCuller.enabled` | Run a CronJob that soft-deletes stale threads in unlicensed deployments | `false` |
- | `threadCuller.schedule` | Cron expression | `0 * * * *` |
- | `threadCuller.staleHours` | Threads older than this many hours (since last update) are culled | `"3"` |
- | `threadCuller.batchSize` | Maximum threads to cull per run | `"1000"` |
- | `threadCuller.licenseSecret.existingSecret` | Secret containing `COPILOTKIT_LICENSE_TOKEN`. When set, the CronJob skips culling (licensed install). When empty, it culls. | `""` |
- 
- ### Shared config (CORS, logging)
- 
- | Key | Description | Default |
- |---|---|---|
- | `config.logLevel` | Log level for all services (`trace`/`debug`/`info`/`warn`/`error`/`fatal`) | `info` |
- | `config.nodeEnv` | Node environment; affects cookie security and runtime defaults | `production` |
- | `config.appFrontendOrigin` | Browser origin allowed to perform authenticated bootstrap writes | `""` |
- | `config.publicAppOrigin` | Public UI origin used by server-side callbacks when distinct from `appFrontendOrigin` | `""` |
- | `config.allowedOrigins` | Additional CORS allowlist (comma-separated). Entries are exact origins (`https://app.example.com`) or Phoenix-style `//host` patterns | `""` |
- 
- ### Pod-level controls
- 
- Per-service keys `podDisruptionBudget`, `podAntiAffinity`, and `networkPolicy` are available for high-availability and traffic-isolation requirements. See `values.yaml` for full shapes.
- 
- ## Next steps
- 
- - **Platform architecture:** [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) — runtime/platform architecture, project boundaries, threads, and realtime sync
- - **Enterprise Intelligence Platform overview:** [Enterprise Intelligence Platform](/angular/agno/premium/overview) — features, hosting options, and where to go next
- - **Use threads in your app:** [Threads](/angular/agno/guides/threads-memory-attachments-headless) — the persistent-conversation surface powered by the Enterprise Intelligence Platform you just deployed
+ # Self-host CopilotKit Intelligence
+ 
+ > Deploy CopilotKit Intelligence to your own Kubernetes cluster with the copilot-intelligence Helm chart — install, configure, and operate the app-api, app-frontend, and realtime-gateway services with your own Postgres, Redis, ingress, and OIDC provider.
+ 
+ 
+ ## What is this?
+ 
+ CopilotKit Intelligence — the platform that powers threads, shared state, and the inspector — can be self-hosted on your own Kubernetes cluster using the `copilot-intelligence` Helm chart. You run the control plane and data plane inside your own network boundary; the chart leaves you in charge of identity, storage, and secrets.
+ 
+ **What you bring:**
+ 
+ - Postgres and Redis — your own, or the bundled Bitnami subcharts
+ - An OIDC provider for identity
+ - Secrets via External Secrets Operator, direct Kubernetes Secrets, or chart-managed credentials
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Planning a self-hosted CopilotKit Intelligence deployment?"
+   body="Self-hosting is available on the Team self-hosted plan or a custom Enterprise plan for VPC, on-prem, and data-residency deployments."
+   ctaLabel="Talk to an engineer"
+   surface="docs_premium_self_hosting_intro"
+   href="https://copilotkit.ai/talk-to-an-engineer"
+   analyticsEvent="talk_to_us_clicked"
+ />
+ 
+ **What the chart deploys:**
+ 
+ | Component | Role | Port |
+ |---|---|---|
+ | `app-api` | Backend service | 4201 |
+ | `app-frontend` | Web UI | 8080 |
+ | `realtime-gateway` *(optional)* | WebSocket service for realtime sync | 4401 |
+ 
+ Plus a `database-migrations` Job, a `thread-culler` CronJob, and the usual supporting resources (Services, Ingress, HPAs, PodDisruptionBudgets, ConfigMaps, and — when ESO is enabled — ExternalSecret resources).
+ 
+ ## When should I use this?
+ 
+ - Your organization requires CopilotKit Intelligence to run inside your own VPC or data center for compliance, data residency, or security reasons
+ - You want to connect CopilotKit Intelligence to internal databases, identity providers, or secret stores that are not reachable from the cloud-hosted version
+ - You need to operate the platform under your existing Kubernetes tooling, CI/CD, and monitoring stack
+ - You have a CopilotKit Intelligence license and the platform-engineering capacity to run a production Kubernetes workload
+ 
+ <Callout type="info" title="Validate locally before committing to a real cluster">
+ The chart installs the same way against a local Docker Desktop or k3d cluster as against a production one, so walk this guide end-to-end on your laptop first. Two local paths are supported:
+ 
+ - **Bundled overlay** — install with the `values-quickstart-local.yaml` overlay shipped in the chart. It enables in-cluster Postgres, Redis, and (optionally) Keycloak; you drive the install yourself, following this guide.
+ - **One-shot script** — `scripts/local-demo.sh` spins up a disposable k3d cluster, installs the released chart from GHCR, and brings up bundled Keycloak in one command:
+ 
+ ```bash title="Terminal"
+ ./scripts/local-demo.sh --version <chart-version>
+ ```
+ 
+ Both paths use the same install commands described below — pick whichever fits.
+ </Callout>
+ 
+ ## Prerequisites
+ 
+ Before starting, make sure the following are in place. [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) explains the application/runtime/platform layers in more depth.
+ 
+ **License and registry access:**
+ 
+ - A valid CopilotKit Intelligence license key (contact your CopilotKit account team if you do not have one)
+ - Read access to the chart OCI registry at `oci://ghcr.io/copilotkit/charts/intelligence` (anonymous pulls are allowed for the released chart)
+ - The latest released chart version. Check the [chart releases](https://github.com/CopilotKit/Intelligence/pkgs/container/charts%2Fintelligence) on GHCR; substitute the value into the `<chart-version>` placeholder used throughout this guide (e.g. `0.1.0-rc.16`).
+ 
+ **Cluster and tooling:**
+ 
+ - Kubernetes ≥ 1.28
+ - Helm ≥ 3.12
+ - `kubectl` configured against the target cluster with an admin-equivalent context
+ 
+ **Platform prerequisites (cluster-wide, installed once):**
+ 
+ - An ingress controller — either `nginx-ingress` or the AWS Load Balancer Controller
+ - `cert-manager` (or a cloud-managed certificate alternative such as AWS ACM) for TLS on the public hostnames
+ - `External Secrets Operator` if you plan to sync secrets from AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager (recommended for production, but not required — see [Secrets](#create-secrets))
+ 
+ **External dependencies (reachable from the cluster):**
+ 
+ - PostgreSQL ≥ 14 — managed (Amazon RDS, Aurora, Cloud SQL) or operator-deployed in-cluster
+ - Redis ≥ 7 (or a Valkey-compatible service such as Amazon ElastiCache)
+ - An OIDC identity provider — Keycloak, Okta, Azure AD, Auth0, Google Workspace, or equivalent
+ 
+ **Optional:**
+ 
+ - Amazon OpenSearch (only when analytics features are in use)
+ - An S3-compatible object store (only when the realtime gateway is configured to persist AG-UI events)
+ 
+ ## Implementation
+ 
+ <Steps>
+   <Step>
+     ### Prepare your Kubernetes cluster
+ 
+     Ensure `kubectl` points to the cluster that will run CopilotKit Intelligence.
+ 
+     ```bash title="Terminal"
+     kubectl config current-context
+     kubectl auth can-i create namespace --all-namespaces
+     ```
+ 
+     Confirm the context names your target cluster and that the permission check returns `yes`. If not, fix your kubeconfig before proceeding.
+   </Step>
+ 
+   <Step>
+     ### Install platform prerequisites
+ 
+     These components are cluster-wide and installed once per cluster, independently of the application chart.
+ 
+     <Tabs items={["AWS (EKS)", "On-prem / generic", "Local (Docker Desktop / k3d)"]}>
+       <Tab value="AWS (EKS)">
+         ```bash title="Terminal"
+         # AWS Load Balancer Controller (kube-system)
+         helm repo add eks https://aws.github.io/eks-charts
+         helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
+           -n kube-system \
+           --set clusterName=<YOUR_CLUSTER_NAME>
+ 
+         # cert-manager
+         helm repo add jetstack https://charts.jetstack.io
+         helm install cert-manager jetstack/cert-manager \
+           -n cert-manager --create-namespace \
+           --set installCRDs=true
+ 
+         # External Secrets Operator (optional — see Secrets step)
+         helm repo add external-secrets https://charts.external-secrets.io
+         helm install external-secrets external-secrets/external-secrets \
+           -n external-secrets --create-namespace
+         ```
+       </Tab>
+       <Tab value="On-prem / generic">
+         ```bash title="Terminal"
+         # NGINX Ingress Controller
+         helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
+         helm install ingress-nginx ingress-nginx/ingress-nginx \
+           -n ingress-nginx --create-namespace
+ 
+         # cert-manager
+         helm repo add jetstack https://charts.jetstack.io
+         helm install cert-manager jetstack/cert-manager \
+           -n cert-manager --create-namespace \
+           --set installCRDs=true
+         ```
+       </Tab>
+       <Tab value="Local (Docker Desktop / k3d)">
+         ```bash title="Terminal"
+         # NGINX Ingress Controller as ClusterIP — you will reach it via
+         # `kubectl port-forward` later, so no LoadBalancer service is needed.
+         helm upgrade --install ingress-nginx ingress-nginx \
+           --repo https://kubernetes.github.io/ingress-nginx \
+           --namespace ingress-nginx --create-namespace \
+           --set controller.service.type=ClusterIP \
+           --wait
+         ```
+ 
+         cert-manager and External Secrets Operator are not required for a local validation pass — TLS is terminated outside the cluster and secrets are managed by the chart (Path C below) or pre-created by hand (Path B).
+       </Tab>
+     </Tabs>
+ 
+     After each controller is running, its pods should be `Ready` in their respective namespaces.
+   </Step>
+ 
+   <Step>
+     ### Provision external dependencies
+ 
+     Intelligence needs Postgres, Redis, and an OIDC issuer. You can either point the chart at managed services you already run, or enable the bundled Bitnami subcharts for in-cluster Postgres and Redis (appropriate for evaluation and small self-hosted installs).
+ 
+     **Using managed services (recommended for production):**
+ 
+     - Create a Postgres database and user. Record the host, port (default `5432`), database name, username, and password.
+     - Create a Redis instance with TLS enabled. Record the host, port (default `6379`), and password.
+     - Configure an OIDC client in your identity provider. Record the issuer URL, client ID, and client secret.
+ 
+     **Using the bundled in-cluster subcharts:**
+ 
+     Set `postgresql.enabled: true` and `redis-subchart.enabled: true` in your values file (covered in the next step). A matching `StorageClass` must exist in the cluster. The bundled Keycloak subchart is available via `keycloak.enabled: true` if you also need a quick OIDC provider for evaluation; do not use the bundled Keycloak for production workloads. See [Bundled Keycloak (eval only)](#bundled-keycloak-eval-only) for the realm and credentials it creates.
+ 
+     The chart already ships a tested overlay for this shape — `values-quickstart-local.yaml` — which enables bundled Postgres + Redis, sets `migrations.enabled: true`, sizes resources for a laptop, and creates disposable secrets so the install runs end-to-end with no manual prep. Layer your own overlay on top of it (see the next step) to plug in your IdP and ingress.
+   </Step>
+ 
+   <Step>
+     ### Create a values file
+ 
+     The released chart ships several example values files for the common deployment shapes. Pick the one closest to your environment and copy it into a working overlay you can edit. Pull and untar the chart so you have local copies to diff against:
+ 
+     ```bash title="Terminal"
+     helm pull oci://ghcr.io/copilotkit/charts/intelligence --version <chart-version> --untar
+ 
+     # AWS-flavored (ALB, IRSA, External Secrets from AWS Secrets Manager)
+     cp intelligence/values-aws-example.yaml my-values.yaml
+ 
+     # Or on-prem-flavored (nginx, manual Kubernetes Secrets)
+     cp intelligence/values-onprem-example.yaml my-values.yaml
+ 
+     # Or self-hosted eval (bundled Keycloak + in-cluster Postgres/Redis)
+     cp intelligence/values-self-hosted-eval.yaml.example my-values.yaml
+     ```
+ 
+     The chart untars into a directory named `intelligence/` (the published chart name on GHCR; the chart's `nameOverride` keeps release-prefixed resources named `cpki-*`).
+ 
+     Edit `my-values.yaml` to set at minimum:
+ 
+     - `database.host`, `database.port`, `database.name` — your Postgres connection (`name` defaults to `intelligence`)
+     - `redis.host`, `redis.port`, `redis.tls` — your Redis connection (TLS is on by default; managed Redis requires it)
+     - `auth.issuer` — your OIDC provider's issuer URL
+     - `auth.existingSecret` — name of the Kubernetes Secret containing `auth-secret`, `auth-client-id`, `auth-client-secret` (or use one of the alternate paths in [Secrets](#create-secrets))
+     - `ingress.ui.host` — the hostname users will load the Intelligence UI on (for example `intelligence.example.com`)
+     - `ingress.api.host` — optional dedicated API hostname. When omitted, the `ui.host` rule routes `/api` and `/auth` paths to `app-api`, so a single hostname is fine for most installs.
+     - `ingress.tls` — TLS configuration for the hosts above
+     - `migrations.enabled: true` — **required for first install**; defaults to `false`. Without it the database schema is never applied and `app-api` will crashloop. (The eval overlay `values-quickstart-local.yaml` sets this for you when you layer on top of it.)
+ 
+     <Callout type="warn" title="OIDC issuer URL — trailing slash matters">
+       Some providers (Auth0 in particular) only accept the issuer URL with a trailing slash (e.g. `https://your-tenant.auth0.com/`). A missing or extra slash produces an opaque "issuer mismatch" failure at login time. Match the value exactly to what your provider's discovery endpoint advertises.
+     </Callout>
+ 
+     See the [Configuration reference](#configuration-reference) section for the full set of values.
+   </Step>
+ 
+   <Step id="create-secrets">
+     ### Create secrets
+ 
+     The chart supports three paths for secrets management. Pick exactly one.
+ 
+     **Path A — External Secrets Operator (recommended for production):**
+ 
+     1. Ensure your secret backend (AWS Secrets Manager, Vault, etc.) has entries for the database URL, Redis URL, and auth credentials.
+     2. Create a `ClusterSecretStore` (or `SecretStore`) that references that backend.
+     3. In `my-values.yaml`, set `externalSecrets.enabled: true`, `externalSecrets.store.kind`, and `externalSecrets.store.name` to match. The chart then generates `ExternalSecret` resources that sync those entries into Kubernetes Secrets at the names `app-api` expects.
+ 
+     **Path B — Direct Kubernetes Secrets (you manage the rotations):**
+ 
+     Leave `externalSecrets.enabled: false` (the default) and create the Secrets manually before installing:
+ 
+     ```bash title="Terminal"
+     kubectl create namespace copilot-intelligence
+ 
+     kubectl create secret generic cpki-db \
+       --from-literal=database-url='postgresql://user:pass@host:5432/intelligence' \
+       -n copilot-intelligence
+ 
+     kubectl create secret generic cpki-redis \
+       --from-literal=redis-url='rediss://:password@host:6379' \
+       -n copilot-intelligence
+ 
+     kubectl create secret generic cpki-auth \
+       --from-literal=auth-secret="$(openssl rand -hex 32)" \
+       --from-literal=auth-client-id='<OIDC client id>' \
+       --from-literal=auth-client-secret='<OIDC client secret>' \
+       -n copilot-intelligence
+     ```
+ 
+     Reference these names in your values file via `database.existingSecret`, `redis.existingSecret`, and `auth.existingSecret`. The Secret keys are lowercase-hyphenated (`auth-secret`, `database-url`, `runner-auth-secret`); the workloads consume them as the corresponding uppercase env vars (`AUTH_SECRET`, `DATABASE_URL`, `RUNNER_AUTH_SECRET`).
+ 
+     **Path C — Chart-managed self-hosted secrets (simplest BYOC):**
+ 
+     Useful when you do not run a secret manager and prefer Helm to create the Kubernetes Secrets directly from values you provide at install time. Set `selfHostedSecrets.enabled: true` and supply the credentials inline:
+ 
+     ```yaml title="my-values.yaml"
+     selfHostedSecrets:
+       enabled: true
+       db:
+         url: "postgresql://user:pass@host:5432/intelligence"
+       redis:
+         url: "rediss://:password@host:6379"
+       auth:
+         # Auto-generated when left empty.
+         secret: ""
+         clientId: "<OIDC client id>"
+         clientSecret: "<OIDC client secret>"
+       realtimeGateway:
+         # Auto-generated when left empty.
+         runnerAuthSecret: ""
+         secretKeyBase: ""
+       beam:
+         # Auto-generated when left empty.
+         releaseCookie: ""
+     ```
+ 
+     The chart auto-generates `auth.secret`, the realtime-gateway runner/key-base, and the BEAM cookie when those fields are empty, so you only need to provide what you actually have.
+   </Step>
+ 
+   <Step>
+     ### Install the chart
+ 
+     The release can be installed directly from the GHCR OCI registry — no local untar is required for the install itself. Use `helm upgrade --install` so the same command works for first-time installs and upgrades.
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <chart-version> \
+       -f my-values.yaml \
+       -n copilot-intelligence \
+       --create-namespace \
+       --wait \
+       --timeout 10m
+     ```
+ 
+     Layering multiple values files is supported and is the recommended pattern for evaluation: combine the chart's bundled `values-quickstart-local.yaml` (in-cluster Postgres/Redis, eval-sized resources, `migrations.enabled: true`, disposable secrets) with your own overlay (IdP, ingress, anything cluster-specific). Pull the chart first so you have a local copy of `values-quickstart-local.yaml` to reference:
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <chart-version> \
+       -f intelligence/values-quickstart-local.yaml \
+       -f my-values.yaml \
+       -n copilot-intelligence --create-namespace \
+       --wait --timeout 10m
+     ```
+ 
+     `--wait` blocks until the `Deployments` report healthy replicas; `--timeout 10m` allows enough time for image pulls and the initial database migration job. Right-most `-f` files win on conflicts, so put your overlay last.
+ 
+     <Callout type="info" title="When the migrations Job runs">
+     The migrations Job runs as a **pre-install/pre-upgrade** hook (weight `-5`) when secrets are pre-created (Path A or Path B above), so the schema is ready before app pods start. It runs as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm (Path C, or when using `postgresql.enabled: true`), because the Secret resources don't exist until Helm has created them.
+     </Callout>
+   </Step>
+ 
+   <Step>
+     ### Verify the install
+ 
+     Check that every pod is `Running` and the ingress is ready:
+ 
+     ```bash title="Terminal"
+     kubectl get pods -n copilot-intelligence
+     kubectl get ingress -n copilot-intelligence
+     ```
+ 
+     You should see `app-api`, `app-frontend`, and — if enabled — `realtime-gateway` pods running. The migrations `Job` will appear as `Completed`.
+ 
+     Confirm the API health check reports `ok`:
+ 
+     ```bash title="Terminal"
+     curl https://<ingress.api.host>/api/health
+     ```
+ 
+     The endpoint returns `200 OK` only when the database is reachable — a failed health check is almost always a database connectivity problem.
+ 
+     Service-specific health endpoints, useful when port-forwarding to an individual pod:
+ 
+     | Service | Path |
+     |---|---|
+     | `app-api` | `/api/health` |
+     | `app-frontend` | `/healthz` |
+     | `realtime-gateway` | `/health` |
+ 
+     Finally, browse to `https://<ingress.ui.host>` and log in via your OIDC provider. A successful login confirms end-to-end wiring.
+ 
+     <Callout type="info" title="Local validation — port-forward the ingress controller">
+     On a local cluster (Docker Desktop, k3d) without a public DNS name, port-forward the **ingress controller** rather than the frontend service so the UI host rule still routes `/api` and `/auth` to `app-api`. Set `ingress.ui.host: "localhost"` in your overlay, then leave this terminal open for as long as you're using the app:
+ 
+     ```bash title="Terminal"
+     kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80
+     ```
+ 
+     Browse to `http://localhost:8080`. Port-forwarding the `app-frontend` service directly bypasses the ingress and breaks `/api` and `/auth` routing.
+     </Callout>
+   </Step>
+ 
+   <Step>
+     ### Upgrade and uninstall
+ 
+     **Upgrade** — bump the version in your install command and re-run it. Because the install command already uses `helm upgrade --install`, the same invocation works for both fresh installs and upgrades:
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <new-chart-version> \
+       -f my-values.yaml \
+       -n copilot-intelligence \
+       --wait
+     ```
+ 
+     Before upgrading, regenerate the example values for the target version (`helm pull ... --version <new-chart-version> --untar`) and diff against your overlay to catch new keys.
+ 
+     **Uninstall** — releases leave PersistentVolumes in place by default if you enabled bundled subcharts; delete them manually if you intend to tear down state.
+ 
+     ```bash title="Terminal"
+     helm uninstall copilot-intelligence -n copilot-intelligence
+     ```
+   </Step>
+ </Steps>
+ 
+ ## Bundled Keycloak (eval only)
+ 
+ When `keycloak.enabled: true`, the chart deploys the Bitnami Keycloak subchart with a pre-seeded realm and demo user. This is for evaluation and demos — not production. The realm import creates:
+ 
+ - **Realm:** `cpk-dev`
+ - **OIDC client:** `cpk-self-hosted` with secret `cpk-self-hosted-secret` (override via `auth.keycloakClient.clientId` / `auth.keycloakClient.clientSecret`)
+ - **Demo user:** `engineer` / `engineer` (override via `auth.keycloakDemoUser`)
+ - **Redirect URIs / web origins:** default `["*"]` for eval flexibility (override via `auth.keycloakClient.redirectUris` / `webOrigins`)
+ 
+ The chart auto-wires `auth.issuer` to the in-cluster Keycloak service, so leaving `auth.issuer` empty when `keycloak.enabled: true` is intentional.
+ 
+ For production self-hosted deployments, leave `keycloak.enabled: false` and point `auth.issuer` at your own IdP.
+ 
+ ## Configuration reference
+ 
+ The tables below summarize the most common values. For every option, see `values.yaml` in the pulled chart.
+ 
+ ### Global
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `global.imageRegistry` | Registry prefix for unqualified image names | `""` |
+ | `global.intelligenceImageRegistry` | Registry prefix specifically for the five Intelligence service images | `""` |
+ | `global.imagePullSecrets` | Image pull secrets for private registries | `[]` |
+ | `global.storageClass` | StorageClass override for bundled subcharts | `""` |
+ 
+ ### Database
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `database.host` | Postgres host | `""` (required) |
+ | `database.port` | Postgres port | `5432` |
+ | `database.name` | Database name | `intelligence` |
+ | `database.existingSecret` | Pre-existing Secret with `database-url` | `""` |
+ | `database.secretKeys.url` | Key inside the Secret holding the connection string | `database-url` |
+ 
+ ### Redis
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `redis.host` | Redis host | `""` (required) |
+ | `redis.port` | Redis port | `6379` |
+ | `redis.tls` | Require TLS (ElastiCache defaults to on) | `true` |
+ | `redis.existingSecret` | Pre-existing Secret with `redis-url` | `""` |
+ | `redis.secretKeys.url` | Key inside the Secret holding the connection URL | `redis-url` |
+ 
+ ### OpenSearch (optional)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `openSearch.host` | OpenSearch domain endpoint | `""` |
+ | `openSearch.port` | Port | `443` |
+ | `openSearch.tls` | Require TLS | `true` |
+ | `openSearch.existingSecret` | Pre-existing Secret with `opensearch-url` | `""` |
+ 
+ ### Authentication
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `auth.deploymentMode` | `self-hosted` (single org) or `hosted` (multi-org) | `self-hosted` |
+ | `auth.issuer` | OIDC issuer URL (auto-set when `keycloak.enabled: true`) | `""` |
+ | `auth.existingSecret` | Secret with `auth-secret`, `auth-client-id`, `auth-client-secret` | `""` |
+ | `auth.defaultOrganizationId` | Default organization ID in self-hosted mode | `default` |
+ | `auth.providerId` | Stable identifier for the OIDC provider | `enterprise-sso` |
+ | `auth.providerName` | Display name shown in the UI | `Enterprise SSO` |
+ | `auth.trustHost` | Trust the `X-Forwarded-Host` header (set behind a reverse proxy) | `"true"` |
+ 
+ ### Ingress
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `ingress.enabled` | Create Ingress resources | `true` |
+ | `ingress.className` | `nginx` or `alb` | `nginx` |
+ | `ingress.ui.host` | UI hostname; the rule for this host routes `/api` and `/auth` to `app-api` and `/` to `app-frontend` | `""` (required) |
+ | `ingress.api.host` | Optional dedicated API hostname. When set, this hostname routes `/` to `app-api`. When empty, no separate API rule is created — the UI host already serves the API. | `""` |
+ | `ingress.realtimePlane.host` | Optional dedicated realtime hostname (only used when `realtimeGateway.enabled: true`) | `""` |
+ | `ingress.tls` | TLS configuration | `[]` |
+ | `ingress.websocket.enabled` | Add WebSocket-friendly annotations (auto-enabled when realtime-gateway is enabled with nginx) | `false` |
+ | `ingress.annotations` | Additional ingress annotations | `{}` |
+ 
+ ### Services (`appApi`, `appFrontend`, `realtimeGateway`)
+ 
+ | Key | Description | Default (`appApi`) | Default (`appFrontend`) | Default (`realtimeGateway`) |
+ |---|---|---|---|---|
+ | `<svc>.enabled` | Enable the service | `true` | `true` | `false` |
+ | `<svc>.replicaCount` | Replicas | `2` | `2` | `2` |
+ | `<svc>.image.repository` | Image repository (published chart fully-qualifies these to `ghcr.io/copilotkit/intelligence/<svc>`) | `intelligence/app-api` | `intelligence/app-frontend` | `intelligence/realtime-gateway` |
+ | `<svc>.image.tag` | Image tag (defaults to chart `appVersion`) | `""` | `""` | `""` |
+ | `<svc>.resources` | CPU/memory requests | `250m` / `512Mi` | `100m` / `128Mi` | `500m` / `512Mi` |
+ | `<svc>.autoscaling.enabled` | Enable HPA | `true` | `false` | `true` |
+ | `<svc>.autoscaling.minReplicas` | HPA minimum | `2` | `2` | `2` |
+ | `<svc>.autoscaling.maxReplicas` | HPA maximum | `10` | `4` | `10` |
+ | `<svc>.serviceAccount.annotations` | Annotations on the ServiceAccount (IRSA, workload identity) | `{}` | `{}` | `{}` |
+ | `<svc>.podAnnotations` | Pod template annotations (e.g. for Stakater Reloader on ESO secret rotation) | `{}` | n/a | `{}` |
+ 
+ ### Realtime gateway (additional keys)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `realtimeGateway.enabled` | Enable the gateway | `false` |
+ | `realtimeGateway.host` | `PHX_HOST` override | `""` |
+ | `realtimeGateway.existingSecret` | Secret containing keys `runner-auth-secret` and `secret-key-base` (mapped to env vars `RUNNER_AUTH_SECRET` / `SECRET_KEY_BASE`) | `""` |
+ | `realtimeGateway.beam.clustering.enabled` | BEAM clustering across replicas | `true` |
+ | `realtimeGateway.beam.cookieSecret.name` | Secret containing the BEAM cookie | `cpki-beam-cookie` |
+ 
+ Enabling the realtime gateway requires that either `realtimeGateway.existingSecret` is set, or that `externalSecrets.secrets.realtimeGateway.enabled` or `selfHostedSecrets.enabled` is `true` — the chart fails validation otherwise.
+ 
+ ### External Secrets Operator integration
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `externalSecrets.enabled` | Generate `ExternalSecret` resources | `false` |
+ | `externalSecrets.store.kind` | `ClusterSecretStore` or `SecretStore` | `ClusterSecretStore` |
+ | `externalSecrets.store.name` | SecretStore name | `""` (required when enabled) |
+ | `externalSecrets.refreshInterval` | How often ESO syncs | `1h` |
+ | `externalSecrets.secrets.*` | Per-secret mappings — see `values.yaml` | — |
+ 
+ ### Self-hosted (chart-managed) secrets
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `selfHostedSecrets.enabled` | Create Kubernetes Secrets from inline values; auto-generates blank fields | `false` |
+ | `selfHostedSecrets.db.url` | Postgres connection URL | `""` (required when enabled) |
+ | `selfHostedSecrets.redis.url` | Redis connection URL | `""` (required when enabled) |
+ | `selfHostedSecrets.auth.clientId` / `clientSecret` | OIDC client credentials | `""` (required when enabled) |
+ | `selfHostedSecrets.auth.secret` | Internal auth signing secret | auto-generated when empty |
+ | `selfHostedSecrets.realtimeGateway.runnerAuthSecret` / `secretKeyBase` | Runtime gateway secrets | auto-generated when empty |
+ | `selfHostedSecrets.beam.releaseCookie` | BEAM clustering cookie | auto-generated when empty |
+ 
+ ### Bundled subcharts (evaluation only)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `postgresql.enabled` | Deploy in-cluster Postgres | `false` |
+ | `postgresql.auth.password` | Postgres password (set at deploy time) | `""` |
+ | `redis-subchart.enabled` | Deploy in-cluster Redis (aliased to avoid collision with `redis.*`) | `false` |
+ | `redis-subchart.auth.password` | Redis password | `""` |
+ | `keycloak.enabled` | Deploy bundled Keycloak for quick eval | `false` |
+ 
+ ### Object storage (realtime gateway event persistence)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `objectStorage.enabled` | Persist AG-UI events from the realtime gateway to S3-compatible storage | `false` |
+ | `objectStorage.bucket` | Bucket name | `""` |
+ | `objectStorage.region` | Bucket region | `us-east-1` |
+ | `objectStorage.endpoint` | S3-compatible endpoint override (e.g. for MinIO) | `""` |
+ | `objectStorage.forcePathStyle` | Force path-style addressing (required for MinIO) | `false` |
+ | `objectStorage.existingSecret` | Secret with static access keys (optional if using IRSA) | `""` |
+ 
+ ### Database migrations
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `migrations.enabled` | Run the migrations Job. **Required for first install** — defaults to `false`. | `false` |
+ | `migrations.image.repository` | Migrations image repository | `intelligence/db-migrations` |
+ | `migrations.activeDeadlineSeconds` | Job deadline | `1800` |
+ | `migrations.backoffLimit` | Retry count before failing | `3` |
+ 
+ The migrations Job runs as a **pre-install/pre-upgrade** Helm hook (weight `-5`) when secrets are pre-created (External Secrets path or manual `existingSecret`) and as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm itself (`selfHostedSecrets.enabled` or `postgresql.enabled`).
+ 
+ ### Thread culler (CronJob)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `threadCuller.enabled` | Run a CronJob that soft-deletes stale threads in unlicensed deployments | `false` |
+ | `threadCuller.schedule` | Cron expression | `0 * * * *` |
+ | `threadCuller.staleHours` | Threads older than this many hours (since last update) are culled | `"3"` |
+ | `threadCuller.batchSize` | Maximum threads to cull per run | `"1000"` |
+ | `threadCuller.licenseSecret.existingSecret` | Secret containing `COPILOTKIT_LICENSE_TOKEN`. When set, the CronJob skips culling (licensed install). When empty, it culls. | `""` |
+ 
+ ### Shared config (CORS, logging)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `config.logLevel` | Log level for all services (`trace`/`debug`/`info`/`warn`/`error`/`fatal`) | `info` |
+ | `config.nodeEnv` | Node environment; affects cookie security and runtime defaults | `production` |
+ | `config.appFrontendOrigin` | Browser origin allowed to perform authenticated bootstrap writes | `""` |
+ | `config.publicAppOrigin` | Public UI origin used by server-side callbacks when distinct from `appFrontendOrigin` | `""` |
+ | `config.allowedOrigins` | Additional CORS allowlist (comma-separated). Entries are exact origins (`https://app.example.com`) or Phoenix-style `//host` patterns | `""` |
+ 
+ ### Pod-level controls
+ 
+ Per-service keys `podDisruptionBudget`, `podAntiAffinity`, and `networkPolicy` are available for high-availability and traffic-isolation requirements. See `values.yaml` for full shapes.
+ 
+ ## Next steps
+ 
+ - **Platform architecture:** [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) — runtime/platform architecture, project boundaries, threads, and realtime sync
+ - **CopilotKit Intelligence overview:** [CopilotKit Intelligence](/angular/agno/premium/overview) — features, hosting options, and where to go next
+ - **Use threads in your app:** [Threads](/angular/agno/guides/threads-memory-attachments-headless) — the persistent-conversation surface powered by CopilotKit Intelligence you just deployed
  
````

**Medium — CopilotKit Intelligence architecture**

`/angular/agno/premium/intelligence-platform` · under “Next steps”

0 code lines, 170 prose lines changed.

````diff
- # Enterprise Intelligence Architecture
- 
- > Architecture of the Enterprise Intelligence Platform — how CopilotKit runtimes connect to platform projects, durable threads, realtime sync, operational history, and cloud-hosted or self-hosted deployments.
- 
- The Enterprise Intelligence Platform is the platform backend behind production CopilotKit capabilities such as durable threads, realtime sync, project-scoped history, the hosted web app, and operational visibility. This page explains the mental model that applies to both [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) and [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting).
- 
- For a product-level map of features and hosting options, start with the [Enterprise Intelligence Platform overview](/angular/agno/premium/overview). To wire an existing runtime to the platform, see [Connect your runtime to Intelligence](/angular/agno/premium/connect-your-runtime). For Kubernetes installation, go straight to [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting).
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start with Cloud-Hosted Enterprise Intelligence"
-   body="Create a hosted project, get a project API key, and inspect persistent threads before deciding whether self-hosting is required."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_premium_intelligence_architecture_intro"
- />
- 
- ## Runtime and platform roles
- 
- A CopilotKit app has three layers:
- 
- - **Frontend** — your application uses the CopilotKit frontend SDK to render chat, generative UI, tools, and thread controls.
- - **Runtime** — your application server hosts the CopilotKit runtime and connects to your agent framework through AG-UI.
- - **Enterprise Intelligence Platform** — a platform service that stores durable thread data, indexes operational history, serves project-scoped APIs, and powers dashboard surfaces.
- 
- The runtime is the bridge. It receives requests from your app, streams AG-UI events to and from your agent, and uses the Enterprise Intelligence Platform when a capability needs durable platform state.
- 
- ## Project boundaries
- 
- The platform scopes data through three concepts:
- 
- - **Organization** — the billing, workspace, or contract boundary.
- - **Project** — an application or environment inside an organization, such as production, staging, or a demo app.
- - **User** — the authenticated end user from your application context.
- 
- Project API keys are issued per project. Threads, events, and dashboard history are visible only inside the project that owns them, so production and staging can share the same platform deployment without sharing conversation data.
- 
- ## Threads and event history
- 
- Threads are stored as durable platform records. When your UI uses its thread-management API, the runtime asks the platform to list, create, rename, archive, delete, and resume conversations for the selected project and user.
- 
- The platform stores event history so a conversation can be replayed after reloads and resumed across devices. That is what separates platform-backed threads from an in-memory chat transcript.
- 
- For the thread lifecycle itself, see [Threads & Persistence Architecture](/angular/agno/premium/threads-explained).
- 
- ## Realtime sync
- 
- Realtime sync keeps thread metadata and active conversation state aligned across clients. When enabled, clients subscribe to platform-backed updates so changes such as renames, archives, and active-run status can appear without a page reload.
- 
- The important application-level contract is simple: your app uses the same frontend APIs, while the runtime points at the platform endpoint for the selected deployment.
- 
- ## Inspection and operational history
- 
- The platform also gives teams operational visibility into agent behavior. The cloud-hosted web app exposes project history, thread detail pages, event timelines, API key management, and plan management.
- 
- For the cloud-hosted dashboard flow, see [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform).
- 
- ## Hosting model
- 
- Cloud-hosted and self-hosted Enterprise Intelligence share the same application contract:
- 
- | Deployment | What changes | What stays the same |
- |---|---|---|
- | Cloud-hosted | CopilotKit runs the platform, database, web app, project API keys, and plan management. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
- | Self-hosted | You run the platform in your own Kubernetes cluster and own its infrastructure dependencies. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
- 
- Self-hosting changes operational ownership. It does not require a different frontend integration. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan.
- 
- ## Error handling model
- 
- Platform-backed features are networked features. If the platform endpoint is unavailable or credentials are invalid, thread operations surface as runtime errors rather than silently falling back to local-only state.
- 
- Common debugging checks:
- 
- - Confirm the runtime is using the right platform URL for the selected deployment.
- - Confirm the runtime API key or license is valid for the project or self-hosted environment.
- - Confirm the user and project context you pass from the app match the thread history you expect to see.
- - Confirm realtime sync is configured when you expect cross-tab or cross-device updates.
- 
- ## Next steps
- 
- - **Platform overview:** [Enterprise Intelligence Platform](/angular/agno/premium/overview) — features, hosting options, and where to go next
- - **Cloud-hosted guide:** [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plan management
- - **Self-hosted guide:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — install and operate the platform in Kubernetes
- - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
+ # CopilotKit Intelligence architecture
+ 
+ > CopilotKit Intelligence architecture — how CopilotKit runtimes connect to platform projects, durable threads, realtime sync, operational history, and cloud-hosted or self-hosted deployments.
+ 
+ CopilotKit Intelligence is the platform backend behind production CopilotKit capabilities such as durable threads, realtime sync, project-scoped history, the hosted web app, and operational visibility. This page explains the mental model that applies to both [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) and [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting).
+ 
+ For a product-level map of features and hosting options, start with the [CopilotKit Intelligence overview](/angular/agno/premium/overview). To wire an existing runtime to the platform, see [Connect your runtime to Intelligence](/angular/agno/premium/connect-your-runtime). For Kubernetes installation, go straight to [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting).
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start with cloud-hosted CopilotKit Intelligence"
+   body="Create a hosted project, get a project API key, and inspect persistent threads before deciding whether self-hosting is required."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_premium_intelligence_architecture_intro"
+ />
+ 
+ ## Runtime and platform roles
+ 
+ A CopilotKit app has three layers:
+ 
+ - **Frontend** — your application uses the CopilotKit frontend SDK to render chat, generative UI, tools, and thread controls.
+ - **Runtime** — your application server hosts the CopilotKit runtime and connects to your agent framework through AG-UI.
+ - **CopilotKit Intelligence** — a platform service that stores durable thread data, indexes operational history, serves project-scoped APIs, and powers dashboard surfaces.
+ 
+ The runtime is the bridge. It receives requests from your app, streams AG-UI events to and from your agent, and uses CopilotKit Intelligence when a capability needs durable platform state.
+ 
+ ## Project boundaries
+ 
+ The platform scopes data through three concepts:
+ 
+ - **Organization** — the billing, workspace, or contract boundary.
+ - **Project** — an application or environment inside an organization, such as production, staging, or a demo app.
+ - **User** — the authenticated end user from your application context.
+ 
+ Project API keys are issued per project. Threads, events, and dashboard history are visible only inside the project that owns them, so production and staging can share the same platform deployment without sharing conversation data.
+ 
+ ## Threads and event history
+ 
+ Threads are stored as durable platform records. When your UI uses its thread-management API, the runtime asks the platform to list, create, rename, archive, delete, and resume conversations for the selected project and user.
+ 
+ The platform stores event history so a conversation can be replayed after reloads and resumed across devices. That is what separates platform-backed threads from an in-memory chat transcript.
+ 
+ For the thread lifecycle itself, see [Threads & Persistence Architecture](/angular/agno/premium/threads-explained).
+ 
+ ## Realtime sync
+ 
+ Realtime sync keeps thread metadata and active conversation state aligned across clients. When enabled, clients subscribe to platform-backed updates so changes such as renames, archives, and active-run status can appear without a page reload.
+ 
+ The important application-level contract is simple: your app uses the same frontend APIs, while the runtime points at the platform endpoint for the selected deployment.
+ 
+ ## Inspection and operational history
+ 
+ The platform also gives teams operational visibility into agent behavior. The cloud-hosted web app exposes project history, thread detail pages, event timelines, API key management, and plan management.
+ 
+ For the cloud-hosted dashboard flow, see [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform).
+ 
+ ## Hosting model
+ 
+ Cloud-hosted and self-hosted CopilotKit Intelligence share the same application contract:
+ 
+ | Deployment | What changes | What stays the same |
+ |---|---|---|
+ | Cloud-hosted | CopilotKit runs the platform, database, web app, project API keys, and plan management. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
+ | Self-hosted | You run the platform in your own Kubernetes cluster and own its infrastructure dependencies. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
+ 
+ Self-hosting changes operational ownership. It does not require a different frontend integration. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan.
+ 
+ ## Error handling model
+ 
+ Platform-backed features are networked features. If the platform endpoint is unavailable or credentials are invalid, thread operations surface as runtime errors rather than silently falling back to local-only state.
+ 
+ Common debugging checks:
+ 
+ - Confirm the runtime is using the right platform URL for the selected deployment.
+ - Confirm the runtime API key or license is valid for the project or self-hosted environment.
+ - Confirm the user and project context you pass from the app match the thread history you expect to see.
+ - Confirm realtime sync is configured when you expect cross-tab or cross-device updates.
+ 
+ ## Next steps
+ 
+ - **Platform overview:** [CopilotKit Intelligence](/angular/agno/premium/overview) — features, hosting options, and where to go next
+ - **Cloud-hosted guide:** [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plan management
+ - **Self-hosted guide:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — install and operate the platform in Kubernetes
+ - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
  
````

**High — Copilot Runtime**

`/angular/agno/copilot-runtime` · under “Comparison”

158 code lines, 230 prose lines changed.

````diff
- # Copilot Runtime
- 
- > The Copilot Runtime is the backend that connects your frontend to your AI agents, providing authentication, middleware, routing, and more.
- 
- The Copilot Runtime is the backend layer that connects your frontend application to your AI agents. It's set up during the [quickstart](/angular/agno/quickstart) and is the recommended way to use CopilotKit.
- 
- ## Setting Up the Runtime
- 
- The runtime is a lightweight server endpoint that you add to your backend:
- 
- ```npm
- npm install @copilotkit/runtime
- ```
- 
- Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
- plain fetch handler, so the route is just two exports. It lives at a **catch-all**
- path and exports **both** verbs, so the runtime can serve its sub-routes (`/info`,
- agent runs, threads) rather than a single URL:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
- import {
-   CopilotRuntime,
-   createCopilotRuntimeHandler,
-   InMemoryAgentRunner,
- } from "@copilotkit/runtime/v2";
- 
- const runtime = new CopilotRuntime({
-   agents: {
-     // your agents go here
-   },
-   runner: new InMemoryAgentRunner(),
- });
- 
- const handler = createCopilotRuntimeHandler({
-   runtime,
-   basePath: "/api/copilotkit",
- });
- 
- export const GET = handler;
- export const POST = handler;
- ```
- 
- With the route in place, `GET /api/copilotkit/info` returns a JSON description of the
- runtime and the agents it has registered. That route is how tooling — and the frontend's
- transport auto-detection — discovers your runtime, so it is the quickest way to confirm
- the endpoint is wired up.
- 
- Then point your frontend at the endpoint:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
- })
- ```
- 
- 
- For setup with other backend frameworks (Express, NestJS, Node.js HTTP), see the [quickstart](/angular/agno/quickstart).
- 
- ## The Default Agent
- 
- If you register an agent with the name `"default"`, CopilotKit's prebuilt UI components will use it automatically without any additional configuration on the frontend. This is useful when you have one primary agent and don't want to specify an `agentId` everywhere.
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: {
-     // Frontend APIs use this agent when no other agent id is selected.
-     default: new HttpAgent({ url: "https://my-agent.example.com" }),
-   },
- });
- ```
- 
- When you register multiple agents, the `"default"` agent powers the chat unless a specific agent is selected. Other agents remain addressable through the frontend agent API.
- 
- ## What the Runtime Provides
- 
- ### Authentication and Security
- 
- The runtime runs on your server, which means agent communication stays server-side. This gives you a trusted environment to enforce authentication, validate requests, and keep API keys secure. When you use the runtime, safe defaults are put in place so your agent endpoints are not exposed to unauthenticated access.
- 
- ### AG-UI Middleware
- 
- The [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui) supports a middleware layer (`agent.use`) for logging, guardrails, request transformation, and more. Because the runtime runs server-side, this middleware executes in a trusted environment where it cannot be tampered with by the client.
- 
- ### Agent Routing
- 
- When you register multiple agents with the runtime, it handles discovery and routing automatically. Your frontend doesn't need to know the details of where each agent lives or how to reach it.
- 
- ### Enterprise Intelligence Platform
- 
- Features like [threads](/angular/agno/guides/threads-memory-attachments-headless) and the [inspector](/angular/agno/inspector) are provided through the runtime and the Enterprise Intelligence Platform. These give you conversation persistence and debugging capabilities out of the box.
- 
- ## Built-in Middleware
- 
- The runtime supports two first-class middleware options you can enable directly on `CopilotRuntime` without calling `.use()` on each agent manually.
- 
- ### A2UI
- 
- Pass `a2ui: {}` to automatically apply `A2UIMiddleware` to all registered agents:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: { default: myAgent },
-   a2ui: {}, // enables A2UI rendering for all agents
- });
- ```
- 
- To scope it to specific agents only, pass an `agents` list:
- 
- ```ts
- a2ui: {
-   agents: ["my-agent"];
- }
- ```
- 
- On the frontend, the A2UI renderer activates automatically. Configure `a2ui`
- only when you want to override its defaults:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
-   a2ui: { theme: myCustomTheme },
- })
- ```
- 
- 
- ### mcpApps
- 
- Pass `mcpApps` to configure MCP servers for all agents from a single place:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: { default: myAgent },
-   mcpApps: {
-     servers: [
-       { type: "http", url: "http://localhost:3108/mcp", serverId: "my-server" },
-     ],
-   },
- });
- ```
- 
- Each server entry optionally accepts an `agentId` field to scope that server to a single agent. Without it, the server is available to all agents.
- 
- ## What If I Want to Connect to My AG-UI Agent Directly?
- 
- CopilotKit is built on the [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui), which is an open standard. If you want to connect your frontend directly to an AG-UI-compatible agent without the runtime, pass the agent instance in your frontend configuration:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { HttpAgent } from "@ag-ui/client";
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- provideCopilotKit({
-   selfManagedAgents: {
-     "my-agent": new HttpAgent({
-       url: "https://my-agent.example.com",
-     }),
-   },
- })
- ```
- 
- 
- <Callout type="warn">
-   Direct agent connections are intended for development and prototyping. This
-   approach is not recommended for production unless you are confident in your
-   setup, and is not officially supported by CopilotKit. If you run into issues
-   with a direct connection, you will need to troubleshoot on your own.
- </Callout>
- 
- There are important things to understand before going this route:
- 
- 1. **Authentication is your responsibility.** When you use the Copilot Runtime, safe defaults are put in place so that your agent endpoints are not exposed to unauthenticated access. When you connect directly, it is entirely up to you to secure your agent endpoint and manage authentication.
- 
- 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/angular/agno/guides/threads-memory-attachments-headless) and other capabilities — will not be available.
- 
- ### Comparison
- 
- |                        | With Runtime                | Direct Connection |
- | ---------------------- | --------------------------- | ----------------- |
- | **Authentication**     | Safe defaults provided      | You manage it     |
- | **AG-UI Middleware**   | Runs server-side            | Not available     |
- | **Agent Routing**      | Automatic                   | Manual            |
- | **Ecosystem Features** | Full support                | Limited           |
- | **CopilotKit Support** | Supported                   | Not supported     |
- | **Setup**              | Requires a backend endpoint | Frontend-only     |
+ # Copilot Runtime
+ 
+ > The Copilot Runtime is the backend that connects your frontend to your AI agents, providing authentication, middleware, routing, and more.
+ 
+ The Copilot Runtime is the backend layer that connects your frontend application to your AI agents. It's set up during the [quickstart](/angular/agno/quickstart) and is the recommended way to use CopilotKit.
+ 
+ ## Setting Up the Runtime
+ 
+ The runtime is a lightweight server endpoint that you add to your backend:
+ 
+ ```npm
+ npm install @copilotkit/runtime
+ ```
+ 
+ Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
+ plain fetch handler, so the route is just two exports. It lives at a **catch-all**
+ path and exports **both** verbs, so the runtime can serve its sub-routes (`/info`,
+ agent runs, threads) rather than a single URL:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
+ import {
+   CopilotRuntime,
+   createCopilotRuntimeHandler,
+   InMemoryAgentRunner,
+ } from "@copilotkit/runtime/v2";
+ 
+ const runtime = new CopilotRuntime({
+   agents: {
+     // your agents go here
+   },
+   runner: new InMemoryAgentRunner(),
+ });
+ 
+ const handler = createCopilotRuntimeHandler({
+   runtime,
+   basePath: "/api/copilotkit",
+ });
+ 
+ export const GET = handler;
+ export const POST = handler;
+ ```
+ 
+ With the route in place, `GET /api/copilotkit/info` returns a JSON description of the
+ runtime and the agents it has registered. That route is how tooling — and the frontend's
+ transport auto-detection — discovers your runtime, so it is the quickest way to confirm
+ the endpoint is wired up.
+ 
+ Then point your frontend at the endpoint:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+ })
+ ```
+ 
+ 
+ For setup with other backend frameworks (Express, NestJS, Node.js HTTP), see the [quickstart](/angular/agno/quickstart).
+ 
+ ## The Default Agent
+ 
+ If you register an agent with the name `"default"`, CopilotKit's prebuilt UI components will use it automatically without any additional configuration on the frontend. This is useful when you have one primary agent and don't want to specify an `agentId` everywhere.
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: {
+     // Frontend APIs use this agent when no other agent id is selected.
+     default: new HttpAgent({ url: "https://my-agent.example.com" }),
+   },
+ });
+ ```
+ 
+ When you register multiple agents, the `"default"` agent powers the chat unless a specific agent is selected. Other agents remain addressable through the frontend agent API.
+ 
+ ## What the Runtime Provides
+ 
+ ### Authentication and Security
+ 
+ The runtime runs on your server, which means agent communication stays server-side. This gives you a trusted environment to enforce authentication, validate requests, and keep API keys secure. When you use the runtime, safe defaults are put in place so your agent endpoints are not exposed to unauthenticated access.
+ 
+ ### AG-UI Middleware
+ 
+ The [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui) supports a middleware layer (`agent.use`) for logging, guardrails, request transformation, and more. Because the runtime runs server-side, this middleware executes in a trusted environment where it cannot be tampered with by the client.
+ 
+ ### Agent Routing
+ 
+ When you register multiple agents with the runtime, it handles discovery and routing automatically. Your frontend doesn't need to know the details of where each agent lives or how to reach it.
+ 
+ ### CopilotKit Intelligence
+ 
+ Features like [threads](/angular/agno/guides/threads-memory-attachments-headless) and the [inspector](/angular/agno/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
+ 
+ ## Built-in Middleware
+ 
+ The runtime supports two first-class middleware options you can enable directly on `CopilotRuntime` without calling `.use()` on each agent manually.
+ 
+ ### A2UI
+ 
+ Pass `a2ui: {}` to automatically apply `A2UIMiddleware` to all registered agents:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: { default: myAgent },
+   a2ui: {}, // enables A2UI rendering for all agents
+ });
+ ```
+ 
+ To scope it to specific agents only, pass an `agents` list:
+ 
+ ```ts
+ a2ui: {
+   agents: ["my-agent"];
+ }
+ ```
+ 
+ On the frontend, the A2UI renderer activates automatically. Configure `a2ui`
+ only when you want to override its defaults:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+   a2ui: { theme: myCustomTheme },
+ })
+ ```
+ 
+ 
+ ### mcpApps
+ 
+ Pass `mcpApps` to configure MCP servers for all agents from a single place:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: { default: myAgent },
+   mcpApps: {
+     servers: [
+       { type: "http", url: "http://localhost:3108/mcp", serverId: "my-server" },
+     ],
+   },
+ });
+ ```
+ 
+ Each server entry optionally accepts an `agentId` field to scope that server to a single agent. Without it, the server is available to all agents.
+ 
+ ## What If I Want to Connect to My AG-UI Agent Directly?
+ 
+ CopilotKit is built on the [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui), which is an open standard. If you want to connect your frontend directly to an AG-UI-compatible agent without the runtime, pass the agent instance in your frontend configuration:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { HttpAgent } from "@ag-ui/client";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ provideCopilotKit({
+   selfManagedAgents: {
+     "my-agent": new HttpAgent({
+       url: "https://my-agent.example.com",
+     }),
+   },
+ })
+ ```
+ 
+ 
+ <Callout type="warn">
+   Direct agent connections are intended for development and prototyping. This
+   approach is not recommended for production unless you are confident in your
+   setup, and is not officially supported by CopilotKit. If you run into issues
+   with a direct connection, you will need to troubleshoot on your own.
+ </Callout>
+ 
+ There are important things to understand before going this route:
+ 
+ 1. **Authentication is your responsibility.** When you use the Copilot Runtime, safe defaults are put in place so that your agent endpoints are not exposed to unauthenticated access. When you connect directly, it is entirely up to you to secure your agent endpoint and manage authentication.
+ 
+ 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/angular/agno/guides/threads-memory-attachments-headless) and other capabilities — will not be available.
+ 
+ ### Comparison
+ 
+ |                        | With Runtime                | Direct Connection |
+ | ---------------------- | --------------------------- | ----------------- |
+ | **Authentication**     | Safe defaults provided      | You manage it     |
+ | **AG-UI Middleware**   | Runs server-side            | Not available     |
+ | **Agent Routing**      | Automatic                   | Manual            |
+ | **Ecosystem Features** | Full support                | Limited           |
+ | **CopilotKit Support** | Supported                   | Not supported     |
+ | **Setup**              | Requires a backend endpoint | Frontend-only     |
  
````

**High — AG-UI**

`/angular/agno/ag-ui` · under “How agents slot into the runtime”

96 code lines, 162 prose lines changed.

````diff
- # AG-UI
- 
- > The AG-UI protocol connects your frontend to your Agno agents via event-based Server-Sent Events (SSE).
- 
- CopilotKit is built on the [AG-UI protocol](https://ag-ui.com), a lightweight,
- event-based standard that defines how AI agents communicate with user-facing
- applications over Server-Sent Events (SSE).
- 
- Messages, state updates, tool calls, and agent lifecycle events all flow
- through AG-UI. Understanding this layer helps you debug and extend any
- CopilotKit integration.
- 
- 
- 
- 
- ## Accessing your agent with `injectAgentStore`
- 
- `injectAgentStore` exposes the AG-UI agent and projects its messages, state,
- and run status into Angular signals:
- 
- ```ts title="src/app/agent-status.component.ts"
- import { Component, computed } from "@angular/core";
- import { injectAgentStore } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-agent-status",
-   template: `
-     <p>{{ messageCount() }} messages</p>
-     @if (store().isRunning()) {
-       <p>Agent is running…</p>
-     }
-   `,
- })
- export class AgentStatusComponent {
-   readonly store = injectAgentStore("research-agent");
-   readonly messageCount = computed(() => this.store().messages().length);
- }
- ```
- 
- 
- The resolved agent is a standard AG-UI `AbstractAgent`. You can read its
- state, invoke protocol methods, and subscribe to its event stream.
- 
- ### Subscribing to AG-UI events
- 
- 
- 
- 
- Subscribe to `store().agent` and release the subscription with the owning
- injector:
- 
- ```ts
- private readonly destroyRef = inject(DestroyRef);
- readonly store = injectAgentStore("research-agent");
- 
- constructor() {
-   const subscription = this.store().agent.subscribe({
-     onTextMessageContentEvent({ textMessageBuffer }) {
-       console.log("Streaming text:", textMessageBuffer);
-     },
-     onToolCallEndEvent({ toolCallName, toolCallArgs }) {
-       console.log("Tool called:", toolCallName, toolCallArgs);
-     },
-     onStateChanged({ agent }) {
-       console.log("State changed:", agent.state);
-     },
-   });
-   this.destroyRef.onDestroy(() => subscription.unsubscribe());
- }
- ```
- 
- 
- The callback names map directly to the [AG-UI event
- types](https://docs.ag-ui.com/concepts/events):
- 
- | Event | Callback |
- | --- | --- |
- | Run lifecycle | `onRunStartedEvent`, `onRunFinishedEvent`, `onRunErrorEvent` |
- | Steps | `onStepStartedEvent`, `onStepFinishedEvent` |
- | Text messages | `onTextMessageStartEvent`, `onTextMessageContentEvent`, `onTextMessageEndEvent` |
- | Tool calls | `onToolCallStartEvent`, `onToolCallArgsEvent`, `onToolCallEndEvent`, `onToolCallResultEvent` |
- | State | `onStateSnapshotEvent`, `onStateDeltaEvent` |
- | Messages | `onMessagesSnapshotEvent` |
- | Custom | `onCustomEvent`, `onRawEvent` |
- | High-level changes | `onMessagesChanged`, `onStateChanged` |
- 
- ## The proxy pattern
- 
- When you use CopilotKit with a runtime, your frontend does not talk directly
- to the backend agent. CopilotKit discovers agents through the runtime's
- `/info` endpoint and represents each one with a proxy that implements the
- same `AbstractAgent` interface.
- 
- 
- 
- 
- ```ts title="What your component sees"
- const store = injectAgentStore("default");
- const agent = store().agent;
- store().messages();
- store().state();
- agent.subscribe({ /* … */ });
- ```
- 
- ```ts title="What happens underneath"
- // injectAgentStore() → registry checks /info → resolves a proxy agent
- // core.runAgent({ agent }) → runtime POST → agent execution → SSE events
- ```
- 
- 
- This indirection lets the runtime provide authentication, middleware, agent
- routing, and CopilotKit Enterprise Intelligence without changing how the
- frontend interacts with agents.
- 
- ## How agents slot into the runtime
- 
- On the server, `CopilotRuntime` accepts a map of AG-UI `AbstractAgent`
- instances. A framework adapter, an `HttpAgent` pointing at a remote server,
- and a custom implementation all use the same request path:
- 
- 1. The runtime resolves the target agent by ID.
- 2. It clones the agent for request isolation and supplies messages, state, and
-    thread context.
- 3. `AgentRunner` executes the agent and receives AG-UI events.
- 4. The runtime encodes those events as SSE and streams them to the frontend
-    proxy.
- 
- The backend framework can change without forcing a corresponding change to
- the frontend AG-UI contract.
+ # AG-UI
+ 
+ > The AG-UI protocol connects your frontend to your Agno agents via event-based Server-Sent Events (SSE).
+ 
+ CopilotKit is built on the [AG-UI protocol](https://ag-ui.com), a lightweight,
+ event-based standard that defines how AI agents communicate with user-facing
+ applications over Server-Sent Events (SSE).
+ 
+ Messages, state updates, tool calls, and agent lifecycle events all flow
+ through AG-UI. Understanding this layer helps you debug and extend any
+ CopilotKit integration.
+ 
+ 
+ 
+ 
+ ## Accessing your agent with `injectAgentStore`
+ 
+ `injectAgentStore` exposes the AG-UI agent and projects its messages, state,
+ and run status into Angular signals:
+ 
+ ```ts title="src/app/agent-status.component.ts"
+ import { Component, computed } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-agent-status",
+   template: `
+     <p>{{ messageCount() }} messages</p>
+     @if (store().isRunning()) {
+       <p>Agent is running…</p>
+     }
+   `,
+ })
+ export class AgentStatusComponent {
+   readonly store = injectAgentStore("research-agent");
+   readonly messageCount = computed(() => this.store().messages().length);
+ }
+ ```
+ 
+ 
+ The resolved agent is a standard AG-UI `AbstractAgent`. You can read its
+ state, invoke protocol methods, and subscribe to its event stream.
+ 
+ ### Subscribing to AG-UI events
+ 
+ 
+ 
+ 
+ Subscribe to `store().agent` and release the subscription with the owning
+ injector:
+ 
+ ```ts
+ private readonly destroyRef = inject(DestroyRef);
+ readonly store = injectAgentStore("research-agent");
+ 
+ constructor() {
+   const subscription = this.store().agent.subscribe({
+     onTextMessageContentEvent({ textMessageBuffer }) {
+       console.log("Streaming text:", textMessageBuffer);
+     },
+     onToolCallEndEvent({ toolCallName, toolCallArgs }) {
+       console.log("Tool called:", toolCallName, toolCallArgs);
+     },
+     onStateChanged({ agent }) {
+       console.log("State changed:", agent.state);
+     },
+   });
+   this.destroyRef.onDestroy(() => subscription.unsubscribe());
+ }
+ ```
+ 
+ 
+ The callback names map directly to the [AG-UI event
+ types](https://docs.ag-ui.com/concepts/events):
+ 
+ | Event | Callback |
+ | --- | --- |
+ | Run lifecycle | `onRunStartedEvent`, `onRunFinishedEvent`, `onRunErrorEvent` |
+ | Steps | `onStepStartedEvent`, `onStepFinishedEvent` |
+ | Text messages | `onTextMessageStartEvent`, `onTextMessageContentEvent`, `onTextMessageEndEvent` |
+ | Tool calls | `onToolCallStartEvent`, `onToolCallArgsEvent`, `onToolCallEndEvent`, `onToolCallResultEvent` |
+ | State | `onStateSnapshotEvent`, `onStateDeltaEvent` |
+ | Messages | `onMessagesSnapshotEvent` |
+ | Custom | `onCustomEvent`, `onRawEvent` |
+ | High-level changes | `onMessagesChanged`, `onStateChanged` |
+ 
+ ## The proxy pattern
+ 
+ When you use CopilotKit with a runtime, your frontend does not talk directly
+ to the backend agent. CopilotKit discovers agents through the runtime's
+ `/info` endpoint and represents each one with a proxy that implements the
+ same `AbstractAgent` interface.
+ 
+ 
+ 
+ 
+ ```ts title="What your component sees"
+ const store = injectAgentStore("default");
+ const agent = store().agent;
+ store().messages();
+ store().state();
+ agent.subscribe({ /* … */ });
+ ```
+ 
+ ```ts title="What happens underneath"
+ // injectAgentStore() → registry checks /info → resolves a proxy agent
+ // core.runAgent({ agent }) → runtime POST → agent execution → SSE events
+ ```
+ 
+ 
+ This indirection lets the runtime provide authentication, middleware, agent
+ routing, and CopilotKit Intelligence without changing how the
+ frontend interacts with agents.
+ 
+ ## How agents slot into the runtime
+ 
+ On the server, `CopilotRuntime` accepts a map of AG-UI `AbstractAgent`
+ instances. A framework adapter, an `HttpAgent` pointing at a remote server,
+ and a custom implementation all use the same request path:
+ 
+ 1. The runtime resolves the target agent by ID.
+ 2. It clones the agent for request isolation and supplies messages, state, and
+    thread context.
+ 3. `AgentRunner` executes the agent and receives AG-UI events.
+ 4. The runtime encodes those events as SSE and streams them to the frontend
+    proxy.
+ 
+ The backend framework can change without forcing a corresponding change to
+ the frontend AG-UI contract.
  
````

**High — Common Copilot Issues**

`/angular/agno/troubleshooting/common-issues` · under “Runtime memory keeps growing or the process runs out of heap”

90 code lines, 334 prose lines changed.

````diff
- # Common Copilot Issues
- 
- > Network errors, endpoint not found, tunnel timeouts, and other common issues when wiring up CopilotKit with the Built-in Agent.
- 
- Welcome to the CopilotKit troubleshooting guide. This page covers the most common issues you'll hit while wiring up a Built-in Agent, plus the usual fixes.
- 
- <Callout type="info">
- Have an issue not listed here? Open a ticket on [GitHub](https://github.com/CopilotKit/CopilotKit/issues) or reach out on [Discord](https://discord.com/invite/6dffbvGU3D) and we'll help. PRs adding your own troubleshooting notes are very welcome.
- </Callout>
- 
- ## Network errors / API not found
- 
- If you're getting network or API errors, here's how to troubleshoot.
- 
- <Accordions>
- <Accordion title="Check your endpoint configuration">
- Verify the configured `runtimeUrl`.
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "/api/copilotkit",
-       licenseKey: "<your-copilot-cloud-public-api-key>",
-     }),
-   ],
- };
- ```
- 
- 
- Common issues:
- 
- - Missing leading slash in the endpoint path
- - Wrong path relative to your app's base URL (or, if absolute, wrong full URL)
- - Typos in the endpoint path
- 
- 
- - Omitting both `runtimeUrl` and `agents`/`selfManagedAgents`
- 
- </Accordion>
- 
- <Accordion title="localhost vs 127.0.0.1">
- If you're running locally and getting connection errors, try `127.0.0.1` instead of `localhost`:
- 
- ```bash
- # If this doesn't work:
- http://localhost:3000/api/copilotkit
- 
- # Try this instead:
- http://127.0.0.1:3000/api/copilotkit
- ```
- 
- Usually caused by local DNS / `/etc/hosts` issues.
- </Accordion>
- 
- <Accordion title="Verify your backend is running">
- Make sure your backend:
- 
- - Is actually running on the port you expect
- - Is reachable from your frontend
- - Isn't blocked by CORS or a firewall
- 
- Revisit the [quickstart](../quickstart) if you want to double-check your setup.
- </Accordion>
- </Accordions>
- 
- ## "Remote Endpoint not found" error
- 
- If you're getting a *"CopilotKit's Remote Endpoint not found"* error, the `/info` endpoint isn't reachable from the runtime.
- 
- <Accordions>
- <Accordion title="Check your FastAPI / backend setup">
- Confirm the CopilotKit SDK is mounted. If you're using Python + FastAPI, follow the [Remote Python Endpoint](/reference/v1/sdk/python/RemoteEndpoints) guide.
- </Accordion>
- 
- <Accordion title="Test the /info endpoint directly">
- ```bash
- curl -v -d '{}' http://localhost:8000/copilotkit/info
- ```
- 
- You should see a `200 OK` and a JSON body like:
- 
- ```json
- {
-   "actions": [],
-   "agents": [
-     { "name": "my_agent", "description": "A helpful agent.", "type": "langgraph_agui" }
-   ],
-   "sdkVersion": "0.1.32"
- }
- ```
- 
- If you see a different response, check your server logs.
- </Accordion>
- </Accordions>
- 
- ## Tunnel creation hangs
- 
- If the tunnel creation process spins indefinitely, your router or ISP might be blocking the tunnel service.
- 
- <Accordions>
- <Accordion title="Router / ISP blocking tunnel connections">
- Verify connectivity:
- 
- ```bash
- ping tunnels.devcopilotkit.com
- curl -I https://tunnels.devcopilotkit.com
- telnet tunnels.devcopilotkit.com 443
- ```
- 
- If any of these fail:
- 
- - Check your router security settings
- - Contact your ISP to see if they're blocking the connection
- - Try a different network to confirm
- </Accordion>
- </Accordions>
- 
- ## The Built-in Agent responds with an empty message
- 
- Usually one of:
- 
- - The LLM model string isn't supported by the runtime's provider. Check it against [Model Selection](/angular/model-selection).
- - The Built-in Agent's `prompt` is empty and the user message gives it nothing useful to do. Give the agent a system prompt.
- - A frontend tool is throwing during its handler and the agent is treating the empty result as the turn output. See [Error Debugging](./error-debugging) for the `tool_handler_failed` code.
- 
- ## Tools I registered don't show up
- 
- 
- 
- 
- - Confirm the component or service that calls `registerFrontendTool` is
-   instantiated and its injector has not been destroyed.
- - Confirm the registration and chat select the same `agentId`.
- - If the tool is registered but never called, make its `description` state the
-   trigger clearly and confirm its schema accepts the emitted arguments.
- - See <a href="/angular/agno/guides/troubleshooting">Troubleshooting Angular
-   apps</a> for the complete registration checklist.
- 
- 
- ## Connect route returns 404 on a fresh thread
- 
- If you self-host the runtime and see a `404` from `POST /agent/:agentId/connect`
- right after the page loads, before any message is sent, it's almost always one
- of two things:
- 
- <Accordions>
- <Accordion title="The agentId isn't registered (most common)">
- The runtime returns a `404` with this body when no agent matches the id in the URL:
- 
- ```json
- { "error": "Agent not found", "message": "Agent 'default' does not exist" }
- ```
- 
- The prebuilt components connect to the agent named `"default"` unless you pass an
- explicit `agentId`. Register one under that key:
- 
- ```ts
- new CopilotRuntime({ agents: { default: myAgent } });
- ```
- 
- Confirm the agent shows up by hitting [`GET {runtimeUrl}/info`](/angular/agno/backend/runtime-endpoints)
- directly. See also the [error reference](./error-reference#agent-not-found--agent-id-does-not-exist).
- </Accordion>
- 
- <Accordion title="connect() runs before run() on a new thread">
- The frontend mints a thread id and may call `connect()` to re-attach **before**
- the first `run()` has produced any events. A persistence backend that only learns
- about a thread once a run starts can 404 (or error) on that first connect.
- 
- The built-in [`InMemoryAgentRunner`](/angular/agno/backend/agent-runner) handles the common
- cases, but a custom runner backed by an external memory layer must handle the
- "unknown thread" path explicitly. Return an empty `RUN_STARTED`,
- `MESSAGES_SNAPSHOT`, `RUN_FINISHED` sequence instead of failing. The
- [AWS AgentCore integration](/angular/agno/deploy/agentcore) shows the exact pattern.
- </Accordion>
- </Accordions>
- 
- ## Runtime memory keeps growing or the process runs out of heap
- 
- A long-lived server on the default `InMemoryAgentRunner` accumulates thread
- history in process memory.
- 
- <Accordions>
- <Accordion title="Tune or lower the in-memory bounds">
- The store is bounded by default (1000 threads, 100 runs per thread, ~512 MiB of
- retained history), but those defaults assume a reasonably sized heap. If your
- process runs with a small `--max-old-space-size`, or your threads carry unusually
- large payloads, lower the limits:
- 
- ```ts
- new InMemoryAgentRunner({ maxThreads: 200, maxBytes: 64 * 1024 ** 2 });
- ```
- 
- See [bounding in-memory history](/angular/agno/backend/agent-runner#bounding-in-memory-history)
- for what each bound covers and what it deliberately does not.
- </Accordion>
- 
- <Accordion title="You saw an eviction warning in the logs">
- `InMemoryAgentRunner evicted in-memory thread history...` means the bounds are
- doing their job — the process is safe, but that thread's scrollback is gone and
- will not come back. If losing history matters, move to a durable runner:
- [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting), or your own
- [custom runner](/angular/agno/backend/agent-runner#extending-a-runner-for-a-custom-backend)
- backed by your datastore.
- </Accordion>
- </Accordions>
+ # Common Copilot Issues
+ 
+ > Network errors, endpoint not found, tunnel timeouts, and other common issues when wiring up CopilotKit with the Built-in Agent.
+ 
+ Welcome to the CopilotKit troubleshooting guide. This page covers the most common issues you'll hit while wiring up a Built-in Agent, plus the usual fixes.
+ 
+ <Callout type="info">
+ Have an issue not listed here? Open a ticket on [GitHub](https://github.com/CopilotKit/CopilotKit/issues) or reach out on [Discord](https://discord.com/invite/6dffbvGU3D) and we'll help. PRs adding your own troubleshooting notes are very welcome.
+ </Callout>
+ 
+ ## Network errors / API not found
+ 
+ If you're getting network or API errors, here's how to troubleshoot.
+ 
+ <Accordions>
+ <Accordion title="Check your endpoint configuration">
+ Verify the configured `runtimeUrl`.
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "/api/copilotkit",
+       licenseKey: "<your-copilot-cloud-public-api-key>",
+     }),
+   ],
+ };
+ ```
+ 
+ 
+ Common issues:
+ 
+ - Missing leading slash in the endpoint path
+ - Wrong path relative to your app's base URL (or, if absolute, wrong full URL)
+ - Typos in the endpoint path
+ 
+ 
+ - Omitting both `runtimeUrl` and `agents`/`selfManagedAgents`
+ 
+ </Accordion>
+ 
+ <Accordion title="localhost vs 127.0.0.1">
+ If you're running locally and getting connection errors, try `127.0.0.1` instead of `localhost`:
+ 
+ ```bash
+ # If this doesn't work:
+ http://localhost:3000/api/copilotkit
+ 
+ # Try this instead:
+ http://127.0.0.1:3000/api/copilotkit
+ ```
+ 
+ Usually caused by local DNS / `/etc/hosts` issues.
+ </Accordion>
+ 
+ <Accordion title="Verify your backend is running">
+ Make sure your backend:
+ 
+ - Is actually running on the port you expect
+ - Is reachable from your frontend
+ - Isn't blocked by CORS or a firewall
+ 
+ Revisit the [quickstart](../quickstart) if you want to double-check your setup.
+ </Accordion>
+ </Accordions>
+ 
+ ## "Remote Endpoint not found" error
+ 
+ If you're getting a *"CopilotKit's Remote Endpoint not found"* error, the `/info` endpoint isn't reachable from the runtime.
+ 
+ <Accordions>
+ <Accordion title="Check your FastAPI / backend setup">
+ Confirm the CopilotKit SDK is mounted. If you're using Python + FastAPI, follow the [Remote Python Endpoint](/reference/v1/sdk/python/RemoteEndpoints) guide.
+ </Accordion>
+ 
+ <Accordion title="Test the /info endpoint directly">
+ ```bash
+ curl -v -d '{}' http://localhost:8000/copilotkit/info
+ ```
+ 
+ You should see a `200 OK` and a JSON body like:
+ 
+ ```json
+ {
+   "actions": [],
+   "agents": [
+     { "name": "my_agent", "description": "A helpful agent.", "type": "langgraph_agui" }
+   ],
+   "sdkVersion": "0.1.32"
+ }
+ ```
+ 
+ If you see a different response, check your server logs.
+ </Accordion>
+ </Accordions>
+ 
+ ## Tunnel creation hangs
+ 
+ If the tunnel creation process spins indefinitely, your router or ISP might be blocking the tunnel service.
+ 
+ <Accordions>
+ <Accordion title="Router / ISP blocking tunnel connections">
+ Verify connectivity:
+ 
+ ```bash
+ ping tunnels.devcopilotkit.com
+ curl -I https://tunnels.devcopilotkit.com
+ telnet tunnels.devcopilotkit.com 443
+ ```
+ 
+ If any of these fail:
+ 
+ - Check your router security settings
+ - Contact your ISP to see if they're blocking the connection
+ - Try a different network to confirm
+ </Accordion>
+ </Accordions>
+ 
+ ## The Built-in Agent responds with an empty message
+ 
+ Usually one of:
+ 
+ - The LLM model string isn't supported by the runtime's provider. Check it against [Model Selection](/angular/model-selection).
+ - The Built-in Agent's `prompt` is empty and the user message gives it nothing useful to do. Give the agent a system prompt.
+ - A frontend tool is throwing during its handler and the agent is treating the empty result as the turn output. See [Error Debugging](./error-debugging) for the `tool_handler_failed` code.
+ 
+ ## Tools I registered don't show up
+ 
+ 
+ 
+ 
+ - Confirm the component or service that calls `registerFrontendTool` is
+   instantiated and its injector has not been destroyed.
+ - Confirm the registration and chat select the same `agentId`.
+ - If the tool is registered but never called, make its `description` state the
+   trigger clearly and confirm its schema accepts the emitted arguments.
+ - See <a href="/angular/agno/guides/troubleshooting">Troubleshooting Angular
+   apps</a> for the complete registration checklist.
+ 
+ 
+ ## Connect route returns 404 on a fresh thread
+ 
+ If you self-host the runtime and see a `404` from `POST /agent/:agentId/connect`
+ right after the page loads, before any message is sent, it's almost always one
+ of two things:
+ 
+ <Accordions>
+ <Accordion title="The agentId isn't registered (most common)">
+ The runtime returns a `404` with this body when no agent matches the id in the URL:
+ 
+ ```json
+ { "error": "Agent not found", "message": "Agent 'default' does not exist" }
+ ```
+ 
+ The prebuilt components connect to the agent named `"default"` unless you pass an
+ explicit `agentId`. Register one under that key:
+ 
+ ```ts
+ new CopilotRuntime({ agents: { default: myAgent } });
+ ```
+ 
+ Confirm the agent shows up by hitting [`GET {runtimeUrl}/info`](/angular/agno/backend/runtime-endpoints)
+ directly. See also the [error reference](./error-reference#agent-not-found--agent-id-does-not-exist).
+ </Accordion>
+ 
+ <Accordion title="connect() runs before run() on a new thread">
+ The frontend mints a thread id and may call `connect()` to re-attach **before**
+ the first `run()` has produced any events. A persistence backend that only learns
+ about a thread once a run starts can 404 (or error) on that first connect.
+ 
+ The built-in [`InMemoryAgentRunner`](/angular/agno/backend/agent-runner) handles the common
+ cases, but a custom runner backed by an external memory layer must handle the
+ "unknown thread" path explicitly. Return an empty `RUN_STARTED`,
+ `MESSAGES_SNAPSHOT`, `RUN_FINISHED` sequence instead of failing. The
+ [AWS AgentCore integration](/angular/agno/deploy/agentcore) shows the exact pattern.
+ </Accordion>
+ </Accordions>
+ 
+ ## Runtime memory keeps growing or the process runs out of heap
+ 
+ A long-lived server on the default `InMemoryAgentRunner` accumulates thread
+ history in process memory.
+ 
+ <Accordions>
+ <Accordion title="Tune or lower the in-memory bounds">
+ The store is bounded by default (1000 threads, 100 runs per thread, ~512 MiB of
+ retained history), but those defaults assume a reasonably sized heap. If your
+ process runs with a small `--max-old-space-size`, or your threads carry unusually
+ large payloads, lower the limits:
+ 
+ ```ts
+ new InMemoryAgentRunner({ maxThreads: 200, maxBytes: 64 * 1024 ** 2 });
+ ```
+ 
+ See [bounding in-memory history](/angular/agno/backend/agent-runner#bounding-in-memory-history)
+ for what each bound covers and what it deliberately does not.
+ </Accordion>
+ 
+ <Accordion title="You saw an eviction warning in the logs">
+ `InMemoryAgentRunner evicted in-memory thread history...` means the bounds are
+ doing their job — the process is safe, but that thread's scrollback is gone and
+ will not come back. If losing history matters, move to a durable runner:
+ [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting), or your own
+ [custom runner](/angular/agno/backend/agent-runner#extending-a-runner-for-a-custom-backend)
+ backed by your datastore.
+ </Accordion>
+ </Accordions>
  
````

**Medium — Open-source Telemetry**

`/angular/agno/telemetry` · under “Get in touch”

0 code lines, 112 prose lines changed.

````diff
- # Open-source Telemetry
- 
- 
- CopilotKit uses metadata-only product telemetry to learn how to improve the
- open-source packages.
- 
- - We do not collect prompts, messages, agent state, tool data, or other application content.
- - We do not sell or share telemetry data with third parties.
- - We do not use cookies or trackers for open-source telemetry.
- 
- Runtime events may carry the telemetry ID from a configured Intelligence or
- license token. Runtime events without that ID are sampled. Inspector events use
- a persistent anonymous Inspector ID stored in your browser.
- 
- ## Inspector metadata events
- 
- The Inspector sends coarse events when trusted project-context modules become
- visible and when a user follows a plan action:
- 
- | Event | Feature-specific properties |
- | --- | --- |
- | `oss.inspector.metadata_module_viewed` | `module`, `license_bucket`, and `action_kind` when the visible module is an action |
- | `oss.inspector.metadata_action_clicked` | `module: "action"`, `action_kind`, and `license_bucket` for **Manage plan** and **Renew** clicks |
- 
- `module` is `identity`, `plan`, or `action`. `action_kind` is `manage_plan`,
- `renew`, or `enable_intelligence`. `license_bucket` is `valid`, `none`,
- `expired`, or `unknown`.
- 
- An **Enable Intelligence** click keeps the existing
- `oss.inspector.threads_intelligence_signup_clicked` event so existing reports
- stay continuous. The same click does not also send
- `oss.inspector.metadata_action_clicked`.
- 
- The feature-specific payload never includes organization, project, account, or
- user names; account, organization, project, user, thread, run, or message IDs;
- action or runtime URLs; usage values, limits, or counts; or conversation and
- tool content. Metadata usage impressions are not sent. The standard anonymous
- telemetry envelope includes package identity, anonymous distinct IDs, and an
- event timestamp.
- 
- ## How to opt out of open-source telemetry
- 
- Set `COPILOTKIT_TELEMETRY_DISABLED=true` in your runtime environment. This
- disables telemetry for both the CopilotRuntime and Inspector. We also respect
- [Do Not Track (DNT)](https://consoledonottrack.com/).
- 
- ## How to adjust the telemetry sample rate
- 
- The default sample rate for Runtime events without a telemetry ID is `0.05`
- (5%). Runtime callers with a telemetry ID bypass sampling. Set
- `COPILOTKIT_TELEMETRY_SAMPLE_RATE` to a value from 0 through 1 to change the
- anonymous Runtime sample rate.
- 
- ## Get in touch
- 
- Send telemetry questions to [hello@copilotkit.ai](mailto:hello@copilotkit.ai).
+ # Open-source Telemetry
+ 
+ 
+ CopilotKit uses metadata-only product telemetry to learn how to improve the
+ open-source packages.
+ 
+ - We do not collect prompts, messages, agent state, tool data, or other application content.
+ - We do not sell or share telemetry data with third parties.
+ - We do not use cookies or trackers for open-source telemetry.
+ 
+ Runtime events may carry the telemetry ID from a configured Intelligence or
+ license token. Runtime events without that ID are sampled. Inspector events use
+ a persistent anonymous Inspector ID stored in your browser.
+ 
+ ## Inspector metadata events
+ 
+ The Inspector sends coarse events when trusted project-context modules become
+ visible and when a user follows a plan action:
+ 
+ | Event | Feature-specific properties |
+ | --- | --- |
+ | `oss.inspector.metadata_module_viewed` | `module`, `license_bucket`, and `action_kind` when the visible module is an action |
+ | `oss.inspector.metadata_action_clicked` | `module: "action"`, `action_kind`, and `license_bucket` for **Manage plan** and **Renew** clicks |
+ 
+ `module` is `identity`, `plan`, or `action`. `action_kind` is `manage_plan`,
+ `renew`, or `enable_intelligence`. `license_bucket` is `valid`, `none`,
+ `expired`, or `unknown`.
+ 
+ An **Enable Intelligence** click keeps the existing
+ `oss.inspector.threads_intelligence_signup_clicked` event so existing reports
+ stay continuous. The same click does not also send
+ `oss.inspector.metadata_action_clicked`.
+ 
+ The feature-specific payload never includes organization, project, account, or
+ user names; account, organization, project, user, thread, run, or message IDs;
+ action or runtime URLs; usage values, limits, or counts; or conversation and
+ tool content. Metadata usage impressions are not sent. The standard anonymous
+ telemetry envelope includes package identity, anonymous distinct IDs, and an
+ event timestamp.
+ 
+ ## How to opt out of open-source telemetry
+ 
+ Set `COPILOTKIT_TELEMETRY_DISABLED=true` in your runtime environment. This
+ disables telemetry for both the CopilotRuntime and Inspector. We also respect
+ [Do Not Track (DNT)](https://consoledonottrack.com/).
+ 
+ ## How to adjust the telemetry sample rate
+ 
+ The default sample rate for Runtime events without a telemetry ID is `0.05`
+ (5%). Runtime callers with a telemetry ID bypass sampling. Set
+ `COPILOTKIT_TELEMETRY_SAMPLE_RATE` to a value from 0 through 1 to change the
+ anonymous Runtime sample rate.
+ 
+ ## Get in touch
+ 
+ Send telemetry questions to [hello@copilotkit.ai](mailto:hello@copilotkit.ai).
  
````

**Medium — Overview**

`/angular/agno/agentic-protocols` · under “**Mixing and Matching Protocols**”

0 code lines, 420 prose lines changed.

````diff
- # Overview
- 
- > CopilotKit connects to your agents through the Agentic Protocol of your choice
- 
- CopilotKit is fully compatible with three major agentic protocols: AG-UI, MCP, and A2A.  
- Learn about these protocols and how to connect your app to agents which support them using CopilotKit.
- 
- <Image
-   src="/images/venn-agentic-light.svg"
-   alt="Agentic Protocols - Venn Diagram"
-   width={4096}
-   height={2304}
-   className="block dark:hidden mb-8 w-full mx-auto"
- />
- <Image
-   src="/images/venn-agentic-dark.svg"
-   alt="Agentic Protocols - Venn Diagram"
-   width={4096}
-   height={2304}
-   className="hidden dark:block mb-8 w-full mx-auto"
- />
- 
- <table style={{ width: "100%", borderCollapse: "collapse" }}>
-   <thead>
-     <tr>
-       <th
-         style={{
-           width: "25%",
-           textAlign: "left",
-           padding: "12px",
-           borderBottom: "2px solid #e5e7eb",
-         }}
-       >
-         Connection
-       </th>
-       <th
-         style={{
-           width: "25%",
-           textAlign: "left",
-           padding: "12px",
-           borderBottom: "2px solid #e5e7eb",
-         }}
-       >
-         Protocol
-       </th>
-       <th
-         style={{
-           width: "50%",
-           textAlign: "left",
-           padding: "12px",
-           borderBottom: "2px solid #e5e7eb",
-         }}
-       >
-         Purpose
-       </th>
-     </tr>
-   </thead>
-   <tbody>
-     <tr>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         <strong>Agent ↔ User Interaction</strong>
-       </td>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         
-         
-         <a href="/angular/agno/agentic-protocols/ag-ui">
-           <strong>AG-UI</strong>
-         </a>
-         
-         <br />
-         (Agent–User Interaction Protocol)
-       </td>
-       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
-         The open, event-based standard that connects agents to user-facing
-         applications — enabling real-time, multimodal, interactive experiences.
-       </td>
-     </tr>
-     <tr>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         <strong>Agent ↔ Tools & Data</strong>
-       </td>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         
-         
-         <a href="/angular/agno/guides/frontend-tools-generative-ui">
-           <strong>MCP</strong>
-         </a>
-         
-         <br />
-         (Model Context Protocol)
-       </td>
-       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
-         Open standard that lets agents securely connect to external systems —
-         tools, workflows, and data sources.
-       </td>
-     </tr>
-     <tr>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         <strong>Agent ↔ Agent</strong>
-       </td>
-       <td
-         style={{
-           padding: "12px",
-           borderBottom: "1px solid #e5e7eb",
-           verticalAlign: "top",
-         }}
-       >
-         
-         
-         <a href="/angular/agno/agentic-protocols/a2a">
-           <strong>A2A</strong>
-         </a>
-         
-         <br />
-         (Agent to Agent)
-       </td>
-       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
-         Defines how agents coordinate and share work across distributed agentic
-         systems.
-       </td>
-     </tr>
-     <tr>
-       <td style={{ padding: "12px", verticalAlign: "top" }}>
-         <strong>Agent ↔ Generative UI </strong>
-       </td>
-       <td style={{ padding: "12px", verticalAlign: "top" }}>
-         <strong>[A2UI](/angular/agno/guides/a2ui)</strong> (Google)
-         <br />
-         <strong>[MCP Apps](/angular/agno/guides/frontend-tools-generative-ui)</strong> (MCP
-         Ecosystem)
-         <br />
-         <strong>Open-JSON-UI</strong> (OpenAI)
-       </td>
-       <td style={{ padding: "12px" }}>
-         Declarative, LLM-friendly [generative UI specs](/angular/agno/guides/frontend-tools-generative-ui)
-         that define <em>what</em> to render and how to structure agent responses
-         visually. CopilotKit fully supports all of these.
-       </td>
-     </tr>
-   </tbody>
- </table>
- 
- ## **Mixing and Matching Protocols**
- 
- CopilotKit lets developers connect to any of these protocols **directly or in combination.**
- CopilotKit can connect through any of the Interaction Protocols to your agentic backend.
- 
- <Image
-   src="/images/any-agentic-backend-light.png"
-   alt="Any Agentic Backend"
-   width={4096}
-   height={2304}
-   className="block dark:hidden mb-8 w-full mx-auto"
- />
- <Image
-   src="/images/any-agentic-backend-dark.png"
-   alt="Any Agentic Backend"
-   width={4096}
-   height={2304}
-   className="hidden dark:block mb-8 w-full mx-auto"
- />
- 
- Or, since AG-UI also includes **handshakes** with both **MCP** and **A2A**, CopilotKit can connect to MCP or A2A supporting agents through AG-UI.
- 
- This means that if your host agent connects to subagents using **MCP** or **A2A**, their UI properties can be propagated all the way through to the user-facing application — while preserving **full security, policy, and observability controls.**
- 
- <Image
-   src="/images/mcp-and-a2a-through-agui-light.png"
-   alt="MCP and A2A through AG-UI"
-   width={4096}
-   height={2304}
-   className="block dark:hidden mt-8 w-full mx-auto"
- />
- <Image
-   src="/images/mcp-and-a2a-through-agui-dark.png"
-   alt="MCP and A2A through AG-UI"
-   width={4096}
-   height={2304}
-   className="hidden dark:block mt-8 w-full mx-auto"
- />
+ # Overview
+ 
+ > CopilotKit connects to your agents through the Agentic Protocol of your choice
+ 
+ CopilotKit is fully compatible with three major agentic protocols: AG-UI, MCP, and A2A.  
+ Learn about these protocols and how to connect your app to agents which support them using CopilotKit.
+ 
+ <Image
+   src="/images/venn-agentic-light.svg"
+   alt="Agentic Protocols - Venn Diagram"
+   width={4096}
+   height={2304}
+   className="block dark:hidden mb-8 w-full mx-auto"
+ />
+ <Image
+   src="/images/venn-agentic-dark.svg"
+   alt="Agentic Protocols - Venn Diagram"
+   width={4096}
+   height={2304}
+   className="hidden dark:block mb-8 w-full mx-auto"
+ />
+ 
+ <table style={{ width: "100%", borderCollapse: "collapse" }}>
+   <thead>
+     <tr>
+       <th
+         style={{
+           width: "25%",
+           textAlign: "left",
+           padding: "12px",
+           borderBottom: "2px solid #e5e7eb",
+         }}
+       >
+         Connection
+       </th>
+       <th
+         style={{
+           width: "25%",
+           textAlign: "left",
+           padding: "12px",
+           borderBottom: "2px solid #e5e7eb",
+         }}
+       >
+         Protocol
+       </th>
+       <th
+         style={{
+           width: "50%",
+           textAlign: "left",
+           padding: "12px",
+           borderBottom: "2px solid #e5e7eb",
+         }}
+       >
+         Purpose
+       </th>
+     </tr>
+   </thead>
+   <tbody>
+     <tr>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         <strong>Agent ↔ User Interaction</strong>
+       </td>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         
+         
+         <a href="/angular/agno/agentic-protocols/ag-ui">
+           <strong>AG-UI</strong>
+         </a>
+         
+         <br />
+         (Agent–User Interaction Protocol)
+       </td>
+       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
+         The open, event-based standard that connects agents to user-facing
+         applications — enabling real-time, multimodal, interactive experiences.
+       </td>
+     </tr>
+     <tr>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         <strong>Agent ↔ Tools & Data</strong>
+       </td>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         
+         
+         <a href="/angular/agno/guides/frontend-tools-generative-ui">
+           <strong>MCP</strong>
+         </a>
+         
+         <br />
+         (Model Context Protocol)
+       </td>
+       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
+         Open standard that lets agents securely connect to external systems —
+         tools, workflows, and data sources.
+       </td>
+     </tr>
+     <tr>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         <strong>Agent ↔ Agent</strong>
+       </td>
+       <td
+         style={{
+           padding: "12px",
+           borderBottom: "1px solid #e5e7eb",
+           verticalAlign: "top",
+         }}
+       >
+         
+         
+         <a href="/angular/agno/agentic-protocols/a2a">
+           <strong>A2A</strong>
+         </a>
+         
+         <br />
+         (Agent to Agent)
+       </td>
+       <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}>
+         Defines how agents coordinate and share work across distributed agentic
+         systems.
+       </td>
+     </tr>
+     <tr>
+       <td style={{ padding: "12px", verticalAlign: "top" }}>
+         <strong>Agent ↔ Generative UI </strong>
+       </td>
+       <td style={{ padding: "12px", verticalAlign: "top" }}>
+         <strong>[A2UI](/angular/agno/guides/a2ui)</strong> (Google)
+         <br />
+         <strong>[MCP Apps](/angular/agno/guides/frontend-tools-generative-ui)</strong> (MCP
+         Ecosystem)
+         <br />
+         <strong>Open-JSON-UI</strong> (OpenAI)
+       </td>
+       <td style={{ padding: "12px" }}>
+         Declarative, LLM-friendly [generative UI specs](/angular/agno/guides/frontend-tools-generative-ui)
+         that define <em>what</em> to render and how to structure agent responses
+         visually. CopilotKit fully supports all of these.
+       </td>
+     </tr>
+   </tbody>
+ </table>
+ 
+ ## **Mixing and Matching Protocols**
+ 
+ CopilotKit lets developers connect to any of these protocols **directly or in combination.**
+ CopilotKit can connect through any of the Interaction Protocols to your agentic backend.
+ 
+ <Image
+   src="/images/any-agentic-backend-light.png"
+   alt="Any Agentic Backend"
+   width={4096}
+   height={2304}
+   className="block dark:hidden mb-8 w-full mx-auto"
+ />
+ <Image
+   src="/images/any-agentic-backend-dark.png"
+   alt="Any Agentic Backend"
+   width={4096}
+   height={2304}
+   className="hidden dark:block mb-8 w-full mx-auto"
+ />
+ 
+ Or, since AG-UI also includes **handshakes** with both **MCP** and **A2A**, CopilotKit can connect to MCP or A2A supporting agents through AG-UI.
+ 
+ This means that if your host agent connects to subagents using **MCP** or **A2A**, their UI properties can be propagated all the way through to the user-facing application — while preserving **full security, policy, and observability controls.**
+ 
+ <Image
+   src="/images/mcp-and-a2a-through-agui-light.png"
+   alt="MCP and A2A through AG-UI"
+   width={4096}
+   height={2304}
+   className="block dark:hidden mt-8 w-full mx-auto"
+ />
+ <Image
+   src="/images/mcp-and-a2a-through-agui-dark.png"
+   alt="MCP and A2A through AG-UI"
+   width={4096}
+   height={2304}
+   className="hidden dark:block mt-8 w-full mx-auto"
+ />
  
````

**High — Authentication**

`/angular/agno/auth` · under “Next steps”

144 code lines, 148 prose lines changed.

````diff
- # Authentication
- 
- > Authenticate Angular requests at Copilot Runtime and forward only the identity context your agent needs.
- 
- ## What authentication protects
- 
- CopilotKit authentication covers two boundaries:
- 
- 1. Your Angular app sends its current session token to Copilot Runtime.
- 2. Copilot Runtime validates that token before a run starts and forwards only
-    the approved identity or tenant context to the selected agent.
- 
- Keep model credentials and service-to-service agent tokens on the server.
- Browser headers prove the end user's session; they are not a safe place for
- backend secrets.
- 
- ## Send the current session
- 
- Set initial headers in `provideCopilotKit`:
- 
- ```ts title="src/app/app.config.ts"
- import { ApplicationConfig } from "@angular/core";
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig: ApplicationConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "/api/copilotkit",
-       headers: {
-         Authorization: `Bearer ${readSessionToken()}`,
-       },
-     }),
-   ],
- };
- ```
- 
- When sign-in state changes after bootstrap, update the runtime connection
- through the `CopilotKit` service:
- 
- ```ts
- import { inject } from "@angular/core";
- import { CopilotKit } from "@copilotkit/angular";
- 
- const copilotKit = inject(CopilotKit);
- 
- copilotKit.updateRuntime({
-   headers: sessionToken
-     ? { Authorization: `Bearer ${sessionToken}` }
-     : {},
- });
- ```
- 
- The runnable Angular Showcase uses the same header shape:
- 
- ```typescript
- // features/app-settings/app-settings-feature.component.ts
- const DEMO_AUTH_HEADERS: Readonly<Record<string, string>> = {
-   Authorization: "Bearer demo-token-123",
- };
- ```
- 
- ## Send cookies to a cross-origin runtime
- 
- To enable HTTP-only cookie authentication, set `credentials: "include"` and
- configure CORS on your runtime endpoint:
- 
- ```ts title="src/app/app.config.ts"
- import { ApplicationConfig } from "@angular/core";
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig: ApplicationConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "https://runtime.example.com/api/copilotkit",
-       credentials: "include",
-     }),
-   ],
- };
- ```
- 
- Configure the runtime with `credentials: true` and the Angular app's exact
- origin. Credentialed CORS requests cannot use `*` as the allowed origin.
- 
- ## Validate every runtime request
- 
- Use the runtime adapter's request hook to reject missing, expired, or
- unauthorized sessions before CopilotKit discovers or runs an agent:
- 
- ```ts title="server.ts"
- const handler = createCopilotExpressHandler({
-   runtime,
-   basePath: "/api/copilotkit",
-   hooks: {
-     onRequest: async ({ request }) => {
-       const token = request.headers
-         .get("authorization")
-         ?.replace(/^Bearer\s+/i, "");
-       const session = token ? await verifySession(token) : null;
- 
-       if (!session) {
-         throw new Response("Unauthorized", { status: 401 });
-       }
-     },
-   },
- });
- ```
- 
- Apply authorization as well as authentication. A valid user token does not
- automatically grant access to every agent, tenant, or thread.
- 
- ## Forward identity deliberately
- 
- Copilot Runtime forwards `authorization` and eligible `x-*` headers to a
- self-hosted agent, subject to its denylist. Prefer a small allowlist when your
- agent needs only specific context:
- 
- ```ts
- const runtime = new CopilotRuntime({
-   agents: { default: myAgent },
-   forwardHeaders: {
-     allow: ["authorization", "x-tenant-id"],
-   },
- });
- ```
- 
- Server-configured agent headers win over forwarded browser headers. Use that
- separation for service credentials, and never allow a browser-supplied header
- to override a backend token.
- 
- ## Production checklist
- 
- - Validate `/info`, run, connect, stop, thread, and memory requests—not just
-   chat sends.
- - Derive user and tenant identifiers from the verified session instead of
-   trusting arbitrary browser values.
- - Scope thread operations to the authenticated user and project.
- - Clear frontend headers on sign-out with `updateRuntime({ headers: {} })`.
- - Configure CORS for the deployed Angular origin.
- - Log authorization failures without logging bearer tokens.
- 
- ## Next steps
- 
- - [Copilot Runtime](/angular/agno/backend/copilot-runtime)
- - [Runtime HTTP endpoints](/angular/agno/backend/runtime-endpoints)
- - [Deploy to any runtime](/angular/agno/runtime-server-adapter)
- - [Angular API: CopilotKit](/reference/angular/services/CopilotKit)
+ # Authentication
+ 
+ > Authenticate Angular requests at Copilot Runtime and forward only the identity context your agent needs.
+ 
+ ## What authentication protects
+ 
+ CopilotKit authentication covers two boundaries:
+ 
+ 1. Your Angular app sends its current session token to Copilot Runtime.
+ 2. Copilot Runtime validates that token before a run starts and forwards only
+    the approved identity or tenant context to the selected agent.
+ 
+ Keep model credentials and service-to-service agent tokens on the server.
+ Browser headers prove the end user's session; they are not a safe place for
+ backend secrets.
+ 
+ ## Send the current session
+ 
+ Set initial headers in `provideCopilotKit`:
+ 
+ ```ts title="src/app/app.config.ts"
+ import { ApplicationConfig } from "@angular/core";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig: ApplicationConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "/api/copilotkit",
+       headers: {
+         Authorization: `Bearer ${readSessionToken()}`,
+       },
+     }),
+   ],
+ };
+ ```
+ 
+ When sign-in state changes after bootstrap, update the runtime connection
+ through the `CopilotKit` service:
+ 
+ ```ts
+ import { inject } from "@angular/core";
+ import { CopilotKit } from "@copilotkit/angular";
+ 
+ const copilotKit = inject(CopilotKit);
+ 
+ copilotKit.updateRuntime({
+   headers: sessionToken
+     ? { Authorization: `Bearer ${sessionToken}` }
+     : {},
+ });
+ ```
+ 
+ The runnable Angular Showcase uses the same header shape:
+ 
+ ```typescript
+ // features/app-settings/app-settings-feature.component.ts
+ const DEMO_AUTH_HEADERS: Readonly<Record<string, string>> = {
+   Authorization: "Bearer demo-token-123",
+ };
+ ```
+ 
+ ## Send cookies to a cross-origin runtime
+ 
+ To enable HTTP-only cookie authentication, set `credentials: "include"` and
+ configure CORS on your runtime endpoint:
+ 
+ ```ts title="src/app/app.config.ts"
+ import { ApplicationConfig } from "@angular/core";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig: ApplicationConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "https://runtime.example.com/api/copilotkit",
+       credentials: "include",
+     }),
+   ],
+ };
+ ```
+ 
+ Configure the runtime with `credentials: true` and the Angular app's exact
+ origin. Credentialed CORS requests cannot use `*` as the allowed origin.
+ 
+ ## Validate every runtime request
+ 
+ Use the runtime adapter's request hook to reject missing, expired, or
+ unauthorized sessions before CopilotKit discovers or runs an agent:
+ 
+ ```ts title="server.ts"
+ const handler = createCopilotExpressHandler({
+   runtime,
+   basePath: "/api/copilotkit",
+   hooks: {
+     onRequest: async ({ request }) => {
+       const token = request.headers
+         .get("authorization")
+         ?.replace(/^Bearer\s+/i, "");
+       const session = token ? await verifySession(token) : null;
+ 
+       if (!session) {
+         throw new Response("Unauthorized", { status: 401 });
+       }
+     },
+   },
+ });
+ ```
+ 
+ Apply authorization as well as authentication. A valid user token does not
+ automatically grant access to every agent, tenant, or thread.
+ 
+ ## Forward identity deliberately
+ 
+ Copilot Runtime forwards `authorization` and eligible `x-*` headers to a
+ self-hosted agent, subject to its denylist. Prefer a small allowlist when your
+ agent needs only specific context:
+ 
+ ```ts
+ const runtime = new CopilotRuntime({
+   agents: { default: myAgent },
+   forwardHeaders: {
+     allow: ["authorization", "x-tenant-id"],
+   },
+ });
+ ```
+ 
+ Server-configured agent headers win over forwarded browser headers. Use that
+ separation for service credentials, and never allow a browser-supplied header
+ to override a backend token.
+ 
+ ## Production checklist
+ 
+ - Validate `/info`, run, connect, stop, thread, and memory requests—not just
+   chat sends.
+ - Derive user and tenant identifiers from the verified session instead of
+   trusting arbitrary browser values.
+ - Scope thread operations to the authenticated user and project.
+ - Clear frontend headers on sign-out with `updateRuntime({ headers: {} })`.
+ - Configure CORS for the deployed Angular origin.
+ - Log authorization failures without logging bearer tokens.
+ 
+ ## Next steps
+ 
+ - [Copilot Runtime](/angular/agno/backend/copilot-runtime)
+ - [Runtime HTTP endpoints](/angular/agno/backend/runtime-endpoints)
+ - [Deploy to any runtime](/angular/agno/runtime-server-adapter)
+ - [Angular API: CopilotKit](/reference/angular/services/CopilotKit)
  
````

**Medium — Architecture**

`/angular/agno/concepts/architecture` · under “Where to go next”

0 code lines, 132 prose lines changed.

````diff
- # Architecture
- 
- > How CopilotKit's pieces fit together — a frontend, a runtime in your app server, and an agent backend, all talking AG-UI.
- 
- CopilotKit is a three-layer stack — **frontend, runtime, agent** — connected by the open **[AG-UI](/angular/agno/agentic-protocols/ag-ui)** event protocol. The runtime lives in your own application server, so the only thing between your UI and your agent is a wire format you can inspect.
- 
- ## The 30-second version
- 
- - **Frontend.** A framework-native SDK and prebuilt chat components that connect your UI to a running agent.
- - **Runtime.** A request handler mounted in your app server (Next.js, Express, Hono, Bun, Deno, Workers). Brokers auth, tool calls, and the AG-UI stream.
- - **Agent.** Any AG-UI-compatible backend — Built-in, LangGraph, Mastra, CrewAI, Pydantic AI, MAF, or your own.
- - **AG-UI** is the wire format: 16 event types, transport-agnostic, framework-agnostic. Swap any layer without rewriting the others.
- 
- ## The three layers
- 
- <ImageZoom
-   src="https://cdn.copilotkit.ai/docs/copilotkit/images/architecture-diagram.png"
-   className="rounded-2xl"
-   width={1000}
-   height={1000}
- />
- 
- ### 1. Frontend
- 
- The application your users interact with. CopilotKit ships framework-native
- state and tool APIs plus prebuilt components such as `CopilotChat`,
- `CopilotSidebar`, and `CopilotPopup`. Use a prebuilt chat surface, build a
- fully custom UI with the headless APIs, or mix the two.
- 
- ### 2. Runtime
- 
- A request handler that mounts inside your application server (Next.js App Router, Express, Hono, Bun, Deno, Cloudflare Workers). The runtime accepts requests from the frontend, mediates auth and tool calls, and forwards work to your agent over AG-UI. For the framework-agnostic path you can instantiate a `BuiltInAgent` in-process and skip an external agent process entirely.
- 
- ### 3. Agent
- 
- The agent backend you choose: LangGraph, Mastra, CrewAI, Pydantic AI, Microsoft Agent Framework, the Built-in Agent, or any custom AG-UI-compatible implementation. The agent runs your prompt, calls tools, emits state, and streams events back to the runtime.
- 
- ## AG-UI: the protocol bridge
- 
- CopilotKit doesn't lock you into one agent framework. The runtime talks to your agent over **[AG-UI](/angular/agno/agentic-protocols/ag-ui)**, an open, event-driven protocol that standardizes how agents communicate with applications:
- 
- - **Event-driven** — 16 standardized event types (text deltas, tool calls, state snapshots and deltas, run lifecycle) stream from the agent through the runtime to the frontend.
- - **Bidirectional** — users send input, agents respond, agents pause for human-in-the-loop input, frontends expose frontend tools the agent can invoke.
- - **Transport-agnostic** — SSE, WebSockets, webhooks, whatever your stack prefers.
- - **Framework-agnostic** — every supported integration ships a thin AG-UI adapter. Switch backends with one line of runtime configuration.
- 
- > *"The future of agents isn't one company or one platform — it's an agentic ecosystem connected by protocols."*
- 
- Because the contract is a protocol — not an SDK lock-in — you can swap the agent layer without rewriting the frontend, run multiple agent backends side by side, and integrate with anything AG-UI-compatible: MCP servers, A2UI components, Oracle / Google / AWS agent platforms.
- 
- ## Request flow at a glance
- 
- 1. A user sends a message in your frontend application.
- 2. The frontend agent API posts to your runtime endpoint.
- 3. Runtime opens an AG-UI session with the configured agent.
- 4. Agent emits text, tool calls, and state updates as AG-UI events.
- 5. Runtime streams the events back; the frontend renders them in real time.
- 6. If the agent calls a frontend tool, the runtime relays the request, your browser handler runs, and the result flows back to the agent.
- 7. Threads, persistence, and realtime sync (when configured) are mediated by the [Enterprise Intelligence Platform](/angular/agno/premium/overview) — the platform backend that sits beside the runtime.
- 
- ## Where to go next
- 
- - **Practical setup** — [Quickstart](/angular/agno/quickstart) wires all three layers in ~10 minutes against the Built-in Agent.
- - **Protocol depth** — [AG-UI documentation](/angular/agno/agentic-protocols/ag-ui) covers every event type, transport option, and middleware hook.
- - **Backend choices** — [Agents & Backends](/) explains the runtime, custom agents, and the trade-offs between Built-in, external frameworks, and bring-your-own.
- - **Enterprise Intelligence Platform overview** — [Enterprise Intelligence Platform](/angular/agno/premium/overview) covers Threads, Persistence, hosted inspection, and the cloud-hosted-vs-self-hosted decision.
+ # Architecture
+ 
+ > How CopilotKit's pieces fit together — a frontend, a runtime in your app server, and an agent backend, all talking AG-UI.
+ 
+ CopilotKit is a three-layer stack — **frontend, runtime, agent** — connected by the open **[AG-UI](/angular/agno/agentic-protocols/ag-ui)** event protocol. The runtime lives in your own application server, so the only thing between your UI and your agent is a wire format you can inspect.
+ 
+ ## The 30-second version
+ 
+ - **Frontend.** A framework-native SDK and prebuilt chat components that connect your UI to a running agent.
+ - **Runtime.** A request handler mounted in your app server (Next.js, Express, Hono, Bun, Deno, Workers). Brokers auth, tool calls, and the AG-UI stream.
+ - **Agent.** Any AG-UI-compatible backend — Built-in, LangGraph, Mastra, CrewAI, Pydantic AI, MAF, or your own.
+ - **AG-UI** is the wire format: 16 event types, transport-agnostic, framework-agnostic. Swap any layer without rewriting the others.
+ 
+ ## The three layers
+ 
+ <ImageZoom
+   src="https://cdn.copilotkit.ai/docs/copilotkit/images/architecture-diagram.png"
+   className="rounded-2xl"
+   width={1000}
+   height={1000}
+ />
+ 
+ ### 1. Frontend
+ 
+ The application your users interact with. CopilotKit ships framework-native
+ state and tool APIs plus prebuilt components such as `CopilotChat`,
+ `CopilotSidebar`, and `CopilotPopup`. Use a prebuilt chat surface, build a
+ fully custom UI with the headless APIs, or mix the two.
+ 
+ ### 2. Runtime
+ 
+ A request handler that mounts inside your application server (Next.js App Router, Express, Hono, Bun, Deno, Cloudflare Workers). The runtime accepts requests from the frontend, mediates auth and tool calls, and forwards work to your agent over AG-UI. For the framework-agnostic path you can instantiate a `BuiltInAgent` in-process and skip an external agent process entirely.
+ 
+ ### 3. Agent
+ 
+ The agent backend you choose: LangGraph, Mastra, CrewAI, Pydantic AI, Microsoft Agent Framework, the Built-in Agent, or any custom AG-UI-compatible implementation. The agent runs your prompt, calls tools, emits state, and streams events back to the runtime.
+ 
+ ## AG-UI: the protocol bridge
+ 
+ CopilotKit doesn't lock you into one agent framework. The runtime talks to your agent over **[AG-UI](/angular/agno/agentic-protocols/ag-ui)**, an open, event-driven protocol that standardizes how agents communicate with applications:
+ 
+ - **Event-driven** — 16 standardized event types (text deltas, tool calls, state snapshots and deltas, run lifecycle) stream from the agent through the runtime to the frontend.
+ - **Bidirectional** — users send input, agents respond, agents pause for human-in-the-loop input, frontends expose frontend tools the agent can invoke.
+ - **Transport-agnostic** — SSE, WebSockets, webhooks, whatever your stack prefers.
+ - **Framework-agnostic** — every supported integration ships a thin AG-UI adapter. Switch backends with one line of runtime configuration.
+ 
+ > *"The future of agents isn't one company or one platform — it's an agentic ecosystem connected by protocols."*
+ 
+ Because the contract is a protocol — not an SDK lock-in — you can swap the agent layer without rewriting the frontend, run multiple agent backends side by side, and integrate with anything AG-UI-compatible: MCP servers, A2UI components, Oracle / Google / AWS agent platforms.
+ 
+ ## Request flow at a glance
+ 
+ 1. A user sends a message in your frontend application.
+ 2. The frontend agent API posts to your runtime endpoint.
+ 3. Runtime opens an AG-UI session with the configured agent.
+ 4. Agent emits text, tool calls, and state updates as AG-UI events.
+ 5. Runtime streams the events back; the frontend renders them in real time.
+ 6. If the agent calls a frontend tool, the runtime relays the request, your browser handler runs, and the result flows back to the agent.
+ 7. Threads, persistence, and realtime sync (when configured) are mediated by [CopilotKit Intelligence](/angular/agno/premium/overview) — the platform backend that sits beside the runtime.
+ 
+ ## Where to go next
+ 
+ - **Practical setup** — [Quickstart](/angular/agno/quickstart) wires all three layers in ~10 minutes against the Built-in Agent.
+ - **Protocol depth** — [AG-UI documentation](/angular/agno/agentic-protocols/ag-ui) covers every event type, transport option, and middleware hook.
+ - **Backend choices** — [Agents & Backends](/) explains the runtime, custom agents, and the trade-offs between Built-in, external frameworks, and bring-your-own.
+ - **CopilotKit Intelligence overview** — [CopilotKit Intelligence](/angular/agno/premium/overview) covers Threads, Persistence, hosted inspection, and the cloud-hosted-vs-self-hosted decision.
  
````

**High — Code Contributions**

`/angular/agno/contributing/code-contributions` · under “Need help?”

60 code lines, 248 prose lines changed.

````diff
- # Code Contributions
- 
- We are grateful for your interest in contributing to CopilotKit. We welcome new contributors and appreciate your help in making CopilotKit better.
- 
- This guide will help you get started as smoothly as possible.
- 
- ## Step 1: Install Prerequisites
- 
- - [Node.js](https://nodejs.org/en/) 20.x or later
- - [pnpm](https://pnpm.io/) v10.x installed globally (`npm i -g pnpm@^10`)
- 
- ## Step 2: Repository Setup
- 
- <Steps>
-   <Step>
-   ### Fork The Repository
-   First, head over to the [CopilotKit repository](https://github.com/CopilotKit/CopilotKit) and create a fork.
- 
- Then, clone your fork to your local machine:
- 
- ```bash
- git clone https://github.com/<your-username>/CopilotKit
- cd CopilotKit
- ```
- 
-   </Step>
-   <Step>
-   ### Install Dependencies
-   <Callout type="info">
-     The CopilotKit repository is a monorepo using a [pnpm](https://pnpm.io/) workspace. Tasks across packages are orchestrated with [Nx](https://nx.dev/).
-   </Callout>
- 
- Install the dependencies using pnpm:
- 
- ```bash
- pnpm install
- ```
- 
-   </Step>
-   <Step>
-   ### Build Packages
-   To make sure everything works, let's build all packages once:
-   ```bash
-   pnpm run build
-   ```
-   </Step>
- </Steps>
- 
- ## Step 3: Development Mode
- 
- Now that everything is set up and works as expected, you can get started developing:
- 
- ```bash
- # Start all packages in development mode
- pnpm run dev
- 
- # Start a specific package in development mode
- pnpm exec nx watch --projects=packages/package-name -- pnpm run build
- ```
- 
- Now you can start making changes to the code.
- 
- <Callout type="info">
-   You can find all `@copilotkit/*` packages under the `packages` folder of the
-   monorepo.
- </Callout>
- 
- ## Step 4: Test Changes in Real-Time
- 
- In most cases, you want to seamlessly be able to test your changes in real-time as you develop.
- 
- We have an `examples` folder in the monorepo with a few different examples using CopilotKit. You can run these examples to test your changes, as they are linked to the `@copilotkit/*` packages in the monorepo.
- 
- 
- 
- 
- For Angular changes, validate the Angular package and Showcase host through Nx:
- 
- ```bash
- pnpm exec nx run @copilotkit/angular:test
- pnpm exec nx run @copilotkit/showcase-angular-host:test
- ```
- 
- The Angular Showcase under `showcase/angular` is the frontend-native test host
- for components, signals, tools, generative UI, interrupts, threads, and
- lifecycle behavior.
- 
- 
- ## Step 5: Formatting and Linting
- 
- Before committing your changes, ensure your files are formatted properly by running the following at the root of the monorepo:
- 
- ```bash
- pnpm run format
- ```
- 
- Additionally, ensure you have no linting errors:
- 
- ```bash
- pnpm run lint
- ```
- 
- ## Step 6: Submit a Pull Request
- 
- Now that you've made your changes, commit and push them. Then, simply head over to the [Pull Requests page](https://github.com/CopilotKit/CopilotKit/pulls) and create a pull request. Well done!
- 
- ## Starting a dev environment with hot reload
- 
- CopilotKit contains a ready-made script for starting a development environment based on one of the CoAgent examples. It lets you work on CopilotKit internals in the core Typescript and Python code while seeing your changes applied to the chosen example.
- 
- As a prerequisite, make sure you have GNU parallel and langgraph CLI installed.
- 
- Next, go to the `CopilotKit/` directory and run the `example.sh` script for the example you want to work on:
- 
- ```bash
- ./scripts/develop/example.sh coagents-starter
- ```
- 
- This will start a development environment with hot reload.
- 
- You can optionally run the same example on LangGraph platform by running:
- 
- ```bash
- ./scripts/develop/example.sh coagents-starter langgraph-platform
- ```
- 
- ## Debugging
- 
- Every time you run CopilotKit on localhost, you will be able to see the **CopilotKit Dev Console** in the chat window. The Dev Console provides you with useful functionality to debug your copilot (e.g. see what state the copilot is aware of, actions it can perform, etc).
- 
- <Frame description="CopilotKit Dev Console">
-   <img
-     src="https://cdn.copilotkit.ai/docs/copilotkit/images/contributing/copilotkit-dev-console.png"
-     className="w-auto max-w-[420px]"
-   />
- </Frame>
- 
- 
- 
- 
- For Angular debugging workflows, use the [Angular troubleshooting guide](/angular/agno/guides/troubleshooting) and the AG-UI Event Inspector.
- 
- 
- ## (Advanced) Package Linking
- 
- In some cases, you want to test your CopilotKit changes in your own project. For example, you tried to integrate CopilotKit into your own codebase and encountered a bug you want to fix.
- 
- Conveniently, you can link your local CopilotKit packages to your own project to test your changes.
- 
- Check out the [Advanced: Package Linking](/angular/agno/contributing/code-contributions/package-linking) guide to learn how to do that.
- 
- ## Need help?
- 
- If you need help with anything, please don't hesitate to reach out to us on [Discord](https://discord.gg/6dffbvGU3D). We have a dedicated [#contributing](https://discord.com/channels/1122926057641742418/1183863183149117561) channel.
+ # Code Contributions
+ 
+ We are grateful for your interest in contributing to CopilotKit. We welcome new contributors and appreciate your help in making CopilotKit better.
+ 
+ This guide will help you get started as smoothly as possible.
+ 
+ ## Step 1: Install Prerequisites
+ 
+ - [Node.js](https://nodejs.org/en/) 20.x or later
+ - [pnpm](https://pnpm.io/) v10.x installed globally (`npm i -g pnpm@^10`)
+ 
+ ## Step 2: Repository Setup
+ 
+ <Steps>
+   <Step>
+   ### Fork The Repository
+   First, head over to the [CopilotKit repository](https://github.com/CopilotKit/CopilotKit) and create a fork.
+ 
+ Then, clone your fork to your local machine:
+ 
+ ```bash
+ git clone https://github.com/<your-username>/CopilotKit
+ cd CopilotKit
+ ```
+ 
+   </Step>
+   <Step>
+   ### Install Dependencies
+   <Callout type="info">
+     The CopilotKit repository is a monorepo using a [pnpm](https://pnpm.io/) workspace. Tasks across packages are orchestrated with [Nx](https://nx.dev/).
+   </Callout>
+ 
+ Install the dependencies using pnpm:
+ 
+ ```bash
+ pnpm install
+ ```
+ 
+   </Step>
+   <Step>
+   ### Build Packages
+   To make sure everything works, let's build all packages once:
+   ```bash
+   pnpm run build
+   ```
+   </Step>
+ </Steps>
+ 
+ ## Step 3: Development Mode
+ 
+ Now that everything is set up and works as expected, you can get started developing:
+ 
+ ```bash
+ # Start all packages in development mode
+ pnpm run dev
+ 
+ # Start a specific package in development mode
+ pnpm exec nx watch --projects=packages/package-name -- pnpm run build
+ ```
+ 
+ Now you can start making changes to the code.
+ 
+ <Callout type="info">
+   You can find all `@copilotkit/*` packages under the `packages` folder of the
+   monorepo.
+ </Callout>
+ 
+ ## Step 4: Test Changes in Real-Time
+ 
+ In most cases, you want to seamlessly be able to test your changes in real-time as you develop.
+ 
+ We have an `examples` folder in the monorepo with a few different examples using CopilotKit. You can run these examples to test your changes, as they are linked to the `@copilotkit/*` packages in the monorepo.
+ 
+ 
+ 
+ 
+ For Angular changes, validate the Angular package and Showcase host through Nx:
+ 
+ ```bash
+ pnpm exec nx run @copilotkit/angular:test
+ pnpm exec nx run @copilotkit/showcase-angular-host:test
+ ```
+ 
+ The Angular Showcase under `showcase/angular` is the frontend-native test host
+ for components, signals, tools, generative UI, interrupts, threads, and
+ lifecycle behavior.
+ 
+ 
+ ## Step 5: Formatting and Linting
+ 
+ Before committing your changes, ensure your files are formatted properly by running the following at the root of the monorepo:
+ 
+ ```bash
+ pnpm run format
+ ```
+ 
+ Additionally, ensure you have no linting errors:
+ 
+ ```bash
+ pnpm run lint
+ ```
+ 
+ ## Step 6: Submit a Pull Request
+ 
+ Now that you've made your changes, commit and push them. Then, simply head over to the [Pull Requests page](https://github.com/CopilotKit/CopilotKit/pulls) and create a pull request. Well done!
+ 
+ ## Starting a dev environment with hot reload
+ 
+ CopilotKit contains a ready-made script for starting a development environment based on one of the CoAgent examples. It lets you work on CopilotKit internals in the core Typescript and Python code while seeing your changes applied to the chosen example.
+ 
+ As a prerequisite, make sure you have GNU parallel and langgraph CLI installed.
+ 
+ Next, go to the `CopilotKit/` directory and run the `example.sh` script for the example you want to work on:
+ 
+ ```bash
+ ./scripts/develop/example.sh coagents-starter
+ ```
+ 
+ This will start a development environment with hot reload.
+ 
+ You can optionally run the same example on LangGraph platform by running:
+ 
+ ```bash
+ ./scripts/develop/example.sh coagents-starter langgraph-platform
+ ```
+ 
+ ## Debugging
+ 
+ Every time you run CopilotKit on localhost, you will be able to see the **CopilotKit Dev Console** in the chat window. The Dev Console provides you with useful functionality to debug your copilot (e.g. see what state the copilot is aware of, actions it can perform, etc).
+ 
+ <Frame description="CopilotKit Dev Console">
+   <img
+     src="https://cdn.copilotkit.ai/docs/copilotkit/images/contributing/copilotkit-dev-console.png"
+     className="w-auto max-w-[420px]"
+   />
+ </Frame>
+ 
+ 
+ 
+ 
+ For Angular debugging workflows, use the [Angular troubleshooting guide](/angular/agno/guides/troubleshooting) and the AG-UI Event Inspector.
+ 
+ 
+ ## (Advanced) Package Linking
+ 
+ In some cases, you want to test your CopilotKit changes in your own project. For example, you tried to integrate CopilotKit into your own codebase and encountered a bug you want to fix.
+ 
+ Conveniently, you can link your local CopilotKit packages to your own project to test your changes.
+ 
+ Check out the [Advanced: Package Linking](/angular/agno/contributing/code-contributions/package-linking) guide to learn how to do that.
+ 
+ ## Need help?
+ 
+ If you need help with anything, please don't hesitate to reach out to us on [Discord](https://discord.gg/6dffbvGU3D). We have a dedicated [#contributing](https://discord.com/channels/1122926057641742418/1183863183149117561) channel.
  
````

## 2026-08-26

### 19:38 UTC — 14 pages, highest severity high

**Medium — Angular**

`/angular/agno` · route `/` · under “Next steps”

0 code lines, 368 prose lines changed.

````diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted Enterprise Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for agno -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/agno/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [Enterprise Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for agno -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/agno/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
````

**Medium — Angular**

`/angular/agno/quickstart` · route `/quickstart` · under “Next steps”

0 code lines, 368 prose lines changed.

````diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted Enterprise Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for agno -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/agno/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [Enterprise Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/agno/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for agno -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/agno/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/agno/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
````

**Medium — Angular docs**

`/angular/agno/using-these-docs` · under “Angular docs”

0 code lines, 40 prose lines changed.

````diff
- # Angular docs
- 
- > Use the Angular quickstart, task guides, feature examples, source views, and typed API reference.
- 
- Use these pages based on what you want to build:
- 
- 1. Start with the [Angular quickstart](/angular/agno) to install the package, configure `provideCopilotKit`, and render the first standalone chat component.
- 2. Choose your agent backend in the sidebar. That selection changes backend setup and agent-framework examples without taking you out of the Angular docs.
- 3. Use the shared [Runtime](/angular/agno/backend/copilot-runtime) and [Enterprise Intelligence](/angular/agno/premium/overview) docs for server architecture, persistence, hosting, and operations. These concepts do not change with the frontend; only frontend-specific code does.
- 4. Use the task guides for [chat UI](/angular/agno/guides/chat-ui), [frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui), [human-in-the-loop flows](/angular/agno/guides/human-in-the-loop), [shared state](/angular/agno/guides/shared-state), [threads, memory, attachments, and headless UI](/angular/agno/guides/threads-memory-attachments-headless), and [troubleshooting](/angular/agno/guides/troubleshooting).
- 5. Browse [Angular feature examples](/angular/agno/features) for all 41 supported features. Forty entries include a runnable example, and every entry links to source and API docs.
- 6. Use the [Angular API reference](/reference/angular) for components, functions, services, directives, inputs, outputs, signals, and lifecycle rules.
- 
- Code labeled as a Showcase example is extracted from the runnable Angular
- Showcase source during the docs build. This keeps the guide and the application
- on the same implementation instead of maintaining a second copy.
- 
- JSON Renderer is not applicable to the Angular package. Use the [generative UI guide](/angular/agno/guides/frontend-tools-generative-ui#choose-a-generative-ui-path) for A2UI and the other Angular rendering paths.
- 
- For cleanup, errors, server rendering, hydration, and zoneless updates, see [Production and lifecycle](/reference/angular/production-lifecycle).
+ # Angular docs
+ 
+ > Use the Angular quickstart, task guides, feature examples, source views, and typed API reference.
+ 
+ Use these pages based on what you want to build:
+ 
+ 1. Start with the [Angular quickstart](/angular/agno) to install the package, configure `provideCopilotKit`, and render the first standalone chat component.
+ 2. Choose your agent backend in the sidebar. That selection changes backend setup and agent-framework examples without taking you out of the Angular docs.
+ 3. Use the shared [Runtime](/angular/agno/backend/copilot-runtime) and [CopilotKit Intelligence](/angular/agno/premium/overview) docs for server architecture, persistence, hosting, and operations. These concepts do not change with the frontend; only frontend-specific code does.
+ 4. Use the task guides for [chat UI](/angular/agno/guides/chat-ui), [frontend tools and generative UI](/angular/agno/guides/frontend-tools-generative-ui), [human-in-the-loop flows](/angular/agno/guides/human-in-the-loop), [shared state](/angular/agno/guides/shared-state), [threads, memory, attachments, and headless UI](/angular/agno/guides/threads-memory-attachments-headless), and [troubleshooting](/angular/agno/guides/troubleshooting).
+ 5. Browse [Angular feature examples](/angular/agno/features) for all 41 supported features. Forty entries include a runnable example, and every entry links to source and API docs.
+ 6. Use the [Angular API reference](/reference/angular) for components, functions, services, directives, inputs, outputs, signals, and lifecycle rules.
+ 
+ Code labeled as a Showcase example is extracted from the runnable Angular
+ Showcase source during the docs build. This keeps the guide and the application
+ on the same implementation instead of maintaining a second copy.
+ 
+ JSON Renderer is not applicable to the Angular package. Use the [generative UI guide](/angular/agno/guides/frontend-tools-generative-ui#choose-a-generative-ui-path) for A2UI and the other Angular rendering paths.
+ 
+ For cleanup, errors, server rendering, hydration, and zoneless updates, see [Production and lifecycle](/reference/angular/production-lifecycle).
  
````

**High — CopilotKit CLI**

`/angular/agno/cli` · under “Next steps”

14 code lines, 358 prose lines changed.

````diff
- # CopilotKit CLI
- 
- > Use the CopilotKit CLI to create apps, sign in to Cloud-Hosted Enterprise Intelligence, select projects, provision runtime API keys, import historical conversations, and install agent skills.
- 
- 
- 
- ## What is this?
- 
- The CopilotKit CLI helps you create CopilotKit apps connected to Enterprise Intelligence, whether cloud-hosted or self-hosted. It handles browser sign-in, project selection, project-scoped runtime API keys, historical thread import, and local project configuration so your app can use durable threads and conversation history.
- 
- Use the CLI when you want to start a new app, import historical ADK or LangGraph conversations, or install CopilotKit agent skills for your coding agent.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start managed Intelligence onboarding"
-   body="Sign up or sign in, finish organization onboarding when required, then return to the CLI to select a project and connect your app."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_cli_intro_signup"
- />
- 
- ## Prerequisites
- 
- - Node.js 20+
- - A CopilotKit account for Cloud-Hosted Enterprise Intelligence
- - An OpenAI API key or another model provider key for the starter app you choose
- 
- <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
-   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
- </Callout>
- 
- ## Start a new app
- 
- <Callout type="info" title="Creating vs. adding to an existing app">
-   `create` (aliased as `init`) scaffolds a brand-new project in its own directory — it prompts for an app name and does not detect or bootstrap an app you already have. To add CopilotKit to an existing app, follow the manual installation in the [Quickstart](/angular/agno/quickstart) instead.
- </Callout>
- 
- <Steps>
-   <Step>
-     ### Run create
- 
-     ```bash title="Terminal"
-     npx copilotkit@latest create
-     ```
- 
-     The CLI prompts for the app name and framework, opens browser sign-in when needed, scaffolds the starter, and connects the app to a cloud-hosted Enterprise Intelligence project.
-   </Step>
- 
-   <Step>
-     ### Sign up or sign in
- 
-     If you are not already signed in, the CLI opens a browser login flow. During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
- 
-     If the browser does not open, the CLI prints a login URL and supports a manual paste fallback.
-   </Step>
- 
-   <Step>
-     ### Select or create an organization
- 
-     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
-   </Step>
- 
-   <Step>
-     ### Return to the terminal
- 
-     After organization onboarding, return to the terminal. The original CLI command resumes and prompts you to select or create a project.
-   </Step>
- 
-   <Step>
-     ### Select or create a project
- 
-     Choose an existing cloud-hosted project or create a new one. A project is where your app's threads, messages, and platform metadata are stored.
- 
-     The CLI writes the selected project to `.copilotkit/project.json`:
- 
-     ```json title=".copilotkit/project.json"
-     {
-       "projectId": "proj_...",
-       "projectSlug": "support-assistant",
-       "clerkOrgId": "org_..."
-     }
-     ```
-   </Step>
- 
-   <Step>
-     ### Use the generated environment
- 
-     The CLI writes the hosted platform URLs and project-scoped runtime API key to `.env`.
- 
-     ```bash title=".env"
-     INTELLIGENCE_API_URL=https://...
-     INTELLIGENCE_GATEWAY_WS_URL=wss://...
-     INTELLIGENCE_API_KEY=cpk_...
-     ```
- 
-     Keep `INTELLIGENCE_API_KEY` on the server side. It is a runtime key for the selected project, not a frontend token.
-   </Step>
- 
-   <Step>
-     ### Start development
- 
-     ```bash title="Terminal"
-     npm run dev
-     ```
- 
-     The starter runs your local app and runtime while storing durable threads in the cloud-hosted project selected by the CLI.
-   </Step>
- </Steps>
- 
- ## Import and synchronize historical conversations
- 
- Use `import` from a CopilotKit app created with the CLI and Enterprise Intelligence enabled. The importer targets the Enterprise Intelligence project already selected for the current directory.
- 
- <Tabs groupId="cli-import-source" items={["ADK", "LangGraph"]}>
-   <Tab value="ADK">
- 
-     ```bash
-     npx copilotkit@latest import --source adk --dry-run
-     ```
- 
-   </Tab>
-   <Tab value="LangGraph">
- 
-     ```bash
-     npx copilotkit@latest import --source langgraph --dry-run
-     ```
- 
-   </Tab>
- </Tabs>
- 
- The command runs interactively by default. Start with `--dry-run` to discover source agent keys, conversation counts, skips, and the estimated upload size without opening an import batch.
- 
- If you need to import into a different project, select it before continuing with the real import:
- 
- ```bash title="Terminal"
- npx copilotkit@latest project select
- ```
- 
- This changes the project selected for the current directory and writes its project-scoped runtime key to the starter's generated `.env`.
- 
- Before the real import, export the destination values from that `.env`:
- 
- ```bash title="Terminal"
- export INTELLIGENCE_API_URL="https://..."
- export INTELLIGENCE_API_KEY="cpk_..."
- ```
- 
- The importer reads `--api-url` and `--api-key` or the current process environment. It does not load `.env` or `.copilotkit/project.json` automatically. `COPILOTKIT_API_KEY` is also accepted for the key.
- 
- Project selection updates the app configuration; the importer still receives its destination through flags or exported environment variables.
- 
- For the full adoption flow, see [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless). Source-specific setup lives in [Synchronize ADK threads](/angular/google-adk/threads-import) and [Synchronize LangGraph threads](/angular/langgraph-python/threads-import).
- 
- ## Auth commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest login` | Opens the browser sign-in flow and stores a local CLI session. |
- | `npx copilotkit@latest whoami` | Shows the signed-in user and active organization. |
- | `npx copilotkit@latest logout` | Clears the local CLI session. |
- 
- ## Project commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest project select` | Selects or creates a cloud-hosted Enterprise Intelligence project for the current directory. |
- | `npx copilotkit@latest import --source adk --dry-run` | Previews historical Google ADK conversation threads before import. |
- | `npx copilotkit@latest import --source langgraph --dry-run` | Previews historical LangGraph conversation threads before import. |
- | `npx copilotkit@latest license create` | Issues a CopilotKit license token for flows that require one. |
- | `npx copilotkit@latest license list` | Lists license metadata for the current user or organization. |
- 
- Re-running `project select` is safe when you need to move a CLI-created app to a different cloud-hosted project. The command updates `.copilotkit/project.json` and provisions a project-scoped API key for the selected project.
- 
- ## Skills commands
- 
- | Command | What it does |
- |---|---|
- | `npx copilotkit@latest skills install` | Installs CopilotKit agent skills for supported coding agents. |
- | `npx copilotkit@latest skills onboard` | Installs skills, then starts agent-assisted onboarding for an existing app. |
- 
- ## Next steps
- 
- - **Cloud-hosted platform:** [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plans in the hosted web app
- - **Add threads:** use the [Threads Drawer](/angular/agno/guides/threads-memory-attachments-headless) for a drop-in thread switcher, or [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) to build your own thread UI
- - **Synchronize thread history:** [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless) — import existing ADK or LangGraph conversations and keep future CopilotKit runs synchronized
- - **Self-hosting:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — run the Enterprise Intelligence Platform in your own Kubernetes cluster
+ # CopilotKit CLI
+ 
+ > Use the CopilotKit CLI to create apps, sign in to cloud-hosted CopilotKit Intelligence, select projects, provision runtime API keys, import historical conversations, and install agent skills.
+ 
+ 
+ 
+ ## What is this?
+ 
+ The CopilotKit CLI helps you create CopilotKit apps connected to CopilotKit Intelligence, whether cloud-hosted or self-hosted. It handles browser sign-in, project selection, project-scoped runtime API keys, historical thread import, and local project configuration so your app can use durable threads and conversation history.
+ 
+ Use the CLI when you want to start a new app, import historical ADK or LangGraph conversations, or install CopilotKit agent skills for your coding agent.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start managed Intelligence onboarding"
+   body="Sign up or sign in, finish organization onboarding when required, then return to the CLI to select a project and connect your app."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_cli_intro_signup"
+ />
+ 
+ ## Prerequisites
+ 
+ - Node.js 20+
+ - A CopilotKit account for cloud-hosted CopilotKit Intelligence
+ - An OpenAI API key or another model provider key for the starter app you choose
+ 
+ <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
+   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
+ </Callout>
+ 
+ ## Start a new app
+ 
+ <Callout type="info" title="Creating vs. adding to an existing app">
+   `create` (aliased as `init`) scaffolds a brand-new project in its own directory — it prompts for an app name and does not detect or bootstrap an app you already have. To add CopilotKit to an existing app, follow the manual installation in the [Quickstart](/angular/agno/quickstart) instead.
+ </Callout>
+ 
+ <Steps>
+   <Step>
+     ### Run create
+ 
+     ```bash title="Terminal"
+     npx copilotkit@latest create
+     ```
+ 
+     The CLI prompts for the app name and framework, opens browser sign-in when needed, scaffolds the starter, and connects the app to a cloud-hosted CopilotKit Intelligence project.
+   </Step>
+ 
+   <Step>
+     ### Sign up or sign in
+ 
+     If you are not already signed in, the CLI opens a browser login flow. During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
+ 
+     If the browser does not open, the CLI prints a login URL and supports a manual paste fallback.
+   </Step>
+ 
+   <Step>
+     ### Select or create an organization
+ 
+     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
+   </Step>
+ 
+   <Step>
+     ### Return to the terminal
+ 
+     After organization onboarding, return to the terminal. The original CLI command resumes and prompts you to select or create a project.
+   </Step>
+ 
+   <Step>
+     ### Select or create a project
+ 
+     Choose an existing cloud-hosted project or create a new one. A project is where your app's threads, messages, and platform metadata are stored.
+ 
+     The CLI writes the selected project to `.copilotkit/project.json`:
+ 
+     ```json title=".copilotkit/project.json"
+     {
+       "projectId": "proj_...",
+       "projectSlug": "support-assistant",
+       "clerkOrgId": "org_..."
+     }
+     ```
+   </Step>
+ 
+   <Step>
+     ### Use the generated environment
+ 
+     The CLI writes the hosted platform URLs and project-scoped runtime API key to `.env`.
+ 
+     ```bash title=".env"
+     INTELLIGENCE_API_URL=https://...
+     INTELLIGENCE_GATEWAY_WS_URL=wss://...
+     INTELLIGENCE_API_KEY=cpk_...
+     ```
+ 
+     Keep `INTELLIGENCE_API_KEY` on the server side. It is a runtime key for the selected project, not a frontend token.
+   </Step>
+ 
+   <Step>
+     ### Start development
+ 
+     ```bash title="Terminal"
+     npm run dev
+     ```
+ 
+     The starter runs your local app and runtime while storing durable threads in the cloud-hosted project selected by the CLI.
+   </Step>
+ </Steps>
+ 
+ ## Import and synchronize historical conversations
+ 
+ Use `import` from a CopilotKit app created with the CLI and CopilotKit Intelligence enabled. The importer targets the CopilotKit Intelligence project already selected for the current directory.
+ 
+ <Tabs groupId="cli-import-source" items={["ADK", "LangGraph"]}>
+   <Tab value="ADK">
+ 
+     ```bash
+     npx copilotkit@latest import --source adk --dry-run
+     ```
+ 
+   </Tab>
+   <Tab value="LangGraph">
+ 
+     ```bash
+     npx copilotkit@latest import --source langgraph --dry-run
+     ```
+ 
+   </Tab>
+ </Tabs>
+ 
+ The command runs interactively by default. Start with `--dry-run` to discover source agent keys, conversation counts, skips, and the estimated upload size without opening an import batch.
+ 
+ If you need to import into a different project, select it before continuing with the real import:
+ 
+ ```bash title="Terminal"
+ npx copilotkit@latest project select
+ ```
+ 
+ This changes the project selected for the current directory and writes its project-scoped runtime key to the starter's generated `.env`.
+ 
+ Before the real import, export the destination values from that `.env`:
+ 
+ ```bash title="Terminal"
+ export INTELLIGENCE_API_URL="https://..."
+ export INTELLIGENCE_API_KEY="cpk_..."
+ ```
+ 
+ The importer reads `--api-url` and `--api-key` or the current process environment. It does not load `.env` or `.copilotkit/project.json` automatically. `COPILOTKIT_API_KEY` is also accepted for the key.
+ 
+ Project selection updates the app configuration; the importer still receives its destination through flags or exported environment variables.
+ 
+ For the full adoption flow, see [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless). Source-specific setup lives in [Synchronize ADK threads](/angular/google-adk/threads-import) and [Synchronize LangGraph threads](/angular/langgraph-python/threads-import).
+ 
+ ## Auth commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest login` | Opens the browser sign-in flow and stores a local CLI session. |
+ | `npx copilotkit@latest whoami` | Shows the signed-in user and active organization. |
+ | `npx copilotkit@latest logout` | Clears the local CLI session. |
+ 
+ ## Project commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest project select` | Selects or creates a cloud-hosted CopilotKit Intelligence project for the current directory. |
+ | `npx copilotkit@latest import --source adk --dry-run` | Previews historical Google ADK conversation threads before import. |
+ | `npx copilotkit@latest import --source langgraph --dry-run` | Previews historical LangGraph conversation threads before import. |
+ | `npx copilotkit@latest license create` | Issues a CopilotKit license token for flows that require one. |
+ | `npx copilotkit@latest license list` | Lists license metadata for the current user or organization. |
+ 
+ Re-running `project select` is safe when you need to move a CLI-created app to a different cloud-hosted project. The command updates `.copilotkit/project.json` and provisions a project-scoped API key for the selected project.
+ 
+ ## Skills commands
+ 
+ | Command | What it does |
+ |---|---|
+ | `npx copilotkit@latest skills install` | Installs CopilotKit agent skills for supported coding agents. |
+ | `npx copilotkit@latest skills onboard` | Installs skills, then starts agent-assisted onboarding for an existing app. |
+ 
+ ## Next steps
+ 
+ - **Cloud-hosted platform:** [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plans in the hosted web app
+ - **Add threads:** use the [Threads Drawer](/angular/agno/guides/threads-memory-attachments-headless) for a drop-in thread switcher, or [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) to build your own thread UI
+ - **Synchronize thread history:** [Import & Synchronize Thread History](/angular/agno/guides/threads-memory-attachments-headless) — import existing ADK or LangGraph conversations and keep future CopilotKit runs synchronized
+ - **Self-hosting:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — run CopilotKit Intelligence in your own Kubernetes cluster
  
````

**Medium — Threads & Persistence Architecture**

`/angular/agno/premium/threads-explained` · under “Next steps”

0 code lines, 322 prose lines changed.

````diff
- # Threads & Persistence Architecture
- 
- > Architecture and mental model behind CopilotKit threads: how persistent conversations work, how reconnection replays history, and what to expect from thread lifecycle operations.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Want to see threads in your own app?"
-   body="Persistent threads ship with the Enterprise Intelligence Platform on the free Developer tier."
-   surface="docs_learn_threads"
- />
- 
- Start with the [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) to understand what Rich Threads provide
- and choose between the prebuilt Drawer and a custom headless UI. This page
- explains the persistence and replay architecture beneath both paths. For the
- client-side lifecycle (minting a `threadId`, hydrating history on load, and
- switching or starting threads), see [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless).
- 
- ## What are threads?
- 
- A thread is a persistent, server-side container for a multi-turn conversation between a user and an agent. Unlike ephemeral chat sessions that disappear when the page reloads, threads store the full event history (every message, tool call, and state change), so conversations can be paused, resumed, and replayed across sessions and devices.
- 
- Threads are a platform-level concept, not tied to any specific agent framework. Whether your backend uses LangGraph, Mastra, CrewAI, or any other framework, threads work the same way.
- 
- ## Key concepts
- 
- ### Thread vs. Run
- 
- A **thread** is the durable container. A **run** is a single agent execution within that thread. One thread can have many runs. Each time the user sends a message and the agent responds, that is a new run, and the thread accumulates events across all of its runs.
- 
- ### How the pieces fit together
- 
- From a developer's perspective, threads involve three things:
- 
- | What you use | What it does |
- |-------------|-------------|
- | Frontend thread API | Lists, renames, archives, and deletes threads. Supports pagination and stays in sync across tabs and devices via WebSocket. |
- | `CopilotChat` with `threadId` | Connects to a specific thread, loads its history, and streams new events in realtime. |
- | `CopilotRuntime` | Server-side layer that executes agents, stores thread data on the Enterprise Intelligence Platform, and relays events to connected clients. |
- 
- You interact with the first two. The runtime and platform handle persistence and sync behind the scenes.
- 
- To wire these pieces into a custom chat UI, follow [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless).
- 
- ### Auto-naming
- 
- When a new thread is created and the first run completes, the runtime automatically generates a short name (2–5 words) using the LLM. This runs asynchronously, so it doesn't block thread creation or the agent's response. The generated name appears through the frontend thread API via realtime sync.
- 
- Auto-naming is enabled by default. Disable it with `generateThreadNames: false` on the runtime. Users can always override the generated name via `renameThread()`.
- 
- ### Archive vs. delete
- 
- Threads support two removal operations with different semantics:
- 
- - **Archive** is a soft delete. The thread remains stored but disappears from the default list. Show archived threads by setting `includeArchived: true` in the frontend thread API. Threads can also be unarchived, which restores them to the active list.
- - **Delete** is permanent and irreversible. The thread and its history are removed entirely.
- 
- Neither operation has a built-in confirmation dialog, so your application should implement its own if needed.
- 
- ## How it works
- 
- The client-side steps (minting a `threadId`, hydrating history on load, and switching or starting threads) live in [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless). This section covers what the platform does underneath: persisting runs, replaying them, and keeping every connected client in sync.
- 
- ### Persistence and replay
- 
- As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread on the Enterprise Intelligence Platform. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
- 
- When a client opens an existing thread, the platform checks whether a run is in progress:
- 
- - **No active run.** The platform returns the historical events only, and the client replays them to reconstruct the conversation.
- - **Active run.** The platform returns the historical events *plus* opens a WebSocket connection. The client replays the history, then receives live events as they stream in.
- 
- In either case the transition from replayed history to live updates is seamless. If a tool call from a previous thread completes while the client is switching away, its result is discarded rather than inserted into the new thread, so stale output never leaks between conversations.
- 
- ### Realtime sync
- 
- The frontend thread client maintains a WebSocket subscription for thread metadata changes. When any client creates, renames, archives, or deletes a thread, the update is pushed to all connected clients automatically. This is how a thread created on one tab appears in the sidebar on another tab without polling.
- 
- ### Future runs and native persistence
- 
- Importing history is a one-time adoption step. Afterward, future conversations
- that run through CopilotKit are persisted to Enterprise Intelligence. When the
- agent also keeps a durable LangGraph checkpointer or LangGraph Platform
- deployment wired, the same runs continue through LangGraph's native persistence.
- An ADK agent behaves similarly when it remains connected to a durable session
- service that retains its sessions.
- 
- That coordinated future persistence lets teams retain native framework storage
- and analytics while adding the Rich Threads experience for users. It is not a
- general replication link between databases: frontend thread operations such as
- rename, archive, and delete change the Enterprise Intelligence thread and do not
- mutate records in LangGraph, ADK, or another native store.
- 
- ### Pessimistic updates
- 
- Thread mutations (`rename`, `archive`, `delete`) use a pessimistic update model: the client waits for the server to confirm via WebSocket before updating the thread list. This means:
- 
- - The thread list doesn't change until the server confirms the operation.
- - If the server rejects the mutation, the UI never shows an incorrect state.
- - The returned promise resolves only after server confirmation, or rejects on failure.
- 
- ## Error handling
- 
- ### Mutation failures
- 
- All mutation methods (`renameThread`, `archiveThread`, `deleteThread`) return promises that reject with an `Error` if the server cannot complete the operation. Common causes:
- 
- - **Network failure.** The client can't reach the runtime.
- - **Thread not found.** Another client deleted the thread before your mutation arrived.
- - **Authorization failure.** The user doesn't have permission to modify the thread.
- - **Timeout.** The server didn't respond within 15 seconds.
- 
- The thread client exposes the most recent list or mutation error and clears it
- after the next successful operation.
- 
- ### WebSocket disconnection
- 
- If the WebSocket connection drops (network change, server restart, laptop sleep):
- 
- - **Thread list.** The frontend thread API stops receiving realtime updates, so the list becomes stale until the connection is re-established. Reconnection is automatic with exponential backoff.
- - **Active conversation.** If `CopilotChat` loses its WebSocket mid-run, the agent's output may be interrupted. Reloading the page, or switching away and back to the thread, triggers the reconnection flow, which replays any missed events.
- 
- ### Thread locked
- 
- If a thread already has an active run and another client tries to start a new run on the same thread, the request is rejected with a **409 Conflict**. This prevents two agent runs from interleaving events on the same thread. The existing run must complete or be stopped before a new one can begin.
- 
- The runtime acquires a Redis-backed lock on the thread for the duration of each run. You can tune this behavior on the runtime:
- 
- | Option | Default | Max | Description |
- |--------|---------|-----|-------------|
- | `lockTtlSeconds` | `20` | `3600` (1 hour) | How long the lock is held before it expires automatically. |
- | `lockHeartbeatIntervalSeconds` | `15` | `3000` (50 min) | How often the runtime renews the lock during a run. The heartbeat always runs; you only need to adjust the interval. |
- | `lockKeyPrefix` | — | — | Custom Redis key prefix for the thread lock. Useful when multiple apps share a Redis instance. |
- 
- If a run completes normally, the lock is released immediately. The TTL is a safety net for cases where the runtime crashes without releasing the lock.
- 
- ## Design decisions
- 
- ### Why event replay instead of message snapshots?
- 
- Threads store the raw event stream rather than a snapshot of the final message list. This enables:
- 
- - **Partial replay.** When reconnecting, the client only fetches events it missed rather than reloading the entire history.
- - **Faithful reproduction.** Streaming tokens, tool calls, and state changes replay exactly as they originally occurred.
- 
- The trade-off is that replay is more complex than loading a message array. The platform handles this complexity so your application doesn't have to.
- 
- ### When threads are the wrong tool
- 
- - **Ephemeral interactions.** If your users don't need conversation history (e.g., a one-shot Q&A widget), threads add unnecessary complexity. Use `CopilotChat` without a `threadId`.
- - **Client-only state.** If you need local-only chat history without server persistence, manage messages in frontend state or localStorage instead.
- 
- ## Next steps
- 
- - **Client lifecycle:** [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless) — how a `threadId` is minted, hydrated, and switched on the client
- - **Overview:** [Rich Threads](/angular/agno/guides/threads-memory-attachments-headless) — understand the feature and choose an implementation path
- - **Step-by-step guide:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — build a custom thread-management UI
- 
- 
- 
- - **Angular guide:** <a href="/angular/agno/guides/threads-memory-attachments-headless">Threads, memory, attachments, and headless UI</a>
- - **API reference:** <a href="/reference/angular/functions/injectThreads">injectThreads</a> — options, signals, and mutations
+ # Threads & Persistence Architecture
+ 
+ > Architecture and mental model behind CopilotKit threads: how persistent conversations work, how reconnection replays history, and what to expect from thread lifecycle operations.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Want to see threads in your own app?"
+   body="Persistent threads ship with CopilotKit Intelligence on the free Developer tier."
+   surface="docs_learn_threads"
+ />
+ 
+ Start with the [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) to understand what Rich Threads provide
+ and choose between the prebuilt Drawer and a custom headless UI. This page
+ explains the persistence and replay architecture beneath both paths. For the
+ client-side lifecycle (minting a `threadId`, hydrating history on load, and
+ switching or starting threads), see [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless).
+ 
+ ## What are threads?
+ 
+ A thread is a persistent, server-side container for a multi-turn conversation between a user and an agent. Unlike ephemeral chat sessions that disappear when the page reloads, threads store the full event history (every message, tool call, and state change), so conversations can be paused, resumed, and replayed across sessions and devices.
+ 
+ Threads are a platform-level concept, not tied to any specific agent framework. Whether your backend uses LangGraph, Mastra, CrewAI, or any other framework, threads work the same way.
+ 
+ ## Key concepts
+ 
+ ### Thread vs. Run
+ 
+ A **thread** is the durable container. A **run** is a single agent execution within that thread. One thread can have many runs. Each time the user sends a message and the agent responds, that is a new run, and the thread accumulates events across all of its runs.
+ 
+ ### How the pieces fit together
+ 
+ From a developer's perspective, threads involve three things:
+ 
+ | What you use | What it does |
+ |-------------|-------------|
+ | Frontend thread API | Lists, renames, archives, and deletes threads. Supports pagination and stays in sync across tabs and devices via WebSocket. |
+ | `CopilotChat` with `threadId` | Connects to a specific thread, loads its history, and streams new events in realtime. |
+ | `CopilotRuntime` | Server-side layer that executes agents, stores thread data in CopilotKit Intelligence, and relays events to connected clients. |
+ 
+ You interact with the first two. The runtime and platform handle persistence and sync behind the scenes.
+ 
+ To wire these pieces into a custom chat UI, follow [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless).
+ 
+ ### Auto-naming
+ 
+ When a new thread is created and the first run completes, the runtime automatically generates a short name (2–5 words) using the LLM. This runs asynchronously, so it doesn't block thread creation or the agent's response. The generated name appears through the frontend thread API via realtime sync.
+ 
+ Auto-naming is enabled by default. Disable it with `generateThreadNames: false` on the runtime. Users can always override the generated name via `renameThread()`.
+ 
+ ### Archive vs. delete
+ 
+ Threads support two removal operations with different semantics:
+ 
+ - **Archive** is a soft delete. The thread remains stored but disappears from the default list. Show archived threads by setting `includeArchived: true` in the frontend thread API. Threads can also be unarchived, which restores them to the active list.
+ - **Delete** is permanent and irreversible. The thread and its history are removed entirely.
+ 
+ Neither operation has a built-in confirmation dialog, so your application should implement its own if needed.
+ 
+ ## How it works
+ 
+ The client-side steps (minting a `threadId`, hydrating history on load, and switching or starting threads) live in [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless). This section covers what the platform does underneath: persisting runs, replaying them, and keeping every connected client in sync.
+ 
+ ### Persistence and replay
+ 
+ As an agent runs, the runtime writes each event (messages, tool calls, and state updates) to the thread in CopilotKit Intelligence. It stores the raw event stream rather than a snapshot of the final message list, so a returning client can be restored to the exact state it left, and can fetch only the events it missed rather than reloading the whole history.
+ 
+ When a client opens an existing thread, the platform checks whether a run is in progress:
+ 
+ - **No active run.** The platform returns the historical events only, and the client replays them to reconstruct the conversation.
+ - **Active run.** The platform returns the historical events *plus* opens a WebSocket connection. The client replays the history, then receives live events as they stream in.
+ 
+ In either case the transition from replayed history to live updates is seamless. If a tool call from a previous thread completes while the client is switching away, its result is discarded rather than inserted into the new thread, so stale output never leaks between conversations.
+ 
+ ### Realtime sync
+ 
+ The frontend thread client maintains a WebSocket subscription for thread metadata changes. When any client creates, renames, archives, or deletes a thread, the update is pushed to all connected clients automatically. This is how a thread created on one tab appears in the sidebar on another tab without polling.
+ 
+ ### Future runs and native persistence
+ 
+ Importing history is a one-time adoption step. Afterward, future conversations
+ that run through CopilotKit are persisted to CopilotKit Intelligence. When the
+ agent also keeps a durable LangGraph checkpointer or LangGraph Platform
+ deployment wired, the same runs continue through LangGraph's native persistence.
+ An ADK agent behaves similarly when it remains connected to a durable session
+ service that retains its sessions.
+ 
+ That coordinated future persistence lets teams retain native framework storage
+ and analytics while adding the Rich Threads experience for users. It is not a
+ general replication link between databases: frontend thread operations such as
+ rename, archive, and delete change the CopilotKit Intelligence thread and do not
+ mutate records in LangGraph, ADK, or another native store.
+ 
+ ### Pessimistic updates
+ 
+ Thread mutations (`rename`, `archive`, `delete`) use a pessimistic update model: the client waits for the server to confirm via WebSocket before updating the thread list. This means:
+ 
+ - The thread list doesn't change until the server confirms the operation.
+ - If the server rejects the mutation, the UI never shows an incorrect state.
+ - The returned promise resolves only after server confirmation, or rejects on failure.
+ 
+ ## Error handling
+ 
+ ### Mutation failures
+ 
+ All mutation methods (`renameThread`, `archiveThread`, `deleteThread`) return promises that reject with an `Error` if the server cannot complete the operation. Common causes:
+ 
+ - **Network failure.** The client can't reach the runtime.
+ - **Thread not found.** Another client deleted the thread before your mutation arrived.
+ - **Authorization failure.** The user doesn't have permission to modify the thread.
+ - **Timeout.** The server didn't respond within 15 seconds.
+ 
+ The thread client exposes the most recent list or mutation error and clears it
+ after the next successful operation.
+ 
+ ### WebSocket disconnection
+ 
+ If the WebSocket connection drops (network change, server restart, laptop sleep):
+ 
+ - **Thread list.** The frontend thread API stops receiving realtime updates, so the list becomes stale until the connection is re-established. Reconnection is automatic with exponential backoff.
+ - **Active conversation.** If `CopilotChat` loses its WebSocket mid-run, the agent's output may be interrupted. Reloading the page, or switching away and back to the thread, triggers the reconnection flow, which replays any missed events.
+ 
+ ### Thread locked
+ 
+ If a thread already has an active run and another client tries to start a new run on the same thread, the request is rejected with a **409 Conflict**. This prevents two agent runs from interleaving events on the same thread. The existing run must complete or be stopped before a new one can begin.
+ 
+ The runtime acquires a Redis-backed lock on the thread for the duration of each run. You can tune this behavior on the runtime:
+ 
+ | Option | Default | Max | Description |
+ |--------|---------|-----|-------------|
+ | `lockTtlSeconds` | `20` | `3600` (1 hour) | How long the lock is held before it expires automatically. |
+ | `lockHeartbeatIntervalSeconds` | `15` | `3000` (50 min) | How often the runtime renews the lock during a run. The heartbeat always runs; you only need to adjust the interval. |
+ | `lockKeyPrefix` | — | — | Custom Redis key prefix for the thread lock. Useful when multiple apps share a Redis instance. |
+ 
+ If a run completes normally, the lock is released immediately. The TTL is a safety net for cases where the runtime crashes without releasing the lock.
+ 
+ ## Design decisions
+ 
+ ### Why event replay instead of message snapshots?
+ 
+ Threads store the raw event stream rather than a snapshot of the final message list. This enables:
+ 
+ - **Partial replay.** When reconnecting, the client only fetches events it missed rather than reloading the entire history.
+ - **Faithful reproduction.** Streaming tokens, tool calls, and state changes replay exactly as they originally occurred.
+ 
+ The trade-off is that replay is more complex than loading a message array. The platform handles this complexity so your application doesn't have to.
+ 
+ ### When threads are the wrong tool
+ 
+ - **Ephemeral interactions.** If your users don't need conversation history (e.g., a one-shot Q&A widget), threads add unnecessary complexity. Use `CopilotChat` without a `threadId`.
+ - **Client-only state.** If you need local-only chat history without server persistence, manage messages in frontend state or localStorage instead.
+ 
+ ## Next steps
+ 
+ - **Client lifecycle:** [Thread & History Lifecycle](/angular/agno/guides/threads-memory-attachments-headless) — how a `threadId` is minted, hydrated, and switched on the client
+ - **Overview:** [Rich Threads](/angular/agno/guides/threads-memory-attachments-headless) — understand the feature and choose an implementation path
+ - **Step-by-step guide:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — build a custom thread-management UI
+ 
+ 
+ 
+ - **Angular guide:** <a href="/angular/agno/guides/threads-memory-attachments-headless">Threads, memory, attachments, and headless UI</a>
+ - **API reference:** <a href="/reference/angular/functions/injectThreads">injectThreads</a> — options, signals, and mutations
  
````

**Medium — CopilotKit Intelligence**

`/angular/agno/premium/overview` · under “Can I start cloud-hosted and move to self-hosted later?”

0 code lines, 150 prose lines changed.

````diff
- # Enterprise Intelligence Platform
- 
- > Enterprise Intelligence Platform overview for CopilotKit — features, cloud-hosted and self-hosted deployment options, threads, hosted inspection, and production operations.
- 
- 
- 
- ## What is the Enterprise Intelligence Platform?
- 
- The Enterprise Intelligence Platform is CopilotKit's production layer for durable threads, persistence, hosted inspection, and operational visibility. It sits beside your CopilotKit runtime and gives production agentic applications shared infrastructure without changing the frontend SDK, AG-UI protocol, or agent framework you use.
- 
- Start here when you are deciding what the platform gives you and where it should run. The rest of the Intelligence Platform docs are deeper dives into the specific feature or hosting path you choose.
- 
- <Callout type="info" title="See this in Inspector">
-   Open Inspector on localhost. Go to **Learning**.
-   Memory and learning tools for this session appear here.
- 
-   More detail: [Inspector](/angular/agno/inspector).
- </Callout>
- 
- 
- ## What the platform adds
- 
- | Capability | What it gives you | Deeper dive |
- |---|---|---|
- | Durable threads and persistence | Resumable conversations that survive reloads, devices, and browser sessions. | [Threads](/angular/agno/guides/threads-memory-attachments-headless) and [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
- | Cloud-hosted Intelligence features | Projects, project API keys, conversation history, thread inspection, and plan management. | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) |
- | Premium UI capabilities | Platform-gated UI surfaces such as Fully Headless Chat UI. | [Fully Headless Chat UI](/angular/agno/guides/threads-memory-attachments-headless) |
- | Self-hosting | The same platform running inside your own Kubernetes cluster, VPC, or data boundary. | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) |
- 
- ## Hosting options
- 
- | Option | Choose it when | What you operate |
- |---|---|---|
- | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) | You want CopilotKit to run the platform for you: hosted projects, API keys, thread history, dashboard inspection, and plan management. | Your app, your runtime, your agent, and your model provider credentials. |
- | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) | You need the platform inside your own VPC, Kubernetes cluster, data residency boundary, or enterprise operations model. | The `copilot-intelligence` Helm release, Postgres, Redis, ingress, OIDC, secrets, upgrades, and monitoring. |
- 
- Both options use the same CopilotKit application surface. Your frontend still uses CopilotKit APIs, your runtime still speaks AG-UI, and your agents keep the same framework integration. The deployment choice changes the platform endpoint and credentials your runtime uses.
- 
- ## Plans and access
- 
- The cloud-hosted version includes self-service plans for individual developers and teams, plus enterprise options for larger deployments. You manage cloud-hosted plans in the web app.
- 
- Self-hosted access is available on the Team self-hosted plan or a custom Enterprise plan. Use it when you have a concrete compliance, residency, network, or platform-operations requirement that makes a hosted service the wrong fit.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Create a free Enterprise Intelligence Platform account"
-   body="Start with the cloud-hosted Developer tier, create a project, and inspect persistent threads from the web app."
-   surface="docs_premium_overview"
- />
- 
- ## Which page should I read next?
- 
- | Goal | Read this |
- |---|---|
- | Decide what the platform includes | Stay on this overview. |
- | Connect an app to hosted projects and API keys | [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) |
- | Run the platform in your own cluster | [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) |
- | Understand the runtime/platform architecture | [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) |
- | Add persistent conversations to an app | [Threads](/angular/agno/guides/threads-memory-attachments-headless) |
- | Understand thread replay and realtime sync | [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
- 
- ## FAQs
- 
- ### Does my application code change between hosting options?
- 
- No. Your frontend UI, CopilotKit runtime, and agent integration stay focused on CopilotKit APIs. The deployment mode changes which platform URL and credentials your runtime uses.
- 
- ### What is the difference between a project API key and a license key?
- 
- A project API key connects your runtime to one cloud-hosted Enterprise Intelligence project. A license key unlocks self-hosted Enterprise Intelligence capabilities and does not require runtime traffic to go through the cloud-hosted service.
- 
- ### Can I start cloud-hosted and move to self-hosted later?
- 
- Yes. The application integration is intentionally the same. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan. Plan the migration around data movement, identity, network endpoints, and operational ownership rather than a frontend rewrite.
+ # CopilotKit Intelligence
+ 
+ > CopilotKit Intelligence overview for CopilotKit — features, cloud-hosted and self-hosted deployment options, threads, hosted inspection, and production operations.
+ 
+ 
+ 
+ ## What is CopilotKit Intelligence?
+ 
+ CopilotKit Intelligence is CopilotKit's production layer for durable threads, persistence, hosted inspection, and operational visibility. It sits beside your CopilotKit runtime and gives production agentic applications shared infrastructure without changing the frontend SDK, AG-UI protocol, or agent framework you use.
+ 
+ Start here when you are deciding what the platform gives you and where it should run. The rest of the Intelligence docs are deeper dives into the specific feature or hosting path you choose.
+ 
+ <Callout type="info" title="See this in Inspector">
+   Open Inspector on localhost. Go to **Learning**.
+   Memory and learning tools for this session appear here.
+ 
+   More detail: [Inspector](/angular/agno/inspector).
+ </Callout>
+ 
+ 
+ ## What the platform adds
+ 
+ | Capability | What it gives you | Deeper dive |
+ |---|---|---|
+ | Durable threads and persistence | Resumable conversations that survive reloads, devices, and browser sessions. | [Threads](/angular/agno/guides/threads-memory-attachments-headless) and [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
+ | Cloud-hosted Intelligence features | Projects, project API keys, conversation history, thread inspection, and plan management. | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) |
+ | Premium UI capabilities | Platform-gated UI surfaces such as Fully Headless Chat UI. | [Fully Headless Chat UI](/angular/agno/guides/threads-memory-attachments-headless) |
+ | Self-hosting | The same platform running inside your own Kubernetes cluster, VPC, or data boundary. | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) |
+ 
+ ## Hosting options
+ 
+ | Option | Choose it when | What you operate |
+ |---|---|---|
+ | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) | You want CopilotKit to run the platform for you: hosted projects, API keys, thread history, dashboard inspection, and plan management. | Your app, your runtime, your agent, and your model provider credentials. |
+ | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) | You need the platform inside your own VPC, Kubernetes cluster, data residency boundary, or enterprise operations model. | The `copilot-intelligence` Helm release, Postgres, Redis, ingress, OIDC, secrets, upgrades, and monitoring. |
+ 
+ Both options use the same CopilotKit application surface. Your frontend still uses CopilotKit APIs, your runtime still speaks AG-UI, and your agents keep the same framework integration. The deployment choice changes the platform endpoint and credentials your runtime uses.
+ 
+ ## Plans and access
+ 
+ The cloud-hosted version includes self-service plans for individual developers and teams, plus the Enterprise Intelligence tier for larger deployments. You manage cloud-hosted plans in the web app.
+ 
+ Self-hosted access is available on the Team self-hosted plan or a custom Enterprise plan. Use it when you have a concrete compliance, residency, network, or platform-operations requirement that makes a hosted service the wrong fit.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Create a free CopilotKit Intelligence account"
+   body="Start with the cloud-hosted Developer tier, create a project, and inspect persistent threads from the web app."
+   surface="docs_premium_overview"
+ />
+ 
+ ## Which page should I read next?
+ 
+ | Goal | Read this |
+ |---|---|
+ | Decide what the platform includes | Stay on this overview. |
+ | Connect an app to hosted projects and API keys | [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) |
+ | Run the platform in your own cluster | [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) |
+ | Understand the runtime/platform architecture | [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) |
+ | Add persistent conversations to an app | [Threads](/angular/agno/guides/threads-memory-attachments-headless) |
+ | Understand thread replay and realtime sync | [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) |
+ 
+ ## FAQs
+ 
+ ### Does my application code change between hosting options?
+ 
+ No. Your frontend UI, CopilotKit runtime, and agent integration stay focused on CopilotKit APIs. The deployment mode changes which platform URL and credentials your runtime uses.
+ 
+ ### What is the difference between a project API key and a license key?
+ 
+ A project API key connects your runtime to one cloud-hosted CopilotKit Intelligence project. A license key unlocks self-hosted CopilotKit Intelligence capabilities and does not require runtime traffic to go through the cloud-hosted service.
+ 
+ ### Can I start cloud-hosted and move to self-hosted later?
+ 
+ Yes. The application integration is intentionally the same. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan. Plan the migration around data movement, identity, network endpoints, and operational ownership rather than a frontend rewrite.
  
````

**Medium — Cloud-hosted CopilotKit Intelligence**

`/angular/agno/premium/managed-intelligence-platform` · under “Next steps”

0 code lines, 252 prose lines changed.

````diff
- # Cloud-Hosted Enterprise Intelligence
- 
- > How the cloud-hosted version of the CopilotKit Enterprise Intelligence Platform works — login, organizations, projects, project API keys, conversation history, thread inspection, and plan management.
- 
- Cloud-Hosted Enterprise Intelligence is the CopilotKit-operated deployment of the same Enterprise Intelligence Platform you can also self-host. Use it when you want durable threads, project-scoped API keys, conversation history, the hosted web app, and plan management without operating Kubernetes infrastructure.
- 
- ![The Cloud-Hosted Enterprise Intelligence ready page with starter commands and project navigation.](/angular/agno/images/enterprise-intelligence/managed-ready.png)
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start hosted onboarding"
-   body="Sign up or sign in, finish organization onboarding, then return to the CLI or hosted app to select a project."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_premium_managed_intelligence_platform_intro"
- />
- 
- ## What the cloud-hosted version provides
- 
- The cloud-hosted version runs the Enterprise Intelligence Platform for you. Your application keeps using the CopilotKit SDK and runtime APIs, while the hosted service stores project-scoped platform data: threads, events, runtime connection metadata, and API keys.
- 
- The hosted web app is the control surface for developers and administrators. End users of your application do not sign in to this dashboard. Your app still controls end-user identity and passes user context through the runtime, while the hosted service scopes stored threads to the project your app is connected to.
- 
- Use Cloud-Hosted Enterprise Intelligence when you want the fastest path to production. Use [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) when your organization needs the platform inside its own VPC, cluster, or data boundary.
- 
- ## Hosted onboarding
- 
- Start at [dashboard.operations.copilotkit.ai](https://dashboard.operations.copilotkit.ai) or in the CopilotKit CLI.
- 
- <Steps>
-   <Step>
-     ### Sign up or sign in
- 
-     During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
-   </Step>
- 
-   <Step>
-     ### Select or create an organization
- 
-     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
-   </Step>
- 
-   <Step>
-     ### Continue where you started
- 
-     After organization onboarding, the browser resumes the exact CLI or hosted-app destination that sent you there. If the CLI opened the browser, return to the terminal and let the original command continue.
-   </Step>
- 
-   <Step>
-     ### Select or create a project
- 
-     The resumed CLI or hosted app asks you to choose the project that will hold your app's threads, events, runtime connection metadata, and API keys, or create a new one. In the dashboard, the ready page offers two common paths:
- 
-     - `npx copilotkit@latest create` for a new app.
-     - `npx copilotkit@latest skills onboard` for adding CopilotKit to an existing app with agent-assisted onboarding.
-   </Step>
- </Steps>
- 
- The [CopilotKit CLI](/angular/agno/cli) uses the same sign-in system. When the CLI needs dashboard access, it opens a browser login flow and then stores a local CLI session so project selection can happen from your terminal.
- 
- ## Projects
- 
- A project is the cloud-hosted boundary for one app or environment. Create separate projects for production, staging, demos, and experiments so their API keys and conversation history stay separate.
- 
- ![The Cloud-Hosted Enterprise Intelligence project list.](/angular/agno/images/enterprise-intelligence/managed-projects.png)
- 
- Inside a project, the web app shows the conversation history connected to that project. Each thread row shows the thread name, agent, and active or archived status.
- 
- ![A Cloud-Hosted Enterprise Intelligence project showing conversation history.](/angular/agno/images/enterprise-intelligence/managed-project-thread-list.png)
- 
- ## API keys
- 
- Project API keys connect your runtime to the cloud-hosted project. The CLI provisions a project-scoped key during `create` and `project select`, writes it to `.env` as `INTELLIGENCE_API_KEY`, and records the selected project in `.copilotkit/project.json`.
- 
- ![The Cloud-Hosted Enterprise Intelligence API keys page.](/angular/agno/images/enterprise-intelligence/managed-api-keys.png)
- 
- When you create an API key in the web app, the plaintext token is shown once. Store it in your runtime environment, not in frontend code. Deleting a key invalidates any application still using it.
- 
- ## Threads and conversation history
- 
- Threads are persistent conversations stored by the Enterprise Intelligence Platform. In the hosted web app, you can open a thread to inspect the agent, app user, status, update time, and recorded event timeline.
- 
- ![A Cloud-Hosted Enterprise Intelligence thread detail page with metadata and event history.](/angular/agno/images/enterprise-intelligence/managed-thread-detail.png)
- 
- Thread actions map to the same lifecycle your app sees through its
- thread-management API:
- 
- - Rename changes the display name.
- - Archive hides the thread from the active list without deleting its history.
- - Delete permanently removes the thread.
- 
- Use the thread detail page when you need to debug persistence, confirm that a runtime is writing events, or inspect the event sequence behind a conversation. Raw event payloads are available from the event disclosures when you need deeper debugging.
- 
- ## Plan management
- 
- The pricing page is where you inspect your current plan, manage billing, compare tiers, and see plan limits such as thread retention, maximum thread count, multimodal storage, cloud hosting, and self-hosting availability.
- 
- ![The Cloud-Hosted Enterprise Intelligence plan management page.](/angular/agno/images/enterprise-intelligence/managed-pricing.png)
- 
- Some capabilities may appear in the dashboard as early access. Those capabilities follow the early-access program and are not covered on this page.
- 
- ## Cloud-hosted vs. self-hosted
- 
- <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
-   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
- </Callout>
- 
- | Choose this | When |
- |---|---|
- | Cloud-Hosted Enterprise Intelligence | You want hosted projects, managed API keys, conversation history, thread inspection, and plan management without running platform infrastructure. |
- | Self-hosted Enterprise Intelligence Platform | You need the same platform inside your own Kubernetes cluster for residency, compliance, network isolation, or enterprise operations requirements. |
- 
- Your application code should stay focused on the CopilotKit frontend SDK and
- runtime. The deployment mode changes which platform endpoint and credentials
- your runtime uses, not how the frontend lists threads or renders chat. Moving
- from cloud-hosted projects to self-hosting requires the Team Self-hosted plan
- or a custom Enterprise plan. That purchase does not replace the identity system
- in a customer-run deployment.
- 
- ## Next steps
- 
- - **Explore Rich Threads:** [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) — understand persistent, resumable conversations and choose an implementation path
- - **Use the CLI:** [CopilotKit CLI](/angular/agno/cli) — sign in, scaffold apps, select cloud-hosted projects, and write project configuration
- - **Add threads:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — list, create, rename, archive, and delete persistent conversations in a custom UI
- - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
- - **Self-host the platform:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — install and operate the Helm chart in your own cluster
+ # Cloud-hosted CopilotKit Intelligence
+ 
+ > How the cloud-hosted version of CopilotKit Intelligence works — login, organizations, projects, project API keys, conversation history, thread inspection, and plan management.
+ 
+ Cloud-hosted CopilotKit Intelligence is the CopilotKit-operated deployment of the same CopilotKit Intelligence you can also self-host. Use it when you want durable threads, project-scoped API keys, conversation history, the hosted web app, and plan management without operating Kubernetes infrastructure.
+ 
+ ![The cloud-hosted CopilotKit Intelligence ready page with starter commands and project navigation.](/angular/agno/images/enterprise-intelligence/managed-ready.png)
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start hosted onboarding"
+   body="Sign up or sign in, finish organization onboarding, then return to the CLI or hosted app to select a project."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_premium_managed_intelligence_platform_intro"
+ />
+ 
+ ## What the cloud-hosted version provides
+ 
+ The cloud-hosted version runs CopilotKit Intelligence for you. Your application keeps using the CopilotKit SDK and runtime APIs, while the hosted service stores project-scoped platform data: threads, events, runtime connection metadata, and API keys.
+ 
+ The hosted web app is the control surface for developers and administrators. End users of your application do not sign in to this dashboard. Your app still controls end-user identity and passes user context through the runtime, while the hosted service scopes stored threads to the project your app is connected to.
+ 
+ Use cloud-hosted CopilotKit Intelligence when you want the fastest path to production. Use [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) when your organization needs the platform inside its own VPC, cluster, or data boundary.
+ 
+ ## Hosted onboarding
+ 
+ Start at [dashboard.operations.copilotkit.ai](https://dashboard.operations.copilotkit.ai) or in the CopilotKit CLI.
+ 
+ <Steps>
+   <Step>
+     ### Sign up or sign in
+ 
+     During Clerk signup, new users accept the CopilotKit Self-Service Agreement. Existing accounts do not re-consent.
+   </Step>
+ 
+   <Step>
+     ### Select or create an organization
+ 
+     Select or create an organization in the browser. Existing hosted organizations created before the rollout cutoff continue without a plan prompt. Every new hosted organization created at or after the rollout cutoff must explicitly choose Developer or a paid plan. Developer is the no-cost choice. Clerk's automatic Free assignment does not count as the required Developer-or-paid choice.
+   </Step>
+ 
+   <Step>
+     ### Continue where you started
+ 
+     After organization onboarding, the browser resumes the exact CLI or hosted-app destination that sent you there. If the CLI opened the browser, return to the terminal and let the original command continue.
+   </Step>
+ 
+   <Step>
+     ### Select or create a project
+ 
+     The resumed CLI or hosted app asks you to choose the project that will hold your app's threads, events, runtime connection metadata, and API keys, or create a new one. In the dashboard, the ready page offers two common paths:
+ 
+     - `npx copilotkit@latest create` for a new app.
+     - `npx copilotkit@latest skills onboard` for adding CopilotKit to an existing app with agent-assisted onboarding.
+   </Step>
+ </Steps>
+ 
+ The [CopilotKit CLI](/angular/agno/cli) uses the same sign-in system. When the CLI needs dashboard access, it opens a browser login flow and then stores a local CLI session so project selection can happen from your terminal.
+ 
+ ## Projects
+ 
+ A project is the cloud-hosted boundary for one app or environment. Create separate projects for production, staging, demos, and experiments so their API keys and conversation history stay separate.
+ 
+ ![The cloud-hosted CopilotKit Intelligence project list.](/angular/agno/images/enterprise-intelligence/managed-projects.png)
+ 
+ Inside a project, the web app shows the conversation history connected to that project. Each thread row shows the thread name, agent, and active or archived status.
+ 
+ ![A cloud-hosted CopilotKit Intelligence project showing conversation history.](/angular/agno/images/enterprise-intelligence/managed-project-thread-list.png)
+ 
+ ## API keys
+ 
+ Project API keys connect your runtime to the cloud-hosted project. The CLI provisions a project-scoped key during `create` and `project select`, writes it to `.env` as `INTELLIGENCE_API_KEY`, and records the selected project in `.copilotkit/project.json`.
+ 
+ ![The cloud-hosted CopilotKit Intelligence API keys page.](/angular/agno/images/enterprise-intelligence/managed-api-keys.png)
+ 
+ When you create an API key in the web app, the plaintext token is shown once. Store it in your runtime environment, not in frontend code. Deleting a key invalidates any application still using it.
+ 
+ ## Threads and conversation history
+ 
+ Threads are persistent conversations stored by CopilotKit Intelligence. In the hosted web app, you can open a thread to inspect the agent, app user, status, update time, and recorded event timeline.
+ 
+ ![A cloud-hosted CopilotKit Intelligence thread detail page with metadata and event history.](/angular/agno/images/enterprise-intelligence/managed-thread-detail.png)
+ 
+ Thread actions map to the same lifecycle your app sees through its
+ thread-management API:
+ 
+ - Rename changes the display name.
+ - Archive hides the thread from the active list without deleting its history.
+ - Delete permanently removes the thread.
+ 
+ Use the thread detail page when you need to debug persistence, confirm that a runtime is writing events, or inspect the event sequence behind a conversation. Raw event payloads are available from the event disclosures when you need deeper debugging.
+ 
+ ## Plan management
+ 
+ The pricing page is where you inspect your current plan, manage billing, compare tiers, and see plan limits such as thread retention, maximum thread count, multimodal storage, cloud hosting, and self-hosting availability.
+ 
+ ![The cloud-hosted CopilotKit Intelligence plan management page.](/angular/agno/images/enterprise-intelligence/managed-pricing.png)
+ 
+ Some capabilities may appear in the dashboard as early access. Those capabilities follow the early-access program and are not covered on this page.
+ 
+ ## Cloud-hosted vs. self-hosted
+ 
+ <Callout type="info" title="Team Self-hosted is a plan, not a deployment login">
+   A Team Self-hosted purchase uses a Clerk-backed hosted organization. A customer-run self-hosted deployment uses the customer's identity provider and never sees the Clerk admission flow or hosted organization plan gate.
+ </Callout>
+ 
+ | Choose this | When |
+ |---|---|
+ | cloud-hosted CopilotKit Intelligence | You want hosted projects, managed API keys, conversation history, thread inspection, and plan management without running platform infrastructure. |
+ | Self-hosted CopilotKit Intelligence | You need the same platform inside your own Kubernetes cluster for residency, compliance, network isolation, or enterprise operations requirements. |
+ 
+ Your application code should stay focused on the CopilotKit frontend SDK and
+ runtime. The deployment mode changes which platform endpoint and credentials
+ your runtime uses, not how the frontend lists threads or renders chat. Moving
+ from cloud-hosted projects to self-hosting requires the Team Self-hosted plan
+ or a custom Enterprise plan. That purchase does not replace the identity system
+ in a customer-run deployment.
+ 
+ ## Next steps
+ 
+ - **Explore Rich Threads:** [Rich Threads overview](/angular/agno/guides/threads-memory-attachments-headless) — understand persistent, resumable conversations and choose an implementation path
+ - **Use the CLI:** [CopilotKit CLI](/angular/agno/cli) — sign in, scaffold apps, select cloud-hosted projects, and write project configuration
+ - **Add threads:** [Headless Threads](/angular/agno/guides/threads-memory-attachments-headless) — list, create, rename, archive, and delete persistent conversations in a custom UI
+ - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
+ - **Self-host the platform:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — install and operate the Helm chart in your own cluster
  
````

**High — Connect your runtime to Intelligence**

`/angular/agno/premium/connect-your-runtime` · under “Troubleshooting”

75 code lines, 140 prose lines changed.

````diff
- # Connect your runtime to Intelligence
- 
- > Wire an existing CopilotKit runtime to the Enterprise Intelligence Platform — construct CopilotKitIntelligence with a project API key, identify users, and confirm the credential is actually being used.
- 
- Connecting a runtime to Intelligence takes two things: construct a
- `CopilotKitIntelligence` client with your project API key, and pass it to your
- runtime as `intelligence`. The runtime reads the key from the client you pass,
- not from the environment.
- 
- This page is that wiring step. For what the platform is and why you would use it,
- see the [Enterprise Intelligence Platform overview](/angular/agno/premium/overview) and the
- [architecture page](/angular/agno/premium/intelligence-platform).
- 
- ## Before you start
- 
- You need a project API key. Either provision one with the CLI:
- 
- ```bash title="Terminal"
- npx copilotkit login
- npx copilotkit project select
- ```
- 
- `project select` writes a project-scoped key to `.env` as `INTELLIGENCE_API_KEY`.
- You can also copy a key from the
- [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform).
- 
- ```bash title=".env"
- INTELLIGENCE_API_KEY=cpk-...
- ```
- 
- <Callout type="warn">
-   This is a server-side secret. Do not give it a `NEXT_PUBLIC_` or `VITE_`
-   prefix — that ships it to the browser.
- </Callout>
- 
- ## Wire the runtime
- 
- Construct the client once and pass it to `CopilotRuntime` as `intelligence`.
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- import {
-   CopilotRuntime,
-   CopilotKitIntelligence,
-   createCopilotRuntimeHandler,
- } from "@copilotkit/runtime/v2";
- 
- const intelligence = new CopilotKitIntelligence({
-   // apiUrl and wsUrl default to the managed platform — leave them unset.
-   apiKey: process.env.INTELLIGENCE_API_KEY!,
- });
- 
- const runtime = new CopilotRuntime({
-   agents,
-   intelligence,
-   // Threads are per-user. Without this every visitor shares one history.
-   identifyUser: (request) => ({
-     id: request.headers.get("x-user-id") ?? "anonymous",
-   }),
- });
- 
- export const { GET, POST } = createCopilotRuntimeHandler({ runtime });
- ```
- 
- `apiKey` is the only required field. The key scopes the project, so there is no
- separate organization or project id to pass.
- 
- ## Confirm the credential is actually used
- 
- A build that compiles and a chat that replies both prove nothing about
- Intelligence — a runtime in SSE mode does all of that with the key unread. So a
- green round trip in the browser is not evidence on its own.
- 
- Confirm it from the product side instead. Open your project in the
- [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform) and send a
- message in your app. A thread should appear. If none does, the runtime never
- reached the platform and is running in SSE mode, whatever the browser showed.
- 
- ## Self-hosted deployments
- 
- `apiUrl` and `wsUrl` default to the managed platform. Override them **together**
- or not at all — the API and realtime planes are deployed on different hosts, so
- the websocket URL cannot be derived from the API URL, and setting one alone
- leaves the other plane pointed at the managed host.
- 
- ```ts
- const intelligence = new CopilotKitIntelligence({
-   apiUrl: "https://api.intelligence.internal",
-   wsUrl: "wss://realtime.intelligence.internal",
-   apiKey: process.env.INTELLIGENCE_API_KEY!,
- });
- ```
- 
- Pass the bare websocket base: the client appends `/runner` and `/client` itself,
- and prepends `/api` to every REST call. Passing `apiUrl: ".../api"` produces
- double-prefixed `/api/api/threads`.
- 
- See [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) for the full
- deployment path.
- 
- ## Troubleshooting
- 
- | Symptom | Cause |
- | --- | --- |
- | Chat works, no threads in the dashboard | `intelligence` was never passed to `CopilotRuntime`; the runtime is in SSE mode. |
- | Opaque auth error on the first request | `INTELLIGENCE_API_KEY` is empty or belongs to a different project. |
- | Socket sits in `connecting`, then "did not settle in time" | `wsUrl` overridden alone, or pointed at the API host. |
- | `/api/api/...` in request logs | `apiUrl` included a `/api` suffix. |
+ # Connect your runtime to Intelligence
+ 
+ > Wire an existing CopilotKit runtime to CopilotKit Intelligence — construct CopilotKitIntelligence with a project API key, identify users, and confirm the credential is actually being used.
+ 
+ Connecting a runtime to Intelligence takes two things: construct a
+ `CopilotKitIntelligence` client with your project API key, and pass it to your
+ runtime as `intelligence`. The runtime reads the key from the client you pass,
+ not from the environment.
+ 
+ This page is that wiring step. For what the platform is and why you would use it,
+ see the [CopilotKit Intelligence overview](/angular/agno/premium/overview) and the
+ [architecture page](/angular/agno/premium/intelligence-platform).
+ 
+ ## Before you start
+ 
+ You need a project API key. Either provision one with the CLI:
+ 
+ ```bash title="Terminal"
+ npx copilotkit login
+ npx copilotkit project select
+ ```
+ 
+ `project select` writes a project-scoped key to `.env` as `INTELLIGENCE_API_KEY`.
+ You can also copy a key from the
+ [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform).
+ 
+ ```bash title=".env"
+ INTELLIGENCE_API_KEY=cpk-...
+ ```
+ 
+ <Callout type="warn">
+   This is a server-side secret. Do not give it a `NEXT_PUBLIC_` or `VITE_`
+   prefix — that ships it to the browser.
+ </Callout>
+ 
+ ## Wire the runtime
+ 
+ Construct the client once and pass it to `CopilotRuntime` as `intelligence`.
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ import {
+   CopilotRuntime,
+   CopilotKitIntelligence,
+   createCopilotRuntimeHandler,
+ } from "@copilotkit/runtime/v2";
+ 
+ const intelligence = new CopilotKitIntelligence({
+   // apiUrl and wsUrl default to the managed platform — leave them unset.
+   apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ 
+ const runtime = new CopilotRuntime({
+   agents,
+   intelligence,
+   // Threads are per-user. Without this every visitor shares one history.
+   identifyUser: (request) => ({
+     id: request.headers.get("x-user-id") ?? "anonymous",
+     name: request.headers.get("x-user-name") ?? "Anonymous",
+   }),
+ });
+ 
+ export const { GET, POST } = createCopilotRuntimeHandler({ runtime });
+ ```
+ 
+ `apiKey` is the only required field. The key scopes the project, so there is no
+ separate organization or project id to pass.
+ 
+ ## Confirm the credential is actually used
+ 
+ A build that compiles and a chat that replies both prove nothing about
+ Intelligence — a runtime in SSE mode does all of that with the key unread. So a
+ green round trip in the browser is not evidence on its own.
+ 
+ Confirm it from the product side instead. Open your project in the
+ [cloud-hosted dashboard](/angular/agno/premium/managed-intelligence-platform) and send a
+ message in your app. A thread should appear. If none does, the runtime never
+ reached the platform and is running in SSE mode, whatever the browser showed.
+ 
+ ## Self-hosted deployments
+ 
+ `apiUrl` and `wsUrl` default to the managed platform. Override them **together**
+ or not at all — the API and realtime planes are deployed on different hosts, so
+ the websocket URL cannot be derived from the API URL, and setting one alone
+ leaves the other plane pointed at the managed host.
+ 
+ ```ts
+ const intelligence = new CopilotKitIntelligence({
+   apiUrl: "https://api.intelligence.internal",
+   wsUrl: "wss://realtime.intelligence.internal",
+   apiKey: process.env.INTELLIGENCE_API_KEY!,
+ });
+ ```
+ 
+ Pass the bare websocket base: the client appends `/runner` and `/client` itself,
+ and prepends `/api` to every REST call. Passing `apiUrl: ".../api"` produces
+ double-prefixed `/api/api/threads`.
+ 
+ See [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) for the full
+ deployment path.
+ 
+ ## Troubleshooting
+ 
+ | Symptom | Cause |
+ | --- | --- |
+ | Chat works, no threads in the dashboard | `intelligence` was never passed to `CopilotRuntime`; the runtime is in SSE mode. |
+ | Opaque auth error on the first request | `INTELLIGENCE_API_KEY` is empty or belongs to a different project. |
+ | Socket sits in `connecting`, then "did not settle in time" | `wsUrl` overridden alone, or pointed at the API host. |
+ | `/api/api/...` in request logs | `apiUrl` included a `/api` suffix. |
  
````

**High — Self-host CopilotKit Intelligence**

`/angular/agno/premium/self-hosting` · under “Next steps”

6 code lines, 1136 prose lines changed.

````diff
- # Self-Hosting Enterprise Intelligence
- 
- > Deploy the CopilotKit Enterprise Intelligence Platform to your own Kubernetes cluster with the copilot-intelligence Helm chart — install, configure, and operate the app-api, app-frontend, and realtime-gateway services with your own Postgres, Redis, ingress, and OIDC provider.
- 
- 
- ## What is this?
- 
- Enterprise Intelligence — the platform that powers threads, shared state, and the inspector — can be self-hosted on your own Kubernetes cluster using the `copilot-intelligence` Helm chart. You run the control plane and data plane inside your own network boundary; the chart leaves you in charge of identity, storage, and secrets.
- 
- **What you bring:**
- 
- - Postgres and Redis — your own, or the bundled Bitnami subcharts
- - An OIDC provider for identity
- - Secrets via External Secrets Operator, direct Kubernetes Secrets, or chart-managed credentials
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Planning a self-hosted Enterprise Intelligence deployment?"
-   body="Self-hosting is available on the Team self-hosted plan or a custom Enterprise plan for VPC, on-prem, and data-residency deployments."
-   ctaLabel="Talk to an engineer"
-   surface="docs_premium_self_hosting_intro"
-   href="https://copilotkit.ai/talk-to-an-engineer"
-   analyticsEvent="talk_to_us_clicked"
- />
- 
- **What the chart deploys:**
- 
- | Component | Role | Port |
- |---|---|---|
- | `app-api` | Backend service | 4201 |
- | `app-frontend` | Web UI | 8080 |
- | `realtime-gateway` *(optional)* | WebSocket service for realtime sync | 4401 |
- 
- Plus a `database-migrations` Job, a `thread-culler` CronJob, and the usual supporting resources (Services, Ingress, HPAs, PodDisruptionBudgets, ConfigMaps, and — when ESO is enabled — ExternalSecret resources).
- 
- ## When should I use this?
- 
- - Your organization requires Enterprise Intelligence to run inside your own VPC or data center for compliance, data residency, or security reasons
- - You want to connect Enterprise Intelligence to internal databases, identity providers, or secret stores that are not reachable from the cloud-hosted version
- - You need to operate the platform under your existing Kubernetes tooling, CI/CD, and monitoring stack
- - You have an Enterprise Intelligence Platform license and the platform-engineering capacity to run a production Kubernetes workload
- 
- <Callout type="info" title="Validate locally before committing to a real cluster">
- The chart installs the same way against a local Docker Desktop or k3d cluster as against a production one, so walk this guide end-to-end on your laptop first. Two local paths are supported:
- 
- - **Bundled overlay** — install with the `values-quickstart-local.yaml` overlay shipped in the chart. It enables in-cluster Postgres, Redis, and (optionally) Keycloak; you drive the install yourself, following this guide.
- - **One-shot script** — `scripts/local-demo.sh` spins up a disposable k3d cluster, installs the released chart from GHCR, and brings up bundled Keycloak in one command:
- 
- ```bash title="Terminal"
- ./scripts/local-demo.sh --version <chart-version>
- ```
- 
- Both paths use the same install commands described below — pick whichever fits.
- </Callout>
- 
- ## Prerequisites
- 
- Before starting, make sure the following are in place. [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) explains the application/runtime/platform layers in more depth.
- 
- **License and registry access:**
- 
- - A valid Enterprise Intelligence Platform license key (contact your CopilotKit account team if you do not have one)
- - Read access to the chart OCI registry at `oci://ghcr.io/copilotkit/charts/intelligence` (anonymous pulls are allowed for the released chart)
- - The latest released chart version. Check the [chart releases](https://github.com/CopilotKit/Intelligence/pkgs/container/charts%2Fintelligence) on GHCR; substitute the value into the `<chart-version>` placeholder used throughout this guide (e.g. `0.1.0-rc.16`).
- 
- **Cluster and tooling:**
- 
- - Kubernetes ≥ 1.28
- - Helm ≥ 3.12
- - `kubectl` configured against the target cluster with an admin-equivalent context
- 
- **Platform prerequisites (cluster-wide, installed once):**
- 
- - An ingress controller — either `nginx-ingress` or the AWS Load Balancer Controller
- - `cert-manager` (or a cloud-managed certificate alternative such as AWS ACM) for TLS on the public hostnames
- - `External Secrets Operator` if you plan to sync secrets from AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager (recommended for production, but not required — see [Secrets](#create-secrets))
- 
- **External dependencies (reachable from the cluster):**
- 
- - PostgreSQL ≥ 14 — managed (Amazon RDS, Aurora, Cloud SQL) or operator-deployed in-cluster
- - Redis ≥ 7 (or a Valkey-compatible service such as Amazon ElastiCache)
- - An OIDC identity provider — Keycloak, Okta, Azure AD, Auth0, Google Workspace, or equivalent
- 
- **Optional:**
- 
- - Amazon OpenSearch (only when analytics features are in use)
- - An S3-compatible object store (only when the realtime gateway is configured to persist AG-UI events)
- 
- ## Implementation
- 
- <Steps>
-   <Step>
-     ### Prepare your Kubernetes cluster
- 
-     Ensure `kubectl` points to the cluster that will run Enterprise Intelligence.
- 
-     ```bash title="Terminal"
-     kubectl config current-context
-     kubectl auth can-i create namespace --all-namespaces
-     ```
- 
-     Confirm the context names your target cluster and that the permission check returns `yes`. If not, fix your kubeconfig before proceeding.
-   </Step>
- 
-   <Step>
-     ### Install platform prerequisites
- 
-     These components are cluster-wide and installed once per cluster, independently of the application chart.
- 
-     <Tabs items={["AWS (EKS)", "On-prem / generic", "Local (Docker Desktop / k3d)"]}>
-       <Tab value="AWS (EKS)">
-         ```bash title="Terminal"
-         # AWS Load Balancer Controller (kube-system)
-         helm repo add eks https://aws.github.io/eks-charts
-         helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
-           -n kube-system \
-           --set clusterName=<YOUR_CLUSTER_NAME>
- 
-         # cert-manager
-         helm repo add jetstack https://charts.jetstack.io
-         helm install cert-manager jetstack/cert-manager \
-           -n cert-manager --create-namespace \
-           --set installCRDs=true
- 
-         # External Secrets Operator (optional — see Secrets step)
-         helm repo add external-secrets https://charts.external-secrets.io
-         helm install external-secrets external-secrets/external-secrets \
-           -n external-secrets --create-namespace
-         ```
-       </Tab>
-       <Tab value="On-prem / generic">
-         ```bash title="Terminal"
-         # NGINX Ingress Controller
-         helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
-         helm install ingress-nginx ingress-nginx/ingress-nginx \
-           -n ingress-nginx --create-namespace
- 
-         # cert-manager
-         helm repo add jetstack https://charts.jetstack.io
-         helm install cert-manager jetstack/cert-manager \
-           -n cert-manager --create-namespace \
-           --set installCRDs=true
-         ```
-       </Tab>
-       <Tab value="Local (Docker Desktop / k3d)">
-         ```bash title="Terminal"
-         # NGINX Ingress Controller as ClusterIP — you will reach it via
-         # `kubectl port-forward` later, so no LoadBalancer service is needed.
-         helm upgrade --install ingress-nginx ingress-nginx \
-           --repo https://kubernetes.github.io/ingress-nginx \
-           --namespace ingress-nginx --create-namespace \
-           --set controller.service.type=ClusterIP \
-           --wait
-         ```
- 
-         cert-manager and External Secrets Operator are not required for a local validation pass — TLS is terminated outside the cluster and secrets are managed by the chart (Path C below) or pre-created by hand (Path B).
-       </Tab>
-     </Tabs>
- 
-     After each controller is running, its pods should be `Ready` in their respective namespaces.
-   </Step>
- 
-   <Step>
-     ### Provision external dependencies
- 
-     Intelligence needs Postgres, Redis, and an OIDC issuer. You can either point the chart at managed services you already run, or enable the bundled Bitnami subcharts for in-cluster Postgres and Redis (appropriate for evaluation and small self-hosted installs).
- 
-     **Using managed services (recommended for production):**
- 
-     - Create a Postgres database and user. Record the host, port (default `5432`), database name, username, and password.
-     - Create a Redis instance with TLS enabled. Record the host, port (default `6379`), and password.
-     - Configure an OIDC client in your identity provider. Record the issuer URL, client ID, and client secret.
- 
-     **Using the bundled in-cluster subcharts:**
- 
-     Set `postgresql.enabled: true` and `redis-subchart.enabled: true` in your values file (covered in the next step). A matching `StorageClass` must exist in the cluster. The bundled Keycloak subchart is available via `keycloak.enabled: true` if you also need a quick OIDC provider for evaluation; do not use the bundled Keycloak for production workloads. See [Bundled Keycloak (eval only)](#bundled-keycloak-eval-only) for the realm and credentials it creates.
- 
-     The chart already ships a tested overlay for this shape — `values-quickstart-local.yaml` — which enables bundled Postgres + Redis, sets `migrations.enabled: true`, sizes resources for a laptop, and creates disposable secrets so the install runs end-to-end with no manual prep. Layer your own overlay on top of it (see the next step) to plug in your IdP and ingress.
-   </Step>
- 
-   <Step>
-     ### Create a values file
- 
-     The released chart ships several example values files for the common deployment shapes. Pick the one closest to your environment and copy it into a working overlay you can edit. Pull and untar the chart so you have local copies to diff against:
- 
-     ```bash title="Terminal"
-     helm pull oci://ghcr.io/copilotkit/charts/intelligence --version <chart-version> --untar
- 
-     # AWS-flavored (ALB, IRSA, External Secrets from AWS Secrets Manager)
-     cp intelligence/values-aws-example.yaml my-values.yaml
- 
-     # Or on-prem-flavored (nginx, manual Kubernetes Secrets)
-     cp intelligence/values-onprem-example.yaml my-values.yaml
- 
-     # Or self-hosted eval (bundled Keycloak + in-cluster Postgres/Redis)
-     cp intelligence/values-self-hosted-eval.yaml.example my-values.yaml
-     ```
- 
-     The chart untars into a directory named `intelligence/` (the published chart name on GHCR; the chart's `nameOverride` keeps release-prefixed resources named `cpki-*`).
- 
-     Edit `my-values.yaml` to set at minimum:
- 
-     - `database.host`, `database.port`, `database.name` — your Postgres connection (`name` defaults to `intelligence`)
-     - `redis.host`, `redis.port`, `redis.tls` — your Redis connection (TLS is on by default; managed Redis requires it)
-     - `auth.issuer` — your OIDC provider's issuer URL
-     - `auth.existingSecret` — name of the Kubernetes Secret containing `auth-secret`, `auth-client-id`, `auth-client-secret` (or use one of the alternate paths in [Secrets](#create-secrets))
-     - `ingress.ui.host` — the hostname users will load the Intelligence UI on (for example `intelligence.example.com`)
-     - `ingress.api.host` — optional dedicated API hostname. When omitted, the `ui.host` rule routes `/api` and `/auth` paths to `app-api`, so a single hostname is fine for most installs.
-     - `ingress.tls` — TLS configuration for the hosts above
-     - `migrations.enabled: true` — **required for first install**; defaults to `false`. Without it the database schema is never applied and `app-api` will crashloop. (The eval overlay `values-quickstart-local.yaml` sets this for you when you layer on top of it.)
- 
-     <Callout type="warn" title="OIDC issuer URL — trailing slash matters">
-       Some providers (Auth0 in particular) only accept the issuer URL with a trailing slash (e.g. `https://your-tenant.auth0.com/`). A missing or extra slash produces an opaque "issuer mismatch" failure at login time. Match the value exactly to what your provider's discovery endpoint advertises.
-     </Callout>
- 
-     See the [Configuration reference](#configuration-reference) section for the full set of values.
-   </Step>
- 
-   <Step id="create-secrets">
-     ### Create secrets
- 
-     The chart supports three paths for secrets management. Pick exactly one.
- 
-     **Path A — External Secrets Operator (recommended for production):**
- 
-     1. Ensure your secret backend (AWS Secrets Manager, Vault, etc.) has entries for the database URL, Redis URL, and auth credentials.
-     2. Create a `ClusterSecretStore` (or `SecretStore`) that references that backend.
-     3. In `my-values.yaml`, set `externalSecrets.enabled: true`, `externalSecrets.store.kind`, and `externalSecrets.store.name` to match. The chart then generates `ExternalSecret` resources that sync those entries into Kubernetes Secrets at the names `app-api` expects.
- 
-     **Path B — Direct Kubernetes Secrets (you manage the rotations):**
- 
-     Leave `externalSecrets.enabled: false` (the default) and create the Secrets manually before installing:
- 
-     ```bash title="Terminal"
-     kubectl create namespace copilot-intelligence
- 
-     kubectl create secret generic cpki-db \
-       --from-literal=database-url='postgresql://user:pass@host:5432/intelligence' \
-       -n copilot-intelligence
- 
-     kubectl create secret generic cpki-redis \
-       --from-literal=redis-url='rediss://:password@host:6379' \
-       -n copilot-intelligence
- 
-     kubectl create secret generic cpki-auth \
-       --from-literal=auth-secret="$(openssl rand -hex 32)" \
-       --from-literal=auth-client-id='<OIDC client id>' \
-       --from-literal=auth-client-secret='<OIDC client secret>' \
-       -n copilot-intelligence
-     ```
- 
-     Reference these names in your values file via `database.existingSecret`, `redis.existingSecret`, and `auth.existingSecret`. The Secret keys are lowercase-hyphenated (`auth-secret`, `database-url`, `runner-auth-secret`); the workloads consume them as the corresponding uppercase env vars (`AUTH_SECRET`, `DATABASE_URL`, `RUNNER_AUTH_SECRET`).
- 
-     **Path C — Chart-managed self-hosted secrets (simplest BYOC):**
- 
-     Useful when you do not run a secret manager and prefer Helm to create the Kubernetes Secrets directly from values you provide at install time. Set `selfHostedSecrets.enabled: true` and supply the credentials inline:
- 
-     ```yaml title="my-values.yaml"
-     selfHostedSecrets:
-       enabled: true
-       db:
-         url: "postgresql://user:pass@host:5432/intelligence"
-       redis:
-         url: "rediss://:password@host:6379"
-       auth:
-         # Auto-generated when left empty.
-         secret: ""
-         clientId: "<OIDC client id>"
-         clientSecret: "<OIDC client secret>"
-       realtimeGateway:
-         # Auto-generated when left empty.
-         runnerAuthSecret: ""
-         secretKeyBase: ""
-       beam:
-         # Auto-generated when left empty.
-         releaseCookie: ""
-     ```
- 
-     The chart auto-generates `auth.secret`, the realtime-gateway runner/key-base, and the BEAM cookie when those fields are empty, so you only need to provide what you actually have.
-   </Step>
- 
-   <Step>
-     ### Install the chart
- 
-     The release can be installed directly from the GHCR OCI registry — no local untar is required for the install itself. Use `helm upgrade --install` so the same command works for first-time installs and upgrades.
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <chart-version> \
-       -f my-values.yaml \
-       -n copilot-intelligence \
-       --create-namespace \
-       --wait \
-       --timeout 10m
-     ```
- 
-     Layering multiple values files is supported and is the recommended pattern for evaluation: combine the chart's bundled `values-quickstart-local.yaml` (in-cluster Postgres/Redis, eval-sized resources, `migrations.enabled: true`, disposable secrets) with your own overlay (IdP, ingress, anything cluster-specific). Pull the chart first so you have a local copy of `values-quickstart-local.yaml` to reference:
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <chart-version> \
-       -f intelligence/values-quickstart-local.yaml \
-       -f my-values.yaml \
-       -n copilot-intelligence --create-namespace \
-       --wait --timeout 10m
-     ```
- 
-     `--wait` blocks until the `Deployments` report healthy replicas; `--timeout 10m` allows enough time for image pulls and the initial database migration job. Right-most `-f` files win on conflicts, so put your overlay last.
- 
-     <Callout type="info" title="When the migrations Job runs">
-     The migrations Job runs as a **pre-install/pre-upgrade** hook (weight `-5`) when secrets are pre-created (Path A or Path B above), so the schema is ready before app pods start. It runs as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm (Path C, or when using `postgresql.enabled: true`), because the Secret resources don't exist until Helm has created them.
-     </Callout>
-   </Step>
- 
-   <Step>
-     ### Verify the install
- 
-     Check that every pod is `Running` and the ingress is ready:
- 
-     ```bash title="Terminal"
-     kubectl get pods -n copilot-intelligence
-     kubectl get ingress -n copilot-intelligence
-     ```
- 
-     You should see `app-api`, `app-frontend`, and — if enabled — `realtime-gateway` pods running. The migrations `Job` will appear as `Completed`.
- 
-     Confirm the API health check reports `ok`:
- 
-     ```bash title="Terminal"
-     curl https://<ingress.api.host>/api/health
-     ```
- 
-     The endpoint returns `200 OK` only when the database is reachable — a failed health check is almost always a database connectivity problem.
- 
-     Service-specific health endpoints, useful when port-forwarding to an individual pod:
- 
-     | Service | Path |
-     |---|---|
-     | `app-api` | `/api/health` |
-     | `app-frontend` | `/healthz` |
-     | `realtime-gateway` | `/health` |
- 
-     Finally, browse to `https://<ingress.ui.host>` and log in via your OIDC provider. A successful login confirms end-to-end wiring.
- 
-     <Callout type="info" title="Local validation — port-forward the ingress controller">
-     On a local cluster (Docker Desktop, k3d) without a public DNS name, port-forward the **ingress controller** rather than the frontend service so the UI host rule still routes `/api` and `/auth` to `app-api`. Set `ingress.ui.host: "localhost"` in your overlay, then leave this terminal open for as long as you're using the app:
- 
-     ```bash title="Terminal"
-     kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80
-     ```
- 
-     Browse to `http://localhost:8080`. Port-forwarding the `app-frontend` service directly bypasses the ingress and breaks `/api` and `/auth` routing.
-     </Callout>
-   </Step>
- 
-   <Step>
-     ### Upgrade and uninstall
- 
-     **Upgrade** — bump the version in your install command and re-run it. Because the install command already uses `helm upgrade --install`, the same invocation works for both fresh installs and upgrades:
- 
-     ```bash title="Terminal"
-     helm upgrade --install copilot-intelligence \
-       oci://ghcr.io/copilotkit/charts/intelligence \
-       --version <new-chart-version> \
-       -f my-values.yaml \
-       -n copilot-intelligence \
-       --wait
-     ```
- 
-     Before upgrading, regenerate the example values for the target version (`helm pull ... --version <new-chart-version> --untar`) and diff against your overlay to catch new keys.
- 
-     **Uninstall** — releases leave PersistentVolumes in place by default if you enabled bundled subcharts; delete them manually if you intend to tear down state.
- 
-     ```bash title="Terminal"
-     helm uninstall copilot-intelligence -n copilot-intelligence
-     ```
-   </Step>
- </Steps>
- 
- ## Bundled Keycloak (eval only)
- 
- When `keycloak.enabled: true`, the chart deploys the Bitnami Keycloak subchart with a pre-seeded realm and demo user. This is for evaluation and demos — not production. The realm import creates:
- 
- - **Realm:** `cpk-dev`
- - **OIDC client:** `cpk-self-hosted` with secret `cpk-self-hosted-secret` (override via `auth.keycloakClient.clientId` / `auth.keycloakClient.clientSecret`)
- - **Demo user:** `engineer` / `engineer` (override via `auth.keycloakDemoUser`)
- - **Redirect URIs / web origins:** default `["*"]` for eval flexibility (override via `auth.keycloakClient.redirectUris` / `webOrigins`)
- 
- The chart auto-wires `auth.issuer` to the in-cluster Keycloak service, so leaving `auth.issuer` empty when `keycloak.enabled: true` is intentional.
- 
- For production self-hosted deployments, leave `keycloak.enabled: false` and point `auth.issuer` at your own IdP.
- 
- ## Configuration reference
- 
- The tables below summarize the most common values. For every option, see `values.yaml` in the pulled chart.
- 
- ### Global
- 
- | Key | Description | Default |
- |---|---|---|
- | `global.imageRegistry` | Registry prefix for unqualified image names | `""` |
- | `global.intelligenceImageRegistry` | Registry prefix specifically for the five Intelligence service images | `""` |
- | `global.imagePullSecrets` | Image pull secrets for private registries | `[]` |
- | `global.storageClass` | StorageClass override for bundled subcharts | `""` |
- 
- ### Database
- 
- | Key | Description | Default |
- |---|---|---|
- | `database.host` | Postgres host | `""` (required) |
- | `database.port` | Postgres port | `5432` |
- | `database.name` | Database name | `intelligence` |
- | `database.existingSecret` | Pre-existing Secret with `database-url` | `""` |
- | `database.secretKeys.url` | Key inside the Secret holding the connection string | `database-url` |
- 
- ### Redis
- 
- | Key | Description | Default |
- |---|---|---|
- | `redis.host` | Redis host | `""` (required) |
- | `redis.port` | Redis port | `6379` |
- | `redis.tls` | Require TLS (ElastiCache defaults to on) | `true` |
- | `redis.existingSecret` | Pre-existing Secret with `redis-url` | `""` |
- | `redis.secretKeys.url` | Key inside the Secret holding the connection URL | `redis-url` |
- 
- ### OpenSearch (optional)
- 
- | Key | Description | Default |
- |---|---|---|
- | `openSearch.host` | OpenSearch domain endpoint | `""` |
- | `openSearch.port` | Port | `443` |
- | `openSearch.tls` | Require TLS | `true` |
- | `openSearch.existingSecret` | Pre-existing Secret with `opensearch-url` | `""` |
- 
- ### Authentication
- 
- | Key | Description | Default |
- |---|---|---|
- | `auth.deploymentMode` | `self-hosted` (single org) or `hosted` (multi-org) | `self-hosted` |
- | `auth.issuer` | OIDC issuer URL (auto-set when `keycloak.enabled: true`) | `""` |
- | `auth.existingSecret` | Secret with `auth-secret`, `auth-client-id`, `auth-client-secret` | `""` |
- | `auth.defaultOrganizationId` | Default organization ID in self-hosted mode | `default` |
- | `auth.providerId` | Stable identifier for the OIDC provider | `enterprise-sso` |
- | `auth.providerName` | Display name shown in the UI | `Enterprise SSO` |
- | `auth.trustHost` | Trust the `X-Forwarded-Host` header (set behind a reverse proxy) | `"true"` |
- 
- ### Ingress
- 
- | Key | Description | Default |
- |---|---|---|
- | `ingress.enabled` | Create Ingress resources | `true` |
- | `ingress.className` | `nginx` or `alb` | `nginx` |
- | `ingress.ui.host` | UI hostname; the rule for this host routes `/api` and `/auth` to `app-api` and `/` to `app-frontend` | `""` (required) |
- | `ingress.api.host` | Optional dedicated API hostname. When set, this hostname routes `/` to `app-api`. When empty, no separate API rule is created — the UI host already serves the API. | `""` |
- | `ingress.realtimePlane.host` | Optional dedicated realtime hostname (only used when `realtimeGateway.enabled: true`) | `""` |
- | `ingress.tls` | TLS configuration | `[]` |
- | `ingress.websocket.enabled` | Add WebSocket-friendly annotations (auto-enabled when realtime-gateway is enabled with nginx) | `false` |
- | `ingress.annotations` | Additional ingress annotations | `{}` |
- 
- ### Services (`appApi`, `appFrontend`, `realtimeGateway`)
- 
- | Key | Description | Default (`appApi`) | Default (`appFrontend`) | Default (`realtimeGateway`) |
- |---|---|---|---|---|
- | `<svc>.enabled` | Enable the service | `true` | `true` | `false` |
- | `<svc>.replicaCount` | Replicas | `2` | `2` | `2` |
- | `<svc>.image.repository` | Image repository (published chart fully-qualifies these to `ghcr.io/copilotkit/intelligence/<svc>`) | `intelligence/app-api` | `intelligence/app-frontend` | `intelligence/realtime-gateway` |
- | `<svc>.image.tag` | Image tag (defaults to chart `appVersion`) | `""` | `""` | `""` |
- | `<svc>.resources` | CPU/memory requests | `250m` / `512Mi` | `100m` / `128Mi` | `500m` / `512Mi` |
- | `<svc>.autoscaling.enabled` | Enable HPA | `true` | `false` | `true` |
- | `<svc>.autoscaling.minReplicas` | HPA minimum | `2` | `2` | `2` |
- | `<svc>.autoscaling.maxReplicas` | HPA maximum | `10` | `4` | `10` |
- | `<svc>.serviceAccount.annotations` | Annotations on the ServiceAccount (IRSA, workload identity) | `{}` | `{}` | `{}` |
- | `<svc>.podAnnotations` | Pod template annotations (e.g. for Stakater Reloader on ESO secret rotation) | `{}` | n/a | `{}` |
- 
- ### Realtime gateway (additional keys)
- 
- | Key | Description | Default |
- |---|---|---|
- | `realtimeGateway.enabled` | Enable the gateway | `false` |
- | `realtimeGateway.host` | `PHX_HOST` override | `""` |
- | `realtimeGateway.existingSecret` | Secret containing keys `runner-auth-secret` and `secret-key-base` (mapped to env vars `RUNNER_AUTH_SECRET` / `SECRET_KEY_BASE`) | `""` |
- | `realtimeGateway.beam.clustering.enabled` | BEAM clustering across replicas | `true` |
- | `realtimeGateway.beam.cookieSecret.name` | Secret containing the BEAM cookie | `cpki-beam-cookie` |
- 
- Enabling the realtime gateway requires that either `realtimeGateway.existingSecret` is set, or that `externalSecrets.secrets.realtimeGateway.enabled` or `selfHostedSecrets.enabled` is `true` — the chart fails validation otherwise.
- 
- ### External Secrets Operator integration
- 
- | Key | Description | Default |
- |---|---|---|
- | `externalSecrets.enabled` | Generate `ExternalSecret` resources | `false` |
- | `externalSecrets.store.kind` | `ClusterSecretStore` or `SecretStore` | `ClusterSecretStore` |
- | `externalSecrets.store.name` | SecretStore name | `""` (required when enabled) |
- | `externalSecrets.refreshInterval` | How often ESO syncs | `1h` |
- | `externalSecrets.secrets.*` | Per-secret mappings — see `values.yaml` | — |
- 
- ### Self-hosted (chart-managed) secrets
- 
- | Key | Description | Default |
- |---|---|---|
- | `selfHostedSecrets.enabled` | Create Kubernetes Secrets from inline values; auto-generates blank fields | `false` |
- | `selfHostedSecrets.db.url` | Postgres connection URL | `""` (required when enabled) |
- | `selfHostedSecrets.redis.url` | Redis connection URL | `""` (required when enabled) |
- | `selfHostedSecrets.auth.clientId` / `clientSecret` | OIDC client credentials | `""` (required when enabled) |
- | `selfHostedSecrets.auth.secret` | Internal auth signing secret | auto-generated when empty |
- | `selfHostedSecrets.realtimeGateway.runnerAuthSecret` / `secretKeyBase` | Runtime gateway secrets | auto-generated when empty |
- | `selfHostedSecrets.beam.releaseCookie` | BEAM clustering cookie | auto-generated when empty |
- 
- ### Bundled subcharts (evaluation only)
- 
- | Key | Description | Default |
- |---|---|---|
- | `postgresql.enabled` | Deploy in-cluster Postgres | `false` |
- | `postgresql.auth.password` | Postgres password (set at deploy time) | `""` |
- | `redis-subchart.enabled` | Deploy in-cluster Redis (aliased to avoid collision with `redis.*`) | `false` |
- | `redis-subchart.auth.password` | Redis password | `""` |
- | `keycloak.enabled` | Deploy bundled Keycloak for quick eval | `false` |
- 
- ### Object storage (realtime gateway event persistence)
- 
- | Key | Description | Default |
- |---|---|---|
- | `objectStorage.enabled` | Persist AG-UI events from the realtime gateway to S3-compatible storage | `false` |
- | `objectStorage.bucket` | Bucket name | `""` |
- | `objectStorage.region` | Bucket region | `us-east-1` |
- | `objectStorage.endpoint` | S3-compatible endpoint override (e.g. for MinIO) | `""` |
- | `objectStorage.forcePathStyle` | Force path-style addressing (required for MinIO) | `false` |
- | `objectStorage.existingSecret` | Secret with static access keys (optional if using IRSA) | `""` |
- 
- ### Database migrations
- 
- | Key | Description | Default |
- |---|---|---|
- | `migrations.enabled` | Run the migrations Job. **Required for first install** — defaults to `false`. | `false` |
- | `migrations.image.repository` | Migrations image repository | `intelligence/db-migrations` |
- | `migrations.activeDeadlineSeconds` | Job deadline | `1800` |
- | `migrations.backoffLimit` | Retry count before failing | `3` |
- 
- The migrations Job runs as a **pre-install/pre-upgrade** Helm hook (weight `-5`) when secrets are pre-created (External Secrets path or manual `existingSecret`) and as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm itself (`selfHostedSecrets.enabled` or `postgresql.enabled`).
- 
- ### Thread culler (CronJob)
- 
- | Key | Description | Default |
- |---|---|---|
- | `threadCuller.enabled` | Run a CronJob that soft-deletes stale threads in unlicensed deployments | `false` |
- | `threadCuller.schedule` | Cron expression | `0 * * * *` |
- | `threadCuller.staleHours` | Threads older than this many hours (since last update) are culled | `"3"` |
- | `threadCuller.batchSize` | Maximum threads to cull per run | `"1000"` |
- | `threadCuller.licenseSecret.existingSecret` | Secret containing `COPILOTKIT_LICENSE_TOKEN`. When set, the CronJob skips culling (licensed install). When empty, it culls. | `""` |
- 
- ### Shared config (CORS, logging)
- 
- | Key | Description | Default |
- |---|---|---|
- | `config.logLevel` | Log level for all services (`trace`/`debug`/`info`/`warn`/`error`/`fatal`) | `info` |
- | `config.nodeEnv` | Node environment; affects cookie security and runtime defaults | `production` |
- | `config.appFrontendOrigin` | Browser origin allowed to perform authenticated bootstrap writes | `""` |
- | `config.publicAppOrigin` | Public UI origin used by server-side callbacks when distinct from `appFrontendOrigin` | `""` |
- | `config.allowedOrigins` | Additional CORS allowlist (comma-separated). Entries are exact origins (`https://app.example.com`) or Phoenix-style `//host` patterns | `""` |
- 
- ### Pod-level controls
- 
- Per-service keys `podDisruptionBudget`, `podAntiAffinity`, and `networkPolicy` are available for high-availability and traffic-isolation requirements. See `values.yaml` for full shapes.
- 
- ## Next steps
- 
- - **Platform architecture:** [Enterprise Intelligence Architecture](/angular/agno/premium/intelligence-platform) — runtime/platform architecture, project boundaries, threads, and realtime sync
- - **Enterprise Intelligence Platform overview:** [Enterprise Intelligence Platform](/angular/agno/premium/overview) — features, hosting options, and where to go next
- - **Use threads in your app:** [Threads](/angular/agno/guides/threads-memory-attachments-headless) — the persistent-conversation surface powered by the Enterprise Intelligence Platform you just deployed
+ # Self-host CopilotKit Intelligence
+ 
+ > Deploy CopilotKit Intelligence to your own Kubernetes cluster with the copilot-intelligence Helm chart — install, configure, and operate the app-api, app-frontend, and realtime-gateway services with your own Postgres, Redis, ingress, and OIDC provider.
+ 
+ 
+ ## What is this?
+ 
+ CopilotKit Intelligence — the platform that powers threads, shared state, and the inspector — can be self-hosted on your own Kubernetes cluster using the `copilot-intelligence` Helm chart. You run the control plane and data plane inside your own network boundary; the chart leaves you in charge of identity, storage, and secrets.
+ 
+ **What you bring:**
+ 
+ - Postgres and Redis — your own, or the bundled Bitnami subcharts
+ - An OIDC provider for identity
+ - Secrets via External Secrets Operator, direct Kubernetes Secrets, or chart-managed credentials
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Planning a self-hosted CopilotKit Intelligence deployment?"
+   body="Self-hosting is available on the Team self-hosted plan or a custom Enterprise plan for VPC, on-prem, and data-residency deployments."
+   ctaLabel="Talk to an engineer"
+   surface="docs_premium_self_hosting_intro"
+   href="https://copilotkit.ai/talk-to-an-engineer"
+   analyticsEvent="talk_to_us_clicked"
+ />
+ 
+ **What the chart deploys:**
+ 
+ | Component | Role | Port |
+ |---|---|---|
+ | `app-api` | Backend service | 4201 |
+ | `app-frontend` | Web UI | 8080 |
+ | `realtime-gateway` *(optional)* | WebSocket service for realtime sync | 4401 |
+ 
+ Plus a `database-migrations` Job, a `thread-culler` CronJob, and the usual supporting resources (Services, Ingress, HPAs, PodDisruptionBudgets, ConfigMaps, and — when ESO is enabled — ExternalSecret resources).
+ 
+ ## When should I use this?
+ 
+ - Your organization requires CopilotKit Intelligence to run inside your own VPC or data center for compliance, data residency, or security reasons
+ - You want to connect CopilotKit Intelligence to internal databases, identity providers, or secret stores that are not reachable from the cloud-hosted version
+ - You need to operate the platform under your existing Kubernetes tooling, CI/CD, and monitoring stack
+ - You have a CopilotKit Intelligence license and the platform-engineering capacity to run a production Kubernetes workload
+ 
+ <Callout type="info" title="Validate locally before committing to a real cluster">
+ The chart installs the same way against a local Docker Desktop or k3d cluster as against a production one, so walk this guide end-to-end on your laptop first. Two local paths are supported:
+ 
+ - **Bundled overlay** — install with the `values-quickstart-local.yaml` overlay shipped in the chart. It enables in-cluster Postgres, Redis, and (optionally) Keycloak; you drive the install yourself, following this guide.
+ - **One-shot script** — `scripts/local-demo.sh` spins up a disposable k3d cluster, installs the released chart from GHCR, and brings up bundled Keycloak in one command:
+ 
+ ```bash title="Terminal"
+ ./scripts/local-demo.sh --version <chart-version>
+ ```
+ 
+ Both paths use the same install commands described below — pick whichever fits.
+ </Callout>
+ 
+ ## Prerequisites
+ 
+ Before starting, make sure the following are in place. [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) explains the application/runtime/platform layers in more depth.
+ 
+ **License and registry access:**
+ 
+ - A valid CopilotKit Intelligence license key (contact your CopilotKit account team if you do not have one)
+ - Read access to the chart OCI registry at `oci://ghcr.io/copilotkit/charts/intelligence` (anonymous pulls are allowed for the released chart)
+ - The latest released chart version. Check the [chart releases](https://github.com/CopilotKit/Intelligence/pkgs/container/charts%2Fintelligence) on GHCR; substitute the value into the `<chart-version>` placeholder used throughout this guide (e.g. `0.1.0-rc.16`).
+ 
+ **Cluster and tooling:**
+ 
+ - Kubernetes ≥ 1.28
+ - Helm ≥ 3.12
+ - `kubectl` configured against the target cluster with an admin-equivalent context
+ 
+ **Platform prerequisites (cluster-wide, installed once):**
+ 
+ - An ingress controller — either `nginx-ingress` or the AWS Load Balancer Controller
+ - `cert-manager` (or a cloud-managed certificate alternative such as AWS ACM) for TLS on the public hostnames
+ - `External Secrets Operator` if you plan to sync secrets from AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager (recommended for production, but not required — see [Secrets](#create-secrets))
+ 
+ **External dependencies (reachable from the cluster):**
+ 
+ - PostgreSQL ≥ 14 — managed (Amazon RDS, Aurora, Cloud SQL) or operator-deployed in-cluster
+ - Redis ≥ 7 (or a Valkey-compatible service such as Amazon ElastiCache)
+ - An OIDC identity provider — Keycloak, Okta, Azure AD, Auth0, Google Workspace, or equivalent
+ 
+ **Optional:**
+ 
+ - Amazon OpenSearch (only when analytics features are in use)
+ - An S3-compatible object store (only when the realtime gateway is configured to persist AG-UI events)
+ 
+ ## Implementation
+ 
+ <Steps>
+   <Step>
+     ### Prepare your Kubernetes cluster
+ 
+     Ensure `kubectl` points to the cluster that will run CopilotKit Intelligence.
+ 
+     ```bash title="Terminal"
+     kubectl config current-context
+     kubectl auth can-i create namespace --all-namespaces
+     ```
+ 
+     Confirm the context names your target cluster and that the permission check returns `yes`. If not, fix your kubeconfig before proceeding.
+   </Step>
+ 
+   <Step>
+     ### Install platform prerequisites
+ 
+     These components are cluster-wide and installed once per cluster, independently of the application chart.
+ 
+     <Tabs items={["AWS (EKS)", "On-prem / generic", "Local (Docker Desktop / k3d)"]}>
+       <Tab value="AWS (EKS)">
+         ```bash title="Terminal"
+         # AWS Load Balancer Controller (kube-system)
+         helm repo add eks https://aws.github.io/eks-charts
+         helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
+           -n kube-system \
+           --set clusterName=<YOUR_CLUSTER_NAME>
+ 
+         # cert-manager
+         helm repo add jetstack https://charts.jetstack.io
+         helm install cert-manager jetstack/cert-manager \
+           -n cert-manager --create-namespace \
+           --set installCRDs=true
+ 
+         # External Secrets Operator (optional — see Secrets step)
+         helm repo add external-secrets https://charts.external-secrets.io
+         helm install external-secrets external-secrets/external-secrets \
+           -n external-secrets --create-namespace
+         ```
+       </Tab>
+       <Tab value="On-prem / generic">
+         ```bash title="Terminal"
+         # NGINX Ingress Controller
+         helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
+         helm install ingress-nginx ingress-nginx/ingress-nginx \
+           -n ingress-nginx --create-namespace
+ 
+         # cert-manager
+         helm repo add jetstack https://charts.jetstack.io
+         helm install cert-manager jetstack/cert-manager \
+           -n cert-manager --create-namespace \
+           --set installCRDs=true
+         ```
+       </Tab>
+       <Tab value="Local (Docker Desktop / k3d)">
+         ```bash title="Terminal"
+         # NGINX Ingress Controller as ClusterIP — you will reach it via
+         # `kubectl port-forward` later, so no LoadBalancer service is needed.
+         helm upgrade --install ingress-nginx ingress-nginx \
+           --repo https://kubernetes.github.io/ingress-nginx \
+           --namespace ingress-nginx --create-namespace \
+           --set controller.service.type=ClusterIP \
+           --wait
+         ```
+ 
+         cert-manager and External Secrets Operator are not required for a local validation pass — TLS is terminated outside the cluster and secrets are managed by the chart (Path C below) or pre-created by hand (Path B).
+       </Tab>
+     </Tabs>
+ 
+     After each controller is running, its pods should be `Ready` in their respective namespaces.
+   </Step>
+ 
+   <Step>
+     ### Provision external dependencies
+ 
+     Intelligence needs Postgres, Redis, and an OIDC issuer. You can either point the chart at managed services you already run, or enable the bundled Bitnami subcharts for in-cluster Postgres and Redis (appropriate for evaluation and small self-hosted installs).
+ 
+     **Using managed services (recommended for production):**
+ 
+     - Create a Postgres database and user. Record the host, port (default `5432`), database name, username, and password.
+     - Create a Redis instance with TLS enabled. Record the host, port (default `6379`), and password.
+     - Configure an OIDC client in your identity provider. Record the issuer URL, client ID, and client secret.
+ 
+     **Using the bundled in-cluster subcharts:**
+ 
+     Set `postgresql.enabled: true` and `redis-subchart.enabled: true` in your values file (covered in the next step). A matching `StorageClass` must exist in the cluster. The bundled Keycloak subchart is available via `keycloak.enabled: true` if you also need a quick OIDC provider for evaluation; do not use the bundled Keycloak for production workloads. See [Bundled Keycloak (eval only)](#bundled-keycloak-eval-only) for the realm and credentials it creates.
+ 
+     The chart already ships a tested overlay for this shape — `values-quickstart-local.yaml` — which enables bundled Postgres + Redis, sets `migrations.enabled: true`, sizes resources for a laptop, and creates disposable secrets so the install runs end-to-end with no manual prep. Layer your own overlay on top of it (see the next step) to plug in your IdP and ingress.
+   </Step>
+ 
+   <Step>
+     ### Create a values file
+ 
+     The released chart ships several example values files for the common deployment shapes. Pick the one closest to your environment and copy it into a working overlay you can edit. Pull and untar the chart so you have local copies to diff against:
+ 
+     ```bash title="Terminal"
+     helm pull oci://ghcr.io/copilotkit/charts/intelligence --version <chart-version> --untar
+ 
+     # AWS-flavored (ALB, IRSA, External Secrets from AWS Secrets Manager)
+     cp intelligence/values-aws-example.yaml my-values.yaml
+ 
+     # Or on-prem-flavored (nginx, manual Kubernetes Secrets)
+     cp intelligence/values-onprem-example.yaml my-values.yaml
+ 
+     # Or self-hosted eval (bundled Keycloak + in-cluster Postgres/Redis)
+     cp intelligence/values-self-hosted-eval.yaml.example my-values.yaml
+     ```
+ 
+     The chart untars into a directory named `intelligence/` (the published chart name on GHCR; the chart's `nameOverride` keeps release-prefixed resources named `cpki-*`).
+ 
+     Edit `my-values.yaml` to set at minimum:
+ 
+     - `database.host`, `database.port`, `database.name` — your Postgres connection (`name` defaults to `intelligence`)
+     - `redis.host`, `redis.port`, `redis.tls` — your Redis connection (TLS is on by default; managed Redis requires it)
+     - `auth.issuer` — your OIDC provider's issuer URL
+     - `auth.existingSecret` — name of the Kubernetes Secret containing `auth-secret`, `auth-client-id`, `auth-client-secret` (or use one of the alternate paths in [Secrets](#create-secrets))
+     - `ingress.ui.host` — the hostname users will load the Intelligence UI on (for example `intelligence.example.com`)
+     - `ingress.api.host` — optional dedicated API hostname. When omitted, the `ui.host` rule routes `/api` and `/auth` paths to `app-api`, so a single hostname is fine for most installs.
+     - `ingress.tls` — TLS configuration for the hosts above
+     - `migrations.enabled: true` — **required for first install**; defaults to `false`. Without it the database schema is never applied and `app-api` will crashloop. (The eval overlay `values-quickstart-local.yaml` sets this for you when you layer on top of it.)
+ 
+     <Callout type="warn" title="OIDC issuer URL — trailing slash matters">
+       Some providers (Auth0 in particular) only accept the issuer URL with a trailing slash (e.g. `https://your-tenant.auth0.com/`). A missing or extra slash produces an opaque "issuer mismatch" failure at login time. Match the value exactly to what your provider's discovery endpoint advertises.
+     </Callout>
+ 
+     See the [Configuration reference](#configuration-reference) section for the full set of values.
+   </Step>
+ 
+   <Step id="create-secrets">
+     ### Create secrets
+ 
+     The chart supports three paths for secrets management. Pick exactly one.
+ 
+     **Path A — External Secrets Operator (recommended for production):**
+ 
+     1. Ensure your secret backend (AWS Secrets Manager, Vault, etc.) has entries for the database URL, Redis URL, and auth credentials.
+     2. Create a `ClusterSecretStore` (or `SecretStore`) that references that backend.
+     3. In `my-values.yaml`, set `externalSecrets.enabled: true`, `externalSecrets.store.kind`, and `externalSecrets.store.name` to match. The chart then generates `ExternalSecret` resources that sync those entries into Kubernetes Secrets at the names `app-api` expects.
+ 
+     **Path B — Direct Kubernetes Secrets (you manage the rotations):**
+ 
+     Leave `externalSecrets.enabled: false` (the default) and create the Secrets manually before installing:
+ 
+     ```bash title="Terminal"
+     kubectl create namespace copilot-intelligence
+ 
+     kubectl create secret generic cpki-db \
+       --from-literal=database-url='postgresql://user:pass@host:5432/intelligence' \
+       -n copilot-intelligence
+ 
+     kubectl create secret generic cpki-redis \
+       --from-literal=redis-url='rediss://:password@host:6379' \
+       -n copilot-intelligence
+ 
+     kubectl create secret generic cpki-auth \
+       --from-literal=auth-secret="$(openssl rand -hex 32)" \
+       --from-literal=auth-client-id='<OIDC client id>' \
+       --from-literal=auth-client-secret='<OIDC client secret>' \
+       -n copilot-intelligence
+     ```
+ 
+     Reference these names in your values file via `database.existingSecret`, `redis.existingSecret`, and `auth.existingSecret`. The Secret keys are lowercase-hyphenated (`auth-secret`, `database-url`, `runner-auth-secret`); the workloads consume them as the corresponding uppercase env vars (`AUTH_SECRET`, `DATABASE_URL`, `RUNNER_AUTH_SECRET`).
+ 
+     **Path C — Chart-managed self-hosted secrets (simplest BYOC):**
+ 
+     Useful when you do not run a secret manager and prefer Helm to create the Kubernetes Secrets directly from values you provide at install time. Set `selfHostedSecrets.enabled: true` and supply the credentials inline:
+ 
+     ```yaml title="my-values.yaml"
+     selfHostedSecrets:
+       enabled: true
+       db:
+         url: "postgresql://user:pass@host:5432/intelligence"
+       redis:
+         url: "rediss://:password@host:6379"
+       auth:
+         # Auto-generated when left empty.
+         secret: ""
+         clientId: "<OIDC client id>"
+         clientSecret: "<OIDC client secret>"
+       realtimeGateway:
+         # Auto-generated when left empty.
+         runnerAuthSecret: ""
+         secretKeyBase: ""
+       beam:
+         # Auto-generated when left empty.
+         releaseCookie: ""
+     ```
+ 
+     The chart auto-generates `auth.secret`, the realtime-gateway runner/key-base, and the BEAM cookie when those fields are empty, so you only need to provide what you actually have.
+   </Step>
+ 
+   <Step>
+     ### Install the chart
+ 
+     The release can be installed directly from the GHCR OCI registry — no local untar is required for the install itself. Use `helm upgrade --install` so the same command works for first-time installs and upgrades.
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <chart-version> \
+       -f my-values.yaml \
+       -n copilot-intelligence \
+       --create-namespace \
+       --wait \
+       --timeout 10m
+     ```
+ 
+     Layering multiple values files is supported and is the recommended pattern for evaluation: combine the chart's bundled `values-quickstart-local.yaml` (in-cluster Postgres/Redis, eval-sized resources, `migrations.enabled: true`, disposable secrets) with your own overlay (IdP, ingress, anything cluster-specific). Pull the chart first so you have a local copy of `values-quickstart-local.yaml` to reference:
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <chart-version> \
+       -f intelligence/values-quickstart-local.yaml \
+       -f my-values.yaml \
+       -n copilot-intelligence --create-namespace \
+       --wait --timeout 10m
+     ```
+ 
+     `--wait` blocks until the `Deployments` report healthy replicas; `--timeout 10m` allows enough time for image pulls and the initial database migration job. Right-most `-f` files win on conflicts, so put your overlay last.
+ 
+     <Callout type="info" title="When the migrations Job runs">
+     The migrations Job runs as a **pre-install/pre-upgrade** hook (weight `-5`) when secrets are pre-created (Path A or Path B above), so the schema is ready before app pods start. It runs as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm (Path C, or when using `postgresql.enabled: true`), because the Secret resources don't exist until Helm has created them.
+     </Callout>
+   </Step>
+ 
+   <Step>
+     ### Verify the install
+ 
+     Check that every pod is `Running` and the ingress is ready:
+ 
+     ```bash title="Terminal"
+     kubectl get pods -n copilot-intelligence
+     kubectl get ingress -n copilot-intelligence
+     ```
+ 
+     You should see `app-api`, `app-frontend`, and — if enabled — `realtime-gateway` pods running. The migrations `Job` will appear as `Completed`.
+ 
+     Confirm the API health check reports `ok`:
+ 
+     ```bash title="Terminal"
+     curl https://<ingress.api.host>/api/health
+     ```
+ 
+     The endpoint returns `200 OK` only when the database is reachable — a failed health check is almost always a database connectivity problem.
+ 
+     Service-specific health endpoints, useful when port-forwarding to an individual pod:
+ 
+     | Service | Path |
+     |---|---|
+     | `app-api` | `/api/health` |
+     | `app-frontend` | `/healthz` |
+     | `realtime-gateway` | `/health` |
+ 
+     Finally, browse to `https://<ingress.ui.host>` and log in via your OIDC provider. A successful login confirms end-to-end wiring.
+ 
+     <Callout type="info" title="Local validation — port-forward the ingress controller">
+     On a local cluster (Docker Desktop, k3d) without a public DNS name, port-forward the **ingress controller** rather than the frontend service so the UI host rule still routes `/api` and `/auth` to `app-api`. Set `ingress.ui.host: "localhost"` in your overlay, then leave this terminal open for as long as you're using the app:
+ 
+     ```bash title="Terminal"
+     kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80
+     ```
+ 
+     Browse to `http://localhost:8080`. Port-forwarding the `app-frontend` service directly bypasses the ingress and breaks `/api` and `/auth` routing.
+     </Callout>
+   </Step>
+ 
+   <Step>
+     ### Upgrade and uninstall
+ 
+     **Upgrade** — bump the version in your install command and re-run it. Because the install command already uses `helm upgrade --install`, the same invocation works for both fresh installs and upgrades:
+ 
+     ```bash title="Terminal"
+     helm upgrade --install copilot-intelligence \
+       oci://ghcr.io/copilotkit/charts/intelligence \
+       --version <new-chart-version> \
+       -f my-values.yaml \
+       -n copilot-intelligence \
+       --wait
+     ```
+ 
+     Before upgrading, regenerate the example values for the target version (`helm pull ... --version <new-chart-version> --untar`) and diff against your overlay to catch new keys.
+ 
+     **Uninstall** — releases leave PersistentVolumes in place by default if you enabled bundled subcharts; delete them manually if you intend to tear down state.
+ 
+     ```bash title="Terminal"
+     helm uninstall copilot-intelligence -n copilot-intelligence
+     ```
+   </Step>
+ </Steps>
+ 
+ ## Bundled Keycloak (eval only)
+ 
+ When `keycloak.enabled: true`, the chart deploys the Bitnami Keycloak subchart with a pre-seeded realm and demo user. This is for evaluation and demos — not production. The realm import creates:
+ 
+ - **Realm:** `cpk-dev`
+ - **OIDC client:** `cpk-self-hosted` with secret `cpk-self-hosted-secret` (override via `auth.keycloakClient.clientId` / `auth.keycloakClient.clientSecret`)
+ - **Demo user:** `engineer` / `engineer` (override via `auth.keycloakDemoUser`)
+ - **Redirect URIs / web origins:** default `["*"]` for eval flexibility (override via `auth.keycloakClient.redirectUris` / `webOrigins`)
+ 
+ The chart auto-wires `auth.issuer` to the in-cluster Keycloak service, so leaving `auth.issuer` empty when `keycloak.enabled: true` is intentional.
+ 
+ For production self-hosted deployments, leave `keycloak.enabled: false` and point `auth.issuer` at your own IdP.
+ 
+ ## Configuration reference
+ 
+ The tables below summarize the most common values. For every option, see `values.yaml` in the pulled chart.
+ 
+ ### Global
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `global.imageRegistry` | Registry prefix for unqualified image names | `""` |
+ | `global.intelligenceImageRegistry` | Registry prefix specifically for the five Intelligence service images | `""` |
+ | `global.imagePullSecrets` | Image pull secrets for private registries | `[]` |
+ | `global.storageClass` | StorageClass override for bundled subcharts | `""` |
+ 
+ ### Database
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `database.host` | Postgres host | `""` (required) |
+ | `database.port` | Postgres port | `5432` |
+ | `database.name` | Database name | `intelligence` |
+ | `database.existingSecret` | Pre-existing Secret with `database-url` | `""` |
+ | `database.secretKeys.url` | Key inside the Secret holding the connection string | `database-url` |
+ 
+ ### Redis
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `redis.host` | Redis host | `""` (required) |
+ | `redis.port` | Redis port | `6379` |
+ | `redis.tls` | Require TLS (ElastiCache defaults to on) | `true` |
+ | `redis.existingSecret` | Pre-existing Secret with `redis-url` | `""` |
+ | `redis.secretKeys.url` | Key inside the Secret holding the connection URL | `redis-url` |
+ 
+ ### OpenSearch (optional)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `openSearch.host` | OpenSearch domain endpoint | `""` |
+ | `openSearch.port` | Port | `443` |
+ | `openSearch.tls` | Require TLS | `true` |
+ | `openSearch.existingSecret` | Pre-existing Secret with `opensearch-url` | `""` |
+ 
+ ### Authentication
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `auth.deploymentMode` | `self-hosted` (single org) or `hosted` (multi-org) | `self-hosted` |
+ | `auth.issuer` | OIDC issuer URL (auto-set when `keycloak.enabled: true`) | `""` |
+ | `auth.existingSecret` | Secret with `auth-secret`, `auth-client-id`, `auth-client-secret` | `""` |
+ | `auth.defaultOrganizationId` | Default organization ID in self-hosted mode | `default` |
+ | `auth.providerId` | Stable identifier for the OIDC provider | `enterprise-sso` |
+ | `auth.providerName` | Display name shown in the UI | `Enterprise SSO` |
+ | `auth.trustHost` | Trust the `X-Forwarded-Host` header (set behind a reverse proxy) | `"true"` |
+ 
+ ### Ingress
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `ingress.enabled` | Create Ingress resources | `true` |
+ | `ingress.className` | `nginx` or `alb` | `nginx` |
+ | `ingress.ui.host` | UI hostname; the rule for this host routes `/api` and `/auth` to `app-api` and `/` to `app-frontend` | `""` (required) |
+ | `ingress.api.host` | Optional dedicated API hostname. When set, this hostname routes `/` to `app-api`. When empty, no separate API rule is created — the UI host already serves the API. | `""` |
+ | `ingress.realtimePlane.host` | Optional dedicated realtime hostname (only used when `realtimeGateway.enabled: true`) | `""` |
+ | `ingress.tls` | TLS configuration | `[]` |
+ | `ingress.websocket.enabled` | Add WebSocket-friendly annotations (auto-enabled when realtime-gateway is enabled with nginx) | `false` |
+ | `ingress.annotations` | Additional ingress annotations | `{}` |
+ 
+ ### Services (`appApi`, `appFrontend`, `realtimeGateway`)
+ 
+ | Key | Description | Default (`appApi`) | Default (`appFrontend`) | Default (`realtimeGateway`) |
+ |---|---|---|---|---|
+ | `<svc>.enabled` | Enable the service | `true` | `true` | `false` |
+ | `<svc>.replicaCount` | Replicas | `2` | `2` | `2` |
+ | `<svc>.image.repository` | Image repository (published chart fully-qualifies these to `ghcr.io/copilotkit/intelligence/<svc>`) | `intelligence/app-api` | `intelligence/app-frontend` | `intelligence/realtime-gateway` |
+ | `<svc>.image.tag` | Image tag (defaults to chart `appVersion`) | `""` | `""` | `""` |
+ | `<svc>.resources` | CPU/memory requests | `250m` / `512Mi` | `100m` / `128Mi` | `500m` / `512Mi` |
+ | `<svc>.autoscaling.enabled` | Enable HPA | `true` | `false` | `true` |
+ | `<svc>.autoscaling.minReplicas` | HPA minimum | `2` | `2` | `2` |
+ | `<svc>.autoscaling.maxReplicas` | HPA maximum | `10` | `4` | `10` |
+ | `<svc>.serviceAccount.annotations` | Annotations on the ServiceAccount (IRSA, workload identity) | `{}` | `{}` | `{}` |
+ | `<svc>.podAnnotations` | Pod template annotations (e.g. for Stakater Reloader on ESO secret rotation) | `{}` | n/a | `{}` |
+ 
+ ### Realtime gateway (additional keys)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `realtimeGateway.enabled` | Enable the gateway | `false` |
+ | `realtimeGateway.host` | `PHX_HOST` override | `""` |
+ | `realtimeGateway.existingSecret` | Secret containing keys `runner-auth-secret` and `secret-key-base` (mapped to env vars `RUNNER_AUTH_SECRET` / `SECRET_KEY_BASE`) | `""` |
+ | `realtimeGateway.beam.clustering.enabled` | BEAM clustering across replicas | `true` |
+ | `realtimeGateway.beam.cookieSecret.name` | Secret containing the BEAM cookie | `cpki-beam-cookie` |
+ 
+ Enabling the realtime gateway requires that either `realtimeGateway.existingSecret` is set, or that `externalSecrets.secrets.realtimeGateway.enabled` or `selfHostedSecrets.enabled` is `true` — the chart fails validation otherwise.
+ 
+ ### External Secrets Operator integration
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `externalSecrets.enabled` | Generate `ExternalSecret` resources | `false` |
+ | `externalSecrets.store.kind` | `ClusterSecretStore` or `SecretStore` | `ClusterSecretStore` |
+ | `externalSecrets.store.name` | SecretStore name | `""` (required when enabled) |
+ | `externalSecrets.refreshInterval` | How often ESO syncs | `1h` |
+ | `externalSecrets.secrets.*` | Per-secret mappings — see `values.yaml` | — |
+ 
+ ### Self-hosted (chart-managed) secrets
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `selfHostedSecrets.enabled` | Create Kubernetes Secrets from inline values; auto-generates blank fields | `false` |
+ | `selfHostedSecrets.db.url` | Postgres connection URL | `""` (required when enabled) |
+ | `selfHostedSecrets.redis.url` | Redis connection URL | `""` (required when enabled) |
+ | `selfHostedSecrets.auth.clientId` / `clientSecret` | OIDC client credentials | `""` (required when enabled) |
+ | `selfHostedSecrets.auth.secret` | Internal auth signing secret | auto-generated when empty |
+ | `selfHostedSecrets.realtimeGateway.runnerAuthSecret` / `secretKeyBase` | Runtime gateway secrets | auto-generated when empty |
+ | `selfHostedSecrets.beam.releaseCookie` | BEAM clustering cookie | auto-generated when empty |
+ 
+ ### Bundled subcharts (evaluation only)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `postgresql.enabled` | Deploy in-cluster Postgres | `false` |
+ | `postgresql.auth.password` | Postgres password (set at deploy time) | `""` |
+ | `redis-subchart.enabled` | Deploy in-cluster Redis (aliased to avoid collision with `redis.*`) | `false` |
+ | `redis-subchart.auth.password` | Redis password | `""` |
+ | `keycloak.enabled` | Deploy bundled Keycloak for quick eval | `false` |
+ 
+ ### Object storage (realtime gateway event persistence)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `objectStorage.enabled` | Persist AG-UI events from the realtime gateway to S3-compatible storage | `false` |
+ | `objectStorage.bucket` | Bucket name | `""` |
+ | `objectStorage.region` | Bucket region | `us-east-1` |
+ | `objectStorage.endpoint` | S3-compatible endpoint override (e.g. for MinIO) | `""` |
+ | `objectStorage.forcePathStyle` | Force path-style addressing (required for MinIO) | `false` |
+ | `objectStorage.existingSecret` | Secret with static access keys (optional if using IRSA) | `""` |
+ 
+ ### Database migrations
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `migrations.enabled` | Run the migrations Job. **Required for first install** — defaults to `false`. | `false` |
+ | `migrations.image.repository` | Migrations image repository | `intelligence/db-migrations` |
+ | `migrations.activeDeadlineSeconds` | Job deadline | `1800` |
+ | `migrations.backoffLimit` | Retry count before failing | `3` |
+ 
+ The migrations Job runs as a **pre-install/pre-upgrade** Helm hook (weight `-5`) when secrets are pre-created (External Secrets path or manual `existingSecret`) and as a **post-install/post-upgrade** hook (weight `5`) when secrets are managed by Helm itself (`selfHostedSecrets.enabled` or `postgresql.enabled`).
+ 
+ ### Thread culler (CronJob)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `threadCuller.enabled` | Run a CronJob that soft-deletes stale threads in unlicensed deployments | `false` |
+ | `threadCuller.schedule` | Cron expression | `0 * * * *` |
+ | `threadCuller.staleHours` | Threads older than this many hours (since last update) are culled | `"3"` |
+ | `threadCuller.batchSize` | Maximum threads to cull per run | `"1000"` |
+ | `threadCuller.licenseSecret.existingSecret` | Secret containing `COPILOTKIT_LICENSE_TOKEN`. When set, the CronJob skips culling (licensed install). When empty, it culls. | `""` |
+ 
+ ### Shared config (CORS, logging)
+ 
+ | Key | Description | Default |
+ |---|---|---|
+ | `config.logLevel` | Log level for all services (`trace`/`debug`/`info`/`warn`/`error`/`fatal`) | `info` |
+ | `config.nodeEnv` | Node environment; affects cookie security and runtime defaults | `production` |
+ | `config.appFrontendOrigin` | Browser origin allowed to perform authenticated bootstrap writes | `""` |
+ | `config.publicAppOrigin` | Public UI origin used by server-side callbacks when distinct from `appFrontendOrigin` | `""` |
+ | `config.allowedOrigins` | Additional CORS allowlist (comma-separated). Entries are exact origins (`https://app.example.com`) or Phoenix-style `//host` patterns | `""` |
+ 
+ ### Pod-level controls
+ 
+ Per-service keys `podDisruptionBudget`, `podAntiAffinity`, and `networkPolicy` are available for high-availability and traffic-isolation requirements. See `values.yaml` for full shapes.
+ 
+ ## Next steps
+ 
+ - **Platform architecture:** [CopilotKit Intelligence architecture](/angular/agno/premium/intelligence-platform) — runtime/platform architecture, project boundaries, threads, and realtime sync
+ - **CopilotKit Intelligence overview:** [CopilotKit Intelligence](/angular/agno/premium/overview) — features, hosting options, and where to go next
+ - **Use threads in your app:** [Threads](/angular/agno/guides/threads-memory-attachments-headless) — the persistent-conversation surface powered by CopilotKit Intelligence you just deployed
  
````

**Medium — CopilotKit Intelligence architecture**

`/angular/agno/premium/intelligence-platform` · under “Next steps”

0 code lines, 170 prose lines changed.

````diff
- # Enterprise Intelligence Architecture
- 
- > Architecture of the Enterprise Intelligence Platform — how CopilotKit runtimes connect to platform projects, durable threads, realtime sync, operational history, and cloud-hosted or self-hosted deployments.
- 
- The Enterprise Intelligence Platform is the platform backend behind production CopilotKit capabilities such as durable threads, realtime sync, project-scoped history, the hosted web app, and operational visibility. This page explains the mental model that applies to both [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) and [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting).
- 
- For a product-level map of features and hosting options, start with the [Enterprise Intelligence Platform overview](/angular/agno/premium/overview). To wire an existing runtime to the platform, see [Connect your runtime to Intelligence](/angular/agno/premium/connect-your-runtime). For Kubernetes installation, go straight to [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting).
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Start with Cloud-Hosted Enterprise Intelligence"
-   body="Create a hosted project, get a project API key, and inspect persistent threads before deciding whether self-hosting is required."
-   ctaLabel="Start managed onboarding"
-   href="https://dashboard.operations.copilotkit.ai/"
-   surface="docs_premium_intelligence_architecture_intro"
- />
- 
- ## Runtime and platform roles
- 
- A CopilotKit app has three layers:
- 
- - **Frontend** — your application uses the CopilotKit frontend SDK to render chat, generative UI, tools, and thread controls.
- - **Runtime** — your application server hosts the CopilotKit runtime and connects to your agent framework through AG-UI.
- - **Enterprise Intelligence Platform** — a platform service that stores durable thread data, indexes operational history, serves project-scoped APIs, and powers dashboard surfaces.
- 
- The runtime is the bridge. It receives requests from your app, streams AG-UI events to and from your agent, and uses the Enterprise Intelligence Platform when a capability needs durable platform state.
- 
- ## Project boundaries
- 
- The platform scopes data through three concepts:
- 
- - **Organization** — the billing, workspace, or contract boundary.
- - **Project** — an application or environment inside an organization, such as production, staging, or a demo app.
- - **User** — the authenticated end user from your application context.
- 
- Project API keys are issued per project. Threads, events, and dashboard history are visible only inside the project that owns them, so production and staging can share the same platform deployment without sharing conversation data.
- 
- ## Threads and event history
- 
- Threads are stored as durable platform records. When your UI uses its thread-management API, the runtime asks the platform to list, create, rename, archive, delete, and resume conversations for the selected project and user.
- 
- The platform stores event history so a conversation can be replayed after reloads and resumed across devices. That is what separates platform-backed threads from an in-memory chat transcript.
- 
- For the thread lifecycle itself, see [Threads & Persistence Architecture](/angular/agno/premium/threads-explained).
- 
- ## Realtime sync
- 
- Realtime sync keeps thread metadata and active conversation state aligned across clients. When enabled, clients subscribe to platform-backed updates so changes such as renames, archives, and active-run status can appear without a page reload.
- 
- The important application-level contract is simple: your app uses the same frontend APIs, while the runtime points at the platform endpoint for the selected deployment.
- 
- ## Inspection and operational history
- 
- The platform also gives teams operational visibility into agent behavior. The cloud-hosted web app exposes project history, thread detail pages, event timelines, API key management, and plan management.
- 
- For the cloud-hosted dashboard flow, see [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform).
- 
- ## Hosting model
- 
- Cloud-hosted and self-hosted Enterprise Intelligence share the same application contract:
- 
- | Deployment | What changes | What stays the same |
- |---|---|---|
- | Cloud-hosted | CopilotKit runs the platform, database, web app, project API keys, and plan management. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
- | Self-hosted | You run the platform in your own Kubernetes cluster and own its infrastructure dependencies. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
- 
- Self-hosting changes operational ownership. It does not require a different frontend integration. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan.
- 
- ## Error handling model
- 
- Platform-backed features are networked features. If the platform endpoint is unavailable or credentials are invalid, thread operations surface as runtime errors rather than silently falling back to local-only state.
- 
- Common debugging checks:
- 
- - Confirm the runtime is using the right platform URL for the selected deployment.
- - Confirm the runtime API key or license is valid for the project or self-hosted environment.
- - Confirm the user and project context you pass from the app match the thread history you expect to see.
- - Confirm realtime sync is configured when you expect cross-tab or cross-device updates.
- 
- ## Next steps
- 
- - **Platform overview:** [Enterprise Intelligence Platform](/angular/agno/premium/overview) — features, hosting options, and where to go next
- - **Cloud-hosted guide:** [Cloud-Hosted Enterprise Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plan management
- - **Self-hosted guide:** [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting) — install and operate the platform in Kubernetes
- - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
+ # CopilotKit Intelligence architecture
+ 
+ > CopilotKit Intelligence architecture — how CopilotKit runtimes connect to platform projects, durable threads, realtime sync, operational history, and cloud-hosted or self-hosted deployments.
+ 
+ CopilotKit Intelligence is the platform backend behind production CopilotKit capabilities such as durable threads, realtime sync, project-scoped history, the hosted web app, and operational visibility. This page explains the mental model that applies to both [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) and [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting).
+ 
+ For a product-level map of features and hosting options, start with the [CopilotKit Intelligence overview](/angular/agno/premium/overview). To wire an existing runtime to the platform, see [Connect your runtime to Intelligence](/angular/agno/premium/connect-your-runtime). For Kubernetes installation, go straight to [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting).
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Start with cloud-hosted CopilotKit Intelligence"
+   body="Create a hosted project, get a project API key, and inspect persistent threads before deciding whether self-hosting is required."
+   ctaLabel="Start managed onboarding"
+   href="https://dashboard.operations.copilotkit.ai/"
+   surface="docs_premium_intelligence_architecture_intro"
+ />
+ 
+ ## Runtime and platform roles
+ 
+ A CopilotKit app has three layers:
+ 
+ - **Frontend** — your application uses the CopilotKit frontend SDK to render chat, generative UI, tools, and thread controls.
+ - **Runtime** — your application server hosts the CopilotKit runtime and connects to your agent framework through AG-UI.
+ - **CopilotKit Intelligence** — a platform service that stores durable thread data, indexes operational history, serves project-scoped APIs, and powers dashboard surfaces.
+ 
+ The runtime is the bridge. It receives requests from your app, streams AG-UI events to and from your agent, and uses CopilotKit Intelligence when a capability needs durable platform state.
+ 
+ ## Project boundaries
+ 
+ The platform scopes data through three concepts:
+ 
+ - **Organization** — the billing, workspace, or contract boundary.
+ - **Project** — an application or environment inside an organization, such as production, staging, or a demo app.
+ - **User** — the authenticated end user from your application context.
+ 
+ Project API keys are issued per project. Threads, events, and dashboard history are visible only inside the project that owns them, so production and staging can share the same platform deployment without sharing conversation data.
+ 
+ ## Threads and event history
+ 
+ Threads are stored as durable platform records. When your UI uses its thread-management API, the runtime asks the platform to list, create, rename, archive, delete, and resume conversations for the selected project and user.
+ 
+ The platform stores event history so a conversation can be replayed after reloads and resumed across devices. That is what separates platform-backed threads from an in-memory chat transcript.
+ 
+ For the thread lifecycle itself, see [Threads & Persistence Architecture](/angular/agno/premium/threads-explained).
+ 
+ ## Realtime sync
+ 
+ Realtime sync keeps thread metadata and active conversation state aligned across clients. When enabled, clients subscribe to platform-backed updates so changes such as renames, archives, and active-run status can appear without a page reload.
+ 
+ The important application-level contract is simple: your app uses the same frontend APIs, while the runtime points at the platform endpoint for the selected deployment.
+ 
+ ## Inspection and operational history
+ 
+ The platform also gives teams operational visibility into agent behavior. The cloud-hosted web app exposes project history, thread detail pages, event timelines, API key management, and plan management.
+ 
+ For the cloud-hosted dashboard flow, see [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform).
+ 
+ ## Hosting model
+ 
+ Cloud-hosted and self-hosted CopilotKit Intelligence share the same application contract:
+ 
+ | Deployment | What changes | What stays the same |
+ |---|---|---|
+ | Cloud-hosted | CopilotKit runs the platform, database, web app, project API keys, and plan management. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
+ | Self-hosted | You run the platform in your own Kubernetes cluster and own its infrastructure dependencies. | Your frontend APIs, runtime APIs, AG-UI agent connection, and thread APIs. |
+ 
+ Self-hosting changes operational ownership. It does not require a different frontend integration. Moving from cloud-hosted projects to self-hosting is available on the Team self-hosted plan or a custom Enterprise plan.
+ 
+ ## Error handling model
+ 
+ Platform-backed features are networked features. If the platform endpoint is unavailable or credentials are invalid, thread operations surface as runtime errors rather than silently falling back to local-only state.
+ 
+ Common debugging checks:
+ 
+ - Confirm the runtime is using the right platform URL for the selected deployment.
+ - Confirm the runtime API key or license is valid for the project or self-hosted environment.
+ - Confirm the user and project context you pass from the app match the thread history you expect to see.
+ - Confirm realtime sync is configured when you expect cross-tab or cross-device updates.
+ 
+ ## Next steps
+ 
+ - **Platform overview:** [CopilotKit Intelligence](/angular/agno/premium/overview) — features, hosting options, and where to go next
+ - **Cloud-hosted guide:** [Cloud-hosted CopilotKit Intelligence](/angular/agno/premium/managed-intelligence-platform) — login, projects, API keys, threads, and plan management
+ - **Self-hosted guide:** [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting) — install and operate the platform in Kubernetes
+ - **Thread architecture:** [Threads & Persistence Architecture](/angular/agno/premium/threads-explained) — event replay, realtime sync, and thread lifecycle semantics
  
````

**High — Copilot Runtime**

`/angular/agno/copilot-runtime` · under “Comparison”

158 code lines, 230 prose lines changed.

````diff
- # Copilot Runtime
- 
- > The Copilot Runtime is the backend that connects your frontend to your AI agents, providing authentication, middleware, routing, and more.
- 
- The Copilot Runtime is the backend layer that connects your frontend application to your AI agents. It's set up during the [quickstart](/angular/agno/quickstart) and is the recommended way to use CopilotKit.
- 
- ## Setting Up the Runtime
- 
- The runtime is a lightweight server endpoint that you add to your backend:
- 
- ```npm
- npm install @copilotkit/runtime
- ```
- 
- Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
- plain fetch handler, so the route is just two exports. It lives at a **catch-all**
- path and exports **both** verbs, so the runtime can serve its sub-routes (`/info`,
- agent runs, threads) rather than a single URL:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
- import {
-   CopilotRuntime,
-   createCopilotRuntimeHandler,
-   InMemoryAgentRunner,
- } from "@copilotkit/runtime/v2";
- 
- const runtime = new CopilotRuntime({
-   agents: {
-     // your agents go here
-   },
-   runner: new InMemoryAgentRunner(),
- });
- 
- const handler = createCopilotRuntimeHandler({
-   runtime,
-   basePath: "/api/copilotkit",
- });
- 
- export const GET = handler;
- export const POST = handler;
- ```
- 
- With the route in place, `GET /api/copilotkit/info` returns a JSON description of the
- runtime and the agents it has registered. That route is how tooling — and the frontend's
- transport auto-detection — discovers your runtime, so it is the quickest way to confirm
- the endpoint is wired up.
- 
- Then point your frontend at the endpoint:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
- })
- ```
- 
- 
- For setup with other backend frameworks (Express, NestJS, Node.js HTTP), see the [quickstart](/angular/agno/quickstart).
- 
- ## The Default Agent
- 
- If you register an agent with the name `"default"`, CopilotKit's prebuilt UI components will use it automatically without any additional configuration on the frontend. This is useful when you have one primary agent and don't want to specify an `agentId` everywhere.
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: {
-     // Frontend APIs use this agent when no other agent id is selected.
-     default: new HttpAgent({ url: "https://my-agent.example.com" }),
-   },
- });
- ```
- 
- When you register multiple agents, the `"default"` agent powers the chat unless a specific agent is selected. Other agents remain addressable through the frontend agent API.
- 
- ## What the Runtime Provides
- 
- ### Authentication and Security
- 
- The runtime runs on your server, which means agent communication stays server-side. This gives you a trusted environment to enforce authentication, validate requests, and keep API keys secure. When you use the runtime, safe defaults are put in place so your agent endpoints are not exposed to unauthenticated access.
- 
- ### AG-UI Middleware
- 
- The [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui) supports a middleware layer (`agent.use`) for logging, guardrails, request transformation, and more. Because the runtime runs server-side, this middleware executes in a trusted environment where it cannot be tampered with by the client.
- 
- ### Agent Routing
- 
- When you register multiple agents with the runtime, it handles discovery and routing automatically. Your frontend doesn't need to know the details of where each agent lives or how to reach it.
- 
- ### Enterprise Intelligence Platform
- 
- Features like [threads](/angular/agno/guides/threads-memory-attachments-headless) and the [inspector](/angular/agno/inspector) are provided through the runtime and the Enterprise Intelligence Platform. These give you conversation persistence and debugging capabilities out of the box.
- 
- ## Built-in Middleware
- 
- The runtime supports two first-class middleware options you can enable directly on `CopilotRuntime` without calling `.use()` on each agent manually.
- 
- ### A2UI
- 
- Pass `a2ui: {}` to automatically apply `A2UIMiddleware` to all registered agents:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: { default: myAgent },
-   a2ui: {}, // enables A2UI rendering for all agents
- });
- ```
- 
- To scope it to specific agents only, pass an `agents` list:
- 
- ```ts
- a2ui: {
-   agents: ["my-agent"];
- }
- ```
- 
- On the frontend, the A2UI renderer activates automatically. Configure `a2ui`
- only when you want to override its defaults:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
-   a2ui: { theme: myCustomTheme },
- })
- ```
- 
- 
- ### mcpApps
- 
- Pass `mcpApps` to configure MCP servers for all agents from a single place:
- 
- ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
- const runtime = new CopilotRuntime({
-   agents: { default: myAgent },
-   mcpApps: {
-     servers: [
-       { type: "http", url: "http://localhost:3108/mcp", serverId: "my-server" },
-     ],
-   },
- });
- ```
- 
- Each server entry optionally accepts an `agentId` field to scope that server to a single agent. Without it, the server is available to all agents.
- 
- ## What If I Want to Connect to My AG-UI Agent Directly?
- 
- CopilotKit is built on the [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui), which is an open standard. If you want to connect your frontend directly to an AG-UI-compatible agent without the runtime, pass the agent instance in your frontend configuration:
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { HttpAgent } from "@ag-ui/client";
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- provideCopilotKit({
-   selfManagedAgents: {
-     "my-agent": new HttpAgent({
-       url: "https://my-agent.example.com",
-     }),
-   },
- })
- ```
- 
- 
- <Callout type="warn">
-   Direct agent connections are intended for development and prototyping. This
-   approach is not recommended for production unless you are confident in your
-   setup, and is not officially supported by CopilotKit. If you run into issues
-   with a direct connection, you will need to troubleshoot on your own.
- </Callout>
- 
- There are important things to understand before going this route:
- 
- 1. **Authentication is your responsibility.** When you use the Copilot Runtime, safe defaults are put in place so that your agent endpoints are not exposed to unauthenticated access. When you connect directly, it is entirely up to you to secure your agent endpoint and manage authentication.
- 
- 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/angular/agno/guides/threads-memory-attachments-headless) and other capabilities — will not be available.
- 
- ### Comparison
- 
- |                        | With Runtime                | Direct Connection |
- | ---------------------- | --------------------------- | ----------------- |
- | **Authentication**     | Safe defaults provided      | You manage it     |
- | **AG-UI Middleware**   | Runs server-side            | Not available     |
- | **Agent Routing**      | Automatic                   | Manual            |
- | **Ecosystem Features** | Full support                | Limited           |
- | **CopilotKit Support** | Supported                   | Not supported     |
- | **Setup**              | Requires a backend endpoint | Frontend-only     |
+ # Copilot Runtime
+ 
+ > The Copilot Runtime is the backend that connects your frontend to your AI agents, providing authentication, middleware, routing, and more.
+ 
+ The Copilot Runtime is the backend layer that connects your frontend application to your AI agents. It's set up during the [quickstart](/angular/agno/quickstart) and is the recommended way to use CopilotKit.
+ 
+ ## Setting Up the Runtime
+ 
+ The runtime is a lightweight server endpoint that you add to your backend:
+ 
+ ```npm
+ npm install @copilotkit/runtime
+ ```
+ 
+ Here's a minimal example using Next.js. `createCopilotRuntimeHandler` returns a
+ plain fetch handler, so the route is just two exports. It lives at a **catch-all**
+ path and exports **both** verbs, so the runtime can serve its sub-routes (`/info`,
+ agent runs, threads) rather than a single URL:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts" doctest="component"
+ import {
+   CopilotRuntime,
+   createCopilotRuntimeHandler,
+   InMemoryAgentRunner,
+ } from "@copilotkit/runtime/v2";
+ 
+ const runtime = new CopilotRuntime({
+   agents: {
+     // your agents go here
+   },
+   runner: new InMemoryAgentRunner(),
+ });
+ 
+ const handler = createCopilotRuntimeHandler({
+   runtime,
+   basePath: "/api/copilotkit",
+ });
+ 
+ export const GET = handler;
+ export const POST = handler;
+ ```
+ 
+ With the route in place, `GET /api/copilotkit/info` returns a JSON description of the
+ runtime and the agents it has registered. That route is how tooling — and the frontend's
+ transport auto-detection — discovers your runtime, so it is the quickest way to confirm
+ the endpoint is wired up.
+ 
+ Then point your frontend at the endpoint:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+ })
+ ```
+ 
+ 
+ For setup with other backend frameworks (Express, NestJS, Node.js HTTP), see the [quickstart](/angular/agno/quickstart).
+ 
+ ## The Default Agent
+ 
+ If you register an agent with the name `"default"`, CopilotKit's prebuilt UI components will use it automatically without any additional configuration on the frontend. This is useful when you have one primary agent and don't want to specify an `agentId` everywhere.
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: {
+     // Frontend APIs use this agent when no other agent id is selected.
+     default: new HttpAgent({ url: "https://my-agent.example.com" }),
+   },
+ });
+ ```
+ 
+ When you register multiple agents, the `"default"` agent powers the chat unless a specific agent is selected. Other agents remain addressable through the frontend agent API.
+ 
+ ## What the Runtime Provides
+ 
+ ### Authentication and Security
+ 
+ The runtime runs on your server, which means agent communication stays server-side. This gives you a trusted environment to enforce authentication, validate requests, and keep API keys secure. When you use the runtime, safe defaults are put in place so your agent endpoints are not exposed to unauthenticated access.
+ 
+ ### AG-UI Middleware
+ 
+ The [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui) supports a middleware layer (`agent.use`) for logging, guardrails, request transformation, and more. Because the runtime runs server-side, this middleware executes in a trusted environment where it cannot be tampered with by the client.
+ 
+ ### Agent Routing
+ 
+ When you register multiple agents with the runtime, it handles discovery and routing automatically. Your frontend doesn't need to know the details of where each agent lives or how to reach it.
+ 
+ ### CopilotKit Intelligence
+ 
+ Features like [threads](/angular/agno/guides/threads-memory-attachments-headless) and the [inspector](/angular/agno/inspector) are provided through the runtime and CopilotKit Intelligence. These give you conversation persistence and debugging capabilities out of the box.
+ 
+ ## Built-in Middleware
+ 
+ The runtime supports two first-class middleware options you can enable directly on `CopilotRuntime` without calling `.use()` on each agent manually.
+ 
+ ### A2UI
+ 
+ Pass `a2ui: {}` to automatically apply `A2UIMiddleware` to all registered agents:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: { default: myAgent },
+   a2ui: {}, // enables A2UI rendering for all agents
+ });
+ ```
+ 
+ To scope it to specific agents only, pass an `agents` list:
+ 
+ ```ts
+ a2ui: {
+   agents: ["my-agent"];
+ }
+ ```
+ 
+ On the frontend, the A2UI renderer activates automatically. Configure `a2ui`
+ only when you want to override its defaults:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+   a2ui: { theme: myCustomTheme },
+ })
+ ```
+ 
+ 
+ ### mcpApps
+ 
+ Pass `mcpApps` to configure MCP servers for all agents from a single place:
+ 
+ ```ts title="app/api/copilotkit/[[...slug]]/route.ts"
+ const runtime = new CopilotRuntime({
+   agents: { default: myAgent },
+   mcpApps: {
+     servers: [
+       { type: "http", url: "http://localhost:3108/mcp", serverId: "my-server" },
+     ],
+   },
+ });
+ ```
+ 
+ Each server entry optionally accepts an `agentId` field to scope that server to a single agent. Without it, the server is available to all agents.
+ 
+ ## What If I Want to Connect to My AG-UI Agent Directly?
+ 
+ CopilotKit is built on the [AG-UI protocol](/angular/agno/agentic-protocols/ag-ui), which is an open standard. If you want to connect your frontend directly to an AG-UI-compatible agent without the runtime, pass the agent instance in your frontend configuration:
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { HttpAgent } from "@ag-ui/client";
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ provideCopilotKit({
+   selfManagedAgents: {
+     "my-agent": new HttpAgent({
+       url: "https://my-agent.example.com",
+     }),
+   },
+ })
+ ```
+ 
+ 
+ <Callout type="warn">
+   Direct agent connections are intended for development and prototyping. This
+   approach is not recommended for production unless you are confident in your
+   setup, and is not officially supported by CopilotKit. If you run into issues
+   with a direct connection, you will need to troubleshoot on your own.
+ </Callout>
+ 
+ There are important things to understand before going this route:
+ 
+ 1. **Authentication is your responsibility.** When you use the Copilot Runtime, safe defaults are put in place so that your agent endpoints are not exposed to unauthenticated access. When you connect directly, it is entirely up to you to secure your agent endpoint and manage authentication.
+ 
+ 2. **Many ecosystem features won't work.** The AG-UI protocol supports a middleware layer designed to run on the backend. Many features in the CopilotKit ecosystem depend on this server-side middleware. Without the runtime, these features — including [threads](/angular/agno/guides/threads-memory-attachments-headless) and other capabilities — will not be available.
+ 
+ ### Comparison
+ 
+ |                        | With Runtime                | Direct Connection |
+ | ---------------------- | --------------------------- | ----------------- |
+ | **Authentication**     | Safe defaults provided      | You manage it     |
+ | **AG-UI Middleware**   | Runs server-side            | Not available     |
+ | **Agent Routing**      | Automatic                   | Manual            |
+ | **Ecosystem Features** | Full support                | Limited           |
+ | **CopilotKit Support** | Supported                   | Not supported     |
+ | **Setup**              | Requires a backend endpoint | Frontend-only     |
  
````

**High — AG-UI**

`/angular/agno/ag-ui` · under “How agents slot into the runtime”

96 code lines, 162 prose lines changed.

````diff
- # AG-UI
- 
- > The AG-UI protocol connects your frontend to your Agno agents via event-based Server-Sent Events (SSE).
- 
- CopilotKit is built on the [AG-UI protocol](https://ag-ui.com), a lightweight,
- event-based standard that defines how AI agents communicate with user-facing
- applications over Server-Sent Events (SSE).
- 
- Messages, state updates, tool calls, and agent lifecycle events all flow
- through AG-UI. Understanding this layer helps you debug and extend any
- CopilotKit integration.
- 
- 
- 
- 
- ## Accessing your agent with `injectAgentStore`
- 
- `injectAgentStore` exposes the AG-UI agent and projects its messages, state,
- and run status into Angular signals:
- 
- ```ts title="src/app/agent-status.component.ts"
- import { Component, computed } from "@angular/core";
- import { injectAgentStore } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-agent-status",
-   template: `
-     <p>{{ messageCount() }} messages</p>
-     @if (store().isRunning()) {
-       <p>Agent is running…</p>
-     }
-   `,
- })
- export class AgentStatusComponent {
-   readonly store = injectAgentStore("research-agent");
-   readonly messageCount = computed(() => this.store().messages().length);
- }
- ```
- 
- 
- The resolved agent is a standard AG-UI `AbstractAgent`. You can read its
- state, invoke protocol methods, and subscribe to its event stream.
- 
- ### Subscribing to AG-UI events
- 
- 
- 
- 
- Subscribe to `store().agent` and release the subscription with the owning
- injector:
- 
- ```ts
- private readonly destroyRef = inject(DestroyRef);
- readonly store = injectAgentStore("research-agent");
- 
- constructor() {
-   const subscription = this.store().agent.subscribe({
-     onTextMessageContentEvent({ textMessageBuffer }) {
-       console.log("Streaming text:", textMessageBuffer);
-     },
-     onToolCallEndEvent({ toolCallName, toolCallArgs }) {
-       console.log("Tool called:", toolCallName, toolCallArgs);
-     },
-     onStateChanged({ agent }) {
-       console.log("State changed:", agent.state);
-     },
-   });
-   this.destroyRef.onDestroy(() => subscription.unsubscribe());
- }
- ```
- 
- 
- The callback names map directly to the [AG-UI event
- types](https://docs.ag-ui.com/concepts/events):
- 
- | Event | Callback |
- | --- | --- |
- | Run lifecycle | `onRunStartedEvent`, `onRunFinishedEvent`, `onRunErrorEvent` |
- | Steps | `onStepStartedEvent`, `onStepFinishedEvent` |
- | Text messages | `onTextMessageStartEvent`, `onTextMessageContentEvent`, `onTextMessageEndEvent` |
- | Tool calls | `onToolCallStartEvent`, `onToolCallArgsEvent`, `onToolCallEndEvent`, `onToolCallResultEvent` |
- | State | `onStateSnapshotEvent`, `onStateDeltaEvent` |
- | Messages | `onMessagesSnapshotEvent` |
- | Custom | `onCustomEvent`, `onRawEvent` |
- | High-level changes | `onMessagesChanged`, `onStateChanged` |
- 
- ## The proxy pattern
- 
- When you use CopilotKit with a runtime, your frontend does not talk directly
- to the backend agent. CopilotKit discovers agents through the runtime's
- `/info` endpoint and represents each one with a proxy that implements the
- same `AbstractAgent` interface.
- 
- 
- 
- 
- ```ts title="What your component sees"
- const store = injectAgentStore("default");
- const agent = store().agent;
- store().messages();
- store().state();
- agent.subscribe({ /* … */ });
- ```
- 
- ```ts title="What happens underneath"
- // injectAgentStore() → registry checks /info → resolves a proxy agent
- // core.runAgent({ agent }) → runtime POST → agent execution → SSE events
- ```
- 
- 
- This indirection lets the runtime provide authentication, middleware, agent
- routing, and CopilotKit Enterprise Intelligence without changing how the
- frontend interacts with agents.
- 
- ## How agents slot into the runtime
- 
- On the server, `CopilotRuntime` accepts a map of AG-UI `AbstractAgent`
- instances. A framework adapter, an `HttpAgent` pointing at a remote server,
- and a custom implementation all use the same request path:
- 
- 1. The runtime resolves the target agent by ID.
- 2. It clones the agent for request isolation and supplies messages, state, and
-    thread context.
- 3. `AgentRunner` executes the agent and receives AG-UI events.
- 4. The runtime encodes those events as SSE and streams them to the frontend
-    proxy.
- 
- The backend framework can change without forcing a corresponding change to
- the frontend AG-UI contract.
+ # AG-UI
+ 
+ > The AG-UI protocol connects your frontend to your Agno agents via event-based Server-Sent Events (SSE).
+ 
+ CopilotKit is built on the [AG-UI protocol](https://ag-ui.com), a lightweight,
+ event-based standard that defines how AI agents communicate with user-facing
+ applications over Server-Sent Events (SSE).
+ 
+ Messages, state updates, tool calls, and agent lifecycle events all flow
+ through AG-UI. Understanding this layer helps you debug and extend any
+ CopilotKit integration.
+ 
+ 
+ 
+ 
+ ## Accessing your agent with `injectAgentStore`
+ 
+ `injectAgentStore` exposes the AG-UI agent and projects its messages, state,
+ and run status into Angular signals:
+ 
+ ```ts title="src/app/agent-status.component.ts"
+ import { Component, computed } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-agent-status",
+   template: `
+     <p>{{ messageCount() }} messages</p>
+     @if (store().isRunning()) {
+       <p>Agent is running…</p>
+     }
+   `,
+ })
+ export class AgentStatusComponent {
+   readonly store = injectAgentStore("research-agent");
+   readonly messageCount = computed(() => this.store().messages().length);
+ }
+ ```
+ 
+ 
+ The resolved agent is a standard AG-UI `AbstractAgent`. You can read its
+ state, invoke protocol methods, and subscribe to its event stream.
+ 
+ ### Subscribing to AG-UI events
+ 
+ 
+ 
+ 
+ Subscribe to `store().agent` and release the subscription with the owning
+ injector:
+ 
+ ```ts
+ private readonly destroyRef = inject(DestroyRef);
+ readonly store = injectAgentStore("research-agent");
+ 
+ constructor() {
+   const subscription = this.store().agent.subscribe({
+     onTextMessageContentEvent({ textMessageBuffer }) {
+       console.log("Streaming text:", textMessageBuffer);
+     },
+     onToolCallEndEvent({ toolCallName, toolCallArgs }) {
+       console.log("Tool called:", toolCallName, toolCallArgs);
+     },
+     onStateChanged({ agent }) {
+       console.log("State changed:", agent.state);
+     },
+   });
+   this.destroyRef.onDestroy(() => subscription.unsubscribe());
+ }
+ ```
+ 
+ 
+ The callback names map directly to the [AG-UI event
+ types](https://docs.ag-ui.com/concepts/events):
+ 
+ | Event | Callback |
+ | --- | --- |
+ | Run lifecycle | `onRunStartedEvent`, `onRunFinishedEvent`, `onRunErrorEvent` |
+ | Steps | `onStepStartedEvent`, `onStepFinishedEvent` |
+ | Text messages | `onTextMessageStartEvent`, `onTextMessageContentEvent`, `onTextMessageEndEvent` |
+ | Tool calls | `onToolCallStartEvent`, `onToolCallArgsEvent`, `onToolCallEndEvent`, `onToolCallResultEvent` |
+ | State | `onStateSnapshotEvent`, `onStateDeltaEvent` |
+ | Messages | `onMessagesSnapshotEvent` |
+ | Custom | `onCustomEvent`, `onRawEvent` |
+ | High-level changes | `onMessagesChanged`, `onStateChanged` |
+ 
+ ## The proxy pattern
+ 
+ When you use CopilotKit with a runtime, your frontend does not talk directly
+ to the backend agent. CopilotKit discovers agents through the runtime's
+ `/info` endpoint and represents each one with a proxy that implements the
+ same `AbstractAgent` interface.
+ 
+ 
+ 
+ 
+ ```ts title="What your component sees"
+ const store = injectAgentStore("default");
+ const agent = store().agent;
+ store().messages();
+ store().state();
+ agent.subscribe({ /* … */ });
+ ```
+ 
+ ```ts title="What happens underneath"
+ // injectAgentStore() → registry checks /info → resolves a proxy agent
+ // core.runAgent({ agent }) → runtime POST → agent execution → SSE events
+ ```
+ 
+ 
+ This indirection lets the runtime provide authentication, middleware, agent
+ routing, and CopilotKit Intelligence without changing how the
+ frontend interacts with agents.
+ 
+ ## How agents slot into the runtime
+ 
+ On the server, `CopilotRuntime` accepts a map of AG-UI `AbstractAgent`
+ instances. A framework adapter, an `HttpAgent` pointing at a remote server,
+ and a custom implementation all use the same request path:
+ 
+ 1. The runtime resolves the target agent by ID.
+ 2. It clones the agent for request isolation and supplies messages, state, and
+    thread context.
+ 3. `AgentRunner` executes the agent and receives AG-UI events.
+ 4. The runtime encodes those events as SSE and streams them to the frontend
+    proxy.
+ 
+ The backend framework can change without forcing a corresponding change to
+ the frontend AG-UI contract.
  
````

**High — Common Copilot Issues**

`/angular/agno/troubleshooting/common-issues` · under “Runtime memory keeps growing or the process runs out of heap”

90 code lines, 334 prose lines changed.

````diff
- # Common Copilot Issues
- 
- > Network errors, endpoint not found, tunnel timeouts, and other common issues when wiring up CopilotKit with the Built-in Agent.
- 
- Welcome to the CopilotKit troubleshooting guide. This page covers the most common issues you'll hit while wiring up a Built-in Agent, plus the usual fixes.
- 
- <Callout type="info">
- Have an issue not listed here? Open a ticket on [GitHub](https://github.com/CopilotKit/CopilotKit/issues) or reach out on [Discord](https://discord.com/invite/6dffbvGU3D) and we'll help. PRs adding your own troubleshooting notes are very welcome.
- </Callout>
- 
- ## Network errors / API not found
- 
- If you're getting network or API errors, here's how to troubleshoot.
- 
- <Accordions>
- <Accordion title="Check your endpoint configuration">
- Verify the configured `runtimeUrl`.
- 
- 
- 
- 
- ```ts title="src/app/app.config.ts"
- import { provideCopilotKit } from "@copilotkit/angular";
- 
- export const appConfig = {
-   providers: [
-     provideCopilotKit({
-       runtimeUrl: "/api/copilotkit",
-       licenseKey: "<your-copilot-cloud-public-api-key>",
-     }),
-   ],
- };
- ```
- 
- 
- Common issues:
- 
- - Missing leading slash in the endpoint path
- - Wrong path relative to your app's base URL (or, if absolute, wrong full URL)
- - Typos in the endpoint path
- 
- 
- - Omitting both `runtimeUrl` and `agents`/`selfManagedAgents`
- 
- </Accordion>
- 
- <Accordion title="localhost vs 127.0.0.1">
- If you're running locally and getting connection errors, try `127.0.0.1` instead of `localhost`:
- 
- ```bash
- # If this doesn't work:
- http://localhost:3000/api/copilotkit
- 
- # Try this instead:
- http://127.0.0.1:3000/api/copilotkit
- ```
- 
- Usually caused by local DNS / `/etc/hosts` issues.
- </Accordion>
- 
- <Accordion title="Verify your backend is running">
- Make sure your backend:
- 
- - Is actually running on the port you expect
- - Is reachable from your frontend
- - Isn't blocked by CORS or a firewall
- 
- Revisit the [quickstart](../quickstart) if you want to double-check your setup.
- </Accordion>
- </Accordions>
- 
- ## "Remote Endpoint not found" error
- 
- If you're getting a *"CopilotKit's Remote Endpoint not found"* error, the `/info` endpoint isn't reachable from the runtime.
- 
- <Accordions>
- <Accordion title="Check your FastAPI / backend setup">
- Confirm the CopilotKit SDK is mounted. If you're using Python + FastAPI, follow the [Remote Python Endpoint](/reference/v1/sdk/python/RemoteEndpoints) guide.
- </Accordion>
- 
- <Accordion title="Test the /info endpoint directly">
- ```bash
- curl -v -d '{}' http://localhost:8000/copilotkit/info
- ```
- 
- You should see a `200 OK` and a JSON body like:
- 
- ```json
- {
-   "actions": [],
-   "agents": [
-     { "name": "my_agent", "description": "A helpful agent.", "type": "langgraph_agui" }
-   ],
-   "sdkVersion": "0.1.32"
- }
- ```
- 
- If you see a different response, check your server logs.
- </Accordion>
- </Accordions>
- 
- ## Tunnel creation hangs
- 
- If the tunnel creation process spins indefinitely, your router or ISP might be blocking the tunnel service.
- 
- <Accordions>
- <Accordion title="Router / ISP blocking tunnel connections">
- Verify connectivity:
- 
- ```bash
- ping tunnels.devcopilotkit.com
- curl -I https://tunnels.devcopilotkit.com
- telnet tunnels.devcopilotkit.com 443
- ```
- 
- If any of these fail:
- 
- - Check your router security settings
- - Contact your ISP to see if they're blocking the connection
- - Try a different network to confirm
- </Accordion>
- </Accordions>
- 
- ## The Built-in Agent responds with an empty message
- 
- Usually one of:
- 
- - The LLM model string isn't supported by the runtime's provider. Check it against [Model Selection](/angular/model-selection).
- - The Built-in Agent's `prompt` is empty and the user message gives it nothing useful to do. Give the agent a system prompt.
- - A frontend tool is throwing during its handler and the agent is treating the empty result as the turn output. See [Error Debugging](./error-debugging) for the `tool_handler_failed` code.
- 
- ## Tools I registered don't show up
- 
- 
- 
- 
- - Confirm the component or service that calls `registerFrontendTool` is
-   instantiated and its injector has not been destroyed.
- - Confirm the registration and chat select the same `agentId`.
- - If the tool is registered but never called, make its `description` state the
-   trigger clearly and confirm its schema accepts the emitted arguments.
- - See <a href="/angular/agno/guides/troubleshooting">Troubleshooting Angular
-   apps</a> for the complete registration checklist.
- 
- 
- ## Connect route returns 404 on a fresh thread
- 
- If you self-host the runtime and see a `404` from `POST /agent/:agentId/connect`
- right after the page loads, before any message is sent, it's almost always one
- of two things:
- 
- <Accordions>
- <Accordion title="The agentId isn't registered (most common)">
- The runtime returns a `404` with this body when no agent matches the id in the URL:
- 
- ```json
- { "error": "Agent not found", "message": "Agent 'default' does not exist" }
- ```
- 
- The prebuilt components connect to the agent named `"default"` unless you pass an
- explicit `agentId`. Register one under that key:
- 
- ```ts
- new CopilotRuntime({ agents: { default: myAgent } });
- ```
- 
- Confirm the agent shows up by hitting [`GET {runtimeUrl}/info`](/angular/agno/backend/runtime-endpoints)
- directly. See also the [error reference](./error-reference#agent-not-found--agent-id-does-not-exist).
- </Accordion>
- 
- <Accordion title="connect() runs before run() on a new thread">
- The frontend mints a thread id and may call `connect()` to re-attach **before**
- the first `run()` has produced any events. A persistence backend that only learns
- about a thread once a run starts can 404 (or error) on that first connect.
- 
- The built-in [`InMemoryAgentRunner`](/angular/agno/backend/agent-runner) handles the common
- cases, but a custom runner backed by an external memory layer must handle the
- "unknown thread" path explicitly. Return an empty `RUN_STARTED`,
- `MESSAGES_SNAPSHOT`, `RUN_FINISHED` sequence instead of failing. The
- [AWS AgentCore integration](/angular/agno/deploy/agentcore) shows the exact pattern.
- </Accordion>
- </Accordions>
- 
- ## Runtime memory keeps growing or the process runs out of heap
- 
- A long-lived server on the default `InMemoryAgentRunner` accumulates thread
- history in process memory.
- 
- <Accordions>
- <Accordion title="Tune or lower the in-memory bounds">
- The store is bounded by default (1000 threads, 100 runs per thread, ~512 MiB of
- retained history), but those defaults assume a reasonably sized heap. If your
- process runs with a small `--max-old-space-size`, or your threads carry unusually
- large payloads, lower the limits:
- 
- ```ts
- new InMemoryAgentRunner({ maxThreads: 200, maxBytes: 64 * 1024 ** 2 });
- ```
- 
- See [bounding in-memory history](/angular/agno/backend/agent-runner#bounding-in-memory-history)
- for what each bound covers and what it deliberately does not.
- </Accordion>
- 
- <Accordion title="You saw an eviction warning in the logs">
- `InMemoryAgentRunner evicted in-memory thread history...` means the bounds are
- doing their job — the process is safe, but that thread's scrollback is gone and
- will not come back. If losing history matters, move to a durable runner:
- [Self-Hosting Enterprise Intelligence](/angular/agno/premium/self-hosting), or your own
- [custom runner](/angular/agno/backend/agent-runner#extending-a-runner-for-a-custom-backend)
- backed by your datastore.
- </Accordion>
- </Accordions>
+ # Common Copilot Issues
+ 
+ > Network errors, endpoint not found, tunnel timeouts, and other common issues when wiring up CopilotKit with the Built-in Agent.
+ 
+ Welcome to the CopilotKit troubleshooting guide. This page covers the most common issues you'll hit while wiring up a Built-in Agent, plus the usual fixes.
+ 
+ <Callout type="info">
+ Have an issue not listed here? Open a ticket on [GitHub](https://github.com/CopilotKit/CopilotKit/issues) or reach out on [Discord](https://discord.com/invite/6dffbvGU3D) and we'll help. PRs adding your own troubleshooting notes are very welcome.
+ </Callout>
+ 
+ ## Network errors / API not found
+ 
+ If you're getting network or API errors, here's how to troubleshoot.
+ 
+ <Accordions>
+ <Accordion title="Check your endpoint configuration">
+ Verify the configured `runtimeUrl`.
+ 
+ 
+ 
+ 
+ ```ts title="src/app/app.config.ts"
+ import { provideCopilotKit } from "@copilotkit/angular";
+ 
+ export const appConfig = {
+   providers: [
+     provideCopilotKit({
+       runtimeUrl: "/api/copilotkit",
+       licenseKey: "<your-copilot-cloud-public-api-key>",
+     }),
+   ],
+ };
+ ```
+ 
+ 
+ Common issues:
+ 
+ - Missing leading slash in the endpoint path
+ - Wrong path relative to your app's base URL (or, if absolute, wrong full URL)
+ - Typos in the endpoint path
+ 
+ 
+ - Omitting both `runtimeUrl` and `agents`/`selfManagedAgents`
+ 
+ </Accordion>
+ 
+ <Accordion title="localhost vs 127.0.0.1">
+ If you're running locally and getting connection errors, try `127.0.0.1` instead of `localhost`:
+ 
+ ```bash
+ # If this doesn't work:
+ http://localhost:3000/api/copilotkit
+ 
+ # Try this instead:
+ http://127.0.0.1:3000/api/copilotkit
+ ```
+ 
+ Usually caused by local DNS / `/etc/hosts` issues.
+ </Accordion>
+ 
+ <Accordion title="Verify your backend is running">
+ Make sure your backend:
+ 
+ - Is actually running on the port you expect
+ - Is reachable from your frontend
+ - Isn't blocked by CORS or a firewall
+ 
+ Revisit the [quickstart](../quickstart) if you want to double-check your setup.
+ </Accordion>
+ </Accordions>
+ 
+ ## "Remote Endpoint not found" error
+ 
+ If you're getting a *"CopilotKit's Remote Endpoint not found"* error, the `/info` endpoint isn't reachable from the runtime.
+ 
+ <Accordions>
+ <Accordion title="Check your FastAPI / backend setup">
+ Confirm the CopilotKit SDK is mounted. If you're using Python + FastAPI, follow the [Remote Python Endpoint](/reference/v1/sdk/python/RemoteEndpoints) guide.
+ </Accordion>
+ 
+ <Accordion title="Test the /info endpoint directly">
+ ```bash
+ curl -v -d '{}' http://localhost:8000/copilotkit/info
+ ```
+ 
+ You should see a `200 OK` and a JSON body like:
+ 
+ ```json
+ {
+   "actions": [],
+   "agents": [
+     { "name": "my_agent", "description": "A helpful agent.", "type": "langgraph_agui" }
+   ],
+   "sdkVersion": "0.1.32"
+ }
+ ```
+ 
+ If you see a different response, check your server logs.
+ </Accordion>
+ </Accordions>
+ 
+ ## Tunnel creation hangs
+ 
+ If the tunnel creation process spins indefinitely, your router or ISP might be blocking the tunnel service.
+ 
+ <Accordions>
+ <Accordion title="Router / ISP blocking tunnel connections">
+ Verify connectivity:
+ 
+ ```bash
+ ping tunnels.devcopilotkit.com
+ curl -I https://tunnels.devcopilotkit.com
+ telnet tunnels.devcopilotkit.com 443
+ ```
+ 
+ If any of these fail:
+ 
+ - Check your router security settings
+ - Contact your ISP to see if they're blocking the connection
+ - Try a different network to confirm
+ </Accordion>
+ </Accordions>
+ 
+ ## The Built-in Agent responds with an empty message
+ 
+ Usually one of:
+ 
+ - The LLM model string isn't supported by the runtime's provider. Check it against [Model Selection](/angular/model-selection).
+ - The Built-in Agent's `prompt` is empty and the user message gives it nothing useful to do. Give the agent a system prompt.
+ - A frontend tool is throwing during its handler and the agent is treating the empty result as the turn output. See [Error Debugging](./error-debugging) for the `tool_handler_failed` code.
+ 
+ ## Tools I registered don't show up
+ 
+ 
+ 
+ 
+ - Confirm the component or service that calls `registerFrontendTool` is
+   instantiated and its injector has not been destroyed.
+ - Confirm the registration and chat select the same `agentId`.
+ - If the tool is registered but never called, make its `description` state the
+   trigger clearly and confirm its schema accepts the emitted arguments.
+ - See <a href="/angular/agno/guides/troubleshooting">Troubleshooting Angular
+   apps</a> for the complete registration checklist.
+ 
+ 
+ ## Connect route returns 404 on a fresh thread
+ 
+ If you self-host the runtime and see a `404` from `POST /agent/:agentId/connect`
+ right after the page loads, before any message is sent, it's almost always one
+ of two things:
+ 
+ <Accordions>
+ <Accordion title="The agentId isn't registered (most common)">
+ The runtime returns a `404` with this body when no agent matches the id in the URL:
+ 
+ ```json
+ { "error": "Agent not found", "message": "Agent 'default' does not exist" }
+ ```
+ 
+ The prebuilt components connect to the agent named `"default"` unless you pass an
+ explicit `agentId`. Register one under that key:
+ 
+ ```ts
+ new CopilotRuntime({ agents: { default: myAgent } });
+ ```
+ 
+ Confirm the agent shows up by hitting [`GET {runtimeUrl}/info`](/angular/agno/backend/runtime-endpoints)
+ directly. See also the [error reference](./error-reference#agent-not-found--agent-id-does-not-exist).
+ </Accordion>
+ 
+ <Accordion title="connect() runs before run() on a new thread">
+ The frontend mints a thread id and may call `connect()` to re-attach **before**
+ the first `run()` has produced any events. A persistence backend that only learns
+ about a thread once a run starts can 404 (or error) on that first connect.
+ 
+ The built-in [`InMemoryAgentRunner`](/angular/agno/backend/agent-runner) handles the common
+ cases, but a custom runner backed by an external memory layer must handle the
+ "unknown thread" path explicitly. Return an empty `RUN_STARTED`,
+ `MESSAGES_SNAPSHOT`, `RUN_FINISHED` sequence instead of failing. The
+ [AWS AgentCore integration](/angular/agno/deploy/agentcore) shows the exact pattern.
+ </Accordion>
+ </Accordions>
+ 
+ ## Runtime memory keeps growing or the process runs out of heap
+ 
+ A long-lived server on the default `InMemoryAgentRunner` accumulates thread
+ history in process memory.
+ 
+ <Accordions>
+ <Accordion title="Tune or lower the in-memory bounds">
+ The store is bounded by default (1000 threads, 100 runs per thread, ~512 MiB of
+ retained history), but those defaults assume a reasonably sized heap. If your
+ process runs with a small `--max-old-space-size`, or your threads carry unusually
+ large payloads, lower the limits:
+ 
+ ```ts
+ new InMemoryAgentRunner({ maxThreads: 200, maxBytes: 64 * 1024 ** 2 });
+ ```
+ 
+ See [bounding in-memory history](/angular/agno/backend/agent-runner#bounding-in-memory-history)
+ for what each bound covers and what it deliberately does not.
+ </Accordion>
+ 
+ <Accordion title="You saw an eviction warning in the logs">
+ `InMemoryAgentRunner evicted in-memory thread history...` means the bounds are
+ doing their job — the process is safe, but that thread's scrollback is gone and
+ will not come back. If losing history matters, move to a durable runner:
+ [Self-host CopilotKit Intelligence](/angular/agno/premium/self-hosting), or your own
+ [custom runner](/angular/agno/backend/agent-runner#extending-a-runner-for-a-custom-backend)
+ backed by your datastore.
+ </Accordion>
+ </Accordions>
  
````

**Medium — Architecture**

`/angular/agno/concepts/architecture` · under “Where to go next”

0 code lines, 132 prose lines changed.

````diff
- # Architecture
- 
- > How CopilotKit's pieces fit together — a frontend, a runtime in your app server, and an agent backend, all talking AG-UI.
- 
- CopilotKit is a three-layer stack — **frontend, runtime, agent** — connected by the open **[AG-UI](/angular/agno/agentic-protocols/ag-ui)** event protocol. The runtime lives in your own application server, so the only thing between your UI and your agent is a wire format you can inspect.
- 
- ## The 30-second version
- 
- - **Frontend.** A framework-native SDK and prebuilt chat components that connect your UI to a running agent.
- - **Runtime.** A request handler mounted in your app server (Next.js, Express, Hono, Bun, Deno, Workers). Brokers auth, tool calls, and the AG-UI stream.
- - **Agent.** Any AG-UI-compatible backend — Built-in, LangGraph, Mastra, CrewAI, Pydantic AI, MAF, or your own.
- - **AG-UI** is the wire format: 16 event types, transport-agnostic, framework-agnostic. Swap any layer without rewriting the others.
- 
- ## The three layers
- 
- <ImageZoom
-   src="https://cdn.copilotkit.ai/docs/copilotkit/images/architecture-diagram.png"
-   className="rounded-2xl"
-   width={1000}
-   height={1000}
- />
- 
- ### 1. Frontend
- 
- The application your users interact with. CopilotKit ships framework-native
- state and tool APIs plus prebuilt components such as `CopilotChat`,
- `CopilotSidebar`, and `CopilotPopup`. Use a prebuilt chat surface, build a
- fully custom UI with the headless APIs, or mix the two.
- 
- ### 2. Runtime
- 
- A request handler that mounts inside your application server (Next.js App Router, Express, Hono, Bun, Deno, Cloudflare Workers). The runtime accepts requests from the frontend, mediates auth and tool calls, and forwards work to your agent over AG-UI. For the framework-agnostic path you can instantiate a `BuiltInAgent` in-process and skip an external agent process entirely.
- 
- ### 3. Agent
- 
- The agent backend you choose: LangGraph, Mastra, CrewAI, Pydantic AI, Microsoft Agent Framework, the Built-in Agent, or any custom AG-UI-compatible implementation. The agent runs your prompt, calls tools, emits state, and streams events back to the runtime.
- 
- ## AG-UI: the protocol bridge
- 
- CopilotKit doesn't lock you into one agent framework. The runtime talks to your agent over **[AG-UI](/angular/agno/agentic-protocols/ag-ui)**, an open, event-driven protocol that standardizes how agents communicate with applications:
- 
- - **Event-driven** — 16 standardized event types (text deltas, tool calls, state snapshots and deltas, run lifecycle) stream from the agent through the runtime to the frontend.
- - **Bidirectional** — users send input, agents respond, agents pause for human-in-the-loop input, frontends expose frontend tools the agent can invoke.
- - **Transport-agnostic** — SSE, WebSockets, webhooks, whatever your stack prefers.
- - **Framework-agnostic** — every supported integration ships a thin AG-UI adapter. Switch backends with one line of runtime configuration.
- 
- > *"The future of agents isn't one company or one platform — it's an agentic ecosystem connected by protocols."*
- 
- Because the contract is a protocol — not an SDK lock-in — you can swap the agent layer without rewriting the frontend, run multiple agent backends side by side, and integrate with anything AG-UI-compatible: MCP servers, A2UI components, Oracle / Google / AWS agent platforms.
- 
- ## Request flow at a glance
- 
- 1. A user sends a message in your frontend application.
- 2. The frontend agent API posts to your runtime endpoint.
- 3. Runtime opens an AG-UI session with the configured agent.
- 4. Agent emits text, tool calls, and state updates as AG-UI events.
- 5. Runtime streams the events back; the frontend renders them in real time.
- 6. If the agent calls a frontend tool, the runtime relays the request, your browser handler runs, and the result flows back to the agent.
- 7. Threads, persistence, and realtime sync (when configured) are mediated by the [Enterprise Intelligence Platform](/angular/agno/premium/overview) — the platform backend that sits beside the runtime.
- 
- ## Where to go next
- 
- - **Practical setup** — [Quickstart](/angular/agno/quickstart) wires all three layers in ~10 minutes against the Built-in Agent.
- - **Protocol depth** — [AG-UI documentation](/angular/agno/agentic-protocols/ag-ui) covers every event type, transport option, and middleware hook.
- - **Backend choices** — [Agents & Backends](/) explains the runtime, custom agents, and the trade-offs between Built-in, external frameworks, and bring-your-own.
- - **Enterprise Intelligence Platform overview** — [Enterprise Intelligence Platform](/angular/agno/premium/overview) covers Threads, Persistence, hosted inspection, and the cloud-hosted-vs-self-hosted decision.
+ # Architecture
+ 
+ > How CopilotKit's pieces fit together — a frontend, a runtime in your app server, and an agent backend, all talking AG-UI.
+ 
+ CopilotKit is a three-layer stack — **frontend, runtime, agent** — connected by the open **[AG-UI](/angular/agno/agentic-protocols/ag-ui)** event protocol. The runtime lives in your own application server, so the only thing between your UI and your agent is a wire format you can inspect.
+ 
+ ## The 30-second version
+ 
+ - **Frontend.** A framework-native SDK and prebuilt chat components that connect your UI to a running agent.
+ - **Runtime.** A request handler mounted in your app server (Next.js, Express, Hono, Bun, Deno, Workers). Brokers auth, tool calls, and the AG-UI stream.
+ - **Agent.** Any AG-UI-compatible backend — Built-in, LangGraph, Mastra, CrewAI, Pydantic AI, MAF, or your own.
+ - **AG-UI** is the wire format: 16 event types, transport-agnostic, framework-agnostic. Swap any layer without rewriting the others.
+ 
+ ## The three layers
+ 
+ <ImageZoom
+   src="https://cdn.copilotkit.ai/docs/copilotkit/images/architecture-diagram.png"
+   className="rounded-2xl"
+   width={1000}
+   height={1000}
+ />
+ 
+ ### 1. Frontend
+ 
+ The application your users interact with. CopilotKit ships framework-native
+ state and tool APIs plus prebuilt components such as `CopilotChat`,
+ `CopilotSidebar`, and `CopilotPopup`. Use a prebuilt chat surface, build a
+ fully custom UI with the headless APIs, or mix the two.
+ 
+ ### 2. Runtime
+ 
+ A request handler that mounts inside your application server (Next.js App Router, Express, Hono, Bun, Deno, Cloudflare Workers). The runtime accepts requests from the frontend, mediates auth and tool calls, and forwards work to your agent over AG-UI. For the framework-agnostic path you can instantiate a `BuiltInAgent` in-process and skip an external agent process entirely.
+ 
+ ### 3. Agent
+ 
+ The agent backend you choose: LangGraph, Mastra, CrewAI, Pydantic AI, Microsoft Agent Framework, the Built-in Agent, or any custom AG-UI-compatible implementation. The agent runs your prompt, calls tools, emits state, and streams events back to the runtime.
+ 
+ ## AG-UI: the protocol bridge
+ 
+ CopilotKit doesn't lock you into one agent framework. The runtime talks to your agent over **[AG-UI](/angular/agno/agentic-protocols/ag-ui)**, an open, event-driven protocol that standardizes how agents communicate with applications:
+ 
+ - **Event-driven** — 16 standardized event types (text deltas, tool calls, state snapshots and deltas, run lifecycle) stream from the agent through the runtime to the frontend.
+ - **Bidirectional** — users send input, agents respond, agents pause for human-in-the-loop input, frontends expose frontend tools the agent can invoke.
+ - **Transport-agnostic** — SSE, WebSockets, webhooks, whatever your stack prefers.
+ - **Framework-agnostic** — every supported integration ships a thin AG-UI adapter. Switch backends with one line of runtime configuration.
+ 
+ > *"The future of agents isn't one company or one platform — it's an agentic ecosystem connected by protocols."*
+ 
+ Because the contract is a protocol — not an SDK lock-in — you can swap the agent layer without rewriting the frontend, run multiple agent backends side by side, and integrate with anything AG-UI-compatible: MCP servers, A2UI components, Oracle / Google / AWS agent platforms.
+ 
+ ## Request flow at a glance
+ 
+ 1. A user sends a message in your frontend application.
+ 2. The frontend agent API posts to your runtime endpoint.
+ 3. Runtime opens an AG-UI session with the configured agent.
+ 4. Agent emits text, tool calls, and state updates as AG-UI events.
+ 5. Runtime streams the events back; the frontend renders them in real time.
+ 6. If the agent calls a frontend tool, the runtime relays the request, your browser handler runs, and the result flows back to the agent.
+ 7. Threads, persistence, and realtime sync (when configured) are mediated by [CopilotKit Intelligence](/angular/agno/premium/overview) — the platform backend that sits beside the runtime.
+ 
+ ## Where to go next
+ 
+ - **Practical setup** — [Quickstart](/angular/agno/quickstart) wires all three layers in ~10 minutes against the Built-in Agent.
+ - **Protocol depth** — [AG-UI documentation](/angular/agno/agentic-protocols/ag-ui) covers every event type, transport option, and middleware hook.
+ - **Backend choices** — [Agents & Backends](/) explains the runtime, custom agents, and the trade-offs between Built-in, external frameworks, and bring-your-own.
+ - **CopilotKit Intelligence overview** — [CopilotKit Intelligence](/angular/agno/premium/overview) covers Threads, Persistence, hosted inspection, and the cloud-hosted-vs-self-hosted decision.
  
````

## 2026-08-24

### 16:05 UTC — 29 pages, baseline snapshot

Initial baseline established for Agno Angular documentation tracking against `https://docs.copilotkit.ai/angular/agno`.
All 29 pages snapshotted and checksummed.
