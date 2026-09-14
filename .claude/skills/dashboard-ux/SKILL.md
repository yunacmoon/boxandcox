---
name: dashboard-ux
description: >-
  Layout, hierarchy, and UX patterns for data dashboards and tool interfaces.
  Use when the user is building a dashboard, analytics view, metrics page, KPI
  panel, or data tool — or asks about chart types, empty states, loading states,
  demo data, demo mode, or how to structure data for a pitch or daily use.
  Trigger even if they don't say "dashboard" but are clearly designing a
  data-heavy interface. Do not use for static marketing pages, slide decks, or
  editorial layouts (use ds-design-system or bcg-deck instead).
metadata:
  author: BCG Design Studios — Creative AI Lab
  version: "1.0"
  tags: [dashboard, data-viz, ux, layout, kpi, demo-mode]
---

# dashboard-ux — data interface layout & UX patterns

Opinionated, agency-quality guidance for making data legible, scannable, and
demo-worthy. Covers layout hierarchy, chart selection, empty/loading states, and
the critical demo vs. live mode split. This is structure — chain to
`ds-design-system` or `modern-tech-editorial` for visual style after.

---

## Step 0 — MANDATORY gate (do this before anything else)

Ask the user **two questions** before generating any layout or component:

> **1. What is the one question this dashboard answers?**
> (State it in a single sentence. If you can't, the dashboard is not ready to design.)
>
> **2. Is this for daily use or for a demo / pitch?**
> (This changes the entire output — see Demo vs. Live mode below.)

Do not skip these. A technically correct prototype built without answering Q1
will fail to communicate. A live-mode design shown in a pitch will fail to land.

---

## Layout — the inverted pyramid

Every dashboard has three zones, top to bottom:

### Zone 1 — Hero (top row)
- **3–5 headline KPIs only.** Large number, clear label, direction indicator
  (delta / trend arrow / colour). No more than 5 — each added card dilutes the rest.
- This row **is the story**. A cold viewer should state the dashboard's purpose
  in under 10 seconds by reading this row alone.
- Everything below is evidence for these numbers.
- Scan-order: place the **primary metric top-left** (F-pattern entry point).
  Filters and controls go top-right — out of the primary scan path but reachable when needed.

### Zone 2 — Context (middle band)
- Trend charts and supporting context that answers: *why are the heroes that value?*
- Time range controls live here — they govern this zone primarily.
- Max 2 focal charts in demo mode; full complexity allowed in live mode.

### Zone 3 — Detail (bottom)
- Tables, breakdowns, secondary filters. For users who drill in.
- **In demo mode:** collapsed or hidden by default — surface only on request.
- **In live mode:** always visible.
- Responsive: tables scroll horizontally; critical columns pinned left.
  Consider card-per-row alternative for very wide tables on mobile.

---

## Demo mode vs. live mode

This distinction is the most common reason technically correct prototypes fail
in pitches. Apply the right profile before building any view.

| | Live mode | Demo mode |
|---|---|---|
| Data | Real, messy, edge cases | Curated, illustrative, aspirational |
| Opening state | Logged-in, mid-flow | Must answer "what is this?" in 10 sec |
| Empty state | Error to prevent | Opportunity — show pre-populated placeholder |
| Detail zone | Always visible | Hidden by default, available on request |
| Chart complexity | Full complexity | 1–2 focal charts, clearly labelled |
| Secondary nav | Full | Minimal — guide the eye, don't scatter it |

**The Calendly principle:** show the end state (a filled calendar), not the
setup wizard. In demo mode, the dashboard should look like it's been in use for
months — not like a fresh install waiting for data.

---

## Chart decision tree

Pick the chart type that matches the story the data tells.

| Story | Chart |
|---|---|
| Change over time (1–3 metrics) | Line chart (one line per metric) |
| Change over time (1 metric, fill matters) | Area chart (fill to baseline) |
| Part-to-whole (≤3 segments) | Horizontal bar or donut |
| Part-to-whole (4+ segments) | Horizontal bar chart or treemap |
| Distribution | Histogram or dot plot |
| Ranking / snapshot comparison | Horizontal bar, sorted high-to-low |
| Correlation (only if correlation IS the story) | Scatter plot |
| Correlation (correlation is context, not story) | Two bar charts side by side |

**Never use:**
- 3D charts (distorts perception — no exceptions)
- Dual-axis charts (confuses scale — only if data source requires it AND you label both axes explicitly)
- Pie charts with 4+ segments
- Decorative visualisations with no data role
- Stacked area charts for anything other than part-to-whole over time

Chart choices must be **defended**, not random. State which story you're telling before picking the chart type.

---

## Empty state rules

Never show a blank, uncommunicative empty state. Every empty state needs three parts:

**Pattern:** `[What this shows] · [Why it's empty] · [CTA to fix it]`

**Example:** "No campaigns yet — your first campaign's results will appear here. [Create campaign →]"

Optionally add a subtle ghost/preview of the populated state so the user
understands what they're building toward. Especially valuable in demo mode where
an empty state signals "this isn't real."

---

## Loading state rules

- **Skeleton screens** over spinners for content areas. Skeleton shapes must
  match the actual content shape — not generic grey rectangles.
- **Spinners only** for transactional button presses (save, submit, run).
- **Progressive loading text** beats static "Loading…":
  `"Loading your data… → Preparing charts… → Almost there"`
- Never block the hero zone — load KPI cards individually and show them as
  they resolve. Partial data with skeletons is better than a blank screen.

---

## Density rules

Business users read tables, not cards. Default to higher density than consumer products.

- Minimum touch target: **44px** even in dense mode.
- Use condensed type scale (0.8× standard) for: labels, meta text, table cells
  only. Never for headings or KPI values.
- Dark backgrounds work better for data-heavy interfaces: less visual noise,
  better contrast for charts, better focal point control. Light mode is valid
  but requires more intentional whitespace to prevent crowding.

---

## Responsive behaviour

| Zone | ≥1024px | 768–1023px | <768px |
|---|---|---|---|
| Hero | 3–5 KPIs in a row | 2–3 per row | Full-width stacked cards |
| Context | Side-by-side charts | Single column | Single column; date range moves to top |
| Detail | Full table | Full table, h-scroll | Card-per-row or h-scroll; critical cols pinned left |

---

## Scan-order principle

F-pattern and Z-pattern are documented eye-tracking behaviours for data interfaces.

- Most important metric: **top-left** (F-pattern entry point).
- Supporting context: left-to-right, top-to-bottom.
- Filters and controls: **top-right** — out of primary scan path, available when needed.
- In demo mode: guide the eye deliberately. Remove anything that competes with the primary story.

---

## What to encode vs. human judgment

**Encoded here (apply consistently):**
- Layout zones and their order
- Demo vs. live mode profile
- Chart decision tree
- Empty/loading state copy patterns
- Density rules and touch targets
- Scan-order placement

**Left to human judgment (surface the question, don't decide silently):**
- Which specific charts tell this data's story best (the tree narrows; the human decides if the story matches)
- How much detail in the hero zone (depends on audience expertise)
- Dark vs. light theme (both valid — rules above apply to both)
- Which specific demo data to populate
- Whether to split one complex dashboard into two focused views

---

## Self-audit before "done"

- [ ] Gate answered: one-question and demo/live mode confirmed?
- [ ] Cold viewer can state primary purpose in <10 seconds from hero zone alone?
- [ ] Demo mode and live mode outputs look clearly different (not minor variations)?
- [ ] Every empty state has the 3-part pattern (what/why/CTA)?
- [ ] Chart type is defended against the decision tree?
- [ ] Skeleton shapes match content shapes?
- [ ] No banned chart types (3D, dual-axis unlabelled, pie 4+ segments)?
- [ ] Primary metric is top-left?

---

## Skill relationships

- **Chain after this:** `ds-design-system` or `modern-tech-editorial` — this skill is layout/UX; visual style layer comes after.
- **Complementary:** `story-audit` — covers the narrative angle on top of this skill's data structure layer.
- **Apply after (if applicable):** `artifact-ux` — if the dashboard is a Claude artifact, apply artifact-ux constraints after this.
- **Replaces:** `ui-review-checklist` data-tool-specific guidance entirely.
