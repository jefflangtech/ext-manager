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

// remove the old direct toggle code and replace with initialization that
// applies the user's system preference and keeps icon/class in sync.
document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.documentElement;
  const imgBase = rootEl.dataset.imageAssets; // already defined earlier but safe to re-read
  const modeToggleBtn = document.querySelector('#mode-switch');
  const modeIcon = document.querySelector('.theme-toggle__icon');

  if (!modeIcon) return; // nothing to do if icon/button missing

  const applyMode = (isDark) => {
    if (isDark) {
      rootEl.classList.add('dark');
      // show the "switch to light" icon when page is currently dark
      modeIcon.src = `${imgBase}${modeIcon.dataset.light}.svg`;
    } else {
      rootEl.classList.remove('dark');
      // show the "switch to dark" icon when page is currently light
      modeIcon.src = `${imgBase}${modeIcon.dataset.dark}.svg`;
    }
  };

  // Check system preference and apply it
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mq) {
    applyMode(mq.matches);

    // react to future changes in system preference
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', (e) => applyMode(e.matches));
    } else if (typeof mq.addListener === 'function') {
      mq.addListener((e) => applyMode(e.matches));
    }
  } else {
    // fallback to light if no system preference API
    applyMode(false);
  }

  // Attach toggle behavior (guarded)
  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
      // toggle returns true if the class is now present
      const isNowDark = rootEl.classList.toggle('dark');
      // after toggling, show the icon for the next action:
      // if it's now dark, show "switch to light" (dataset.light), otherwise show "switch to dark" (dataset.dark)
      modeIcon.src = `${imgBase}${isNowDark ? modeIcon.dataset.light : modeIcon.dataset.dark}.svg`;
    });
  }
});
