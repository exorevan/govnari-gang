// src/pages/Rules/Homebrew/HomebrewPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomebrewPage() {
  const [homebrews, setHomebrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadHomebrews() {
      try {
        setLoading(true);

        // Загружаем индекс
        const indexResponse = await fetch("/data/rules/homebrew/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список homebrew правил");
        }
        const homebrewIds = await indexResponse.json();

        // Загружаем данные каждого homebrew
        const homebrewsData = await Promise.all(
          homebrewIds.map(async (id) => {
            const response = await fetch(`/data/rules/homebrew/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить homebrew ${id}`);
            }
            return response.json();
          }),
        );

        setHomebrews(homebrewsData);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки homebrew:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomebrews();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>
          Загрузка homebrew правил...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          <strong>Ошибка:</strong> {error}
        </div>
        <Link to="/rules" style={{ color: "#4da3ff" }}>
          ← Назад к правилам
        </Link>
      </main>
    );
  }

  // Получаем уникальные категории
  const categories = [
    "all",
    ...new Set(homebrews.map((h) => h.category).filter(Boolean)),
  ];

  // Фильтруем по категории
  const filteredHomebrews =
    filter === "all"
      ? homebrews
      : homebrews.filter((h) => h.category === filter);

  return (
    <main style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Homebrew правила</h2>
          <p style={{ marginTop: 8, opacity: 0.9, maxWidth: 720 }}>
            Пользовательские правила, расы, классы и механики для расширения
            игры
          </p>
        </div>

        {categories.length > 1 && (
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
            <option value="all">Все категории</option>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
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
        {filteredHomebrews.map((homebrew) => (
          <Link
            key={homebrew.id}
            to={`/rules/homebrew/${homebrew.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  color: "#d4af37",
                }}
              >
                {homebrew.title}
              </h3>
              {homebrew.category && (
                <span
                  style={{
                    padding: "4px 8px",
                    background: "rgba(212,175,55,0.2)",
                    border: "1px solid rgba(212,175,55,0.4)",
                    borderRadius: 6,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {homebrew.category}
                </span>
              )}
            </div>

            {homebrew.description && (
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                  opacity: 0.9,
                  flexGrow: 1,
                }}
              >
                {homebrew.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              {homebrew.author && (
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  <span style={{ opacity: 0.6 }}>Автор:</span> {homebrew.author}
                </div>
              )}
              {homebrew.tags && homebrew.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {homebrew.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 6px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredHomebrews.length === 0 && (
        <div
          style={{
            padding: 48,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📜</div>
          <p style={{ opacity: 0.7 }}>
            {filter === "all"
              ? "Homebrew правила ещё не добавлены"
              : `Нет homebrew правил в категории "${filter}"`}
          </p>
        </div>
      )}
    </main>
  );
}
