# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Updating dependencies

Check first, from the repo root:

```bash
node ../ci/check-versions.mjs
```

It classifies what is outdated, because only one of the three reasons a package
can be behind is ours to act on — the other two are an upstream exact pin and a
peerDependency that forbids the newer version. `@copilotkit/angular` exact-pins
`@copilotkit/core`, and Angular 22 pins TypeScript to `>=6.0 <6.1`, so the
`Latest` column is not a to-do list here.

To bump something the report says is ours:

```bash
git checkout -b chore/bump-<package>
npm install <package>@<version>
npm run build
```

Do not run `npx npm-check-updates -u`: it rewrites `package.json` past the
declared ranges and breaks the Angular peer graph. See
[`../ci/VERSION-WATCH.md`](../ci/VERSION-WATCH.md).

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Automated Screen Recording

To record the 3-step walkthroughs (Doc scroll $\rightarrow$ IDE highlight $\rightarrow$ Live demo) with the Windows 11 taskbar, live clock, and visible mouse cursor:

```bash
# Record all verified error-free pages
npm run record

# Record an individual page
npm run record -- --page=quickstart
npm run record -- --page=chat-ui
npm run record -- --page=frontend-tools-generative-ui
npm run record -- --page=human-in-the-loop
npm run record -- --page=shared-state
npm run record -- --page=attachments
npm run record -- --page=headless
npm run record -- --page=voice-multimodal
```

Outputs are saved as high-definition `.webm` video files in `frontend/recordings/`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
