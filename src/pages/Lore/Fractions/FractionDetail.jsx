import React from "react";
import { useParams, Link } from "react-router-dom";
import { fractions } from "../../../data/lore/fractions";

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

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>{fraction.name}</h2>
      {fraction.description ? (
        <p style={{ maxWidth: 640, lineHeight: 1.6 }}>{fraction.description}</p>
      ) : null}
      <div style={{ marginTop: 24 }}>
        <Link to="/lore/fractions" style={{ color: "#4da3ff" }}>
          ← Назад ко всем фракциям
        </Link>
      </div>
    </main>
  );
}
