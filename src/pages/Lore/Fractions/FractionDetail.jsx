import React from "react";
import { useParams, Link } from "react-router-dom";
import { fractions } from "../../../data/lore/fractions";
import { playerCharacters } from "../../../data/characters/playerCharacters";
import { npcs } from "../../../data/characters/npcs";
import { allies } from "../../../data/characters/allies";
import { cities } from "../../../data/world/cities";
import { gods } from "../../../data/lore/gods";

export default function FractionDetail() {
  const { id } = useParams();
  const fraction = fractions.find((f) => (f.id ?? "") === id);

  if (!fraction) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Фракция не найдена</h2>
        <Link to="/lore/fractions" style={{ color: "#4da3ff" }}>
          Назад к фракциям
        </Link>
      </main>
    );
  }

  // Найти всех персонажей, связанных с этой фракцией
  const members = [
    ...playerCharacters.filter((pc) =>
      pc.fractions?.some((f) => f.id === id)
    ),
    ...npcs.filter((npc) => npc.fractions?.some((f) => f.id === id)),
    ...allies.filter((ally) => ally.fractions?.some((f) => f.id === id)),
  ];

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/lore/fractions" style={{ color: "#4da3ff", textDecoration: "none" }}>
          ← Назад ко всем фракциям
        </Link>
      </div>
      <h1 style={{ marginBottom: 12 }}>{fraction.name}</h1>
      {fraction.symbol && (
        <img
          src={fraction.symbol}
          alt={fraction.name}
          style={{
            width: 64,
            height: 64,
            objectFit: "contain",
            marginBottom: 16,
          }}
        />
      )}
      {fraction.description ? (
        <div style={{ maxWidth: 800, lineHeight: 1.7, marginBottom: 24 }}>
          {parseTextWithLinks(fraction.description)}
        </div>
      ) : null}
      {members.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ marginBottom: 16 }}>Члены фракции</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {members.map((char) => {
              let charPath = "";
              if (char.id.startsWith("pc-")) {
                charPath = `/characters/players/${char.id}`;
              } else if (char.id.startsWith("npc-")) {
                charPath = `/characters/npcs/${char.id}`;
              } else if (char.id.startsWith("ally-")) {
                charPath = `/characters/allies`;
              }
              return charPath ? (
                <Link
                  key={char.id}
                  to={charPath}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    background: "#121212",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    display: "block",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{char.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 14, marginTop: 4 }}>
                    {char.class || char.role}
                  </div>
                </Link>
              ) : (
                <div
                  key={char.id}
                  style={{
                    background: "#121212",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{char.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 14, marginTop: 4 }}>
                    {char.class || char.role}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
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
