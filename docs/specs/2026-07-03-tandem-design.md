# tandem — design spec

**Date:** 2026-07-03 · **Owner:** Amy · **Status:** approved design, pre-implementation

## What it is

tandem packages Amy's human + AI-pair checklist workflow into a reusable, sendable product:
**meeting notes → AI-distilled checklist (.md) → multiple AI agents work it under shared rules →
human verifies in a browser board.** The markdown file on the user's machine is the single source
of truth; the hosted page is a viewer/editor over it. No backend, no accounts, no sync.

Origin: the CMF tuning-week system (`cmf-july-*.md` files + `cmf-todo.html` viewer + the
Claude/Codex coordination protocol that grew in session memory). This productizes it: one canonical
rules doc, a generic hosted board, templates, and bootstrap files for both AI sides.

## Decisions already made (with Amy)

1. Audience: Amy + her AIs first, but hosted at a URL so the *tool* can be sent around.
   Recipients open their own local .md — no shared state, nothing about Amy's projects visible.
2. Notes→checklist happens in the AI session (skill), AND the page has a minimal "New checklist"
   button that writes a blank templated file set for people without the skill.
3. Personal GitHub repo + Amy's Vercel (like her other standalone projects). Working name: **tandem**.
4. Zero-build vanilla static site — maintainable by editing one file, like the current viewer.
5. Out of scope, deliberately: accounts, server sync, publish-snapshot links, calling Granola/AI
   APIs from the page. The page stays dumb and local; the AI session does the smart parts.

## Repo layout

```
tandem/
  public/
    index.html      landing page — explains the workflow, sendable
    board.html      the app (evolved cmf-todo.html)
    protocol.html   the rules, human-readable (content mirrors PROTOCOL.md)
  PROTOCOL.md       canonical rules — single source for protocol.html, the skill, agents.md
  templates/
    checklist.md    three sections: Verify / Discuss / Later + rules header line
    decisions.md    numbered decisions with the why
    archive.md      append-only history
    agents.md       operating instructions for any AI agent (the "point Codex here" file)
  skill/
    SKILL.md        Claude Code skill (install: copy dir to ~/.claude/skills/tandem)
  sample/           a filled-in example project for smoke tests + landing-page screenshots
  docs/specs/       this spec
  README.md         what it is, hosting/deploy notes, skill install, browser support
  vercel.json       static deploy config (public/ as root)
```

## The board (board.html)

