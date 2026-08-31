# MEDIA MAP — beat → source → derivative

**Originals are untouched.** Everything in `assets/` is the client's material as delivered.
Everything in `build/media/` is a derivative and can be regenerated from the commands below.

Silent throughout — audio is stripped from every derivative, per the decision.

---

## THE MAP

| beat | derivative | source | in–out | mode |
|---|---|---|---|---|
| 1 | `scrub/b01_cockpit.mp4` | WZA_MX_LOGO.mp4 | 3.80–5.52 | scrub |
| 2 | `scrub/b02_aerial.mp4` | WZA_MX_LOGO.mp4 | 11.58–12.48 | **scrub — critical** |
| 4 | `scrub/b04_car.mp4` | WZA_MX_LOGO.mp4 | 5.70–8.20 | scrub |
| 5 | `loop/b05_sud01…09.mp4` | SUD_01–09.mov | 0–12s (04 is 0–5.5s) | **loop ×8** |
| 5 | `still/b05_torre.jpg` | STF00176.jpg | — | still, 9th panel |
| 5 | `scrub/b05b_lift.mp4` | WZA_MX_LOGO.mp4 | 31.05–31.60 | **scrub — the match cut** |
| 6 | `scrub/b06_banner.mp4` | LONA_0198.mov | full (7.13s) | **scrub — critical** |
| 7 | `scrub/b07_stickers.mp4` | STICKERS_03_V1.mov | full (15.73s) | scrub, warped |
| 8 | `scrub/b08_newspaper.mp4` | QUALIFIER_v3_05.mov | 0.00–11.20 | **scrub, warped** |
| 9 | `scrub/b09_lockout.mp4` | WZA_MX_LOGO.mp4 | 49.26–50.05 | **scrub — the whole beat** |
| 9 | `still/b09_lockout_f0.jpg` | first frame of the above | — | the window's fill; must match the clip exactly |
| 10 | `scrub/b10_floor.mp4` | WZA_MX_LOGO.mp4 | 28.45–30.07 | scrub |
| 11 | `scrub/b11_face.mp4` | WZA_MX_LOGO.mp4 | 52.22–53.90 | scrub |
| 12 | `scrub/b12_zocalo_empty.mp4` | WZA_MX_LOGO.mp4 | 45.05–46.13 | scrub |
| 12b | `scrub/b12b_zocalo_full.mp4` | WZA_MX_LOGO.mp4 | 53.93–54.93 | **scrub — critical, same beat** |
| 13 | `scrub/b13_close.mp4` | WZA_MX_LOGO.mp4 | 54.97–57.80 | **scrub, warped** |

Poster frames: `poster/<name>.jpg`, one per derivative, 640px wide.

---

## ENCODING

**Scrub clips — every frame is a keyframe.**

    ffmpeg -ss IN -to OUT -i SRC -an -vf "scale=1280:-2" \
      -c:v libx264 -pix_fmt yuv420p \
      -g 1 -keyint_min 1 -sc_threshold 0 \
      -crf 26 -preset slow -movflags +faststart DEST

`-g 1` is the whole trick. A normal web encode places a keyframe every 2–4 seconds, so
seeking to an arbitrary time forces the decoder to walk forward from the last one — which is
what makes most scroll-video sites stutter. All-keyframe costs roughly 3× the bytes and buys
sub-frame seeking.

Vertical clips use `scale=720:-2` and `-crf 27`.

**Loop clips — normal encode**, since they play rather than seek:

    ffmpeg -ss IN -to OUT -i SRC -an -vf "scale=1280:-2" \
      -c:v libx264 -pix_fmt yuv420p -crf 24 -preset slow -movflags +faststart DEST

---

## MEASURED

Seek latency, Chromium, 24 random seeks per clip:

    b02_aerial  (1280 landscape)   median 2.6 ms   worst 6.9 ms
    b06_banner  (720 vertical)     median 2.6 ms   worst 4.4 ms

A 60 fps frame budget is 16.7 ms. **Seeks land inside a single frame**, so scrubbing is
smooth rather than stepped.

Weight:

    scrub    64 MB   16 files
    loop    5.1 MB    3 files
    poster  916 KB   19 files
    TOTAL    70 MB   from 1.2 GB of source

70 MB is above the 40 MB target and that is a deliberate trade. Visual stability and seek
performance matter more than the total, and **nothing loads the whole set** — beats load
their own media as they approach. Working set at any moment is roughly 5 MB.

If it needs to come down: drop scrub clips to 960px wide, or reduce the SUD panels from
eight to five. Do not raise `-g` on the critical three.

---

## A NOTE ON SOURCE INTEGRITY

`SUD_01.mov` first downloaded truncated at 94 MB and failed to decode — `Invalid NAL unit
size`. Re-downloaded at 112 MB and it decodes clean. **Every source was then verified with
`ffmpeg -v error -i FILE -f null -`; all twelve pass.** Worth repeating that check after any
future bulk download from Drive.

---

## NOT YET ENCODED

- The 18 guerrilla stills (4000×6000+) still need web derivatives — they are 181 MB raw.
  Beat 5 and Beat 9 both use them.
- `LONA00130412.mov` and `LONA00130598.mov` — not downloaded, per the operator: only the
  first lona clip is wanted.


---

## WHY THESE IN/OUT POINTS

