import React from "react";
import { allies } from "../../../data/characters/allies";

export default function AlliesPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Союзники</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {allies.map((a) => (
          <div key={a.id} style={{ background: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ height: 160, background: `url(${a.portrait}) center/cover no-repeat` }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{a.name}</div>
              <div style={{ opacity: 0.8 }}>{a.role}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
