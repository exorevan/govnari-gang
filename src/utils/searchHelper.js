export function searchHelper(items, query, fields = []) {
  const q = String(query || "")
    .toLowerCase()
    .trim();
  if (!q) return items;
  return items.filter((it) =>
    fields.some((f) =>
      String(it[f] ?? "")
        .toLowerCase()
        .includes(q),
    ),
  );
}
