/**
 * Main Application Logic & Interactivity
 * Vishwajeet Gupta Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    });
  }

  // ==========================================
  // 2. HERO TYPING EFFECT
  // ==========================================
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Java & Spring Boot Developer',
      'AI & Machine Learning Enthusiast',
      'Real-Time Systems & WebRTC Developer',
      'Competitive Programmer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ==========================================
  // 3. HEADER SCROLL & MOBILE MENU
  // ==========================================
  const header = document.getElementById('header');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  // ==========================================
  // 4. ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ==========================================
  // 5. INTERSECTION OBSERVER SCROLL REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-element');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ==========================================
  // 6. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 7. BUTTON RIPPLE EFFECT
  // ==========================================
  const rippleButtons = document.querySelectorAll('.btn, .social-link-btn, .filter-btn');
  rippleButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ==========================================
  // 8. RESUME VIEW MODAL HANDLER
  // ==========================================
  const resumeModalBtn = document.getElementById('view-resume-btn');
  const modalBackdrop = document.getElementById('resume-modal');
  const modalCloseBtn = document.getElementById('close-modal-btn');

  if (resumeModalBtn && modalBackdrop) {
    resumeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeModal() {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
