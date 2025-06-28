const header = document.getElementById('header');
const triggerHeight = 50;

window.addEventListener('scroll', () => {
  if (window.scrollY > triggerHeight) {
    header.classList.add('opaque');
    header.classList.remove('transparent');
  } else {
    header.classList.add('transparent');
    header.classList.remove('opaque');
  }
});