Base: current `cmf-todo.html` behavior, kept: File System Access API file handle (+ IndexedDB
handle persistence and one-click reconnect), 2s poll re-render paused during typing, inline
plaintext editing with debounced save, checkbox toggle, Enter=new item / Backspace=delete-empty,
raw whole-file mode, line-anchored writes (`replaceLine`/`spliceLines` locate the line by content
so concurrent AI appends elsewhere don't clobber).

Changes:

1. **Generic**: no CMF naming; title from the file's H1; page works with any markdown file.
2. **Dynamic agent lanes**: the "who's on what" strip derives agent names from markers present in
   the file (`→ 🤖 (\S+):` capture), not hardcoded Claude/Codex. Colors assigned per agent from a
   small palette. The division-of-labor rule line comes from the checklist's rules header line
   (template provides it) instead of being hardcoded.
3. **Full marker grammar rendered** (see PROTOCOL). in-progress = amber, done = green,
   `→ ❓` blocked/question = red, `⚠️ HOLD` = red badge. Rendering is decoration only — the
   underlying text is never altered.
4. **New checklist button**: `showDirectoryPicker()` → user picks/creates a folder → writes the
   four template files (name-stamped) → opens checklist.md in the board. Templates are inlined in
   the JS at build time (single-file constraint: keep them as JS template strings synced from
   templates/ by hand or a tiny sync script — acceptable for this scale).
5. **Help drawer**: slide-over summarizing the protocol (ownership, markers, sections, write
   safety) + link to protocol.html.
6. **Multi-file awareness (light)**: header shows sibling files (decisions.md / archive.md) as
   quick-open buttons when they exist in the same directory handle. Read-only rendering is fine
   for v1 (they're AI-maintained).

## The landing page (index.html)

Sections: (1) one-line pitch; (2) the four-step workflow with a static example board snippet
showing real markers; (3) "Open the board" CTA + Chromium-only notice; (4) "For your AI" — where
the skill and agents.md live (repo link) and the one-sentence bootstrap ("point your agent at
agents.md in your project folder"); (5) protocol link. Same visual language as the board (dark,
the existing palette) so it reads as one product.

## PROTOCOL.md (the rules, codified once)

Contents — written to be read by humans and pasted into AI contexts:

- **Ownership**: humans check boxes and cross items out; a checked/crossed item is settled and is
  never resurfaced or re-added by an AI. AIs only append.
- **Marker grammar** (exact forms):
  - claim/lock: `→ 🤖 Name: in progress — <what>`
  - completion: `→ 🤖 Name: done — <what, commit hash or link>`
  - blocked/question for the human: `→ ❓ Name: <question>`
  - shared-file lock: `⚠️ HOLD Name <file or topic>` (released by editing the marker to done)
- **File set & sections**: checklist.md holds only live work in three sections — **Verify**
  (done, awaiting human check), **Discuss** (needs a human/team decision), **Later** (parked).
  decisions.md gets every decision with the why, numbered. archive.md gets the full history;
  checklist stays short by moving done detail there.
- **Division of labor**: architectural/risky items → the stronger agent; self-contained items →
  the other; an in-progress marker IS the claim. Only one agent edits a given checklist item's
  work at a time.
- **Write safety**: the file is hot (board + other agents write it). Re-read immediately before
  every write; write via atomic replace (temp file + rename); never hold a stale copy across
  thinking time. Humans' checkbox states are sacred — never regenerate the file wholesale.
- **Sources in, status out**: notes/transcripts are inputs; outward status posts (Linear, Notion,
  Slack) are generated FROM the checklist, not maintained in parallel.

## Skill + agent bootstrap

- `skill/SKILL.md` — `/tandem` with two flows:
  - **new**: gather source material (Granola meeting, pasted notes, or a file) → distill into
    the template set in a chosen folder (default `~/Checklists/<name>/`) → fill Verify/Discuss/
    Later → print the board URL + which file to open. Embeds the PROTOCOL rules.
  - **resume**: read the checklist, summarize board state (open items, blocked questions,
    unclaimed work), claim per division-of-labor, work with correct markers.
- `templates/agents.md` — the same rules phrased as operating instructions for ANY agent
  (Codex, another Claude, etc.): read the checklist, marker grammar, write-safety, what you may
  and may not touch. Integration = "point your agent at this file"; nothing tool-specific.

## Edge cases

- File moved/deleted: read fails → status shows disconnected + reconnect button (existing
  pattern).
- Line rewritten on disk mid-edit: existing reload behavior kept.
- Non-Chromium browser: feature-detect `showOpenFilePicker`; landing + board show a clear notice.
- Arbitrary markdown (not from template): renders fine — the format is plain markdown; agent
  lanes/rules line simply don't appear if markers/header are absent.
- Race between board 2s writes and AI writes: mitigated by line-anchored board writes +
  PROTOCOL's re-read-before-write rule for AIs (the known failure mode from CMF week is
  documented in agents.md).

## Verification

- `sample/` project: open in board → toggle a checkbox → inline-edit → simulate an AI append via
  terminal while the board is open → confirm no clobbering, lanes/markers render.
- Browser-test both pages (Amy's no-Playwright rule: Claude builds + typechecks; Amy verifies in
  browser — this project has no typecheck, so Claude smoke-tests locally by opening the pages
  once, and Amy does the real verification pass).
- Deploy to Vercel, re-run the smoke test against the hosted URL.

## Milestones

1. Repo scaffold + PROTOCOL.md + templates (the thinking work).
2. board.html evolution from cmf-todo.html + local smoke test.
3. index.html + protocol.html.
4. Skill + sample project.
5. Vercel deploy + README + Amy's browser pass.
