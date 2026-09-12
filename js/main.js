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
  const list = document.getElementById("clientList");
  list.innerHTML = clients
    .map((name) => `<li class="reveal">${escapeHtml(name)}</li>`)
    .join("");
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

  // Fine, dense grid -- each canvas pixel is stretched to a tiny square by
  // the CSS `image-rendering: pixelated` on .grain-canvas.
  const GRID_W = 480;
  const GRID_H = 270;
  const DOT_CHANCE = 0.16;
  // How long one crossfade between two random frames takes -- long + eased
  // so it reads as a slow shimmering wave rather than a hard flicker.
  const WAVE_DURATION = 1100;

  function randomFrame() {
    const arr = new Uint8ClampedArray(GRID_W * GRID_H * 4);
    for (let i = 0; i < arr.length; i += 4) {
      const on = Math.random() < DOT_CHANCE ? 255 : 0;
      arr[i] = on;
      arr[i + 1] = on;
      arr[i + 2] = on;
      arr[i + 3] = 255;
    }
    return arr;
  }

  function easeInOutSine(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
  }

  const instances = Array.from(canvases).map((canvas) => {
    canvas.width = GRID_W;
    canvas.height = GRID_H;
    const ctx = canvas.getContext("2d");
    return {
      ctx,
      imageData: ctx.createImageData(GRID_W, GRID_H),
      from: randomFrame(),
      to: randomFrame(),
      // Stagger each canvas's cycle so multiple grain layers on the page
      // don't pulse in lockstep.
      start: Math.random() * WAVE_DURATION,
    };
  });

  instances.forEach(({ ctx, imageData, from }) => {
    imageData.data.set(from);
    ctx.putImageData(imageData, 0, 0);
  });

  if (prefersReducedMotion) return;

  function tick(now) {
    instances.forEach((inst) => {
      const elapsed = now - inst.start;
      if (elapsed < 0) return;

      let t = elapsed / WAVE_DURATION;
      if (t >= 1) {
        inst.from = inst.to;
        inst.to = randomFrame();
        inst.start = now;
        t = 0;
      }

      const eased = easeInOutSine(t);
      const buf = inst.imageData.data;
      const from = inst.from;
      const to = inst.to;
      for (let i = 0; i < buf.length; i += 4) {
        const v = from[i] + (to[i] - from[i]) * eased;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      inst.ctx.putImageData(inst.imageData, 0, 0);
    });
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
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
