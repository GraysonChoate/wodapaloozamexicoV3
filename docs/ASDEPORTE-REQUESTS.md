# Asdeporte requests — full record

Everything José Orozco Rojano has asked for, in the order he asked, with what was done and what
is still open. Current as of **17 September 2026**, HEAD `74dd244`, live at
`wodapaloozamexico-v3.vercel.app`.

Client contact: **José Orozco Rojano**, Business Manager, Asdeporte — jorozcor@asdeporte.com
Also on the thread: Eduardo Elías Moreno Castañeda, Jaime Cadaval Baeza (asdeporte.com),
Sasha Preziosa (wzasports.com), Amsal Zulfiqar (mixed.fitness).

His source material is indexed in the session memory note `wza-asdeporte-assets`; the Drive and
Docs links live there rather than being duplicated here.

---

## Email 1 — 1 September. Six numbered items.

### 1. Mexico City summary and tips, Spanish and English
**Done** — `mexico-city.html`, 71 balanced EN/ES pairs. Where to Stay, What to See, Eat Like a
Local, Getting Around, seven tips.

His two languages are **not literal translations of each other** and are kept exactly as he
wrote them. The Spanish "Getting Around" carries a Metrobús paragraph the English does not; it
was folded into the matching Spanish paragraph rather than inventing English he never approved.
Do not "fix" this by back-translating.

### 2. Textures
**Done, then extended** — he supplied two cuts of the same watercolour, a 1920×240 band and an
800×320 block. Both are in use:

- the **block** fills the header and footer of every standalone page
- the **band** runs as the edge line where those dark blocks meet the page, which is the
  proportion it was cut at

Deliberately **not** on the sponsor strip, which stays white to match SoCal, and **not** on the
film. Event Info's header is a photograph and is left alone; watercolour over a crowd shot
muddies both.

The overlay sits at `.70`. That is not a taste call — at full strength the green kicker
(`#6CC180`) disappears into the green half of the watercolour. Swept `.90` → `.54` and measured
each step. `.62` is the last step where the kicker holds 4.5:1 contrast; `.54` fails. One notch
of headroom remains if he asks for brighter.

### 3. Partners
**Done** — eight marks, organiser last, on a continuous SoCal-matched marquee at 43 px/s.

Openbank · Powerade · MINI · Centrum · Sports World · Innova Sports · Reebok · Asdeporte

- **Innova** uses `Logo Innovasport.png`, **not** `LOGO-INNOVA-COLOR.png`. The latter pairs the
  chevron with a *white* wordmark, invisible on a white band. The one in use keeps the red and
  blue he asked for with black type.
- **"Same proportion" is measured, not eyeballed.** A box measures the bounding rectangle; the
  eye measures ink. Rendered ink area ranged 861–3806 px² across the eight, a 4.4× spread, with
  Sports World the smallest — exactly the mark he called unreadable. Each cap is now the mark's
  own size scaled by `(mean_ink / its_ink) ^ 0.325`, a damped correction. Full equalisation would
  have made the thinnest-inked mark the physically largest object in the band.
- **Sports World took three passes.** See the separate entry under Email 3 — the cap was never
  the real problem.

### 4. Spanish localisation
**Done, verbatim.**

- "Más que **una** competencia" — with the capital M from his follow-up. The heading is
  `text-transform:uppercase` so it renders identically either way, but the underlying string is
  what a screen reader announces and a search engine indexes, so it carries the capital.
- The standfirst replaced with his exact wording: *"El festival internacional de fitness llega
  con un nuevo capítulo a Ciudad de México…"*

### 5. Compete tab, from the existing site
**Done** — `compete.html`. Nine divisions × twelve movements, plus all five qualifier workouts,
taken from `mexico.wodapalooza.com` and his image folder. The table scrolls horizontally with a
sticky movement column, as the source site does, because nine divisions cannot fit a phone and
shrinking them would destroy the one thing the table exists to convey.

**This reverses the "No qualifier" line in `AGENTS.md` line 14.** He asked for the qualifier
directly. The doc has not been edited; treat his request as authoritative.

### 6. Get Tickets → Competition Corner
**Done** — `GET TICKETS` is a real anchor to
`https://competitioncorner.net/events/21707/details`. It was previously a button that toggled a
"link pending confirmation" notice; that handler and its status paragraph were removed rather
than left guarded, because the handler wrote to an element that no longer existed and would have
thrown on first click. He noted the destination may change and he will update us.

