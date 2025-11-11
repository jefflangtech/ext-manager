

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
console.dir(modeToggleBtn);

modeToggleBtn.addEventListener('click', (event) => {
  const rootEl = document.querySelector('html');
  const rootClasses = rootEl.classList;

  if(rootClasses.contains('dark')) {
    rootClasses.remove('dark');
  } else {
    rootClasses.add('dark');
  }

});