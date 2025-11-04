import React from "react";
import { useParams } from "react-router-dom";
import { playerCharacters } from "../../../data/characters/playerCharacters";

export default function PlayerCharacterDetail() {
  const { id } = useParams();
  const pc = playerCharacters.find((p) => p.id === id) || playerCharacters[0];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          background: `url(${pc.banner}) center/cover no-repeat`,
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
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              padding: "32px",
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h1 style={{ fontSize: 48, margin: 0, color: "#d4af37" }}>
                {pc.name}
              </h1>
              <div style={{ opacity: 0.9, marginTop: 8, fontSize: 16 }}>
                {pc.class} • {pc.race} • ур. {pc.level}
              </div>
              <em style={{ display: "block", marginTop: 12, opacity: 0.9 }}>
                “{pc.quote}”
              </em>
            </div>
            <img
              src={pc.symbol}
              alt="symbol"
              style={{ width: 96, height: 96, objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 360px",
          gap: 24,
          padding: 24,
        }}
      >
        <div>
          <Block title="Внешность" text={pc.appearance} />
          <Block title="Биография" text={pc.biography} />
          <Block title="Личность и мотивация" text={pc.personality} />
          <ListBlock
            title="Достижения"
            items={pc.achievements}
            icon="/images/icons/trophy-gold.png"
          />
          <ListBlock
            title="Важные моменты в кампании"
            items={pc.campaignMoments}
          />
          {pc.gallery?.length ? (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px" }}>Галерея</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 8,
                }}
              >
                {pc.gallery.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="art"
                    style={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {Object.entries(pc.stats).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: 8,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {key.toUpperCase()}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Снаряжение</h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 6,
              }}
            >
              {pc.equipment.map((it) => (
                <li
                  key={it.name}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <img
                    src={it.icon}
                    alt="icon"
                    style={{ width: 18, height: 18 }}
                  />
                  <span>{it.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Связи</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pc.relations.map((r) => (
                <figure key={r.id} style={{ margin: 0, textAlign: "center" }}>
                  <img
                    src={r.portrait}
                    alt={r.label}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <figcaption style={{ fontSize: 12, opacity: 0.85 }}>
                    {r.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Фракции</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {pc.factions.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#111",
                    padding: "6px 8px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={f.icon}
                    alt={f.name}
                    style={{ width: 18, height: 18 }}
                  />
                  <span style={{ fontSize: 12 }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
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

function ListBlock({ title, items, icon }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {items.map((it, idx) => (
          <li
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {icon ? (
              <img src={icon} alt="icon" style={{ width: 16, height: 16 }} />
            ) : (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "#d4af37",
                  display: "inline-block",
                }}
              />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
