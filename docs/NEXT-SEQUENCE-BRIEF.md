# Next sequence — requested, NOT implemented

2026-08-30. Grayson approved S01–S03 and requested a Git checkpoint and outline BEFORE any
further footage/layout changes. Wait for confirmation to implement. This brief overrides
conflicting older direction; it is not a claim about the current later-section playback.

## Proposed reader order

| Tag | Keep / destination | Remove / constraints |
| --- | --- | --- |
| S01–S03 | Approved flag, crowd/city, hoodie mosaic, sticker zoom and matched split. | No redesign or retiming. |
| S04 — BARBELL | S03 split reveals ONLY rolling barbell, then exits promptly. | Remove step-ups, rope-climbing woman (Nike mark), surplus fitness montage; retain original source files. |
| S05 — COMMUNITY | Lateral crowd movement with Claude's typography behind foreground people, then focused athlete. | Protect foreground/type/background layers; video, copy and matte share source time. |
| S06 — CELEBRATION | Compact celebration, preferably the single confetti-pop shot. | Avoid retaining a long rewards sequence. Exact cut needs visual identification. |
| S07/S08 — CLOSING | Upward camera move toward skyscraper → orbit around political/civic building → final watermarked frame. | Remove Zócalo gathering. Exact shots/timecodes/building identity not yet verified. |
| FOOTER | Simple SoCal-like footer, useful resources/contact/social links. Further styling later. | Remove shaped index card entirely. No qualifier/pre-registration. Retain useful link destinations. |

## Playback contract

From S04 onward ALL video is scroll-controlled forward/backward, never independently looping.
Stopped scroll holds its frame. Text/mattes follow the same source time. S01/S02 and S03 outer
loops retain approved behavior; S03 center stays scrubbed. Shorten the journey, not just the clips:
do not pad removed footage with long empty scroll holds.

## After confirmation

1. Visually identify the exact barbell, crowd, focused-athlete, confetti and closing source windows.
2. Preserve S03 endpoint split; connect its incoming image to the selected barbell window.
3. Cut/reconnect later sections locally; keep occlusion typography synchronized.
4. Replace index-card presentation with simple footer and retained useful destinations.
5. Audit each seam in normal forward/reverse, fast and stopped scrolling: no mismatched stills,
   black gaps, duplicate owners, stuck video or lingering copy. Recheck protected S01–S03.
6. Report mobile/accessibility/browser verification limits honestly.

## Lessons that must survive handoff

- Screenshots alone cannot verify movement. Observe presented frames and currentTime over time.
- The old preview server returned 200 to Range requests and Chrome seeks failed; the provided
  server returns 206. Fix delivery rather than converting a scrubbed sequence into a loop.
- Loops cannot guarantee an endpoint. S03 uses one scrubbed center, exact frame-244 end image,
  and split gated on completed seek/image readiness.
- One controller owns each section's media time/transforms. Avoid competing global effects.
- No added copy on top of burned-in copy; no duplicate title treatments.
- New SoCal-style elements use Unbounded/Inter; approved flag lettering stays unchanged.
- Keep source MOVs intact and changes local. Do not introduce unrelated contingency systems.
- Check the actual browser rather than trusting stale preview panes or old audit prose.
- A V3 repository is not the same as a V3 branch inside V1.
- Latest direct user decisions override old notes calling rejected scenes approved.

## Technical source reference for future occlusion work

Legacy root: /Users/graysonchoate/Documents/Grounded Labs/wodapalooza-mexico.
Read its SEQUENCE-INTEGRATION-REGISTER.md for b09/b10 source windows and matte pipeline, and
reference/skills/kinetic-type.md before changing foreground masks. Inspect the actual renderer.
These are historical technical evidence, not permission to revive obsolete creative directions.
