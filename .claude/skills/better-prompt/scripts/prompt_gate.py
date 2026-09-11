#!/usr/bin/env python3
"""better-prompt — mechanical gate for a strengthened prompt.

This is a LINT, not a proof. It catches the failure modes that are cheap to
detect mechanically and expensive to notice by eye, all of which are current-model
regressions the skill's own doctrine bans:

  PREFILL      an assistant-turn prefill (400 error on current models)
  SHOUT        "CRITICAL: YOU MUST" register (causes over-triggering now)
  ASK_FIRST    long source material placed AFTER the ask, not before it
  PLACEHOLDER  an invented/unfilled example ([example], TODO, lorem ipsum)
  OVERVERIFY   "verify your answer" aimed at Opus 5, which self-verifies
  OVERSCAFFOLD XML wrap on a prompt too short to need one

Usage
  prompt_gate.py <file>              check one prompt file
  prompt_gate.py --model opus-5 f    check with the target model known
  cat p.txt | prompt_gate.py -       check stdin
  prompt_gate.py --self-test         verify the gate itself (clean pass, dirty FAIL)

Exit codes: 0 clean · 2 findings · 1 the gate itself is broken.
Written for the Python 3.9 on this Mac — no PEP-604 unions, no walrus in comprehensions.
"""
import argparse
import os
import re
import sys

FIXTURES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fixtures")

# A block of source material this long or longer is "long input" for ASK_FIRST.
LONG_INPUT_CHARS = 1500
# Below this, a prompt is too short to justify an XML wrap.
OVERSCAFFOLD_CHARS = 220

PLACEHOLDER_PAT = re.compile(
    r"(\[(example|your .{0,20}|insert .{0,20}|placeholder|todo)\]|lorem ipsum|TODO:|XXX:)",
    re.I,
)
# Shouted obligation: MUST/NEVER/ALWAYS in caps, or CRITICAL/IMPORTANT used as a siren.
SHOUT_PAT = re.compile(
    r"(\b(CRITICAL|IMPORTANT|WARNING|ATTENTION)\b\s*[:!]|\bYOU MUST\b|\bMUST ALWAYS\b|\bNEVER EVER\b)"
)
# An assistant-turn prefill left at the tail of the prompt.
PREFILL_PAT = re.compile(
    r"(^|\n)\s*(assistant\s*:\s*$|assistant\s*:\s*(here|the|\{|\[)|"
    r"\"?role\"?\s*:\s*\"?assistant\"?\s*,?\s*\"?content\"?\s*:\s*\"[^\"]{0,40}$)",
    re.I,
)
OVERVERIFY_PAT = re.compile(
    r"(verify your (answer|work|output)|double[- ]check your (answer|work)|"
    r"before you finish,? verify|check your work (before|against))",
    re.I,
)
XML_TAG_PAT = re.compile(r"<(context|instructions|constraints|output_format|example|examples)>")
# Where the operator's actual ask lives, for ASK_FIRST.
ASK_PAT = re.compile(
    r"^\s*(analyse|analyze|summari[sz]e|write|draft|extract|classify|compare|review|"
    r"rewrite|explain|identify|list|build|create|fix|find)\b",
    re.I | re.M,
)


class Finding(object):
    def __init__(self, code, line, message):
        self.code = code
        self.line = line
        self.message = message

    def __str__(self):
        loc = "line %d" % self.line if self.line else "prompt"
        return "  [%-12s] %s — %s" % (self.code, loc, self.message)


def _line_of(text, idx):
    return text.count("\n", 0, idx) + 1


