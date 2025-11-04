export const playerCharacters = [
  {
    id: "pc-auren",
    name: "Аурен Златоклинок",
    class: "Паладин",
    race: "Человек",
    level: 7,
    banner: "/images/chars/auren_hero.jpg",
    symbol: "/images/icons/sun-crest.png",
    quote: "Свет озарит даже самые тёмные тропы.",
    appearance:
      "Высокий, статный, светлые волосы собраны в хвост, латные доспехи с золотой окантовкой.",
    biography:
      "Родился в провинции Соларн, воспитан орденом Рассвета. Скитался паломником, защищая слабых.",
    personality:
      "Спокоен, упрям в следовании кодексу. Ищет справедливость, ненавидит тиранию.",
    achievements: [
      "Разрушил культ Полуночного Пламени",
      "Освободил деревню Тальбрид от налётчиков",
    ],
    campaignMoments: [
      "Дуэль на мосту с рыцарем Бездны",
      "Клятва хранить Хрустальную Реликвию",
    ],
    stats: { str: 16, dex: 12, con: 14, int: 10, wis: 13, cha: 17 },
    equipment: [
      { name: "Меч Рассвета", icon: "/images/icons/sword-gold.png" },
      { name: "Щит Верности", icon: "/images/icons/shield.png" },
    ],
    relations: [
      { id: "pc-lyria", label: "союзник", portrait: "/images/chars/lyria_portrait.jpg" },
      { id: "npc-morvan", label: "соперник", portrait: "/images/chars/morvan_portrait.jpg" },
    ],
    factions: [
      { id: "f-radiant-dawn", name: "Орден Сияющего Рассвета", icon: "/images/icons/faction-dawn.png" },
    ],
    gallery: [
      "/images/chars/auren_1.jpg",
      "/images/chars/auren_2.jpg",
    ],
  },
  {
    id: "pc-lyria",
    name: "Лирия Тенепеснь",
    class: "Бард",
    race: "Полуэльф",
    level: 7,
    banner: "/images/chars/lyria_hero.jpg",
    symbol: "/images/icons/lyre.png",
    quote: "Каждая тайна — лишь куплет незавершённой песни.",
    appearance:
      "Худощавая, серебристые волосы до плеч, тёмный плащ, на поясе лира и стилеты.",
    biography:
      "Дочь посла эльфов, обучалась в Академии Муз. Сбежала в странствия за вдохновением.",
    personality:
      "Остроумная, любопытная, авантюрная. Обожает истории и опасные спектакли.",
    achievements: [
      "Выкрала карту Кобальтового Архива",
      "Примирила враждующие гильдии в Вердисе",
    ],
    campaignMoments: [
      "Бал-маскарад в башне Архимага",
      "Песня, разогнавшая призраков в катакомбах",
    ],
    stats: { str: 9, dex: 16, con: 11, int: 13, wis: 12, cha: 18 },
    equipment: [
      { name: "Чародейская лира", icon: "/images/icons/lyre.png" },
      { name: "Стилет", icon: "/images/icons/dagger.png" },
    ],
    relations: [
      { id: "pc-auren", label: "друг", portrait: "/images/chars/auren_portrait.jpg" },
      { id: "npc-velka", label: "контакт", portrait: "/images/chars/velka_portrait.jpg" },
    ],
    factions: [
      { id: "f-veil-society", name: "Общество Вуали", icon: "/images/icons/faction-veil.png" },
    ],
    gallery: [
      "/images/chars/lyria_1.jpg",
      "/images/chars/lyria_2.jpg",
    ],
  },
];

export default playerCharacters;