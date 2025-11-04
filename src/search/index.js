export function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildSnippet(text, query, opts = {}) {
  const source = normalizeText(text).toString();
  const q = String(query || "").trim();
  const radius = opts.radius ?? 80;
  if (!q) return source.slice(0, radius * 2);
  const idx = source.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return source.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(source.length, idx + q.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < source.length ? "…" : "";
  return prefix + source.slice(start, end) + suffix;
}

export function searchDocuments(documents, query) {
  const q = String(query || "")
    .toLowerCase()
    .trim();
  if (!q) return documents;
  const scored = documents
    .map((doc) => {
      const hay = [doc.title, doc.description, doc.text]
        .filter(Boolean)
        .map((x) => String(x).toLowerCase())
        .join(" \n ");
      const idx = hay.indexOf(q);
      if (idx === -1) return null;
      const score = 10000 - idx; // simple ranking: earlier match ranks higher
      return { doc, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.doc);
  return scored;
}