### 7. His stated next steps
- venue renders → **delivered**, see Email 2
- event logo updated with Reebok and Roster → **still waiting**, see Open below

---

## Email 2 — 2 September. Event info copy and venue renders.

**Done** — `event-info.html`, his document in both languages, 60 balanced EN/ES pairs: overview,
event information, the venue, six competition formats, the competition, more than a competition,
and Wodapalooza meets Mexico City.

**First record of the venue anywhere in the project:** Centro Ecuestre SEDENA,
Av. Constituyentes 851, Lomas Altas, Álvaro Obregón, 11950 CDMX. The address links to Maps.

Sixteen renders supplied, six used, chosen because each shows something the copy claims. 35 MB
of source became 1395 KB; the originals run to 8005×4503, which is print resolution.

---

## Email 3 — 3 September. Remove one render.

> "I would only remove this image, since the logo seems off because of the AI, so in order to
> keep consistency, I would ask to remove it, please"

**Done, and extended.** He flagged the expo/food-area render. On inspection **three of the six
shipped renders had the same defect** — visible only when the wordmark is zoomed, which is
exactly how a client looks at their own logo:

| render | what the floor art actually read |
|---|---|
| expo | `WODUAPALOO…` — **removed at his request** |
| covered outdoor floor | `WODAPALOOT` — **replaced** with Render 11 |
| main competition floor | `Mexicc City`, double C — **replaced** with Render 5 |
| flag / celebration | `D'ALLOZA` — **cropped** above the bad art |

The flag one was cropped rather than swapped because it is the only frame carrying the Mexican
flag, which is worth more on this page than any alternative. Render 8, 4 and 3 were rejected as
replacements for garbled perimeter banners, an occluded wordmark, and a `WODSAULT` banner
collision respectively.

The arena render's hero logo is correct; its small background banners read `#GOFAULT FITNESS`
and `TWG` for TYR, but at that size they are not legible either way. Left as-is.

He also copied the rest of the Asdeporte team and the Mexico team for their comments.
**More feedback is expected from them.**

---

## Email 4 — 4 September. Sports World logo options.

> "please find the whole options for Sports World"

**Done — and this is what actually fixed it.** His brand book contains six lockups: Isotipo
(bars only), Imagotipo (bars stacked over the wordmark, two versions), Horizontal (one line),
Horizontal Dos Líneas, and Concepto+Logotipo (with the "TU AQUÍ, TU AHORA" tagline).

**We had been using the Imagotipo** — a 1.6:1 stacked mark in a wide, short slot, so the slot's
176px width squeezed its wordmark to nothing. No cap value can fix a shape mismatch, which is
why the first two passes only half-worked.

Measured all three plausible variants at real slot size, wordmark cap height on screen:

| variant | renders | wordmark |
|---|---|---|
| Imagotipo (was) | 118×73 | 8.9px |
| Horizontal, one line | 176×23 | 9.2px |
| **Horizontal Dos Líneas** | **176×41** | **10.0px** |

The one-line version is the intuitive pick and is barely better than what we had. The two-line
lockup fills the full width *and* uses 41px of the 84px slot, which is where the gain comes
from. It also answers the half of his original note that had been missed — "all the partners
logo in the same proportion" — since 41px sits with Openbank at 44 and Centrum at 41 instead of
standing 18px above everything.

Extracted from the Illustrator source (the `.ai` files are PDF-1.6), rendered at 4000px, located
by scanning ink columns and rows, then un-composited from white back to real alpha. This also
restored the **official two-tone — WORLD in red** — where an all-black version had been in use.

---

## Email 5 — 16 September. Ruster, volunteering, prizes.

### Remove Reebok, add Ruster
**Done.** Eight marks still, organiser last. He attached the wordmark `.ai` and a 23-page brand
book.

The brand book's "versiones y usos" page approves three lockups and **all three are stacked**,
R-mark on top — the wrong shape for a wide, short slot, exactly the trap the Sports World pass
worked through. The attached `.ai` is the horizontal wordmark, and wordmark-only "RUSTER®" is
what the brand book itself uses on every one of its pages, so that is what ships.

The "PUSH YOUR LIMITS" tagline is dropped, measured not assumed: the band is width-bound at
176px, so RUSTER renders at **34.1px cap height either way**. The tagline would add 17px of
height and a line of type about 6px tall. Extracted from the Illustrator source at 4000px, ink
scan to locate, un-composited from white to real alpha. 880×174, 28 KB.

