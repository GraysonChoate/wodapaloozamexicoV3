/* Pre-flight check. Run before pushing:
 *
 *     node scripts/check.mjs
 *
 * Exits 0 if everything passes, 1 if anything fails, and says what to do about it.
 * No dependencies. Node 18+.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const rel = (p) => path.relative(ROOT, p);
let failures = 0;
const fail = (title, detail) => { failures++; console.log(`\n  FAIL  ${title}`); detail.forEach(d => console.log(`        ${d}`)); };
const pass = (title, note = '') => console.log(`  ok    ${title}${note ? '  — ' + note : ''}`);

const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const cssFiles = fs.existsSync(path.join(ROOT, 'css'))
  ? fs.readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css')).map(f => path.join('css', f)) : [];
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

console.log('\n  Wodapalooza Mexico City — pre-flight\n');

/* 1. RESERVED FILENAMES ─────────────────────────────────────────────────────────────────────
   Between 31 Aug and 3 Sep 2026, /media/* and /assets/* were served with
   "Cache-Control: max-age=31536000, immutable". Any browser that loaded the site in that window
   holds those exact paths for a year and will never re-check them. Serving a NEW file at one of
   these paths shows those visitors the OLD image, and no server header can correct it.
   The replacements ship as -v2 / -v3. These five names are retired permanently. */
const RESERVED = [
  'media/venue/flag.jpg', 'media/venue/floor.jpg', 'media/venue/outdoor.jpg',
  'assets/sponsors/mx-sportsworld.png', 'media/loop/s02-crowd-zocalo.mp4',
];
{
  const onDisk = RESERVED.filter(p => fs.existsSync(path.join(ROOT, p)));
  const referenced = [];
  for (const f of [...pages, ...cssFiles]) {
    const s = read(f);
    for (const r of RESERVED) if (s.includes(r)) referenced.push(`${r}  (referenced in ${f})`);
  }
  const hits = [...onDisk.map(p => `${p}  (exists on disk)`), ...referenced];
  if (hits.length) {
    fail('a retired filename is back in use', [
      ...hits, '',
      'These paths are cached for a year in browsers that loaded the site 31 Aug – 3 Sep 2026.',
      'Anyone affected will see the OLD file no matter what you put there.',
      'Give the new file a different name (-v2, -v3, …) and reference that instead.',
    ]);
  } else pass('no retired filenames in use', `${RESERVED.length} names held back`);
}

/* 2. EVERY LOCAL REFERENCE RESOLVES ─────────────────────────────────────────────────────────
   A missing file is a 404 in production, and for the film a 404 is a missing shot. */
{
  const missing = [];
  let n = 0;
  for (const f of pages) {
    const s = read(f);
    for (const m of s.matchAll(/(?:src|href|data-src|data-loop|poster)="([^"#:][^"]*)"/g)) {
      const u = m[1].split('?')[0];
      if (/^(https?:|mailto:|\/\/|#)/.test(u)) continue;
      n++;
      if (!fs.existsSync(path.join(ROOT, u))) missing.push(`${u}  (in ${f})`);
    }
  }
  for (const f of cssFiles) {
    const s = read(f);
    for (const m of s.matchAll(/url\(\s*['"]?([^)'"]+)/g)) {
      const u = m[1].trim().split('?')[0];
      if (/^(https?:|data:)/.test(u)) continue;
      n++;
      const p = path.normalize(path.join(ROOT, 'css', u));
      if (!fs.existsSync(p)) missing.push(`${u}  (in ${f})`);
    }
  }
  if (missing.length) fail('references that do not resolve', missing);
  else pass('every local reference resolves', `${n} checked`);
}

/* 3. BILINGUAL PAIRS BALANCE ────────────────────────────────────────────────────────────────
   Every translated string carries both attributes. An odd count means a string will not switch
   when a reader picks the other language. */
{
  const bad = [];
  for (const f of pages) {
    const s = read(f);
    const en = (s.match(/data-lang-en/g) || []).length;
    const es = (s.match(/data-lang-es/g) || []).length;
    if (en !== es) bad.push(`${f}  en=${en} es=${es}`);
  }
  if (bad.length) fail('bilingual pairs do not balance', [...bad, '', 'Every data-lang-en needs a matching data-lang-es on the same element.']);
  else pass('bilingual pairs balance', `${pages.length} pages`);
}

/* 4. NAV IS THE SAME EVERYWHERE ─────────────────────────────────────────────────────────────
   Each page carries its own copy of the nav, so adding a page means editing all of them. */
{
  const navs = {};
  for (const f of pages) {
    const block = read(f).match(/class="site-links"[\s\S]*?<\/div>/);
    navs[f] = block ? (block[0].match(/data-lang-en="([^"]*)"/g) || []).map(x => x.slice(14, -1)).join(' | ') : '(none)';
  }
  const distinct = [...new Set(Object.values(navs))];
  if (distinct.length > 1) fail('nav differs between pages', Object.entries(navs).map(([f, n]) => `${f.padEnd(20)} ${n}`));
  else pass('nav identical on every page', distinct[0]);
}

/* 5. NOTHING REFERENCED IS EXCLUDED FROM THE DEPLOY ─────────────────────────────────────────
   .vercelignore uses explicit paths. Excluding something the page asks for 404s it in
   production while it works perfectly on localhost. */
{
  const vi = path.join(ROOT, '.vercelignore');
  if (!fs.existsSync(vi)) pass('no .vercelignore', 'nothing excluded');
  else {
    const ignored = new Set(fs.readFileSync(vi, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')));
    const clash = [];
    for (const f of pages) {
      for (const m of read(f).matchAll(/(?:src|href|data-src|data-loop|poster)="([^"#:][^"]*)"/g)) {
        const u = m[1].split('?')[0];
        if (!/^(https?:|mailto:|\/\/|#)/.test(u) && ignored.has(u)) clash.push(`${u}  (used by ${f})`);
      }
    }
    if (clash.length) fail('a file the site needs is excluded from the deploy', [...clash, '', 'Remove it from .vercelignore or it will 404 in production.']);
    else pass('nothing referenced is excluded from the deploy', `${ignored.size} paths held back`);
  }
}

console.log(failures
  ? `\n  ${failures} problem${failures > 1 ? 's' : ''}. Fix before pushing — a push to main publishes.\n`
  : `\n  All clear.\n`);
process.exit(failures ? 1 : 0);
