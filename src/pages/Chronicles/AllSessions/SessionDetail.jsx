import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

function findCharacter(id, allCharacters) {
  return allCharacters.find((c) => c.id === id);
}

export default function SessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем сессию
        const sessionResponse = await fetch(
          `/data/chronicles/sessions/${id}.json`,
        );
        if (!sessionResponse.ok) throw new Error("Failed to load session data");
        const sessionData = await sessionResponse.json();
        setSession(sessionData);

        // Загружаем список всех сессий для навигации
        const sessionsResponse = await fetch(
          "/data/chronicles/sessions/index.json",
        );
        if (sessionsResponse.ok) {
          const sessionsData = await sessionsResponse.json();
          setSessions(sessionsData);
        }

        // Загружаем персонажей для участников
        const characters = [];
        if (sessionData.participants) {
          for (const participantId of sessionData.participants) {
            try {
              let response;
              if (participantId.startsWith("pc-")) {
                response = await fetch(
                  `/data/characters/players/${participantId}.json`,
                );
              } else if (participantId.startsWith("npc-")) {
                response = await fetch(
                  `/data/characters/npcs/${participantId}.json`,
                );
              } else if (participantId.startsWith("ally-")) {
                response = await fetch(
                  `/data/characters/allies/${participantId}.json`,
                );
              }
              if (response && response.ok) {
                const char = await response.json();
                characters.push(char);
              }
            } catch (err) {
              console.warn(`Failed to load character ${participantId}`, err);
            }
          }
        }
        setAllCharacters(characters);
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
        <div>Загрузка сессии...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
        <Link to="/chronicles/sessions">← Назад к сессиям</Link>
      </main>
    );
  }

  if (!session) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Сессия не найдена</h2>
        <Link to="/chronicles/sessions">← Назад к сессиям</Link>
      </main>
    );
  }

  const idx = sessions.findIndex((s) => s.id === id);
  const prev = sessions[idx - 1];
  const next = sessions[idx + 1];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Top */}
      <section style={{ position: "relative", height: 320 }}>
        <img
          src={session.heroImage}
          alt={session.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ opacity: 0.95 }}>
              {session.realDate} • {session.gameDate} • #{session.num}
            </div>
            <h1 style={{ margin: 0 }}>{session.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 320px",
          gap: 24,
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Block title="Краткое содержание" text={session.summary} />

          {session.participants?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Участники</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {session.participants.map((participantId) => {
                  const character = findCharacter(participantId, allCharacters);
                  if (!character) return null;

                  const participantPath = getCharacterPath(participantId);
                  const content = (
                    <figure style={{ margin: 0, textAlign: "center" }}>
                      <img
                        src={
                          character.banner ||
                          character.portrait ||
                          "/assets/images/placeholder.jpg"
                        }
                        alt={character.name}
                        style={{
                          width: 72,
                          height: 72,
                          objectFit: "cover",
                          borderRadius: 12,
                        }}
                      />
                      <figcaption style={{ marginTop: 6 }}>
                        {character.name}
                      </figcaption>
                    </figure>
                  );

                  return participantPath ? (
                    <Link
                      key={participantId}
                      to={participantPath}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={participantId}>{content}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Главы */}
          {session.chapters?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: "1.5rem" }}>
                История приключения
              </h2>
              {session.chapters.map((chapter, idx) => (
                <ChapterBlock
                  key={idx}
                  number={idx + 1}
                  title={chapter.title}
                  text={chapter.content}
                />
              ))}
            </div>
          )}

          <ListBlock title="Ключевые моменты" items={session.keyMoments} />
          <ListBlock title="Решения игроков" items={session.decisions} />
          <ListBlock title="Последствия" items={session.consequences} />
        </div>

        <aside>
          <InfoCard title="MVP сессии" value={session.mvp} />
          <InfoCard title="Лучшая цитата" value={`"${session.bestQuote}"`} />
          <ListBlock title="Полученный опыт и лут" items={session.rewards} />
        </aside>
      </section>

      <section
        style={{
          padding: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prev ? (
          <Link
            to={`/chronicles/sessions/${prev.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "#1f2a44",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Предыдущая сессия
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/chronicles/sessions/${next.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "#1f2a44",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Следующая сессия
          </Link>
        ) : (
          <span />
        )}
      </section>
    </main>
  );
}

function Block({ title, text }) {
  if (!text) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.7 }}>{parseTextWithLinks(text)}</p>
    </div>
  );
}

function ChapterBlock({ number, title, text }) {
  if (!text) return null;
  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px",
          color: "#d4af37",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(212, 175, 55, 0.2)",
            fontSize: "0.9rem",
          }}
        >
          {number}
        </span>
        {title}
      </h3>
      <p style={{ margin: 0, lineHeight: 1.7 }}>{parseTextWithLinks(text)}</p>
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

function InfoCard({ title, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        background: "#121212",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div>{value}</div>
    </div>
  );
}
