export const dungeons = [
  {
    id: "dun-black-keep",
    name: "Чёрный Замок",
    headerImage: "/assets/images/world/dungeons/black_keep_entrance.jpg",
    danger: 4, // 1-5
    map: "/assets/images/world/dungeons/black_keep_map.jpg",
    history:
      "Построен некромантом Эрсином. После падения хозяина превратился в логово теней.",
    description: "Холодные залы, эхо шагов. Факелы гаснут сами собой.",
    keyRooms: [
      { num: 3, name: "Зал Эха", desc: "Усиление шёпота до оглушения" },
      {
        num: 7,
        name: "Костяная библиотека",
        desc: "Книги из костяных пластин",
      },
    ],
    inhabitants: [
      { name: "Теневой рыцарь", icon: "/assets/images/icons/skull.png" },
      { name: "Призрачные слуги", icon: "/assets/images/icons/ghost.png" },
    ],
    treasures: ["Клинок Полуночи", "Печать Эрсина"],
    traps: ["Безмолвные руны", "Ловушки-иллюзии"],
    runsHistory: [
      "Осада и героическая оборона ворот",
      "Побег по подземной реке",
    ],
  },
  {
    id: "dun-emerald-depths",
    name: "Изумрудные Глубины",
    headerImage: "/assets/images/world/dungeons/emerald_depths_entrance.jpg",
    danger: 3,
    map: "/assets/images/world/dungeons/emerald_depths_map.jpg",
    history:
      "Древние шахты друидов, оставленные после Великого Зеленого Исхода.",
    description: "Влажные стены, светящиеся мхи, журчание подземных потоков.",
    keyRooms: [
      { num: 2, name: "Зал Корней", desc: "Корни удерживают своды" },
      { num: 8, name: "Грот Песен", desc: "Стены поют от ветра" },
    ],
    inhabitants: [
      { name: "Мшистые тролли", icon: "/assets/images/icons/troll.png" },
      { name: "Пещерные нимфы", icon: "/assets/images/icons/nymph.png" },
    ],
    treasures: ["Друидский жезл", "Кристаллы эха"],
    traps: ["Корневые петли", "Спящие споры"],
    runsHistory: ["Переговоры с нимфами", "Обвал и спасение каравана"],
  },
];

export default dungeons;
