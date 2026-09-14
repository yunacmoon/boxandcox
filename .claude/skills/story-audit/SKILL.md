---
name: story-audit
description: >-
  Narrative review of any finished artifact — dashboard, landing page, prototype, or deck. Use when
  asked to "review this for story", "does this land?", "will this work in a pitch?", "cold read",
  "narrative review", "pitch readiness", "does this make sense to someone who hasn't seen it before?",
  or "what's wrong with the story here?". Input: HTML, screenshot, URL, description, or raw copy.
  Output: 4 sections — story attempted, story experienced, 7-dimension scores, and 3 highest-leverage
  fixes. Trigger even if the user doesn't say "story" but wants a first-impression or cold-viewer
  check. Do not use for copy editing alone (use copy-craft) or visual polish only (use de-slop-deck)
  — this skill audits narrative structure, not prose style or visual treatment.
metadata:
  author: BCG Design Studios — Creative AI Lab
  version: "1.0"
  tags: [narrative, audit, pitch, story, ux, review]
---

# Story Audit

Finds the gap between the story an artifact **intends** to tell and the story a cold, slightly
skeptical viewer **actually experiences** — then names the three highest-leverage fixes.

## When to use this

- You have a finished or near-finished artifact (deck, dashboard, landing page, prototype) and want
  to know if it will land in a pitch or first-impression context.
- You want a cold-read simulation: "will someone understand this in 60 seconds?"
- You want a structured narrative diagnosis before applying copy-craft, de-slop-deck, or ux-microcopy.

---

## Step 0 — Demo mode check (mandatory, do first)

Before scoring anything, determine the context:

**Ask (or infer from the artifact):** Is this for **daily operational use** or a **demo / pitch**?

- **Demo / pitch mode:** Apply the stricter 10-second cold-read. Flag any blank or empty opening
  state. Flag any screen that requires prior briefing to interpret. Apply the **Calendly principle**
  (see below). Every ambiguity hurts more here.
- **Live / daily use mode:** Apply standard UX narrative checks. Some setup friction is acceptable.

If the context cannot be determined, assume demo/pitch mode (the harder standard).

**The Calendly Principle:** Calendly's opening screen shows a finished meeting link — the output,
not the configuration wizard. A viewer immediately understands the product by seeing what it
produces. Every demo artifact should have a "Calendly moment" — one screen that shows the outcome,
not the mechanism. If this screen is missing or buried, flag it explicitly.

---

## Step 1 — Pixar Spine test (run verbatim, include incomplete beats)

Fill in all five beats from the artifact alone — no supplementary briefing. If a beat cannot be
completed, write "**[MISSING]**" and note what information would be needed.

```
Once upon a time: [the world / user / problem this exists for]
Every day:        [the friction, pain, or status quo before the tool]
Until one day:    [the named trigger or problem that the artifact solves]
Because of that:  [what the tool/artifact enables or changes]
Until finally:    [the outcome or resolution the user reaches]
```

The most commonly missing beat is "Until one day" — the named problem. Most artifacts jump straight
to solution without stating what changed or why that change matters now. Flag this explicitly if absent.

Include the completed spine verbatim in the output — including any [MISSING] beats.

---

## Step 2 — Cold-read simulation (60-second timer)

Simulate a first-time viewer with no briefing. Scan the artifact for 60 seconds only.
Then answer these three questions as that viewer:

1. **What does this do?** (one sentence, no jargon)
2. **Who is it for?** (specific — not "teams" or "organisations")
3. **What should I do next?** (the one action the viewer should take)

If any question cannot be answered cleanly, flag it. Name the gap: what is missing or ambiguous.

---

## Step 3 — 7-Dimension Audit

Score each dimension: **Pass / Partial / Fail** with a one-line note. Run in sequence.

### D1: Premise Legibility
**What it checks:** Does the opening screen answer "what is this and why should I care?" in under 10 seconds?
**Test:** Can a cold viewer state the tool's purpose after 10 seconds?
**Pass:** Outcome-oriented headline, clear value in the first screen.
**Fail:** Feature-oriented label, abstract headline, or no headline.
**Fix pattern:** Rewrite the headline from feature to outcome. "Track campaign performance" → "Know which campaigns are worth keeping."

### D2: Narrative Arc Completeness
**What it checks:** Does the artifact tell a complete story from problem to resolution?
**Test:** The Pixar Spine from Step 1. Count missing beats.
**Pass:** All five beats can be completed from the artifact alone.
**Fail:** One or more beats — especially "Until one day" — are [MISSING].

### D3: Visual Hierarchy and Attention Routing
**What it checks:** Does visual weight match narrative weight?
**Test:** Squint test — blur eyes and look at the opening screen. What is most visually prominent? Is it the most narratively important element?
**Pass:** The most important narrative element is also the most visually prominent.
**Fail:** More than 5 focal points competing for attention; decorative elements outweigh content elements; the hero message is buried.

