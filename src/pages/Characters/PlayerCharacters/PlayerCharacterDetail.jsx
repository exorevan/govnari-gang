// src/pages/Characters/PlayerCharacters/PlayerCharacterDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function PlayerCharacterDetail() {
  const { id } = useParams();
  const [pc, setPc] = useState(null);
  const [cities, setCities] = useState([]);
  const [fractions, setFractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Загружаем данные персонажа
        const pcResponse = await fetch(`/data/characters/players/${id}.json`);
        if (!pcResponse.ok) throw new Error("Персонаж не найден");
        const pcData = await pcResponse.json();
        setPc(pcData);

        // Загружаем города (для ссылок)
        try {
          const citiesIndexResponse = await fetch(
            "/data/world/cities/index.json",
          );
          if (citiesIndexResponse.ok) {
            const cityIds = await citiesIndexResponse.json();
            const citiesData = await Promise.all(
              cityIds.map(async (cityId) => {
                const response = await fetch(
                  `/data/world/cities/${cityId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            setCities(citiesData.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить города:", err);
        }

        // Загружаем фракции (для ссылок)
        try {
          const fractionsIndexResponse = await fetch(
            "/data/lore/fractions/index.json",
          );
          if (fractionsIndexResponse.ok) {
            const fractionIds = await fractionsIndexResponse.json();
            const fractionsData = await Promise.all(
              fractionIds.map(async (fractionId) => {
                const response = await fetch(
                  `/data/lore/fractions/${fractionId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            setFractions(fractionsData.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить фракции:", err);
        }
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки персонажа:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: "24px", textAlign: "center", minHeight: "100%" }}>
        <div style={{ fontSize: 18, opacity: 0.8 }}>Загрузка персонажа...</div>
      </main>
    );
  }

  if (error || !pc) {
    return (
      <main style={{ padding: "24px", minHeight: "100%" }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          <strong>Ошибка:</strong> {error || "Персонаж не найден"}
        </div>
        <Link to="/characters/players" style={{ color: "#4da3ff" }}>
          ← Назад к списку персонажей
        </Link>
      </main>
    );
  }

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
              {pc.quote && (
                <em style={{ display: "block", marginTop: 12, opacity: 0.9 }}>
                  "{pc.quote}"
                </em>
              )}
            </div>
            {pc.symbol && (
              <img
                src={pc.symbol}
                alt="symbol"
                style={{ width: 96, height: 96, objectFit: "contain" }}
              />
            )}
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
            icon="/assets/images/icons/trophy-gold.png"
          />
          <ListBlock
            title="Важные моменты в кампании"
            items={pc.campaignMoments}
          />
          {pc.gallery?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px" }}>Галерея</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 8,
                }}
              >
                {pc.gallery.map((src, idx) => (
                  <img
                    key={idx}
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
          )}
        </div>

        <aside>
          {pc.stats && Object.keys(pc.stats).length > 0 && (
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
          )}

          {pc.equipment && pc.equipment.length > 0 && (
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
                {pc.equipment.map((it, idx) => (
                  <li
                    key={idx}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {it.icon && (
                      <img
                        src={it.icon}
                        alt="icon"
                        style={{ width: 18, height: 18 }}
                      />
                    )}
                    <span>{it.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pc.relations && pc.relations.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Связи</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pc.relations.map((r, idx) => {
                  const relationPath = getCharacterPath(r.id);
                  const content = (
                    <figure
                      key={idx}
                      style={{ margin: 0, textAlign: "center" }}
                    >
                      {r.portrait && (
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
                      )}
                      <figcaption style={{ fontSize: 12, opacity: 0.85 }}>
                        {r.label}
                      </figcaption>
                    </figure>
                  );
                  return relationPath ? (
                    <Link
                      key={idx}
                      to={relationPath}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  );
                })}
              </div>
            </div>
          )}

          {pc.city && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Город</h4>
              {(() => {
                const city = cities.find((c) => c.name === pc.city);
                return city ? (
                  <Link
                    to={`/world/cities/${city.id}`}
                    style={{
                      display: "inline-block",
                      color: "#4da3ff",
                      textDecoration: "none",
                    }}
                  >
                    {pc.city}
                  </Link>
                ) : (
                  <span>{pc.city}</span>
                );
              })()}
            </div>
          )}

          {pc.fractions && pc.fractions.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Фракции</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {pc.fractions.map((f, idx) => {
                  const fraction = fractions.find((fr) => fr.id === f.id);
                  const content = (
                    <div
                      key={idx}
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
                      key={idx}
                      to={`/lore/fractions/${f.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {content}
                    </Link>
                  ) : (
                    content
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
      <div style={{ lineHeight: 1.65 }}>
        {text.split("\n").map((para, idx) => (
          <p
            key={idx}
            style={{
              margin: idx > 0 ? "16px 0 0" : 0,
              textIndent: "2em",
              textAlign: "justify",
            }}
          >
            {parseTextWithLinks(para.trim())}
          </p>
        ))}
      </div>
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
