# V3 handoff — S02/S03 sequence

2026-08-30. Work only in this local V3 folder, not the archived V1/V2 production sources.
Read [S02-S03-SEQUENCE.md](S02-S03-SEQUENCE.md) for the current scoped checkpoint.

Implemented and desktop-reviewed: eight-second S02 crowd/city loop, solid-white revealed copy,
natural S02 scrolling, and S03 nine-cell mosaic with eight looping hoodie clips around one
scroll-scrubbed sticker film. Center zooms to full frame and ends at 00:08:04, then matched
still halves split into the existing fitness scene. Reverse scroll tested back to the mosaic.
S01 footage, title and controls are protected and unchanged. S04+ contents/controllers are unchanged;
the incoming fitness section is positioned beneath the S03 split.

Ticket destination and actual Mexico partners need confirmation; date is sourced from project notes.
No full-site or mobile sign-off. The rejected index/footer is not part of this completed pass.
Grayson has now visually approved S01–S03. NEXT-SEQUENCE-BRIEF.md records the requested next
sequence. This checkpoint turn authorizes docs/Git backup only. Wait for confirmation before
implementing later footage/footer changes.

Preview: http://127.0.0.1:4176/?review=s02-s03#top
Start from this V3 directory with `python3 scripts/preview.py`. This local-only server supports
HTTP byte ranges needed for reliable video seeking. Do not replace it with the old plain Python
SimpleHTTP server: it ignored Range requests and the center video failed to advance in Chrome.
Checkpoint destination: separate GraysonChoate/wodapaloozamexicoV3 repository, branch main.
This folder previously had no Git metadata; remote was reachable with no refs. Initial checkpoint
includes runtime assets and handoff notes. Confirm commit/push status with Git and the remote,
not prose. No public deployment is included.
