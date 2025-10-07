import { FoodData } from "../parsed_foods";

export const soupData: FoodData = {
  key: "Soup",
  items: [
    {
      name: "Pickles with Bean Curd Soup",
      translations: {
        vi: { name: "Canh đậu phụ dưa muối" },
        th: { name: "ซุปเต้าหู้กับผักดอง" },
        zh: { name: "咸菜豆腐汤" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Hot Pepper Pig Stomach Soup",
      translations: {
        vi: { name: "Canh bao tử heo tiêu đen" },
        th: { name: "ซุปกระเพาะหมูพริกไทยดำ" },
        zh: { name: "胡椒猪肚汤" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 55, currency: "RM" },
      ],
    },
    {
      name: "Tomato Egg Soup",
      translations: {
        vi: { name: "Canh trứng cà chua" },
        th: { name: "ซุปไข่มะเขือเทศ" },
        zh: { name: "番茄蛋花汤" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Bitter Gourd Soup",
      translations: {
        vi: { name: "Canh khổ qua" },
        th: { name: "ซุปมะระ" },
        zh: { name: "苦瓜汤" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Seaweed Soup",
      translations: {
        vi: { name: "Canh rong biển" },
        th: { name: "ซุปสาหร่ายทะเล" },
        zh: { name: "紫菜汤" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Double Boiled Soup",
      translations: {
        vi: { name: "Canh tiềm hầm" },
        th: { name: "ซุปตุ๋นสองครั้ง" },
        zh: { name: "炖汤" },
      },
      variants: [{ price: 14, currency: "RM" }],
    },
  ],
};
