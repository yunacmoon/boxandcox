---
name: better-prompt
description: "Universal prompt front-door. Takes any raw prompt or messy intent, scores it on five dimensions, strengthens it, picks the right model x effort x structure with a stated reason, asks one clarifier only if needed, hands back a ready-to-run prompt — then runs it. Like /blueprint but applied to ALL prompts. Use whenever a prompt is about to be run and its quality matters, even if not asked. Triggers: \"/better-prompt\", \"prompt-suggest\", \"prompt-correct\", \"make this prompt better\", \"score this prompt\", \"which model should I use for…\", \"improve this prompt\", \"interview me\"."
license: MIT
metadata:
  owner: Esteban Zapiola (BCG Design Studios, Creative AI)
  version: "2.0"
  updated: "2026-09-10"
  tags: [prompting, model-selection, meta, coaching]
---

# Better Prompt

Take any raw prompt and return: **a score + the right engine + a sharper prompt + the reason** — then run it, then learn from it. The skill does the remembering; the operator just dumps intent.

**The job is the prompt-to-output path, not the literal text.** Strengthening a vague prompt and adding a constraint the operator would've typed by hand are the *same move* — shape the total context so the first output lands. Don't fixate on rewording his words; fix whatever makes the first output miss.

---

## The pipeline (run every invocation)

### [1] SCORE — five dimensions, 1–10 each

Score the raw prompt **as written, not as you charitably interpret it.** The gap between those two readings is exactly what the rewrite fixes. Showing the score is what lets the operator *feel* the delta and learn the pattern — it isn't ceremony, it's the teaching surface.

| Dimension | What you're scoring |
|---|---|
| **Target** | Is the thing to act on named and findable? Penalise unresolved pronouns, "this", "the thing", an implied-but-unnamed artifact. |
| **Action** | Is the verb unambiguous? Penalise "look at", "handle", "sort out", and any ask that could mean either *advise* or *do*. |
| **Criteria** | Is "good" defined — format, length, audience, the one takeaway, acceptance test? Each missing one costs. |
| **Context** | Is what's already true stated — situation, constraint, prior attempt, why it matters? Penalise a bare instruction with no setting. |
| **Structure** | Is it organised for its length? Short prompts score high by default; only long unbroken dictation is penalised. |

**Rubric anchors** — so a 6 means the same thing every time:

| Band | Meaning |
|---|---|
| **1–3** | Absent. The engine has to guess this dimension entirely. |
| **4–6** | Present but underspecified. It can proceed, but will fill the gap with an assumption the operator didn't choose. |
| **7–8** | Solid. Good result likely; refinement is marginal. |
| **9–10** | Nothing left to infer on this dimension. |

**The threshold that sets the pipeline's weight.** Mean ≥ 7 **and** no single dimension below 6 → the prompt is already sharp: classify, pick, minimal rewrite, done. Don't run the heavy machinery on a prompt that doesn't need it. Anything lower → the low dimension *is* the gap, and it's exactly what step [4]'s clarifier (if any) should close.

