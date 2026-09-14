function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderHero(hero) {
  document.getElementById("heroEyebrow").textContent = hero.eyebrow;
  document.getElementById("heroHeading").textContent = hero.heading;
  document.getElementById("heroSub").textContent = hero.sub;

  const cta = document.getElementById("heroCta");
  cta.textContent = hero.ctaLabel;
  cta.href = hero.ctaHref;
}

function renderCta(cta) {
  document.getElementById("ctaHeadingEn").textContent = cta.headingEn;
  document.getElementById("ctaHeadingKo").textContent = cta.headingKo;

  const link = document.getElementById("ctaCta");
  link.textContent = cta.ctaLabel;
  link.href = cta.ctaHref;
}

function renderPrologue(data) {
  const container = document.getElementById("prologueBlocks");
  container.innerHTML = data.blocks
    .map(
      (block) => `
        <div class="prologue-block reveal">
          <h3 class="tagline">${escapeHtml(block.tagline)}</h3>
          <p>${escapeHtml(block.body)}</p>
        </div>
      `
    )
    .join("");

  if (data.stat) {
    const stat = document.getElementById("prologueStat");
    stat.innerHTML = `
      <span class="prologue-stat-number">${escapeHtml(data.stat.number)}</span>
      <span class="prologue-stat-label">${escapeHtml(data.stat.labelKo)}</span>
    `;
  }
}

function renderClients(clients) {
  const track = document.getElementById("clientTrack");
  const tiles = clients
    .map(
      (client) => `
        <span class="client-tile">
          <img src="${escapeHtml(client.photo)}" alt="" loading="lazy" />
          <span class="client-tile-name">${escapeHtml(client.name)}</span>
        </span>
      `
    )
    .join("");

  // A short list (the "big three") is shown as a static row; a longer
  // list falls back to the looping marquee, which needs two identical
  // sets back to back (see the -50% loop in .client-track's animation).
  // The second copy is purely visual, so it's hidden from assistive tech.
  if (clients.length <= 4) {
    track.closest(".client-marquee").classList.add("client-marquee--static");
    track.innerHTML = `<div class="client-tile-set">${tiles}</div>`;
    return;
  }

  track.innerHTML = `
    <div class="client-tile-set">${tiles}</div>
    <div class="client-tile-set" aria-hidden="true">${tiles}</div>
  `;
}

function renderPunch(punch) {
  document.getElementById("punchTextEn").textContent = punch.en;
  document.getElementById("punchTextKo").textContent = punch.ko;
}

function tagList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderWorkScope(data) {
  document.getElementById("workScopeIntro").textContent = data.intro;

  const list = document.getElementById("workScopeList");
  list.innerHTML = data.categories
    .map(
      (category) => `
        <article class="scope-card reveal">
          <div class="scope-card-head">
            <h3 class="card-heading-en">${escapeHtml(category.en)}</h3>
            <p class="card-heading-ko">${escapeHtml(category.ko)}</p>
          </div>
          <p>${escapeHtml(category.description)}</p>
          <div class="scope-meta">
            <div>
              <h4>Work Scope</h4>
              <ul class="tag-list">${tagList(category.scope)}</ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul class="tag-list">${tagList(category.services)}</ul>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderWorkProcess(data) {
  document.getElementById("workProcessIntro").textContent = data.intro;
  document.getElementById("processLabel").textContent = data.label;

  const steps = document.getElementById("processSteps");
  steps.innerHTML = data.steps
    .map(
      (step, index) => `
        <li class="process-step reveal${index === 0 ? " is-active" : ""}">
          <span class="process-number">${escapeHtml(step.step)}</span>
          <div class="process-body">
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.desc)}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function initProcessCarousel() {
  const container = document.getElementById("processSteps");
  if (!container) return;

  const steps = Array.from(container.querySelectorAll(".process-step"));
  if (steps.length < 2) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  let current = steps.findIndex((step) => step.classList.contains("is-active"));
  if (current === -1) current = 0;
  let timer = null;

  function activate(index) {
    steps[current].classList.remove("is-active");
    current = index;
    steps[current].classList.add("is-active");
  }

  function start() {
    timer = setInterval(() => {
      activate((current + 1) % steps.length);
    }, 2600);
  }

  function stop() {
    clearInterval(timer);
  }

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index === current) return;
      stop();
      activate(index);
      start();
    });
  });

  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);

  start();
}

