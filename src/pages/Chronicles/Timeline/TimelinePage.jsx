import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharacterPath } from "../../../utils/getCharacterPath";

export default function TimelinePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, []);

  async function loadTimeline() {
    try {
      const indexResponse = await fetch("/data/chronicles/timeline/index.json");
      const index = await indexResponse.json();

      const eventsPromises = index.events.map(async (id) => {
        const response = await fetch(`/data/chronicles/timeline/${id}.json`);
        return response.json();
      });

      const loadedEvents = await Promise.all(eventsPromises);

      loadedEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      setEvents(loadedEvents);
    } catch (error) {
      console.error("Ошибка загрузки временной шкалы:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Загрузка временной шкалы...</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 32, textAlign: "center" }}>
        Временная шкала событий
      </h2>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(212, 175, 55, 0.3)",
          }}
        />

        {events.map((event, index) => (
          <TimelineEvent key={event.id} event={event} index={index} />
        ))}
      </div>
    </main>
  );
}

function TimelineEvent({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 48,
        paddingLeft: isLeft ? 0 : 60,
        paddingRight: isLeft ? 60 : 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 11,
          top: 0,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#d4af37",
          border: "3px solid #0a0a0a",
          zIndex: 1,
        }}
      />

      <div
        style={{
          background: "#121212",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          borderRadius: 12,
          padding: 20,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -12,
            left: 16,
            background: "#d4af37",
            color: "#0a0a0a",
            padding: "4px 12px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {formatDate(event.date)}
        </div>

        <h3
          style={{
            margin: "12px 0 8px",
            fontSize: 20,
            color: "#d4af37",
          }}
        >
          {event.title}
        </h3>

        {event.description && (
          <p
            style={{
              margin: "0 0 12px",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            {event.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          {event.relatedSession && (
            <Link
              to={`/chronicles/sessions/${event.relatedSession}`}
              style={{
                padding: "6px 12px",
                background: "rgba(77, 163, 255, 0.2)",
                border: "1px solid rgba(77, 163, 255, 0.4)",
                borderRadius: 6,
                textDecoration: "none",
                color: "#4da3ff",
                fontSize: 13,
              }}
            >
              📖 Связанная сессия
            </Link>
          )}

          {event.relatedCharacters?.map((charId) => (
            <Link
              key={charId}
              to={getCharacterPath(charId)}
              style={{
                padding: "6px 12px",
                background: "rgba(212, 175, 55, 0.2)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                borderRadius: 6,
                textDecoration: "none",
                color: "#d4af37",
                fontSize: 13,
              }}
            >
              👤 Персонаж
            </Link>
          ))}

          {event.relatedLocation && (
            <Link
              to={getCityPath(event.relatedLocation)}
              style={{
                padding: "6px 12px",
                background: "rgba(155, 89, 182, 0.2)",
                border: "1px solid rgba(155, 89, 182, 0.4)",
                borderRadius: 6,
                textDecoration: "none",
                color: "#9b59b6",
                fontSize: 13,
              }}
            >
              📍 Локация
            </Link>
          )}
        </div>

        {event.type && (
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: "4px 8px",
              background: getEventTypeColor(event.type),
              borderRadius: 6,
              fontSize: 11,
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            {getEventTypeName(event.type)}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCityPath(id) {
  if (!id) return "#";
  return `/world/cities/${id}`;
}

function getEventTypeColor(type) {
  const colors = {
    battle: "rgba(231, 76, 60, 0.3)",
    discovery: "rgba(52, 152, 219, 0.3)",
    political: "rgba(155, 89, 182, 0.3)",
    personal: "rgba(46, 204, 113, 0.3)",
    death: "rgba(52, 73, 94, 0.3)",
    birth: "rgba(241, 196, 15, 0.3)",
  };
  return colors[type] || "rgba(149, 165, 166, 0.3)";
}

function getEventTypeName(type) {
  const names = {
    battle: "Битва",
    discovery: "Открытие",
    political: "Политика",
    personal: "Личное",
    death: "Смерть",
    birth: "Рождение",
  };
  return names[type] || "Событие";
}
