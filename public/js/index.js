

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