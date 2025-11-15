// utils/slugify.ts
export function slugify(s: unknown): string {
  const base = String(s ?? "")
    .normalize("NFKD")                 // split accents
    .replace(/[\u0300-\u036f]/g, "");  // remove accents

  return base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanum
    .replace(/\s+/g, "-")         // spaces -> dashes
    .replace(/-+/g, "-");         // collapse dashes
}
