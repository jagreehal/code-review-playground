---
name: architecture
description: >
  Flags enterprise patterns this small codebase does not need: one-implementation interfaces, factories, facades, DI containers.
---

# architecture

## Review

What to flag, most important first. Give each rule an id so findings read
`[architecture/<id>]`.

- **one-impl-interface**: an interface (`I*`) with exactly one implementation. Flag: `IFoo` plus `DefaultFoo`/`FooImpl` and nothing else implementing it. Why: every change edits two files and readers chase indirection.
- **factory-for-one**: a factory, abstract factory, or strategy factory that only ever builds one product. Flag: `create()` whose branches all return the same class, or a single `new`. Why: construction was already one line.
- **facade-passthrough**: a facade or use-case class whose methods only forward to one other object. Flag: every method body is `return this.x.y(...)`. Why: a layer that adds no behaviour.
- **di-container**: a hand-rolled service container or registry for fewer than a handful of services. Flag: `register`/`resolve` by string key. Why: plain imports and parameters do the same with type checking.

## Fix

How triage should fix a `[architecture/...]` finding.

- Prefer: plain exported functions; inline the single implementation and delete the interface; call the real object instead of the facade.
- Never touch: `src/index.ts` exports (the public entry point); tests may change only to call the simplified code.
- Escalate: removing anything exported from `src/index.ts`.
