const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.resource')];
const noResults = document.querySelector('#no-results');
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  cards.forEach(card => { card.hidden = !card.dataset.search.includes(query); });
  noResults.hidden = cards.some(card => !card.hidden);
});
document.querySelectorAll('.resource button').forEach(button => {
  button.addEventListener('click', () => {
    const details = document.getElementById(button.getAttribute('aria-controls'));
    const opening = details.hidden;
    details.hidden = !opening;
    button.setAttribute('aria-expanded', String(opening));
    button.firstChild.textContent = opening ? 'Close guide ' : 'Read the guide ';
  });
});
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#form-message').textContent = 'Thank you. This is a demonstration — no information was sent.';
});
