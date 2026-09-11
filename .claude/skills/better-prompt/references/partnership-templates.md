---
type: reference
title: "Better Prompt — partnership templates (thinking-partner scaffolds)"
created: 2026-06-12
updated: 2026-06-12
tags: [prompting, partnership, thinking-partner]
status: developing
related: ["prompt-structure.md", "/blueprint", "/council"]
---

# Partnership templates — prompt FOR thinking-with, not extracting-from

Five copy-paste scaffolds that shift a prompt from **extraction** ("do this for me") to **partnership** ("let's think about this together"). Adopted from an [external-source] thinking-partner clip on AI as a collaborative partner.

**Where this fits the pipeline.** Step `[5] REWRITE` already picks *structure* (XML, examples, component checklist) via `prompt-structure.md`. This file adds the *posture* layer: when the archetype is one where the operator's own thinking is the raw material (blueprint, strategic-decision, writing/content, thin-context build), don't just structure the ask — reshape it into a partnership move so the first output thinks *with* the operator instead of guessing *for* them.

**The doctrine in one line.** These templates fill the *user* side: how the operator frames the prompt so the partnership starts at their end too — complementing the skill's own co-create-before-producing and self-check patterns.

---

## The 5 habits underneath the templates

The templates are *what to type*; these are the *posture in practice* — the behaviours the templates encode, usable even when no template is in front of you. (The source's closing five.)

1. **Begin with context.** Spend 30 seconds on the situation before the ask — the cheapest, highest-return move there is.
2. **Never accept the first output.** Treat every response as the *start* of a conversation, not the end. The best output is a few exchanges away.
3. **Start with your thinking, not a blank slate.** Bring a draft / a rough take / your reasoning. Do the homework first; the model edits *your* thinking instead of guessing.
4. **Ask what you're missing.** Make *"what am I overlooking?"* a standing part of the workflow, not an afterthought.
5. **Struggle together.** At a roadblock, work through it *with* the model — clarify and refine — rather than giving up or starting over.

---

## The 5 templates × archetype tags

Each template is tagged to the `prompt-structure.md` "Match structure to archetype" row it serves. When step `[3] SELECT` lands on that archetype and the prompt is thin on the operator's own thinking, offer the matching template in the `[6] OUTPUT` rewrite.

### Template 1 — Rich context (load the situation before the ask)
**Archetype:** any thin-context prompt — fires hardest on `build/code`, `research`, `writing/content` where the model is guessing at a situation the operator already holds in his head.

```
I need help with [specific task].
Here's my situation:
- I am [your role/position/relevant background]
- I'm working with/for [audience/client/target]
- The specific challenge is [describe the problem]
- What makes this unique is [special circumstances]
- My goal is to [desired outcome]
```

**Why it's a partnership move, not just "add context":** it front-loads the *frame* (role · audience · constraint · goal) so the first output lands inside the operator's reality instead of a generic one. This is the user-side mirror of the skill's `<context>` tag — the same job, done at the prompt end.

**Watch for (it worked):** output references the specific details you gave, not generic filler; tone matches your actual audience; solutions respect the constraints you named.

### Template 2 — Draft-and-improve together (bring your attempt, improve it jointly)
**Archetype:** `writing/content` — and any case where the operator has a draft and wants it sharpened, not replaced.

```
Here's my draft [content]: [Your initial attempt]
Please help me improve this by:
- Strengthening the main argument
- Making the language more engaging
- Suggesting a stronger opening
- Identifying any weak points I should address
```

**Why:** keeps the operator's voice and structure as the spine — the model edits *his* thinking rather than substituting its own. Pairs with the surgical-edits-over-regeneration principle.

**Watch for (it worked):** suggestions *improve* your original ideas rather than replacing them; specific feedback on weak points you hadn't noticed; each pass progressively stronger.

### Template 3 — Expose blind spots (what am I missing, before I start)
**Archetype:** `blueprint` — this is the prompt that opens a shaping session. Maps directly to `/blueprint` (the "challenge me / surface gaps" instruction in its archetype row).

```
I'm planning to [describe task/project].
Before I start:
- What 3 critical questions should I be asking?
- What information am I likely missing?
- What considerations should I keep in mind for this type of project?
```

**Why:** turns the model into a pre-mortem partner *before* commitment — cheapest possible moment to catch a gap. For anything bigger than a single prompt, route to `/blueprint` rather than one-shotting this.

**Watch for (it worked):** questions that make you think *"I hadn't considered that"*; a more complete approach after closing the gaps; fewer revisions later because you anticipated the issue.

### Template 4 — Sparring partner (stress-test my reasoning)
**Archetype:** `strategic-decision` — maps to `/council` at full weight when the stakes justify the full bench; this template is the single-model, in-line cousin for a faster gut-check.

```
Here's my [idea/argument/plan]: [Explain your thinking]
Please help me strengthen this by:
- Identifying the three weakest parts of my reasoning
- Playing devil's advocate with my main assertions
- Suggesting what critical information I might be missing
- Identifying potential failure modes or unintended consequences
```

**Why:** explicitly licenses disagreement — defeats the model's default-agreeable bias. **Escalation rule:** if the decision is load-bearing (real money, IP, strategy, a hard-to-reverse call), this template is the warm-up; `/council` (full weight) is the real review (independent subagents that genuinely disagree, not one voice arguing with itself).

**Watch for (it worked):** specific vulnerabilities in your reasoning you hadn't recognised (not vague hedging); counter-perspectives that actually challenge your assumptions; named logical gaps. If it just agrees, the spar failed — escalate to `/council` (full weight).

### Template 5 — Multiple perspectives (examine from every stakeholder's eyes)
**Archetype:** `strategic-decision` / `blueprint` — also the single-model cousin of the full-weight `/council`'s distinct-lens bench.

```
I'm working on [describe project/idea].
Please help me examine this from multiple perspectives:
- How would [stakeholder type A] view this approach?
- What concerns would [stakeholder type B] likely raise?
- What considerations would someone with a background in [different discipline] focus on?
- What assumptions am I making that someone from [different culture/background] might question?
```

**Why:** surfaces the stakeholder lenses the operator isn't natively in. **Escalation rule:** same as Template 4 — for a real decision, the council's *independent* lenses beat one model role-playing five; use this for speed, the council for rigour.

**Watch for (it worked):** assumptions surfaced that seem obvious to you but not to others; objections you can now pre-empt; a more comprehensive read than your single vantage gave.

---

## How the skill should use these (the offer rule)

In `[5] REWRITE` / `[6] OUTPUT`, after the structure pick:

- **Thin on the operator's own thinking + an archetype above** → don't just structure the ask; reshape it using the matching template, and say which one and why (one line).
- **Already rich** (operator brought their draft / their reasoning / their context) → light touch; the template's job is already done by hand.
- **Strategic-decision at real stakes** → offer Template 4/5 as the in-line move AND name `/council` (full weight) as the heavier option. Don't silently downgrade a council-worthy call to a single-model spar.
- **Shaping work bigger than one prompt** → Template 3 is the opener, but route to `/blueprint` for the full shaping workflow.

**Guardrail (inherits `prompt-structure.md`'s "don't over-scaffold"):** a `quick-question` / `mechanical/bulk` prompt gets NONE of these — partnership scaffolding on "what's 2+2" is the same failure as XML-wrapping it. These templates are for prompts where the operator's *own thinking* is the raw material.