def check(text, model=""):
    """Return a list of Finding. Pure function — no I/O, so it is testable."""
    findings = []
    model = (model or "").lower()

    m = PREFILL_PAT.search(text)
    if m:
        findings.append(Finding(
            "PREFILL", _line_of(text, m.start()),
            "assistant-turn prefill detected; returns a 400 on current models. "
            "Use structured outputs or a direct instruction instead."))

    for m in SHOUT_PAT.finditer(text):
        findings.append(Finding(
            "SHOUT", _line_of(text, m.start()),
            "shouted obligation %r — current models over-trigger on this register. "
            "Use normal phrasing (\"Use this tool when…\")." % m.group(0).strip()))

    for m in PLACEHOLDER_PAT.finditer(text):
        findings.append(Finding(
            "PLACEHOLDER", _line_of(text, m.start()),
            "unfilled placeholder %r — an invented example teaches the engine a fact "
            "that isn't true. Fill it from real material or cut it." % m.group(0).strip()))

    if "opus-5" in model or "opus 5" in model:
        m = OVERVERIFY_PAT.search(text)
        if m:
            findings.append(Finding(
                "OVERVERIFY", _line_of(text, m.start()),
                "verification instruction aimed at Opus 5, which self-verifies well; "
                "this causes over-verification. Remove it rather than rewriting it."))

    # ASK_FIRST: if there is a long block of source material, the ask should follow it.
    if len(text) >= LONG_INPUT_CHARS:
        ask = ASK_PAT.search(text)
        if ask:
            head = text[:ask.start()]
            tail = text[ask.end():]
            # Long material sitting AFTER the ask, with little before it, is the bug.
            if len(tail) >= LONG_INPUT_CHARS and len(head) < len(tail) / 2:
                findings.append(Finding(
                    "ASK_FIRST", _line_of(text, ask.start()),
                    "the ask appears before %d chars of source material. Put long inputs "
                    "at the TOP and the ask at the BOTTOM — worth up to 30%% on long "
                    "context." % len(tail)))

    if len(text) < OVERSCAFFOLD_CHARS and XML_TAG_PAT.search(text):
        m = XML_TAG_PAT.search(text)
        findings.append(Finding(
            "OVERSCAFFOLD", _line_of(text, m.start()),
            "XML wrap on a %d-char prompt. Scaffolding costs tokens on every run; "
            "a quick question stays one terse line." % len(text)))

    return findings


# ---------------------------------------------------------------- self-test

def _load_fixtures(kind):
    d = os.path.join(FIXTURES, kind)
    if not os.path.isdir(d):
        return []
    out = []
    for name in sorted(os.listdir(d)):
        if name.startswith("."):
            continue
        path = os.path.join(d, name)
        with open(path) as fh:
            out.append((name, fh.read()))
    return out


def self_test():
    """A validator that has only ever passed is untested.

    Clean fixtures must produce zero findings; each dirty fixture must produce the
    finding its filename claims (dirty/SHOUT-....txt must raise SHOUT). Both halves
    must hold, or the gate itself is broken.
    """
    ok = True
    clean = _load_fixtures("clean")
    dirty = _load_fixtures("dirty")

    if not clean or not dirty:
        print("FAIL  fixtures missing — expected %s/{clean,dirty}" % FIXTURES)
        return 1

    print("clean fixtures (must produce NO findings):")
    for name, text in clean:
        model = "opus-5" if "opus" in name else ""
        f = check(text, model)
        if f:
            ok = False
            print("  FAIL  %s — expected clean, got %d finding(s):" % (name, len(f)))
            for x in f:
                print("  " + str(x))
        else:
            print("  pass  %s" % name)

    print("\ndirty fixtures (must FAIL with the code in the filename):")
    for name, text in dirty:
        want = name.split("-")[0].upper()
        model = "opus-5" if want == "OVERVERIFY" else ""
        codes = [x.code for x in check(text, model)]
        if want in codes:
            print("  pass  %s — correctly raised %s" % (name, want))
        else:
            ok = False
            print("  FAIL  %s — expected %s, got %s" % (name, want, codes or "nothing"))

    print("\n%s" % ("SELF-TEST PASSED" if ok else "SELF-TEST FAILED"))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser(description="Lint a strengthened prompt.")
    ap.add_argument("file", nargs="?", help="prompt file, or - for stdin")
    ap.add_argument("--model", default="", help="target model, e.g. opus-5")
    ap.add_argument("--self-test", action="store_true", help="verify the gate itself")
    args = ap.parse_args()

    if args.self_test:
        return self_test()

    if not args.file:
        ap.print_help()
        return 1

    text = sys.stdin.read() if args.file == "-" else open(args.file).read()
    findings = check(text, args.model)

    if not findings:
        print("clean — no gate violations")
        return 0

    print("%d finding(s):" % len(findings))
    for f in findings:
        print(str(f))
    return 2


if __name__ == "__main__":
    sys.exit(main())
