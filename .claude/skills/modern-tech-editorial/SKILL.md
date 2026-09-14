---
name: modern-tech-editorial
description: >-
  A complete editorial-style design system for work where no house brand applies — no Figma, no
  brand PDF, no DS or BCG identity. Use when asked to "build this landing page" or "create a
  dashboard" with no brand context, or for "make this look like a proper tech product", "agnostic
  style", "editorial style", "modern tech aesthetic", "not BCG, not DS brand — just clean and
  premium", or references to a "Linear-style", "Vercel aesthetic", "Stripe feel", or
  "developer-tool look". Do NOT use for DS-branded work (use ds-design-system) or client work
  where a Figma or brand PDF exists (use brand-skill-generator first).
---

# modern-tech-editorial

**Version:** 1.0 — 2026-07-02
**For:** BCG Design Studios Creative AI Lab — client and agnostic work
**Pairs with:** `design-taste` (run first), `ds-design-system` (DS-branded work uses that instead), `artifact-ux`, `uplift`

---

## What this skill does

Provides a complete, opinionated editorial-style system for client and internal work where neither DS brand nor BCG brand applies. This is the positive scaffold — the working system — that complements `design-taste`'s list of bans.

**The gap it fills:** You need something that looks high-quality, modern, and designed — but there is no house style, no Figma, no PDF. You need something to commit to and build from. This skill gives you that system in full.

---

## When to activate

Trigger phrases:
- "build this landing page" / "create a dashboard" without an explicit brand context
- "make this look like a proper tech product"
- "agnostic style", "editorial style", "modern tech aesthetic"
- "not BCG, not DS brand — just clean and premium"
- References to: "Linear-style", "Vercel aesthetic", "Stripe feel", "developer-tool look"

Do NOT activate for:
- DS Creative AI branded work — use `ds-design-system`
- Client work where a Figma or brand PDF exists — use `brand-skill-generator` first

---

## MANDATORY GATE — before generating anything

**Step 1 — Aesthetic brief.** Before generating any component or token block, ask:

> "One sentence: what should this feel like? Reference one product or world, and name one thing to suppress."

Example: "This should feel like Linear — precise, calm, developer-grade — not a marketing site."

If the user cannot answer, generate the token system but flag that the brief is missing and component-level decisions will default to the system baseline.

**Step 2 — Accent selection.** Present these two options and require the user to pick one before proceeding:

| Option | Hex | Feeling |
|--------|-----|---------|
| Cyan Electric | `#00d4ff` | Developer tool, cool, precise |
| Deep Violet | `#7c3aed` | Product, editorial, depth |

A third option: user may supply their own single accent hex. If they do, commit to it — do not suggest modifications.

**Do not generate anything until you have both a brief and an accent choice.**

---

## The committed system — commit to this, do not present alternatives

### Color — dark theme (`:root` default)

```css
:root {
  /* Canvas + surfaces — 4 stops only, no more */
  --color-canvas:           #16181c;
  --color-surface:          #1e2025;
  --color-elevated:         #252830;
  --color-border:           rgba(255,255,255,0.08);

  /* Accent — commit to one hue (chosen at brief gate) */
  --color-accent:           /* INSERT CHOSEN HEX */;
  --color-accent-hover:     color-mix(in srgb, var(--color-accent) 80%, white);
  --color-accent-subtle:    color-mix(in srgb, var(--color-accent) 12%, transparent);

  /* Text */
  --color-text-primary:     rgba(255,255,255,0.92);
  --color-text-secondary:   rgba(255,255,255,0.55);
  --color-text-tertiary:    rgba(255,255,255,0.35);
  --color-text-on-accent:   #ffffff;

  /* Feedback */
  --color-success:          #22c55e;
  --color-warning:          #f59e0b;
  --color-error:            #ef4444;
  --color-error-subtle:     rgba(239,68,68,0.12);
}
```

**Hard rules on color:**
- Neutral scale is exactly 4 stops: canvas / surface / elevated / border. No more.
- Accent appears on: primary CTA, active state indicator, focus ring. Nothing else.
- No hex values in component code — only `var(--color-*)` references.
- Not `#000000`, not `#111` — always `#16181c` for canvas.

### Color — light theme override

```css
:root[data-theme="light"],
.light {
  --color-canvas:           #fafafa;
  --color-surface:          #ffffff;
  --color-elevated:         #f4f4f5;
  --color-border:           rgba(0,0,0,0.08);

  /* Accent token is the same — accent is theme-agnostic */

  --color-text-primary:     rgba(0,0,0,0.88);
  --color-text-secondary:   rgba(0,0,0,0.50);
  --color-text-tertiary:    rgba(0,0,0,0.30);
  --color-text-on-accent:   #ffffff;
}
```

