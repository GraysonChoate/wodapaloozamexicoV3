# S01 / S02 — approved presentation checkpoint

2026-08-30. Local V3 only. No media edits, playback-controller changes, or section-height changes.

## S01 — FLAG

- Existing animated flag lettering and dark fitness loop preserved.
- Centered date above lettering: MEXICO CITY | DECEMBER 4–6, 2026. Date comes from project notes;
  organizer confirmation remains required before publication.
- Date underline and outlined GET TICKETS button use Mexico light green `#6CC180`.
- Ticket button is optional and toggles an accessible, honest pending-destination message.
  There is no invented ticket URL, qualifier language, pre-registration, or scroll gate.

## S02 — CROWD

Headline: **MORE THAN THE COMPETITION**

Supporting copy: An international fitness festival enters a new chapter in Mexico City. Athletes,
fans, and the fitness community come together to compete, connect, and celebrate the sport.

- Smaller, right-aligned headline and paragraph reveal upward with opacity as the section enters.
  Paragraph follows slightly later; both reverse when scrolling upward and remain readable afterward.
- Text progress is independent of the existing looping video. Reduced-motion preference exposes the
  copy without movement.
- White sponsor strip occupies the lower `clamp(160px, 22svh, 230px)` of the existing stage. Only the
  displayed video frame is clipped; file contents, duration, sources, brightness and playback are untouched.
- Gymreapers, Rogue, TYR, FLO, Reign and Yeti are illustrative logos sourced from SoCal's assets,
  **not confirmed Mexico sponsors**. The visible band explicitly labels this as an illustrative layout.
- Existing legacy full-screen shadows are clipped away from the white band only while S02 is pinned.
- An invisible later-stage layer intercepted S01's new button. Pointer interception is disabled only
  while S01 is visible; the later stage and its playback logic are unchanged.

## Typography and files

Live reference inspected: https://socal.wodapalooza.com/

SoCal uses Unbounded 500 for headlines, Unbounded 700 for buttons, and Inter for supporting text.
These are locally hosted in `assets/fonts/` and scoped to these additions. Existing flag lettering
and typography outside this pass remain unchanged.

Implementation: `index.html`, `css/s01-s02-presentation.css`, `js/s01-s02-presentation.js`.
Logos: `assets/sponsors/`. No changes to existing video controllers.

## Desktop verification

Chrome, 1642 × 839 viewport:

- Opening screenshot inspected at scroll 0; date and ticket sit clear of the approved title.
- Flag and fitness background both unpaused with advancing playback times.
- Ticket tested by click and keyboard; pending status opens and closes.
- Crowd loop unpaused with advancing and wrapping playback time.
- PageDown/PageUp confirmed reversible copy: at scroll 921 heading opacity 0.558 and paragraph 0.330;
  by scroll 1740 both are 1. Reverse scrolling reduces them again, reaching 0 before entry.
- White band, logo sizes, text placement, and outgoing sticker seam visually inspected.
- S02 remains top 921 / height 4195; next `b7` remains top 5116. All measured visible section tops
  and heights matched the pre-edit baseline.
- JavaScript syntax check passed. HTML comparison showed only the scoped additions/replacement.
- No full mobile, performance, or whole-site certification is claimed. Organizer facts, sponsors,
  ticket destination, and later sections remain separate review items.

Unchanged media SHA-256:

| File | SHA-256 |
|---|---|
| `media/loop/s01-wp-intro-02-26.mp4` | `981a6f57256372a2aa217c29967a6844efcbbeffcaefe1f5779cbed4623e23b6` |
| `media/loop/s02-crowd-city-clean.mp4` | `18cfd208a4c9e290261e57a8ee7b76a6879c58eb21b2fc0a00852e45970e7cd7` |
| `media/scrub/mexico-flag-clean.mp4` | `30d9869ed984cba7c22a53b255d6d658567617fbfe9a19175177e3b03494a535` |

## Review and safe follow-up

Open http://127.0.0.1:4176/?review=s01-s02-v3#top. Review S01, then scroll to S02 and back upward.
Report `[S01]` or `[S02]`, the element (date, ticket, headline, paragraph, sponsor strip), direction,
and desired change. Media requests must be authorized separately from typography changes.

Pre-edit HTML backup: `/tmp/wza-s01-s02-presentation.I5INF3/index.before.html` (temporary local file).
To undo this pass, reverse only its HTML additions and restore the previous S02 headline; remove
the presentation stylesheet/script references. Do not blindly replace HTML if later edits exist.
V3 is not a Git repository; this checkpoint is local and has not been pushed or deployed.
