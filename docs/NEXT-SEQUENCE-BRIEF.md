# Shortened sequence — implemented cut map

2026-08-30. Supersedes pending brief. User authorized implementation, including the final S02
correction retaining Zócalo before restarting on crowd. Owner visual review pending.

## Sources and cuts

Times are source seconds, not enforced viewing duration. Originals untouched.
scripts/encode-short-ending.zsh records exact commands.

| Tag | Runtime / source | Current behavior |
| --- | --- | --- |
| S01 | Approved flag/title and fitness assets unchanged | Independent muted loops |
| S02 | media/loop/s02-crowd-zocalo.mp4, 9.233333s | WP Crowd.mov 1.9–4.0s → assets/video/WZA_MX_LOGO.mp4 39–46.129417s → crowd |
| S03 | media/scrub/s03-stickers-08s.mp4 unchanged | First 245 source frames; displayed endpoint frame 244 / 8.133333s and matching split |
| S04 | media/scrub/s04-barbell.mp4, 2.516667s | b09_floorwork.mp4 frames 241–391 inclusive; rolling barbell only |
| S05 | Existing media/scrub/b10_crowd_focus.mp4 | Start 2.283333s (frame 137), lateral crowd through focused athlete; source duration 4.983333s |
| S06 | media/scrub/s06-confetti.mp4, 1.334667s | b11_face.mp4 frames 8–39 inclusive; confetti only |
| S07 | media/scrub/s07-city-close.mp4, 1.710042s | b12_city_landmarks.mp4 from 0.625625s; skyscraper rise and building orbit |
| S08 | media/scrub/s08-logo-close.mp4, 1.501500s | First approximately 1.5s of b13_close.mp4; ends on logo, not black |
| FOOTER | #action.event-footer | Logo, Instagram, questions/contact, rulebook, back to top |

S02 uses straight edited cuts/native looping. Clean crowd screen recording first; original WZA
section includes Zócalo and stops at the exact street/skyscraper boundary. Former additional-city
B-roll derivative remains archived but inactive.

## Playback and geometry

S02 remains natural-flow. S03 unchanged: four viewport heights, three heights of pinned travel;
first 80% scrubs, final 20% splits. S04–S08 videos pause and seek with scroll; reverse retraces.
New scrub derivatives are all-intra H.264 with no audio. Existing S05 all-intra source retained.

Heights: S04 120svh, S05 170svh, S06 90svh, S07 140svh, S08 170svh.
S04 retains S03's -160svh overlap; later margins zero. Ending beats have exclusive visible
intervals. Final beat allows footer entrance over a held logo frame, not a padded black tail.

S05 canvas/matte/type share requestVideoFrameCallback mediaTime. Matte starts at source frame137.
Do not trim that source without adjusting its matte offset. Repaint supports paused resize/late
matte load. Seeks are serialized; don't continually overwrite an active seek.

## Recovery / boundaries

Previous approved checkpoint: def8661, tag checkpoint-s01-s03-approved-2026-08-30.
S01/S03 files and raw MOVs unchanged. Removed footage remains in archived originals.
Changed index.html, added css/short-ending.css, new media and encoder, updated context.
Use Git/remote state to verify backup, not an old chat claim.

## Lessons

- Observe movement/time, not only screenshots.
- Scrub holding when stopped is correct. Failure to advance while scrolling is not.
- HTTP Range must work. Never change playback contract to hide a delivery failure.
- Looping cannot guarantee an endpoint. Keep S03 exact-frame split handling.
- One media-time owner; no duplicate copy/title or competing global effects.
- Latest direct decisions override legacy source comments.
- Footer polish, mobile/reduced-motion/cross-browser validation remain separate.
