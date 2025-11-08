import React from "react";
import { useParams, Link } from "react-router-dom";
import { establishments } from "../../../data/world/establishments";
import { cities } from "../../../data/world/cities";
import { allies } from "../../../data/characters/allies";
import { npcs } from "../../../data/characters/npcs";

export default function EstablishmentDetail() {
  const { id } = useParams();
  const est = establishments.find((e) => e.id === id) || establishments[0];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          background: est.image
            ? `url(${est.image}) center/cover no-repeat`
            : "linear-gradient(135deg, #3a3a3a, #1f1f1f)",
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
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ fontSize: 44, margin: 0, color: "#d4af37" }}>
              {est.name}
            </h1>
            <div style={{ opacity: 0.9, marginTop: 8, fontSize: 16 }}>
              {est.type || est.category}
            </div>
            {est.settlement && (
              <div style={{ opacity: 0.85, marginTop: 4, fontSize: 14 }}>
                {est.settlement}
                {est.location && ` • ${est.location}`}
              </div>
            )}
          </div>
          {est.type && (
            <div
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {est.type}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 340px",
          gap: 24,
          padding: 24,
        }}
      >
        <div>
          {est.description && (
            <Block title="Описание" text={est.description} />
          )}

          {est.specialties && est.specialties.length > 0 && (
            <ListBlock title="Особенности" items={est.specialties} />
          )}

          {est.menu && est.menu.length > 0 && (
            <ListBlock title="Меню" items={est.menu} />
          )}

          {est.services && est.services.length > 0 && (
            <ListBlock title="Услуги" items={est.services} />
          )}

          {est.notableClients && est.notableClients.length > 0 && (
            <ListBlock title="Постоянные гости" items={est.notableClients} />
          )}

          {est.rumor && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ margin: "0 0 8px" }}>Слухи</h3>
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  opacity: 0.9,
                }}
              >
                {est.rumor}
              </p>
            </div>
          )}
        </div>

        <aside>
          {est.owner && (
            <div>
              <h4 style={{ margin: "0 0 8px" }}>Хозяин</h4>
              <div
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 700 }}>{est.owner.name}</div>
                {est.owner.title && (
                  <div style={{ opacity: 0.85, fontSize: 13, marginTop: 4 }}>
                    {est.owner.title}
                  </div>
                )}
                {est.owner.id && (() => {
                  const ownerPath = getCharacterPath(est.owner.id);
                  return ownerPath ? (
                    <Link
                      to={ownerPath}
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        color: "#4da3ff",
                        textDecoration: "none",
                        fontSize: 13,
                      }}
                    >
                      Подробнее →
                    </Link>
                  ) : null;
                })()}
              </div>
            </div>
          )}

          {est.settlement && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Город</h4>
              {(() => {
                const city = cities.find((c) => c.name === est.settlement);
                return city ? (
                  <Link
                    to={`/world/cities/${city.id}`}
                    style={{
                      display: "inline-block",
                      color: "#4da3ff",
                      textDecoration: "none",
                    }}
                  >
                    {est.settlement}
                  </Link>
                ) : (
                  <span>{est.settlement}</span>
                );
              })()}
            </div>
          )}

          {est.location && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Расположение</h4>
              <div style={{ opacity: 0.9 }}>{est.location}</div>
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

  // Парсим markdown-ссылки вида [текст](путь)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Добавляем текст до ссылки
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Добавляем ссылку
    const linkText = match[1];
    const linkPath = match[2];
    parts.push(
      <Link
        key={`link-${keyCounter++}`}
        to={linkPath}
        style={{ color: "#4da3ff", textDecoration: "none", fontWeight: 500 }}
      >
        {linkText}
      </Link>
    );

    lastIndex = match.index + match[0].length;
  }

  // Добавляем оставшийся текст
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function ListBlock({ title, items }) {
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

function getCharacterPath(id) {
  if (!id) return null;
  if (id.startsWith("pc-")) return `/characters/players/${id}`;
  if (id.startsWith("npc-")) return `/characters/npcs/${id}`;
  if (id.startsWith("ally-")) return `/characters/allies/${id}`;
  return null;
}

