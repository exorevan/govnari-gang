// src/pages/Rules/Mechanics/MechanicDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function MechanicDetail() {
  const { id } = useParams();
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMechanic() {
      try {
        setLoading(true);
        const response = await fetch(`/data/rules/mechanics/${id}.json`);
        if (!response.ok) throw new Error("Механика не найдена");
        const data = await response.json();
        setMechanic(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMechanic();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка...</div>
      </main>
    );
  }

  if (error || !mechanic) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Механика не найдена</h2>
        <Link to="/rules/mechanics">← Назад к списку</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/rules/mechanics"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к списку механик
        </Link>
      </div>

      <header
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          marginBottom: 32,
        }}
      >
        {mechanic.icon && (
          <div
            style={{
              width: 96,
              height: 96,
              background: "rgba(77,163,255,0.1)",
              border: "1px solid rgba(77,163,255,0.3)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={mechanic.icon}
              alt="icon"
              style={{ width: 64, height: 64 }}
            />
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <h1 style={{ margin: 0, color: "#4da3ff" }}>{mechanic.title}</h1>
            {mechanic.category && (
              <span
                style={{
                  padding: "6px 12px",
                  background: "rgba(77,163,255,0.2)",
                  border: "1px solid rgba(77,163,255,0.4)",
                  borderRadius: 8,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                }}
              >
                {mechanic.category}
              </span>
            )}
          </div>

          {mechanic.description && (
            <p
              style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.9, margin: 0 }}
            >
              {mechanic.description}
            </p>
          )}

          {mechanic.difficulty && (
            <div style={{ marginTop: 12, opacity: 0.7 }}>
              Сложность: {mechanic.difficulty}
            </div>
          )}
        </div>
      </header>

      {mechanic.rules && (
        <section
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2 style={{ margin: "0 0 16px" }}>Правила</h2>
          <div style={{ lineHeight: 1.8, fontSize: 16 }}>
            {mechanic.rules.split("\n").map((paragraph, idx) => (
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

      {mechanic.examples && mechanic.examples.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Примеры</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {mechanic.examples.map((example, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(77,163,255,0.05)",
                  border: "1px solid rgba(77,163,255,0.2)",
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                {example.title && (
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: 18,
                      color: "#4da3ff",
                    }}
                  >
                    {example.title}
                  </h3>
                )}
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {mechanic.relatedMechanics && mechanic.relatedMechanics.length > 0 && (
        <section>
          <h2 style={{ marginBottom: 16 }}>Связанные механики</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {mechanic.relatedMechanics.map((related, idx) => (
              <Link
                key={idx}
                to={`/rules/mechanics/${related.id}`}
                style={{
                  padding: "8px 16px",
                  background: "rgba(77,163,255,0.1)",
                  border: "1px solid rgba(77,163,255,0.3)",
                  borderRadius: 8,
                  textDecoration: "none",
                  color: "#4da3ff",
                  fontSize: 14,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(77,163,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(77,163,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(77,163,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(77,163,255,0.3)";
                }}
              >
                {related.title}
              </Link>
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
