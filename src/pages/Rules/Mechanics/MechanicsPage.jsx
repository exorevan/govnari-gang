// src/pages/Rules/Mechanics/MechanicsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MechanicsPage() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadMechanics() {
      try {
        setLoading(true);

        // Загружаем индекс
        const indexResponse = await fetch("/data/rules/mechanics/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список механик");
        }
        const mechanicsIds = await indexResponse.json();

        // Загружаем данные каждой механики
        const mechanicsData = await Promise.all(
          mechanicsIds.map(async (id) => {
            const response = await fetch(`/data/rules/mechanics/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить механику ${id}`);
            }
            return response.json();
          }),
        );

        setMechanics(mechanicsData);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки механик:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMechanics();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>Загрузка механик...</div>
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
    ...new Set(mechanics.map((m) => m.category).filter(Boolean)),
  ];

  // Фильтруем по категории
  const filteredMechanics =
    filter === "all"
      ? mechanics
      : mechanics.filter((m) => m.category === filter);

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
          <h2 style={{ margin: 0 }}>Механики игры</h2>
          <p style={{ marginTop: 8, opacity: 0.9, maxWidth: 720 }}>
            Правила и механики, используемые в кампании
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

      <div style={{ display: "grid", gap: 16 }}>
        {filteredMechanics.map((mechanic) => (
          <Link
            key={mechanic.id}
            to={`/rules/mechanics/${mechanic.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              gap: 20,
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(77,163,255,0.5)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {mechanic.icon && (
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "rgba(77,163,255,0.1)",
                  border: "1px solid rgba(77,163,255,0.3)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={mechanic.icon}
                  alt="icon"
                  style={{ width: 40, height: 40 }}
                />
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 22,
                    color: "#4da3ff",
                  }}
                >
                  {mechanic.title}
                </h3>
                {mechanic.category && (
                  <span
                    style={{
                      padding: "4px 8px",
                      background: "rgba(77,163,255,0.2)",
                      border: "1px solid rgba(77,163,255,0.4)",
                      borderRadius: 6,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {mechanic.category}
                  </span>
                )}
              </div>

              {mechanic.description && (
                <p
                  style={{
                    margin: "0 0 12px",
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  {mechanic.description}
                </p>
              )}

              {mechanic.difficulty && (
                <div style={{ fontSize: 14, opacity: 0.7 }}>
                  <span style={{ opacity: 0.6 }}>Сложность:</span>{" "}
                  {mechanic.difficulty}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredMechanics.length === 0 && (
        <div
          style={{
            padding: 48,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>⚙️</div>
          <p style={{ opacity: 0.7 }}>
            {filter === "all"
              ? "Механики ещё не добавлены"
              : `Нет механик в категории "${filter}"`}
          </p>
        </div>
      )}
    </main>
  );
}
