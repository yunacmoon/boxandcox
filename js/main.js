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
  // A mailto: handled by a webmail (e.g. Gmail in Chrome) would otherwise
  // replace this page with the compose window; open it in a new tab so the
  // site stays where the visitor left it. Native mail apps ignore target.
  if (cta.ctaHref.startsWith("mailto:")) {
    link.target = "_blank";
    link.rel = "noopener";
  }
}

function renderPrologue(data) {
  document.getElementById("prologueTagline").textContent = data.tagline;
  document.getElementById("prologueBody").textContent = data.body;
  initPrologueSlider(data.slides || []);
}

// Crossfading slideshow of project hero photos. Slides are stacked and
// faded with CSS; this just rotates the active one, pauses on hover, and
// lets the dots jump to a slide.
function initPrologueSlider(slides) {
  const slider = document.getElementById("prologueSlider");
  const track = document.getElementById("prologueSlides");
  const dots = document.getElementById("prologueDots");
  if (!slider || !slides.length) return;

  track.innerHTML = slides
    .map(
      (slide, i) =>
        `<img src="${escapeHtml(slide.src)}" alt="${escapeHtml(slide.alt || "")}" ${i === 0 ? 'class="is-active"' : 'loading="lazy"'} draggable="false" />`
    )
    .join("");
  dots.innerHTML = slides
    .map(
      (slide, i) =>
        `<button type="button" role="tab" aria-label="${i + 1} / ${slides.length}" aria-selected="${i === 0}"${i === 0 ? ' class="is-active"' : ""}></button>`
    )
    .join("");

  const imgs = Array.from(track.children);
  const buttons = Array.from(dots.children);
  let current = 0;
  let timer = null;

  const show = (i) => {
    imgs[current].classList.remove("is-active");
    buttons[current].classList.remove("is-active");
    buttons[current].setAttribute("aria-selected", "false");
    current = (i + slides.length) % slides.length;
    imgs[current].classList.add("is-active");
    buttons[current].classList.add("is-active");
    buttons[current].setAttribute("aria-selected", "true");
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = () => {
    if (prefersReducedMotion || slides.length < 2 || timer) return;
    timer = setInterval(() => show(current + 1), 4500);
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      show(i);
      stop();
      start();
    });
  });
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  start();
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
/* ── Selected works corridor ──────────────────────────────────────
 * Two rails of cards riding out of the vanishing point. Three things
 * shape the path, and each fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically -- each card
 *    is a constant ratio bigger than the one behind it, all the way
 *    out. Spacing a straight z-range evenly instead makes the near
 *    cards tear apart from each other as the projection blows up.
 * 2. The rails open hard in the first stretch and then hold (fan > 1).
 *    That opening cancels the -- still slow -- growth back there, so
 *    the ribbon leaves the centre as a flat band, bends once, and only
 *    then runs out on the diagonal. Parallel rails project to a
 *    straight cone with no bend at all.
 * 3. Neither end of the loop is ever on screen. A card dies with its
 *    inner edge well past the frame, and it is born *across* the axis
 *    (railBirth is negative), so the newest card starts on the far
 *    side and sweeps back through the centre. That plugs the throat:
 *    the axis stays covered at every instant, and a newborn lands
 *    behind cards that already cover it, so it needs no fade in.
 *
 * All lengths are cqw -- see .works-stream in style.css.
 * ─────────────────────────────────────────────────────────────── */
const WORKS_PATH = {
  perspective: 30, // strength of the projection; lower is wider-angle
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6, // on-screen card height at the waist, where a card is born
  exitHeight: 46, // on-screen card height as it leaves the frame
  railBirth: -11, // negative: born across the axis (note 3)
  railExit: 44,
  fan: 3.3, // >1 opens early then holds (note 2)
  turnBirth: 6,
  turnExit: 28,
  stops: 24, // keyframe stops tracing the curve
};

const WORKS_CARDS = 11; // per rail; more cards is a denser ribbon, not a faster one
const WORKS_SPEED = 20; // seconds for one card to travel the corridor
const WORKS_AXIS = 55; // % of height; must match perspective-origin in the CSS

