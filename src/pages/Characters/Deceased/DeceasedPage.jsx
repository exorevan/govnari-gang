// src/pages/Characters/Deceased/DeceasedPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../hooks/useData";

export default function DeceasedPage() {
  const { data: deceased, loading, error } = useData("characters", "deceased");

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
      <h2 style={{ marginBottom: 16 }}>Павшие герои</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {deceased.map((d) => (
          <Link
            key={d.id}
            to={`/characters/deceased/${d.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#121212",
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
                  position: "relative",
                  height: 180,
                  background: `url(${d.banner}) center/cover no-repeat`,
                  filter: "grayscale(0.8) contrast(1.05)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "4px 8px",
                    background: "#7a0b0b",
                    color: "#fff",
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  ПАВШИЙ
                </div>
                <div style={{ position: "absolute", bottom: 8, left: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{d.name}</div>
                  <div style={{ opacity: 0.85 }}>{d.role}</div>
                </div>
              </div>
              <div
                style={{
                  padding: 12,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {d.symbol && (
                  <img
                    src={d.symbol}
                    alt="symbol"
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: "contain",
                      opacity: 0.9,
                    }}
                  />
                )}
                {d.quote && (
                  <em style={{ opacity: 0.8, fontSize: 13 }}>"{d.quote}"</em>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
