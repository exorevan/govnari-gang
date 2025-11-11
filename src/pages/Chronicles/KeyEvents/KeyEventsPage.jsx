import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function KeyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const indexResponse = await fetch(
          "/data/chronicles/key-events/index.json",
        );
        const index = await indexResponse.json();

        const eventsData = await Promise.all(
          index.map(async (id) => {
            const response = await fetch(
              `/data/chronicles/key-events/${id}.json`,
            );
            return response.json();
          }),
        );

        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки событий:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <div>Загрузка событий...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <div style={{ color: "#ff4d4d" }}>Ошибка: {error}</div>
      </main>
    );
  }

  if (events.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Ключевые события</h2>
        <p>Пока нет ключевых событий</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Ключевые события</h2>
      <div style={{ display: "grid", gap: 16 }}>
        {events.map((event) => (
          <article
            key={event.id}
            style={{
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{event.title}</h3>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 12 }}>
              {event.date}
            </div>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{event.description}</p>
            {event.relatedSessions?.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 6 }}>
                  Связанные сессии:
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {event.relatedSessions.map((sessionId, idx) => (
                    <Link
                      key={idx}
                      to={`/chronicles/sessions/${sessionId}`}
                      style={{
                        padding: "4px 8px",
                        background: "#1f2a44",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 6,
                        fontSize: 12,
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      #{sessionId}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
