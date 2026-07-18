/* ==========================================================================
   MANDARA — main.js
   All interactivity is progressive enhancement: every section already
   works and is readable/crawlable from the static HTML alone.
   ========================================================================== */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '918590801848'; // +91 8590801848, no plus/spaces for wa.me

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------------- Sticky header ---------------- */
  var header = document.querySelector('[data-site-header]');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navClose = document.querySelector('[data-nav-close]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------------- Active nav link on scroll ---------------- */
  var navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ link: link, section: section });
  });
  function onScrollSpy() {
    var pos = window.scrollY + 160;
    var current = null;
    sections.forEach(function (item) {
      if (item.section.offsetTop <= pos) current = item;
    });
    navLinks.forEach(function (l) { l.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }
  if (sections.length) {
    document.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }

  /* ---------------- WhatsApp buttons ---------------- */
  document.querySelectorAll('[data-wa-general]').forEach(function (btn) {
    btn.href = waLink("Hi Mandara! I'd like to know more about your Kerala cooking & rice powders.");
    btn.target = '_blank';
    btn.rel = 'noopener';
  });

  document.querySelectorAll('[data-wa-product]').forEach(function (btn) {
    var product = btn.getAttribute('data-wa-product');
    btn.href = waLink('Hi Mandara! I would like to order ' + product + '. Please share the price and delivery details.');
    btn.target = '_blank';
    btn.rel = 'noopener';
  });

  /* ---------------- Quick order form -> WhatsApp ---------------- */
  var orderForm = document.querySelector('[data-order-form]');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(orderForm);
      var name = (data.get('name') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var product = (data.get('product') || '').toString().trim();
      var qty = (data.get('qty') || '').toString().trim();
      var district = (data.get('district') || '').toString().trim();
      var address = (data.get('address') || '').toString().trim();
      var notes = (data.get('notes') || '').toString().trim();

      if (!name || !phone || !product) {
        orderForm.reportValidity();
        return;
      }

      var lines = [
        'New order request from mandarakerala.com',
        'Name: ' + name,
        'Phone: ' + phone,
        'Product: ' + product,
        qty ? 'Quantity: ' + qty : null,
        district ? 'District: ' + district : null,
        address ? 'Address: ' + address : null,
        notes ? 'Notes: ' + notes : null
      ].filter(Boolean);

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('[data-faq-item]').forEach(function (item) {
    var q = item.querySelector('.faq-item__q');
    var a = item.querySelector('.faq-item__a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('[data-faq-item]').forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-item__a').style.maxHeight = 0;
        other.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- Testimonial slider ---------------- */
  var testiTrack = document.querySelector('[data-testi-track]');
  var testiDots = document.querySelectorAll('[data-testi-dot]');
  var testiIndex = 0;
  function goToTesti(i) {
    if (!testiTrack) return;
    testiIndex = i;
    testiTrack.style.transform = 'translateX(-' + (i * 100) + '%)';
    testiDots.forEach(function (d, di) { d.classList.toggle('is-active', di === i); });
  }
  testiDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goToTesti(i); });
  });
  if (testiDots.length > 1) {
    setInterval(function () {
      goToTesti((testiIndex + 1) % testiDots.length);
    }, 6500);
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Marquee: duplicate content for seamless loop ---------------- */
  var marqueeTrack = document.querySelector('[data-marquee-track]');
  if (marqueeTrack) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  /* ======================================================================
     PRODUCT SLIDER — deferred initialisation.
     The product cards + images already exist in the static HTML (so
     search engines can read and index them immediately). What we defer
     here is only the *heavy interactive slider behaviour* and the
     product photos themselves, which are intentionally left out of the
     initial paint and are only requested once the rest of the page
     (including the hero) has fully loaded. Combined with native
     loading="lazy" on every product image, this keeps the hero section
     the sole priority for the first paint.
     ====================================================================== */
  function initProductSlider() {
    var viewport = document.querySelector('[data-products-slider]');
    var prevBtn = document.querySelector('[data-slider-prev]');
    var nextBtn = document.querySelector('[data-slider-next]');
    if (!viewport) return;

    // Swap data-src -> src now, so product images only start
    // downloading after the whole page (incl. the hero) has finished
    // loading. The cards themselves have been visible and in their
    // normal flex layout the whole time -- only the photo bytes were
    // deferred, so nothing here depends on JS having run.
    viewport.querySelectorAll('img[data-src]').forEach(function (img) {
      var figure = img.closest('.product-card__figure');
      img.addEventListener('load', function () {
        if (figure) figure.classList.add('is-loaded');
      });
      img.addEventListener('error', function () {
        if (figure) figure.classList.add('is-loaded');
      });
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    });

    function scrollByCard(direction) {
      var card = viewport.querySelector('.product-card');
      var gap = 22;
      var distance = card ? card.getBoundingClientRect().width + gap : 300;
      viewport.scrollBy({ left: direction * distance, behavior: 'smooth' });
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });
  }

  function deferUntilLoaded(fn) {
    if (document.readyState === 'complete') {
      setTimeout(fn, 0);
    } else {
      window.addEventListener('load', function () {
        // requestIdleCallback keeps this off the critical path a little
        // longer on slower devices, falling back to a short timeout.
        if ('requestIdleCallback' in window) {
          requestIdleCallback(fn, { timeout: 1200 });
        } else {
          setTimeout(fn, 200);
        }
      });
    }
  }

  deferUntilLoaded(initProductSlider);

})();

/* =========================
   SCROLL TO TOP
   ========================= */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

  