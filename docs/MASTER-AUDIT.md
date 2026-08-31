# V3 Master Audit + Review Protocol

## Latest scoped checkpoint — 2026-08-30, S01/S02 presentation

See [S01-S02-PRESENTATION.md](S01-S02-PRESENTATION.md) for the latest implementation and measured checks.
Use `S01 — FLAG` and `S02 — CROWD` for this review. Earlier entries below are historical, not a new
full-site certification. This pass does not approve or repair the later index/footer or certify mobile.

Use the tags below when reporting a problem. A report should identify the tag, scroll direction,
the approximate point where it occurs, and what should replace the current result.

## Section map

| Tag | Section | Audit focus |
|---|---|---|
| `V3-OPEN` | Flag/title opening | Flag moves only inside the oversized title; logo and nav are visible; no Ángel, cockpit, qualifier, or click gate. Check load, reverse scroll, and first title frame. |
| `V3-NAV` | Adaptive navigation | Logo remains present; rail stays readable over dark, light, and footage surfaces; links do not cover important type; Menu opens and closes. |
| `V3-INTRO` | Event introduction | Copy is brief and event-led; no travel-site framing; scroll moves naturally into the film. |
| `V3-TICKER` | Event ticker | Continuous SoCal-style information rhythm; no clipping, jump, or invented claim. |
| `V3-MOSAIC` | Identity mosaic | Nine-panel composition stays alive while scrolling; center remains the visual anchor; no duplicate or empty tile. |
| `V3-CROWD` | Crowd tile / expansion | Crowd emerges from the center and expands without sliding upward; inspect the frame while stopped and in reverse. |
| `V3-APERTURE` | Aperture transfer | Current image carries the boundary into the next physical idea; no black flash, blank frame, or generic card. |
| `V3-STICKER` | Sticker placement | Real sticker footage owns the frame; watermark remains intact; placement and montage feel like one continuous action. |
| `V3-MONTAGE` | Sticker montage | Typography and sticker treatment support the footage; no synthetic sticker grid replacing the real source. |
| `V3-FITNESS` | Rope / fitness arrival | Fitness appears directly after the sticker transition; rope and competition footage are live; no box-step-up detour unless intentionally requested. |
| `V3-CROWD-FLOOR` | Lateral crowd / focused athlete | Camera movement, foreground people, and text remain legible; foreground occlusion should feel physical, not duplicated. |
| `V3-PROOF` | Rewards / celebration | Celebration arrives through an authored transition; no frozen hold, generic dissolve, or missing source. |
| `V3-EVENT` | Event / city information | Event date and city context are accurate; city supports the fitness event rather than replacing it. |
| `V3-CLOSE` | Closing monument | Closing image remains alive until the handoff; no dead black tail or accidental slide. |
| `V3-INDEX` | Final action index | Official links work; no qualifier language; actions are readable and visually related to the film. |
| `V3-FOOTER` | Footer / resource rail | SoCal-level structure and consistency; official resources only; no placeholder copy or broken links. |

## How to audit one section

1. Open the HTTP preview, not the HTML file directly: `http://127.0.0.1:4176/`.
2. Start at the section's first visible frame and scroll slowly forward.
3. Stop midway. Confirm the frame holds without turning black or duplicating.
4. Scroll slowly backward through the same point.
5. Scroll quickly across the handoff and repeat once.
6. Check the seam immediately before and after the section.

## How to report a problem

Use this format:

`[V3-FITNESS] desktop, scrolling forward, immediately after stickers: rope footage arrives late and box work appears first. Desired result: start on the rope-climb frame. Do not change V3-STICKER.`

For a footage replacement:

`[V3-CROWD] replace current source with <filename or screenshot reference>. Keep timing, typography, and the handoff unchanged until the replacement is reviewed.`

This keeps a requested asset change isolated from unrelated sections. Never describe a problem only
as “the page is broken”; name the tag and the exact seam.

## Master gate

The build is not final until every tag passes desktop forward/reverse/stopped-scroll review,
mobile layout review, link checks, console-error checks, media-load checks, and a final full-page
visual pass.

## Current V3 pass

The current live order is `V3-OPEN → V3-TICKER → V3-MOSAIC → V3-STICKER → V3-FITNESS →
V3-CROWD-FLOOR → V3-PROOF → V3-EVENT → V3-CLOSE → V3-INDEX → V3-FOOTER`.

The opening-to-film handoff, real logo, adaptive navigation, qualifier removal, official resource
links, and local media inventory have been checked in the local HTTP preview. The old city,
cockpit, ARE/YOU/READY, qualifier, and newspaper beats remain archived in source but are hidden from
the active V3 experience.

### Playback and correction findings

- The apparent frozen-video problem was a controller bug, not missing media. The previous loop
  paused each beat and only sought to a new frame from scroll position, so a stopped page naturally
  displayed a still frame and Chrome could remain on that frame between seeks.
- Active V3 film beats now use continuous muted playback while their visibility and handoffs remain
  scroll-controlled. A stopped-scroll check confirmed the rope clip advanced during a 0.9-second wait.
- The rope beat now reveals the Spanish headline first, clears it, and then reveals the English support
  line. This prevents the two copies from competing over the athlete and rope.
- The completed pre-registration row was removed from the final index; the remaining questions and
  rulebook links were renumbered 01 and 02. The paper was widened while retaining the textured field.

### Independent re-audit

- Creative: active footage follows the fitness-first brief; retired city/cockpit/qualifier material is
  not visible in the live sequence.
- Movement: active media was checked while stopped and advanced continuously; forward/reverse scroll
  control remains responsible for section visibility and handoffs.
- Visual: opening flag/title, adaptive nav, crowd entry, sticker treatment, rope footage with both copy
  phases, closing image, and action index were visually sampled across the page.
- Functional: JavaScript syntax passed, no broken visible image sources were reported, the preview had
  no console errors or warnings, active navigation targets resolved, and no visible qualifier or
  click-to-continue control remained.
