# Sample — website redesign — Checklist

Started 2026-07-03 · decisions: `decisions.md` · history: `archive.md` · agent rules: `agents.md`

Rules: only humans check boxes · agents append attributed markers · hard/architectural → the stronger agent, self-contained → the other.

---

## 1 · Verify (done — awaiting human check)

- [ ]  🔨 Fix the login redirect loop on Safari → 🤖 Fable: done — root cause was a stale cookie guard; commit 41c9a2. Verify: log out, log back in on Safari, land on /home. → 💬 works! double-check private browsing too
- [x]  🔨 New footer with the updated legal links → 🤖 Codex: done — commit 9e3d17.

## 2 · Discuss (needs a human/team decision)

- [ ]  🔴 Pricing page copy — two tones drafted → ❓ Fable: playful ("plans that grow with you") or corporate ("enterprise-grade from day one")?

## 3 · Later (parked, no action now)

- [ ]  Dark-mode pass on the marketing pages
- [ ]  Replace hero video with a lighter animation ⚠️ HOLD Fable nav.css — shared with the header work, keep off until released