### D4: Signposting and Wayfinding
**What it checks:** Do labels, headings, and button text guide the viewer through the story?
**Test:** Read every label, heading, and CTA in sequence, as if they were the only text visible.
**Pass:** Labels explain, not just name. Progress is signposted in multi-step flows.
**Fail:** Labels that name but do not explain ("Metrics" instead of "Track what's working"). Missing progress cues. Dead ends with no next-step signal.

### D5: Emotional Arc
**What it checks:** Is there a "moment of proof" — a result, data point, or visualisation that delivers a micro-satisfaction moment?
**Test:** Does the flow build toward something? Does it resolve?
**Pass:** There is at least one moment that delivers a clear payoff — a number, a result, a revelation that earns attention.
**Fail:** The flow just stops without resolution. No climax, no payoff, no "aha" moment.

### D6: CTA Clarity
**What it checks:** After viewing the artifact, does the viewer know what to do or believe next?
**Test:** State the CTA. Is it specific to the story or generic?
**Pass:** CTA is story-specific. "See your forecast." "Request access." "Run the analysis."
**Fail:** Generic CTA ("Submit", "Learn more", "Get started"). No CTA. CTA appears before the story has been told.

### D7: Story-Data Alignment
**What it checks:** Does the data shown support the story being told?
**Test:** For each chart or data element: what narrative role does it play? If none, flag it.
**Pass:** Demo data is curated to illustrate the story. Each visualisation has a clear narrative job.
**Fail:** Visualisations present for visual reasons only. Real, unfiltered messy data in a demo context. Charts that contradict or distract from the stated narrative.

---

## Step 4 — Output (always exactly 4 sections)

### Section 1: Story Attempted
One short paragraph: what story is this artifact trying to tell? State it plainly, charitably,
and specifically. This is the intended story, not the experienced one.

### Section 2: Story Experienced
One short paragraph written from the perspective of a **cold, slightly skeptical viewer** — not a
sympathetic collaborator. What does this viewer actually experience? What do they understand, miss,
or misread? What impression do they form? Be honest. Do not soften failures.

> If the artifact has **no discernible story**, say so plainly here and stop. Do not generate fixes.
> Ask the user: "What story was this intended to tell?" — then rerun the audit once briefed.

### Section 3: 7-Dimension Scores

| # | Dimension | Score | Note |
|---|-----------|-------|------|
| D1 | Premise Legibility | Pass / Partial / Fail | [one line] |
| D2 | Narrative Arc | Pass / Partial / Fail | [one line] |
| D3 | Visual Hierarchy | Pass / Partial / Fail | [one line] |
| D4 | Signposting | Pass / Partial / Fail | [one line] |
| D5 | Emotional Arc | Pass / Partial / Fail | [one line] |
| D6 | CTA Clarity | Pass / Partial / Fail | [one line] |
| D7 | Story-Data Alignment | Pass / Partial / Fail | [one line] |

Include the Pixar Spine verbatim below the table (with any [MISSING] beats shown).
Include the cold-read answers (what does this do / who is it for / what next).

### Section 4: 3 Highest-Leverage Fixes
**Never more than 3.** Prioritise by narrative impact, not implementation effort. Forcing the
priority is part of the value — the director decides whether to act.

Each fix in this format:
> **[Current state] → [What to change] → [Why it changes the story]**

Fixes must be **specific enough to act on**:
- Not "improve the hierarchy"
- Yes: "Move the KPI headline above the chart and increase it to --text-2xl so the insight lands before the data"

---

## What to encode vs. leave to human judgment

**Encoded in this skill:** The 7-dimension rubric, Pixar spine test, cold-read simulation, demo vs.
live mode distinction, Calendly principle, 3-fix output format and prioritisation logic.

**Left to human judgment:**
- Whether to act on the fixes (the skill recommends; the director decides).
- Whether the story being told is the right story for this client (the skill audits the story that is present, not whether it is strategically correct).
- Whether demo data redesign is within scope for the current brief.
- Tone and brand decisions on the rewrite.

---

## Relationship to other skills

| Skill | Relationship |
|-------|-------------|
| `de-slop-deck` | Complementary — de-slop catches verbal/visual generic patterns; story-audit catches narrative structural failures. Run both on any client-facing artifact. |
| `dashboard-ux` | story-audit is the narrative layer that sits on top of a dashboard built with dashboard-ux rules. |
| `copy-craft` + `ux-microcopy` | story-audit identifies copy problems; these skills fix them. |
| `bcg-deck` | bcg-deck has action-title enforcement in its build loop; story-audit is the standalone narrative review for any artifact not built with bcg-deck. |
