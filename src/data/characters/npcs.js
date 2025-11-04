export const npcs = [
  {
    id: "npc-velka",
    name: "Велка Угольная",
    role: "Мастер гильдии алхимиков",
    banner: "/images/chars/velka_hero.jpg",
    symbol: "/images/icons/alchemy.png",
    quote: "Не бывает неудачных опытов — лишь неожиданные открытия.",
    appearance:
      "Невысокая, в замазанном халате, на поясе пузырьки, на лице ожоговые отметины.",
    biography:
      "Сирота из доков Вердиса, поднялась благодаря таланту. Руководит гильдией и тёмными контрактами.",
    personality: "Прагматичная, язвительная, уважает ум и дисциплину.",
    achievements: [
      "Открыла зелие Быстрой Ковки",
      "Разорвала монополию торгового дома Ругеров",
    ],
    campaignMoments: ["Ночной поджог склада", "Сделка с Обществом Вуали"],
    stats: { str: 8, dex: 12, con: 10, int: 17, wis: 13, cha: 14 },
    equipment: [
      { name: "Алхимический набор", icon: "/images/icons/alchemy.png" },
      { name: "Взрывные колбы", icon: "/images/icons/bomb.png" },
    ],
    relations: [
      {
        id: "pc-lyria",
        label: "покровитель",
        portrait: "/images/chars/lyria_portrait.jpg",
      },
    ],
    factions: [
      {
        id: "f-veil-society",
        name: "Общество Вуали",
        icon: "/images/icons/faction-veil.png",
      },
    ],
    gallery: ["/images/chars/velka_1.jpg"],
  },
  {
    id: "npc-morvan",
    name: "Морван Железноликий",
    role: "Капитан городской стражи",
    banner: "/images/chars/morvan_hero.jpg",
    symbol: "/images/icons/guard.png",
    quote: "Закон — доспех города.",
    appearance: "Шрам на щеке, козырёк шлема опущен, тяжёлый плащ стражи.",
    biography: "Вырос в нищете, прошёл войну, теперь очищает улицы от банд.",
    personality: "Жёсткий, но справедливый. Подозрителен к магам.",
    achievements: ["Сломил банду Ночных Волков", "Организовал патруль каналов"],
    campaignMoments: ["Облава в трущобах", "Стычка на рынке"],
    stats: { str: 15, dex: 11, con: 14, int: 10, wis: 12, cha: 13 },
    equipment: [
      { name: "Алебарда стражи", icon: "/images/icons/halberd.png" },
      { name: "Наручи порядка", icon: "/images/icons/bracers.png" },
    ],
    relations: [
      {
        id: "pc-auren",
        label: "соперник",
        portrait: "/images/chars/auren_portrait.jpg",
      },
    ],
    factions: [
      {
        id: "f-city-guard",
        name: "Городская стража",
        icon: "/images/icons/guard.png",
      },
    ],
    gallery: ["/images/chars/morvan_1.jpg"],
  },
];

export default npcs;
