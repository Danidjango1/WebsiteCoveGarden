/* ═══════════════════════════════════════════════════════════════
   COVE GARDEN – script.js
   Navigation · Scroll Animations · Mobile Menu · Form
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STICKY NAVIGATION ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNav() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }

  // Initial state
  navbar.classList.add('transparent');
  window.addEventListener('scroll', updateNav, { passive: true });


  /* ── MOBILE MENU ─────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });


  /* ── SMOOTH SCROLL ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* ── INTERSECTION OBSERVER – REVEAL ANIMATIONS ───────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        let delay = 0;
        siblings.forEach((sibling, idx) => {
          if (sibling === entry.target) {
            delay = idx * 80;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ── HERO PARALLAX (subtle) ──────────────────────────────────── */
  const heroBg = document.querySelector('.hero-photo-placeholder');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }


  /* ── COUNTER ANIMATION (strip numbers) ──────────────────────── */
  const stripNumbers = document.querySelectorAll('.strip-number');

  function animateCounter(el) {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;

    const suffix = text.replace(/[0-9.]/g, '');
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const stripObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.strip-number').forEach(animateCounter);
        stripObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const introStrip = document.querySelector('.intro-strip');
  if (introStrip) stripObserver.observe(introStrip);


  /* ── BOOKING FORM ────────────────────────────────────────────── */
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (bookingForm) {
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    const arrivalInput = document.getElementById('arrival');
    const departureInput = document.getElementById('departure');

    if (arrivalInput) arrivalInput.min = today;
    if (departureInput) departureInput.min = today;

    // Ensure departure is after arrival
    if (arrivalInput && departureInput) {
      arrivalInput.addEventListener('change', () => {
        departureInput.min = arrivalInput.value;
        if (departureInput.value && departureInput.value <= arrivalInput.value) {
          departureInput.value = '';
        }
      });
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = bookingForm.querySelector('.btn-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate send (replace with real form submission / email service)
      setTimeout(() => {
        bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
          field.value = '';
        });
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
        formSuccess.classList.add('show');

        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      }, 1200);
    });
  }


  /* ── GALLERY HOVER LABELS ────────────────────────────────────── */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer';
  });

});
