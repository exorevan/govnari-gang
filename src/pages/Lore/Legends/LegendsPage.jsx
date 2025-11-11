import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LegendsPage() {
  const [legends, setLegends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadLegends() {
      try {
        setLoading(true);
        const response = await fetch("/data/lore/legends.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить легенды");
        }
        const data = await response.json();
        setLegends(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLegends();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка легенд...</div>
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

  if (legends.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Легенды</h2>
        <div
          style={{
            padding: 32,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>✨</div>
          <p style={{ opacity: 0.7 }}>
            Легенды и мифы ещё не добавлены в базу данных.
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

  // Получаем уникальные типы легенд для фильтра
  const types = ["all", ...new Set(legends.map((l) => l.type).filter(Boolean))];

  // Фильтруем легенды
  const filteredLegends =
    filter === "all" ? legends : legends.filter((l) => l.type === filter);

  return (
    <main style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Легенды</h2>
          <p
            style={{
              marginTop: 8,
              maxWidth: 720,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Древние сказания, мифы и предания, передающиеся из поколения в
            поколение.
          </p>
        </div>

        {types.length > 1 && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              background: "#121212",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            <option value="all">Все типы</option>
            {types
              .filter((t) => t !== "all")
              .map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {filteredLegends.map((legend) => (
          <article
            key={legend.id}
            style={{
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {legend.image && (
              <div
                style={{
                  height: 180,
                  background: `url(${legend.image}) center/cover no-repeat`,
                  position: "relative",
                }}
              >
                {legend.type && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.7)",
                      border: "1px solid rgba(212,175,55,0.5)",
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#d4af37",
                    }}
                  >
                    {legend.type}
                  </div>
                )}
              </div>
            )}
            <div
              style={{
                padding: 16,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 20,
                  color: "#d4af37",
                }}
              >
                {legend.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                  opacity: 0.9,
                  flexGrow: 1,
                }}
              >
                {parseTextWithLinks(legend.description)}
              </p>
              {legend.origin && (
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 13,
                    opacity: 0.7,
                  }}
                >
                  Происхождение: {legend.origin}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredLegends.length === 0 && (
        <div
          style={{
            padding: 32,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ opacity: 0.7 }}>Легенды типа "{filter}" не найдены.</p>
        </div>
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
