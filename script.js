// script.js

// Contact form fallback (kept for compatibility if a form is added later)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! I'll get back to you soon.");
    });
  }
});

// Mobile accordion for Services (titles only expand/collapse)
document.addEventListener('DOMContentLoaded', () => {
  const mq = window.matchMedia('(max-width: 768px)');

  function setupAccordions() {
    const isMobile = mq.matches;
    document.querySelectorAll('.service-item').forEach(item => {
      const btn = item.querySelector('.service-title-btn');
      const collapse = item.querySelector('.service-collapse');
      if (!btn || !collapse) return;

      if (isMobile) {
        // start collapsed
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.onclick = () => {
          const open = item.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        };
      } else {
        // desktop: always open
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        btn.onclick = null;
      }
    });
  }

  setupAccordions();
  mq.addEventListener ? mq.addEventListener('change', setupAccordions)
                      : mq.addListener(setupAccordions);
});
document.addEventListener("DOMContentLoaded", () => {
  // --- existing contact form (keep) ---
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! I'll get back to you soon.");
    });
  }

  // --- Services mobile accordion (keep if you already have it) ---
  document.querySelectorAll(".service-title-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        btn.closest(".service-item")?.classList.toggle("open");
      }
    });
  });

  // --- NEW: Sticky nav state + hamburger ---
  const nav = document.querySelector(".site-nav");
  const burger = document.querySelector(".nav-burger");
  const drawer = document.getElementById("nav-drawer");

  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
  }

  // Close drawer when a link is tapped
  drawer?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      burger?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- existing bits (form, accordion, etc.) remain ---

  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  // Fallback scroll (kept, but IO below is preferred)
  const onScrollFallback = () => {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };

  // Prefer IntersectionObserver to detect when HERO is out of view
  const hero = document.querySelector(".hero");
  if ("IntersectionObserver" in window && hero) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          nav.classList.remove("is-scrolled");
        } else {
          nav.classList.add("is-scrolled");
        }
      },
      { root: null, rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    io.observe(hero);
  } else {
    // pages without a hero (e.g., about.html) → show CTA by default
    nav.classList.add("is-scrolled");
    window.addEventListener("scroll", onScrollFallback, { passive: true });
    onScrollFallback();
  }
});

