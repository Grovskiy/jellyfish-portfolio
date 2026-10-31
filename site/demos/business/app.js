const slides = [
  ['Ideas for the way we work.', 'Thoughtful solutions for the challenges of modern work. Explore how ideas become projects.'],
  ['A clearer way forward.', 'Start with the right questions and turn a complex challenge into a practical plan.'],
  ['Built around people.', 'From the first sketch to the final detail, focus on what matters in everyday use.']
];
let current = 0;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  document.querySelector('#slide-title').textContent = slides[current][0];
  document.querySelector('#slide-copy').textContent = slides[current][1];
  document.querySelector('#slide-count').textContent = `${String(current + 1).padStart(2, '0')} / 03`;
}
document.querySelector('#previous').addEventListener('click', () => showSlide(current - 1));
document.querySelector('#next').addEventListener('click', () => showSlide(current + 1));
const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.card')];
function searchServices() {
  const term = search.value.trim().toLowerCase();
  let shown = 0;
  for (const card of cards) {
    card.hidden = !!term && !`${card.dataset.search} ${card.textContent}`.toLowerCase().includes(term);
    if (!card.hidden) shown++;
  }
  document.querySelector('#search-result').textContent = term ? `${shown} ${shown === 1 ? 'service' : 'services'} found for “${search.value.trim()}”.` : '';
}
search.addEventListener('input', searchServices);
document.querySelector('#search-button').addEventListener('click', () => { searchServices(); document.querySelector('#services').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); });
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-status').textContent = 'Thank you! This is a demonstration, so your message was not sent.';
});
