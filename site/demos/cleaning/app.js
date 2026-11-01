
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  const selected = button.dataset.filter;
  cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
  const count = cards.filter(card => !card.hidden).length;
  document.querySelector('#results').textContent = `${count} ${count === 1 ? 'result' : 'results'} shown`;
}));
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#status').textContent = 'Thanks! This is a portfolio demonstration. Nothing was sent.';
});
