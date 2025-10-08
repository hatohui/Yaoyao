export const squidData: FoodData = {
  key: "Squid",
  items: [
    {
      name: "Fried Squid",
      description: "Crispy fried squid.",
      imageUrl:
        "https://trello.com/1/cards/68e68b373a2a72c68f4739e0/attachments/68e68b50e7c6c9d8fd5c2992/download/page15_img3.png",
      translations: {
        vi: {
          name: "Mực chiên giòn",
          description: "Mực chiên giòn.",
        },
        th: {
          name: "ปลาหมึกทอด",
          description: "ปลาหมึกทอดกรอบ.",
        },
        zh: { name: "炸苏东", description: "炸苏东." },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
    {
      name: "Fried Squid with Garlic",
      description: "Crispy fried squid with garlic.",
      imageUrl:
        "https://trello.com/1/cards/68e68b373a2a72c68f4739e0/attachments/68e68b511f804f1535ec4b08/download/page15_img4.png",
      translations: {
        vi: { name: "Mực chiên tỏi", description: "Mực chiên giòn với tỏi." },
        th: {
          name: "ปลาหมึกทอดกระเทียม",
          description: "ปลาหมึกทอดกรอบกับกระเทียม.",
        },
        zh: { name: "蒜香苏东", description: "蒜香炸苏东." },
      },
      variants: [
        { label: "S", price: 38, currency: "RM" },
        { label: "L", price: 58, currency: "RM" },
      ],
    },
    {
      name: "Assam Squid",
      description: "Stir-fried squid in tangy assam sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e68b373a2a72c68f4739e0/attachments/68e68b4ed716eb23bc2b6f8d/download/page15_img2.png",
      translations: {
        vi: {
          name: "Mực nấu me (Assam)",
          description: "Mực xào với sốt me chua.",
        },
        th: { name: "ปลาหมึกอาซัม", description: "ปลาหมึกผัดซอสอาซัม." },
        zh: { name: "亚参苏东", description: "亚参炒苏东." },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Squid with Creamy Butter Salted Egg",
      description: "Squid stir-fried with creamy butter salted egg sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e68b373a2a72c68f4739e0/attachments/68e68b4be1ff371a913b9d0e/download/page15_img5.png",
      translations: {
        vi: {
          name: "Mực xào trứng muối bơ sữa",
          description: "Mực xào với sốt trứng muối bơ sữa.",
        },
        th: {
          name: "ปลาหมึกผัดไข่เค็มครีมบัตเตอร์",
          description: "ปลาหมึกผัดกับซอสไข่เค็มครีมบัตเตอร์.",
        },
        zh: { name: "咸蛋湿奶油苏东", description: "咸蛋奶油炒苏东." },
      },
      variants: [
        { label: "S", price: 38, currency: "RM" },
        { label: "L", price: 58, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Squid 'Gong-Bo' Style",
      description: "Spicy stir-fried squid with dried chili.",
      imageUrl:
        "https://trello.com/1/cards/68e68b373a2a72c68f4739e0/attachments/68e68b4d7caeef264c199d5b/download/page15_img1.png",
      translations: {
        vi: {
          name: "Mực xào kiểu Cung Bảo (Gong-Bo)",
          description: "Mực xào cay với ớt khô.",
        },
        th: {
          name: "ปลาหมึกผัดสไตล์กงเปา",
          description: "ปลาหมึกผัดเผ็ดกับพริกแห้ง.",
        },
        zh: { name: "宫保苏东", description: "宫保炒苏东." },
      },
      variants: [
        { label: "S", price: 35, currency: "RM" },
        { label: "L", price: 53, currency: "RM" },
      ],
    },
  ],
};

import { FoodData } from "../parsed_foods";
