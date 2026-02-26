# StyleGuide AI Plugin — Project Instructions (v2.0)

## Overview

A Figma plugin that automates UX copy reviews by analyzing selected text layers against a brand Style Guide, filtered through contextual UX parameters answered by the designer.

**Core problem it solves:** Content designers are bottlenecks. This plugin gives product designers instant, on-brand, emotionally-calibrated copy suggestions without waiting for a content review.

---

## Core Workflow

1. **Select** — Designer selects a text layer in Figma.
2. **Answer** — Designer fills in 3 context questions in the plugin panel.
3. **Generate** — Plugin sends Style Guide + selected text + context answers to Claude API.
4. **Review** — 1–3 copy variations appear as selectable "bubbles."
5. **Apply** — Designer clicks a bubble; the text layer updates in the Figma file.

---

## UI: The Context Questionnaire

All three questions must be answered before the **Generate** button activates.

### Q1 — User Sentiment
**Label:** "How is the user feeling?"

| Option | Behavior |
|---|---|
| Calm / Routine | Standard sentence length, neutral tone |
| Stressed / Urgent | Shorter sentences, action-forward language |
| Confused / Uncertain | Clear, reassuring, jargon-free |
| Frustrated | High empathy, minimal friction, no jargon |

### Q2 — Action Impact
**Label:** "Is this action destructive?"

| Option | Behavior |
|---|---|
| Yes — Permanent | High clarity, explicit consequences, cautionary language |
| Yes — Reversible | Moderate friction, mention undo/recovery path |
| No — Neutral | Conversational, low friction |

### Q3 — Financial Stakes
**Label:** "Is money involved?"

| Option | Behavior |
|---|---|
| Yes — Money moves | Prioritize transparency, precision, and trust signals |
| Yes — Held / Paused | Acknowledge the hold, provide clear next steps |
| No — Data / Settings | Standard tone, no financial framing needed |

---

## Prompt Engineering

### System Prompt Template

```
You are a Senior Content Designer. Your job is to rewrite the [Selected Text] using the provided [Style Guide].

User Context:
- The user feels: {{Q1_Answer}}
- Destructiveness level: {{Q2_Answer}}
- Financial stakes: {{Q3_Answer}}

Rules:
- If the user is Stressed or Frustrated: use shorter, more direct sentences.
- If the action is Permanent: explicitly state the consequence in the copy.
- If Money is moving: prioritize transparency and security language over playful tone.
- Always output exactly 3 variations, each on its own line, prefixed with 1., 2., 3.
- Do not exceed the character count of the original text by more than 20%.
- Do not explain your choices; output copy only.

Style Guide:
{{STYLE_GUIDE_CONTENT}}

Selected Text:
{{SELECTED_TEXT}}
```

---

## Technical Requirements

### Stack
- **Plugin runtime:** Figma Plugin API (TypeScript)
- **UI:** HTML/CSS/JS panel (iframe sandbox) — or React if complexity warrants it
- **AI model:** Claude 3.5 Sonnet via Anthropic API
- **Style Guide source:** JSON file (primary) — with optional Google Docs / Notion integration later

### Figma API Requirements
- `figma.currentPage.selection` — detect selected node
- Check node type is `TEXT` before proceeding
- `node.characters` — read current text
- `node.characters = newText` — write replacement text (requires `loadFontAsync` first)

### API Call Structure
```
POST https://api.anthropic.com/v1/messages
Headers:
  x-api-key: <ANTHROPIC_API_KEY>
  anthropic-version: 2023-06-01
  content-type: application/json

Body:
  model: claude-3-5-sonnet-20241022
  max_tokens: 1024
  messages: [{ role: "user", content: <assembled prompt> }]
```

### Style Guide Loading
- Default: bundle a `style-guide.json` file in the plugin
- Format: flat JSON with keys like `voice`, `grammar_rules`, `banned_words`, `tone_by_context`
- Future: OAuth-based Google Docs / Notion fetch (v3 scope)

### Security
- API key stored in Figma's `figma.clientStorage` (never hardcoded or exposed in UI)
- Prompt inputs sanitized before assembly

---

## File Structure (Target)

```
copper-plugin/
├── INSTRUCTIONS.md          ← this file
├── manifest.json            ← Figma plugin manifest
├── src/
│   ├── code.ts              ← main plugin logic (Figma API side)
│   ├── ui.html              ← plugin panel UI
│   ├── ui.ts                ← UI interaction logic
│   └── prompt.ts            ← prompt assembly logic
├── assets/
│   └── style-guide.json     ← default brand style guide
├── package.json
└── tsconfig.json
```

---

## Success Metrics

| Metric | Definition |
|---|---|
| Reduced friction | Designers self-serve minor copy without waiting for content review |
| Brand consistency | Output matches voice/grammar rules even without a Content Designer present |
| Tone accuracy | AI recommendations match the emotional gravity of the specific user flow |

---

## Out of Scope (v2.0)

- Multi-layer batch processing
- Comment/annotation creation in Figma
- Version history / undo tracking within the plugin
- Real-time collaboration features
- Google Docs / Notion live sync (deferred to v3)
