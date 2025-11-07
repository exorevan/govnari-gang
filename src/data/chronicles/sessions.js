const rawSessions = [
  {
    num: 15,
    realDate: "2025-09-21",
    gameDate: "19 Листопада 1234",
    title: "Осада Черного замка",
    heroImage: "/images/chronicles/sessions/15_hero.jpg",
    summary:
      "Герои вели оборону ворот, сдерживая натиск теневых рыцарей до рассвета.",
    participants: [
      {
        id: "pc-auren",
        name: "Аурен",
        portrait: "/images/chars/auren_portrait.jpg",
      },
      {
        id: "pc-lyria",
        name: "Лирия",
        portrait: "/images/chars/lyria_portrait.jpg",
      },
    ],
    details:
      "На рассвете тьма отступила. Аурен принял клятву стража ворот, Лирия обманула призрачного лорда песней. Сотни стрел застлали небо, но вера не дрогнула.",
    keyMoments: ["Прорыв тарана", "Песня, разогнавшая призраков"],
    decisions: [
      "Защитить мирных вместо контратаки",
      "Сжечь склады, чтобы не достались врагу",
    ],
    consequences: ["Потеря провианта", "Репутация защитников возросла"],
    mvp: "Аурен Златоклинок",
    bestQuote: "Держитесь, пока тьма не утратит терпение!",
    rewards: ["+700 XP каждому", "Клинок Полуночи"],
  },
  {
    num: 16,
    realDate: "2025-10-05",
    gameDate: "22 Листопада 1234",
    title: "Тайны костяной библиотеки",
    heroImage: "/images/chronicles/sessions/16_hero.jpg",
    summary:
      "Отряд спустился в глубины, где книги шепчут, а стены запоминают шаги.",
    participants: [
      {
        id: "pc-auren",
        name: "Аурен",
        portrait: "/images/chars/auren_portrait.jpg",
      },
      {
        id: "pc-lyria",
        name: "Лирия",
        portrait: "/images/chars/lyria_portrait.jpg",
      },
    ],
    details:
      "Сквозь шепоты страниц герои нашли Печать Эрсина, но разбудили древнего библиотекаря. Выбор между знанием и безопасностью стал главной загадкой похода.",
    keyMoments: [
      "Разговор с призрачным хранителем",
      "Обвал и спасение свитков",
    ],
    decisions: [
      "Взять печать, оставив часть свитков",
      "Не вступать в бой с хранителем",
    ],
    consequences: [
      "Враждебность духов усилилась",
      "Ключ к разгадке ритуала получен",
    ],
    mvp: "Лирия Тенепеснь",
    bestQuote: "Если книги говорят — слушай, пока они не закричат.",
    rewards: ["+600 XP каждому", "Печать Эрсина"],
  },
];

function normalizeSession(entry) {
  const numberText = entry.num !== undefined ? String(entry.num) : "";
  const sanitizedNumber = numberText.trim();
  const slugPart = sanitizedNumber
    .toLowerCase()
    .replace(/[^0-9a-z]+/gi, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
  const id = entry.id ?? `s-${slugPart || "unnumbered"}`;

  const sequence =
    entry.sequence !== undefined
      ? entry.sequence
      : sanitizedNumber
          .replace(/,/g, ".")
          .split("-")
          .map((part) => Number.parseFloat(part))
          .find((value) => Number.isFinite(value));

  return {
    ...entry,
    id,
    num: sanitizedNumber,
    sequence,
  };
}

export const sessions = rawSessions.map(normalizeSession);

export default sessions;
