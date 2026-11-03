(() => {
  const loader = document.querySelector(".loader");
  const bar = document.querySelector(".loader__bar span");

  const finishLoader = () => {
    if (!loader) return;
    gsap.to(bar, {
      width: "100%",
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        loader.classList.add("is-done");
        document.body.classList.add("is-ready");
        initPage();
      },
    });
  };

  if (bar) {
    gsap.to(bar, {
      width: "70%",
      duration: 0.7,
      ease: "power1.inOut",
      onComplete: finishLoader,
    });
  } else {
    initPage();
  }

  function initPage() {
    gsap.registerPlugin(ScrollTrigger);

    // Nav scroll state
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile nav
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelector(".nav__links");
    toggle?.addEventListener("click", () => {
      toggle.classList.toggle("is-open");
      links?.classList.toggle("is-open");
    });
    links?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle?.classList.remove("is-open");
        links.classList.remove("is-open");
      });
    });

    // Active link
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("is-active");
      }
    });

    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (document.querySelector(".hero")) {
      heroTl
        .from(".hero__media img", { scale: 1.18, duration: 1.6 }, 0)
        .from(".hero__brand", { y: 80, opacity: 0, duration: 1 }, 0.15)
        .from(".hero__tag", { y: 40, opacity: 0, duration: 0.8 }, 0.35)
        .from(".hero__actions .btn", { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.5)
        .from(".hero__meta > div", { y: 20, opacity: 0, stagger: 0.08, duration: 0.55 }, 0.65)
        .from(".hero__scroll", { opacity: 0, duration: 0.6 }, 0.9);

      gsap.to(".hero__media img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Page hero
    if (document.querySelector(".page-hero")) {
      gsap.from(".page-hero .eyebrow, .page-hero .display, .page-hero .lead", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });
    }

    // Generic reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
        },
      });
    });

    gsap.utils.toArray(".reveal-left").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    gsap.utils.toArray(".reveal-right").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Cap cards stagger
    if (document.querySelector(".cap-grid")) {
      gsap.from(".cap-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cap-grid", start: "top 80%" },
      });
    }

    // Stats count-up
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toLocaleString("en-IN") + suffix;
            },
          });
        },
      });
    });

    // Team cards
    if (document.querySelector(".team-grid")) {
      gsap.from(".team-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
      });
    }

    // Gallery filter + lightbox
    const filterBtns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const show = filter === "all" || item.dataset.cat === filter;
          gsap.to(item, {
            opacity: show ? 1 : 0.18,
            scale: show ? 1 : 0.97,
            duration: 0.35,
            pointerEvents: show ? "auto" : "none",
          });
        });
      });
    });

    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox?.querySelector("img");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!lightbox || !lightboxImg || !img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("is-open");
      });
    });
    lightbox?.querySelector(".lightbox__close")?.addEventListener("click", () => {
      lightbox.classList.remove("is-open");
    });
    lightbox?.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("is-open");
    });

    // Contact form
    const form = document.querySelector(".contact-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      success?.classList.add("is-visible");
      form.reset();
      gsap.fromTo(
        success,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 }
      );
    });

    // Magnetic buttons subtle
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.12, y: y * 0.12, duration: 0.3 });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      });
    });
  }
})();
