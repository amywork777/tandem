# 🚲 tandem

**You steer. Your agents pedal.**

A shared checklist between a human and their AI agents. One markdown file on your machine is
the board: your agents work it under a simple protocol, leaving attributed markers; you review
in the browser — checking boxes, dropping 💬 feedback, crossing things out. Like a tandem
bike: they provide the power, you set the direction.

**Live: [tandem-rho-eight.vercel.app](https://tandem-rho-eight.vercel.app)** ·
[try the demo](https://tandem-rho-eight.vercel.app/board?demo) ·
[rules of the road](https://tandem-rho-eight.vercel.app/protocol)

Local-first: no accounts, no server, no tracking. The page is a viewer/editor over a file on
your own disk (File System Access API).

## How the ride works

1. **Dump your notes** — your AI turns a meeting transcript or brain-dump into a checklist file.
2. **Agents work the list** — every update lands on the item with a colored name badge
   (`→ 🤖 Name: done — …`), so you always see who did what.
3. **You review** — good? check it off (a checkmark with no comment = accepted). Not quite?
   hit 💬 and say what to fix; the agent replies on the same item.
4. **Repeat until done** — the whole history stays in one .md file you can read anywhere.

## Using it

- **Board**: [`/board`](https://tandem-rho-eight.vercel.app/board) — Chromium browsers
  (Chrome, Edge, Arc) for real files; the [demo](https://tandem-rho-eight.vercel.app/board?demo)
  works anywhere.
- **Claude Code skill**: `cp -r skill ~/.claude/skills/tandem`, then `/tandem` builds a new
  project from meeting notes (default home: `~/Checklists/<name>/`) or resumes a board.
- **Any other agent** (Codex, etc.): tell it *"read `agents.md` in this folder first"* — or
  paste the ready-made briefing from the [landing page](https://tandem-rho-eight.vercel.app/#paste).
- **Templates**: `templates/` — also inlined in the board's New-checklist button
  (`// sync: templates/` marker in board.html; regenerate rather than hand-edit).
- **Sample**: open `sample/checklist.md` in the board to try everything.
- **Travel light**: only `checklist.md` is required — the board opens any lone .md.
  `decisions.md` / `archive.md` / `agents.md` are conventions that pay off on longer projects.

## The protocol, in one breath

Only humans check boxes; checked = accepted, forever. Agents only append, using an exact
marker grammar (claim → done → ❓ blocked → ⚠️ HOLD). The file is hot, so agents re-read
before every write and write atomically. Full rules: [PROTOCOL.md](PROTOCOL.md).

## Development

No build step, no dependencies; every page is self-contained.

```bash
python3 -m http.server -d public   # local dev at http://localhost:8000
node tools/smoke.js                 # render smoke test — run before every deploy
```

Deploy: any static host (`public/` is the site; `vercel.json` included). Design docs live in
`docs/specs/`, the implementation plan in `docs/plans/`.

## License

[MIT](LICENSE)
