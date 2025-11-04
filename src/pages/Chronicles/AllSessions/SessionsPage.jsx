import React from "react";
import { Link } from "react-router-dom";
import { sessions } from "../../../data/chronicles/sessions";

export default function SessionsPage() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <h2>Сессии</h2>
      {sessions.map((s) => (
        <Link
          key={s.id}
          to={`/chronicles/sessions/${s.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#121212",
            display: "block",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={s.heroImage}
              alt={s.title}
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.7) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>
                  {s.realDate} • {s.gameDate} • #{s.num}
                </div>
                <div style={{ fontWeight: 800, fontSize: 22 }}>{s.title}</div>
              </div>
            </div>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ opacity: 0.9 }}>{s.summary}</div>
          </div>
        </Link>
      ))}
    </main>
  );
}
