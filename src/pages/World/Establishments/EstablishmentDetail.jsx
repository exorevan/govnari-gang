import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function EstablishmentDetail() {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем заведение
        const estResponse = await fetch(
          `/data/world/establishments/${id}.json`,
        );
        if (!estResponse.ok) {
          throw new Error("Не удалось загрузить заведение");
        }
        const estData = await estResponse.json();
        setEstablishment(estData);

        // Загружаем города для ссылок
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка заведения...</div>
      </main>
    );
  }

  if (error || !establishment) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          Ошибка: {error || "Заведение не найдено"}
        </div>
        <Link
          to="/world/establishments"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к заведениям
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
          height: "50vh",
          background: establishment.image
            ? `url(${establishment.image}) center/cover no-repeat`
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
              {establishment.name}
            </h1>
            <div style={{ opacity: 0.9, marginTop: 8, fontSize: 16 }}>
              {establishment.type || establishment.category}
            </div>
            {establishment.settlement && (
              <div style={{ opacity: 0.85, marginTop: 4, fontSize: 14 }}>
                {establishment.settlement}
                {establishment.location && ` • ${establishment.location}`}
              </div>
            )}
          </div>
          {establishment.type && (
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
              {establishment.type}
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
          {establishment.description && (
            <Block title="Описание" text={establishment.description} />
          )}

          {establishment.specialties &&
            establishment.specialties.length > 0 && (
              <ListBlock
                title="Особенности"
                items={establishment.specialties}
              />
            )}

          {establishment.menu && establishment.menu.length > 0 && (
            <ListBlock title="Меню" items={establishment.menu} />
          )}

          {establishment.services && establishment.services.length > 0 && (
            <ListBlock title="Услуги" items={establishment.services} />
          )}

          {establishment.notableClients &&
            establishment.notableClients.length > 0 && (
              <ListBlock
                title="Постоянные гости"
                items={establishment.notableClients}
              />
            )}

          {establishment.rumor && (
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
                {establishment.rumor}
              </p>
            </div>
          )}
        </div>

        <aside>
          {establishment.owner && (
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
                <div style={{ fontWeight: 700 }}>
                  {establishment.owner.name}
                </div>
                {establishment.owner.title && (
                  <div style={{ opacity: 0.85, fontSize: 13, marginTop: 4 }}>
                    {establishment.owner.title}
                  </div>
                )}
                {establishment.owner.id &&
                  (() => {
                    const ownerPath = getCharacterPath(establishment.owner.id);
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

          {establishment.settlement && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Город</h4>
              {(() => {
                const city = cities.find(
                  (c) => c.name === establishment.settlement,
                );
                return city ? (
                  <Link
                    to={`/world/cities/${city.id}`}
                    style={{
                      display: "inline-block",
                      color: "#4da3ff",
                      textDecoration: "none",
                    }}
                  >
                    {establishment.settlement}
                  </Link>
                ) : (
                  <span>{establishment.settlement}</span>
                );
              })()}
            </div>
          )}

          {establishment.location && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 8px" }}>Расположение</h4>
              <div style={{ opacity: 0.9 }}>{establishment.location}</div>
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