// Only facts that actually have a value are rendered -- photo-only
// projects don't carry a confirmed year or location yet.
function projectFacts(project) {
  const facts = [
    ["Client", project.client],
    ["Year Completed", project.year],
    ["Location", project.location],
    ["Scope of Service", project.scope],
  ];
  return facts
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <div>
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `
    )
    .join("");
}

// The one-line summary under the card title: "client · year" when both
// exist, otherwise whichever of client / scope is available.
function projectMeta(project) {
  return [project.client, project.year].filter(Boolean).join(" · ") || project.scope;
}

function projectGallery(project) {
  const photos = [project.photo].concat(project.photos || []);
  const slides = photos
    .map(
      (src, i) =>
        `<img src="${escapeHtml(src)}" alt="" loading="${i === 0 ? "eager" : "lazy"}" draggable="false" />`
    )
    .join("");
  const nav =
    photos.length > 1
      ? `
        <button class="project-slider-btn project-slider-prev" type="button" aria-label="이전 이미지" disabled>
          <span class="project-slider-arrow" aria-hidden="true">&larr;</span>
          <span class="project-slider-label">Previous</span>
        </button>
        <button class="project-slider-btn project-slider-next" type="button" aria-label="다음 이미지">
          <span class="project-slider-label">Next</span>
          <span class="project-slider-arrow" aria-hidden="true">&rarr;</span>
        </button>
        <span class="project-slider-count" aria-live="polite">01 / ${String(photos.length).padStart(2, "0")}</span>
      `
      : "";
  return `
    <div class="project-slider" data-count="${photos.length}" data-index="0">
      <div class="project-slider-track">${slides}</div>
      ${nav}
    </div>
  `;
}

// One card = a title row + a photo slider + the facts panel. Collapsed,
// the slider is a cropped cover strip peeking out of the deck; expanded,
// the same slider grows to its full frame and the arrows let you step
// through the rest of that project's photos in place -- no thumbnails.
function renderProjects(projects) {
  const list = document.getElementById("projectList");
  list.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal" style="z-index: ${index + 1}">
          <button
            class="project-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="project-panel-${index}"
          >
            <span class="project-toggle-head">
              <span class="project-title" role="heading" aria-level="3">${escapeHtml(project.title)}</span>
              <span class="project-meta">${escapeHtml(projectMeta(project))}</span>
            </span>
            <span class="project-toggle-icon" aria-hidden="true"></span>
          </button>
          <div class="project-card-image">
            ${projectGallery(project)}
          </div>
          <div class="project-panel" id="project-panel-${index}" aria-hidden="true" inert>
            <div class="project-panel-inner">
              <dl class="project-facts">
                ${projectFacts(project)}
              </dl>
              ${project.description ? `<p class="project-desc">${escapeHtml(project.description)}</p>` : ""}
            </div>
          </div>
        </article>
      `
    )
    .join("");

  list.querySelectorAll(".project-card").forEach((card) => {
    const button = card.querySelector(".project-toggle");
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const slider = card.querySelector(".project-slider");
    const track = slider.querySelector(".project-slider-track");
    const prev = slider.querySelector(".project-slider-prev");
    const next = slider.querySelector(".project-slider-next");
    const count = slider.querySelector(".project-slider-count");
    const total = Number(slider.dataset.count);

    const goTo = (i) => {
      const clamped = Math.max(0, Math.min(total - 1, i));
      slider.dataset.index = String(clamped);
      track.style.transform = `translateX(-${clamped * 100}%)`;
      if (prev) prev.disabled = clamped === 0;
      if (next) next.disabled = clamped === total - 1;
      if (count) {
        count.textContent = `${String(clamped + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      }
    };

    // Expanded height is width * ratio (ratio comes from CSS so the
    // mobile breakpoint can change it); an explicit px value on both ends
    // is what lets the height transition run.
    const fitSlider = () => {
      if (!card.classList.contains("is-expanded")) return;
      const ratio = parseFloat(getComputedStyle(slider).getPropertyValue("--slider-ratio")) || 0.5625;
      slider.style.height = `${Math.round(slider.clientWidth * ratio)}px`;
    };
    window.addEventListener("resize", fitSlider);

    const setOpen = (open) => {
      button.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      if (open) panel.removeAttribute("inert");
      else panel.setAttribute("inert", "");
      // Every card after this one sits stacked on top of it (see the
      // fanned z-index in the template above); dropping its own overlap
      // with the very next card is what un-stacks the whole tail of the
      // list below it and brings this card fully into view.
      card.classList.toggle("is-expanded", open);
      if (open) {
        fitSlider();
      } else {
        slider.style.height = ""; // back to the collapsed band in CSS
        goTo(0); // collapse back to the cover photo
      }
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    // Clicking the peeking cover strip opens the card; once open, the
    // image itself is inert and the arrows do the navigating.
    track.addEventListener("click", () => {
      if (!card.classList.contains("is-expanded")) setOpen(true);
    });

    if (prev) {
      prev.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(Number(slider.dataset.index) - 1);
      });
      next.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(Number(slider.dataset.index) + 1);
      });
      slider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goTo(Number(slider.dataset.index) - 1);
        if (e.key === "ArrowRight") goTo(Number(slider.dataset.index) + 1);
      });
    }
  });
}

function initRevealAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    return;
  }

  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => {
    el.classList.add("reveal-anim");
    observer.observe(el);
  });
}

function initHeroVideoCycle() {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  const sources = [
    "assets/hero-video-2.mp4",
    "assets/hero-video-1.mp4",
    "assets/hero-video-3.mp4",
  ];
  let index = 0;

  video.addEventListener("ended", () => {
    index = (index + 1) % sources.length;
    video.style.opacity = 0;
    setTimeout(() => {
      video.src = sources[index];
      video.load();
      video.play().catch(() => {});
      video.style.opacity = 1;
    }, 400);
  });
}

function initGrainCanvases() {
  const canvases = document.querySelectorAll(".grain-canvas");
  if (!canvases.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Very fine, dense grid -- each canvas pixel is stretched to a tiny
  // square by the CSS `image-rendering: pixelated` on .grain-canvas. The
  // "wave" that makes the grain ripple is pure CSS now (.grain-wave, an
  // animated gradient blended against these dots -- see style.css), so
  // this only has to redraw the dot pattern itself, and only when it
  // refreshes (every ~1.4s) rather than every animation frame. A per-pixel
  // JS loop running every frame at this resolution measured ~27fps with
  // visible stutter; redrawing this rarely, it's a non-issue regardless of
  // grid size.
  const GRID_W = 2160;
  const GRID_H = 1200;
  const DOT_CHANCE = 0.24;
  const REFRESH_INTERVAL = 1400;

  function drawRandomMask(ctx) {
    const imageData = ctx.createImageData(GRID_W, GRID_H);
    const buf = imageData.data;
    for (let i = 0; i < buf.length; i += 4) {
      const on = Math.random() < DOT_CHANCE ? 255 : 0;
      buf[i] = on;
      buf[i + 1] = on;
      buf[i + 2] = on;
      buf[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  canvases.forEach((canvas) => {
    canvas.width = GRID_W;
    canvas.height = GRID_H;
    const ctx = canvas.getContext("2d");
    drawRandomMask(ctx);
    if (!prefersReducedMotion) {
      setInterval(() => drawRandomMask(ctx), REFRESH_INTERVAL);
    }
  });
}

function fitWordSlide(el) {
  const container = el.parentElement;
  const maxFontSize = container.clientHeight * 0.62;
  const targetWidth = container.clientWidth * 0.97;

  el.style.fontSize = "100px";
  const measuredWidth = el.scrollWidth || 1;
  const fontSize = Math.min(
    maxFontSize,
    Math.max(24, (targetWidth / measuredWidth) * 100)
  );
  el.style.fontSize = `${fontSize}px`;
}

function initHeroWordSlider() {
  const slider = document.getElementById("heroLogoMark");
  const currentEl = document.getElementById("heroSlideCurrent");
  const nextEl = document.getElementById("heroSlideNext");
  if (!slider || !currentEl || !nextEl) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const words = [
    { regular: "Spatial", italic: "Stories" },
    { regular: "Immersive", italic: "Form" },
    { regular: "Beyond", italic: "Space" },
  ];

  const LOGO_MARKUP =
    '<img class="hero-slide-logo-img" src="assets/logo.png" alt="Box&amp;Cox" /><span class="hero-logo-sweep"></span>';

  // Sequence: logo, word, logo, word, logo, word -- then repeats.
  function renderSlide(el, index) {
    if (index % 2 === 0) {
      el.innerHTML = LOGO_MARKUP;
      return;
    }
    const word = words[((index - 1) / 2) % words.length];
    el.innerHTML = `<span class="hero-slide-word"><span class="hero-word-regular">${escapeHtml(
      word.regular
    )}</span><span class="hero-word-italic">${escapeHtml(
      word.italic
    )}</span></span>`;
    const wordEl = el.querySelector(".hero-slide-word");
    fitWordSlide(wordEl);
    // Playfair Display loads async (font-display: swap); the width measured
    // against a fallback font before it's ready can be off, so refit once
    // the real webfont is actually active.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => fitWordSlide(wordEl));
    }
  }

  let index = 0;
  const DWELL_MS = 5000;
  const TRANSITION_MS = 900;

  function tick() {
    setTimeout(() => {
      const nextIndex = index + 1;
      renderSlide(nextEl, nextIndex);
      slider.classList.add("is-sliding");

      setTimeout(() => {
        slider.classList.add("is-resetting");
        slider.classList.remove("is-sliding");
        currentEl.innerHTML = nextEl.innerHTML;
        nextEl.innerHTML = "";
        void slider.offsetWidth; // force reflow before re-enabling transitions
        slider.classList.remove("is-resetting");
        index = nextIndex;
        tick();
      }, TRANSITION_MS);
    }, DWELL_MS);
  }

  window.addEventListener("resize", () => {
    const wordEl = currentEl.querySelector(".hero-slide-word");
    if (wordEl) fitWordSlide(wordEl);
  });

  tick();
}

function initNav() {
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  // On the home page the logo scrolls back to the top instead of
  // reloading the page (contact.html keeps a plain link to index.html).
  const logoHome = document.getElementById("logoHome");
  if (logoHome) {
    logoHome.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname);
    });
  }

  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "메뉴 열기");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });
}

// Cross-page navigation (the logo, "Contact Us", and any link back from
// contact.html into an index.html section) fades the page out first instead
// of jumping straight to the next document, so it reads as a page
// transition rather than a scroll.
function initPageTransitions() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    if (link.target === "_blank") return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && !url.hash) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(() => {
        window.location.href = url.href;
      }, 260);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SITE_DATA;

  initNav();
  initPageTransitions();
  initGrainCanvases();

  // Pages without SITE_DATA (e.g. contact.html) have no dynamic content to
  // wait on, so their .reveal elements can be wired up immediately. The
  // rest of this pipeline renders the homepage's own sections and would
  // error against elements that only exist on index.html.
  if (!data) {
    initRevealAnimations();
    return;
  }

  initHeroVideoCycle();
  initHeroWordSlider();
  renderHero(data.prologue.hero);
  renderPrologue(data.prologue);
  renderClients(data.clients);
  renderPunch(data.punch);
  renderWorkScope(data.workScope);
  renderWorkProcess(data.workProcess);
  renderProjects(data.projects);
  renderCta(data.cta);

  // Reveal animations are wired up last, once all dynamic content exists.
  initRevealAnimations();
  initProcessCarousel();
});
