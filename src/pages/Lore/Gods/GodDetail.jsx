import React from "react";
import { useParams, Link } from "react-router-dom";
import { gods } from "../../../data/lore/gods";
import { playerCharacters } from "../../../data/characters/playerCharacters";
import { npcs } from "../../../data/characters/npcs";
import { allies } from "../../../data/characters/allies";
import { cities } from "../../../data/world/cities";
import { fractions } from "../../../data/lore/fractions";

export default function GodDetail() {
  const { id } = useParams();
  const god = gods.find((g) => g.id === id);

  if (!god) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Бог не найден</h2>
        <Link to="/lore/gods" style={{ color: "#4da3ff" }}>
          Назад к богам
        </Link>
      </main>
    );
  }

  // Найти персонажей, поклоняющихся этому богу
  const worshippers = [
    ...playerCharacters.filter((pc) =>
      pc.biography?.toLowerCase().includes(god.name.toLowerCase())
    ),
    ...npcs.filter((npc) =>
      npc.biography?.toLowerCase().includes(god.name.toLowerCase())
    ),
  ];

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/lore/gods" style={{ color: "#4da3ff", textDecoration: "none" }}>
          ← Назад к богам
        </Link>
      </div>
      <h1 style={{ marginBottom: 12 }}>{god.name}</h1>
      {god.domain && (
        <div style={{ opacity: 0.8, marginBottom: 16 }}>{god.domain}</div>
      )}
      {god.banner && (
        <img
          src={god.banner}
          alt={god.name}
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 24,
          }}
        />
      )}
      {god.description && (
        <div style={{ maxWidth: 800, lineHeight: 1.7, marginBottom: 24 }}>
          {god.description.split("\n").map((para, idx) => (
            <p key={idx} style={{ margin: idx > 0 ? "16px 0 0" : 0 }}>
              {parseTextWithLinks(para.trim())}
            </p>
          ))}
        </div>
      )}
      {worshippers.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ marginBottom: 16 }}>Поклонники</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {worshippers.map((char) => {
              const charPath = char.id.startsWith("pc-")
                ? `/characters/players/${char.id}`
                : `/characters/npcs/${char.id}`;
              return (
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
