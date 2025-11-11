// src/pages/Characters/Enemies/EnemiesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../hooks/useData";

export default function EnemiesPage() {
  const { data: enemies, loading, error } = useData("characters", "enemies");

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Ошибка загрузки</h2>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Враги</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {enemies.map((e) => (
          <Link
            key={e.id}
            to={`/characters/enemies/${e.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#121212",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,77,77,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div
                style={{
                  height: 160,
                  background: `url(${e.portrait}) center/cover no-repeat`,
                  filter: "contrast(1.1) saturate(1.2)",
                }}
              />
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700, color: "#ff4d4d" }}>
                  {e.name}
                </div>
                <div style={{ opacity: 0.8 }}>{e.role}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
