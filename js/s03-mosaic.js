/* S03 alone: looping outer tiles, a single paused/scrubbed center, matched split. */
(() => {
  'use strict';
  const section = document.querySelector('#b7.s03-section');
  if (!section) return;
  const sticker = section.querySelector('.s03-sticker');
  const tiles = [...section.querySelectorAll('.s03-tile')];
  const endImages = [...section.querySelectorAll('.s03-half img')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => n * n * (3 - 2 * n);
  const END = 244 / 30; // Last encoded frame: exact source 00:08:04.
  let desired = 0, active = false, zoom = 0, raf = 0, lastSeekAt = 0, seekStarted = 0;
  const pending = new WeakSet();
  section.classList.add('s03-enabled');
  document.body.classList.add('s03-enabled');

  /* Open the center scrub source early. Waiting until the reader reaches the montage makes
     the first seek compete with the transition and presents as a frozen or missing clip. */
  sticker.preload = 'auto';
  sticker.src = sticker.dataset.stickerSrc;
  sticker.load();
  tiles.forEach(v => { v.preload = 'auto'; v.src = v.dataset.loopSrc; });

  function loops() {
    const play = active && !document.hidden && !reduced.matches && zoom < 1;
    tiles.forEach(v => {
      if (!play) { v.pause(); return; }
      if (!v.src) v.src = v.dataset.loopSrc;
      if (!v.paused || pending.has(v)) return;
      pending.add(v);
      v.play().catch(() => {}).finally(() => {
        pending.delete(v);
        if (!active || document.hidden || reduced.matches || zoom >= 1) v.pause();
      });
    });
  }
  function seek() {
    if (sticker.readyState < 2 || document.hidden) return;
    const now = performance.now();
    /* A seek can be superseded without a reliable completion event. Do not let that leave the
       sticker in a permanent seeking state, and do not cancel it again every paint. */
    if (sticker.seeking && now - seekStarted < 260) return;
    if (Math.abs(sticker.currentTime - desired) > 1 / 60 && now - lastSeekAt > 48) {
      seekStarted = lastSeekAt = now;
      sticker.currentTime = desired;
    }
  }
  function render() {
    raf = 0;
    const r = section.getBoundingClientRect();
    active = r.top < innerHeight && r.bottom > 0;
    const p = reduced.matches ? 0 : clamp(-r.top / Math.max(1, r.height - innerHeight));
    zoom = ease(clamp(p / .55));
    desired = END * clamp(p / .8);
    section.style.setProperty('--s03-zoom', zoom);
    section.style.setProperty('--s03-grid-opacity', 1 - ease(clamp((p - .4) / .15)));
    /* The endpoint still is the authored handoff frame. Waiting for an exact media timestamp
       here was a deadlock: if Chromium dropped the final seek, the live plate faded out but the
       split never appeared, exposing the black stage underneath. The split is scroll-owned and
       can safely reveal its already-loaded endpoint stills at the transition cue. */
    const split = p >= .8 && endImages.every(img => img.complete && img.naturalWidth) ? 1 : 0;
    section.style.setProperty('--s03-split', split);
    section.style.setProperty('--s03-part', split ? ease(clamp((p - .8) / .2)) : 0);
    section.dataset.phase = p >= .8 ? 'split' : p > 0 ? 'zoom-and-scrub' : 'mosaic';
    seek();
    loops();
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
  /* NO rAF GATE ON THE HANDOFF. --s03-split drives the opacity of the #080909 backdrop that
     covers this entire stage, and #b7 sits above Beat 9 in the stacking order. Beat 9's own
     stage opacity is computed DIRECTLY ON SCROLL by the film controller in index.html. Two
     different clocks for one seam: on any scroll where rAF is starved — which is exactly this
     handoff, with five ending clips preloaded and the scrub loop issuing seeks — Beat 9 turns
     on while --s03-split is still 0, so the backdrop is still fully opaque ON TOP of the
     barbell. Measured at p=0.80: b9 --sv was 1.0000 while --s03-split was still 0, and at
     p=0.50 this render had not run at all and was reporting the previous position's state.
     That race is the intermittent black flash before the clip appears. Scroll is already
     frame-aligned and render() is a handful of style writes, so compute it on the same clock
     as the beat it is handing off to and let rAF coalesce only the async media events. */
  const scrolled = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } render(); };
  new IntersectionObserver(([entry]) => {
    schedule();
  }, { rootMargin: '100% 0px' }).observe(section);
  sticker.addEventListener('loadeddata', schedule);
  sticker.addEventListener('seeked', schedule);
  endImages.forEach(img => img.addEventListener('load', schedule));
  addEventListener('scroll', scrolled, { passive: true });
  addEventListener('resize', scrolled);
  addEventListener('pageshow', schedule);
  addEventListener('pagehide', () => tiles.forEach(v => v.pause()));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  render();
})();
