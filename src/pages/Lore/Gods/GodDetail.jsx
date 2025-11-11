import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function GodDetail() {
  const { id } = useParams();
  const [god, setGod] = useState(null);
  const [worshippers, setWorshippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Загружаем данные бога
        const godsResponse = await fetch("/data/lore/gods.json");
        if (!godsResponse.ok) {
          throw new Error("Не удалось загрузить данные богов");
        }
        const godsData = await godsResponse.json();
        const currentGod = godsData.find((g) => g.id === id);

        if (!currentGod) {
          throw new Error("Бог не найден");
        }

        setGod(currentGod);

        // Загружаем данные персонажей для поиска поклонников
        const [pcResponse, npcResponse] = await Promise.all([
          fetch("/data/characters/playerCharacters.json"),
          fetch("/data/characters/npcs.json"),
        ]);

        const [playerCharacters, npcs] = await Promise.all([
          pcResponse.json(),
          npcResponse.json(),
        ]);

        // Находим персонажей, поклоняющихся этому богу
        const allWorshippers = [
          ...playerCharacters.filter((pc) =>
            pc.biography?.toLowerCase().includes(currentGod.name.toLowerCase()),
          ),
          ...npcs.filter((npc) =>
            npc.biography
              ?.toLowerCase()
              .includes(currentGod.name.toLowerCase()),
          ),
        ];

        setWorshippers(allWorshippers);
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
        <div>Загрузка данных бога...</div>
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
          to="/lore/gods"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к богам
        </Link>
      </main>
    );
  }

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

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24, marginLeft: -40 }}>
        <Link
          to="/lore/gods"
          style={{ color: "#4da3ff", textDecoration: "none" }}
        >
          ← Назад к богам
        </Link>
      </div>
      <h1 style={{ marginBottom: 10, marginLeft: 5 }}>{god.name}</h1>
      {god.domain && (
        <div style={{ opacity: 0.8, marginBottom: 16, marginLeft: 15 }}>
          {god.domain}
        </div>
      )}
      {god.description && (
        <div style={{ lineHeight: 1.7, marginBottom: 24 }}>
          {god.banner && (
            <img
              src={god.banner}
              alt={god.name}
              style={{
                float: "right",
                width: "300px",
                maxWidth: "40%",
                minHeight: "300px",
                height: "auto",
                objectFit: "cover",
                borderRadius: 12,
                marginLeft: 24,
                marginBottom: 16,
              }}
            />
          )}
          {god.description.split("\n").map((para, idx) => (
            <p
              key={idx}
              style={{
                margin: idx > 0 ? "16px 0 0" : 0,
                textIndent: "2em",
                textAlign: "justify",
              }}
            >
              {parseTextWithLinks(para.trim())}
            </p>
          ))}
        </div>
      )}

      {worshippers.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ marginBottom: 16, marginLeft: 5 }}>Поклонники</h3>
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
