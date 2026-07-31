/**
 * Theme Manager (Dark / Light Mode)
 * Vishwajeet Gupta Portfolio
 */

(function () {
  'use strict';

  const THEME_KEY = 'vishwajeet_portfolio_theme';
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Initialize theme from localStorage or OS system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateToggleIcon(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', initialTheme);
      updateToggleIcon(initialTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateToggleIcon(newTheme);
  }

  function updateToggleIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'ri-sun-line';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        icon.className = 'ri-moon-line';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Initialize immediately
  initTheme();
})();
