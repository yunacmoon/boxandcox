---
name: ax-patterns
description: >-
  UX patterns for products with AI agents inside them — the six trust patterns that make agentic
  actions legible, governable, and safe. Use when building any tool where an AI model takes actions
  on behalf of a user. Trigger on: "AI agent UI", "agentic interface", "agent UX", "show what the
  AI is doing", "AI transparency", "AI oversight", "autonomy controls", "AI confidence indicator",
  "audit log", "action history", "AI explainability", "agent escalation", "when the AI isn't sure",
  or any tool where Claude or another AI model acts on behalf of the user. Do not use for general
  UX review (use component-qa) or static dashboards (use dashboard-ux).
metadata:
  author: BCG Design Studios — Creative AI Lab
  version: "1.0"
  tags: [agentic, ux, ai, trust, patterns, AX, agent-experience]
---

# ax-patterns — Agentic UX Trust Patterns

The six trust patterns that make AI agent actions legible, governable, and recoverable.
Every pattern has a HTML/CSS implementation starter. Apply `modern-tech-editorial` or
`ds-design-system` on top for visual style.

---

## When to use this

Apply whenever a product has an AI agent that takes actions on behalf of a user — creating, deleting,
sending, organising, scheduling, or deciding anything. The stakes determine which patterns to apply
(see decision matrix below). Patterns 2 and 5 are non-negotiable for all agentic products.

---

## Step 0 — Assess the stakes

Before selecting patterns, classify the agent's actions:

| Stakes level | Example actions | Required patterns |
|---|---|---|
| **High** | Deleting data, sending comms, purchases, irreversible changes | All 6 |
| **Medium** | Creating drafts, organising files, scheduling, config changes | 1, 2, 5 required; 3, 4, 6 recommended |
| **Low** | Suggesting options, generating drafts for review, summarising | 3, 4 sufficient |
| **Baseline (all agentic products)** | Any agentic feature regardless of stakes | 2 + 5 always |

---

## Pattern 1: Intent Preview

Show what the agent plans to do **before** it acts.

**Rule:** For every consequential action, the agent must show a preview before executing. The preview must be:
- **Specific** — not "I will help you" → "I will delete 3 files and create 2 new ones in /reports/"
- **Reversible** — user can cancel or modify before confirming
- **Time-bounded** — if no response in X seconds, the agent waits; it does not proceed autonomously

**Never:** announce an action has been taken without prior preview for consequential operations.

```html
<!-- Intent Preview card -->
<div class="ax-intent-preview" role="alertdialog" aria-labelledby="intent-title">
  <div class="ax-intent-header">
    <span class="ax-intent-icon" aria-hidden="true">⚡</span>
    <h3 id="intent-title">About to take 3 actions</h3>
  </div>
  <ol class="ax-intent-steps">
    <li>Delete <strong>Q2-Report-Draft.pdf</strong> from /documents/</li>
    <li>Create <strong>Q2-Report-Final.pdf</strong> in /reports/approved/</li>
    <li>Notify <strong>3 team members</strong> via email</li>
  </ol>
  <div class="ax-intent-actions">
    <button class="ax-btn-primary">Looks good — proceed</button>
    <button class="ax-btn-ghost">Let me adjust this</button>
  </div>
</div>
```

```css
.ax-intent-preview {
  background: var(--color-surface-elevated, #1e2025);
  border: 1px solid var(--color-border, #2a2d35);
  border-left: 3px solid var(--color-accent, #00d4ff);
  border-radius: var(--radius, 6px);
  padding: 1rem 1.25rem;
  max-width: 480px;
}
.ax-intent-steps { margin: 0.75rem 0; padding-left: 1.25rem; }
.ax-intent-steps li { margin-bottom: 0.4rem; font-size: 0.875rem; line-height: 1.5; }
.ax-intent-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.ax-btn-primary { background: var(--color-accent, #00d4ff); color: #000; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm, 4px); cursor: pointer; font-weight: 500; }
.ax-btn-ghost { background: transparent; color: var(--color-text-secondary, #888); border: 1px solid var(--color-border, #2a2d35); padding: 0.5rem 1rem; border-radius: var(--radius-sm, 4px); cursor: pointer; }
```

---

## Pattern 2: Autonomy Dial

A visible, user-adjustable control over how much independence the agent has.

**Rule:** The current autonomy level must always be visible in the UI. Default is "Ask only for important actions" — never set full autonomy as the default. Users must explicitly opt into autonomous mode.

