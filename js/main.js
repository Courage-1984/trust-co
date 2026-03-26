/* ============================================================
   TRUST CO (PTY) LTD — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    animateEls.forEach(el => observer.observe(el));
  }

  // ---- Contact Form Handling ----
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20"/><path d="M12 2v4"/><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></svg> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        showFormSuccess();
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1800);
    });
  }

  function showFormSuccess() {
    const existing = document.querySelector('.form-success-msg');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = 'form-success-msg';
    msg.style.cssText = `
      background: linear-gradient(135deg, #0E5C63, #0F2747);
      color: white;
      padding: 1.2rem 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      animation: fadeInUp 0.4s ease;
    `;
    msg.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96B" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      <span>Thank you for your enquiry. A specialist will be in touch with you shortly.</span>
    `;

    const form = document.querySelector('#contactForm');
    if (form) form.after(msg);

    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transition = 'opacity 0.5s ease';
      setTimeout(() => msg.remove(), 500);
    }, 5000);
  }

  // ---- Active Nav Link ----
  const currentPage = document.body.getAttribute('data-page');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    const pageMap = {
      'home': 'index.html',
      'about': 'about.html',
      'liquidation': 'liquidation.html',
      'trusts': 'trusts.html',
      'rescue': 'business-rescue.html',
      'contact': 'contact.html'
    };
    if (currentPage && pageMap[currentPage] === href) {
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
