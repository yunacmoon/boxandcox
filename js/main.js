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
    .map((name) => `<span class="client-tile">${escapeHtml(name)}</span>`)
    .join("");

  // Two identical sets back to back -- see the -50% loop in
  // .client-track's animation. The second copy just repeats the same
  // names for the visual loop, so it's hidden from assistive tech.
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

function renderProjects(projects) {
  const list = document.getElementById("projectList");
  list.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal">
          <button
            class="project-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="project-panel-${index}"
          >
            <span class="project-toggle-head">
              <span class="project-title">${escapeHtml(project.title)}</span>
              <span class="project-meta">${escapeHtml(project.client)} · ${escapeHtml(project.year)}</span>
            </span>
            <span class="project-toggle-icon" aria-hidden="true"></span>
          </button>
          <div class="project-panel" id="project-panel-${index}" hidden>
            <div class="media-frame reveal-anim" data-reference="${escapeHtml(project.reference)}">
              <img class="media-photo" src="${escapeHtml(project.photo)}" alt="" loading="lazy" />
              <span class="media-curtain" aria-hidden="true"></span>
              <span class="media-label">${escapeHtml(project.reference)}</span>
            </div>
            <dl class="project-facts">
              <div>
                <dt>Client</dt>
                <dd>${escapeHtml(project.client)}</dd>
              </div>
              <div>
                <dt>Year Completed</dt>
                <dd>${escapeHtml(project.year)}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>${escapeHtml(project.location)}</dd>
              </div>
              <div>
                <dt>Scope of Service</dt>
                <dd>${escapeHtml(project.scope)}</dd>
              </div>
            </dl>
            ${project.description ? `<p class="project-desc">${escapeHtml(project.description)}</p>` : ""}
          </div>
        </article>
      `
    )
    .join("");

  list.querySelectorAll(".project-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(
        button.getAttribute("aria-controls")
      );
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;

      if (!isOpen) {
        const media = panel.querySelector(".media-frame");
        // Trigger the wipe reveal fresh each time the panel opens.
        media.classList.remove("is-visible");
        void media.offsetWidth; // restart the CSS transition
        requestAnimationFrame(() => media.classList.add("is-visible"));
      }
    });
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

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SITE_DATA;

  initNav();
  initHeroVideoCycle();
  initHeroWordSlider();
  initGrainCanvases();
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
