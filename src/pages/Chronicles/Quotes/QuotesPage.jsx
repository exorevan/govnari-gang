import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("all");

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    try {
      const indexResponse = await fetch("/data/chronicles/quotes/index.json");
      const index = await indexResponse.json();

      const quotesPromises = index.quotes.map(async (id) => {
        const response = await fetch(`/data/chronicles/quotes/${id}.json`);
        return response.json();
      });

      const loadedQuotes = await Promise.all(quotesPromises);
      setQuotes(loadedQuotes);
    } catch (error) {
      console.error("Ошибка загрузки цитат:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = quotes.filter((q) =>
    sort === "all" ? true : q.type === sort,
  );

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Загрузка цитат...</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Цитаты</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "6px 8px",
          }}
        >
          <option value="all">Все</option>
          <option value="funny">Самые смешные</option>
          <option value="epic">Самые эпичные</option>
          <option value="silly">Самые глупые</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map((q) => (
          <div
            key={q.id}
            style={{
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <blockquote style={{ margin: 0, fontSize: 20, lineHeight: 1.6 }}>
              "{q.text}"
            </blockquote>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {q.character && (
                <Link
                  to={getCharacterPath(q.character.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <img
                    src={q.character.portrait}
                    alt={q.character.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{q.character.name}</strong>
                </Link>
              )}
              {q.context && (
                <span style={{ opacity: 0.9 }}>Контекст: {q.context}</span>
              )}
              {q.reaction && (
                <span style={{ opacity: 0.9 }}>Реакция: {q.reaction}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
