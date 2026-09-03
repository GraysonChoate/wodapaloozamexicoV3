/* BILINGUAL TOGGLE, SHARED ACROSS PAGES.
   The film carries its own copy of this inside index.html and is deliberately left alone. This
   is the same mechanism for the standalone pages, with one thing the single-page version never
   needed: PERSISTENCE. With one page, switching to Spanish and staying there was the whole
   interaction. With several, a reader who picks Español and then opens Mexico City would have
   been thrown back to English on arrival — so the choice is written to sessionStorage and
   re-applied on load. sessionStorage rather than localStorage: it lasts the visit, which is
   what a language pick is, without persisting a decision made months ago on a shared machine.

   Every string lives in data-lang-en / data-lang-es on the element itself, so translation is
   markup rather than a lookup table, and innerHTML is used rather than textContent because
   several strings carry a <br> that is part of how the line is set. */
(() => {
  'use strict';
  const KEY = 'wza-lang';
  const nodes = [...document.querySelectorAll('[data-lang-en][data-lang-es]')];
  const toggle = document.querySelector('[data-lang-toggle]');

  const apply = (lang) => {
    const es = lang === 'es';
    document.documentElement.lang = es ? 'es' : 'en';
    nodes.forEach(n => { n.innerHTML = es ? n.dataset.langEs : n.dataset.langEn; });
    if (toggle) {
      /* The button always offers the OTHER language, so its own label is not translated. */
      toggle.textContent = es ? 'English' : 'Español';
      toggle.setAttribute('aria-label', es ? 'Cambiar a inglés' : 'Switch to Spanish');
      toggle.setAttribute('aria-pressed', String(es));
    }
    /* A page whose content is swapped in place still needs its title and description to match,
       or a Spanish reader shares an English link preview. */
    const t = document.querySelector('title[data-lang-en]');
    if (t) document.title = es ? t.dataset.langEs : t.dataset.langEn;
  };

  let lang = 'en';
  try { if (sessionStorage.getItem(KEY) === 'es') lang = 'es'; } catch (e) {}

  if (toggle) {
    toggle.addEventListener('click', () => {
      lang = lang === 'en' ? 'es' : 'en';
      /* Wrapped: Safari in private mode throws on write, and a language toggle that throws
         would leave the page half-translated. */
      try { sessionStorage.setItem(KEY, lang); } catch (e) {}
      apply(lang);
    });
  }
  apply(lang);
})();
