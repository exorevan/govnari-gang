import React from "react";
import { useState } from "react";
import { quotes } from "../../../data/chronicles/quotes";

export default function QuotesPage() {
  const [sort, setSort] = useState("epic");
  const sorted = quotes.filter((q) => (sort === "all" ? true : q.type === sort));

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>Цитаты</h2>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: "#121212", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 8px" }}>
          <option value="all">Все</option>
          <option value="funny">Самые смешные</option>
          <option value="epic">Самые эпичные</option>
          <option value="silly">Самые глупые</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {sorted.map((q) => (
          <div key={q.id} style={{ background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16 }}>
            <blockquote style={{ margin: 0, fontSize: 20, lineHeight: 1.6 }}>
              “{q.text}”
            </blockquote>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <img src={q.character.portrait} alt={q.character.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                <strong>{q.character.name}</strong>
              </span>
              <span style={{ opacity: 0.9 }}>Контекст: {q.context}</span>
              <span style={{ opacity: 0.9 }}>Реакция: {q.reaction}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