The light theme is not an afterthought. Test it, do not just declare it.

---

### Typography

**Primary:** `"Inter Variable", system-ui, sans-serif`
- Weight range: 450–520. Never 400 (default Inter renders visually thin — the most common Inter failure).
- Optical size: use `font-optical-sizing: auto` or `font-variation-settings: 'opsz' 14`.

**Display / editorial moments — pick one at the brief stage:**
- `Sohne` — authoritative, editorial, warm precision
- `Reckless Neue` — fashionable, high-contrast, expressive
- `Editorial New` — serif editorial, unexpected in tech contexts

If none is available, fall back to `"Inter Variable"` at weight 600+. Do not substitute a different display font.

**Mono (data, code, labels):** `"Berkeley Mono", "JetBrains Mono", ui-monospace, monospace`

**Type scale — 8 stops, rem only:**

```css
:root {
  --text-xs:   0.6875rem;  /* 11px */
  --text-sm:   0.8125rem;  /* 13px */
  --text-base: 0.9375rem;  /* 15px */
  --text-lg:   1.0625rem;  /* 17px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5625rem;  /* 25px */
  --text-3xl:  2rem;       /* 32px */
  --text-4xl:  3rem;       /* 48px */
}
```

Line height: 1.4–1.5 for body, 1.1–1.2 for display headings.

---

### Spacing — 8px base grid

```css
:root {
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-8:    32px;
  --space-10:   40px;
  --space-12:   48px;
  --space-16:   64px;
  --space-20:   80px;
  --space-24:   96px;
  --space-32:  128px;
}
```

---

### Layout grammar

- Max content width: `1200px`. Centered with `margin-inline: auto`.
- Standard gutter: `--space-6` (24px) inner, `--space-8` (32px) outer (mobile: `--space-4`).
- Grid: CSS Grid preferred. Base: `repeat(12, 1fr)` with `gap: var(--space-6)`.
- Section vertical rhythm: `padding-block: var(--space-20)` desktop, `var(--space-12)` mobile.

---

### Border radius

```css
:root {
  --radius:    6px;
  --radius-sm: calc(var(--radius) - 2px);  /* 4px */
  --radius-lg: calc(var(--radius) + 4px);  /* 10px */
  --radius-xl: calc(var(--radius) + 10px); /* 16px */
  --radius-full: 9999px;                   /* pill — use only for badges/tags */
}
```

Not `0` (too harsh). Not `999px` as default (too soft). `--radius: 6px` is the commit.

---

### Shadow — chromatic, not gray

```css
:root {
  --shadow-sm:
    0 1px 2px rgba(0,0,0,0.30);

  --shadow-md:
    0 1px 3px rgba(0,0,0,0.40),
    0 1px 2px rgba(0,0,0,0.30);

  --shadow-lg:
    0 4px 16px rgba(0,0,0,0.50),
    0 2px 6px rgba(0,0,0,0.30);

  --shadow-overlay:
    0 8px 32px rgba(0,0,0,0.60),
    0 4px 12px rgba(0,0,0,0.40);

  /* When accent tint is appropriate: */
  --shadow-accent: 0 0 0 1px var(--color-accent), var(--shadow-md);
}
```

---

### Motion

**Productive motion (state changes, confirmations):**
- Duration: `100–200ms`
- Easing: `cubic-bezier(0.2, 0, 0, 1)`
- Use for: hover state, active state, focus ring, toggle

**Expressive motion (reveals, entrances):**
- Duration: `300–500ms`
- Easing: `cubic-bezier(0, 0, 0.2, 1)`
- Use for: page entrance, modal open, skeleton-to-content reveal
- Limit: **one expressive moment per screen**

**Required reduced-motion override — always include:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## Hard ban list

These apply in addition to `design-taste` bans. Do not use:

- Inter at weight 400 (the default) — always set 450–520
- Purple-to-indigo gradient on a white or light background
- Glassmorphism as the primary aesthetic (`backdrop-filter: blur` + semi-transparent panels)
- Floating action buttons as the primary CTA
- Lucide icons — use Heroicons, Phosphor, or Tabler instead
- Gradient text as the primary headline technique
- Animated gradient backgrounds as the primary visual treatment
- Hardcoded hex values in component code — only token references

---

## Outputs — produce all five for every use

**Output 1 — CSS custom property token block**
Full `:root` dark + `.light` override. Insert chosen accent hex. Copy-paste ready.

**Output 2 — Typography declaration**
Named font pair (which display font chosen or skipped), full scale table, weight and optical-size settings.

**Output 3 — Layout grammar summary**
Grid system, max-width, spacing scale reference table, section rhythm rules.

**Output 4 — Motion rule set**
Productive + expressive categories with durations, easings, and the reduced-motion override block.

