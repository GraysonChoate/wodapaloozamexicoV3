# Wodapalooza Mexico City — technical handoff

For WZA Sports and Asdeporte. Written 18 September 2026, after Asdeporte signed off to go live.

**Point of contact for the handoff:** Amsal Zulfiqar, amsal@mixed.fitness
Built by Grayson Choate, grayson@mixed.fitness

---

## What it is

A five-page static site. No server, no database, no build step — HTML, CSS and a little
JavaScript, served as files.

| page | file | what it is |
|---|---|---|
| Home | `index.html` | the scroll-driven film |
| Compete | `compete.html` | division standards, qualifier workouts, rulebook |
| Travel | `mexico-city.html` | the Mexico City guide |
| Event Info | `event-info.html` | dates, venue, formats, prizes |
| Volunteering | `volunteering.html` | programme and application form |

Every page is bilingual. All copy lives in `data-lang-en` / `data-lang-es` attributes on the
element itself, swapped by `js/lang.js`. The choice persists across pages in `sessionStorage`.
There is no translation service and no build step — to change Spanish copy you edit the
attribute.

Currently **608 MB**, most of it video.

---

## Where it lives now

- **Repository:** `github.com/GraysonChoate/wodapaloozamexicoV3`, branch `main`
- **Hosting:** Vercel, currently under Grayson's account
- **URL:** `wodapaloozamexico-v3.vercel.app`

**Deploys are automatic.** Push to `main` and Vercel publishes in about 30–60 seconds. There is
no deploy command, no CI configuration and nothing to run locally first.

`.vercelignore` holds 73 explicit paths — source clips, superseded derivatives and docs that are
kept in git but never uploaded. It uses explicit paths rather than globs on purpose: a glob that
drifts silently 404s a shot in the film.

---

## Taking it over — three options

### 1. Point a domain at the existing project
Fastest. The site stays in Grayson's Vercel account; you control the address.

In Vercel: Project → Settings → Domains → add e.g. `mexico.wodapalooza.com`. Vercel shows the
exact record. It is normally:

    CNAME   mexico   cname.vercel-dns.com

For an apex domain (`wodapalooza.com` itself) it is an A record to `76.76.21.21`, but check what
Vercel displays rather than trusting this note — they do change it.

### 2. Transfer the Vercel project to a WZA Sports account
Clean ownership, deploys keep working, no downtime. Vercel → Project → Settings → General →
Transfer. Requires the receiving account to accept.

### 3. Host it yourselves
It is a static site. Point any host at the repo, or serve the files directly. **One requirement:
the host must support HTTP Range requests.** The film scrubs video by seeking, and a server that
answers a Range request with `200` instead of `206` makes every clip sit frozen on its first
frame. Vercel, Netlify, Cloudflare Pages and S3+CloudFront all handle this. `python3 -m
http.server` does not, which is why this repo ships its own dev server — see below.

---

## Access

- **GitHub:** repo → Settings → Collaborators → Add people → **Write**. That is enough to deploy,
  because pushing to `main` publishes.
- **Vercel:** only needed to see build logs, roll back, or manage domains. Not needed to deploy.

**The repository should be made private before handover.** It is public at the time of writing:
Settings → General → Danger Zone → Change visibility. Vercel keeps deploying either way.

---

## Two commands

Both live in the repo. No dependencies, Node 18+.

### Preview it locally

    node scripts/dev-server.mjs          → http://localhost:8080

**Use this rather than `python3 -m http.server`.** The film scrubs video by seeking, which needs
HTTP Range: the browser asks for a byte span and the server must answer `206`. Python's
`http.server` ignores Range and answers `200` with the whole file, so every clip freezes on its
first frame and the film looks completely broken when nothing is wrong with it. This server
answers `206`, and prints a one-line command you can run to confirm it.

### Check before you push

    node scripts/check.mjs

A push to `main` publishes, so this is the pre-flight. Exits non-zero and tells you what to do if
anything is wrong. It checks:

- **retired filenames** — five paths are permanently held back, see below
- **every local reference resolves** — a missing file is a 404, and for the film a 404 is a
  missing shot
- **bilingual pairs balance** — an odd count means a string will not switch language
- **the nav is identical on all five pages** — each page carries its own copy
- **nothing the site needs is excluded from the deploy** — `.vercelignore` uses explicit paths,
  and excluding something a page asks for 404s in production while working fine on localhost

#### The five retired filenames

    media/venue/flag.jpg          media/venue/floor.jpg
    media/venue/outdoor.jpg       assets/sponsors/mx-sportsworld.png
    media/loop/s02-crowd-zocalo.mp4

Between 31 August and 3 September 2026 these paths were served with `max-age=31536000,
immutable`. Browsers that loaded the site in that window hold them for a year and never re-check,
so putting a new file at one of those paths would show those visitors the old image, and no
server header can correct it. The replacements ship as `-v2` / `-v3`.

**This does not affect you.** Only browsers that loaded the site in that three-day window are
carrying those entries, and WZA Sports were not looking at it then. It is listed because the
check script enforces it, not because you need to remember it — if someone ever reuses one of
those names, `check.mjs` fails and says why.

---

## The film is finished and approved

`index.html` is a scroll performance: video `currentTime` is driven by scroll position, with
per-beat geometry. It took a long debugging cycle to stop it freezing. Treat its video files,
scroll engine and beat geometry as off-limits unless specifically asked.

Content pages, `css/pages.css` and metadata are ordinary work and safe to edit. `css/pages.css`
is **not** loaded by `index.html`, so it cannot reach the film.

If you do change the film, verify against a pristine copy of the previous commit served the same
way and compare: `b13` should scrub to 23 distinct `currentTime` values from 0.181 to 1.003, 35
videos with no errors, 32 partner logo slots, and no black frames across the ending.

---

## Source media is not in the repository

About 2 GB of raw footage — the guerrilla shoot, client b-roll, stills, the logo animation and
the textures — is deliberately excluded. GitHub will not take it. It lives in Asdeporte's Drive
under *Customer Engagement → Wodapalooza – Mexico*.

The repository is self-contained for the website: everything the site serves is committed. You
only need the Drive material to re-cut the film itself.

---

## Open with the client

1. **Ticket URL.** `GET TICKETS` on the film and `Entry and registration` on Compete both point
   at `mexico.wodapalooza.com` as an interim. They previously pointed at
   `competitioncorner.net/events/21707`, which now renders **EVENT ENDED** — the 18–26 August
   qualifier window is over. Swap in a real ticket URL when one exists.
2. **Two further partners** Asdeporte said were coming.
3. **Qualifier section** states the 18–26 August window as dates only. If a second window opens,
   the wording needs no edit; if the section should go, it is one block in `compete.html`.
4. José Orozco Rojano is **away until 3 October**; Mauricio Ibarra (mibarra@asdeporte.com) covers
   urgent marketing.

The full request history, with what was asked and what shipped, is in
`docs/ASDEPORTE-REQUESTS.md`.

---

## Housekeeping, optional

Six videos ship but nothing references them — `are-ready-left/center/right.mp4`,
`b10_floor.mp4`, `b11_face.mp4`, `confetti-transition.mp4`, about 6.7 MB. Leftovers from earlier
cuts. Harmless; add them to `.vercelignore` to trim the upload.
