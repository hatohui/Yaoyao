import { FoodData } from "../parsed_foods";

export const soupData: FoodData = {
  key: "Soup",
  items: [
    {
      name: "Pickles with Bean Curd Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d4dfc45aba22fdc03fc/download/page27_img2.png",
      description: "Homemade pickles with bean curd soup.",
      translations: {
        vi: {
          name: "Canh đậu phụ dưa muối",
          description: "Canh đậu phụ với dưa muối tự làm.",
        },
        th: {
          name: "ซุปเต้าหู้กับผักดอง",
          description: "ซุปเต้าหู้กับผักดองโฮมเมด",
        },
        zh: {
          name: "咸菜豆腐汤",
          description: "自制咸菜豆腐汤。",
        },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Hot Pepper Pig Stomach Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d4e27382d56716f6307/download/page27_img3.png",
      description: "Peppery soup with tender pig stomach slices.",
      translations: {
        vi: {
          name: "Canh bao tử heo tiêu đen",
          description: "Canh bao tử heo với tiêu đen.",
        },
        th: {
          name: "ซุปกระเพาะหมูพริกไทยดำ",
          description: "ซุปกระเพาะหมูที่มีพริกไทยดำ.",
        },
        zh: { name: "胡椒猪肚汤", description: "胡椒猪肚汤。" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 55, currency: "RM" },
      ],
    },
    {
      name: "Tomato Egg Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d5129efdd00ae445470/download/page27_img4.png",
      description: "Egg soup with tomatoes.",
      translations: {
        vi: {
          name: "Canh trứng cà chua",
          description: "Canh trứng với cà chua.",
        },
        th: { name: "ซุปไข่มะเขือเทศ", description: "ซุปไข่กับมะเขือเทศ." },
        zh: { name: "番茄蛋花汤", description: "番茄蛋花汤。" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Bitter Gourd Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d4b2117ca50ab1cf16e/download/page27_img1.png",
      description: "Bitter gourd soup.",
      translations: {
        vi: { name: "Canh khổ qua", description: "Canh khổ qua." },
        th: { name: "ซุปมะระ", description: "ซุปมะระ." },
        zh: { name: "苦瓜汤", description: "苦瓜汤。" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Seaweed Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d5272ab2b7a4771775e/download/page27_img5.png",
      description: "Seaweed soup.",
      translations: {
        vi: { name: "Canh rong biển", description: "Canh rong biển." },
        th: { name: "ซุปสาหร่ายทะเล", description: "ซุปสาหร่ายทะเล." },
        zh: { name: "紫菜汤", description: "紫菜汤。" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Double Boiled Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68c423b1790b2d18ce922/attachments/68e68d536bce8c9f7f6321c2/download/page27_img6.png",
      description: "Double boiled soup.",
      translations: {
        vi: { name: "Canh tiềm hầm", description: "Canh tiềm hầm." },
        th: { name: "ซุปตุ๋นสองครั้ง", description: "ซุปตุ๋นสองครั้ง." },
        zh: { name: "炖汤", description: "炖汤。" },
      },
      variants: [{ price: 14, currency: "RM" }],
    },
  ],
};
