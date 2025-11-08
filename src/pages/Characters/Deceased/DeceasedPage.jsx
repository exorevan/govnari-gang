import React from "react";
import { deceased } from "../../../data/characters/deceased";

export default function DeceasedPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Павшие</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {deceased.map((d) => (
          <div
            key={d.id}
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
              <em style={{ opacity: 0.8, fontSize: 13 }}>“{d.quote}”</em>
            </div>
            <div style={{ padding: 12, display: "grid", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  Обстоятельства смерти
                </div>
                <p style={{ margin: 0 }}>{d.death}</p>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Наследие</div>
                <p style={{ margin: 0 }}>{d.legacy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
