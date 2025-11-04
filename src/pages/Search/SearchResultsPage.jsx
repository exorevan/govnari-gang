import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDocuments } from "../../search/sources.js";
import { buildSnippet, searchDocuments } from "../../search/index.js";

function useQueryParam(name) {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name) || "", [search, name]);
}

export default function SearchResultsPage() {
  const q = useQueryParam("q");
  const docs = useMemo(() => getDocuments(), []);
  const results = useMemo(() => searchDocuments(docs, q), [docs, q]);

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1 style={{ marginBottom: 8 }}>Результаты поиска</h1>
      <div style={{ color: "var(--muted)", marginBottom: 24 }}>
        По запросу “{q}” найдено: {results.length}
      </div>

      {results.map((r) => {
        const snippet = buildSnippet(r.text || r.description || "", q, { radius: 90 });
        return (
          <article key={r.id} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: "#0b57d0" }}>
              <Link to={r.route}>{r.route}</Link>
            </div>
            <h3 style={{ margin: "4px 0" }}>
              <Link to={r.route}>{r.title}</Link>
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>{snippet}</p>
          </article>
        );
      })}

      {!results.length && (
        <div>Ничего не найдено. Попробуйте изменить запрос.</div>
      )}
    </main>
  );
}


