import React from "react";
import { Link } from "react-router-dom";
import { cities } from "../../../data/world/cities";

export default function CitiesPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Города</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {cities.map((c) => (
          <Link
            key={c.id}
            to={`/world/cities/${c.id}`}
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
                background: `url(${c.panorama}) center/cover no-repeat`,
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
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img
                  src={c.flag}
                  alt="flag"
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
                  <div style={{ opacity: 0.85, fontSize: 13 }}>{c.motto}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
