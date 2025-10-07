import { FoodData } from "../parsed_foods";

export const dessertData: FoodData = {
  key: "Dessert",
  items: [
    {
      name: "Red Bean Soup",
      translations: {
        vi: { name: "Chè đậu đỏ" },
        th: { name: "ซุปถั่วแดง" },
        zh: { name: "香滑红豆沙" },
      },
      variants: [{ label: "5 pax", price: 25, currency: "RM" }],
    },
    {
      name: "Crispy Chinese Pancake",
      translations: {
        vi: { name: "Bánh kếp Trung Hoa giòn" },
        th: { name: "แพนเค้กจีนกรอบ" },
        zh: { name: "酥皮莲蓉锅饼" },
      },
      variants: [{ price: 14.8, currency: "RM" }],
    },
    {
      name: "Chinese Herbs Jelly",
      translations: {
        vi: { name: "Thạch thảo mộc Trung Hoa" },
        th: { name: "วุ้นสมุนไพรจีน" },
        zh: { name: "龟苓膏" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Peach Jelly",
      translations: {
        vi: { name: "Thạch đào tuyết nhĩ" },
        th: { name: "เยลลี่พีชตุ๋นหูไม้ขาว" },
        zh: { name: "桃胶炖雪耳" },
      },
      variants: [{ price: 15.9, currency: "RM" }],
    },
    {
      name: "Longan & Sea Coconut with Grass Jelly",
      translations: {
        vi: { name: "Nhãn nhục và dừa biển với thạch cỏ" },
        th: { name: "ลำไยและมะพร้าวทะเลกับเยลลี่หญ้า" },
        zh: { name: "龙眼海底椰凉粉" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Mango Pudding",
      translations: {
        vi: { name: "Pudding xoài" },
        th: { name: "พุดดิ้งมะม่วง" },
        zh: { name: "芒果布丁" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Longan with Jelly",
      translations: {
        vi: { name: "Nhãn nhục với thạch" },
        th: { name: "ลำไยกับเยลลี่" },
        zh: { name: "龙眼果冻" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Papaya with Snow Fungus",
      translations: {
        vi: { name: "Đu đủ hầm tuyết nhĩ" },
        th: { name: "มะละกอกับหูไม้ขาว" },
        zh: { name: "木瓜炖雪耳" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Snow Fungus with Soya",
      translations: {
        vi: { name: "Tuyết nhĩ với sữa đậu nành" },
        th: { name: "หูไม้ขาวกับนมถั่วเหลือง" },
        zh: { name: "雪耳鲜豆浆" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
  ],
};
