const cards = [...document.querySelectorAll('.story')];
const filterButtons = [...document.querySelectorAll('.filters [data-filter]')];
const search = document.querySelector('#search');
const title = document.querySelector('#section-title');
const results = document.querySelector('#results');
const empty = document.querySelector('#empty');
const count = document.querySelector('#saved-count');
let filter = 'All';
function render() {
  const term = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  for (const card of cards) {
    const saved = card.querySelector('.save').getAttribute('aria-pressed') === 'true';
    const matchesFilter = filter === 'All' || (filter === 'Saved' ? saved : card.dataset.category === filter);
    const matchesSearch = card.textContent.toLocaleLowerCase().includes(term);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) visible++;
  }
  for (const button of filterButtons) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  title.textContent = filter === 'All' ? 'All stories' : filter === 'Saved' ? 'Saved stories' : `${filter} stories`;
  results.textContent = `${visible} ${visible === 1 ? 'story' : 'stories'}`;
  empty.hidden = visible !== 0;
  count.textContent = String(cards.filter(card => card.querySelector('.save').getAttribute('aria-pressed') === 'true').length);
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  render();
  if (button.classList.contains('saved-shortcut')) document.querySelector('#collections').scrollIntoView({behavior:'auto'});
}));
search.addEventListener('input', render);
for (const card of cards) {
  const save = card.querySelector('.save');
  save.addEventListener('click', () => {
    const active = save.getAttribute('aria-pressed') !== 'true';
    save.setAttribute('aria-pressed', String(active));
    save.textContent = active ? '♥' : '♡';
    save.setAttribute('aria-label', `${active ? 'Remove saved story' : 'Save'} ${card.dataset.title}`);
    render();
  });
  const read = card.querySelector('.read');
  read.addEventListener('click', () => {
    const expanded = read.getAttribute('aria-expanded') !== 'true';
    read.setAttribute('aria-expanded', String(expanded));
    card.querySelector('.more').hidden = !expanded;
    read.textContent = expanded ? 'Close story ↑' : 'Read story ↗';
  });
}
render();