**Output 5 — DESIGN.md companion file**
The AI-consumable handoff artifact. Generate this every time. Template below.

---

## DESIGN.md template

Generate a file named `DESIGN.md` at the project root. This is the portable context file — any fresh Claude Code session can consume it and produce on-system output.

```markdown
# [Project name] DESIGN.md

_Generated by modern-tech-editorial · [date]_

## Overview

[2-sentence description: what this product is and what the visual direction is.]

Aesthetic brief: "[the one sentence brief from the gate]"

## Tokens

[PASTE FULL :root BLOCK HERE]
[PASTE .light BLOCK HERE]

## Typography

| Role | Font | Weight | Size token | Line height |
|------|------|--------|------------|-------------|
| Body | Inter Variable | 470 | --text-base | 1.5 |
| Label / UI | Inter Variable | 500 | --text-sm | 1.4 |
| Display heading | [chosen display font or Inter 600] | 600 | --text-3xl / --text-4xl | 1.15 |
| Mono / data | Berkeley Mono | 400 | --text-sm | 1.6 |

## Spacing

Base grid: 8px.

| Token | Value |
|-------|-------|
| --space-2 | 8px |
| --space-4 | 16px |
| --space-6 | 24px |
| --space-8 | 32px |
| --space-16 | 64px |

## Color usage

| Token | Use case |
|-------|----------|
| --color-canvas | Page background |
| --color-surface | Cards, panels, sidebars |
| --color-elevated | Dropdowns, popovers, modals |
| --color-border | Dividers, input strokes |
| --color-accent | Primary CTA, active state, focus ring ONLY |
| --color-text-primary | Body, headings |
| --color-text-secondary | Labels, meta, captions |
| --color-text-tertiary | Disabled, placeholder |

## Motion

Productive (state changes): 100–200ms · cubic-bezier(0.2, 0, 0, 1)
Expressive (entrances, reveals): 300–500ms · cubic-bezier(0, 0, 0.2, 1)
One expressive moment per screen maximum.
Always include prefers-reduced-motion override.

## Component patterns

[Fill in 5–10 named patterns after building. Examples:]
- Card: --color-surface, --radius-lg, --shadow-sm, padding --space-6
- Button primary: --color-accent bg, --color-text-on-accent, --radius, 44px min height
- Input: --color-surface bg, --color-border stroke, focus ring --color-accent
- Tag / badge: --color-accent-subtle bg, --color-accent text, --radius-full, --text-xs

## Constraints

### Do
- Use token references only — never hardcoded hex values
- Keep neutral scale to exactly 4 stops (canvas / surface / elevated / border)
- Reserve accent for interactive affordances only (CTA, active, focus)
- Provide both dark and light theme implementations
- Include reduced-motion override on every animation

### Do not
- Use Inter at weight 400
- Apply gradient text to primary headlines
- Use glassmorphism as a primary surface treatment
- Use Lucide icons (use Heroicons, Phosphor, or Tabler)
- Use animated gradient backgrounds as the primary visual
- Hardcode colors — only var(--color-*) in component code

## Generation brief

For any AI agent picking this up fresh:

This design should feel: [PASTE THE AESTHETIC BRIEF HERE]
Reference world: [product / aesthetic reference the user named]
Suppress: [what the user wants to avoid]
Theme default: dark (:root). Light available via .light class.
Accent: [hex value and name]
```

---

## What to encode vs. leave to human judgment

**Encode (this skill decides):**
The full token set and exact values, the named type stack, the spacing scale, the motion curves, the hard bans, the DESIGN.md template structure.

**Leave to human (gate before building):**
- Which accent hue (2 options + custom — user picks before generation)
- Whether to use the display font or stay system-only
- Dark-primary or light-primary as the live default
- Any brand personality layered on top of this neutral system

**The brief gate:** Without an aesthetic brief sentence, generate the system but flag that component-level decisions default to "calm, precise, developer-grade." Ask again before building the first component.

---

## Skill chain — where this sits

| Comes before | Comes after |
|---|---|
| `design-taste` (bans framing) | `artifact-ux` (medium constraints) |
| `brand-skill-generator` (if client has assets) | `dashboard-ux` (layout layer) |
| | `uplift` (motion polish) |
| | `component-qa` (QA pass) |

- `ds-design-system` — parallel, not competing. DS-branded work uses that; client/agnostic work uses this.
- `brand-skill-generator` — runs instead of this when a client has Figma or brand PDF. This skill generates the starting point when they have nothing.

---

## Quality bar

- A designer who picks up the CSS output and builds a screen with it produces something that looks like a deliberate design, not a random combination of defaults.
- The DESIGN.md output is consumable by a fresh Claude Code session with no other context and produces on-system results.
- The light theme does not feel like an afterthought.
- No hex values appear anywhere in component code — only token references.
