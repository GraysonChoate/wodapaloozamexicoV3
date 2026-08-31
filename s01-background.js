/* Independent S01 decoration. Never writes to the title, beats, or scroll timeline. */
(() => {
  'use strict';
  const section = document.getElementById('b0');
  const video = section?.querySelector('.s01-background-video');
  if (!video) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let failed = false;
  let pending = false;
  const shouldPlay = () => visible && !document.hidden && !reducedMotion.matches && !failed;
  const sync = () => {
    if (!shouldPlay()) {
      video.pause();
      return;
    }
    if (pending || !video.paused) return;
    // Defer loading altogether for reduced motion or an offscreen opening.
    if (!video.getAttribute('src')) video.src = video.dataset.s01Src;
    pending = true;
    video.play().catch(() => {
      // A blocked or interrupted play leaves the original dark background intact.
    }).finally(() => {
      pending = false;
      if (!shouldPlay()) video.pause();
    });
  };
  video.muted = true;
  video.addEventListener('error', () => { failed = true; video.pause(); });
  video.addEventListener('playing', () => { if (!shouldPlay()) video.pause(); });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio > 0;
    sync();
  }, { threshold: 0 }).observe(section);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', () => video.pause());
  window.addEventListener('pageshow', sync);
})();
