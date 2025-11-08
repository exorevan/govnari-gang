import React from "react";
import { useParams, Link } from "react-router-dom";
import { sessions } from "../../../data/chronicles/sessions";
import { playerCharacters } from "../../../data/characters/playerCharacters";
import { npcs } from "../../../data/characters/npcs";
import { allies } from "../../../data/characters/allies";
import { cities } from "../../../data/world/cities";
import { fractions } from "../../../data/lore/fractions";
import { gods } from "../../../data/lore/gods";

function findCharacter(id) {
  return (
    playerCharacters.find((c) => c.id === id) ||
    npcs.find((c) => c.id === id) ||
    allies.find((c) => c.id === id)
  );
}

export default function SessionDetail() {
  const { id } = useParams();
  const idx = sessions.findIndex((s) => s.id === id);
  const s = sessions[idx] || sessions[0];
  const prev = sessions[idx - 1];
  const next = sessions[idx + 1];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Top */}
      <section style={{ position: "relative", height: 320 }}>
        <img
          src={s.heroImage}
          alt={s.title}
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
              {s.realDate} • {s.gameDate} • #{s.num}
            </div>
            <h1 style={{ margin: 0 }}>{s.title}</h1>
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
          <Block title="Краткое содержание" text={s.summary} />

          {s.participants?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Участники</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {s.participants.map((participantId) => {
                  const character = findCharacter(participantId);
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
          {s.chapters?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: "1.5rem" }}>
                История приключения
              </h2>
              {s.chapters.map((chapter, idx) => (
                <ChapterBlock
                  key={idx}
                  number={idx + 1}
                  title={chapter.title}
                  text={chapter.content}
                />
              ))}
            </div>
          )}

          <ListBlock title="Ключевые моменты" items={s.keyMoments} />
          <ListBlock title="Решения игроков" items={s.decisions} />
          <ListBlock title="Последствия" items={s.consequences} />
        </div>

        <aside>
          <InfoCard title="MVP сессии" value={s.mvp} />
          <InfoCard title="Лучшая цитата" value={`"${s.bestQuote}"`} />
          <ListBlock title="Полученный опыт и лут" items={s.rewards} />
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

function getCharacterPath(id) {
  if (!id) return null;
  if (id.startsWith("pc-")) return `/characters/players/${id}`;
  if (id.startsWith("npc-")) return `/characters/npcs/${id}`;
  if (id.startsWith("ally-")) return `/characters/allies`;
  return null;
}
