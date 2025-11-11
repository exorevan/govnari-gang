import React from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../../hooks/useData";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function AllyDetail() {
  const { id } = useParams();
  const { data: ally, loading, error } = useData("characters", "allies", id);

  if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>;
  if (error) return <div style={{ padding: 24 }}>Ошибка: {error.message}</div>;
  if (!ally) return <div style={{ padding: 24 }}>Союзник не найден</div>;

  return (
    <main style={{ minHeight: "100%" }}>
      <section
        style={{
          position: "relative",
          height: "50vh",
          background: `url(${ally.banner || ally.portrait}) center/cover no-repeat`,
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
              padding: 32,
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h1 style={{ fontSize: 40, margin: 0, color: "#d4af37" }}>
                {ally.name}
              </h1>
              <div style={{ opacity: 0.9, marginTop: 6 }}>{ally.role}</div>
              {ally.quote && (
                <em style={{ display: "block", marginTop: 12, opacity: 0.9 }}>
                  "{ally.quote}"
                </em>
              )}
            </div>
            {ally.symbol && (
              <img
                src={ally.symbol}
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
          {ally.appearance && (
            <Block title="Внешность" text={ally.appearance} />
          )}
          {ally.biography && <Block title="Биография" text={ally.biography} />}
          {ally.personality && (
            <Block title="Личность и мотивация" text={ally.personality} />
          )}
          {ally.achievements?.length > 0 && (
            <ListBlock
              title="Достижения"
              items={ally.achievements}
              icon="/assets/images/icons/trophy-gold.png"
            />
          )}
          {ally.campaignMoments?.length > 0 && (
            <ListBlock
              title="Важные моменты в кампании"
              items={ally.campaignMoments}
            />
          )}
          {ally.gallery?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px" }}>Галерея</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 8,
                }}
              >
                {ally.gallery.map((src) => (
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
          )}
        </div>

        <aside>
          {ally.stats && Object.keys(ally.stats).length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {Object.entries(ally.stats).map(([key, value]) => (
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

          {ally.equipment?.length > 0 && (
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
                {ally.equipment.map((it) => (
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

          {ally.relations?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Связи</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ally.relations.map((r) => (
                  <Link
                    key={r.id}
                    to={getCharacterPath(r.id)}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <figure style={{ margin: 0, textAlign: "center" }}>
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
                  </Link>
                ))}
              </div>
            </div>
          )}

          {ally.city && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Город</h4>
              <div>{ally.city}</div>
            </div>
          )}

          {ally.fractions?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Фракции</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ally.fractions.map((f) => (
                  <Link
                    key={f.id}
                    to={`/lore/fractions/${f.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
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
                  </Link>
                ))}
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
