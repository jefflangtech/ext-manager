// this comment added as a test
const imgBase = document.documentElement.dataset.imageAssets;

const overlay = document.getElementsByClassName('overlay')[0];

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'u') {
    event.preventDefault();
    if (overlay) {
      console.dir(overlay);
      overlay.hidden = !overlay.hidden;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.documentElement;
  const imgBase = rootEl.dataset.imageAssets;
  const modeToggleBtn = document.querySelector('#mode-switch');
  const modeIcon = document.querySelector('.theme-toggle__icon');
  const siteLogo = document.getElementById('site-logo');

  // cached reference to the text portion inside the embedded SVG
  let embeddedLogoTextEl = null;

  // Read the --logo CSS variable from the root element (will reflect html or html.dark)
  const getLogoColorFromCSS = () => {
    try {
      const cs = getComputedStyle(rootEl);
      const val = cs.getPropertyValue('--logo') || '';
      return val.trim() || '#091540'; // fallback to original dark-blue if missing
    } catch (e) {
      return '#091540';
    }
  };

  const syncLogoFill = () => {
    const color = getLogoColorFromCSS();
    if (embeddedLogoTextEl) {
      embeddedLogoTextEl.setAttribute('fill', color);
      return;
    }
    // attempt to locate it if object already loaded
    if (siteLogo && siteLogo.contentDocument) {
      try {
        const el = siteLogo.contentDocument.querySelector('.logo-text');
        if (el) {
          embeddedLogoTextEl = el;
          embeddedLogoTextEl.setAttribute('fill', color);
        }
      } catch (e) {
        // ignore access errors
      }
    }
  };

  // when the <object> finishes loading its document, cache the element and sync
  if (siteLogo) {
    siteLogo.addEventListener('load', () => {
      try {
        embeddedLogoTextEl = siteLogo.contentDocument.querySelector('.logo-text');
      } catch (e) {
        embeddedLogoTextEl = null;
      }
      syncLogoFill();
    });
    // try once immediately in case object was already parsed
    syncLogoFill();
  }

  const applyMode = (isDark) => {
    if (isDark) {
      rootEl.classList.add('dark');
      if (modeIcon) modeIcon.src = `${imgBase}${modeIcon.dataset.light}.svg`;
    } else {
      rootEl.classList.remove('dark');
      if (modeIcon) modeIcon.src = `${imgBase}${modeIcon.dataset.dark}.svg`;
    }
    // read CSS variable after class change and apply to embedded SVG
    syncLogoFill();
  };

  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mq) {
    applyMode(mq.matches);
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', (e) => applyMode(e.matches));
    } else if (typeof mq.addListener === 'function') {
      mq.addListener((e) => applyMode(e.matches));
    }
  } else {
    applyMode(false);
  }

  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
      const isNowDark = rootEl.classList.toggle('dark');
      if (modeIcon) modeIcon.src = `${imgBase}${isNowDark ? modeIcon.dataset.light : modeIcon.dataset.dark}.svg`;
      syncLogoFill(isNowDark);
    });
  }
});
