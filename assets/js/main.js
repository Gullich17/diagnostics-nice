/* ==========================================================================
   Diagnostics Nice — main.js
   Vanilla JS — No dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Mobile Hamburger Menu ---- */
  const hamburger = document.querySelector('.hamburger');
  // Support nav-menu (index/pack pages), nav-list, or main-nav > ul (subagent pages)
  const navMenu = document.querySelector('.nav-menu') || document.querySelector('.nav-list') || document.querySelector('.main-nav > ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      // Also toggle parent .main-nav if it exists
      var mainNav = document.querySelector('.main-nav');
      if (mainNav) mainNav.classList.toggle('open');
    });

    // Toggle dropdown on mobile
    navMenu.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          link.parentElement.classList.toggle('show-sub');
        }
      });
    });

    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && !link.parentElement.classList.contains('has-dropdown')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('open');
        }
      });
    });
  }

  /* ---- 2. Sticky Header Shadow on Scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---- 3. FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all siblings
      item.parentElement.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ---- 4. Form Validation ---- */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (fg) {
        fg.classList.remove('has-error');
      });

      // Required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        var fg = field.closest('.form-group');
        if (!field.value.trim()) {
          isValid = false;
          if (fg) fg.classList.add('has-error');
        }
      });

      // Email validation
      form.querySelectorAll('input[type="email"]').forEach(function (field) {
        var fg = field.closest('.form-group');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value.trim() && !emailRegex.test(field.value.trim())) {
          isValid = false;
          if (fg) fg.classList.add('has-error');
        }
      });

      // French phone validation
      form.querySelectorAll('input[type="tel"]').forEach(function (field) {
        var fg = field.closest('.form-group');
        var phone = field.value.replace(/[\s.-]/g, '');
        var phoneRegex = /^(?:(?:\+33|0033|0)[1-9])(?:\d{8})$/;
        if (field.value.trim() && !phoneRegex.test(phone)) {
          isValid = false;
          if (fg) fg.classList.add('has-error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Scroll to first error
        var firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  /* ---- 5. Pre-fill devis form from query params (hero form redirect) ---- */
  var params = new URLSearchParams(window.location.search);
  if (params.get('projet')) {
    var sel = document.getElementById('type-projet');
    if (sel) sel.value = params.get('projet');
  }
  if (params.get('bien')) {
    var sel2 = document.getElementById('type-bien');
    if (sel2) sel2.value = params.get('bien');
  }

  /* ---- 6. Scroll Fade-in Animation (IntersectionObserver) ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      // Elements already in viewport: show immediately
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

});
