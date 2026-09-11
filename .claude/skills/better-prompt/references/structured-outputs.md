---
type: reference
title: "Better Prompt — structured outputs (typed-output library)"
created: 2026-06-18
updated: 2026-06-18
tags: [prompting, structured-outputs, json, validation, schema]
status: developing
aliases: []
related: ["/better-prompt"]
---

# Structured outputs — the typed-output library

> For when a studio skill needs a **typed, validated output contract** — a judge that must return parseable JSON, an extraction step, a tool call, anything downstream code consumes.

*Adapted from `thedesignproject/agent-skills` (MIT), captured 2026-06-18. British spelling; provider-portable.*

---

## Three approaches, and when to use each

| Approach | Reliability | Flexibility | Validation | Use when |
|----------|:-----------:|:-----------:|:----------:|----------|
| **Prompt-based** | ~ | +++ | --- | Simple extracts, flexible schemas, quick prototypes |
| **JSON mode** | ++ | ++ | + | Need valid JSON, moderate complexity |
| **Function calling / tool use** | +++ | + | +++ | Strict schemas required, tool orchestration, type-safe parsing |

The trade is reliability-and-validation against flexibility. Reach for the most constrained approach the task can tolerate — but prompt-based is fine for one-off extracts where a retry loop is cheaper than wiring a schema.

---

## Prompt-based structured output

Ask for JSON, describe the schema inline, and state the rules explicitly. The three rules that matter most: how to handle missing fields (`null`), how to handle empty lists (`[]`), and date format (ISO 8601). Then *"return only the JSON, no explanation."*

```
Extract meeting information. Return a JSON object matching this schema:
{
  "meeting_title": "string - the main topic",
  "date": "string - ISO 8601 (YYYY-MM-DD) or null",
  "attendees": ["array of participant names"],
  "action_items": [
    { "task": "string", "assignee": "string", "due_date": "ISO 8601 or null" }
  ],
  "decisions": ["array of key decisions"]
}
Rules: null for fields not mentioned · empty arrays for empty lists ·
ISO 8601 dates · return ONLY the JSON object.

Transcript: {transcript}
```

**Output-wrapping technique** — wrap the JSON in a sentinel tag (`<analysis>...</analysis>`) so it's trivially extractable even if the model adds chatter. Pull it out with a tag-scoped regex, then parse.

---

## JSON mode

A provider-level flag that forces the model to emit syntactically valid JSON. You still describe the schema in the prompt — the flag guarantees *valid JSON*, not *your* JSON. Best practices that lift accuracy: always describe the expected schema, specify null handling, define array behaviour, include per-field descriptions, and add type annotations (`"date: string in YYYY-MM-DD format"`).

> [!warning] Verify the current flag name before quoting it (Fetch-the-manual)
> The mechanism is stable; the exact parameter is provider- and version-specific (OpenAI used `response_format={"type": "json_object"}`; Claude's system-prompt-enforced approach and any native structured-output flag should be checked live against the provider docs before being hardcoded into a skill).

---

## Function calling / tool use

The most reliable path: define a JSON-schema tool, force its use, and read the already-parsed arguments off the tool call — no string parsing, no fence-stripping. This is the right approach when the output is a contract downstream code depends on. The schema travels with the call (`type`, `properties`, `required`, `enum`, `minimum`/`maximum`), so the provider validates shape before you ever see it. Both major providers support this with near-identical schema shapes; the wrapping API differs, so keep the *schema* portable and let the call site differ per provider.

---

## Schema-design patterns

**Enums** — constrain a field to a fixed set. The single highest-leverage schema move; turns a free-text field into a closed vocabulary.
```json
"priority": { "type": "string", "enum": ["critical", "high", "medium", "low"] }
```

**Nested objects + `$ref`** — factor repeated shapes (an address, a line item) into `definitions` and reference them, so the schema stays DRY.

**Conditional fields** (`if`/`then` under `allOf`) — make a field required only when another field takes a given value (e.g. require `email` only when `contact_method` is `"email"`). Powerful, but it's the first thing to drop if a model struggles — flatten before reaching for conditionals.

---

## Validation — the principles

Schema-in-prompt is a request, not a guarantee. Always validate the parsed output against the schema before trusting it, and keep the validation **provider-portable**: the schema is the contract, the validator is just one implementation of it.

**Pydantic (Python):**
```python
from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional

class Severity(str, Enum):
    CRITICAL = "critical"; HIGH = "high"; MEDIUM = "medium"; LOW = "low"

class CodeIssue(BaseModel):
    severity: Severity
    location: str
    description: str = Field(..., min_length=10, max_length=500)
    suggestion: Optional[str] = None

class CodeAnalysis(BaseModel):
    summary: str = Field(..., max_length=200)
    issues: list[CodeIssue]
    quality_score: int = Field(..., ge=1, le=10)

# parse + validate in one step; raises on bad JSON or bad shape
analysis = CodeAnalysis(**json.loads(llm_response))
```

**Plain JSON Schema (language-agnostic):** the same contract, no framework — validate the parsed dict against a JSON-Schema document with any conformant validator.
```json
{
  "type": "object",
  "required": ["summary", "issues", "quality_score"],
  "properties": {
    "summary": { "type": "string", "maxLength": 200 },
    "issues": { "type": "array", "items": {
      "type": "object",
      "required": ["severity", "location", "description"],
      "properties": {
        "severity": { "type": "string", "enum": ["critical","high","medium","low"] },
        "location": { "type": "string" },
        "description": { "type": "string", "minLength": 10, "maxLength": 500 },
        "suggestion": { "type": "string" }
      } } },
    "quality_score": { "type": "integer", "minimum": 1, "maximum": 10 }
  }
}
```
Keep the JSON-Schema document as the source of truth; Pydantic / Zod are conveniences over it.

---

## Retry-with-correction loop

When validation fails, don't give up — feed the error back and ask again. Parse, validate, and on failure re-prompt with the specific error message ("Invalid JSON at position N" / the schema-validation error) plus the original request, up to a small retry cap (3 is plenty). Most failures are fixed on the first retry because the model can see exactly what it got wrong.

```
Your previous response had an error:
{error_msg}
Fix it and return only valid JSON matching the schema.
Original request:
{original_prompt}
```

---

## Common pitfalls

| Pitfall | Problem | Fix |
|---------|---------|-----|
| No schema in prompt | Model invents structure | Always specify the expected schema |
| Ambiguous field names | Inconsistent extraction | Descriptive names + examples |
| Missing null handling | Errors on optional fields | State "null if not found" explicitly |
| Over-nested schema | Inconsistent output | Flatten when possible |
| No validation | Silent failures | Always validate against the schema |
| Oversized schema | Token waste, confusion | Split into multiple calls |

---

## Related

- **`evaluation-frameworks.md`** (this references/ dir) — LLM-as-judge prompts need typed, validated output
- **`/better-prompt`** — the front door that routes a prompt to the right output contract
