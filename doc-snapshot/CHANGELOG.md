# Doc drift changelog

What the CopilotKit docs changed under this repo, written by the sync on
`/doc-sync`. Only pages that actually moved are recorded — a sync that finds
everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth
date, the oldest entry is dropped. Entries are counted, not aged, so a gap of
weeks between changes does not expire anything.

## 2026-08-24

### 16:05 UTC — 29 pages, baseline snapshot

Initial baseline established for Agno Angular documentation tracking against `https://docs.copilotkit.ai/angular/agno`.
All 29 pages snapshotted and checksummed.

## 2026-08-18

### 06:22 UTC — 1 page, highest severity low

**Low — Chat UI and customization** · _local snapshot edit, not an upstream change_

`/angular/agno/guides/chat-ui` · route `/chat-ui` · under “Choose a chat surface”

1 prose line changed.

````diff
- Hello
````

### 06:21 UTC — 2 pages, highest severity high

**High — Threads** · _local snapshot edit, not an upstream change_

`/angular/agno/guides/threads-memory-attachments-headless` · routes `/threads`, `/memory`, `/attachments`, `/headless` · under “Resume a specific thread” · in a `ts` block

22 code lines changed.

````diff
+ @Component({
+ selector: "app-thread-list",
+ template: `
+ <button type="button" (click)="threads.startNewThread()">
+ New conversation
+ </button>
+ 
+ @if (threads.isLoading()) {
````

**Low — Voice and multimodal input** · _local snapshot edit, not an upstream change_

`/angular/agno/guides/voice-multimodal` · route `/voice-multimodal` · under “Accept voice input”

5 prose lines changed.

````diff
- 
+ No component option is required to display the microphone. The browser asks
+ for microphone permission, records the audio, and sends it to the Runtime
+ transcription endpoint. The resulting text remains editable before the user
+ sends it.
````
