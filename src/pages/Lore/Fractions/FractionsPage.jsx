import React from "react";
import { Link } from "react-router-dom";
import { fractions } from "../../../data/lore/fractions";

export default function FractionsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Фракции</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {fractions.map((fraction) => (
          <Link
            key={fraction.id}
            to={`/lore/fractions/${fraction.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#121212",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 140,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18 }}>{fraction.name}</div>
            {fraction.description ? (
              <div style={{ opacity: 0.8, fontSize: 14 }}>
                {fraction.description}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