```html
<!-- Autonomy Dial — segmented control -->
<div class="ax-autonomy" role="group" aria-labelledby="autonomy-label">
  <span id="autonomy-label" class="ax-label">Agent autonomy</span>
  <div class="ax-autonomy-control">
    <button class="ax-seg-btn" data-level="supervised" aria-pressed="false">
      Ask every time
    </button>
    <button class="ax-seg-btn ax-seg-active" data-level="guided" aria-pressed="true">
      Ask for important
    </button>
    <button class="ax-seg-btn" data-level="autonomous" aria-pressed="false">
      Work autonomously
    </button>
  </div>
  <!-- Persistent indicator in agent header -->
  <span class="ax-autonomy-badge" aria-live="polite">Guided mode</span>
</div>
```

```css
.ax-autonomy-control { display: flex; background: var(--color-surface-elevated, #1e2025); border-radius: var(--radius, 6px); padding: 2px; gap: 2px; }
.ax-seg-btn { flex: 1; padding: 0.4rem 0.75rem; border: none; border-radius: calc(var(--radius, 6px) - 2px); background: transparent; color: var(--color-text-secondary, #888); cursor: pointer; font-size: 0.8125rem; transition: all 150ms; }
.ax-seg-active { background: var(--color-surface-base, #16181c); color: var(--color-text-primary, #f0f0f0); font-weight: 500; }
.ax-autonomy-badge { display: inline-block; padding: 0.2rem 0.6rem; background: var(--color-surface-elevated, #1e2025); border-radius: 999px; font-size: 0.75rem; color: var(--color-accent, #00d4ff); }
```

---

## Pattern 3: Confidence Signal

Communicate agent certainty — not as a percentage, but as a named level.

**Rule:** Named levels ("High confidence", "Uncertain — please review") calibrate better than percentages. Users anchor incorrectly on numbers. Show on agent-generated content or recommendations. Subtle — not alarming.

```html
<!-- Confidence signal badge -->
<div class="ax-result">
  <div class="ax-confidence" data-level="uncertain">
    <span class="ax-confidence-dot" aria-hidden="true"></span>
    <span>Uncertain — please review</span>
  </div>
  <p>Recommended action: Archive Q1 reports folder</p>
</div>
```

```css
.ax-confidence { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; margin-bottom: 0.5rem; }
.ax-confidence[data-level="high"] { background: rgba(0,212,127,0.12); color: #00d47f; }
.ax-confidence[data-level="medium"] { background: rgba(255,183,0,0.12); color: #ffb700; }
.ax-confidence[data-level="uncertain"] { background: rgba(255,80,80,0.12); color: #ff5050; }
.ax-confidence-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
```

---

## Pattern 4: Explainable Rationale

"Why this?" — available on demand, collapsed by default.

**Rule:** The explanation must use plain language. "Because you asked me to prioritise recent activity" not "Based on temporal weighting in the recency filter." Collapsed by default to avoid cognitive overload.

```html
<!-- Why this? disclosure -->
<div class="ax-rationale">
  <button class="ax-rationale-toggle" aria-expanded="false" aria-controls="rationale-body">
    <span>Why this recommendation?</span>
    <svg class="ax-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>
  </button>
  <div id="rationale-body" class="ax-rationale-body" hidden>
    <p>You asked me to prioritise files modified in the last 30 days. These 3 folders haven't been
    touched in 6 months and contain files that match your "archive candidates" filter.</p>
  </div>
</div>
```

```css
.ax-rationale { border-top: 1px solid var(--color-border, #2a2d35); padding-top: 0.75rem; margin-top: 0.75rem; }
.ax-rationale-toggle { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; cursor: pointer; color: var(--color-text-secondary, #888); font-size: 0.8125rem; padding: 0; }
.ax-rationale-toggle:hover { color: var(--color-text-primary, #f0f0f0); }
.ax-rationale-body { padding: 0.75rem 0 0; font-size: 0.875rem; line-height: 1.6; color: var(--color-text-secondary, #888); }
.ax-chevron { transition: transform 150ms; }
[aria-expanded="true"] .ax-chevron { transform: rotate(180deg); }
```

---

## Pattern 5: Action Audit

A timestamped log of everything the agent has done this session — accessible at any time.

**Rule:** Slide-over panel (not a separate page). Chronological, filterable. Must be accessible at any time, not only at session end. Include undo where technically feasible.

