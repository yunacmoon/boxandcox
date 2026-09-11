---
type: reference
title: "Better Prompt — prompt structure best-practice"
created: 2026-06-10
updated: 2026-09-10
tags: [prompting, structure]
status: current
related: ["model-selection.md", "partnership-templates.md", "structured-outputs.md"]
---

# Prompt structure — how to rewrite

> Re-verified against Anthropic's *Prompting best practices* on 2026-09-10. Where a technique below
> cites a measured number, it comes from that page. Techniques are stable; the model-specific
> carve-outs at the bottom are the volatile part — re-check those first.

## The golden rule (run this before anything else)

**Show the prompt to a colleague with minimal context and ask them to follow it. If they'd be
confused, the engine will be too.** Every technique below is a way of closing a gap this test
exposes. If it passes cleanly, stop — you're done.

## XML tags (the trained pattern)

Current models are trained to recognise these. Use the ones the prompt needs — not all, every time.

- `<context>` — background, situation, what's already true
- `<instructions>` — the actual task, stated plainly
- `<constraints>` — hard limits (length, tone, format rules)
- `<output_format>` — exactly what good output looks like
- `<example>` — worked input→output samples (wrap a set in `<examples>`)

Use consistent tag names across prompts, and nest when content has a natural hierarchy. For multiple
source documents, the trained shape is `<documents>` → `<document index="n">` → `<source>` +
`<document_content>`.

## The techniques that carry the most weight

- **Put long inputs at the TOP and the ask at the BOTTOM.** With 20k+ tokens of source material,
  a query placed last improves response quality **by up to 30%** on complex multi-document inputs.
  This is the highest-value structural move on long-context prompts, and the one most often got
  backwards — people naturally lead with their question.
- **Show, don't describe — 3 to 5 examples.** Examples are the most reliable way to steer format,
  tone and structure. Make them **relevant** (mirror the real case), **diverse** (cover edges, so no
  unintended pattern is learned), and **structured** (in `<example>` tags). *Never invent an example
  the operator's material doesn't support* — a fabricated example teaches a fact that isn't true.
- **Explain the why, don't just ban the what.** "NEVER use ellipses" is weak. "This will be read
  aloud by a text-to-speech engine, which can't pronounce ellipses" is strong — the model
  generalises from the reason to cases you didn't enumerate.
- **Say what to do, not what not to do.** "Write in smoothly flowing prose paragraphs" beats
  "don't use markdown."
- **Match your prompt's style to the output you want.** Formatting in the prompt bleeds into the
  response — strip markdown from the prompt if you want prose back.
- **Be explicit about action vs advice.** "Can you suggest some changes?" gets suggestions.
  "Change this function to improve its performance" gets changes. Current models follow this
  literally, so the verb is the whole instruction.
- **Add quality modifiers when you want range.** "Include as many relevant features and interactions
  as possible; go beyond the basics" measurably lifts output on build tasks.
- **Calibrate length by positive example**, not "don't be verbose." Show a sample of the right size.
- **Ground long-document work in quotes.** Ask for relevant quotes in `<quotes>` tags *first*, then
  the analysis. It focuses attention on the load-bearing passages.
- **Steer, don't prescribe.** Give the goal and the *why*; trust the engine for the *how*. Anthropic
  is explicit: *prefer general instructions over prescriptive steps* — the model's reasoning
  frequently exceeds a hand-written plan. Exception: **format** has a defensibly right shape, so
  stay concrete there.
- **Audience rule — put guidance where it can be acted on.** Match each instruction to *who reads
  it*. Guidance for a subagent belongs in the **subagent's brief** — a subagent never sees the parent
  prompt, so parent-side advice is wasted there.
- **Roles go in the system prompt.** A single sentence ("You are a helpful coding assistant
  specialising in Python") measurably focuses behaviour and tone.

## What NOT to do any more (regressions on current models)

These were good advice on earlier generations and are now actively harmful:

| Don't | Why it broke | Do instead |
|---|---|---|
| **Prefill the assistant turn** | Returns a **400 error** on Claude 4.6 and later. Anthropic's own console prompt-improver still emits a prefill step — it is obsolete. | Structured outputs, a tool with an enum, or a direct "respond without preamble" instruction |
| **"CRITICAL: You MUST…"** | Current models are far more responsive to the system prompt; siren language now causes **over**-triggering | Normal register: "Use this tool when…" |
| **"If in doubt, use [tool]"** | Tools that under-triggered before now trigger correctly; this over-fires | "Use [tool] when it would enhance your understanding" |
| **"Verify your answer" on Opus 5** | Opus 5 self-verifies well; the instruction causes over-verification, adding tokens and latency | Remove it rather than rewriting it |
| **`budget_tokens` for depth** | Deprecated on 4.6, **400 error on 4.7+** | `effort`, with `max_tokens` as the hard cap |
| **Markdown-suppression blocks on Fable 5.1** | It already formats sparingly; the block suppresses structure the content needs | Drop it, or use a one-line rule |

## Component checklist (the 9-frameworks distillation)

Every load-bearing prompt should carry, as relevant: **role · task · context · expectation ·
examples · steps.** The named frameworks (APE, RACE, COAST, TAG, RISE, TRACE, ERA, CARE, ROSES, and
the couple of dozen others in circulation) are permutations of these. Don't memorise them; just
don't leave a load-bearing component out.

**On framework libraries.** A popular alternative approach routes prompts through 31 named
frameworks. We deliberately don't: most reduce to the same handful of slots, the choice is usually
invisible in the emitted prompt, and picking between them manufactures a decision the output can't
show. **When two structures would produce the same prompt, say so and pick the simpler one** — a
confident rationale for an unobservable choice is exactly the overstatement this skill removes.

Four named patterns *do* earn their keep, because each changes the emitted prompt in a way you can
point at. Reach for them by name when the shape fits:

- **Chain-of-verification** — draft may contain hallucinated facts; verify each claim independently.
  Fits `research`.
- **Pre-mortem** — "assume this failed; why?" Fits `blueprint`, before commitment.
- **Step-back** — establish first principles before answering. Fits a `reason`-heavy build.
- **Least-to-most** — decompose into ordered dependent sub-problems. Fits multi-hop work.

## Match structure to archetype (don't over-scaffold)

| Archetype | Structure |
|---|---|
| quick-question / mechanical | one terse line; at most one in→out example. **No XML wrap.** |
| writing/content | role + audience + `<example>` of voice + length-by-example |
| research | `<context>` + explicit scope + success criteria + `<output_format>` |
| build/code | `<constraints>` + acceptance criteria + `<example>`; name the file |
| strategic-decision | `<context>` + the stake named + `<output_format>` for a recommendation |
| blueprint | open framing + role + an explicit "challenge me / surface gaps" instruction |

## The compounding principle (why this is a skill, not a prompt)

A prompt vanishes when the chat closes; a skill persists and sharpens. When an output needs a fix,
ask: *one-time, or should this live in the skill forever?* If forever → update this file or
`learnings.md`.
