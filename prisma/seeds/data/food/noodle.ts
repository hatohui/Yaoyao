import { FoodData } from "../parsed_foods";

export const noodleData: FoodData = {
  key: "Noodles",
  items: [
    {
      name: "Fried Flat Rice Noodle / 'Huang Di' Noodle Cantonese Style",
      translations: {
        vi: { name: "Phở xào / Mì Hoàng Đế kiểu Quảng Đông" },
        th: { name: "ก๋วยเตี๋ยวเส้นใหญ่หรือบะหมี่ฮวางตี้แบบกวางตุ้ง" },
        zh: { name: "滑蛋河粉/皇帝面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Braised Noodles with Fresh Water Prawn, Ginger & Spring Onion (Cantonese Style)",
      translations: {
        vi: { name: "Mì tôm sông xào gừng và hành lá kiểu Quảng Đông" },
        th: { name: "บะหมี่กุ้งน้ำจืดผัดขิงและต้นหอมแบบกวางตุ้ง" },
        zh: { name: "姜葱生虾面" },
      },
      variants: [{ label: "per portion", price: 72, currency: "RM" }],
    },
    {
      name: "HK Noodle with Sliced Mushrooms, Shredded Pork & Crab Stick",
      translations: {
        vi: { name: "Mì Hong Kong với nấm, thịt heo xé và thanh cua" },
        th: { name: "บะหมี่ฮ่องกงกับเห็ด หมูเส้น และปูอัด" },
        zh: { name: "三丝干烧港伊面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Fried 'Huang Di' Noodle",
      translations: {
        vi: { name: "Mì Hoàng Đế xào" },
        th: { name: "บะหมี่ฮวางตี้ผัด" },
        zh: { name: "干炒皇帝面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Fried Glass Noodle",
      translations: {
        vi: { name: "Miến xào" },
        th: { name: "วุ้นเส้นผัด" },
        zh: { name: "炒冬粉" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Seafood Fried Rice Noodle",
      translations: {
        vi: { name: "Bún gạo xào hải sản" },
        th: { name: "เส้นข้าวผัดซีฟู้ด" },
        zh: { name: "海鲜炒米粉" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
  ],
};
