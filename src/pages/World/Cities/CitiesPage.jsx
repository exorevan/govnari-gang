// src/pages/World/Cities/CitiesPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCities() {
      try {
        setLoading(true);

        // Загружаем список ID городов
        const indexResponse = await fetch("/data/world/cities/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список городов");
        }
        const cityIds = await indexResponse.json();

        // Загружаем данные каждого города
        const citiesData = await Promise.all(
          cityIds.map(async (id) => {
            const response = await fetch(`/data/world/cities/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить город ${id}`);
            }
            return response.json();
          }),
        );

        setCities(citiesData);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки городов:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCities();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка городов...</div>
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
          ← Назад к разделу "Мир"
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Города</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {cities.map((c) => (
          <Link
            key={c.id}
            to={`/world/cities/${c.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
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
                height: 160,
                background: `url(${c.panorama}) center/cover no-repeat`,
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
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img
                  src={c.flag}
                  alt="flag"
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
                  <div style={{ opacity: 0.85, fontSize: 13 }}>{c.motto}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
