// src/pages/Rules/Homebrew/HomebrewDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function HomebrewDetail() {
  const { id } = useParams();
  const [homebrew, setHomebrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHomebrew() {
      try {
        setLoading(true);
        const response = await fetch(`/data/rules/homebrew/${id}.json`);
        if (!response.ok) throw new Error("Homebrew правило не найдено");
        const data = await response.json();
        setHomebrew(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHomebrew();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка...</div>
      </main>
    );
  }

  if (error || !homebrew) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Homebrew правило не найдено</h2>
        <Link to="/rules/homebrew">← Назад к списку</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/rules/homebrew"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к списку homebrew
        </Link>
      </div>

      <header style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <h1 style={{ margin: 0, color: "#d4af37" }}>{homebrew.title}</h1>
          {homebrew.category && (
            <span
              style={{
                padding: "6px 12px",
                background: "rgba(212,175,55,0.2)",
                border: "1px solid rgba(212,175,55,0.4)",
                borderRadius: 8,
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              {homebrew.category}
            </span>
          )}
        </div>

        {homebrew.description && (
          <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.9 }}>
            {homebrew.description}
          </p>
        )}

        <div style={{ display: "flex", gap: 24, marginTop: 16, opacity: 0.8 }}>
          {homebrew.author && <div>Автор: {homebrew.author}</div>}
          {homebrew.version && <div>Версия: {homebrew.version}</div>}
        </div>
      </header>

      {homebrew.content && (
        <section
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              lineHeight: 1.8,
              fontSize: 16,
            }}
          >
            {homebrew.content.split("\n").map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  margin: idx > 0 ? "16px 0 0" : 0,
                  textIndent: paragraph.trim().startsWith("-") ? 0 : "2em",
                }}
              >
                {parseTextWithLinks(paragraph.trim())}
              </p>
            ))}
          </div>
        </section>
      )}

      {homebrew.mechanics && homebrew.mechanics.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Механики</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {homebrew.mechanics.map((mechanic, idx) => (
              <div
                key={idx}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                {mechanic.name && (
                  <h3 style={{ margin: "0 0 8px", color: "#d4af37" }}>
                    {mechanic.name}
                  </h3>
                )}
                {mechanic.description && (
                  <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.9 }}>
                    {mechanic.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {homebrew.examples && homebrew.examples.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Примеры использования</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {homebrew.examples.map((example, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(77,163,255,0.05)",
                  border: "1px solid rgba(77,163,255,0.2)",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    opacity: 0.9,
                  }}
                >
                  {example}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {homebrew.tags && homebrew.tags.length > 0 && (
        <section>
          <h3 style={{ marginBottom: 12 }}>Теги</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {homebrew.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: "6px 12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function parseTextWithLinks(text) {
  if (!text) return text;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const linkText = match[1];
    const linkPath = match[2];
    parts.push(
      <Link
        key={`link-${keyCounter++}`}
        to={linkPath}
        style={{ color: "#4da3ff", textDecoration: "none", fontWeight: 500 }}
      >
        {linkText}
      </Link>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
