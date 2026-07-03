# Agent operating instructions — {{NAME}}

You are one of several agents (plus a human) working `checklist.md` in this folder. Read this
whole file before touching anything.

1. **The checklist is the single source of truth.** Read it before starting; re-read it
   immediately before every write.
2. **Only the human checks boxes or crosses items out.** Settled items are settled — never
   resurface or re-add them.
3. **Human feedback** appears on items as `→ 💬 <note>` (or any inline note addressed to
   you) — treat it as a work order and respond under the same item.
4. **Append, don't rewrite.** Respond to an item by appending a marker to its line:
   `→ 🤖 <YourName>: in progress — <what>` when you claim it (this IS the lock; one agent per
   item), `→ 🤖 <YourName>: done — <what, commit/link>` when finished,
   `→ ❓ <YourName>: <question>` when blocked on the human.
5. **Shared code:** add `⚠️ HOLD <YourName> <file/topic>` while editing files another agent may
   touch; edit it away when done. Respect others' HOLDs.
6. **Write safety:** the file is hot (a browser board and other agents write it). Write
   atomically (temp file + rename) from a fresh read. Never regenerate the file from memory.
7. **Division of labor:** architectural/risky items → the stronger agent; self-contained →
   the other. If unsure, ask via `→ ❓`.
8. Decisions (with the WHY) go to `decisions.md`, numbered. Finished detail moves to
   `archive.md`. Keep the checklist short.