```html
<!-- Audit log trigger (always visible in agent UI) -->
<button class="ax-audit-trigger" aria-haspopup="dialog" aria-label="View agent action history">
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>
  <span>12 actions</span>
</button>

<!-- Audit slide-over panel -->
<aside class="ax-audit-panel" role="dialog" aria-label="Agent action history" hidden>
  <div class="ax-audit-header">
    <h2>Action history</h2>
    <button aria-label="Close" class="ax-audit-close">✕</button>
  </div>
  <div class="ax-audit-list">
    <div class="ax-audit-item">
      <time class="ax-audit-time">14:32</time>
      <div class="ax-audit-detail">
        <span class="ax-audit-action">Deleted</span> Q1-Draft.pdf from /documents/
      </div>
      <button class="ax-audit-undo" aria-label="Undo this action">Undo</button>
    </div>
    <!-- additional items -->
  </div>
</aside>
```

```css
.ax-audit-trigger { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.8125rem; color: var(--color-text-secondary, #888); background: none; border: none; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm, 4px); }
.ax-audit-panel { position: fixed; right: 0; top: 0; height: 100vh; width: min(400px, 90vw); background: var(--color-surface-elevated, #1e2025); border-left: 1px solid var(--color-border, #2a2d35); padding: 1.5rem; overflow-y: auto; z-index: 50; }
.ax-audit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.ax-audit-item { display: grid; grid-template-columns: 48px 1fr auto; gap: 0.75rem; align-items: start; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border, #2a2d35); font-size: 0.875rem; }
.ax-audit-time { color: var(--color-text-secondary, #888); font-size: 0.75rem; padding-top: 2px; }
.ax-audit-action { color: var(--color-accent, #00d4ff); font-weight: 500; }
.ax-audit-undo { font-size: 0.75rem; color: var(--color-text-secondary, #888); background: none; border: 1px solid var(--color-border, #2a2d35); border-radius: var(--radius-sm, 4px); padding: 0.2rem 0.5rem; cursor: pointer; white-space: nowrap; }
```

---

## Pattern 6: Escalation Pathway

Graceful handoff to a human when the agent is uncertain or stuck.

**Rule:** Never let the agent loop indefinitely. Set a maximum attempt count — automatic escalation after that. The escalation message must be specific, not generic. "I couldn't find a match for [specific thing]" not "I encountered an error."

```html
<!-- Escalation state -->
<div class="ax-escalation" role="alert">
  <div class="ax-escalation-icon" aria-hidden="true">🤔</div>
  <div class="ax-escalation-body">
    <h4>I'm not sure about this</h4>
    <p>I couldn't find a billing record matching <strong>Invoice #4821</strong> in the last 90 days.
    Want to search manually, or expand the date range?</p>
  </div>
  <div class="ax-escalation-actions">
    <button class="ax-btn-primary">Take over</button>
    <button class="ax-btn-ghost">Expand to 1 year</button>
  </div>
</div>
```

```css
.ax-escalation { background: var(--color-surface-elevated, #1e2025); border: 1px solid var(--color-border, #2a2d35); border-left: 3px solid #ffb700; border-radius: var(--radius, 6px); padding: 1rem 1.25rem; display: grid; grid-template-columns: 2rem 1fr; gap: 0.75rem; }
.ax-escalation-icon { font-size: 1.25rem; line-height: 1; }
.ax-escalation-body { grid-column: 2; }
.ax-escalation-body h4 { margin: 0 0 0.4rem; font-size: 0.9375rem; }
.ax-escalation-body p { margin: 0; font-size: 0.875rem; color: var(--color-text-secondary, #888); line-height: 1.5; }
.ax-escalation-actions { grid-column: 2; display: flex; gap: 0.5rem; margin-top: 0.75rem; }
```

---

## What to encode vs. leave to human judgment

**Encoded here:** The six patterns with HTML/CSS starters, the decision matrix for when each applies, copy language guidance for each pattern's text.

**Left to human judgment:**
- Visual styling — apply `modern-tech-editorial` or `ds-design-system` on top of these structural patterns
- The appropriate autonomy default level for a specific product's risk profile (the skill defaults to "guided"; high-risk products may need "supervised" as the default)
- Whether patterns 3–6 are needed for low-stakes features — depends on user trust level and regulatory context
- Specific escalation thresholds (how many attempts before automatic escalation)

---

## Skill relationships

| Skill | Relationship |
|---|---|
| `dashboard-ux` | Agentic dashboards need both: dashboard-ux for layout/data, ax-patterns for the trust layer |
| `ux-microcopy` | ax-patterns generates structural patterns; ux-microcopy writes the specific copy for each trust-pattern element |
| `story-audit` | An agentic product that passes story-audit should have legible intent and clear escalation states |
| `modern-tech-editorial` / `ds-design-system` | Apply these for visual style on top of the structural patterns here |
