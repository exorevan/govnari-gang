import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../hooks/useData";

export default function AlliesPage() {
  const { data: allies, loading, error } = useData("characters", "allies");

  if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>;
  if (error) return <div style={{ padding: 24 }}>Ошибка: {error.message}</div>;

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Союзники</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {allies.map((a) => (
          <Link
            key={a.id}
            to={`/characters/allies/${a.id}`}
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
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div
                style={{
                  height: 160,
                  background: `url(${a.portrait}) center/cover no-repeat`,
                }}
              />
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{a.name}</div>
                <div style={{ opacity: 0.8 }}>{a.role}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
