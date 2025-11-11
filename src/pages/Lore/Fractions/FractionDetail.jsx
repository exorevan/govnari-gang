import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function FractionDetail() {
  const { id } = useParams();
  const [fraction, setFraction] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем данные фракции
        const fractionResponse = await fetch("/data/lore/fractions.json");
        if (!fractionResponse.ok) {
          throw new Error("Не удалось загрузить данные фракций");
        }
        const fractionsData = await fractionResponse.json();
        const currentFraction = fractionsData.find((f) => f.id === id);

        if (!currentFraction) {
          throw new Error("Фракция не найдена");
        }

        setFraction(currentFraction);

        // Загружаем данные персонажей для поиска членов фракции
        const [pcResponse, npcResponse, alliesResponse] = await Promise.all([
          fetch("/data/characters/playerCharacters.json"),
          fetch("/data/characters/npcs.json"),
          fetch("/data/characters/allies.json"),
        ]);

        const [playerCharacters, npcs, allies] = await Promise.all([
          pcResponse.json(),
          npcResponse.json(),
          alliesResponse.json(),
        ]);

        // Находим всех персонажей, связанных с этой фракцией
        const allMembers = [
          ...playerCharacters.filter((pc) =>
            pc.fractions?.some((f) => f.id === id),
          ),
          ...npcs.filter((npc) => npc.fractions?.some((f) => f.id === id)),
          ...allies.filter((ally) => ally.fractions?.some((f) => f.id === id)),
        ];

        setMembers(allMembers);
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
        <div>Загрузка данных фракции...</div>
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
          to="/lore/fractions"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад ко всем фракциям
        </Link>
      </main>
    );
  }

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

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/lore/fractions"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
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
                charPath = `/characters/allies/${char.id}`;
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
