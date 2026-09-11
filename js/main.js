function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
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
            <h3>${escapeHtml(category.en)}</h3>
            <span class="scope-ko">${escapeHtml(category.ko)}</span>
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
            <div class="media-frame" data-reference="${escapeHtml(project.reference)}">
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
  renderPrologue(data.prologue);
  renderWorkScope(data.workScope);
  renderWorkProcess(data.workProcess);
  renderProjects(data.projects);

  // Reveal animations are wired up last, once all dynamic content exists.
  initRevealAnimations();
});
