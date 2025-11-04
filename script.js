// script.js — global nav + CTA + mobile accordion
document.addEventListener("DOMContentLoaded", () => {
  const nav    = document.querySelector(".site-nav");
  const burger = document.querySelector(".nav-burger");
  const drawer = document.getElementById("nav-drawer");

  // --- Burger / drawer (never lock page scroll) ---
  const closeMenu = () => {
    if (!nav) return;
    nav.classList.remove("menu-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    // never touch body/html overflow here
  };

  if (burger) {
    burger.addEventListener("click", () => {
      if (!nav) return;
      const open = nav.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (drawer) {
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 901) closeMenu();
  });

  // --- CTA reveal behavior ---
  const revealCTA = () => nav?.classList.add("is-scrolled");
  const hideCTA   = () => nav?.classList.remove("is-scrolled");

  const hero = document.querySelector(".hero");
  if (hero) {
    // Home page: show CTA after user scrolls past part of the hero
    try {
      const io = new IntersectionObserver(
        ([entry]) => {
          // When hero is mostly in view -> hide CTA; when leaving -> show CTA
          if (entry.intersectionRatio > 0.55) hideCTA();
          else revealCTA();
        },
        {
          root: null,
          rootMargin: "-64px 0px 0px 0px", // account for fixed nav
          threshold: [0, 0.25, 0.55, 0.75, 1]
        }
      );
      io.observe(hero);
    } catch {
      // Fallback for older browsers: simple scroll threshold
      const onScroll = () => (window.scrollY > 10 ? revealCTA() : hideCTA());
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  } else {
    // Subpages (e.g., about.html): show CTA by default
    revealCTA();
  }

  // --- Services mobile accordion ---
  document.querySelectorAll("#services .service-item").forEach(item => {
    const btn = item.querySelector(".service-title-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        item.classList.toggle("open");
      }
    });
  });
});
