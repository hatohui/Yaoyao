export const squidData: FoodData = {
  key: "Squid",
  items: [
    {
      name: "Fried Squid",
      translations: {
        vi: { name: "Mực chiên giòn" },
        th: { name: "ปลาหมึกทอด" },
        zh: { name: "炸苏东" },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
    {
      name: "Fried Squid with Garlic",
      translations: {
        vi: { name: "Mực chiên tỏi" },
        th: { name: "ปลาหมึกทอดกระเทียม" },
        zh: { name: "蒜香苏东" },
      },
      variants: [
        { label: "S", price: 38, currency: "RM" },
        { label: "L", price: 58, currency: "RM" },
      ],
    },
    {
      name: "Assam Squid",
      translations: {
        vi: { name: "Mực nấu me (Assam)" },
        th: { name: "ปลาหมึกอาซัม" },
        zh: { name: "亚参苏东" },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Squid with Creamy Butter Salted Egg",
      translations: {
        vi: { name: "Mực xào trứng muối bơ sữa" },
        th: { name: "ปลาหมึกผัดไข่เค็มครีมบัตเตอร์" },
        zh: { name: "咸蛋湿奶油苏东" },
      },
      variants: [
        { label: "S", price: 38, currency: "RM" },
        { label: "L", price: 58, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Squid 'Gong-Bo' Style",
      translations: {
        vi: { name: "Mực xào kiểu Cung Bảo (Gong-Bo)" },
        th: { name: "ปลาหมึกผัดสไตล์กงเปา" },
        zh: { name: "宫保苏东" },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
  ],
};

import { FoodData } from "../parsed_foods";
