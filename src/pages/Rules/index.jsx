import React from "react";
import { Link } from "react-router-dom";

export default function RulesIndex() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Правила</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            label: "Хоумбрю",
            to: "/rules/homebrew",
            img: "/images/rules/homebrew_hero.jpg",
          },
          {
            label: "Механики",
            to: "/rules/mechanics",
            img: "/images/rules/mechanics_hero.jpg",
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
