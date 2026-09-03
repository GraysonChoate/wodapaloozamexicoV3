/* Presentation only. No video access, playback calls, or section-height changes. */
(() => {
  /* The GET TICKETS disclosure handler is gone. It existed only to reveal a "link pending
     confirmation" notice while there was no destination; Asdeporte supplied Competition Corner,
     so the control is now a plain anchor and needs no script. Removed rather than left in
     place: the status paragraph it wrote to no longer exists, so the handler would have thrown
     on the first click. */
  const section = document.querySelector('#v3-mosaic');
  if (!section) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.min(1, Math.max(0, value));
  const ease = value => value * value * (3 - 2 * value);
  let frame = 0;
  const render = () => {
    frame = 0;
    // Natural entrance only: fully white before this section reaches the top.
    // Scrolling upward follows the same calculation in reverse, independently of the loop.
    const bounds = section.getBoundingClientRect();
    const band = section.querySelector('.s02-sponsors').getBoundingClientRect();
    const bandVisible = bounds.top < innerHeight && bounds.bottom > 0;
    document.body.classList.toggle('s02-band-visible', bandVisible);
    document.body.classList.toggle('s01-controls-visible', document.querySelector('#b0').getBoundingClientRect().bottom > 0);
    document.body.style.setProperty('--s02-hud-crop', `${band.height}px`);
    const travel = innerHeight * .85 - bounds.top;
    const heading = reducedMotion.matches ? 1 : ease(clamp(travel / (innerHeight * .55)));
    const body = reducedMotion.matches ? 1 : ease(clamp((travel - innerHeight * .08) / (innerHeight * .57)));
    section.style.setProperty('--s02-heading-opacity', heading);
    section.style.setProperty('--s02-heading-y', `${(1 - heading) * 28}px`);
    section.style.setProperty('--s02-body-opacity', body);
    section.style.setProperty('--s02-body-y', `${(1 - body) * 20}px`);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  reducedMotion.addEventListener('change', schedule);
  render();
})();
