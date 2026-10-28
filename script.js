const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}

// Accessible carousels. Each carousel manages its own slides, dots, and controls.
document.querySelectorAll('.sequence-carousel').forEach(sequenceCarousel => {
  const slides = [...sequenceCarousel.querySelectorAll('[data-sequence-slide]')];
  const dots = [...sequenceCarousel.querySelectorAll('[data-carousel-dot]')];
  const current = sequenceCarousel.querySelector('[data-carousel-current]');
  const previous = sequenceCarousel.querySelector('[data-carousel-prev]');
  const next = sequenceCarousel.querySelector('[data-carousel-next]');
  let activeIndex = 0;

  function showSequenceSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== activeIndex;
      slide.setAttribute('aria-hidden', String(i !== activeIndex));
    });
    dots.forEach((dot, i) => {
      const active = i === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    if (current) current.textContent = String(activeIndex + 1);
  }

  previous?.addEventListener('click', () => showSequenceSlide(activeIndex - 1));
  next?.addEventListener('click', () => showSequenceSlide(activeIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSequenceSlide(i)));
  showSequenceSlide(0);
});
