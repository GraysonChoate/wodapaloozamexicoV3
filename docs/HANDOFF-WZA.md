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

`.vercelignore` holds 69 explicit paths — source clips, superseded derivatives and docs that are
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
http.server` does not — see the traps below.

---

## Access

- **GitHub:** repo → Settings → Collaborators → Add people → **Write**. That is enough to deploy,
  because pushing to `main` publishes.
- **Vercel:** only needed to see build logs, roll back, or manage domains. Not needed to deploy.

**The repository should be made private before handover.** It is public at the time of writing:
Settings → General → Danger Zone → Change visibility. Vercel keeps deploying either way.

---

## Three traps that will cost you a day each

### 1. Five filenames are cache-poisoned — never reuse them

    media/venue/flag.jpg          media/venue/floor.jpg
    media/venue/outdoor.jpg       assets/sponsors/mx-sportsworld.png
    media/loop/s02-crowd-zocalo.mp4

Between 31 August and 3 September, `/media/*` and `/assets/*` were served with
`Cache-Control: max-age=31536000, immutable`. Files replaced at those paths in that window are
cached for a year in any browser that loaded them, and `immutable` means the browser never
re-checks. The server cannot correct it.

All five now ship as `-v2` / `-v3` names. The policy is now `max-age=3600, must-revalidate`, so
ordinary replacements are visible again — but **verify any asset swap in a real browser with the
cache enabled**, loading the page twice. `curl` has no cache and will report success while a
browser still shows the old file.

### 2. Testing the film needs a Range-capable server

`python3 -m http.server` answers Range requests with `200` instead of `206`. Video seeking then
fails and **the film looks completely broken when nothing is wrong**. Use `npx serve`, or any
static server that returns `206`. Verify with:

    curl -s -o /dev/null -w '%{http_code}' -r 0-99 http://localhost:PORT/media/scrub/s08-logo-close.mp4

`206` is correct. `200` means your test server is lying to you.

### 3. The film is finished and approved

`index.html` is a scroll performance: video `currentTime` is driven by scroll position, with
per-beat geometry. It took a long debugging cycle to stop it freezing. Treat its video files,
scroll engine and beat geometry as off-limits unless specifically asked.

Content pages, `css/pages.css` and metadata are ordinary work and safe to edit. `css/pages.css`
is **not** loaded by `index.html`, so it cannot reach the film.

If you do change the film, verify against a pristine copy of the previous commit served the same
way, and compare: `b13` should scrub to 23 distinct `currentTime` values from 0.181 to 1.003, 35
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