// Sample the path once so the CSS keyframes trace the real curve.
function worksKeyframes(dir, name, p) {
  const steps = [];
  for (let i = 0; i <= p.stops; i++) {
    const u = i / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant
    // size ratio and the ribbon stays solid at both ends (note 1).
    const scale =
      (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

function buildWorksStream(projects) {
  const rails = document.getElementById("worksStreamRails");
  if (!rails) return;

  // Small, pre-cropped copies of the project covers -- the corridor never
  // shows a card larger than a few hundred pixels.
  const images = projects
    .map((project) => project.streamPhoto)
    .filter(Boolean);
  if (!images.length) return;

  const p = WORKS_PATH;
  const style = document.createElement("style");
  style.textContent =
    worksKeyframes(1, "works-rail-r", p) + worksKeyframes(-1, "works-rail-l", p);
  document.head.appendChild(style);

  const markup = [];
  ["works-rail-r", "works-rail-l"].forEach((name, railIndex) => {
    for (let i = 0; i < WORKS_CARDS; i++) {
      // Offsetting the left rail's starting image keeps the corridor from
      // reading as a mirror at the waist, where both sides are adjacent.
      const src = images[(i + railIndex * 3) % images.length];
      markup.push(`
        <div class="works-card" style="
          left:50%; top:${WORKS_AXIS}%;
          width:${p.cardWidth}cqw; height:${p.cardHeight}cqw;
          margin-left:${-p.cardWidth / 2}cqw; margin-top:${-p.cardHeight / 2}cqw;
          border-radius:${p.cardRadius}cqw;
          animation:${name} ${WORKS_SPEED}s linear infinite;
          animation-delay:${(-(i * WORKS_SPEED) / WORKS_CARDS).toFixed(3)}s;
        "><img src="${escapeHtml(src)}" alt="" decoding="async" draggable="false" /></div>
      `);
    }
  });
  rails.innerHTML = markup.join("");
}

// Only the first few projects get the full photo-card treatment; the rest
// would be a wall of images, so they become title-only rows that open into
// the same panel. The deck fades out at its bottom edge into that list.
const FEATURED_PROJECTS = 3;

function projectMarkup(project, index, variant) {
  const slider = `<div class="project-card-image">${projectGallery(project)}</div>`;
  return `
    <article class="${variant === "row" ? "project-row" : "project-card"} reveal"${
      variant === "row" ? "" : ` style="z-index: ${index + 1}"`
    }>
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
      ${variant === "row" ? "" : slider}
      <div class="project-panel" id="project-panel-${index}" aria-hidden="true" inert>
        <div class="project-panel-inner">
          ${variant === "row" ? slider : ""}
          <dl class="project-facts">
            ${projectFacts(project)}
          </dl>
          ${project.description ? `<p class="project-desc">${escapeHtml(project.description)}</p>` : ""}
        </div>
      </div>
    </article>
  `;
}

function wireProject(card, onToggle) {
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

  // Expanded height is width * ratio (ratio comes from CSS so the mobile
  // breakpoint can change it); an explicit px value on both ends is what
  // lets the height transition run.
  const fitSlider = () => {
    if (!card.classList.contains("is-expanded")) return;
    const ratio =
      parseFloat(getComputedStyle(slider).getPropertyValue("--slider-ratio")) || 0.5625;
    slider.style.height = `${Math.round(slider.clientWidth * ratio)}px`;
  };
  window.addEventListener("resize", fitSlider);

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    if (open) panel.removeAttribute("inert");
    else panel.setAttribute("inert", "");
    // In the deck, every card after this one is stacked on top of it (see
    // the fanned z-index in projectMarkup); dropping its own overlap with
    // the very next card un-stacks the tail of the list below it.
    card.classList.toggle("is-expanded", open);
    if (open) {
      // In a row the slider lives inside the panel, so it has no width
      // until the panel is laid out.
      requestAnimationFrame(fitSlider);
    } else {
      slider.style.height = ""; // back to the collapsed band in CSS
      goTo(0); // collapse back to the cover photo
    }
    if (onToggle) onToggle(open);
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  // Clicking the peeking cover strip opens the card; once open, the image
  // itself is inert and the arrows do the navigating.
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
}

function renderProjects(projects) {
  const list = document.getElementById("projectList");
  const rows = document.getElementById("projectRows");

  const featured = projects.slice(0, FEATURED_PROJECTS);
  const rest = projects.slice(FEATURED_PROJECTS);

  list.innerHTML = featured
    .map((project, i) => projectMarkup(project, i, "card"))
    .join("");
  if (rows) {
    rows.innerHTML = rest
      .map((project, i) => projectMarkup(project, FEATURED_PROJECTS + i, "row"))
      .join("");
  }

  // The fade only makes sense while the deck is a closed stack -- over an
  // open card it would just grey out what the reader opened.
  let openCards = 0;
  list.querySelectorAll(".project-card").forEach((card) =>
    wireProject(card, (open) => {
      openCards += open ? 1 : -1;
      list.classList.toggle("is-open", openCards > 0);
    })
  );
  if (rows) {
    rows.querySelectorAll(".project-row").forEach((card) => wireProject(card));
  }
}

/* ── Process orbit ────────────────────────────────────────────────
 * A sphere of points turning slowly behind the process steps.
 *
 * Three choices do the work:
 *
 * 1. Points are placed on a Fibonacci spiral, not at random. Random
 *    points on a sphere clump into patches and leave bald spots that
 *    rotate past as obvious blotches; the golden-angle spiral covers the
 *    surface evenly, which is what makes it read as one solid object.
 * 2. Radius is jittered per point, so the points sit in a thin shell
 *    rather than exactly on a surface. A perfect surface reads as a wire
 *    balloon; a shell reads as volume.
 * 3. Size, brightness and colour all key off the same depth term, so a
 *    point fades and shrinks toward blue as it goes round the back. That
 *    single cue is what separates the far hemisphere from the near one --
 *    without it the sphere flattens into a disc.
 * ─────────────────────────────────────────────────────────────── */
const ORBIT_POINTS = 1500;
const ORBIT_TILT = -0.28; // radians; a slight lean so the poles are visible

function initProcessOrbit() {
  const canvas = document.getElementById("processOrbit");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Golden-angle spiral: even coverage with no clumping (note 1).
  const golden = Math.PI * (3 - Math.sqrt(5));
  const points = [];
  for (let i = 0; i < ORBIT_POINTS; i++) {
    const y = 1 - (i / (ORBIT_POINTS - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // Thin shell rather than an exact surface (note 2).
    const r = 0.88 + Math.random() * 0.12;
    points.push({
      x: Math.cos(theta) * ring * r,
      y: y * r,
      z: Math.sin(theta) * ring * r,
      // A minority of points stay ultramarine at full brightness, so the
      // field has some colour in it instead of reading as grey dust.
      tint: Math.random() < 0.28,
    });
  }

  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;
  let dpr = 1;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Off to the right on wide screens, where the copy isn't; centred once
    // the layout stacks and there is no free side.
    cx = w < 860 ? w * 0.5 : w * 0.68;
    // Sized against the viewport, not the section: stacked on a phone this
    // section runs several screens tall, and keying off that would give a
    // sphere far bigger than anyone ever sees at once.
    radius = Math.min(w * 0.34, Math.min(h, window.innerHeight) * 0.44);
  };

  // Follow the part of the section that is actually on screen. Anchoring
  // to the section's own middle puts the sphere hundreds of pixels below
  // the fold on tall, stacked layouts.
  const recentre = () => {
    const rect = canvas.getBoundingClientRect();
    const top = Math.max(0, -rect.top);
    const bottom = Math.min(rect.height, window.innerHeight - rect.top);
    cy = bottom > top ? (top + bottom) / 2 : rect.height / 2;
  };

  const DEPTH = 2.7; // camera distance, in sphere radii

  const draw = (angle) => {
    recentre();
    ctx.clearRect(0, 0, w, h);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const cosT = Math.cos(ORBIT_TILT);
    const sinT = Math.sin(ORBIT_TILT);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      // Spin about Y, then lean about X.
      const x1 = p.x * cosA - p.z * sinA;
      const z1 = p.x * sinA + p.z * cosA;
      const y2 = p.y * cosT - z1 * sinT;
      const z2 = p.y * sinT + z1 * cosT;

      const k = DEPTH / (DEPTH - z2); // perspective divide
      const sx = cx + x1 * radius * k;
      const sy = cy + y2 * radius * k;

      const depth = (z2 + 1) / 2; // 0 at the back, 1 at the front (note 3)
      // Squared on both, so the far hemisphere drops away fast and the
      // near one keeps its weight -- a linear ramp leaves the two reading
      // at much the same strength and the sphere goes flat.
      const alpha = 0.05 + depth * depth * 0.75;
      const size = 0.3 + depth * depth * 1.9;

      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = p.tint
        ? `rgba(122, 146, 240, ${alpha})`
        : `rgba(226, 232, 248, ${alpha * 0.85})`;
      ctx.fill();
    }
  };

  resize();
  window.addEventListener("resize", resize);

  if (prefersReducedMotion) {
    draw(0.6);
    window.addEventListener("scroll", () => draw(0.6), { passive: true });
    return;
  }

  let angle = 0;
  let last = 0;
  let frame = null;

  const tick = (now) => {
    // Advance by elapsed time, not per frame, so the spin keeps its pace
    // through a dropped frame or after the tab has been in the background.
    const dt = last ? Math.min(now - last, 100) : 16;
    last = now;
    angle += dt * 0.000085; // ~one revolution per 75s
    draw(angle);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = null;
  };

  // Only run while the section is actually on screen.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
      },
      { rootMargin: "120px" }
    ).observe(canvas);
  } else {
    start();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
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

  // Plays in order, looping back to 00. Encoded from assets/03_Videos
  // (outer folder) at 1080p max, H.264 CRF 26, no audio track; clip 03
  // is trimmed to start at 2.6s (skips the laptop mockup intro) and clip
  // 00 is cut to its first 5.3s (the stand pan, before the shot change).
  const sources = [
    "assets/hero-video-00.mp4",
    "assets/hero-video-01.mp4",
    "assets/hero-video-02.mp4",
    "assets/hero-video-03.mp4",
    "assets/hero-video-04.mp4",
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
    // The display face loads async (font-display: swap); the width measured
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
  renderPunch(data.punch);
  renderWorkScope(data.workScope);
  renderWorkProcess(data.workProcess);
  buildWorksStream(data.projects);
  renderProjects(data.projects);
  renderCta(data.cta);

  initProcessOrbit();

  // Reveal animations are wired up last, once all dynamic content exists.
  initRevealAnimations();
  initProcessCarousel();
});
