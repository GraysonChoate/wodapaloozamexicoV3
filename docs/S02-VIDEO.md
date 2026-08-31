# S02 — clean crowd / aerial loop

Approved scope, 2026-08-30: replace S02 footage only; discuss website typography separately. S01 is approved and unchanged.

## Media contract

- Output: `media/loop/s02-crowd-city-clean.mp4`, 2.600 seconds, 78 frames, 30 fps, 1280 × 720, silent H.264, fast-start; 2,793,504 bytes.
- Crowd source: `/Users/graysonchoate/Documents/Grounded Labs/wodapalooza-mexico/Other B-Roll/WP Crowd.mov`. Use 1.900–4.000 seconds, excluding sand-logo opening and subsequent tug-of-war scene. Scale to cover 1280 × 720, center-crop sides; preserve proportions and source color.
- Aerial source: `media/scrub/mosaic-crowd-wza.mp4`. Start at 2.170 seconds, after embedded sentence fully clears. Normalize to 30 fps and retain 23 frames. Earlier 2.002-second candidate was rejected because faint letters remained.
- Two four-frame (0.133333-second) dissolves are baked into the export: crowd to aerial, then aerial to crowd. The first four crowd frames are carried to the loop tail so the file boundary continues the crowd movement. No new browser playback logic or duplicate player.
- Original aerial brand watermark and real-world signage remain; the embedded promotional sentence is removed, not painted over.
- Loading image: `media/poster/s02-crowd-city-clean.jpg`, from the replacement clip's first frame.

## Isolation and verification

- Only two HTML references changed: S02 data-src and loading image. All scripts, CSS, section heights, website copy, fonts, S01, and later sections remain byte-identical to the pre-edit HTML.
- Previous footage and poster retained. Roll back those two references to `media/scrub/mosaic-crowd-wza.mp4` and `media/poster/mosaic-crowd-wza.jpg` if needed.
- Chrome desktop check at 1642 × 839: moving crowd and aerial reviewed; playback time advances and wraps across two cycles, remains unpaused, with no reported media error. Returning Home and then Mexico City resumes the correct player; S01 flag and background video both still play.
- S02 remains top 921 / height 4195; all visible downstream section positions and heights match the pre-edit measurement.
- Full-file decode succeeds; no black interval >= 0.03 seconds or frozen interval >= 0.15 seconds detected.
- Browser dropped-frame counters were not available through the inspection surface; no dropped-frame-rate claim is made.

## Next review

The subsequent approved presentation pass replaced the large headline and added a sponsor band;
see [S01-S02-PRESENTATION.md](S01-S02-PRESENTATION.md). The media contract and file are unchanged.
This is a short edited loop with brief blends, not an uninterrupted camera take.
