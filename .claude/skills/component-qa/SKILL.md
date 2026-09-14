---
name: component-qa
description: >-
  Opinionated, taste-aware interactive component QA for a creative agency — replaces ui-review-checklist.
  Use when asked to "review this", "QA this component", "check this page", "component review", "UI review",
  "does this have all the states?", "test this interaction", or any request to audit a finished or
  near-finished UI artifact. Covers 10 dimensions including interaction states, keyboard nav, responsive,
  dark mode, contrast, heading hierarchy, touch targets, motion, error/loading states, and an honest
  taste rating. Agency POV — not a generic developer regression checklist. On completion: replaces
  ui-review-checklist entirely.
metadata:
  author: BCG Design Studios — Creative AI Lab
  version: "1.0"
  tags: [qa, review, components, accessibility, taste, ui]
---

# component-qa — interactive component review

Reviews any component, page, or artifact across 10 dimensions: technical correctness, accessibility,
and taste. Agency POV throughout — the goal is something a creative director would sign off on, not
just something that passes a linter.

**Replaces `ui-review-checklist`.** Once this skill is in use, ui-review-checklist is deprecated.

---

## How to run this

1. Receive the component, page, or artifact (HTML source, screenshot, URL, or description).
2. Work through all 10 dimensions in order.
3. Score each: **Pass / Partial / Fail** with a specific one-line note.
4. Issue a taste rating (1–5, with rationale).
5. List specific issues flagged with location and fix — not just "improve this."
6. Identify the 3 most critical fixes (highest risk if unaddressed).

---

## The 10-Dimension QA Checklist

### D1: Interactive states
All interactive elements must have visually distinct states for: **hover, focus, active, disabled**.

- Hover: must be more than a colour change alone — subtle scale, background shift, or underline
- Focus: must have a visible focus ring. `outline: none` without a replacement is an automatic Fail.
- Active: must look "pressed" — slight inset or darkening
- Disabled: must look genuinely unavailable — not just faded text (faded + cursor: not-allowed + reduced opacity)

**Pass:** All four states are visually distinct on every interactive element.
**Fail:** Any state is missing or indistinguishable from another.

### D2: Keyboard navigation
Tab order must be logical and all interactive elements must be reachable by keyboard.

- Tab order: left-to-right, top-to-bottom in Western layouts. Matches the reading order.
- All buttons, links, inputs, and controls: reachable via Tab.
- Dropdowns, modals, drawers: must trap focus when open. Tab inside stays inside until closed.
- Escape key: closes all overlays, modals, drawers.
- Enter/Space: activates buttons and links. Enter submits forms.
- No keyboard trap (except intentional modal trap — which must include an Escape exit).

**Pass:** Full keyboard operation possible without a mouse.
**Fail:** Any interactive element is keyboard-unreachable, or focus order is illogical.

### D3: Responsive breakpoints
Test at three widths: **360px** (small mobile), **768px** (tablet), **1280px** (desktop).

At each breakpoint:
- Content is legible — no text overflow, no truncation without ellipsis, no overlapping elements
- Touch targets are sufficient (44px minimum) — even on desktop (for touch-screen laptops)
- Layout reflows sensibly — stacks don't break, grids collapse correctly
- No horizontal overflow at any breakpoint (check `overflow-x` on html/body)

**Pass:** All three breakpoints render correctly with no layout failures.
**Fail:** Any horizontal overflow, overlapping elements, or illegible content at any breakpoint.

### D4: Dark mode
If the product has a dark mode, every component must work in it.

- No hardcoded hex colours in component code — only token/variable references
- No elements that disappear, become invisible, or lose contrast in dark mode
- Images with transparency: test that they don't invert or render poorly on dark backgrounds
- Borders and dividers: must be visible in both modes

**Pass:** Every component renders correctly and legibly in both light and dark mode.
**Fail:** Any element invisible, unreadable, or visually broken in either mode.
**N/A:** If the product intentionally has no dark mode — document this, do not mark Fail.

### D5: AA contrast
Every text element must meet WCAG 2.2 AA. **Use a contrast tool — not your eyes.**

- Normal text (< 18pt / < 14pt bold): minimum **4.5:1** ratio against background
- Large text (≥ 18pt / ≥ 14pt bold): minimum **3:1**
- Icon-only buttons: need visible text labels OR aria-labels (not a contrast check, but flag here)
- Disabled state text: ideally still meets 3:1 — failing this is acceptable if clearly disabled, but document it
- Placeholder text: must meet 4.5:1 — many designs fail this

**Pass:** All text elements meet their respective ratio thresholds.
**Fail:** Any text fails its contrast threshold. Note the specific element and measured ratio.

### D6: One-H1 rule and heading hierarchy
Every page/screen must have exactly one `<h1>`. Heading hierarchy must be logical.

- Exactly one `<h1>` per page — not zero, not two
- No heading level jumps: if h1 is followed by h3 with no h2, that's a Fail
- Screen-reader navigation via headings must tell a coherent story of the page structure
- Decorative large text styled to look like a heading but marked as a `<p>` or `<div>`: flag for accessibility

**Pass:** One h1, logical hierarchy, no skipped levels.
**Fail:** Zero or multiple h1s; skipped heading levels; heading order doesn't match visual order.

