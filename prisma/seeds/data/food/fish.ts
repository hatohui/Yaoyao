import { FoodData } from "../parsed_foods";

export const fishData: FoodData = {
  key: "Fish",
  items: [
    {
      name: "Deep Fried Threadfin (Tilapia / Grouper / Grass Carp)",
      translations: {
        vi: { name: "Cá chỉ vàng chiên giòn (Cá rô phi / Cá mú / Cá trắm)" },
        th: { name: "ปลากระพงเหลืองทอดกรอบ (ปลานิล / ปลากะรัง / ปลาคาร์พ)" },
        zh: { name: "油浸马友鱼（金凤鱼/石斑鱼/鲩鱼）" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Homemade Braised Threadfin with Pickles (Tilapia / Grouper / Grass Carp)",
      translations: {
        vi: {
          name: "Cá chỉ vàng hầm dưa chua kiểu nhà làm (Cá rô phi / Cá mú / Cá trắm)",
        },
        th: {
          name: "ปลากระพงเหลืองตุ๋นผักดองสไตล์บ้านๆ (ปลานิล / ปลากะรัง / ปลาคาร์พ)",
        },
        zh: { name: "家乡咸菜焖马友鱼（金凤鱼/石斑鱼/鲩鱼）" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Grass Carp with Ginger Paste (Tilapia / Grouper Meat)",
      translations: {
        vi: { name: "Cá trắm hấp gừng (Cá rô phi / Thịt cá mú)" },
        th: { name: "ปลาคาร์พนึ่งซอสขิง (ปลานิล / เนื้อปลากะรัง)" },
        zh: { name: "姜蓉蒸鲩鱼（金凤鱼/石斑肉）" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Curry Garoupa Fish Head",
      translations: {
        vi: { name: "Đầu cá mú nấu cà ri" },
        th: { name: "หัวปลากะรังแกงกะหรี่" },
        zh: { name: "咖喱龙虎斑鱼头" },
      },
      variants: [{ price: 68, currency: "RM" }],
    },
    {
      name: "Stir-Fried Fish Skin with Salted Egg",
      translations: {
        vi: { name: "Da cá chiên trứng muối" },
        th: { name: "หนังปลาทอดไข่เค็ม" },
        zh: { name: "咸蛋鱼皮" },
      },
      variants: [{ price: 28, currency: "RM" }],
    },
    {
      name: "Sweet & Sour Garoupa",
      translations: {
        vi: { name: "Cá mú chua ngọt" },
        th: { name: "ปลากะรังเปรี้ยวหวาน" },
        zh: { name: "五柳石斑" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Garoupa Meat with Soy Sauce",
      translations: {
        vi: { name: "Thịt cá mú hấp xì dầu" },
        th: { name: "เนื้อปลากะรังนึ่งซีอิ๊ว" },
        zh: { name: "清蒸石斑肉" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Stir-Fried Garoupa with Butter & Egg Floss",
      translations: {
        vi: { name: "Cá mú chiên bơ và trứng sợi" },
        th: { name: "ปลากะรังผัดเนยและไข่ฝอย" },
        zh: { name: "奶油石斑片" },
      },
      variants: [
        { label: "S", price: 50, currency: "RM" },
        { label: "L", price: 75, currency: "RM" },
      ],
    },
    {
      name: "Garoupa with Curry Sauce",
      translations: {
        vi: { name: "Cá mú sốt cà ri" },
        th: { name: "ปลากะรังซอสแกงกะหรี่" },
        zh: { name: "香辣石斑片" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Garoupa with Ginger & Spring Onion",
      translations: {
        vi: { name: "Cá mú xào gừng hành" },
        th: { name: "ปลากะรังผัดขิงและต้นหอม" },
        zh: { name: "姜葱石斑片" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Sweet & Sour Garoupa",
      translations: {
        vi: { name: "Cá mú chua ngọt" },
        th: { name: "ปลากะรังเปรี้ยวหวาน" },
        zh: { name: "甜酸石斑片" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Steamed Coral Trout with Soy Sauce",
      translations: {
        vi: { name: "Cá mú san hô hấp xì dầu" },
        th: { name: "ปลากะรังปะการังนึ่งซีอิ๊ว" },
        zh: { name: "清蒸七星斑" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Marble Goby with Soy Sauce",
      translations: {
        vi: { name: "Cá song hấp xì dầu" },
        th: { name: "ปลาหินนึ่งซีอิ๊ว" },
        zh: { name: "清蒸笋壳" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Pomfret 'Chao Zhou' Style",
      translations: {
        vi: { name: "Cá chim hấp kiểu Triều Châu" },
        th: { name: "ปลาปอมเฟรตนึ่งสไตล์แต้จิ๋ว" },
        zh: { name: "潮州蒸斗鲳" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Cod Fish with Soy Sauce",
      translations: {
        vi: { name: "Cá tuyết hấp xì dầu" },
        th: { name: "ปลาค็อดนึ่งซีอิ๊ว" },
        zh: { name: "清蒸银鳕鱼" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Red Snapper with Soy Sauce",
      translations: {
        vi: { name: "Cá hồng hấp xì dầu" },
        th: { name: "ปลาสแนปเปอร์แดงนึ่งซีอิ๊ว" },
        zh: { name: "清蒸红枣鱼" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Tilapia with Curry Sauce",
      translations: {
        vi: { name: "Cá rô phi sốt cà ri" },
        th: { name: "ปลานิลซอสแกงกะหรี่" },
        zh: { name: "香辣金凤鱼" },
      },
      variants: [{ isSeasonal: true }],
    },
  ],
};
