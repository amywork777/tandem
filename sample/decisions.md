# Sample — website redesign — Decisions

Numbered, append-only. Every entry: what was decided, WHY, and where it landed (commit/file).

1. Ship the redesign behind a `?preview=1` flag rather than a separate staging domain — because the team reviews on real content, and staging always drifted. Landed in commit 3b7f90.
2. Keep the existing font stack instead of licensing a new face — because the redesign deadline is copy-driven, and the font swap was pure scope creep. Decided in the 07-02 sync.
