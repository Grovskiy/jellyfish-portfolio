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

// New archive demos provide their own still preview. Load them only near the
// viewport; the original image remains available if the frame cannot load.
const archivePreviews = document.querySelectorAll('[data-archive-preview]');
if ('IntersectionObserver' in window && 'ResizeObserver' in window) {
  const sizes = new ResizeObserver(entries => {
    for (const entry of entries) entry.target.style.setProperty('--archive-preview-scale', String(entry.contentRect.width / 1440));
  });
  const loadPreview = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const frame = entry.target;
      observer.unobserve(frame);
      const preview = document.createElement('iframe');
      preview.className = 'archive-live-preview';
      preview.title = 'Decorative project preview';
      preview.tabIndex = -1;
      preview.setAttribute('aria-hidden', 'true');
      preview.setAttribute('inert', '');
      preview.setAttribute('scrolling', 'no');
      preview.addEventListener('load', () => {
        if (!preview.contentDocument?.head || !preview.contentDocument.querySelector('main')) return;
        const style = preview.contentDocument.createElement('style');
        style.textContent = 'html,body{scrollbar-width:none!important;scroll-behavior:auto!important}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important}';
        preview.contentDocument.head.append(style);
        frame.classList.add('has-archive-preview');
      });
      preview.src = frame.dataset.archivePreview;
      sizes.observe(frame);
      frame.append(preview);
    }
  }, {rootMargin: '200px'});
  archivePreviews.forEach(frame => loadPreview.observe(frame));
}

// The portfolio card scrolls a real, same-origin demo while hovered.
// Touch devices and reduced-motion preferences keep the static preview.
const canPreview = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (canPreview.matches) {
  document.querySelectorAll('[data-preview-demo]').forEach(frame => {
    const card = frame.closest('.project-card');
    let preview, animation = 0, resetTimer = 0, active = false, hovered = false, focused = false, loaded = false;
    function resize() { frame.style.setProperty('--preview-scale', String(frame.clientWidth / 1440)); }
    function start() {
      if (active) return;
      active = true;
      clearTimeout(resetTimer);
      resize();
      if (!preview) {
        preview = document.createElement('iframe');
        preview.className = 'demo-preview';
        preview.title = 'Decorative moving project preview';
        preview.tabIndex = -1;
        preview.setAttribute('aria-hidden', 'true');
        preview.setAttribute('inert', '');
        // Hide the browser scrollbar without disabling programmatic scrolling.
        // The captured still and the iframe must have the same usable width.
        preview.setAttribute('scrolling', 'no');
        preview.addEventListener('load', () => {
          const style = preview.contentDocument.createElement('style');
          style.textContent = 'html,body{scrollbar-width:none!important;scroll-behavior:auto!important}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important}';
          preview.contentDocument.head.append(style);
          preview.contentWindow.scrollTo(0, 0);
          loaded = true;
          animate();
        });
        preview.src = frame.dataset.previewDemo;
        frame.append(preview);
      } else if (loaded) animate();
    }
    function animate() {
      if (!active || !preview?.contentDocument) return;
      cancelAnimationFrame(animation);
      frame.classList.add('is-previewing');
      const max = Math.max(0, preview.contentDocument.documentElement.scrollHeight - 810);
      const from = preview.contentWindow.scrollY;
      // Let the crossfade finish before the page begins moving.
      const startTime = performance.now() + 550;
      const tick = now => {
        if (!active) return;
        const progress = Math.max(0, Math.min((now - startTime) / 9000, 1));
        const eased = progress * progress * (3 - 2 * progress);
        preview.contentWindow.scrollTo(0, from + (max - from) * eased);
        if (progress < 1) animation = requestAnimationFrame(tick);
      };
      animation = requestAnimationFrame(tick);
    }
    function stop() {
      active = false;
      cancelAnimationFrame(animation);
      frame.classList.remove('is-previewing');
      // Reset only after the iframe has faded out, so leaving never flashes the top.
      resetTimer = setTimeout(() => preview?.contentWindow?.scrollTo(0, 0), 350);
    }
    card.addEventListener('pointerenter', () => { hovered = true; start(); });
    card.addEventListener('pointerleave', () => { hovered = false; if (!focused) stop(); });
    card.addEventListener('focusin', () => { focused = true; start(); });
    card.addEventListener('focusout', event => {
      if (card.contains(event.relatedTarget)) return;
      focused = false;
      if (!hovered) stop();
    });
    window.addEventListener('resize', resize, {passive:true});
  });
}
