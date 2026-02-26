# Project Ledger — StyleGuide AI Figma Plugin

A running log of what has been built, what each piece does, and what comes next.

---

## Repository

**Remote:** https://github.com/isaacsheptovitsky-melio/copper-figma-plugin.git
**Branch:** `main`

---

## Completed Work

### Phase 1 — Project Definition
**File:** `INSTRUCTIONS.md`

The full product spec, captured before any code was written. Contains:
- Core workflow (select → answer → generate → apply)
- All 3 questionnaire questions with their options and behavioral impact
- Prompt engineering template with all `{{placeholders}}`
- Technical requirements (Figma API methods, Claude API call structure, style guide format)
- Target file structure
- Success metrics and out-of-scope items for v2.0

---

### Phase 2 — Scaffold

#### `manifest.json`
Figma plugin manifest. Declares the plugin name, points Figma to `dist/code.js` (main thread) and `dist/ui.html` (UI iframe).

```json
{
  "name": "StyleGuide AI",
  "id": "copper-plugin",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "editorType": ["figma"]
}
```

---

#### `package.json`
Dependencies:
- `react` + `react-dom` — UI framework
- `typescript` — type safety throughout
- `webpack` + `webpack-cli` — bundles the two entry points
- `ts-loader` — compiles TypeScript in webpack pipeline
- `html-webpack-plugin` + `html-inline-script-webpack-plugin` — produces a single self-contained `ui.html` with the React bundle inlined (required by Figma's sandboxed iframe)
- `css-loader` + `style-loader` — CSS support
- `@figma/plugin-typings` — Figma global types (`figma`, `__html__`, `FontName`, etc.)
- `@types/react` + `@types/react-dom` — React types

Scripts: `npm run build` (production), `npm run watch` (dev with file watching).

---

#### `tsconfig.json`
Key settings:
- `"jsx": "react"` — enables JSX compilation
- `"esModuleInterop": true` + `"allowSyntheticDefaultImports": true` — required for React default imports to work
- `"typeRoots"` includes both `@types` and `@figma/plugin-typings`

---

#### `webpack.config.js`
Two entry points:
- `code` entry: `src/code.ts` → `dist/code.js` (Figma main thread)
- `ui` entry: `src/ui.tsx` → React bundle, inlined into `dist/ui.html`

`HtmlInlineScriptPlugin` is critical — Figma's plugin iframe cannot load external scripts, so the entire React bundle must be inlined into the HTML file.

---

#### `src/code.ts` — Plugin Main Thread
Runs in Figma's sandbox. Has access to the Figma API but not the DOM.

**What it does:**
1. Opens the plugin UI at 380×560px
2. Listens for `selectionchange` events — when a `TEXT` node is selected, posts `{ type: 'selection', text: node.characters }` to the UI; otherwise posts `{ type: 'no-selection' }`
3. Listens for messages from the UI:
   - `apply-text`: loads the node's font async (required by Figma before editing text), then overwrites `node.characters` with the new copy
   - `close`: closes the plugin

**Key Figma API calls used:**
- `figma.showUI(__html__, { width, height })` — renders the UI iframe
- `figma.on('selectionchange', cb)` — selection listener
- `figma.currentPage.selection` — get selected nodes
- `figma.ui.postMessage(msg)` — send message to UI
- `figma.ui.onmessage` — receive messages from UI
- `figma.loadFontAsync(fontName)` — must be awaited before editing text
- `node.characters = newText` — writes the new copy to the layer

---

#### `src/ui.html`
Minimal HTML shell. Just a `<div id="root">` that React mounts into. Webpack inlines the compiled React bundle here at build time.

---

#### `src/ui.tsx`
React entry point. Creates the React root and renders `<App />`.

---

#### `src/App.tsx` — Plugin UI
The full questionnaire UI. Runs in the plugin's iframe. Has access to the DOM but communicates with `code.ts` only via `postMessage`.

**State:**
- `selectedText` — text from the currently selected Figma layer (null if none)
- `sentiment` — Q1 answer
- `destructiveness` — Q2 answer
- `financialStakes` — Q3 answer
- `variations` — array of 1–3 copy suggestions returned by Claude
- `loading` — controls button state during API call

**Logic:**
- `canGenerate` — true only when all 4 values (selectedText + 3 answers) are set; gates the Generate button
- `window.onmessage` listener — receives `selection` / `no-selection` messages from `code.ts`
- `handleGenerate` — **currently stubbed** with `// TODO: call Claude API via prompt.ts`
- `handleApply(text)` — posts `{ type: 'apply-text', text }` to `code.ts`, which writes it to the Figma layer

**UI sections:**
1. Selected text preview box (gray when empty, black when populated)
2. Q1 dropdown — User Sentiment
3. Q2 dropdown — Action Destructiveness
4. Q3 dropdown — Financial Stakes
5. Generate button — disabled + gray until `canGenerate` is true
6. Variation bubbles — rendered when `variations.length > 0`, each clickable to apply

---

## What Builds to `dist/`

```
dist/
├── code.js        ← compiled plugin main thread
├── ui.html        ← self-contained React app (bundle inlined)
└── ui.js.LICENSE.txt
```

`dist/` is git-ignored and always regenerated via `npm run build`.

---

## What's Not Built Yet

| Item | Description | File |
|---|---|---|
| Prompt assembly | Builds the Claude prompt from style guide + selected text + Q answers | `src/prompt.ts` (to create) |
| Claude API call | POSTs to Anthropic API, parses 3 variations from response | Inside `handleGenerate` in `App.tsx` |
| Style guide | Brand rules JSON that gets injected into the prompt | `assets/style-guide.json` (to create) |
| API key management | Store/retrieve key via `figma.clientStorage` | To add to `App.tsx` / `code.ts` |
| Error states | Handle API failures, no-selection edge cases gracefully | `App.tsx` |
| Styling polish | Replace inline styles with a proper CSS approach | `App.tsx` |

---

## Architecture Reminder

```
Figma Canvas
    │
    ▼
code.ts (Figma sandbox — no DOM, has Figma API)
    │  postMessage / onmessage
    ▼
App.tsx / ui.html (iframe — has DOM, no Figma API)
    │
    ▼  fetch()
Claude API (Anthropic)
```

The UI thread makes the Claude API call directly via `fetch()`. It does not route through `code.ts`. API key must be retrieved from `figma.clientStorage` and passed to the UI at startup.
