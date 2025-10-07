export const sharkFinAbaloneData: FoodData = {
  key: "Shark Fin & Abalone",
  items: [
    {
      name: "Buddha Jumps Over the Wall",
      translations: {
        vi: { name: "Phật Nhảy Tường" },
        th: { name: "พระกระโดดกำแพง" },
        zh: { name: "盅仔佛跳墙" },
      },
      variants: [{ price: 88, currency: "RM" }],
    },
    {
      name: "Braised Shark Fin with Crab Meat",
      translations: {
        vi: { name: "Vi cá mập hầm thịt cua" },
        th: { name: "ครีบฉลามตุ๋นเนื้อปู" },
        zh: { name: "蟹皇翅" },
      },
      variants: [
        { label: "1 pax", price: 32, currency: "RM" },
        { label: "5 pax", price: 108, currency: "RM" },
        { label: "10 pax", price: 198, currency: "RM" },
      ],
    },
    {
      name: "Braised Shark Fin with Superior Broth",
      translations: {
        vi: { name: "Vi cá mập hầm với nước dùng thượng hạng" },
        th: { name: "ครีบฉลามตุ๋นน้ำซุปชั้นดี" },
        zh: { name: "上汤炖鲍翅" },
      },
      variants: [{ price: 68, currency: "RM" }],
    },
    {
      name: "Braised Baby Abalone with Mushrooms & Broccoli",
      translations: {
        vi: { name: "Bào ngư hầm nấm đông cô và bông cải xanh" },
        th: { name: "เป๋าฮือตุ๋นเห็ดหอมและบร็อคโคลี" },
        zh: { name: "鲍鱼冬菇西兰花" },
      },
      variants: [
        { label: "S", price: 118, currency: "RM" },
        { label: "L", price: 188, currency: "RM" },
      ],
    },
    {
      name: "Braised Sea Cucumber, Fish Maw & Mushrooms",
      translations: {
        vi: { name: "Hải sâm, bong bóng cá và nấm đông cô hầm" },
        th: { name: "ปลิงทะเล กระเพาะปลา และเห็ดหอมตุ๋น" },
        zh: { name: "冬菇鱼鳔海参" },
      },
      variants: [
        { label: "S", price: 118, currency: "RM" },
        { label: "L", price: 188, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Egg with Shark Fin & Crab Meat",
      translations: {
        vi: { name: "Trứng chiên xào vi cá mập và thịt cua" },
        th: { name: "ไข่ผัดครีบฉลามและเนื้อปู" },
        zh: { name: "桂花翅" },
      },
      variants: [
        { label: "S", price: 40, currency: "RM" },
        { label: "L", price: 78, currency: "RM" },
      ],
    },
  ],
};

import { FoodData } from "../parsed_foods";