**This also resolves the "event logo with Reebok and Roster" item from his 1 September email.**
"Roster" there was almost certainly "Ruster" — same partner, and he has now reversed the Reebok
half of it.

### Volunteering tab
**Done** — `volunteering.html`, fifth in the nav alongside Event Information, Compete and Travel
as he asked. His overview copy verbatim in both languages, 29 balanced pairs.

The seven areas are **listed, not described**. He named them and gave no copy for any, so nothing
is invented; if per-area copy arrives they become `.div-card` articles like the divisions on
event-info. His Spanish leaves six of the seven role names in English and translates only
"Jueces" — his usage, preserved.

**THE FORM IS NOT LIVE.** He said it would follow "between today and tomorrow" (16 Sep). No URL
is invented and no button is shown that would 404; a status line states applications have not
opened, with a comment in the markup marking exactly what to replace.

### Prizes in the event overview
**Done** — his figures: Elite $250,000 / $125,000 / $50,000 MXN, awarded on both the men's and
women's side, plus more than $300,000 MXN combined across the remaining divisions. His paragraph
verbatim.

Set as display type on the watercolour rather than as table rows — the money is the news on that
page and it was reading as small print. The amounts carry no `data-lang` pair because the string
is identical in both languages; only the place labels switch.

This replaced a placeholder note written before the figures existed, which said only that the
Elite division "carries a significant cash prize purse".

---

## Open — waiting on Asdeporte

1. **Qualifier wording.** The 18–26 August 2026 window has closed. The page states that as fact
   rather than inviting registration, which would be wrong. He needs to confirm the final
   phrasing. *This is the one thing on the site currently stated without his sign-off.*
2. **Two additional partners** he said were coming.
3. ~~Event logo with Reebok and Roster~~ — **resolved 16 Sep**: Reebok out, Ruster in.
4. **Tickets destination**, if Competition Corner changes.
5. **Comments from the wider Asdeporte and Mexico teams**, which he has invited.
6. **The volunteer Google Form.** Promised 16 Sep "between today and tomorrow" and not yet
   received. The Volunteering page is built and live around its absence — swap the status line
   in `volunteering.html` for a Register anchor when it lands.
7. **The Travel tab name.** We renamed "Mexico City" → "Travel" on our own judgment, because the
   page is a travel guide and the old label read as "about this event" on a site already called
   Wodapalooza Mexico City. Flagged to him as easy to change. Not his request — ours.

---

## Not done, deliberately, with reasons

- **82.6 MB transfers before the visitor scrolls** (95.3 MB for the full film). Cause is
  `preload="auto"` on 11 videos plus early src assignment. Any fix changes how video loads,
  which is the category that caused the original freezing, and iOS Safari cannot be tested from
  the dev environment. Grayson knows and has not asked for it.
- **Scrub sources oversized.** `b06_walk.mp4` is 2066×1162 all-intra at 38 MB, never displayed
  above 1440px. All-intra is correct for scrubbing; the resolution is not.
- **Mobile is functional but not art-directed.** Verified no overflow at 390px; never designed.
- **Ten unused venue renders** remain in his folder, most with the same garbled wordmark.

---

## Two traps for whoever works on this next

**Five filenames are cache-poisoned.** `vercel.json` carried
`Cache-Control: max-age=31536000, immutable` on `/media/*` and `/assets/*` from 31 Aug to 3 Sep.
Files replaced at their existing paths in that window are cached for a year in any browser that
loaded them, and `immutable` means the browser never revalidates — the server cannot correct it.
**Never reuse these names:**

    media/venue/flag.jpg          media/venue/floor.jpg
    media/venue/outdoor.jpg       assets/sponsors/mx-sportsworld.png
    media/loop/s02-crowd-zocalo.mp4

All now ship as `-v2` / `-v3`. The policy is `max-age=3600, must-revalidate`, so ordinary
replacements are visible again — but **verify any asset swap in a real browser with cache
enabled**, loading the page twice. `curl` has no cache and will report success while the browser
shows the old file. That happened, twice, and was reported as fixed while it was not.

**The film is finished and approved.** Treat its video files, scroll engine and beat geometry as
off-limits unless asked. Anything that does touch it should be verified against a pristine copy
of the previous commit served from a **Range-capable** server — `python3 -m http.server` returns
`200` to a Range request instead of `206`, which makes every scrub video sit at `currentTime 0`
and the film look completely broken when it is fine.
