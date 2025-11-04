import { useMemo } from "react";

export function useSearch(items, query, fields) {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    const q = String(query || "").toLowerCase().trim();
    if (!q) return items;
    return items.filter((it) => fields.some((f) => String(it[f] ?? "").toLowerCase().includes(q)));
  }, [items, query, fields]);
}


