/**
 * Project Slider / Carousel Component
 * Vishwajeet Gupta Portfolio
 */

(function () {
  'use strict';

  const track = document.getElementById('slider-track');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let visibleSlides = Array.from(slides);
  let touchStartX = 0;
  let touchEndX = 0;

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    visibleSlides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `slider-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    if (visibleSlides.length === 0) return;
    if (index < 0) {
      currentIndex = visibleSlides.length - 1;
    } else if (index >= visibleSlides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Touch Swipe Support
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      goToSlide(currentIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      goToSlide(currentIndex - 1);
    }
  }

  // Keyboard navigation when in focus
  document.addEventListener('keydown', (e) => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    const rect = projectsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    }
  });

  // Expose function to update slides when filtering occurs
  window.updateProjectSlider = function (newVisibleSlides) {
    visibleSlides = newVisibleSlides;
    currentIndex = 0;
    renderDots();
    goToSlide(0);
  };

  renderDots();
  goToSlide(0);
})();
