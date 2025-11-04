import React from "react";
import { useParams } from "react-router-dom";
import { npcs } from "../../../data/characters/npcs";

export default function NPCDetail() {
  const { id } = useParams();
  const npc = npcs.find((n) => n.id === id) || npcs[0];

  return (
    <main style={{ minHeight: "100%" }}>
      <section style={{ position: "relative", height: "50vh", background: `url(${npc.banner}) center/cover no-repeat` }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
          <div style={{ padding: 32, width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 40, margin: 0, color: "#d4af37" }}>{npc.name}</h1>
              <div style={{ opacity: 0.9, marginTop: 6 }}>{npc.role}</div>
              <em style={{ display: "block", marginTop: 12, opacity: 0.9 }}>“{npc.quote}”</em>
            </div>
            <img src={npc.symbol} alt="symbol" style={{ width: 80, height: 80, objectFit: "contain" }} />
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 24, padding: 24 }}>
        <div>
          <Block title="Внешность" text={npc.appearance} />
          <Block title="Биография" text={npc.biography} />
          <Block title="Личность и мотивация" text={npc.personality} />
          <ListBlock title="Достижения" items={npc.achievements} icon="/images/icons/trophy-gold.png" />
          <ListBlock title="Важные моменты в кампании" items={npc.campaignMoments} />
          {npc.gallery?.length ? (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px" }}>Галерея</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                {npc.gallery.map((src) => (
                  <img key={src} src={src} alt="art" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {Object.entries(npc.stats).map(([key, value]) => (
              <div key={key} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{key.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Снаряжение</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
              {npc.equipment.map((it) => (
                <li key={it.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={it.icon} alt="icon" style={{ width: 18, height: 18 }} />
                  <span>{it.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Связи</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {npc.relations.map((r) => (
                <figure key={r.id} style={{ margin: 0, textAlign: "center" }}>
                  <img src={r.portrait} alt={r.label} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />
                  <figcaption style={{ fontSize: 12, opacity: 0.85 }}>{r.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 8px" }}>Фракции</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {npc.factions.map((f) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 6, background: "#111", padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={f.icon} alt={f.name} style={{ width: 18, height: 18 }} />
                  <span style={{ fontSize: 12 }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Block({ title, text }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}

function ListBlock({ title, items, icon }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {items.map((it, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon ? <img src={icon} alt="icon" style={{ width: 16, height: 16 }} /> : <span style={{ width: 6, height: 6, borderRadius: 99, background: "#d4af37", display: "inline-block" }} />}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
