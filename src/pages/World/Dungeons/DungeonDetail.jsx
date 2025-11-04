import React from "react";
import { useParams } from "react-router-dom";
import { dungeons } from "../../../data/world/dungeons";

export default function DungeonDetail() {
  const { id } = useParams();
  const dun = dungeons.find((d) => d.id === id) || dungeons[0];

  return (
    <main style={{ minHeight: "100%" }}>
      <section
        style={{
          position: "relative",
          height: "40vh",
          background: `url(${dun.headerImage}) center/cover no-repeat`,
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
            bottom: 16,
            left: 24,
            right: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ margin: 0 }}>{dun.name}</h1>
          <Danger level={dun.danger} />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 380px",
          gap: 24,
          padding: 24,
        }}
      >
        <div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Карта подземелья
            </div>
            <img
              src={dun.map}
              alt="map"
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
          <Block title="История" text={dun.history} />
          <Block title="Описание" text={dun.description} />
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>Ключевые комнаты</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {dun.keyRooms.map((r) => (
                <div
                  key={r.num}
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    #{r.num} — {r.name}
                  </div>
                  <div style={{ opacity: 0.9 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <IconList title="Обитатели" items={dun.inhabitants} />
          <ListBlock title="Сокровища" items={dun.treasures} />
          <ListBlock title="Ловушки и загадки" items={dun.traps} />
        </aside>
      </section>

      <section style={{ padding: 24 }}>
        <ListBlock title="История прохождений" items={dun.runsHistory} />
      </section>
    </main>
  );
}

function Danger({ level }) {
  const skulls = Array.from({ length: 5 }).map((_, i) => i < level);
  return (
    <div>
      {skulls.map((filled, idx) => (
        <span
          key={idx}
          style={{ color: filled ? "#c0392b" : "#555", marginLeft: 2 }}
        >
          ☠
        </span>
      ))}
    </div>
  );
}

function Block({ title, text }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}

function ListBlock({ title, items }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
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

function IconList({ title, items }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((it) => (
          <div
            key={it.name}
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <img src={it.icon} alt="icon" style={{ width: 18, height: 18 }} />
            <span>{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
