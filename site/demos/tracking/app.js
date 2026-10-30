(() => {
  'use strict';
  const foods = {
    oats: { name: 'Oats', per100: 389 },
    banana: { name: 'Banana', per100: 89 },
    yogurt: { name: 'Greek yogurt', per100: 97 },
    rice: { name: 'Cooked rice', per100: 130 },
    chicken: { name: 'Chicken breast', per100: 165 },
    apple: { name: 'Apple', per100: 52 },
  };
  const $ = (selector) => document.querySelector(selector);
  const fmt = new Intl.NumberFormat('en-US');
  const localKey = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  let day = new Date(today);
  let goal = 2000;
  let nextId = 3;
  const entries = new Map([[localKey(today), [
    { id: 1, name: 'Oats', grams: 90, calories: 350 },
    { id: 2, name: 'Greek yogurt', grams: 150, calories: 146 },
  ]]]);
  const entryDialog = $('#entry-dialog');
  const goalDialog = $('#goal-dialog');
  function dateLabel() {
    return new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(day);
  }
  function metric(value) {
    const number = document.createTextNode(fmt.format(value) + ' ');
    const unit = document.createElement('small');
    unit.textContent = 'kcal';
    return [number, unit];
  }
  function render() {
    const selected = entries.get(localKey(day)) || [];
    const consumed = selected.reduce((sum, item) => sum + item.calories, 0);
    const remaining = goal - consumed;
    const percentage = Math.min(100, Math.round(consumed / goal * 100));
    $('#date-text').textContent = dateLabel();
    $('#today-chip').hidden = localKey(day) !== localKey(today);
    $('#consumed').replaceChildren(...metric(consumed));
    $('#remaining-label').textContent = remaining >= 0 ? 'Remaining' : 'Over goal';
    $('#remaining').replaceChildren(...metric(Math.abs(remaining)));
    $('#goal-value').replaceChildren(...metric(goal));
    $('#percent').textContent = percentage + '%';
    $('#progress').setAttribute('aria-valuenow', percentage);
    $('#progress').setAttribute('aria-valuetext', `${fmt.format(consumed)} of ${fmt.format(goal)} calories`);
    $('#progress-fill').style.width = percentage + '%';
    $('#progress-fill').classList.toggle('over', remaining < 0);
    $('#entries-count').textContent = `${selected.length} ${selected.length === 1 ? 'entry' : 'entries'}`;
    const list = $('#entries');
    list.replaceChildren();
    if (!selected.length) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = 'No entries for this day. Add one to start your log.';
      list.append(empty);
      return;
    }
    selected.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'entry';
      const icon = document.createElement('span');
      icon.className = 'food-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = item.name.charAt(0).toUpperCase();
      const details = document.createElement('div');
      const name = document.createElement('span');
      name.className = 'food-name'; name.textContent = item.name;
      const amount = document.createElement('span');
      amount.className = 'food-amount'; amount.textContent = `${item.grams} g`;
      details.append(name, amount);
      const kcal = document.createElement('span');
      kcal.className = 'food-kcal'; kcal.replaceChildren(...metric(item.calories));
      const remove = document.createElement('button');
      remove.type = 'button'; remove.className = 'icon-button delete-entry';
      remove.setAttribute('aria-label', `Remove ${item.name} entry`);
      remove.textContent = '×';
      remove.addEventListener('click', () => {
        entries.set(localKey(day), (entries.get(localKey(day)) || []).filter((entry) => entry.id !== item.id));
        render();
        $('#add-open').focus();
        $('#announcement').textContent = `${item.name} removed from ${dateLabel()}.`;
      });
      row.append(icon, details, kcal, remove);
      list.append(row);
    });
  }
  $('#prev-day').addEventListener('click', () => { day.setDate(day.getDate() - 1); render(); });
  $('#next-day').addEventListener('click', () => { day.setDate(day.getDate() + 1); render(); });
  $('#today').addEventListener('click', () => { day = new Date(today); render(); });
  $('#add-open').addEventListener('click', () => { $('#entry-form').reset(); entryDialog.showModal(); });
  $('#goal-open').addEventListener('click', () => { $('#goal-input').value = goal; goalDialog.showModal(); });
  document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  $('#entry-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const food = foods[$('#food').value];
    const grams = Number($('#grams').value);
    if (!food || !Number.isFinite(grams) || grams < 1 || grams > 5000) return;
    const selected = entries.get(localKey(day)) || [];
    selected.push({ id: nextId++, name: food.name, grams, calories: Math.round(food.per100 * grams / 100) });
    entries.set(localKey(day), selected);
    entryDialog.close();
    render();
    $('#announcement').textContent = `${food.name} added to ${dateLabel()}.`;
  });
  $('#goal-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const value = Number($('#goal-input').value);
    if (!Number.isFinite(value) || value < 1 || value > 10000) return;
    goal = value;
    goalDialog.close();
    render();
    $('#announcement').textContent = `Daily goal changed to ${fmt.format(goal)} calories.`;
  });
  render();
})();
