import React from "react";
import { Link } from "react-router-dom";
import { playerCharacters } from "../../../data/characters/playerCharacters";

export default function PlayerCharactersPage() {
  return (
    <main style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>Игровые персонажи</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {playerCharacters.map((pc) => (
          <Link
            key={pc.id}
            to={`/characters/players/${pc.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#121212",
            }}
          >
            <div
              style={{
                position: "relative",
                height: 160,
                background: `url(${pc.banner}) center/cover no-repeat`,
                filter: "saturate(0.9)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 8, left: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{pc.name}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>
                  {pc.class} • {pc.race} • ур. {pc.level}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: 12,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <img
                src={pc.symbol}
                alt="symbol"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  opacity: 0.9,
                }}
              />
              <em style={{ opacity: 0.8, fontSize: 13 }}>“{pc.quote}”</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
