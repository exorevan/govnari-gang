// Базовая функция для загрузки JSON
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return null;
  }
}

// Загрузка индекса категории
async function loadIndex(category) {
  return loadJSON(`/data/${category}/index.json`);
}

// Загрузка одного элемента
export async function loadItem(category, id) {
  return loadJSON(`/data/${category}/${id}.json`);
}

// Загрузка всех элементов категории
export async function loadAll(category) {
  const index = await loadIndex(category);
  if (!index || !Array.isArray(index)) return [];

  const items = await Promise.all(index.map((id) => loadItem(category, id)));

  return items.filter(Boolean);
}

// Специфичные загрузчики для каждой категории
export const dataLoaders = {
  // Characters
  playerCharacters: () => loadAll("characters/players"),
  playerCharacter: (id) => loadItem("characters/players", id),

  npcs: () => loadAll("characters/npcs"),
  npc: (id) => loadItem("characters/npcs", id),

  allies: () => loadAll("characters/allies"),
  ally: (id) => loadItem("characters/allies", id),

  enemies: () => loadAll("characters/enemies"),
  enemy: (id) => loadItem("characters/enemies", id),

  deceased: () => loadAll("characters/deceased"),

  // World
  cities: () => loadAll("world/cities"),
  city: (id) => loadItem("world/cities", id),

  dungeons: () => loadAll("world/dungeons"),
  dungeon: (id) => loadItem("world/dungeons", id),

  establishments: () => loadAll("world/establishments"),
  establishment: (id) => loadItem("world/establishments", id),

  geography: () => loadAll("world/geography"),

  // Chronicles
  sessions: () => loadAll("chronicles/sessions"),
  session: (id) => loadItem("chronicles/sessions", id),

  quotes: () => loadAll("chronicles/quotes"),

  // Lore
  fractions: () => loadAll("lore/fractions"),
  fraction: (id) => loadItem("lore/fractions", id),

  gods: () => loadAll("lore/gods"),
  god: (id) => loadItem("lore/gods", id),

  // Media - Gallery
  galleryAlbums: () => loadAll("media/gallery"),
  galleryAlbum: (id) => loadItem("media/gallery", id),

  // Media - Music
  musicPlaylists: () => loadAll("media/music"),
  musicPlaylist: (id) => loadItem("media/music", id),

  // World
  dungeons: () => loadAll("world/dungeons"),
  dungeon: (id) => loadItem("world/dungeons", id),
};
