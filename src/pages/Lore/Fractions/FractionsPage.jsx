import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FractionsPage() {
  const [fractions, setFractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFractions() {
      try {
        setLoading(true);
        const response = await fetch("/data/lore/fractions.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить фракции");
        }
        const data = await response.json();
        setFractions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFractions();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка фракций...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d" }}>Ошибка: {error}</div>
        <Link
          to="/lore"
          style={{ color: "#4da3ff", marginTop: 16, display: "inline-block" }}
        >
          Вернуться к разделу "Знания"
        </Link>
      </main>
    );
  }

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
