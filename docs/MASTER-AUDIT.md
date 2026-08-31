# Current desktop review — shortened sequence

2026-08-30. Replaces stale reports about continuously playing rope footage and the shaped index.
Owner visual approval pending; not full production certification.

## Review map

| Tag | Recognize it by | Expected check |
| --- | --- | --- |
| S01-FLAG | Flag in Wodapalooza / Mexico City | Flag and dark fitness loops move; date/tickets preserved |
| S02-CROWD | MORE THAN THE COMPETITION / sponsor strip | Crowd → plaza/activity/drone sequence → Zócalo → crowd; white revealed copy; natural flow |
| S03-MOSAIC | Hoodie grid / sticker center | Outer loops move; center zoom/time follows scroll; exact pole frame splits |
| S04-BARBELL | Rolling blue barbell | Only barbell; scrub forward/back; no rope/step-ups |
| S05-COMMUNITY | Lateral crowd / Celebrate fitness… | Text behind people, then focused athlete; synchronized layers |
| S06-CONFETTI | Confetti celebration | One short shot; no hug/counter |
| S07-CITY | Skyscraper rise → building orbit | Scrubbed; no repeated Zócalo |
| S08-CLOSE | Monument / Wodapalooza logo | Holds logo before footer; no black tail |
| FOOTER | Black link area | Resources/contact/Instagram/back to top; no index card |

## Checks performed

- Desktop Chrome at 1642×895 using HTTP preview.
- S02 headline/paragraph computed white, opacity1 when revealed; loaded loop advances.
- Forward visual samples: sticker split/barbell, foreground-masked crowd type, focused athlete,
  confetti, skyscraper, logo and footer.
- Reverse samples: logo → city → confetti → masked crowd → sticker/barbell seam.
- S05 paused at source2.990464s, readyState4, matching foreground mask; checked after final reload.
- S08 black tail identified and excluded. Final black footer visually checked.
- Five new MP4s fully decoded without errors; H.264 video only, no audio.
- Inline JavaScript syntax/local asset references checked; no missing references.
- Preview media Range request returned206 with correct Content-Range.
- Collected browser log: extension reconnect warnings; no application errors observed.

## How to review

Open http://127.0.0.1:4176/?review=short-ending#top, not the local HTML file.

1. Scroll normally into each section.
2. Stop: S01/S02 loops keep moving; S03 center and S04–S08 hold intentionally.
3. Move forward/backward: scrubbed footage should retrace rather than restart.
4. Check each seam for black flashes, mismatched halves or lingering copy.
5. Let S02 complete a loop and judge the return to crowd.
6. Check footer spacing and resource links.

Example: “[S05-COMMUNITY] scrolling backward before the focused athlete: type appears too early.
Keep footage and other sections unchanged.”
For replacements give tag, filename, desired start/end frame or time.
Screenshots identify locations; no large screen recording required.

## Limits / pending

No full mobile, reduced-motion, Safari/cross-browser audit. Reduced-motion fallback exists but
is not visually certified. External URLs retain project destinations; final access/content needs
owner review. Real ticket URL, sponsors and final event facts remain pending. Footer texture and
further styling deferred. Original source softness/cropping not remastered. No deployment.
