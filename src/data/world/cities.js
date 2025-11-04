export const cities = [
  {
    id: "city-verdis",
    name: "Вердис",
    flag: "/images/icons/city-flag-verdis.png",
    motto: "Торговая жемчужина севера",
    panorama: "/images/world/cities/verdis_panorama.jpg",
    mapSmall: "/images/world/maps/world_thumb.jpg",
    info: {
      population: 68000,
      ruler: {
        name: "Маркиз Ладис Вердий",
        portrait: "/images/chars/ladis_portrait.jpg",
      },
      ruleType: "Олигархия",
      mainResource: "Ткани, специи, корабельный лес",
      mainReligion: "Культ Семи Ветров",
    },
    history:
      "Вердис вырос на перекрёстке морских путей. После Штормовых войн укрепил влияние через торговые союзы.",
    description:
      "Город каналов и рынков. Мосты украшены резьбой, в доках грохочут верфи, на площадях глашатаи.",
    districts: [
      {
        name: "Старый Порт",
        description: "Сердце торговли и таверн",
        icon: "/images/icons/anchor.png",
      },
      {
        name: "Шёлковый Ряд",
        description: "Рынки тканей и специй",
        icon: "/images/icons/silk.png",
      },
    ],
    buildings: [
      {
        name: "Таверна 'Солёный Кот'",
        image: "/images/world/cities/verdis_tavern.jpg",
      },
      {
        name: "Храм Семи Ветров",
        image: "/images/world/cities/verdis_temple.jpg",
      },
    ],
    places: ["Смотровая башня", "Сад звездочёта"],
    npcs: [
      {
        id: "npc-velka",
        name: "Велка Угольная",
        role: "Алхимик",
        portrait: "/images/chars/velka_portrait.jpg",
      },
      {
        id: "npc-morvan",
        name: "Морван Железноликий",
        role: "Капитан стражи",
        portrait: "/images/chars/morvan_portrait.jpg",
      },
    ],
    quests: ["Разобраться с контрабандой в доках", "Уладить спор гильдий"],
    news: ["Шторм разрушил часть пирса", "Поступили редкие специи с юга"],
    bigMap: "/images/world/cities/verdis_map.jpg",
  },
  {
    id: "city-solarn",
    name: "Соларн",
    flag: "/images/icons/city-flag-solarn.png",
    motto: "Город рассветов",
    panorama: "/images/world/cities/solarn_panorama.jpg",
    mapSmall: "/images/world/maps/world_thumb.jpg",
    info: {
      population: 42000,
      ruler: { name: "Совет Рассвета", portrait: "/images/icons/council.png" },
      ruleType: "Теократия",
      mainResource: "Зерно, стекло",
      mainReligion: "Орден Сияющего Рассвета",
    },
    history:
      "Основан паломниками, пережил нашествия степняков. Сегодня — центр паломничества и ремёсел.",
    description:
      "Светлые улицы, площади с фонтанами, витражи храмов переливаются цветами рассвета.",
    districts: [
      {
        name: "Зерновые Поля",
        description: "Амбары и рынки",
        icon: "/images/icons/grain.png",
      },
      {
        name: "Стекольный Квартал",
        description: "Мастерские стеклоделов",
        icon: "/images/icons/glass.png",
      },
    ],
    buildings: [
      {
        name: "Великий Собор",
        image: "/images/world/cities/solarn_cathedral.jpg",
      },
      { name: "Ратуша", image: "/images/world/cities/solarn_hall.jpg" },
    ],
    places: ["Сад рассветов", "Базар паломников"],
    npcs: [
      {
        id: "pc-auren",
        name: "Аурен Златоклинок",
        role: "Паладин",
        portrait: "/images/chars/auren_portrait.jpg",
      },
      {
        id: "pc-lyria",
        name: "Лирия Тенепеснь",
        role: "Бард",
        portrait: "/images/chars/lyria_portrait.jpg",
      },
    ],
    quests: ["Помочь с исчезновением реликвии", "Разоблачить лжепророка"],
    news: ["Чудесное знамение на рассвете", "Стекольщики объявили ярмарку"],
    bigMap: "/images/world/cities/solarn_map.jpg",
  },
];

export default cities;