The source film carries burned-in English titles and hard cuts that do not announce
themselves. Both opening beats were originally cut past them and had to be re-timed.

**Beat 1 — `3.80–5.52`.** `WELCOME TO MEXICO CITY` is burned into the frame until ~3.7s, so
anything earlier inherits their typography. At **5.6s the film cuts to a car interior** — the
first cut was 0:04–0:07 and spent its whole last third inside Beat 4's footage, so the
approach ended on a highway chase. Scene detection misses this cut at default sensitivity:
both shots are dark night interiors and score below threshold. Found at `scene>0.08`.

**Beat 2 — `11.58–12.48`** (was `11.60–13.20`). The Ángel de la Independencia, night into first light. The shot
runs 11.51–14.60 but **begins a cross-dissolve at ~13.7s** into a flat overhead street grid.
That grid is the worst possible fill for masked type: it is a uniform mid-grey, so the
letterforms lose all internal contrast exactly where the word is widest and most exposed.
The night portion carries lit windows and headlight trails, which is what makes the knockout
legible at all.

The client's Wodapalooza mark is burned into the bottom-right of this shot. It falls outside
the masked letterforms and is never visible — verified on screen, not assumed.

**Beat 4 — `5.70–8.20`.** Car interior, highway headlight streaks, out on the pink CDMX
taxi. The film burns in a `WODAPALOOZA / COMES TO MEXICO!` lockup that fades up between
**8.20 and 8.30** — measured by sampling the luminance of the band where the lockup sits,
not by eye. The original cut ran to 0:10 and carried the client titles through its last
third and a half.

**Beat 6 — the whole clip.** No trimming needed: it is a locked-off 7.1s take with no cuts
and no burned-in titles. Kept vertical at 720×1280 because the beat depends on that extra
height — the scroll travels the frame down the banner, and on a 1440×900 viewport a
1080×1920 source leaves 1,660 px below the fold to travel through. Cropping it to landscape
would have thrown away the beat.

**Beat 5 panels are LOOP encodes, not scrub.** They were originally cut all-keyframe at
720x406 — 36 MB for eight clips, and eight simultaneous seeks per frame. The figure is
motionless while the city streams past, so the panels play under their own playback at
uneven rates (0.78x to 1.18x) instead. Normal GOP, 540 wide: **4.3 MB**. The eight
all-keyframe versions were deleted; nothing referenced them.

`SUD_04` is 5.5s where the rest are 15s+, so that panel wraps far more often than the
others. That is fine on screen — the panels are deliberately out of sync — but it does break
naive playback checks, which read the wrap as a stall.

**Beat 5b — `31.05–31.60`, cropped right 15%.** The film burns its own WODAPALOOZA mark into
the bottom-right of this shot; cropping it keeps that mark from sitting opposite ours in the
same frame. There is no athlete at 0:29 as the storyboard claimed — that window is the Miami
beach and an aerial stadium under burned-in date titles.

**Beat 7 — the whole clip, and the intake encode held.** First beat where the original
derivative survived review: 720x1280, 472/472 keyframes, 15.73s, 12 MB, no burned-in titles
anywhere (checked at 1s intervals across the lower third). Nothing needed re-cutting.

It is scrubbed with a **time warp**, not a straight mapping. The placement is 0–3.30s, 21% of
the runtime, but it is the act the whole beat rests on, so `data-scrub-warp="0.34,0.21"` gives
it 34% of the scroll and lets the seventy-four-cut montage run faster over the rest.
Piecewise-linear, so it stays reversible.

**Beat 2 was re-cut twice.** The first cut ran into a dissolve toward a flat overhead grid.
The second looked right as stills but failed in motion: the band the letterforms sample goes
dead from 12.98–13.70s (motion ~1.5, median 41), and the old out-point at 13.20 put the widest,
most exposed letters right in it. The window now ends on 12.26–12.53, the richest stretch of
the shot. **Pick a scrub window by measuring the region the design samples, across time.**

**Beat 8 — `0.00–11.20`, and it moved from loop to SCRUB.** The intake encode had it as a
loop clip, which is wrong for it: this is a performance with a beginning, a message and an
end, not a texture. The film's own end card fades in at ~11.3s once the figure walks away, and
the shot cuts to black at 14.53s; ending on the held date keeps the performance and avoids
putting the client's mark against ours. The old loop encode was deleted.

**Beat 10 — `28.45–30.07`, moved from loop to scrub.** Two shots with the film's own cut
between them: the WZA letters, then the WHOOP wall. `30.07–31.03` carries a burned `WORTH THE`
title; `31.03–31.61` is Beat 5's match cut and is spent.

**The source watermark, measured:** `WZA_MX_LOGO.mp4` burns a `WODAPALOOZA MEXICO CITY` lockup
at bottom-right in **every frame**, at the same size throughout — verified by cropping the
corner at 28.75s, 29.50s, 32.10s and 32.50s and comparing. It is in Beats 1, 2 and 4 already
and is invisible only because those frames are dark. Do not treat it as a per-beat defect.

**Beat 11 — `52.22–53.90`, not `0:35–0:38`.** The whole of 35.8–38.6 carries a burned
`IN A CITY THAT HAS IT ALL.` title. The new window is the embrace into the confetti eruption,
with the film's own cut at 52.59 inside it.

**The general rule:** pick a scrub window for what happens *inside the letters*, not for what
the shot looks like whole, and confirm the window against the source frame by frame.
