import React from "react";
import { Link } from "react-router-dom";

export default function WorldIndex() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Мир</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            label: "Города",
            to: "/world/cities",
            img: "/images/world/cities/verdis_panorama.jpg",
          },
          {
            label: "География",
            to: "/world/geography",
            img: "/images/world/regions/northrange_panorama.jpg",
          },
          {
            label: "Подземелья",
            to: "/world/dungeons",
            img: "/images/world/dungeons/black_keep_entrance.jpg",
          },
          {
            label: "Карты",
            to: "/world/maps",
            img: "/images/world/maps/world.jpg",
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
