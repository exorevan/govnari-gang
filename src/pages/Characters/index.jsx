import React from "react";
import { Link } from "react-router-dom";

export default function CharactersIndex() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Персонажи</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            label: "Игровые персонажи",
            to: "/characters/players",
            img: "/assets/images/chars/lyria_hero.jpg",
          },
          {
            label: "НПЦ",
            to: "/characters/npcs",
            img: "/assets/images/chars/velka_hero.jpg",
          },
          {
            label: "Союзники",
            to: "/characters/allies",
            img: "/assets/images/chars/bron_portrait.jpg",
          },
          {
            label: "Враги",
            to: "/characters/enemies",
            img: "/assets/images/chars/redric_portrait.jpg",
          },
          {
            label: "Павшие",
            to: "/characters/deceased",
            img: "/assets/images/chars/eldric_hero.jpg",
          },
        ].map((x) => (
          <Link
            key={x.to}
            to={x.to}
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
                height: 140,
                background: `url(${x.img}) center/cover no-repeat`,
              }}
            />
            <div style={{ padding: 12, fontWeight: 700 }}>{x.label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
