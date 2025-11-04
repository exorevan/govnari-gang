import React from "react";
import { useParams, Link } from "react-router-dom";
import { sessions } from "../../../data/chronicles/sessions";

export default function SessionDetail() {
  const { id } = useParams();
  const idx = sessions.findIndex((s) => s.id === id);
  const s = sessions[idx] || sessions[0];
  const prev = sessions[idx - 1];
  const next = sessions[idx + 1];

  return (
    <main style={{ minHeight: "100%" }}>
      {/* Top */}
      <section style={{ position: "relative", height: 320 }}>
        <img
          src={s.heroImage}
          alt={s.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ opacity: 0.95 }}>
              {s.realDate} • {s.gameDate} • #{s.num}
            </div>
            <h1 style={{ margin: 0 }}>{s.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 320px",
          gap: 24,
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Block title="Краткое содержание" text={s.summary} />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Участники</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {s.participants.map((p) => (
                <figure key={p.id} style={{ margin: 0, textAlign: "center" }}>
                  <img
                    src={p.portrait}
                    alt={p.name}
                    style={{
                      width: 72,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                  <figcaption style={{ marginTop: 6 }}>{p.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <Block title="Подробное описание" text={s.details} />
          <ListBlock title="Ключевые моменты" items={s.keyMoments} />
          <ListBlock title="Решения игроков" items={s.decisions} />
          <ListBlock title="Последствия" items={s.consequences} />
        </div>

        <aside>
          <InfoCard title="MVP сессии" value={s.mvp} />
          <InfoCard title="Лучшая цитата" value={`“${s.bestQuote}”`} />
          <ListBlock title="Полученный опыт и лут" items={s.rewards} />
        </aside>
      </section>

      <section
        style={{
          padding: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prev ? (
          <Link
            to={`/chronicles/sessions/${prev.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "#1f2a44",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Предыдущая сессия
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/chronicles/sessions/${next.id}`}
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "#1f2a44",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Следующая сессия
          </Link>
        ) : (
          <span />
        )}
      </section>
    </main>
  );
}

function Block({ title, text }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

function ListBlock({ title, items }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 6,
        }}
      >
        {items.map((it, idx) => (
          <li
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                background: "#d4af37",
                display: "inline-block",
              }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div
      style={{
        background: "#121212",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div>{value}</div>
    </div>
  );
}
