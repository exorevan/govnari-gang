import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Импортируем данные
import { playerCharacters } from "../src/data/characters/playerCharacters.js";
import { npcs } from "../src/data/characters/npcs.js";
import { allies } from "../src/data/characters/allies.js";
import { enemies } from "../src/data/characters/enemies.js";
import { deceased } from "../src/data/characters/deceased.js";
import { cities } from "../src/data/world/cities.js";
import { dungeons } from "../src/data/world/dungeons.js";
import { regions } from "../src/data/world/geography.js";
import { establishments } from "../src/data/world/establishments.js";
import { sessions } from "../src/data/chronicles/sessions.js";
import { quotes } from "../src/data/chronicles/quotes.js";
import { fractions } from "../src/data/lore/fractions.js";
import { gods } from "../src/data/lore/gods.js";

const OUTPUT_DIR = path.join(__dirname, "../public/data");

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function saveToJSON(data, category, subcategory) {
  const dir = path.join(OUTPUT_DIR, category, subcategory);
  await ensureDir(dir);

  for (const item of data) {
    const filename = `${item.id}.json`;
    const filepath = path.join(dir, filename);
    await fs.writeFile(filepath, JSON.stringify(item, null, 2), "utf-8");
    console.log(`✓ Создан: ${category}/${subcategory}/${filename}`);
  }
}

async function createIndex(data, category, subcategory) {
  const dir = path.join(OUTPUT_DIR, category, subcategory);
  const indexPath = path.join(dir, "_index.json");
  const index = data.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
  }));
  await fs.writeFile(indexPath, JSON.stringify(index, null, 2), "utf-8");
  console.log(`✓ Создан индекс: ${category}/${subcategory}/_index.json`);
}

async function main() {
  console.log("🚀 Начинаю конвертацию...\n");

  try {
    // Персонажи
    await saveToJSON(playerCharacters, "characters", "players");
    await createIndex(playerCharacters, "characters", "players");

    await saveToJSON(npcs, "characters", "npcs");
    await createIndex(npcs, "characters", "npcs");

    await saveToJSON(allies, "characters", "allies");
    await createIndex(allies, "characters", "allies");

    await saveToJSON(enemies, "characters", "enemies");
    await createIndex(enemies, "characters", "enemies");

    await saveToJSON(deceased, "characters", "deceased");
    await createIndex(deceased, "characters", "deceased");

    // Мир
    await saveToJSON(cities, "world", "cities");
    await createIndex(cities, "world", "cities");

    await saveToJSON(dungeons, "world", "dungeons");
    await createIndex(dungeons, "world", "dungeons");

    await saveToJSON(regions, "world", "geography");
    await createIndex(regions, "world", "geography");

    await saveToJSON(establishments, "world", "establishments");
    await createIndex(establishments, "world", "establishments");

    // Хроники
    await saveToJSON(sessions, "chronicles", "sessions");
    await createIndex(sessions, "chronicles", "sessions");

    await saveToJSON(quotes, "chronicles", "quotes");
    await createIndex(quotes, "chronicles", "quotes");

    // Лор
    await saveToJSON(fractions, "lore", "fractions");
    await createIndex(fractions, "lore", "fractions");

    await saveToJSON(gods, "lore", "gods");
    await createIndex(gods, "lore", "gods");

    console.log("\n✅ Конвертация завершена успешно!");
  } catch (error) {
    console.error("❌ Ошибка:", error);
    process.exit(1);
  }
}

main();
