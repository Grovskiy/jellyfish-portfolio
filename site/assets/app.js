const mobileMenu = document.querySelector('.mobile-nav');
if (mobileMenu) {
  mobileMenu.addEventListener('click', event => {
    if (event.target.closest('a')) mobileMenu.open = false;
  });
  mobileMenu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary')?.focus();
    }
  });
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
