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

const modeToggleBtn = document.querySelector('#mode-switch');

modeToggleBtn.addEventListener('click', (event) => {
  const rootEl = document.querySelector('html');
  const rootClasses = rootEl.classList;
  const modeButton = document.querySelector('.theme-toggle__icon');

  if(rootClasses.contains('dark')) {
    rootClasses.remove('dark');
    modeButton.src = `${imgBase}${modeButton.dataset.dark}.svg`;
  } else {
    rootClasses.add('dark');
    modeButton.src = `${imgBase}${modeButton.dataset.light}.svg`;
  }

  

});