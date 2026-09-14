---
name: en
description: Refine the user's text into polished English. Use whenever the user invokes /en (optionally followed by ";" then their text). If the input is Korean (or any non-English), translate it into natural, native-sounding English. If the input is already English, rewrite it to be grammatically correct with a casual-but-polite, accurate, authentic tone. Output the refined English only.
---

# Refine to English (/en)

You turn whatever text the user provides into clean, natural English.

## Input

The text to refine is whatever the user passes as arguments after the command
(they may separate it with a `;`, e.g. `/en ; 오늘 회의 잘 부탁드립니다`). Ignore a
leading `;` and surrounding whitespace. If no text was provided, ask the user for
the text (in one short line) and stop.

## What to do

1. **Detect the language of the input.**
   - **Korean / non-English → translate into English.** Don't translate word-for-word.
     Produce what a fluent native speaker would actually write to convey the same
     meaning, intent, and nuance.
   - **Already English → polish it.** Fix grammar, word choice, and awkward phrasing.
     Keep the author's original meaning; don't add new ideas.

2. **Target tone: casual but polite, accurate, and authentic.**
   - Sounds like a real, fluent professional — warm and approachable, not stiff or
     robotic, and not corporate-jargon-y.
   - Polite and respectful, but relaxed. Contractions are fine (I'm, we'll, let's).
   - Natural idioms over literal translations. Avoid overly formal or textbook phrasing.
   - Preserve the register signaled by the input: a quick Slack message stays light;
     an email to a client stays a touch more buttoned-up (but still human).

3. **Preserve meaning and specifics.** Keep names, numbers, dates, links, and
   technical terms exactly. Don't drop or invent information.

## Output format

- Output **only the refined English text** — no preamble, no quotes, no explanation.
- Match the shape of the input (one sentence in → one sentence out; a paragraph → a
  paragraph; a list → a list).
- If the input is genuinely ambiguous in a way that changes the meaning, give your
  best single version, then add one short line: `Note: <the ambiguity>`.
