import React from "react";
import { useParams, Link } from "react-router-dom";
import { cities } from "../../../data/world/cities";
import { playerCharacters } from "../../../data/characters/playerCharacters";
import { npcs } from "../../../data/characters/npcs";
import { allies } from "../../../data/characters/allies";
import { fractions } from "../../../data/lore/fractions";
import { gods } from "../../../data/lore/gods";

export default function CityDetail() {
  const { id } = useParams();
  const city = cities.find((c) => c.id === id) || cities[0];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Top */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          background: `url(${city.panorama}) center/cover no-repeat`,
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
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={city.flag}
              alt="flag"
              style={{ width: 64, height: 64, objectFit: "contain" }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: 44 }}>{city.name}</h1>
              <div style={{ opacity: 0.9 }}>{city.motto}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three columns */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "320px minmax(0,1fr) 340px",
          gap: 24,
          padding: 24,
        }}
      >
        {/* Left */}
        <aside>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Карта расположения
            </div>
            <img
              src={city.mapSmall}
              alt="map"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Информация</div>
            <InfoRow
              label="Население"
              value={city.info.population.toLocaleString()}
            />
            <InfoRow
              label="Правитель"
              value={city.info.ruler.name}
              avatar={city.info.ruler.portrait}
            />
            <InfoRow label="Тип правления" value={city.info.ruleType} />
            <InfoRow label="Основной ресурс" value={city.info.mainResource} />
            <InfoRow label="Главная религия" value={city.info.mainReligion} />
          </div>
        </aside>

        {/* Center */}
        <div>
          <Block title="История города" text={city.history} />
          <Block title="Описание" text={city.description} />
          {city.districts && city.districts.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ margin: "0 0 8px" }}>Районы</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {city.districts.map((d) => (
                  <div
                    key={d.name}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <img
                      src={d.icon}
                      alt="icon"
                      style={{ width: 20, height: 20 }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>{d.name}</div>
                      <div style={{ opacity: 0.9 }}>{d.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>Важные здания</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 8,
              }}
            >
              {city.buildings.map((b) => (
                <figure key={b.name} style={{ margin: 0 }}>
                  <img
                    src={b.image}
                    alt={b.name}
                    style={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <figcaption style={{ marginTop: 6 }}>{b.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <ListBlock title="Интересные места" items={city.places} />
        </div>

        {/* Right */}
        <aside>
          {city.npcs?.length > 0 && (
            <div>
              <h4 style={{ margin: "0 0 8px" }}>Важные НПЦ</h4>
              <div style={{ display: "grid", gap: 8 }}>
                {city.npcs.map((n) => {
                  const npcPath = n.id?.startsWith("npc-")
                    ? `/characters/npcs/${n.id}`
                    : null;
                  const content = (
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      {n.portrait && (
                        <img
                          src={n.portrait}
                          alt={n.name}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700 }}>{n.name}</div>
                        <div style={{ opacity: 0.85, fontSize: 13 }}>
                          {n.role}
                        </div>
                      </div>
                    </div>
                  );
                  return npcPath ? (
                    <Link
                      key={n.id}
                      to={npcPath}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                      }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={n.id}>{content}</div>
                  );
                })}
              </div>
            </div>
          )}

          {city.quests && (
            <ListBlock title="Активные квесты" items={city.quests} />
          )}
          {city.news && <ListBlock title="Слухи и новости" items={city.news} />}
        </aside>
      </section>

      {/* Bottom big map */}
      <section style={{ padding: 24 }}>
        <img
          src={city.bigMap}
          alt="city map"
          style={{
            width: "100%",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
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
      </Link>,
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

function InfoRow({ label, value, avatar }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ width: 140, opacity: 0.75 }}>{label}</div>
      {avatar ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={avatar}
            alt="avatar"
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <div>{value}</div>
        </div>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
