import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function DungeonDetail() {
  const { id } = useParams();
  const [dungeon, setDungeon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDungeon() {
      try {
        setLoading(true);

        const response = await fetch(`/data/world/dungeons/${id}.json`);
        if (!response.ok) {
          throw new Error("Подземелье не найдено");
        }
        const data = await response.json();
        setDungeon(data);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки подземелья:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDungeon();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>Загрузка подземелья...</div>
      </main>
    );
  }

  if (error || !dungeon) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          <strong>Ошибка:</strong> {error || "Подземелье не найдено"}
        </div>
        <Link
          to="/world/dungeons"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к подземельям
        </Link>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          background: `url(${dungeon.headerImage}) center/cover no-repeat`,
          filter: "brightness(0.9)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            right: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 44 }}>{dungeon.name}</h1>
          <DangerLevel level={dungeon.danger} />
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 380px",
          gap: 24,
          padding: 24,
        }}
      >
        <div>
          {/* Map */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 20 }}>
              Карта подземелья
            </h3>
            <img
              src={dungeon.map}
              alt="map"
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          <Block title="История" text={dungeon.history} />
          <Block title="Описание" text={dungeon.description} />

          {/* Key Rooms */}
          {dungeon.keyRooms && dungeon.keyRooms.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 20 }}>
                Ключевые комнаты
              </h3>
              <div style={{ display: "grid", gap: 12 }}>
                {dungeon.keyRooms.map((room) => (
                  <div
                    key={room.num}
                    style={{
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        color: "#d4af37",
                      }}
                    >
                      Комната #{room.num} — {room.name}
                    </div>
                    <div style={{ opacity: 0.9, lineHeight: 1.6 }}>
                      {room.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          {dungeon.inhabitants && dungeon.inhabitants.length > 0 && (
            <IconList title="Обитатели" items={dungeon.inhabitants} />
          )}

          {dungeon.treasures && dungeon.treasures.length > 0 && (
            <ListBlock title="Сокровища" items={dungeon.treasures} />
          )}

          {dungeon.traps && dungeon.traps.length > 0 && (
            <ListBlock title="Ловушки и загадки" items={dungeon.traps} />
          )}
        </aside>
      </section>

      {/* History of Runs */}
      {dungeon.runsHistory && dungeon.runsHistory.length > 0 && (
        <section style={{ padding: "0 24px 24px" }}>
          <ListBlock title="История прохождений" items={dungeon.runsHistory} />
        </section>
      )}
    </main>
  );
}

function DangerLevel({ level }) {
  const skulls = Array.from({ length: 5 }).map((_, i) => i < level);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {skulls.map((filled, idx) => (
        <span
          key={idx}
          style={{
            color: filled ? "#c0392b" : "#555",
            fontSize: 24,
          }}
        >
          ☠
        </span>
      ))}
    </div>
  );
}

function Block({ title, text }) {
  if (!text) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ margin: "0 0 12px", fontSize: 20 }}>{title}</h3>
      <p
        style={{
          margin: 0,
          lineHeight: 1.7,
          background: "#0a0a0a",
          padding: 16,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function ListBlock({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ margin: "0 0 12px", fontSize: 20 }}>{title}</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 12,
              background: "#0a0a0a",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#d4af37",
                flexShrink: 0,
              }}
            />
            <span style={{ lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconList({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ margin: "0 0 12px", fontSize: 18 }}>{title}</h4>
      <div
        style={{
          display: "grid",
          gap: 10,
          background: "#0a0a0a",
          padding: 16,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            <img
              src={item.icon}
              alt="icon"
              style={{ width: 20, height: 20, opacity: 0.9 }}
            />
            <span style={{ lineHeight: 1.5 }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
