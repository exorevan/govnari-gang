const rawSessions = [
  {
    num: 3,
    title: "Большой переполох в маленькой пивоварне",
    realDate: "",
    gameDate: "",
    heroImage: "/images/chronicles/sessions/session-3-hero.jpg",
    summary:
      'Сессия началась с концерта музыкальной группы "Чесночные гоблины" в таверне "Гоблинский пунш".',
    details:
      'В начале сессии герои посетили таверну "Гоблинский пунш", где проходил концерт музыкальной группы "Чесночные гоблины". Ароматные концерты этого гоблинского коллектива собрали множество посетителей.',
    participants: [],
    keyMoments: ["Концерт чесночных гоблинов в Гоблинском пунше"],
    decisions: [],
    consequences: [],
    mvp: "",
    bestQuote: "",
    rewards: [],
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
