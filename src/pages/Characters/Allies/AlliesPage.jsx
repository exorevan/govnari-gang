import React from "react";
import { Link } from "react-router-dom"; // ← Добавьте import
import { allies } from "../../../data/characters/allies";

export default function AlliesPage() {
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
            to={`/characters/allies/${a.id}`} // ← Добавьте путь
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#121212",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer", // ← Добавьте курсор
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
