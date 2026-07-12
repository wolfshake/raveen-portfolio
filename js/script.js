/* ==========================================================================
   RAVEEN RATHEESH — PORTFOLIO SCRIPT
   Vanilla JS. No frameworks. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. LOADING SCREEN
     Hide once the page (and fonts) are ready, with a small minimum delay
     so the animation doesn't just flash on fast connections.
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const MIN_LOAD_TIME = 700;
  const loadStart = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - loadStart;
    const wait = Math.max(MIN_LOAD_TIME - elapsed, 0);
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
    }, wait);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  /* ---------------------------------------------------------------------
     2. STICKY NAV: background on scroll + active link highlighting
  --------------------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 12);

    // Back to top visibility
    backToTop.classList.toggle('visible', window.scrollY > 500);

    // Active section highlighting
    const scrollPos = window.scrollY + window.innerHeight * 0.3;
    let currentId = sections[0] ? sections[0].id : null;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     3. MOBILE NAV TOGGLE
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------------------
     4. TYPING ANIMATION (Hero role line)
  --------------------------------------------------------------------- */
  const typedRoleEl = document.getElementById('typedRole');
  const roles = [
    'Full Stack Developer',
    'ASP.NET & PHP Developer',
    'Integrated MCA Student',
    'Front-End Engineer'
  ];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedRoleEl) {
    if (prefersReducedMotion) {
      typedRoleEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeTick() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedRoleEl.textContent = currentRole.slice(0, charIndex);
          if (charIndex === currentRole.length) {
            deleting = true;
            return setTimeout(typeTick, 1600);
          }
        } else {
          charIndex--;
          typedRoleEl.textContent = currentRole.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(typeTick, deleting ? 35 : 65);
      }
      typeTick();
    }
  }

  /* ---------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------------------------
     6. ANIMATED SKILL BARS (fill once visible)
  --------------------------------------------------------------------- */
  const bars = document.querySelectorAll('.bar > span');

  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('filled');
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((bar) => barObserver.observe(bar));
  } else {
    bars.forEach((bar) => bar.classList.add('filled'));
  }

  /* ---------------------------------------------------------------------
     7. PROJECT FILTERING
  --------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const match = filter === 'all' || tags.split(' ').includes(filter);
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------------------------------------------------------------------
     8. CONTACT FORM VALIDATION (front-end only — see placeholder note)
  --------------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setFieldError(field, message) {
    const row = field.closest('.form-row');
    const errorEl = row.querySelector('.field-error');
    row.classList.toggle('error', Boolean(message));
    errorEl.textContent = message || '';
  }

  function validateField(field) {
    if (field.validity.valueMissing) {
      setFieldError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && field.validity.typeMismatch) {
      setFieldError(field, 'Enter a valid email address.');
      return false;
    }
    setFieldError(field, '');
    return true;
  }

  if (form) {
    const fields = form.querySelectorAll('input, textarea');

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-row').classList.contains('error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      fields.forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        formStatus.style.color = '#f87171';
        formStatus.textContent = 'Please fix the highlighted fields.';
        return;
      }

      // No backend is connected — this is a front-end-only demo.
      // Wire this up to Formspree / EmailJS / your own API to go live.
      formStatus.style.color = '#4ade80';
      formStatus.textContent = 'Thanks! This demo form doesn\'t send yet — connect a backend to receive messages.';
      form.reset();
    });
  }

  /* ---------------------------------------------------------------------
     9. BACK TO TOP BUTTON
  --------------------------------------------------------------------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------------------------------------------------------------------
     10. SMOOTH SCROLL FOR IN-PAGE ANCHORS (with sticky nav offset)
  --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------------------------------------------------------------------
     11. FOOTER YEAR
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
