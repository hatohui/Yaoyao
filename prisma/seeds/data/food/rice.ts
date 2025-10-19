import { FoodData } from "../parsed_foods";

export const riceData: FoodData = {
  key: "Rice",
  items: [
    {
      name: "Salted Fish & Chicken Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d6640529cc0bd4fc3d0/download/page30_img1.png",
      description: "Salted fish & chicken fried rice.",
      translations: {
        vi: {
          name: "Cơm chiên cá mặn và gà",
          description: "Cơm chiên cá mặn và gà",
        },
        th: { name: "ข้าวผัดปลาร้าและไก่", description: "ข้าวผัดปลาร้าและไก่" },
        zh: { name: "咸鱼鸡粒炒饭", description: "咸鱼鸡粒炒饭" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Long Bean, Char Siew & Anchovy Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d6d9ecee3bebcd09d9b/download/page30_img6.png",
      description: "Long bean, char siew & anchovy fried rice.",
      translations: {
        vi: {
          name: "Cơm chiên đậu đũa, xá xíu và cá cơm",
          description: "Cơm chiên đậu đũa, xá xíu và cá cơm",
        },
        th: {
          name: "ข้าวผัดถั่วฝักยาว หมูแดง และปลาแอนโชวี่",
          description: "ข้าวผัดถั่วฝักยาว หมูแดง และปลาแอนโชวี่",
        },
        zh: {
          name: "叉烧豆角银丝炒饭",
          description: "叉烧豆角银丝炒饭",
        },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "'Yang Zhou' Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d67dfa3427f39b713be/download/page30_img2.png",
      description: "'Yang Zhou' fried rice.",
      translations: {
        vi: {
          name: "Cơm chiên Dương Châu",
          description: "Cơm chiên Dương Châu",
        },
        th: { name: "ข้าวผัดหยางโจว", description: "ข้าวผัดหยางโจว" },
        zh: { name: "扬州炒饭", description: "扬州炒饭" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Vegetables Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d6ac4eadecfb468366d/download/page30_img4.png",
      description: "Vegetables fried rice.",
      translations: {
        vi: { name: "Cơm chiên rau củ", description: "Cơm chiên rau củ" },
        th: { name: "ข้าวผัดผัก", description: "ข้าวผัดผัก" },
        zh: { name: "翡翠炒饭", description: "翡翠炒饭" },
      },
      variants: [{ price: 15.9, currency: "RM" }],
    },
    {
      name: "Pineapple Seafood Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d6901694c6a29e6af8d/download/page30_img3.png",
      description: "Pineapple seafood fried rice.",
      translations: {
        vi: {
          name: "Cơm chiên dứa hải sản",
          description: "Cơm chiên dứa hải sản",
        },
        th: { name: "ข้าวผัดสับปะรดทะเล", description: "ข้าวผัดสับปะรดทะเล" },
        zh: { name: "菠萝海鲜炒饭", description: "菠萝海鲜炒饭" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
    {
      name: "Spicy Petai Fried Rice",
      imageUrl:
        "https://trello.com/1/cards/68e68c4746a0f7c72bcd343b/attachments/68e68d6b550b686b8a7e7fc5/download/page30_img5.png",
      description: "Spicy Petai fried rice.",
      translations: {
        vi: {
          name: "Cơm chiên đậu hũ Petai cay",
          description: "Cơm chiên đậu hũ Petai cay",
        },
        th: { name: "ข้าวผัดสะตอเผ็ด", description: "ข้าวผัดสะตอเผ็ด" },
        zh: { name: "臭豆虾仁炒饭", description: "臭豆虾仁炒饭" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
    {
      name: "White rice",
      imageUrl: "",
      description: "Steamed white rice.",
      translations: {
        vi: { name: "Cơm trắng", description: "Cơm trắng" },
        th: { name: "ข้าวสวย", description: "ข้าวสวย" },
        zh: { name: "白饭", description: "白饭" },
      },
      variants: [
        { label: "SMALL", price: 1, currency: "RM" },
        { label: "LARGE", price: 2, currency: "RM" },
      ],
    },
  ],
};
