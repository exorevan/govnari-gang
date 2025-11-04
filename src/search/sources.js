// Aggregate searchable documents from data modules and static pages.
// A document has: { id, route, title, description?, text? }

// Characters
import { npcs } from "../data/characters/npcs.js";
import { allies } from "../data/characters/allies.js";
import { enemies } from "../data/characters/enemies.js";
import { playerCharacters } from "../data/characters/playerCharacters.js";

// World
import { cities } from "../data/world/cities.js";
import { dungeons } from "../data/world/dungeons.js";
import { geography } from "../data/world/geography.js";

// Chronicles
import { keyEvents } from "../data/chronicles/keyEvents.js";
import { sessions } from "../data/chronicles/sessions.js";

// Lore
import { factions } from "../data/lore/factions.js";
import { gods } from "../data/lore/gods.js";
import { history } from "../data/lore/history.js";

function safeArray(x) {
  return Array.isArray(x) ? x : [];
}

export function getDocuments() {
  const docs = [];

  // Characters
  safeArray(playerCharacters).forEach((p) =>
    docs.push({
      id: `pc-${p.id ?? p.name}`,
      route: `/characters/players/${p.id ?? encodeURIComponent(p.name)}`,
      title: p.name || "Игрок-персонаж",
      description: p.class || p.race || p.title,
      text: p.bio || p.description || "",
    }),
  );
  safeArray(npcs).forEach((n) =>
    docs.push({
      id: `npc-${n.id ?? n.name}`,
      route: `/characters/npcs/${n.id ?? encodeURIComponent(n.name)}`,
      title: n.name || "NPC",
      description: n.role || n.faction,
      text: n.bio || n.description || "",
    }),
  );
  safeArray(allies).forEach((a) =>
    docs.push({
      id: `ally-${a.id ?? a.name}`,
      route: `/characters/allies`,
      title: a.name || "Союзник",
      description: a.role || a.faction,
      text: a.bio || a.description || "",
    }),
  );
  safeArray(enemies).forEach((e) =>
    docs.push({
      id: `enemy-${e.id ?? e.name}`,
      route: `/characters/enemies`,
      title: e.name || "Враг",
      description: e.role || e.faction,
      text: e.bio || e.description || "",
    }),
  );

  // World
  safeArray(cities).forEach((c) =>
    docs.push({
      id: `city-${c.id ?? c.name}`,
      route: `/world/cities/${c.id ?? encodeURIComponent(c.name)}`,
      title: c.name || "Город",
      description: c.region,
      text: c.description || c.history || "",
    }),
  );
  safeArray(dungeons).forEach((d) =>
    docs.push({
      id: `dungeon-${d.id ?? d.name}`,
      route: `/world/dungeons/${d.id ?? encodeURIComponent(d.name)}`,
      title: d.name || "Подземелье",
      description: d.region,
      text: d.description || d.legend || "",
    }),
  );
  safeArray(geography).forEach((g) =>
    docs.push({
      id: `geo-${g.id ?? g.name}`,
      route: `/world/geography`,
      title: g.name || "Локация",
      description: g.type,
      text: g.description || "",
    }),
  );

  // Chronicles
  safeArray(sessions).forEach((s) =>
    docs.push({
      id: `session-${s.id ?? s.title}`,
      route: `/chronicles/sessions/${s.id ?? encodeURIComponent(s.title)}`,
      title: s.title || "Сессия",
      description: s.date,
      text: s.summary || s.notes || "",
    }),
  );
  safeArray(keyEvents).forEach((e) =>
    docs.push({
      id: `event-${e.id ?? e.title}`,
      route: `/chronicles/key-events`,
      title: e.title || "Событие",
      description: e.date,
      text: e.description || e.details || "",
    }),
  );

  // Lore
  safeArray(factions).forEach((f) =>
    docs.push({
      id: `faction-${f.id ?? f.name}`,
      route: `/lore/factions/${f.id ?? encodeURIComponent(f.name)}`,
      title: f.name || "Фракция",
      description: f.alignment,
      text: f.description || f.history || "",
    }),
  );
  safeArray(gods).forEach((g) =>
    docs.push({
      id: `god-${g.id ?? g.name}`,
      route: `/lore/gods/${g.id ?? encodeURIComponent(g.name)}`,
      title: g.name || "Божество",
      description: g.domain,
      text: g.description || g.myth || "",
    }),
  );
  safeArray(history).forEach((h) =>
    docs.push({
      id: `history-${h.id ?? h.title}`,
      route: `/lore/history`,
      title: h.title || "История",
      description: h.period,
      text: h.text || h.description || "",
    }),
  );

  return docs;
}


