document.addEventListener('click', event => {
  const opener = event.target.closest('[data-dialog]');
  if (opener) document.getElementById(opener.dataset.dialog)?.showModal();
  const closer = event.target.closest('[data-close]');
  if (closer) closer.closest('dialog')?.close();
});
