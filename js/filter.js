/**
 * Project Tech Category Filter
 * Vishwajeet Gupta Portfolio
 */

(function () {
  'use strict';

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectSlides = document.querySelectorAll('.project-slide');

  if (filterButtons.length === 0 || projectSlides.length === 0) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button styling
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const visibleSlides = [];

      projectSlides.forEach((slide) => {
        const categories = slide.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          slide.style.display = 'block';
          visibleSlides.push(slide);
        } else {
          slide.style.display = 'none';
        }
      });

      // Update the carousel track position with newly filtered slides
      if (typeof window.updateProjectSlider === 'function') {
        window.updateProjectSlider(visibleSlides);
      }
    });
  });
})();
