// src/pages/Characters/Enemies/EnemyDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEntity, useData } from "../../../hooks/useData";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function EnemyDetail() {
  const { id } = useParams();
  const {
    data: enemy,
    loading,
    error,
  } = useEntity("characters", "enemies", id);
  const { data: cities } = useData("world", "cities");
  const { data: fractions } = useData("lore", "fractions");

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка...</div>
      </main>
    );
  }

  if (error || !enemy) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Враг не найден</h2>
        <Link to="/characters/enemies">← Назад к врагам</Link>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100%" }}>
      <section
        style={{
          position: "relative",
          height: "50vh",
          background: `url(${enemy.banner}) center/cover no-repeat`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(139,0,0,0.3), rgba(0,0,0,0.7))",
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
              padding: 32,
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h1 style={{ fontSize: 40, margin: 0, color: "#ff4d4d" }}>
                {enemy.name}
              </h1>
              <div style={{ opacity: 0.9, marginTop: 6 }}>{enemy.role}</div>
              {enemy.quote && (
                <em style={{ display: "block", marginTop: 12, opacity: 0.9 }}>
                  "{enemy.quote}"
                </em>
              )}
            </div>
            {enemy.symbol && (
              <img
                src={enemy.symbol}
                alt="symbol"
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
            )}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 340px",
          gap: 24,
          padding: 24,
        }}
      >
        <div>
          <Block title="Внешность" text={enemy.appearance} />
          <Block title="Биография" text={enemy.biography} />
          <Block title="Личность и мотивация" text={enemy.personality} />
          <ListBlock
            title="Преступления"
            items={enemy.crimes}
            icon="/assets/images/icons/skull.png"
          />
          <ListBlock title="Известные поражения" items={enemy.defeats} />
        </div>

        <aside>
          {enemy.stats && Object.keys(enemy.stats).length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {Object.entries(enemy.stats).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,77,77,0.2)",
                    borderRadius: 8,
                    padding: 8,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    {key.toUpperCase()}
                  </div>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#ff4d4d" }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {enemy.equipment && enemy.equipment.length > 0 && (
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
                {enemy.equipment.map((it) => (
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
          )}

          {enemy.city && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Последнее местонахождение</h4>
              {(() => {
                const city = cities.find((c) => c.name === enemy.city);
                return city ? (
                  <Link
                    to={`/world/cities/${city.id}`}
                    style={{ color: "#4da3ff", textDecoration: "none" }}
                  >
                    {enemy.city}
                  </Link>
                ) : (
                  <span>{enemy.city}</span>
                );
              })()}
            </div>
          )}

          {enemy.fractions?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Фракции</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {enemy.fractions.map((f) => {
                  const fraction = fractions.find((fr) => fr.id === f.id);
                  const content = (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#111",
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,77,77,0.2)",
                      }}
                    >
                      {f.icon && (
                        <img
                          src={f.icon}
                          alt={f.name}
                          style={{ width: 18, height: 18 }}
                        />
                      )}
                      <span style={{ fontSize: 12 }}>{f.name}</span>
                    </div>
                  );
                  return fraction ? (
                    <Link
                      key={f.id}
                      to={`/lore/fractions/${f.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={f.id}>{content}</div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function Block({ title, text }) {
  if (!text) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.65 }}>{parseTextWithLinks(text)}</p>
    </div>
  );
}

function parseTextWithLinks(text) {
  if (!text) return text;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkPath = match[2];
    parts.push(
      <Link
        key={`link-${keyCounter++}`}
        to={linkPath}
        style={{ color: "#4da3ff", textDecoration: "none", fontWeight: 500 }}
      >
        {linkText}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function ListBlock({ title, items, icon }) {
  if (!items || items.length === 0) return null;
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
                  background: "#ff4d4d",
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
