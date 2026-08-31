# S02/S03 — review checkpoint, 2026-08-30

> Historical approved checkpoint at def8661. S03 remains current; S02 media and the later
> sequence were subsequently revised with user authorization. See NEXT-SEQUENCE-BRIEF.md
> and MASTER-AUDIT.md for current details. Pending-work statements below apply to this old checkpoint.

## Scope and behavior

Latest direct approval covers these two sections only. S01 remains protected. Later fitness,
community and closing sections were not redesigned. The rejected index/footer is still deferred.

| Review tag | Behavior | What to check |
| --- | --- | --- |
| S02-CROWD | Eight-second silent crowd → aerial square → additional city loop. One viewport, no multi-scroll pin. | Let the loop play; check the extra city portion and loop seam. Headline and paragraph become fully opaque white after their reversible entrance. Sponsor band remains white. |
| S03-MOSAIC | Eight unique hoodie loops surround the sticker film. Natural entrance, then pin when the whole grid is visible. | All outer cells should move. Center waits for scroll; this is intentional, not failed autoplay. |
| S03-ZOOM | Center grows from its grid cell to full viewport while scroll advances the sticker montage. | Scroll slowly forward, pause, and reverse. Picture time and zoom should follow scroll; the center should hold when stationary. |
| S03-SPLIT | Exact gray-pole/MacStore endpoint separates into matching left/right halves. | Watch the halves uncover existing fitness footage; reverse should close the split and return through the sticker montage. |

S03 occupies four viewport heights: three viewport heights of pinned travel. The first 80% of
travel scrubs 8.133333 seconds of source footage; the last 20% opens the split. Full zoom is reached
at 55% of travel. These are scroll distances, not an enforced eight-second viewing delay.
The center is one video node. Outer loops pause when hidden or after full zoom. No click is needed
to continue. Center endpoint replacement waits for the seek to finish and the end images to load.

## Media map

- S02: `media/loop/s02-crowd-city-08s.mp4`, 1280×720, 30fps, 240 frames, silent H.264.
  Sources: WP Crowd.mov (1.9–4.0s); old mosaic-crowd-wza.mp4 aerial tail (2.17–2.936667s);
  Other B-Roll/Screen Recording 2026-08-25 at 12.33.43 AM.mov (5–10.533333s).
  Screen recording cropped to 3420×1568 at x0/y154 before resizing, removing recording bars/UI.
  Four-frame crossfades join sources and return to the crowd; final output is eight seconds.
- S03 center: `media/scrub/s03-stickers-08s.mp4`, first 245 frames of
  assets/video/guerrilla/STICKERS_03_V1.mov, scaled to 720×1280. All-intra H.264 for seeking.
  Encoded duration 8.166667s; last displayed frame 244 is source 00:08:04 / 8.133333s.
- Center poster: `media/poster/s03-stickers-start.jpg`.
  Split: `media/poster/s03-stickers-end.jpg`, extracted from encoded frame 244, not the old b07_end.jpg.
- Outer clips: `media/loop/b05_sud01.mp4`, 02, 03, 04, 05, 06, 08, 09 with their existing posters.
  Eight distinct supplied hoodie files; sticker occupies the ninth cell. All source MOVs are untouched.

## Implementation boundaries

- `index.html`: scoped S02 media reference, new S03 markup, controller/style includes, S02 visibility.
- `css/s02-s03-sequence.css`: S02 natural-flow geometry/white copy; S03 grid, zoom and split geometry.
- `js/s01-s02-presentation.js`: only S02 reveal progress changed to match natural entrance.
- `js/s03-mosaic.js`: one bounded S03 controller; no changes to legacy later-section controllers.
- `scripts/preview.py`: local-only range-capable preview server on 127.0.0.1:4176.
- Existing S01/S02 presentation stylesheet unchanged. S01 media hashes match the pre-edit backup.

## Desktop verification and known limits

Chrome at 1642×839: S02 headline/paragraph computed white with opacity 1; loop advanced with
readyState 4 and paused false. Full grid fit under navigation. All eight outer loops advanced.
Center seek samples progressed from 0 to 2.22156, 4.84704, 8.07638 and 8.133333s. Matching
split revealed a playing fitness video. Reverse returned through 7.533108s to the full grid/time 0.
Both new MP4s decoded completely without ffmpeg errors. Both edited JavaScript controllers passed
syntax checks. No application console errors observed during this desktop pass.

Seeking diagnosis: the old preview server returned 200/full-file to byte-range requests. Chrome
center seeks failed to advance. The replacement returns 206 with Content-Range; the same encoded
video then advanced correctly. Center also explicitly preloads near S03. Use the provided server,
and verify byte-range support on eventual hosting. Do not work around seeking failures by making
the center an independent autoplay loop; that breaks the endpoint choreography.

This is not full-site, mobile, reduced-motion or cross-browser sign-off. Reduced-motion fallback
exists but was not visually tested in this pass. Ticket destination, confirmed Mexico sponsors,
and final event information still need owner confirmation. Current sponsors are labeled illustrative.
Grayson subsequently visually approved S01–S03. This is the approved checkpoint being saved
to the separate V3 repository; use Git/remote state for commit and push confirmation.
No deployment requested. NEXT-SEQUENCE-BRIEF.md records the pending next changes, not implemented.
