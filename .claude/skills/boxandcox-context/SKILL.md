---
name: boxandcox-context
description: >-
  Full project briefing for the Box&Cox website repo -- site structure, every
  design decision made so far, known placeholders/TODOs still needing real
  client assets, installed skills, and the git/deploy workflow. Use this at
  the start of any new session on this repo (local or cloud) to get fully
  oriented before touching code, or whenever you need to recall why something
  is built the way it is. Trigger on: "get up to speed on this project",
  "box&cox context", "what's the state of this site", or when opening this
  repo for the first time in a session.
---

# Box&Cox website -- project context

Box&Cox (복스앤콕스) is a real Korean environmental-design studio, in business
30+ years, specializing since 1999 in "Space Communication" (스페이스
커뮤니케이션) -- exhibition design, environmental graphics, and signage
systems. This is their marketing/portfolio website. **All company facts,
client names, and project case studies in `js/data.js` are real** (Samsung
C&T, Hyundai Petrochemical, Kia, Korea Yakult) -- never invent additional
facts about the real company (addresses, phone numbers, history) to fill a
gap; leave it as an explicit placeholder and ask instead.

## Repo / deploy facts

- GitHub: `yunacmoon/boxandcox`, **public** visibility.
- `main` is the primary branch (created 2026-09-14, holds full history --
  see CLAUDE.md). The old `claude/boxandcox-website-4pbxgk` branch is legacy,
  not primary anymore, but still exists as a remote branch.
- GitHub Pages is live at `https://yunacmoon.github.io/boxandcox/`, autobuilt
  by GitHub's own `pages-build-deployment` workflow whenever its configured
  source branch updates. The repo owner needs to manually confirm (GitHub
  Settings -> General -> Default branch, and Settings -> Pages -> source)
  that both now point at `main`, not the old branch.
- Primary development has moved to the owner's local machine
  (`/Users/yunamoon/Documents/GitHub/boxandcox` on her Mac, using local
  Claude Code + GitHub Desktop). A cloud/remote Claude Code session has no
  filesystem access to that Mac at all -- they are different machines.
- `scripts/git-hooks/pre-commit` blocks committing a new/updated file under
  `assets/` over 300KB unless `ALLOW_ASSET_COMMIT=1` is set. Activate once
  per machine with `git config core.hooksPath scripts/git-hooks`. Intent:
  quick/mobile sessions should only reshuffle which existing asset is
  referenced where (edit `js/data.js`), never add new asset files -- that's
  a deliberate desktop decision.
- A cloud/sandboxed Claude Code session's network egress is heavily
  restricted (fora.so, Unsplash, even this repo's own GitHub Pages URL were
  all unreachable from inside one) -- that limitation does not apply to a
  local session on a real machine.

## Site structure

Two real pages (not a single-page-with-anchors site anymore):

