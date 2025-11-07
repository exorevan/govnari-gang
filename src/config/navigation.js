const navigation = [
  {
    label: "Персонажи",
    path: "/characters",
    children: [
      { label: "Игровые персонажи", path: "/characters/players" },
      { label: "НПЦ", path: "/characters/npcs" },
      { label: "Союзники", path: "/characters/allies" },
      { label: "Враги", path: "/characters/enemies" },
      { label: "Павшие", path: "/characters/deceased" },
    ],
  },
  {
    label: "Мир",
    path: "/world",
    children: [
      { label: "Города", path: "/world/cities" },
      { label: "География", path: "/world/geography" },
      { label: "Подземелья", path: "/world/dungeons" },
      { label: "Карты", path: "/world/maps" },
    ],
  },
  {
    label: "Хроники",
    path: "/chronicles",
    children: [
      { label: "Сессии", path: "/chronicles/sessions" },
      { label: "Ключевые события", path: "/chronicles/key-events" },
      { label: "Временная шкала", path: "/chronicles/timeline" },
      { label: "Цитаты", path: "/chronicles/quotes" },
    ],
  },
  {
    label: "Лор",
    path: "/lore",
    children: [
      { label: "Фракции", path: "/lore/fractions" },
      { label: "Боги", path: "/lore/gods" },
      { label: "История", path: "/lore/history" },
      { label: "Легенды", path: "/lore/legends" },
    ],
  },
  {
    label: "Правила",
    path: "/rules",
    children: [
      { label: "Хоумбрю", path: "/rules/homebrew" },
      { label: "Механики", path: "/rules/mechanics" },
    ],
  },
  {
    label: "Медиа",
    path: "/media",
    children: [
      { label: "Галерея", path: "/media/gallery" },
      { label: "Музыка", path: "/media/music" },
    ],
  },
];

export default navigation;
