import { FoodData } from "../parsed_foods";

export const riceData: FoodData = {
  key: "Rice",
  items: [
    {
      name: "Salted Fish & Chicken Fried Rice",
      translations: {
        vi: { name: "Cơm chiên cá mặn và gà" },
        th: { name: "ข้าวผัดปลาร้าและไก่" },
        zh: { name: "咸鱼鸡粒炒饭" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Long Bean, Char Siew & Anchovy Fried Rice",
      translations: {
        vi: { name: "Cơm chiên đậu đũa, xá xíu và cá cơm" },
        th: { name: "ข้าวผัดถั่วฝักยาว หมูแดง และปลาแอนโชวี่" },
        zh: { name: "叉烧豆角银丝炒饭" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "'Yang Zhou' Fried Rice",
      translations: {
        vi: { name: "Cơm chiên Dương Châu" },
        th: { name: "ข้าวผัดหยางโจว" },
        zh: { name: "扬州炒饭" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Vegetables Fried Rice",
      translations: {
        vi: { name: "Cơm chiên rau củ" },
        th: { name: "ข้าวผัดผัก" },
        zh: { name: "翡翠炒饭" },
      },
      variants: [{ price: 15.9, currency: "RM" }],
    },
    {
      name: "Pineapple Seafood Fried Rice",
      translations: {
        vi: { name: "Cơm chiên dứa hải sản" },
        th: { name: "ข้าวผัดสับปะรดทะเล" },
        zh: { name: "菠萝海鲜炒饭" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
    {
      name: "Spicy Petai Fried Rice",
      translations: {
        vi: { name: "Cơm chiên đậu hũ Petai cay" },
        th: { name: "ข้าวผัดสะตอเผ็ด" },
        zh: { name: "臭豆虾仁炒饭" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
  ],
};
