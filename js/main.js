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

function renderHeroFeature(projects) {
  const project = projects[0];
  const el = document.getElementById("heroFeature");
  el.innerHTML = `
    <div class="media-frame reveal" data-reference="${escapeHtml(project.reference)}">
      <span class="media-curtain" aria-hidden="true"></span>
      <span class="media-label">${escapeHtml(project.reference)}</span>
    </div>
    <div class="hero-feature-body">
      <div>
        <p class="hero-feature-label">FEATURED PROJECT</p>
        <h3 class="hero-feature-title">${escapeHtml(project.title)}</h3>
        <p class="hero-feature-meta">${escapeHtml(project.client)} · ${escapeHtml(project.year)}</p>
      </div>
      <a href="#projects" class="hero-feature-cta">자세히 보기</a>
    </div>
  `;
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
      (step) => `
        <li class="process-step reveal">
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
  renderHero(data.prologue.hero);
  renderHeroFeature(data.projects);
  renderPrologue(data.prologue);
  renderWorkScope(data.workScope);
  renderWorkProcess(data.workProcess);
  renderProjects(data.projects);
  renderCta(data.cta);

  // Reveal animations are wired up last, once all dynamic content exists.
  initRevealAnimations();
});