- **`index.html`** -- the homepage, section order top to bottom:
  1. Hero (`#prologue`) -- video background (cycles 3 videos), grain/wave
     canvas overlay, small `<h1>` heading (deliberately shrunk), and a
     bottom-bookend slider (`#heroLogoMark`) that cycles the logo with 3
     English word-pairs ("Spatial *Stories*" / "Immersive *Form*" / "Beyond
     *Space*", serif regular+italic) sliding left every ~5s. Each word
     phrase is measured and sized in JS (`fitWordSlide` in `js/main.js`) to
     fill ~97% of the width edge-to-edge like the logo does -- this required
     fixing a real bug where a flex child's `width:100%` made
     `el.scrollWidth` report the container's width instead of the text's
     actual width, so every phrase rendered at the same size regardless of
     length.
  2. Prologue / philosophy -- "Our philosophy", 30+ year stat, two body
     blocks (the first now opens with a stated problem -- "많은 기업들이
     공간을 통해 브랜드를 전달하고자 하지만, 전략 없이 만들어진 환경은
     오히려 메시지를 흐리게 합니다" -- added so the narrative names a
     problem before the credentials pitch, per a story-audit finding).
  3. **Projects ("Selected works")** -- moved up here from the bottom of the
     page. See "Selected Works card stack" below for the interaction detail
     -- this is the most heavily-iterated component on the site.
  4. Punch statement band.
  5. Work Scope -- Exhibition + Environment category cards.
  6. **Work Process** -- now a hero-sized section (`min-height:100vh`),
     reference image removed, the step carousel enlarged to be the section's
     whole visual weight. Fixed a real layout-shift bug here: the active
     step's description used to animate `max-height: 0 -> 200px`, which
     changed the row's total height on every carousel tick (~2.6s) and
     shoved every block below it up and down. Fixed by giving the
     description a **fixed reserved height always**, active or not, and
     only animating opacity.
  7. **Clients marquee** -- moved down here from where Projects used to be
     (right after Prologue). Portrait (3:4) rounded tiles, each showing a
     randomly-assigned placeholder photo + client name caption, looping
     seamlessly right-to-left forever (two identical tile sets, animated
     exactly -50%, pauses on hover, disabled under reduced-motion).
  8. Closing CTA ("Let's create together") -- button now reads "프로젝트
     문의하기" and links to `contact.html` (previously said "프로젝트 보기"
     and linked back to `#projects`, which a story-audit review flagged: the
     site's one true next-step button was pointing backward into content
     already seen instead of forward to actually starting a conversation).

- **`contact.html`** -- a real separate page (not a scroll section). Three
  location cards: Headquarters/본사, Factory/팩토리, Design Lab/디자인 랩,
  bilingual headings, each with Address/Tel/Email fields. **These fields are
  still placeholder text** ("주소 정보 준비 중입니다" etc.) -- the owner
  said there will be 3-4 real addresses with those exact labels, but hasn't
  supplied the actual address/phone/email values yet. Do not fabricate real
  business contact details; ask for them or keep the placeholder wording.

- Navigating between the two pages (the logo, "Contact Us", and the
  homepage-section links shown on `contact.html`) fades the page out first
  via `initPageTransitions()` in `js/main.js`, so it reads as a page
  transition rather than an instant jump. `main.js`'s `DOMContentLoaded`
  handler guards on `window.SITE_DATA` being present -- `contact.html`
  doesn't load `js/data.js`, so it only gets the page-wide behavior (nav,
  transitions, reveal animations), not the homepage's render pipeline.

- Header: sticky, 96% width (not full-bleed), rounded bottom-left/right
  corners. Logo links to `index.html` on both pages (a real home button).
  Mobile hamburger is 44x44px (was 32px, under the WCAG touch-target
  minimum), toggles its own `aria-label` between 열기/닫기, and Escape
  closes the open mobile nav.

## Selected Works card stack (the most-iterated component)

Went through three real designs before landing on the current one -- worth
knowing the reasoning so it doesn't get re-litigated from scratch:

1. First version: a small 64px thumbnail on the right side of each collapsed
   accordion row. Replaced per explicit request for something that looks
   like "real overlapping cards."
2. Second version: full-width rounded image at the TOP of each card,
   cards heavily overlapped (`margin-top: -195px`), **descending** z-index
   (first card in front). This got explicitly corrected:
