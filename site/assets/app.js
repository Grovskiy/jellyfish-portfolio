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

// The portfolio card scrolls a real, same-origin demo while hovered.
// Touch devices and reduced-motion preferences keep the static preview.
const canPreview = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (canPreview.matches) {
  document.querySelectorAll('[data-preview-demo]').forEach(frame => {
    const card = frame.closest('.project-card');
    let preview, animation = 0, active = false;
    function resize() { frame.style.setProperty('--preview-scale', String(frame.clientWidth / 1440)); }
    function start() {
      active = true;
      resize();
      if (!preview) {
        preview = document.createElement('iframe');
        preview.className = 'demo-preview';
        preview.title = 'Decorative moving project preview';
        preview.tabIndex = -1;
        preview.setAttribute('aria-hidden', 'true');
        preview.setAttribute('inert', '');
        preview.addEventListener('load', animate);
        preview.src = frame.dataset.previewDemo;
        frame.append(preview);
      } else if (preview.contentDocument?.readyState === 'complete') animate();
    }
    function animate() {
      if (!active || !preview?.contentDocument) return;
      cancelAnimationFrame(animation);
      frame.classList.add('is-previewing');
      const max = Math.max(0, preview.contentDocument.documentElement.scrollHeight - 810);
      const startTime = performance.now();
      const tick = now => {
        if (!active) return;
        const progress = Math.min((now - startTime) / 9000, 1);
        preview.contentWindow.scrollTo(0, max * progress);
        if (progress < 1) animation = requestAnimationFrame(tick);
      };
      animation = requestAnimationFrame(tick);
    }
    function stop() {
      active = false;
      cancelAnimationFrame(animation);
      frame.classList.remove('is-previewing');
      if (preview?.contentWindow) preview.contentWindow.scrollTo(0, 0);
    }
    card.addEventListener('pointerenter', start);
    card.addEventListener('pointerleave', stop);
    card.addEventListener('focusin', start);
    card.addEventListener('focusout', stop);
    window.addEventListener('resize', resize, {passive:true});
  });
}
