// src/pages/Characters/PlayerCharacters/PlayerCharactersPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PlayerCharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacters() {
      try {
        // Загружаем список ID персонажей
        const indexResponse = await fetch(
          "/data/characters/players/index.json",
        );
        if (!indexResponse.ok)
          throw new Error("Не удалось загрузить список персонажей");
        const characterIds = await indexResponse.json();

        // Загружаем данные каждого персонажа
        const charactersData = await Promise.all(
          characterIds.map(async (id) => {
            const response = await fetch(`/data/characters/players/${id}.json`);
            if (!response.ok)
              throw new Error(`Не удалось загрузить персонажа ${id}`);
            return response.json();
          }),
        );

        setCharacters(charactersData);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки персонажей:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>Загрузка персонажей...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "24px" }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          <strong>Ошибка:</strong> {error}
        </div>
        <Link to="/characters" style={{ color: "#4da3ff" }}>
          ← Назад к персонажам
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>Игровые персонажи</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {characters.map((pc) => (
          <Link
            key={pc.id}
            to={`/characters/players/${pc.id}`}
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
                background: `url(${pc.banner}) center/cover no-repeat`,
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
                <div style={{ fontWeight: 700, fontSize: 18 }}>{pc.name}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>
                  {pc.class} • {pc.race} • ур. {pc.level}
                </div>
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
              {pc.symbol && (
                <img
                  src={pc.symbol}
                  alt="symbol"
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: "contain",
                    opacity: 0.9,
                  }}
                />
              )}
              <em style={{ opacity: 0.8, fontSize: 13 }}>"{pc.quote}"</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
