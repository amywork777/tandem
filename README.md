# tandem

A shared checklist between a human and their AI agents. One markdown file on your machine is
the board: your agents work it under a simple protocol, leaving attributed markers; you verify
in the browser — checking boxes, crossing things out, typing feedback right on the items.
Local-first: no accounts, no server, no tracking.

## The workflow

1. **Start from notes** — a meeting transcript or brain-dump; your AI distills it into a
   checklist file (or the board's "New checklist" button writes a blank template set).
2. **The file is the board** — `checklist.md` (Verify / Discuss / Later) with `decisions.md`,
   `archive.md`, and `agents.md` beside it in a project folder.
3. **Agents work it under rules** — point any agent at `agents.md`; markers are the
   coordination language (see [PROTOCOL.md](PROTOCOL.md)).
4. **You verify in the browser** — the board re-reads the file every couple of seconds, so
   agent updates just appear.

## Using it

- **Board**: `/board` on the deployed site. Chromium browsers only (File System Access API).
- **Claude Code skill**: `cp -r skill ~/.claude/skills/tandem`, then `/tandem` — builds a new
  project from meeting notes (default home: `~/Checklists/<name>/`) or resumes a board.
- **Other agents** (Codex, etc.): tell them *"read `agents.md` in this folder first."*
- **Templates**: `templates/` — also inlined in the board's New-checklist button
  (`// sync: templates/` marker in board.html; regenerate rather than hand-edit).
- **Sample**: `sample/` is a filled-in example project — open `sample/checklist.md` in the
  board to try everything.

## Development

No build step; every page is self-contained.

```bash
python3 -m http.server -d public   # local dev at http://localhost:8000
```

Deploy: Vercel static (`vercel.json` sets `outputDirectory: public`, cleanUrls). Design docs in
`docs/specs/`, implementation plan in `docs/plans/`.
