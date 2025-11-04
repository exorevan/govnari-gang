import React from "react";
import { enemies } from "../../../data/characters/enemies";

export default function EnemiesPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Враги</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {enemies.map((e) => (
          <div key={e.id} style={{ background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ height: 160, background: `url(${e.portrait}) center/cover no-repeat`, filter: "contrast(1.05)" }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{e.name}</div>
              <div style={{ opacity: 0.8 }}>{e.role}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
