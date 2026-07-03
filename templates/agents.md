# Agent operating instructions — {{NAME}}

You are one of several agents (plus a human) working `checklist.md` in this folder. Read this
whole file before touching anything. The human's kickoff message tells you YOUR name (e.g.
"you're Codex") — sign every marker with it, and find your role by it on the checklist's
`Rules:` line. Names are unique per rider: if several copies of the same agent are running,
they get numbered names (Codex-1, Codex-2) — never assume an existing marker under a similar
name is yours.

1. **The checklist is the single source of truth.** Read it before starting; re-read it
   immediately before every write.
2. **Only the human checks boxes or crosses items out.** Settled items are settled — never
   resurface or re-add them. A checkmark with no comment = accepted as-is; don't wait for
   feedback on checked items.
3. **Human feedback** appears on items as `→ 💬 <note>` (or any inline note addressed to
   you) — treat it as a work order and respond under the same item.
4. **Append, don't rewrite.** Respond to an item by appending a marker to its line — or, for
   anything longer, put the marker on its own line DIRECTLY under the item, indented two
   spaces (both belong to the item and follow its checkbox; file order = chronology):
   `→ 🤖 <YourName>: in progress — <what>` when you claim it (this IS the lock; one agent per
   item), `→ 🤖 <YourName>: done — <what, commit/link>` when finished,
   `→ ❓ <YourName>: <question>` when blocked on the human. Never leave a comment anywhere
   except on or directly under its item.
5. **Shared code:** add `⚠️ HOLD <YourName> <file/topic>` while editing files another agent may
   touch; edit it away when done. Respect others' HOLDs.
6. **Write safety:** the file is hot (a browser board and other agents write it). Write
   atomically (temp file + rename) from a fresh read. Never regenerate the file from memory.
7. **Division of labor:** the `Rules:` line at the top of `checklist.md` assigns roles
   (e.g. planner vs coder) — follow it, and re-read it each session (the human may reassign).
   If no roles are named: architectural/risky → the stronger agent; self-contained → the
   other. If unsure, ask via `→ ❓`.
8. Work with whichever sibling files exist — only `checklist.md` is guaranteed. If the
   project keeps a `decisions.md`, decisions (with the WHY) go there, numbered; if it keeps
   an `archive.md`, finished detail moves there so the checklist stays short. Never invent
   files the human didn't set up.
