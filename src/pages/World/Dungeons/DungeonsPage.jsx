import React from "react";
import { Link } from "react-router-dom";
import { dungeons } from "../../../data/world/dungeons";

export default function DungeonsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Подземелья</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {dungeons.map((d) => (
          <Link
            key={d.id}
            to={`/world/dungeons/${d.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#121212",
            }}
          >
            <div
              style={{
                position: "relative",
                height: 160,
                background: `url(${d.headerImage}) center/cover no-repeat`,
                filter: "brightness(0.9)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 18 }}>{d.name}</div>
                <Danger level={d.danger} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function Danger({ level }) {
  const skulls = Array.from({ length: 5 }).map((_, i) => i < level);
  return (
    <div>
      {skulls.map((filled, idx) => (
        <span
          key={idx}
          style={{ color: filled ? "#c0392b" : "#555", marginLeft: 2 }}
        >
          ☠
        </span>
      ))}
    </div>
  );
}
