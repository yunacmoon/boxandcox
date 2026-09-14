---
name: ux-microcopy
description: >-
  Writes and reviews copy that lives inside interfaces — button labels, empty states, error messages,
  loading text, tooltips, confirmation dialogs. Use when asked "what should this button say", "write
  an empty state", "error message copy", "microcopy", "UI copy", "tooltip text", "confirmation dialog",
  "what should the loading state say", or "review the copy in this interface". This is distinct from
  marketing copy (use copy-craft for that) — microcopy communicates and confirms inside a UI; it does
  not persuade. Trigger on any request for text that lives inside an interface element.
metadata:
  author: BCG Design Studios — Creative AI Lab
  version: "1.0"
  tags: [copy, microcopy, ux-writing, interface, buttons, empty-states, errors]
---

# ux-microcopy — interface copy patterns

UX microcopy is not marketing copy. Marketing copy persuades. Microcopy communicates and confirms.
Different rules apply. `copy-craft` handles marketing voice; this skill handles UI.

---

## Button labels — the verb-noun rule

Every button label contains an action verb that names the outcome, not just the action.

**Pattern:** `[Verb] [Noun]` — or `[Verb] [Noun] [context]` for specificity.

| Instead of | Use |
|---|---|
| Submit | Save changes / Send invite / Create project |
| OK | Got it / Understood / Apply |
| Proceed | Continue to checkout / Next step |
| Continue | Continue to [specific place] |
| Click here | [Describe what happens when clicked] |
| Delete | Delete project / Delete permanently |
| Confirm | [Name the specific action being confirmed] |

**Dangerous/irreversible actions:** add consequence. "Delete project" → "Delete project permanently"

**Ban list — never use these as complete button labels:**
- OK, Submit, Proceed, Yes, No, Cancel (alone)
- Click here, Tap here, Press this
- Done (when something specific was done — name what)
- Any label that could apply to 10 different buttons on 10 different screens

---

## Empty states — the three-part pattern

Never show a blank space, a generic "No data" message, or an icon with no text.

**Pattern:** `[What goes here] · [Why it's empty now] · [CTA to fix it]`

**Example:**
> "No campaigns yet — your first campaign's results will appear here. [+ Create campaign]"

**Optionally:** add a ghost/preview illustration showing what the populated state looks like.
Especially useful in demo mode where an empty state reads as "this isn't built yet."

**Ban list:**
- "No data found" (no explanation, no action)
- "Nothing here yet" (too informal, no direction)
- An icon alone with no text
- "N/A", "null", "undefined" as user-facing copy

---

## Error messages — the three-part pattern

Errors must communicate without blaming the user and always give a next step.

**Pattern:** `[What happened] · [Why it happened] · [What to do next]`

**Example:**
> "Couldn't save your changes · Your session may have timed out. [Try again] or [Log in again]"

**Rules:**
- Plain language only. No error codes as the primary message.
- Active voice: "Couldn't save" not "Your changes were not able to be saved."
- Always include at least one specific action.
- Never blame the user. "You entered an invalid email" → "That email address doesn't look right — check for typos."

**Ban list:**
- "Error 403", "500 Internal Server Error" as primary copy
- "Something went wrong" with no next step
- "Please try again" with no explanation of what failed
- "Are you sure?" as an error or confirmation prompt (it creates doubt, not clarity)

---

## Loading states — progressive language

- **Under 2 seconds:** no loading state needed — disable the button/control while processing.
- **2–5 seconds:** simple present-tense message. "Saving your changes…"
- **Over 5 seconds:** progressive messages that update.
  > "Preparing your report… → Crunching the numbers… → Almost there…"
- **Never** describe internal system states: "Fetching API response" → "Loading your data"
- **Skeleton screens** over spinners for content-area loading. Spinners only for button/transactional presses.
- Skeleton shapes must match the actual content shape — not generic grey rectangles.

---

## Tooltips

- **One sentence maximum.** Not a paragraph.
- **Explain what is not obvious** from the label alone. If the label is self-explanatory: no tooltip needed.
- **Trigger on focus as well as hover** — keyboard users need them too.
- **Never** repeat the label verbatim. ("Settings" tooltip: "Settings" = useless.)
- **Never** use tooltip as a substitute for a clear label. Fix the label; don't add a crutch tooltip.

---

## Confirmation dialogs

Every confirmation dialog needs:

**Title:** Name the specific action. "Confirm action?" is too weak. Use: "Delete this project?"

**Body:** State the consequence clearly and specifically.
> "This will permanently delete [project name] and all its data. This cannot be undone."

**CTA pair:** Name the outcome — do not use generic "Confirm" / "Cancel".
- Destructive action button (red/danger): "Delete project"
- Safe escape: "Keep it" (not "Cancel" — "Keep it" names what happens if they don't confirm)

**Ban list:**
- "Are you sure?" as the title (creates anxiety, not clarity)
- "Confirm" as the primary CTA without naming what is being confirmed
- "Cancel" as the escape — name what's being preserved instead

---

## Plain-language rules

- **Reading level:** write for a colleague, not a manual. If you wouldn't say it aloud, rewrite it.
- **Active voice.** "Your changes have been saved" → "Changes saved."
- **Present tense for states.** "Loading…" not "Loading has begun."
- **Specific over vague.** "Couldn't connect to [service name]" not "Connection issue."

**Avoid:**
- "Please", "kindly", hedging ("may", "might", "perhaps"), passive voice
- "I'd be happy to help", "Great!", "Certainly!", "Of course!" — UI copy is not a chatbot
- "Successfully" in success states (redundant — the green checkmark communicates success)
- Ellipsis abuse — one "…" for genuine uncertainty; not decorative trailing off

---

## Copy ban list (common failures to flag in reviews)

- `N/A` / `null` / `undefined` / `Error` as user-facing text
- "Are you sure?" as a confirmation prompt
- Empty states with only an icon and no text
- Tooltips on obvious controls ("Click to expand" on a clearly labelled expand button)
- Success states with no confirmation of what happened next ("Your form was submitted" — what happens now?)
- Any copy that could apply to any product on any screen — make it specific to this product and this moment

---

## What to encode vs. leave to human judgment

**Encoded here:** The verb-noun button rule, the three-part patterns for empty states and errors, progressive loading language, tooltip rules, confirmation dialog structure, plain-language rules, the ban lists.

**Left to human judgment:**
- Brand voice and personality (warm, formal, playful) — `copy-craft` handles this layer
- Specific product terminology and naming conventions — only the product team knows these
- Whether a particular tooltip is needed at all for a specific control (requires knowing user's prior knowledge)
- Tone calibration for the audience (internal tool vs. client-facing product)

---

## Skill relationships

| Skill | Relationship |
|---|---|
| `copy-craft` | Companion — copy-craft = marketing/editorial voice; ux-microcopy = interface copy. Share the AI buzzword ban list. |
| `story-audit` | story-audit identifies copy failures in artifacts; ux-microcopy provides the fix. Natural sequence. |
| `de-slop-deck` | de-slop-deck has a verbal ban list for presentations; sync the shared ban list between the two. |
