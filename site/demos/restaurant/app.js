const mobileNav = document.querySelector('.nav-mobile');
mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) mobileNav.open = false;
});
mobileNav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileNav.open) {
    mobileNav.open = false;
    mobileNav.querySelector('summary').focus();
  }
});
const photos = [
  { src:'assets/gallery-1.webp', alt:'Bottles on wine shelves', caption:'The details' },
  { src:'assets/gallery-2.webp', alt:'A burger served with potato wedges', caption:'The food' },
  { src:'assets/gallery-3.webp', alt:'A restaurant interior', caption:'The room' }
];
const dialog = document.querySelector('#gallery-dialog');
const image = document.querySelector('#gallery-image');
const caption = document.querySelector('#gallery-caption');
const count = document.querySelector('#gallery-count');
let current = 0;
let trigger;
function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  image.src = photos[current].src;
  image.alt = photos[current].alt;
  caption.textContent = photos[current].caption;
  count.textContent = `${String(current + 1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;
}
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  trigger = button;
  showPhoto(Number(button.dataset.gallery));
  dialog.showModal();
}));
document.querySelector('#gallery-close').addEventListener('click', () => dialog.close());
document.querySelector('#gallery-prev').addEventListener('click', () => showPhoto(current - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showPhoto(current + 1));
dialog.addEventListener('close', () => trigger?.focus());
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showPhoto(current - 1);
  if (event.key === 'ArrowRight') showPhoto(current + 1);
});
document.querySelector('#booking').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const result = form.querySelector('.form-result');
  result.textContent = 'Thanks for trying it. This is a demonstration; no booking was sent.';
  result.hidden = false;
});
