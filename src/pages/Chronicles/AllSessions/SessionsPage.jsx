import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSessions() {
      try {
        setLoading(true);
        const response = await fetch("/data/chronicles/sessions/index.json");
        if (!response.ok) throw new Error("Failed to load sessions");
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка сессий...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
      </main>
    );
  }

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
