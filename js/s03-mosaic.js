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
  let desired = 0, active = false, zoom = 0, raf = 0;
  const pending = new WeakSet();
  section.classList.add('s03-enabled');
  document.body.classList.add('s03-enabled');

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
    if (sticker.readyState < 2 || sticker.seeking || document.hidden) return;
    if (Math.abs(sticker.currentTime - desired) > 1 / 120) sticker.currentTime = desired;
  }
  function render() {
    raf = 0;
    const r = section.getBoundingClientRect();
    active = r.top < innerHeight && r.bottom > 0;
    if (r.top < innerHeight * 2 && r.bottom > -innerHeight && !reduced.matches && !sticker.src) {
      sticker.preload = 'auto';
      sticker.src = sticker.dataset.stickerSrc;
      sticker.load();
    }
    const p = reduced.matches ? 0 : clamp(-r.top / Math.max(1, r.height - innerHeight));
    zoom = ease(clamp(p / .55));
    desired = END * clamp(p / .8);
    section.style.setProperty('--s03-zoom', zoom);
    section.style.setProperty('--s03-grid-opacity', 1 - ease(clamp((p - .4) / .15)));
    // Do not swap to the endpoint until the decoder has actually reached it.
    const matched = !sticker.seeking && Math.abs(sticker.currentTime - END) < 1 / 60;
    const split = p >= .8 && matched && endImages.every(img => img.complete && img.naturalWidth) ? 1 : 0;
    section.style.setProperty('--s03-split', split);
    section.style.setProperty('--s03-part', split ? ease(clamp((p - .8) / .2)) : 0);
    section.dataset.phase = p >= .8 ? 'split' : p > 0 ? 'zoom-and-scrub' : 'mosaic';
    seek();
    loops();
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
  new IntersectionObserver(([entry]) => {
    schedule();
  }, { rootMargin: '100% 0px' }).observe(section);
  sticker.addEventListener('loadeddata', schedule);
  sticker.addEventListener('seeked', schedule);
  endImages.forEach(img => img.addEventListener('load', schedule));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  addEventListener('pagehide', () => tiles.forEach(v => v.pause()));
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  render();
})();
