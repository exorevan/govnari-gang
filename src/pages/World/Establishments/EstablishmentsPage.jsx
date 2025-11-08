import React from "react";
import { establishments } from "../../../data/world/establishments";

export default function EstablishmentsPage() {
  const grouped = groupByCategory(establishments);

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Заведения</h2>
      <p style={{ marginBottom: 24, maxWidth: 720, lineHeight: 1.6 }}>
        Кузни, таверны, лавки и постоялые дворы, которые определяют облик мира.
        Здесь договариваются о походах, чинят оружие и находят редкие товары.
      </p>

      {grouped.map(([category, items]) => (
        <section key={category} style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16 }}>{category}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {items.map((est) => (
              <article
                key={est.id}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#121212",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 360,
                }}
              >
                <HeaderImage establishment={est} />
                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      {est.name}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.85 }}>
                      {est.settlement}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>
                      {est.location}
                    </div>
                  </div>

                  <p style={{ margin: 0, lineHeight: 1.5 }}>
                    {est.description}
                  </p>

                  {est.owner ? (
                    <div style={{ fontSize: 13, opacity: 0.85 }}>
                      <span style={{ opacity: 0.7 }}>Хозяин:</span>{" "}
                      {est.owner.name}
                      {est.owner.title ? `, ${est.owner.title}` : ""}
                    </div>
                  ) : null}

                  {est.specialties?.length ? (
                    <DetailList title="Особенности" items={est.specialties} />
                  ) : null}

                  {est.menu?.length ? (
                    <DetailList title="Меню" items={est.menu} />
                  ) : null}

                  {est.notableClients?.length ? (
                    <DetailList
                      title="Постоянные гости"
                      items={est.notableClients}
                    />
                  ) : null}

                  {est.rumor ? (
                    <div
                      style={{
                        fontSize: 13,
                        opacity: 0.75,
                        fontStyle: "italic",
                      }}
                    >
                      {est.rumor}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function groupByCategory(items) {
  const map = new Map();
  items.forEach((est) => {
    const key = est.category || est.type || "Прочее";
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(est);
  });
  return Array.from(map.entries());
}

function HeaderImage({ establishment }) {
  const { image, type } = establishment;
  const hasImage = Boolean(image);
  return (
    <div
      style={{
        position: "relative",
        height: 160,
        background: hasImage
          ? `url(${image}) center/cover no-repeat`
          : "linear-gradient(135deg, #3a3a3a, #1f1f1f)",
        filter: hasImage ? "brightness(0.95)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {type ? (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {type}
        </div>
      ) : null}
    </div>
  );
}

function DetailList({ title, items }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          opacity: 0.65,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 18,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {items.map((item) => (
          <li key={item} style={{ fontSize: 13, opacity: 0.9 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
