---
type: reference
title: "Better Prompt — model selection (model × effort)"
created: 2026-06-10
updated: 2026-09-10
tags: [prompting, model-selection]
status: current
related: ["prompt-structure.md"]
---

# Model selection — the decision tree

> [!warning] Live-verify before quoting versions or prices (Fetch-the-manual HARD RULE)
> The **decision logic** below is stable. The **model IDs and pricing** are volatile and MUST be
> re-verified against `platform.claude.com/docs/en/models/overview` and
> `…/build-with-claude/effort` before being quoted as fact.
> **Verified live 2026-09-10.** The previous capture (2026-06-10) was a full generation stale and
> carried an unresolved "Opus 4.7 vs 4.8" question — **that thread is now closed: both are legacy.**

## What changed in this revision (read once, then use the tree)

Three pieces of the old logic actively inverted. If you learned the 2026-06 version, unlearn these:

1. **The default is no longer Sonnet.** Anthropic's guidance is now *"start with Claude Opus 5 for
   most workloads."* The old default-to-Sonnet rule rested on a cost gap that has closed — Opus 5 is
   **2.5× Sonnet 5**, not the 10× that justified defaulting down.
2. **The effort dial now points DOWN, not up.** Every model that supports `effort` **defaults to
   `high`**. The old advice ("raise effort before upgrading the model") assumed a `medium` baseline
   that no longer exists. The move now is to *step down* to `medium`/`low` for routine work.
3. **Haiku 4.5 does not support `effort` at all.** Any "Haiku · low" pick is malformed — there is no
   effort parameter to set.

## The current lineup

| | Fable 5.1 | Opus 5 | Sonnet 5 | Haiku 4.5 |
|---|---|---|---|---|
| **For** | demanding reasoning, long-horizon agentic | complex agentic coding + enterprise work | best speed/intelligence balance | fastest, near-frontier |
| **API ID** | `claude-fable-5-1` | `claude-opus-5` | `claude-sonnet-5` | `claude-haiku-4-5` |
| **Price /MTok** | $10 in · $50 out | $5 in · $25 out | $2 in · $10 out | $1 in · $5 out |
| **Default effort** | `high` | `high` | `high` | **not supported** |
| **Thinking** | adaptive, always on | adaptive | adaptive | extended |
| **Context** | 1M | 1M | 1M | 200K |
| **Max output** | 128K | 128K | 128K | 64K |
| **Knowledge cutoff** | Jun 2026 | May 2026 | Jan 2026 | Feb 2025 |

Batch API is 50% off; prompt-cache reads cost 10% of base input (2.5% on Fable 5.1).

> **Watch the Haiku retirement.** Haiku 4.5's retirement commitment is "not sooner than
> 15 Oct 2026" — the nearest of the four. Re-check before building anything durable on it.

## The 4-second test (ask in order, stop at first yes — default Opus 5)

1. **Mechanical?** One right answer, no judgement — reformatting, tagging, extraction, a lookup? →
   **Haiku 4.5**. No effort parameter; keep the prompt terse.
2. **High volume or latency-critical**, and quality demonstrably holds at the lower tier? →
   **Sonnet 5**, stepping effort down to `medium` or `low`.
3. **Demanding reasoning or a long-horizon agentic run** — over ~30 minutes, millions of tokens,
   or a task where Opus 5 at `xhigh` has already fallen short? → **Fable 5.1**.
4. **Default → Opus 5.** Right for most workloads. This is the honest default now, not a splurge.

**The old "is it strategic / does the wording matter" split is retired.** It was a proxy for
"is it worth the 10× cost," and that gap is gone. Pick on *task shape* — mechanical, high-volume,
long-horizon, or default — not on how important the task feels.

## The effort dial (the real second lever)

Levels: `low · medium · high · xhigh · max`. `high` is the default and is identical to omitting the
parameter. Effort governs **all** output tokens — prose, tool calls, and thinking — so lower effort
also means fewer and terser tool calls.

| Model | Start at | Step up when | Step down when |
|---|---|---|---|
| **Fable 5.1** | `high` | `xhigh`/`max` for the most capability-sensitive agentic work | `medium`/`low` for routine work once quality holds |
| **Opus 5** | `high` | `xhigh` for demanding coding/agentic; `max` when the task justifies unconstrained spend | `low`/`medium` **liberally** — this is the primary cost and latency control |
| **Sonnet 5** | `high` | `xhigh` for the hardest coding | `medium` (cost step-down) or `low` (chat, latency-sensitive) |
| **Haiku 4.5** | — | — | not supported |

Three sharp edges worth knowing:

- **Effort is not a length dial on Opus 5.** Changing effort does *not* reliably shorten a visible
  response. If the output is too long, **prompt for concision explicitly** — don't turn effort down
  and hope.
- **At `xhigh`/`max`, set a large `max_tokens`** (64k is a sane starting point) — it's a hard cap on
  thinking *plus* response. On Opus 5, thinking can't be disabled at those levels (400 error).
- **Changing top-level effort mid-conversation invalidates the prompt cache.** Pick a level and hold
  it, or use the per-message effort change on the models that support it.

`budget_tokens` is gone: deprecated on Opus 4.6 / Sonnet 4.6, and a **400 error on 4.7 and later**.
Control depth with `effort`, and cap with `max_tokens`.

## 12 worked examples (calibration set)

| Task | Pick | Why |
|---|---|---|
| Reformat list → bullets | Haiku 4.5 | mechanical; anything larger is waste |
| Tag customer feedback by theme | Haiku 4.5 | repetitive classification at scale |
| Quick fact lookup | Haiku 4.5 | one-shot, no judgement |
| Daily inbox triage/summary | Haiku 4.5 | volume + speed beat depth |
| Subject lines / alt text | Haiku 4.5 | short, bounded, one right shape |
| Summarise 10 articles → digest | Sonnet 5 · medium | synthesis at volume; step down, quality holds |
| Instagram caption | Sonnet 5 · high | voice matters, but it's a short bounded piece |
| Small utility function | Sonnet 5 · high | common code, want it right first try |
| Contract clause risk review | Opus 5 · high | high-stakes, ambiguity-heavy |
| 6-month content strategy | Opus 5 · high | multi-variable, costly to redo |
| Architect an automation system | Opus 5 · xhigh | design decisions compound; agentic coding |
| Multi-day agentic refactor across a repo | Fable 5.1 · xhigh | long-horizon, millions of tokens |

## Tasks that almost always belong in Haiku 4.5

Summarising threads · reformatting (lists/JSON/CSV) · tagging and categorising · short translation ·
subject lines, alt text, meta descriptions · extracting structured data · spelling and grammar fixes ·
quick definitions · case conversion · routine messages · word and reading-time counts · placeholder
copy · first-pass classification before a human looks.

**Rule of thumb:** one right answer, and you wouldn't pay a human more than $5 to do it → Haiku.

## Using cost in the explanation

Quote cost only to *justify a step down*, never as a hardcoded fact: *"Sonnet 5 at medium — this is
volume synthesis and it's a fifth of Opus per token."* Opus 5 at $5/$25 is the default now; saying
"Opus is expensive" is the stale 2026-06 framing.

## In Claude Code specifically

Fast mode runs Claude Opus with faster output — it does **not** downgrade to a smaller model.
Toggle with `/fast`; available on Opus 5, 4.8 and 4.7. So "make it faster" inside Claude Code is
usually a fast-mode or effort question, not a model-switch question.