**The colleague test (Anthropic's golden rule, use it to sanity-check a score).** Would a colleague with minimal context be able to follow this prompt? If they'd be confused, the engine will be too — and the score should reflect that, not your generous reading.

### [2] CLASSIFY the archetype

`research · blueprint · quick-question · build/code · strategic-decision · mechanical/bulk · writing/content`

If genuinely ambiguous between two, that triggers the one clarifier in [4].

### [3] SELECT — model x effort x structure

Apply the decision tree in `references/model-selection.md`. Summary of the current lineup (live-verified 2026-09-10):

- **Default → Opus 5.** Anthropic's own guidance is now "start with Claude Opus 5 for most workloads." This *reversed* the old default-to-Sonnet rule — Opus 5 is 2.5x Sonnet 5, not 10x, so the old cost argument no longer holds.
- **Step down to Sonnet 5** when speed or volume matters and quality demonstrably holds.
- **Haiku 4.5** for mechanical/bulk — one right answer, no judgement.
- **Step up to Fable 5.1** only for demanding reasoning and long-horizon agentic work, or when Opus 5 at higher effort still falls short.
- **Effort now defaults to `high`** on every model that supports it. The dial's direction has flipped: **step effort DOWN from high** for routine work, rather than up from medium. Haiku 4.5 does not support `effort` at all.

**Never hardcode model IDs or prices from memory** — `references/model-selection.md` carries the live-verify rule and the as-of date.

### [4] CLARIFY — only if needed, and use the tool

If archetype or intent is genuinely ambiguous, ask **one** question before rewriting. Otherwise skip — don't manufacture friction.

**Use the `AskUserQuestion` tool, not free text.** It renders selectable options, works one-handed on a phone, and forces the discipline below. Free-text clarifiers make the operator type; that's the friction this skill exists to remove.

**The asymmetry that decides whether to ask.** A *missing* clarifier that mattered costs a full wrong-output correction loop; a clarifier asked when the answer was inferable costs a few seconds. So gate hard on *load-bearing* ambiguity — but when one is genuinely present and context doesn't already answer it, ask.

**The 5 question pitfalls** (a clarifier must clear all five): (1) *generic options* — every option specific and actionable, never "a better approach"; (2) *too many options* — 2–4, never a wall; (3) *leading questions* — neutral framing, don't smuggle the answer in; (4) *compound questions* — one decision per question, split "which X and what Y"; (5) *asking without grounding* — options trace to something real (a file, a fact, his stated pattern), never invented.

### [5] REWRITE

Structure per `references/prompt-structure.md`. Match scaffolding to archetype — a Haiku quick-question stays one terse line, not an XML wrap. The techniques that carry the most weight on current models:

- **Steer, don't prescribe.** State the goal and the *why*, then trust the engine to find the how. Anthropic's own guidance agrees: *"prefer general instructions over prescriptive steps"* — Claude's reasoning frequently exceeds a hand-written plan. The exception is **format**, which has a defensibly right shape; stay concrete there.
- **Explain the why, don't just ban the what.** "Never use ellipses" is weak; "this will be read aloud by a text-to-speech engine, which can't pronounce ellipses" is strong — the engine generalises from the reason.
- **Say what to do, not what not to do.** "Write in flowing prose paragraphs" beats "don't use markdown."
- **Show, don't describe — 3 to 5 examples.** Relevant (mirrors the real case), diverse (covers edges so no unintended pattern is learned), and wrapped in `<example>` tags. **Never invent an example the operator's material doesn't support** — a fabricated example teaches the engine a fact that isn't true.
- **Long inputs go at the TOP, the ask at the BOTTOM.** With 20k+ tokens of source material, putting the query last measurably improves quality. This is the single highest-value structural move on long-context prompts and the one most often got backwards.
- **Match prompt style to desired output style.** Markdown in the prompt begets markdown in the output; strip it if you want prose.
- **Add quality modifiers when you want range.** "Go beyond the basics; include as many relevant features as possible" genuinely lifts effort on build tasks.
- **Do NOT add prefill.** Assistant-turn prefill returns a 400 error on current models. Anthropic's own console prompt-improver still emits it — that step is obsolete; use structured outputs or a direct instruction instead.
- **Don't shout.** "CRITICAL: You MUST…" now causes *over*-triggering on current models. Normal phrasing ("Use this tool when…") is the correct register.

**Partnership posture (`references/partnership-templates.md`).** Structure is *how* the ask is shaped; posture is *whether it thinks with the operator or for him*. When the archetype is one where his own thinking is the raw material — `blueprint`, `strategic-decision`, `writing/content`, or any thin-context `build`/`research` — and the prompt is thin on his framing/draft/reasoning, reshape it with the matching template (rich-context · draft-and-improve · expose-blind-spots · sparring-partner · multiple-perspectives) and say which one and why in one line. For a *load-bearing* strategic decision, offer the in-line spar AND name `/council` as the heavier option — don't silently downgrade a council-worthy call. NONE of these fire on `quick-question` / `mechanical/bulk`.

**"interview me" — the named front door to the flip.** When he types "interview me" (or "ask me what I'm missing"), invert the posture: instead of strengthening a prompt he wrote, *I* ask the questions that surface blind spots. Typed cold, the default is **expose-blind-spots (Template 3)**, escalating to `/blueprint` the moment the answer is clearly a build.

**Typed output contracts.** If the prompt's output feeds downstream code — a judge, an extraction step, a tool call — reach for `references/structured-outputs.md` (schema design, validation, retry-with-correction). If it needs a pass/fail bar, `references/evaluation-frameworks.md` carries the eval-craft library.

### [5.5] SELF-CHECK — fast, inline, no subagents

Two passes; fix in place, and don't surface the check unless it changed something material.

**Playbook QA (always).** Does the rewrite follow the structure the pick calls for? Two failure modes, both real: *under*-scaffolding (a strategic-decision prompt missing audience / output-format / the one takeaway) and *over*-scaffolding (XML-wrapping a Haiku quick-question — the skill failing its own guardrail).

- **Every added line must earn its tokens.** The scaffolding I add *is itself a cost* the engine pays on every run. Each tag, instruction and example must change the output. If a line wouldn't change what comes back, cut it.
- **Don't add "verify your answer" to an Opus 5 prompt.** Opus 5 self-verifies well without being told; a carried-over verification instruction causes over-verification, adding tokens and latency for nothing. Remove it rather than rewriting it.
- **Don't claim a distinction the output won't show.** If two structures would produce the same prompt, say so and pick the simpler one. A confident rationale for an unobservable choice is exactly the overstatement this skill exists to remove.

**Red-team (gated — `strategic-decision` and `research` ONLY).** One line: *would a fresh model misread this, and what's the single most load-bearing thing still missing?* Patch if a real hole surfaces. Skip entirely for every other archetype. Don't manufacture a hole to look thorough; "clean" is a valid result.

### [6] OUTPUT — one screen

1. **Score:** `X.X → Y.Y` on its own line, with the weakest dimension named.
2. **Pick:** `Model · Effort` + one-line *why*.
3. **Strengthened prompt:** shown clearly, so he can see the delta and learn from it.
4. **Then act on it, same turn.** Showing the rewrite IS the confirmation — don't wait for a separate go-ahead. He can redirect if it missed.

**The Score line is never omitted, and never folded into the prose reason.** Give it its own line.
Measured failure (eval `vague-build-names-the-gap`, 2026-09-10): when the score shared a line with
the "why it mattered" clause, the prose won and the number vanished — in 1 run of 5. The score is
the teaching surface; the rewrite alone shows him *a* better prompt, the score shows him *how far
off* he was and on which axis. That's the part that compounds.

This also applies on the auto-suggest route in `CLAUDE.md`, which uses the same block.

### [7] LOG — silent, same beat, no prompt

Append one row to `learning-log.md`. Non-negotiable and never gated on confirmation — the point is to reduce remembering, so the instrumentation can't require him to remember to log.

**The load-bearing field is `gap closed`** — the delta between raw and strengthened, plus the one lesson. That's what `/selfimprove` reads weekly to coach his prompt-craft. Capture it every time; if the raw was already sharp, log `already-sharp` (also a signal). Record the score delta alongside it.

### [8] VERIFY — opt-in, only when he asks "did that actually help?"

A rewrite that *looks* better is a claim, not a result. When it matters, prove it: run the raw prompt and the strengthened prompt as two parallel subagents on the same task, in the same turn, then compare the outputs against the criteria the rewrite added. Report which won and on what dimension. **Never assert the rewrite was better without having run both** — a plausible-looking improvement is exactly the failure this step exists to catch.

Don't run this by default. It doubles cost and most rewrites don't warrant it.

---

## Worked examples

**A. Vague voice-dump → build/code.** *Raw (2.4/10 — Target 3, Action 4, Criteria 1, Context 2, Structure 2):*
> "can you have a look at the deck thing and make it better it's not working on mobile"

*Strengthened:* "In `ds-pitch-showcase/index.html`, fix the deck's mobile layout at 375px width. Currently the slide tray overlaps the headline and the nav arrows fall outside the viewport. Success = every slide readable at 375px with no horizontal scroll and no overlapping elements, verified by screenshot at 375x812. Keep the desktop layout unchanged." → **Sonnet 5 · high.** Score 2.4 → 8.6; the gap was Criteria (no definition of fixed) and Target (which file).

**B. Already sharp → light pass, no padding.** *Raw (8.2/10):*
> "Reformat this list of 40 names into a markdown table with columns Name, Region, Role. Keep the original order."

*Strengthened:* unchanged — it names target, action, criteria and format. → **Haiku 4.5 · no effort param.** Adding XML or a role line here would be the skill failing its own guardrail. Logged as `already-sharp`.

**C. Thin-context strategic → partnership reshape.** *Raw (3.0/10):*
> "should we build the skills library as a marketplace or keep it curated"

*Strengthened:* reshaped with the sparring-partner template — his own reasoning loaded first, then "identify the three weakest parts of my reasoning, play devil's advocate on the main assertion, and name the failure modes." → **Opus 5 · high**, plus a named offer of `/council` at full weight, because a hard-to-reverse structural call deserves independent seats rather than one voice arguing with itself.

---

## Guardrails

- **Don't over-scaffold quick questions.** Haiku · terse. Adding XML to "what's 2+2" is the skill failing. The `[5.5]` Playbook QA catches over-scaffold as fast as under-scaffold.
- **The `[5.5]` self-check is weight-proportional.** Playbook QA always runs but is near-zero on a terse prompt. The red-team fires ONLY on `strategic-decision` / `research`. The check must never add latency to the fast path.
- **Never hardcode model IDs or pricing from memory.** Logic is stable; version numbers and prices float. Verify against `platform.claude.com` when they matter.
- **Low classification confidence → say so + default Opus 5.** Don't bluff a tier you can't justify.
- **Read `learnings.md` before running.**

---

## Trigger model — hybrid (manual front door + auto-suggest)

Two routes: (1) the **manual front door** — he types `/better-prompt` or a trigger phrase; and (2) an **auto-suggest route** that fires on every message, so the effort of remembering to strengthen a prompt isn't offloaded onto him at all.

The auto-suggest route is implemented as a **standing instruction in global `CLAUDE.md`** ("Teach the prompt back"), not as a Claude Code hook — a hook is deterministic and shell-triggered, and can't run the scoring judgement this needs. CLAUDE.md carries the five-dimension test and fires it every turn. This file stays the canonical pipeline; CLAUDE.md is the always-on trigger that runs it.

---

## Validating a change to this skill

`scripts/prompt_gate.py` mechanically checks a strengthened prompt against the non-negotiables (no prefill, no shouted MUSTs, long-input-before-ask, examples not invented). Run it against both fixture sets — it must **fail** the dirty fixtures, not just pass the clean ones. A validator that has only ever passed is untested.

```bash
python3 ~/.claude/skills/better-prompt/scripts/prompt_gate.py --self-test
```
