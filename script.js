const heroBanner = document.querySelector('.hero-banner');
const heroImage = document.querySelector('.hero-banner__image');

if (heroBanner && heroImage) {
  let ticking = false;

  const updateHero = () => {
    const heroHeight = heroBanner.offsetHeight;
    const scrollY = window.scrollY;

    // Fade and parallax are based on how far the user has scrolled relative to the hero height.
    const progress = Math.min(scrollY / heroHeight, 1);
    const opacity = 1 - progress;
    const offset = Math.min(scrollY * 0.18, 70);
    const scale = 1.05 - progress * 0.03;

    heroImage.style.opacity = Math.max(0, opacity).toString();
    heroImage.style.transform = `translate3d(0, ${-offset}px, 0) scale(${scale})`;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHero);
      ticking = true;
    }
  };

  // Run once immediately so the initial state is correct before the first scroll.
  updateHero();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
