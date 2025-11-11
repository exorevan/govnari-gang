// src/pages/World/Cities/CityDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function CityDetail() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]);
  const [fractions, setFractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем данные города
        const cityResponse = await fetch(`/data/world/cities/${id}.json`);
        if (!cityResponse.ok) {
          throw new Error("Город не найден");
        }
        const cityData = await cityResponse.json();
        setCity(cityData);

        // Загружаем всех персонажей для поиска тех, кто связан с городом
        const characters = [];

        // Загружаем игровых персонажей
        try {
          const pcIndexResponse = await fetch(
            "/data/characters/players/index.json",
          );
          if (pcIndexResponse.ok) {
            const pcIds = await pcIndexResponse.json();
            const pcs = await Promise.all(
              pcIds.map(async (pcId) => {
                const response = await fetch(
                  `/data/characters/players/${pcId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            characters.push(...pcs.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить игровых персонажей:", err);
        }

        // Загружаем НПС
        try {
          const npcIndexResponse = await fetch(
            "/data/characters/npcs/index.json",
          );
          if (npcIndexResponse.ok) {
            const npcIds = await npcIndexResponse.json();
            const npcsData = await Promise.all(
              npcIds.map(async (npcId) => {
                const response = await fetch(
                  `/data/characters/npcs/${npcId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            characters.push(...npcsData.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить НПС:", err);
        }

        // Загружаем союзников
        try {
          const alliesIndexResponse = await fetch(
            "/data/characters/allies/index.json",
          );
          if (alliesIndexResponse.ok) {
            const allyIds = await alliesIndexResponse.json();
            const alliesData = await Promise.all(
              allyIds.map(async (allyId) => {
                const response = await fetch(
                  `/data/characters/allies/${allyId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            characters.push(...alliesData.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить союзников:", err);
        }

        // Загружаем врагов
        try {
          const enemiesIndexResponse = await fetch(
            "/data/characters/enemies/index.json",
          );
          if (enemiesIndexResponse.ok) {
            const enemyIds = await enemiesIndexResponse.json();
            const enemiesData = await Promise.all(
              enemyIds.map(async (enemyId) => {
                const response = await fetch(
                  `/data/characters/enemies/${enemyId}.json`,
                );
                return response.ok ? response.json() : null;
              }),
            );
            characters.push(...enemiesData.filter(Boolean));
          }
        } catch (err) {
          console.warn("Не удалось загрузить врагов:", err);
        }

        setAllCharacters(characters);

        // Загружаем фракции
        try {
          const fractionsResponse = await fetch("/data/lore/fractions.json");
          if (fractionsResponse.ok) {
            const fractionsData = await fractionsResponse.json();
            setFractions(fractionsData);
          }
        } catch (err) {
          console.warn("Не удалось загрузить фракции:", err);
        }
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки города:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 18 }}>Загрузка города...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d", marginBottom: 16 }}>
          Ошибка: {error}
        </div>
        <Link
          to="/world/cities"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к городам
        </Link>
      </main>
    );
  }

  if (!city) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Город не найден</h2>
        <Link to="/world/cities" style={{ color: "#4da3ff" }}>
          Назад к городам
        </Link>
      </main>
    );
  }

  // Фильтруем персонажей, связанных с этим городом
  const cityAllies = allCharacters.filter(
    (char) => char.city === city.name && char.id?.startsWith("ally-"),
  );
  const cityEnemies = allCharacters.filter(
    (char) => char.city === city.name && char.id?.startsWith("enemy-"),
  );
  const cityNPCs = city.npcs || [];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          background: `url(${city.panorama}) center/cover no-repeat`,
        }}
      >
        {/* Флаг в правом верхнем углу */}
        <img
          src={city.flag}
          alt="flag"
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 120,
            height: 80,
            objectFit: "contain",
            background: "rgba(0, 0, 0, 0.5)",
            padding: 12,
            borderRadius: 8,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />

        {/* Градиент */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />

        {/* Название города */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {city.name}
          </h1>
          <div
            style={{
              fontSize: 20,
              opacity: 0.95,
              marginTop: 8,
              fontStyle: "italic",
            }}
          >
            «{city.motto}»
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {/* Quick Info Cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <InfoCard
            label="Население"
            value={city.info?.population?.toLocaleString() || "Неизвестно"}
          />
          <InfoCard
            label="Тип правления"
            value={city.info?.ruleType || "Неизвестно"}
          />
          <InfoCard
            label="Основной ресурс"
            value={city.info?.mainResource || "Неизвестно"}
          />
          <InfoCard
            label="Главная религия"
            value={city.info?.mainReligion || "Неизвестно"}
          />
        </section>

        {/* Ruler Section */}
        {city.info?.ruler && (
          <section
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: 12,
              padding: 24,
              marginBottom: 48,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {city.info.ruler.portrait && (
              <img
                src={city.info.ruler.portrait}
                alt={city.info.ruler.name}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  objectFit: "cover",
                  border: "2px solid rgba(212,175,55,0.5)",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
                Правитель
              </div>
              <h2 style={{ margin: 0, fontSize: 28, color: "#d4af37" }}>
                {city.info.ruler.name}
              </h2>
            </div>

            {/* Кнопка перехода */}
            {city.info.ruler.id &&
              (() => {
                const rulerPath = getCharacterPath(city.info.ruler.id);
                return rulerPath ? (
                  <Link
                    to={rulerPath}
                    style={{
                      padding: "12px 24px",
                      background: "rgba(212,175,55,0.2)",
                      border: "1px solid rgba(212,175,55,0.5)",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: "#d4af37",
                      fontWeight: 600,
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(212,175,55,0.3)";
                      e.currentTarget.style.borderColor =
                        "rgba(212,175,55,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(212,175,55,0.2)";
                      e.currentTarget.style.borderColor =
                        "rgba(212,175,55,0.5)";
                    }}
                  >
                    Подробнее
                    <span style={{ fontSize: 18 }}>→</span>
                  </Link>
                ) : null;
              })()}
          </section>
        )}

        {/* History */}
        <TextSection title="История города" text={city.history} />

        {/* Description */}
        <TextSection title="Описание" text={city.description} />

        {/* Map */}
        {(city.mapSmall || city.bigMap) && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Карта города</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {city.mapSmall && (
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 12, opacity: 0.8 }}>
                    Расположение
                  </h3>
                  <img
                    src={city.mapSmall}
                    alt="map"
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              )}
              {city.bigMap && (
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 12, opacity: 0.8 }}>
                    Детальная карта
                  </h3>
                  <img
                    src={city.bigMap}
                    alt="city map"
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Districts */}
        {city.districts && city.districts.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Районы города</h2>
            <p style={{ lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
              Город разделён на несколько районов, каждый из которых имеет свою
              уникальную атмосферу и назначение.
            </p>
            <div style={{ display: "grid", gap: 16 }}>
              {city.districts.map((d) => (
                <div
                  key={d.name}
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 20,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  {d.icon && (
                    <div
                      style={{
                        background: "rgba(212,175,55,0.15)",
                        padding: 12,
                        borderRadius: 8,
                      }}
                    >
                      <img
                        src={d.icon}
                        alt="icon"
                        style={{ width: 32, height: 32, display: "block" }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: 22 }}>
                      {d.name}
                    </h3>
                    <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.9 }}>
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Buildings */}
        {city.buildings && city.buildings.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Важные здания</h2>
            <p style={{ lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
              Эти здания играют ключевую роль в жизни города и его жителей.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {city.buildings.map((b) => (
                <figure
                  key={b.name}
                  style={{
                    margin: 0,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 12,
                  }}
                >
                  <img
                    src={b.image}
                    alt={b.name}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                      padding: "32px 12px 12px",
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {b.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Places */}
        {city.places && city.places.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Интересные места</h2>
            <p style={{ lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
              Эти локации привлекают внимание путешественников и искателей
              приключений.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: 12,
              }}
            >
              {city.places.map((place, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#0a0a0a",
                    padding: 16,
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: "#d4af37",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 16 }}>{place}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* NPCs, Allies, Enemies */}
        {(cityNPCs.length > 0 ||
          cityAllies.length > 0 ||
          cityEnemies.length > 0) && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Важные персоны</h2>
            <p style={{ lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
              Эти люди влияют на жизнь города и могут помочь или помешать вашим
              планам.
            </p>

            <div style={{ display: "grid", gap: 32 }}>
              {/* NPCs */}
              {cityNPCs.length > 0 && (
                <div>
                  <h3
                    style={{ fontSize: 24, marginBottom: 16, color: "#d4af37" }}
                  >
                    Важные НПС
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {cityNPCs.map((n) => (
                      <CharacterCard key={n.id} character={n} type="npc" />
                    ))}
                  </div>
                </div>
              )}

              {/* Allies */}
              {cityAllies.length > 0 && (
                <div>
                  <h3
                    style={{ fontSize: 24, marginBottom: 16, color: "#4da3ff" }}
                  >
                    Союзники
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {cityAllies.map((ally) => (
                      <CharacterCard
                        key={ally.id}
                        character={ally}
                        type="ally"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Enemies */}
              {cityEnemies.length > 0 && (
                <div>
                  <h3
                    style={{ fontSize: 24, marginBottom: 16, color: "#ff4d4d" }}
                  >
                    Противники
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {cityEnemies.map((enemy) => (
                      <CharacterCard
                        key={enemy.id}
                        character={enemy}
                        type="enemy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* News */}
        {city.news && city.news.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Слухи и новости</h2>
            <p style={{ lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
              Последние события и разговоры на улицах города.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: 12,
              }}
            >
              {city.news.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    background: "#0a0a0a",
                    padding: 16,
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 20 }}>📰</span>
                  <span style={{ fontSize: 16, lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

// Helper Components

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 20,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: "#d4af37" }}>
        {value}
      </div>
    </div>
  );
}

function TextSection({ title, text }) {
  if (!text) return null;
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 32, marginBottom: 16 }}>{title}</h2>
      <div
        style={{
          lineHeight: 1.8,
          fontSize: 17,
          background: "#0a0a0a",
          padding: 24,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {parseTextWithLinks(text)}
      </div>
    </section>
  );
}

function CharacterCard({ character, type }) {
  const borderColors = {
    npc: "rgba(212,175,55,0.3)",
    ally: "rgba(77,163,255,0.3)",
    enemy: "rgba(255,77,77,0.3)",
  };

  const bgColors = {
    npc: "rgba(212,175,55,0.05)",
    ally: "rgba(77,163,255,0.05)",
    enemy: "rgba(255,77,77,0.05)",
  };

  const path = getCharacterPath(character.id);

  const content = (
    <div
      style={{
        background: `linear-gradient(135deg, ${bgColors[type]}, transparent)`,
        border: `1px solid ${borderColors[type]}`,
        borderRadius: 12,
        padding: 16,
        display: "flex",
        gap: 16,
        alignItems: "center",
        transition: "transform 0.2s",
        cursor: path ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (path) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        if (path) e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {character.portrait && (
        <img
          src={character.portrait}
          alt={character.name}
          style={{
            width: 64,
            height: 64,
            borderRadius: 10,
            objectFit: "cover",
            border: `2px solid ${borderColors[type]}`,
          }}
        />
      )}
      <div>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
          {character.name}
        </div>
        <div style={{ opacity: 0.85, fontSize: 14 }}>{character.role}</div>
      </div>
    </div>
  );

  return path ? (
    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
      {content}
    </Link>
  ) : (
    content
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
        style={{
          color: "#4da3ff",
          textDecoration: "none",
          fontWeight: 600,
          borderBottom: "1px solid rgba(77,163,255,0.3)",
        }}
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
