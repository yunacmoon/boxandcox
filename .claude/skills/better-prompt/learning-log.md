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

## 2026-09-10 — 40-name list → markdown table
**Archetype:** mechanical/bulk
**Score:** 8.2 → 8.6 — already-sharp. Weakest dimension: Target ("this list" unresolved; no list attached to the message).
**Pick:** Haiku 4.5 · no effort param (Haiku 4.5 does not support `effort`) — one right answer, no judgement.
**Gap closed:** already-sharp. One line added that genuinely changes the output: a missing-field rule (leave the cell blank, never infer), because the raw prompt lets the model silently invent a Region or drop a ragged row. The Target gap is operational rather than textual — the list has to actually be in context.
**Lesson:** On mechanical/bulk, the only scaffolding that earns its tokens is the rule for the ragged case. A role line, an XML wrap or a "be accurate" is the skill failing its own over-scaffold guardrail.
