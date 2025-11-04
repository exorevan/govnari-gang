import React from "react";
import { Link } from "react-router-dom";
import { npcs } from "../../../data/characters/npcs";

export default function NPCsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>НПЦ</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {npcs.map((n) => (
          <Link
            key={n.id}
            to={`/characters/npcs/${n.id}`}
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
                background: `url(${n.banner}) center/cover no-repeat`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 8, left: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{n.name}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>{n.role}</div>
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
                src={n.symbol}
                alt="symbol"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  opacity: 0.9,
                }}
              />
              <em style={{ opacity: 0.8, fontSize: 13 }}>“{n.quote}”</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
