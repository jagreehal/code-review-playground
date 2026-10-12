---
name: robustness
description: >
  Flags changed functions that dereference input their callers can send as null, undefined or an empty segment, when no test passes that input.
---

# robustness

## Review

What to flag, most important first. Give each rule an id so findings read
`[robustness/<id>]`.

- **new-deref-untested**: a function that now calls a method or reads a property on an argument (`name.trim()`, `user.id`) where callers, payloads or the declared type can pass `null` or `undefined`, and no test in the diff passes that input. Flag the dereference. Why: the call used to tolerate a nullish value, and one caller still sends it.
- **index-without-check**: an element read straight off `split`, `match`, `find` or an array index and then dereferenced (`part[0].toUpperCase()`), where the result can be empty or missing, and no test in the diff feeds an empty segment (a repeated separator, an empty string). Flag the read. Why: the first empty segment throws in production.

## Fix

How triage should fix a `[robustness/...]` finding.

- Prefer: guard at the dereference (`(name ?? "")`, `part.charAt(0)`, `filter(Boolean)`) and add one test that passes the failing input.
- Never touch: the function's signature for callers outside the diff, unless the guard needs the wider parameter type.
- Escalate: when the fix would change what a nullish input produces for callers outside the PR.
