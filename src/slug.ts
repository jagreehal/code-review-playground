const SEPARATORS = /[^a-z0-9]+/g;

/** URL slug: lowercase, non-alphanumerics collapsed to a single dash. */
export function slugify(input: string): string {
  return input.toLowerCase().replace(SEPARATORS, "-").replace(/^-|-$/g, "");
}

export function uniqueSlug(input: string, taken: Set<string>): string {
  const base = slugify(input);
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
