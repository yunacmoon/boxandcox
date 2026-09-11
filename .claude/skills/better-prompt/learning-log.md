# Learnings

## 2026-09-10 — Model pick for tagging 5000 support tickets by theme
**Archetype:** quick-question (model selection) about a mechanical/bulk job
**Score:** 5.2 → 8.8 · weakest dimension **Criteria (2)**
**Pick:** Haiku 4.5 · no effort param — repetitive classification at scale; the calibration set names this exact task. Opus 5 · high only for the one-off taxonomy-derivation pass, if no fixed theme list exists yet.
**Gap closed:** Raw named volume and task but nothing that changes the answer — no taxonomy (fixed list vs discovered), no accuracy bar, no one-off vs recurring pipeline, no output contract, no latency/budget. Criteria was the binding gap: without an accuracy bar and a defined theme list, "which model" is unanswerable except by assumption. Answered both branches rather than firing a clarifier, since the two-stage recipe covers the fork.
**Lesson:** "Which model for X" is really two questions when X contains hidden judgement. Tagging is mechanical; *deciding what the tags are* is not. Split the job before picking the model — the cheap tier is right for the bulk half and wrong for the taxonomy half.

## 2026-08-25 — DS Skills Library IT database email
**Archetype:** writing/content (technical email draft)
**Pick:** Sonnet · medium — human reads the exact output; not a model/strategy-shaping decision.
**Gap closed:** Raw was a voice-dictated list of symptoms (Firebase, "vibe the BCG.com", "science studios") without naming the actual technical ask. Rewrite named the real problem (Firebase project is on a personal Gmail account, not BCG-owned — same pattern as the open Anthropic-API-key ticket) and the real constraint (Vibe hosting is static-only, so IT's database has to support secure client-side access, not a server-side call) — neither was stated in the raw prompt, both came from project memory/history.
**Lesson:** When dictating a request for a technical artifact about an existing system, the constraint that makes the ask non-generic (here: static hosting → needs client-side-safe DB) is usually the thing left unsaid. Naming it up front saves a reverse-engineering pass.

## 2026-09-11 — Deploy Box&Cox site + sync Artifact preview
**Archetype:** build/code
**Score:** 4.2 → 8.6 · weakest dimension **Criteria (3)**
**Pick:** current session (Sonnet 5 · high) — bounded git/GitHub task, no model switch or subagent needed.
**Gap closed:** Raw didn't say what "아티팩트 수정" meant or which GitHub Pages method to use. Resolved without a clarifier because the prior turn had already offered "branch-deploy (recommended)" vs "Actions workflow" and the reply ("그냥 해") read as picking the recommended default, not reopening the choice. Also checked tool access before promising a live link: no MCP tool exposes the repo Settings → Pages toggle, so "deploy and give link" became exact manual steps + the predicted URL rather than a claimed-live link.
**Lesson:** A terse follow-up to an already-offered choice is an implicit pick of the recommended option, not a fresh ambiguity — re-asking here would have been friction, not care. Separately: before promising an action's *result* (a live link), verify the action is actually reachable with available tools; if not, the honest output names the gap and gives the closest deliverable (steps + predicted URL), not an optimistic claim.

## 2026-09-11 — fora.so-style image reveal for media-frame placeholders
**Archetype:** build/code
**Score:** 4.8 → 8.4 · weakest dimension **Criteria (3)**
**Pick:** current session (Sonnet 5 · high) — direct implementation, no subagent.
**Gap closed:** Raw didn't say which images/sections to target or what "이런 식으로" concretely meant (fora.so was unreachable — blocked by this sandbox's egress policy). Proceeded on a defensible default (apply to all existing `.media-frame` placeholders; build a self-contained CSS/SVG "cool/futuristic" generative visual instead of hotlinking external photos, since no image-gen tool exists and hotlinks risk rot) rather than blocking on an unreachable reference.
**Real bug caught mid-build:** first implementation put the wipe reveal (`clip-path`) directly on the same element being observed by IntersectionObserver. Chromium computes intersection using the *clipped* rendering rect, so a fully-clipped element (`inset(0 100% 0 0)`) permanently reports `intersectionRatio: 0` — a deadlock where the reveal trigger can never fire, since the very hiding mechanism blinds the observer that's supposed to end it. Verified with a raw IntersectionObserver probe before and after the fix. Fix: never clip/hide the *observed* element itself — animate a separate child overlay (`.media-curtain`) instead, so the parent's bounding box always reports its true intersection.
**Lesson:** Any scroll-reveal built on IntersectionObserver must keep the "hidden" visual state off the observed element — put it on a child curtain/overlay, never on `opacity`/`clip-path`/`visibility` of the target itself, or the observer can get blinded by its own effect. Same family of bug as the 2026-09-10 `.reveal` fix, but a second, distinct mechanism (clip-path vs. opacity) — worth checking for on every future reveal-animation feature, not just once.

