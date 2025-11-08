export const cities = [
  {
    id: "city-font",
    name: "Фонт",
    motto: "Город мастеров и торговцев",
    flag: "/images/world/cities/font_flag.png",
    panorama: "/images/world/cities/font_panorama.jpg",
    mapSmall: "/images/world/cities/font_map_small.jpg",
    bigMap: "/images/world/cities/font_map_big.jpg",
    info: {
      population: 8500,
      ruler: {
        name: "Дарион Эйсон",
        portrait: "/images/characters/npcs/darion_eyson.jpg",
      },
      ruleType: "Мэр",
      mainResource: "Ремесло и торговля",
      mainReligion: "Пантеон богов",
    },
    history:
      "Фонт — оживлённый торговый город, известный своими мастерами и ремесленниками. Город процветает благодаря умелым кузнецам, портным и другим мастерам, которые создают качественные товары. Мэр Дарион Эйсон управляет городом с мудростью и справедливостью, поддерживая процветание и порядок.",
    buildings: [
      {
        name: "Ратуша",
        image: "/images/world/cities/font_townhall.jpg",
      },
      {
        name: "Таверна \"Гоблинский Пунш\"",
        image: "/images/world/cities/font_tavern_goblin_punch.jpg",
      },
      {
        name: "Таверна \"Сырный маг\"",
        image: "/images/world/cities/font_tavern_cheese_mage.jpg",
      },
      {
        name: "Таверна \"Три топора\"",
        image: "/images/world/cities/font_tavern_three_axes.jpg",
      },
      {
        name: "Кузня Эстелара Витретина",
        image: "/images/world/cities/font_forge_vitretin.jpg",
      },
      {
        name: "Ателье Бринья",
        image: "/images/world/cities/font_atelier_brinya.jpg",
      },
    ],
    places: [
      "Центральная площадь",
      "Рыночная площадь",
      "Район ремесленников",
      "Жилой квартал",
      "Городские ворота",
    ],
    npcs: [
      {
        id: "npc-darion-eyson",
        name: "Дарион Эйсон",
        role: "Мэр города Фонт",
        portrait: "/images/characters/npcs/darion_eyson.jpg",
      },
      {
        id: "npc-estelar-vitretin",
        name: "Эстелар Витретин",
        role: "Эльф-кузнец",
        portrait: "/images/characters/npcs/estelar_vitretin.jpg",
      },
      {
        id: "npc-stefania",
        name: "Стефания",
        role: "Жена Дезмала Эйсона",
        portrait: "/images/characters/npcs/stefania.jpg",
      },
    ],
    quests: [],
    news: [],
  },
];

export default cities;
