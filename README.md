# code-review-playground

A sandbox repo for comparing automated code review tools on deliberately flawed pull requests.

## Layout

- `src/index.ts` — the toy functions under review.
- `src/*.test.ts` — Vitest suites.
- `.github/workflows/stamp.yml` — approve-first review via stamp.

## Running the checks

```sh
pnpm install
pnpm test
pnpm typecheck
```
