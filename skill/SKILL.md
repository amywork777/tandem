---
name: tandem
description: Run the tandem human+AI-pair checklist workflow — start a new project board from meeting notes, or resume an existing one. Use when the user says "tandem", "new checklist project", or wants a shared AI-pair checklist.
---

# tandem

tandem is a shared checklist between a human and their AI agents: one markdown file on the
human's machine, worked by everyone under a protocol, verified by the human in a browser board
(hosted board URL: see the project README, or https://github.com/ — the user knows their deploy URL).

Two flows. Pick by what the user asked for.

## Flow 1: `new` — start a project from notes

1. **Gather source material.** If the user named a Granola meeting, pull it with the Granola
   tools. If they pasted notes or named a file, use that. If nothing given, ask what the
   project is about (one question).
2. **Create the project folder.** Default `~/Checklists/<kebab-name>/` (create it). Let the
   user override.
3. **Instantiate the four templates** from the repo's `templates/` directory (or reconstruct
   from the shapes below), substituting `{{NAME}}` with the project name and `{{DATE}}` with
   today. Files: `checklist.md`, `decisions.md`, `archive.md`, `agents.md`.
4. **Distill the notes into real items**, replacing the template examples:
   - **Verify** — empty at the start (it fills as agents finish work).
   - **Discuss** — open questions/decisions from the notes, one item each, `🔴` prefix.
   - **Later** — parked/deferred things from the notes.
   Every action item gets a checkbox line. Keep items one line; detail goes in `archive.md`.
5. **Tell the user**: the folder path, "open the board and pick `checklist.md`" (their hosted
   tandem URL, `/board`), and that other agents should be pointed at `agents.md`.

## Flow 2: `resume` — pick up an existing board

1. Read `checklist.md` in the project folder (ask which folder if unknown; check
   `~/Checklists/` first).
2. Report the board state in three lines: unchecked **Verify** items (the human's review
   queue), any `→ ❓` markers (questions waiting on the human), unclaimed work.
3. Claim per division of labor (below) by appending an in-progress marker, then work the item.

## The rules (from PROTOCOL.md — follow exactly)

**Ownership**: only the human checks boxes or crosses items out. A checked/crossed item is
settled — never resurface, re-open, or re-add it. You only append; never rewrite the human's
words. Inline notes addressed to you (e.g. "AMY: fix the wording") are work orders.

**Markers (exact grammar)**:

| Marker | Meaning |
|---|---|
| `→ 🤖 Name: in progress — <what>` | Claim + lock. One agent per item. |
| `→ 🤖 Name: done — <what, commit/link>` | Work finished, awaiting human verification. |
| `→ ❓ Name: <question>` | Blocked on the human. |
| `⚠️ HOLD Name <file or topic>` | Editing shared code — others keep off until edited away. |

**Division of labor**: architectural/risky items → the stronger agent; self-contained → the
other. The in-progress marker IS the claim.

**Write safety — this is the one that bites**: the checklist file is HOT. The browser board
writes it when the human edits, and other agents append to it. Therefore:

- Re-read the file immediately before every write.
- Write via atomic replace — build the new content from the fresh read, write to a temp file,
  rename over the original. In practice use a `python3` one-liner
  (`tmp = path + '.tmp'; open(tmp,'w').write(s); os.replace(tmp, path)`), NOT an
  Edit/Write tool whose read snapshot may be seconds stale.
- Never regenerate the file from memory — the human's checkbox states are sacred.

**Housekeeping**: decisions (with the WHY) go to `decisions.md`, numbered, append-only.
When the human checks a Verify item, its full detail can move to `archive.md` to keep the
checklist short. Outward status (Linear/Notion/Slack) is generated FROM the checklist when
asked — never maintained in parallel.

## Template shapes (fallback if the repo isn't on this machine)

`checklist.md`: H1 `# <name> — Checklist`; a reference line linking the sibling files; a line
starting with `Rules:` (the board renders it in the agents strip); then three H2 sections:
`## 1 · Verify (done — awaiting human check)` · `## 2 · Discuss (needs a human/team decision)`
· `## 3 · Later (parked, no action now)`, each holding `- [ ]` items.

`decisions.md`: H1 + "numbered, append-only, every entry has the WHY" + a numbered list.

`archive.md`: H1 + append-only history prose.

`agents.md`: the operating instructions above, phrased for any agent, numbered 1–7
(SSOT/re-read → human-only checkboxes → append markers → HOLD → atomic writes → division of
labor → decisions/archive housekeeping).