### D7: Touch targets
All interactive elements must meet the 44×44px minimum touch target size.

- This includes: icon buttons, close buttons on modals/toasts, small form controls, toggle switches
- Small visual elements can have a larger invisible tap area via padding — this is preferred over enlarging the visual
- Check in mobile browser DevTools (device simulation, then tap target inspection)

**Pass:** Every interactive element meets 44×44px.
**Fail:** Any interactive element smaller than 44×44px — note the element and measured size.

### D8: Animation and motion
Every animation must have a reduced-motion override. No animation should be impossible to turn off.

- Required: `@media (prefers-reduced-motion: reduce)` override that stops or minimally reduces every animation
- Productive motion (state changes, loading) duration: under **200ms**
- Expressive motion (page transitions, reveals) duration: under **500ms**
- No infinite loops without a user-controlled pause mechanism
- No motion that triggers nausea (rapid flashing, spinning, parallax on the main reading axis)

**Pass:** All animations have reduced-motion overrides; durations are within productive/expressive limits.
**Fail:** Any animation without a reduced-motion override.

### D9: Error and loading states
Every interactive component that can fail must have a visual error state. Every async operation must have a loading state.

- Form fields: error state is visually distinct from default and success states (not just a red border)
- Buttons with async actions: loading state (disabled + spinner or progress) while processing
- Data-loading components: skeleton or loading indicator — not a blank space
- Error state copy: follows ux-microcopy three-part pattern (what/why/action)
- Empty state for data-driven components: follows ux-microcopy three-part pattern
- Success state: clear confirmation with what happened next (not just "Success!")

**Pass:** All interactive components have appropriate error and loading states.
**Fail:** Any component can enter a visually undefined state (blank, no feedback, broken layout).

### D10: Taste check (agency POV)
Does the component look designed, or does it look like a default?

This is the most important dimension and the one generic QA tools cannot check.

Ask: Would a creative director sign off on this? Would you be proud to show it to a client?

Check specifically:
- Typography is set intentionally — not browser default size, weight, and line-height
- There is a clear visual point of view — a deliberate aesthetic direction, not random defaults
- Whitespace is used intentionally — not everything crammed edge-to-edge, not everything floating in empty space
- The hierarchy reads at a glance — the most important element is the most visually prominent
- It passes the design-taste ban list: no Inter 400 default, no purple-to-indigo SaaS gradient, no reflexive glassmorphism, no generic icon sets as decoration

**Rate using the scale below.**

---

## Taste Rating Scale

| Rating | Description |
|---|---|
| **5/5** | Distinctive, considered, would be proud to show this to a client. Has a clear creative point of view. |
| **4/5** | Solid, no obvious failures, reads as professional and intentional. |
| **3/5** | Functional but generic — passes technical QA but lacks creative point of view. Could be any AI-generated UI. |
| **2/5** | AI-slop aesthetic — looks like every other AI-generated interface. Default fonts, default gradients, no voice. |
| **1/5** | Fails multiple technical QA items AND has no aesthetic point of view. Not shippable. |

A 2/5 is a 2/5. Do not round up to be polite. The creative director needs the honest number.

---

## Output format

```
## component-qa Review — [component/page name]

### Dimension Scores
| # | Dimension | Score | Note |
|---|-----------|-------|------|
| D1 | Interactive states | Pass/Partial/Fail | [specific note] |
| D2 | Keyboard navigation | Pass/Partial/Fail | [specific note] |
| D3 | Responsive | Pass/Partial/Fail | [specific note] |
| D4 | Dark mode | Pass/Partial/Fail | [specific note] |
| D5 | AA contrast | Pass/Partial/Fail | [specific note] |
| D6 | Heading hierarchy | Pass/Partial/Fail | [specific note] |
| D7 | Touch targets | Pass/Partial/Fail | [specific note] |
| D8 | Motion | Pass/Partial/Fail | [specific note] |
| D9 | Error/loading states | Pass/Partial/Fail | [specific note] |
| D10 | Taste | [X]/5 | [rationale] |

### Issues (specific, located, actionable)
1. [Element / location]: [what's wrong] → [specific fix]
2. ...

### Top 3 critical fixes
(Highest risk if unaddressed — not just most obvious)
1. ...
2. ...
3. ...
```

---

## What to encode vs. leave to human judgment

**Encoded here:** The 10 dimensions with specific pass/fail criteria, the taste rating scale (1–5), technical thresholds (contrast ratios, touch target sizes, animation durations, heading rules).

**Left to human judgment:**
- Whether to act on the taste rating (the skill names the level; the director decides if it's acceptable for this project's bar)
- Intentional design departures that fail a generic best practice for a good reason — always flag them, but accept them with rationale

---

## Skill relationships

| Skill | Relationship |
|---|---|
| `ui-review-checklist` | **Deprecated — this skill replaces it.** |
| `brand-check` | Complementary — brand-check verifies brand token contract; component-qa verifies interaction and taste. Run both on any finished artifact. |
| `story-audit` | Complementary — story-audit reviews narrative; component-qa reviews execution quality. Sequence: story-audit → act on findings → component-qa. |
| `design-taste` | component-qa enforces what design-taste specifies. They share the same aesthetic ban list. |
