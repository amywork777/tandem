# The tandem protocol

One markdown file is the board. Humans and AI agents all read and write it; these rules keep
that safe and legible.

## Ownership

- **Only humans check boxes or cross items out.** A checked or crossed item is settled: agents
  never resurface, re-open, or re-add it. **A checkmark with no comment = accepted as-is** —
  feedback (`→ 💬`) is only for when something needs changing.
- **Agents only append.** An agent responds to an item by appending an attributed marker to that
  item's line (or a new line directly under it) — never by rewriting the human's words.
- Humans may write feedback anywhere, in any form. The `→ 💬 <note>` marker is the standard
  way; any inline note addressed to an agent is a work order either way.
- The board sinks checked items to the bottom of their section — display only; the file keeps
  the human's order.

## Markers (exact grammar)

| Marker | Meaning |
|---|---|
| `→ 🤖 Name: in progress — <what>` | Claim + lock. One agent per item. |
| `→ 🤖 Name: done — <what, commit/link>` | Work finished, awaiting human verification. |
| `→ ❓ Name: <question>` | Blocked on the human. Rendered red; humans scan for these. |
| `⚠️ HOLD Name <file or topic>` | Editing shared code — other agents keep off until the marker is edited to done/removed. |
| `→ 💬 <note>` | Human feedback on an item — an instruction to the agents. The board adds one via the 💬 button. |

## The file set

Only `checklist.md` is required — the board opens any lone .md. The rest are conventions that
pay off as a project grows; agents work with whichever files actually exist.

| File | Holds |
|---|---|
| `checklist.md` | Live work only, three sections: **Verify** (done, awaiting human check) · **Discuss** (needs a human/team decision) · **Later** (parked). |
| `decisions.md` | Every decision, numbered, with the WHY. |
| `archive.md` | Append-only history. Move done detail here to keep the checklist short. |
| `agents.md` | Operating instructions for any agent joining the project. Point new agents here first. |

## Division of labor

**The `Rules:` line at the top of checklist.md assigns roles** — e.g.
`roles: Fable = planner (breaks down work, reviews) · Codex = coder (implements)` — and agents
follow it. The human can rewrite that line at any time, right on the board. When no roles are
named, the default applies: architectural or risky items go to the stronger agent;
self-contained items to the other. The in-progress marker IS the claim — no separate
assignment step. One agent per item.

Any number of agents can ride, but **names must be unique**: running two copies of the same
agent means numbered names (`Codex-1`, `Codex-2`) in their kickoff messages — otherwise their
claims collide and an agent may mistake a sibling's markers for its own.

## Write safety

The file is hot: the board and other agents write it while you work.

- Re-read the file immediately before every write.
- Write atomically (temp file + rename), replacing the whole file only with content derived
  from that fresh read.
- Never regenerate the file from your memory of it — human checkbox states are sacred.

## Sources in, status out

Meeting notes and transcripts flow IN to the checklist. Outward status (Linear, Notion, Slack)
is generated FROM the checklist when the human asks — never maintained in parallel.
