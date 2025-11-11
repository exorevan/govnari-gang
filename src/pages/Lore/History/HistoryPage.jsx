import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const response = await fetch("/data/lore/history.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить историю");
        }
        const data = await response.json();
        setHistoryItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка исторических записей...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          Ошибка: {error}
        </div>
        <Link to="/lore" style={{ color: "#4da3ff", textDecoration: "none" }}>
          ← Вернуться к разделу "Знания"
        </Link>
      </main>
    );
  }

  if (historyItems.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>История</h2>
        <div
          style={{
            padding: 32,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📜</div>
          <p style={{ opacity: 0.7 }}>
            Исторические записи ещё не добавлены в базу данных.
          </p>
          <Link
            to="/lore"
            style={{
              color: "#4da3ff",
              textDecoration: "none",
              marginTop: 16,
              display: "inline-block",
            }}
          >
            ← Вернуться к разделу "Знания"
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>История</h2>
      <p
        style={{
          marginBottom: 24,
          maxWidth: 720,
          lineHeight: 1.6,
          opacity: 0.9,
        }}
      >
        Хроники прошлого, события, изменившие мир, и забытые истории древних
        цивилизаций.
      </p>

      <div style={{ display: "grid", gap: 24 }}>
        {historyItems.map((item) => (
          <article
            key={item.id}
            style={{
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: item.image ? "300px 1fr" : "1fr",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {item.image && (
              <div
                style={{
                  background: `url(${item.image}) center/cover no-repeat`,
                  minHeight: 200,
                }}
              />
            )}
            <div style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 14,
                  color: "#d4af37",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                {item.period}
              </div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 24,
                  color: "#fff",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.7,
                  opacity: 0.9,
                }}
              >
                {parseTextWithLinks(item.description)}
              </p>
            </div>
          </article>
        ))}
      </div>
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
