/**
 * Возвращает путь к странице персонажа на основе его ID
 * @param {string} id - ID персонажа (например, "pc-dr-granzh", "npc-darion-eyson")
 * @returns {string|null} - Путь к странице или null
 */
export function getCharacterPath(id) {
  if (!id) return null;
  if (id.startsWith("pc-")) return `/characters/players/${id}`;
  if (id.startsWith("npc-")) return `/characters/npcs/${id}`;
  if (id.startsWith("ally-")) return `/characters/allies/${id}`;
  if (id.startsWith("enemy-")) return `/characters/enemies/${id}`;
  return null;
}