## 2026-09-11 — fora.so-style dark hero with scroll-linked nav
**Archetype:** build/code (with an attached screenshot as the reference, once fora.so itself turned out unreachable)
**Score:** raw was an unscored follow-up ("이렇게 풀블리드로 동영상 들어가고... 다크모드로 해봐" + screenshot) — scoring skipped since a pasted screenshot is already close to unambiguous Target/Context; went straight to build.
**Pick:** current session (Sonnet 5 · high).
**Gap closed:** translated fora's generic "community platform" hero (dark photo bg, transparent nav, big heading, floating app-UI card) into Box&Cox's own vocabulary — heading pulled verbatim from existing brand copy ("Creation of Space Value!"→ "."), and the floating "app card" became a real featured-project showcase (수원월드컵경기장) instead of an invented UI mockup.
**Real bugs caught mid-build (2):**
1. Made `.hero-cta` reuse a `.btn` base class from memory — but `.btn`/`.btn-primary`/`.btn-ghost` had been deleted in the 09-10 corporate-content rewrite (the old casual-brand hero used them; the corporate rewrite never needed a button again). Rendered as an unstyled block until caught via computed-style inspection, not just a screenshot glance.
2. Made the header `background: transparent` on-hero, expecting the dark hero to show through — but `position: sticky` still reserves its own flow space, so "transparent" only ever revealed the plain white body background behind it, never the hero. Fixed by pulling `.hero` up under the header with `margin-top: -72px` (matched by extra `padding-top` on the hero's own content) so the two actually overlap.
**Lesson:** Two failure modes worth checking on every "reuse an old class / merge two stacked elements" move: (a) grep for a class before assuming it still exists post-refactor — a rewrite can quietly delete infrastructure a later feature assumes is still there; (b) "transparent over X" only works if the element is actually stacked over X in the paint order, not just adjacent to it in the DOM/layout — sticky/static siblings don't overlap by default, positioning has to force it.

## 2026-09-11 — Whole-site dark conversion from a full fora.so screenshot
**Archetype:** build/code (screenshot as spec)
**Score:** unscored follow-up ("이거 스크린샷 반영해서... 이런 스타일로") — the screenshot made Target/Context unambiguous; the one real fork (hero-only dark vs. whole-site dark) was genuinely load-bearing since it decides whether every section's tokens change, so it got the one clarifier via AskUserQuestion rather than a guess. User picked whole-site fixed dark.
**Pick:** current session (Sonnet 5 · high).
**What changed:** consolidated the old adaptive light/dark `--color-*` tokens and the hero-only `--hero-*` tokens into one fixed dark palette; removed the now-pointless `prefers-color-scheme` override and the header's `.on-hero` scroll-linked IntersectionObserver entirely (dead code once there's only one theme — the header can just always look the same over an always-dark page); replaced Work Scope's pill-chip tag list with a quiet dotted checklist (chips read busy at 6-7 items/column, fora's own lists are plain); added a two-column `.section-head--split` pattern (heading left, copy right) for Work Scope/Work Process, echoing fora's recurring layout; added a closing CTA band that reuses the hero's generative background to bookend the page, the way fora bookends with its mountain photo.
**Gap closed:** the request was "make it look like this" against a full-page screenshot with a SaaS product's pricing/blog/testimonial sections that don't exist in Box&Cox's actual content — the real work was separating fora's *visual system* (dark palette, card elevation, split headers, bookend CTA) from its *content shape* (pricing tiers, blog posts) and porting only the former, not inventing fake pricing or blog content to hit visual parity.
**Lesson:** "Make it look like this screenshot" is a system-extraction task, not a copy task — audit which parts of the reference are reusable visual grammar versus reference-specific content before touching code. Also: a scope-defining fork (does this restyle touch one section or the whole site?) is exactly the kind of thing worth the one clarifier even when everything else is unambiguous, because guessing wrong here means redoing the entire token system.

## 2026-09-10 — 40-name list → markdown table
**Archetype:** mechanical/bulk
**Score:** 8.2 → 8.6 — already-sharp. Weakest dimension: Target ("this list" unresolved; no list attached to the message).
**Pick:** Haiku 4.5 · no effort param (Haiku 4.5 does not support `effort`) — one right answer, no judgement.
**Gap closed:** already-sharp. One line added that genuinely changes the output: a missing-field rule (leave the cell blank, never infer), because the raw prompt lets the model silently invent a Region or drop a ragged row. The Target gap is operational rather than textual — the list has to actually be in context.
**Lesson:** On mechanical/bulk, the only scaffolding that earns its tokens is the rule for the ragged case. A role line, an XML wrap or a "be accurate" is the skill failing its own over-scaffold guardrail.
