# V3 handoff — shortened ending implemented

2026-08-30. Latest user explicitly authorized this revision. Implemented and desktop-reviewed,
but not yet visually approved by the user. No deployment or mobile redesign.

## Current sequence

- S01 protected moving flag lettering, dark fitness loop, date and optional ticket control.
- S02 natural-flow looping clean crowd → WZA 39–46.129417s → crowd. Includes Zócalo,
  excludes street/skyscraper. Additional Bellas Artes B-roll removed from active playback.
  White MORE THAN THE COMPETITION copy/reveal and sponsor strip preserved.
- S03 protected eight hoodie loops around one scroll-scrubbed sticker center; zoom to frame 244,
  matching still split. Incoming S04 is now rolling barbell.
- S04 rolling barbell only.
- S05 original lateral crowd → focused athlete, original foreground-masked text.
- S06 one confetti shot.
- S07 street/skyscraper rise → civic-building orbit.
- S08 final monument/logo without recorded black tail.
- FOOTER simple black resource/contact/Instagram footer. Shaped index removed.

S04 onward uses scroll-controlled video in both directions. Stopped scroll MUST hold frames.
Never change these to loops to conceal a seeking/delivery problem.
S05 video, foreground matte and type use decoded source-frame time.

## Where to inspect

NEXT-SEQUENCE-BRIEF.md: exact cuts and implementation boundaries.
MASTER-AUDIT.md: actual checks and remaining limits.
css/short-ending.css: bounded ending geometry. index.html: later controller changes.
scripts/encode-short-ending.zsh: reproducible new media, never overwrites originals.
S01/S03 controllers, styles and source media unchanged.

Preview: http://127.0.0.1:4176/?review=short-ending#top
Start python3 scripts/preview.py here. Byte-range delivery was verified (206).
Separate Git destination: GraysonChoate/wodapaloozamexicoV3 main. Verify actual remote state.
Previous approved checkpoint: def8661 / checkpoint-s01-s03-approved-2026-08-30.

Next: owner reviews this revision before further footer styling/content changes.
Ticket destination, real sponsors, final event facts need confirmation.
No full-site/mobile/reduced-motion/cross-browser certification.
