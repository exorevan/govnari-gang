import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MapsPage() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMaps() {
      try {
        setLoading(true);
        const indexResponse = await fetch("/data/world/maps/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список карт");
        }
        const ids = await indexResponse.json();

        const mapsData = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`/data/world/maps/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить карту ${id}`);
            }
            return response.json();
          }),
        );

        setMaps(mapsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMaps();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка карт...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          Ошибка: {error}
        </div>
        <Link to="/world" style={{ color: "#4da3ff", textDecoration: "none" }}>
          ← Назад к миру
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <h2>Карты</h2>
      {maps.map((m) => (
        <section
          key={m.id}
          style={{
            background: "#121212",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={m.image}
              alt={m.title}
              style={{ width: "100%", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                padding: "6px 10px",
                background: "rgba(0,0,0,0.6)",
                borderRadius: 8,
                fontWeight: 700,
              }}
            >
              {m.title}
            </div>
          </div>
          <div
            style={{
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {m.legend.map((l, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 13,
                    opacity: 0.9,
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "4px 8px",
                    borderRadius: 999,
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
            <a
              href={m.download}
              download
              style={{
                textDecoration: "none",
                color: "#fff",
                background: "#2c3e50",
                padding: "6px 10px",
                borderRadius: 8,
              }}
            >
              Скачать в полном размере
            </a>
          </div>
        </section>
      ))}
    </main>
  );
}
