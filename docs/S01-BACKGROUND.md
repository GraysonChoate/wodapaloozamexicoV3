# S01 — approved background addition · 2026-08-30

Scope: S01 only. User approved a dark fitness loop in the space around the existing
flag-filled title. No title replacement, new copy, scroll retiming, or S02+ changes.
This scoped approval supersedes older notes describing the opening as flag-only.

## Asset and controls

- Original: `/Users/graysonchoate/Documents/Grounded Labs/wodapalooza-mexico/Other B-Roll/WP Intro.mov` (unchanged).
- Source in/out: 00:02.000–00:26.000, ending on the yellow-top athlete's dumbbell lift.
- Derivative: `media/loop/s01-wp-intro-02-26.mp4`, 24 seconds, H.264, 1920×994,
  30 fps, fast-start, 9,387,217 bytes, no audio stream.
- `.s01-background-video`: absolute-positioned within S01; cover crop, centered,
  18% opacity over the existing dark ground; behind the unchanged SVG title mask.
- `s01-background.js`: independent visibility-controlled playback. Does not write
  to section geometry, title playback, or the existing cinematic timeline.
- Reduced motion: background hidden, media not loaded on initial reduced-motion visit.
- Offscreen/hidden-document pause; return resumes. Failed load cannot stop other scripts.

## Verification

- Chrome desktop, 1411×895: both flag and background visibly change between captures.
- Natural background loop observed advancing through 23.08 seconds to 0.09 seconds.
- Every section/ticker top and height exactly matched the pre-change DOM measurement.
- Existing rendered title SVG exactly matched the baseline; original inline script untouched.
- Forward scroll to S02 pauses the new video; reverse to S01 resumes it.
- Menu opens and closes; reload starts both S01 videos.
- Isolated controller tests passed: reduced-motion no-load, motion preference resume,
  hidden-document pause/resume, offscreen pause. OS reduced-motion and actual background-tab
  transitions were not independently reproduced in Chrome; those are simulated tests.
- No page-script errors observed; browser-extension disconnect warnings were present.
- Known S02 copy overlap remains intentionally unchanged for its separate approved pass.

## Recovery and review

Pre-change HTML backup: `/tmp/wza-s01-background.0xMK0n/index.before.html`.
Temporary backups are not permanent version control. To revert later, remove only the
S01 background video, its scoped CSS, and its script include (avoid restoring an old
whole-page backup over subsequent edits). The new standalone asset/controller may then
be archived. Do not alter the flag SVG or original inline script.

Review at `http://127.0.0.1:4176/#top` in Chrome. Feedback tag: `[S01-BACKGROUND]`.
Brightness can be adjusted through this video's opacity alone, without changing the title.
