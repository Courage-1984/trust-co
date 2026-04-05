/* ============================================================
   TRUST CO — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Cookie consent (POPIA — non-essential cookies only after opt-in) ----
  initCookieConsent();

  function initCookieConsent() {
    try {
      if (localStorage.getItem('trustco_cookie_consent') === 'accepted') return;
    } catch (e) {
      return;
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-consent-inner container">
        <p>We use cookies only where necessary for the site to function. Optional analytics or tracking cookies are not placed unless you accept. See our <a href="/privacy">Privacy Policy</a> for how we process personal information under POPIA.</p>
        <div class="cookie-consent-actions">
          <button type="button" class="btn btn-primary btn-accept-cookies">Accept optional cookies</button>
          <button type="button" class="btn btn-outline" style="border-color:rgba(255,255,255,0.4);color:rgba(255,255,255,0.9);">Essential only</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const dismiss = function (value) {
      try {
        localStorage.setItem('trustco_cookie_consent', value);
      } catch (err) { /* ignore */ }
      banner.classList.add('is-dismissed');
      setTimeout(function () {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      }, 400);
    };

    banner.querySelector('.btn-accept-cookies').addEventListener('click', function () {
      dismiss('accepted');
    });
    banner.querySelectorAll('.cookie-consent-actions .btn')[1].addEventListener('click', function () {
      dismiss('essential');
    });
  }

  // ---- Sticky Header ----
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Navbar: Request a callback (modal form) ----
  function initNavCallbackModal() {
    var navContainer = document.querySelector('.nav-links');
    var navCta = navContainer && navContainer.querySelector('a.nav-cta');
    if (!navContainer || !navCta) return;

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'nav-callback';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'callbackModal');
    trigger.innerHTML =
      '<svg class="nav-callback-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.08-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.11.65.35 1.29.7 1.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.52.35 1.16.59 1.81.7A2 2 0 0 1 22 16.92z"/>' +
      '<path d="M16 3h5v5"/>' +
      '<path d="M21 3l-7 7"/>' +
      '</svg>' +
      '<span class="nav-callback-text">Request a callback</span>';

    navCta.before(trigger);

    var modal = document.createElement('div');
    modal.id = 'callbackModal';
    modal.className = 'modal-callback';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'callbackModalTitle');
    modal.hidden = true;
    modal.innerHTML =
      '<div class="modal-callback-backdrop" data-modal-close tabindex="-1"></div>' +
      '<div class="modal-callback-panel">' +
      '<button type="button" class="modal-callback-close" aria-label="Close dialog">&times;</button>' +
      '<p class="modal-callback-eyebrow">Trust Co</p>' +
      '<h2 id="callbackModalTitle" class="modal-callback-title">Request a callback</h2>' +
      '<p class="modal-callback-intro">Leave your details and we will call you back — usually within one business day. For urgent matters, say so below or phone us directly.</p>' +
      '<form id="callbackModalForm" class="modal-callback-form contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style="padding:0;box-shadow:none;margin:0;">' +
      '<input type="hidden" name="_subject" value="Trust Co — Navbar callback request" />' +
      '<input type="text" name="_gotcha" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
      '<div class="form-group"><label for="cbName">Full name *</label><input type="text" id="cbName" name="name" class="form-control" required autocomplete="name" placeholder="Your name" /></div>' +
      '<div class="form-group"><label for="cbEmail">Email *</label><input type="email" id="cbEmail" name="email" class="form-control" required autocomplete="email" placeholder="you@example.com" /></div>' +
      '<div class="form-group"><label for="cbPhone">Phone *</label><input type="tel" id="cbPhone" name="phone" class="form-control" required autocomplete="tel" placeholder="+27 …" /></div>' +
      '<div class="form-group"><label for="cbTopic">Area *</label><select id="cbTopic" name="topic" class="form-control" required>' +
      '<option value="" disabled selected>Select…</option>' +
      '<option value="liquidation">Liquidation</option>' +
      '<option value="trusts">Trusts &amp; estate</option>' +
      '<option value="business-rescue">Business rescue</option>' +
      '<option value="advisory">Advisory</option>' +
      '<option value="urgent">Urgent</option>' +
      '<option value="other">Other</option>' +
      '</select></div>' +
      '<div class="form-group"><label for="cbMessage">Brief note *</label><textarea id="cbMessage" name="message" class="form-control" rows="3" required placeholder="Best times to call, or a short outline…"></textarea></div>' +
      '<div class="form-consent" style="margin-bottom:1rem;"><label style="display:flex;align-items:flex-start;gap:0.35rem;cursor:pointer;font-size:0.82rem;color:var(--grey);line-height:1.45;">' +
      '<input type="checkbox" name="consent" required style="margin-top:3px;flex-shrink:0;accent-color:var(--teal);" />' +
      '<span>I agree per the <a href="/privacy" style="color:var(--teal);font-weight:600;">Privacy Policy</a>. *</span></label></div>' +
      '<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Send callback request</button>' +
      '</form></div>';

    document.body.appendChild(modal);

    var navToggleEl = document.querySelector('.nav-toggle');
    var navLinksEl = document.querySelector('.nav-links');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function openModal() {
      if (navToggleEl && navLinksEl) {
        navToggleEl.classList.remove('open');
        navLinksEl.classList.remove('open');
        document.body.style.overflow = '';
      }
      modal.hidden = false;
      document.body.classList.add('modal-callback-open');
      trigger.setAttribute('aria-expanded', 'true');
      if (reduceMotion) {
        modal.classList.add('is-open');
      } else {
        requestAnimationFrame(function () {
          modal.classList.add('is-open');
        });
      }
      var firstField = modal.querySelector('#cbName');
      if (firstField) firstField.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('modal-callback-open');
      var delay = reduceMotion ? 0 : 280;
      window.setTimeout(function () {
        modal.hidden = true;
      }, delay);
      trigger.focus();
    }

    trigger.addEventListener('click', function () {
      openModal();
    });

    modal.querySelector('.modal-callback-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.modal-callback-close').addEventListener('click', closeModal);

    document.addEventListener('keydown', function onKey(e) {
      if (e.key !== 'Escape' || modal.hidden) return;
      closeModal();
    });
  }

  initNavCallbackModal();

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
          }
        });
        // Toggle current
        item.classList.toggle('open', !isOpen);
        answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
      });
    }
  });

  // ---- Scroll Animations ----
  const animateEls = document.querySelectorAll('.fade-up, .fade-in');
  if (animateEls.length) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      animateEls.forEach(function (el) {
        el.classList.add('visible');
      });
    } else {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      animateEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // ---- Formspree + demo fallback (replace YOUR_FORM_ID in form action when ready) ----
  function isLiveFormspreeAction(action) {
    if (!action || action.indexOf('formspree.io') === -1) return false;
    if (action.indexOf('YOUR_FORM_ID') !== -1) return false;
    try {
      var u = new URL(action, window.location.origin);
      return u.hostname === 'formspree.io' && /^\/f\/[^/]+$/.test(u.pathname);
    } catch (err) {
      return false;
    }
  }

  function showFormSuccess(afterEl) {
    var existing = document.querySelector('.form-success-msg');
    if (existing) existing.remove();

    var msg = document.createElement('div');
    msg.className = 'form-success-msg';
    msg.style.cssText = [
      'background: linear-gradient(135deg, #2563EB, #0F2747)',
      'color: white',
      'padding: 1.2rem 1.5rem',
      'border-radius: 8px',
      'margin-top: 1rem',
      'font-size: 0.9rem',
      'display: flex',
      'align-items: center',
      'gap: 0.8rem',
      'animation: fadeInUp 0.4s ease'
    ].join(';');
    msg.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg><span>Thank you — your enquiry is in. We aim to respond within one business day; urgent matters are triaged as soon as we can.</span>';

    if (afterEl && afterEl.parentNode) {
      afterEl.parentNode.insertBefore(msg, afterEl.nextSibling);
    }

    setTimeout(function () {
      msg.style.opacity = '0';
      msg.style.transition = 'opacity 0.5s ease';
      setTimeout(function () { msg.remove(); }, 500);
    }, 5000);
  }

  function bindFormWithDemoFallback(form) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      var btn = form.querySelector('button[type="submit"]');
      if (isLiveFormspreeAction(action)) {
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = 'Sending…';
        }
        return;
      }
      e.preventDefault();
      if (!btn) return;
      var originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;
      setTimeout(function () {
        showFormSuccess(form);
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1400);
    });
  }

  bindFormWithDemoFallback(document.querySelector('#contactForm'));
  bindFormWithDemoFallback(document.querySelector('#heroContactForm'));
  bindFormWithDemoFallback(document.querySelector('#callbackModalForm'));

  // ---- Sticky conversion bar (dismissible; respects contact form in view) ----
  function initStickyCtaBar() {
    try {
      if (sessionStorage.getItem('trustco_sticky_cta_dismissed') === '1') return;
    } catch (e) { /* ignore */ }

    var page = document.body.getAttribute('data-page');
    var primaryHref;
    var primaryLabel;
    if (page === 'home') {
      primaryHref = '#hero-enquiry';
      primaryLabel = 'Request a call';
    } else if (page === 'contact') {
      primaryHref = '#contactForm';
      primaryLabel = 'Open the form';
    } else {
      primaryHref = '/contact#contactForm';
      primaryLabel = 'Get in touch';
    }

    var bar = document.createElement('aside');
    bar.className = 'sticky-cta-bar';
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'Quick enquiry');
    bar.innerHTML =
      '<div class="container">' +
      '<p class="sticky-cta-copy">No-obligation triage — confidential. We aim to reply within one business day.</p>' +
      '<div class="sticky-cta-actions">' +
      '<a class="btn btn-primary" href="' + primaryHref + '">' + primaryLabel + '</a>' +
      '<button type="button" class="sticky-cta-dismiss" aria-label="Dismiss this bar">Dismiss</button>' +
      '</div></div>';

    document.body.appendChild(bar);

    var contactForm = document.getElementById('contactForm');

    bar.querySelector('.sticky-cta-dismiss').addEventListener('click', function () {
      bar.classList.remove('is-visible');
      bar.classList.add('is-dismissed');
      document.body.classList.remove('has-sticky-cta');
      try {
        sessionStorage.setItem('trustco_sticky_cta_dismissed', '1');
      } catch (err) { /* ignore */ }
    });

    function updateVisibility() {
      if (bar.classList.contains('is-dismissed')) {
        document.body.classList.remove('has-sticky-cta');
        return;
      }

      var y = window.scrollY;
      var maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var nearBottom = y > maxScroll - 100;
      var show = y > 320 && !nearBottom;

      if (page === 'contact' && contactForm) {
        var r = contactForm.getBoundingClientRect();
        var formVisible = r.top < window.innerHeight * 0.88 && r.bottom > 120;
        if (formVisible) show = false;
      }

      bar.classList.toggle('is-visible', show);
      document.body.classList.toggle('has-sticky-cta', show);
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });
    updateVisibility();

    if (contactForm && page === 'contact') {
      var io = new IntersectionObserver(updateVisibility, {
        threshold: [0, 0.08, 0.2],
        rootMargin: '-72px 0px -22% 0px'
      });
      io.observe(contactForm);
    }
  }

  initStickyCtaBar();

  // ---- Floating WhatsApp: replace defaultDigits with your wa.me number (digits only, e.g. 27821234567), or set body data-whatsapp ----
  function initWhatsAppFloat() {
    var defaultDigits = '27821234567';
    var num = defaultDigits;
    try {
      var attr = document.body.getAttribute('data-whatsapp');
      if (attr) {
        var cleaned = String(attr).replace(/\D/g, '');
        if (cleaned.length >= 8 && cleaned.length <= 15) num = cleaned;
      }
    } catch (e) { /* ignore */ }

    var preset = encodeURIComponent(
      'Hello Trust Co, I would like to get in touch regarding a legal matter.'
    );
    var href = 'https://wa.me/' + num + '?text=' + preset;

    var a = document.createElement('a');
    a.className = 'whatsapp-float';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', 'Chat on WhatsApp with Trust Co');
    a.title = 'WhatsApp Trust Co';
    a.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>';

    document.body.appendChild(a);
  }

  initWhatsAppFloat();

  // ---- Active Nav Link (matches clean URLs e.g. /about) ----
  const currentPage = document.body.getAttribute('data-page');
  const pathMap = {
    'home': '/',
    'about': '/about',
    'liquidation': '/liquidation',
    'trusts': '/trusts',
    'rescue': '/business-rescue',
    'contact': '/contact',
    'services': '/services',
    'insights': '/insights',
    'faq': '/faq',
    'privacy': '/privacy',
    'terms': '/terms',
    'paia': '/paia'
  };
  const currentPath = currentPage ? pathMap[currentPage] : null;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (currentPath && href === currentPath) {
      link.classList.add('active');
    }
  });

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = prefix + target + suffix;
          }

          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

// ---- CSS Animation Injection ----
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
