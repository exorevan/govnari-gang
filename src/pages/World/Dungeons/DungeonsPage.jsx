import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DungeonsPage() {
  const [dungeons, setDungeons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDungeons() {
      try {
        setLoading(true);

        // Загружаем список ID подземелий
        const indexResponse = await fetch("/data/world/dungeons/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список подземелий");
        }
        const dungeonIds = await indexResponse.json();

        // Загружаем данные каждого подземелья
        const dungeonsData = await Promise.all(
          dungeonIds.map(async (id) => {
            const response = await fetch(`/data/world/dungeons/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить подземелье ${id}`);
            }
            return response.json();
          }),
        );

        setDungeons(dungeonsData);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки подземелий:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDungeons();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>Загрузка подземелий...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          <strong>Ошибка:</strong> {error}
        </div>
        <Link to="/world" style={{ color: "#4da3ff", textDecoration: "none" }}>
          ← Назад к разделу "Мир"
        </Link>
      </main>
    );
  }

  if (dungeons.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Подземелья</h2>
        <div
          style={{
            padding: 32,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🏰</div>
          <p style={{ opacity: 0.7 }}>
            Подземелья ещё не добавлены в базу данных.
          </p>
          <Link
            to="/world"
            style={{
              color: "#4da3ff",
              textDecoration: "none",
              marginTop: 16,
              display: "inline-block",
            }}
          >
            ← Назад к разделу "Мир"
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Подземелья</h2>
      <p
        style={{
          marginBottom: 24,
          maxWidth: 720,
          lineHeight: 1.6,
          opacity: 0.9,
        }}
      >
        Опасные логова чудовищ, заброшенные крепости и древние руины, хранящие
        несметные сокровища и смертельные ловушки.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                position: "relative",
                height: 180,
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
                  bottom: 12,
                  left: 16,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 20 }}>{d.name}</div>
                <DangerLevel level={d.danger} />
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.6,
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                {d.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function DangerLevel({ level }) {
  const skulls = Array.from({ length: 5 }).map((_, i) => i < level);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {skulls.map((filled, idx) => (
        <span
          key={idx}
          style={{
            color: filled ? "#c0392b" : "#555",
            fontSize: 18,
          }}
        >
          ☠
        </span>
      ))}
    </div>
  );
}
