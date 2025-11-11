import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GeographyPage() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRegions() {
      try {
        setLoading(true);
        const indexResponse = await fetch("/data/world/geography/index.json");
        if (!indexResponse.ok) {
          throw new Error("Не удалось загрузить список регионов");
        }
        const ids = await indexResponse.json();

        const regionsData = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`/data/world/geography/${id}.json`);
            if (!response.ok) {
              throw new Error(`Не удалось загрузить регион ${id}`);
            }
            return response.json();
          }),
        );

        setRegions(regionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRegions();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка географии...</div>
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
    <main style={{ paddingBottom: 24 }}>
      {regions.map((r) => (
        <section key={r.id} style={{ marginBottom: 24 }}>
          <div
            style={{
              position: "relative",
              height: 280,
              background: `url(${r.panorama}) center/cover no-repeat`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
              }}
            />
            <div style={{ position: "absolute", bottom: 12, left: 16 }}>
              <h2 style={{ margin: 0 }}>{r.name}</h2>
              <div style={{ opacity: 0.9 }}>{r.type}</div>
            </div>
          </div>
          <div
            style={{
              padding: 16,
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr)",
              gap: 16,
            }}
          >
            <img
              src={r.bigMap}
              alt="region map"
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              <Block title="Климат и погода" text={r.climate} />
              <Block title="Флора и фауна" text={r.floraFauna} />
              <Block title="Опасности региона" text={r.dangers} />
              <ListBlock title="Известные локации" items={r.locations} />
              <Block title="Население" text={r.peoples} />
            </div>
            {r.thumbs && r.thumbs.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {r.thumbs.map((t, idx) => (
                  <img
                    key={idx}
                    src={t}
                    alt="view"
                    style={{
                      width: 200,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}

function Block({ title, text }) {
  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <p style={{ margin: 0, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}

function ListBlock({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 6,
        }}
      >
        {items.map((it, idx) => (
          <li
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                background: "#d4af37",
                display: "inline-block",
              }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