3. **Current version**: the toggle row (title) is now the FIRST child of
   each card, the image band is SECOND (below it). Z-index is **ascending**
   (`z-index: index + 1`, set inline per card in `main.js`) -- the first
   card sits at the very bottom of the stack, each later card is in front of
   it, and the last card is fully visible with nothing covering it. Putting
   the toggle row first means a card's clickable title is never the part
   that gets covered by the card in front -- only the decorative image below
   it is, leaving just its top edge peeking out. The box-shadow direction is
   `0 -20px 30px -8px` (negative/upward) so it's cast by the front card
   *onto* the peeking sliver of the card behind it.

   Clicking a card's toggle also adds `.is-expanded` to that `.project-card`,
   and `.project-card.is-expanded + .project-card { margin-top: var(--space-3) }`
   drops the very next card back to a normal gap (animated via
   `transition: margin-top 0.5s ease`) -- since every later card is stacked
   in front, this un-stacks the whole tail of the list below it and brings
   the clicked card's full image into view instead of a peeking sliver.
   Collapsing restores the original overlap exactly. Verified by clicking
   the *second* card specifically and confirming cards 3/4/5 all cascade
   down through normal flow (no manual repositioning needed for them).

## Images / placeholders -- what's real vs. temporary

- `assets/placeholders/` holds 5 generic "cool/futuristic" photos the owner
  pasted early on (a blue exhibition signage tower, a green-blob event wall,
  a Louis Vuitton wave sculpture storefront, an orange reception desk, a
  brown office interior). These are randomly assigned across the project
  cards and client marquee tiles -- **they do not depict the actual named
  clients/projects**, they're pure stand-ins.
- Two of them, `ph-reception.jpg` and `ph-office-wall.jpg`, carry a visible
  tiled **Stocksy watermark** and a `stocksy.com/...` credit line -- fine as
  temporary placeholders, **not cleared for a public/client-facing deploy**.
  Flag this again before the site goes live for real.
- The owner is now receiving real client assets and will organize them
  herself into a new local folder -- when real photos arrive, they replace
  the `assets/placeholders/*` references in `js/data.js` (`photo` fields)
  and the three static `media-frame` images in `index.html`
  (prologue/work-scope/work-process sections).

## Accessibility / quality fixes already applied

(From a component-qa + story-audit + ux-microcopy review pass -- see git log
around "Quality pass" commit.)

- CTA button text was white-on-`#f75c03` (3.24:1, fails WCAG AA) -- now dark
  ink on the same orange (6.18:1). Also fixed a real specificity bug found
  while verifying this: the scroll-reveal system's `.reveal-anim` class set
  `color: var(--reveal-from/--reveal-to, inherit)` with higher CSS
  specificity than `.hero-cta`'s own color rule, so the button's intended
  color had never actually rendered, before or after the token fix, until an
  explicit `.hero-cta.reveal-anim` override was added.
- `.project-title` lives inside a `<button>`, whose content model only
  allows phrasing content (a real `<h3>` there is invalid HTML) -- uses
  `role="heading" aria-level="3"` instead, so it's still reachable via
  screen-reader heading navigation.
- Reduced-motion (`prefers-reduced-motion: reduce`) is guarded everywhere
  there's a CSS `@keyframes` animation or a JS-driven motion loop (hero
  video cycle, hero word slider, process carousel, client marquee, grain
  canvas, reveal-on-scroll) -- verified 1:1 coverage, don't remove these
  guards when touching that code.

## Skills installed in this repo (`.claude/skills/`)

- `better-prompt` -- the prompt-strengthening front door (this skill file
  was itself produced by it).
- From a "web design skills" bundle (uploaded zip, one family, cross-
  reference guards to `ds-design-system`/`bcg-deck`/`brand-skill-generator`
  are inert since this isn't BCG-branded work): `modern-tech-editorial`,
  `dashboard-ux`, `ax-patterns`, `artifact-ux`, `ux-microcopy`, `en`,
  `component-qa`, `story-audit`. `dashboard-ux`/`ax-patterns`/`artifact-ux`
  don't really apply to this project (no dashboard, no AI-agent UI, not a
  Claude artifact) but are installed anyway.

## CLAUDE.md already has

- Always respond to the user in Korean; code/commits/comments stay English.
- `main` is the primary branch.
- Only commit assets actually wired into the site, never raw/unused dumps.
- Mobile/lightweight sessions should only reshuffle existing assets via
  `js/data.js`, never add new asset files.
