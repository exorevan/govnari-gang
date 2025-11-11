import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GodsPage() {
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGods() {
      try {
        setLoading(true);
        const response = await fetch("/data/lore/gods.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить богов");
        }
        const data = await response.json();
        setGods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGods();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "24px", textAlign: "center" }}>
        <div>Загрузка богов...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "24px" }}>
        <div style={{ color: "#ff4d4d" }}>Ошибка: {error}</div>
        <Link
          to="/lore"
          style={{ color: "#4da3ff", marginTop: 16, display: "inline-block" }}
        >
          Вернуться к разделу "Знания"
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>Боги</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {gods.map((gd) => (
          <Link
            key={gd.id}
            to={`/lore/gods/${gd.id}`}
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
                background: `url(${gd.banner}) center/cover no-repeat`,
                filter: "saturate(0.9)",
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
                <div style={{ fontWeight: 700, fontSize: 18 }}>{gd.name}</div>
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
                src={gd.symbol}
                alt="symbol"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  opacity: 0.9,
                }}
              />
              <em style={{ opacity: 0.8, fontSize: 13 }}>"{gd.quote}"</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
