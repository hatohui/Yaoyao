import { FoodData } from "../../scripts/food";

export const featuredData: FoodData = {
  key: "Featured",
  items: [
    {
      name: "Braised Stuffed Bean Curd",
      description:
        "Soft tofu stuffed with minced meat, braised in savory golden sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e688204f3ccac1bc5f631c/attachments/68e68826b126493664759f3c/download/page1_img2.png",
      translations: {
        vi: {
          name: "Đậu hũ nhồi thịt kho vàng",
          description:
            "Đậu hũ mềm nhồi thịt băm, om trong nước sốt vàng thơm đậm đà.",
        },
        th: {
          name: "เต้าหู้ยัดไส้ตุ๋นซอสทอง",
          description: "เต้าหู้เนื้อนุ่มยัดไส้หมูสับ ตุ๋นในซอสทองรสเข้มข้น",
        },
        zh: {
          name: "高州黄金卜",
          description: "豆腐夹肉，慢炖至金黄入味，香浓可口。",
        },
      },
      variants: [
        { label: "6 pcs", price: 28, currency: "RM" },
        { label: "10 pcs", price: 46, currency: "RM" },
      ],
    },
    {
      name: "Braised Fried Pork Belly with Yam",
      description:
        "Crispy fried pork belly layered with yam and braised till tender.",
      imageUrl:
        "https://trello.com/1/cards/68e688204f3ccac1bc5f631c/attachments/68e68824e1e301296659b38b/download/page1_img1.png",
      translations: {
        vi: {
          name: "Thịt ba chỉ kho khoai môn",
          description:
            "Thịt ba chỉ chiên giòn kho cùng khoai môn mềm thơm vị quê nhà.",
        },
        th: {
          name: "หมูสามชั้นตุ๋นเผือก",
          description: "หมูสามชั้นทอดกรอบแล้วตุ๋นกับเผือก หอมหวานกลมกล่อม",
        },
        zh: { name: "家乡扣肉", description: "炸五花肉配芋头同炖，软糯香浓。" },
      },
      variants: [
        { label: "4 pairs", price: 32, currency: "RM" },
        { label: "8 pairs", price: 64, currency: "RM" },
      ],
    },
    {
      name: "Homemade Salted Chicken",
      description: "Traditional salted chicken steamed to juicy perfection.",
      imageUrl:
        "https://trello.com/1/cards/68e688204f3ccac1bc5f631c/attachments/68e6882ab7bfad18ecde07b1/download/page2_img2.png",
      translations: {
        vi: {
          name: "Gà muối quê nhà",
          description:
            "Gà muối đậm vị, hấp chín giữ nguyên hương thơm tự nhiên.",
        },
        th: {
          name: "ไก่เค็มโฮมเมด",
          description: "ไก่หมักเกลือสูตรบ้านๆ นึ่งให้เนื้อนุ่มชุ่มฉ่ำ",
        },
        zh: { name: "家乡咸鸡", description: "家传咸鸡，肉质鲜嫩，咸香可口。" },
      },
      variants: [
        { label: "half", price: 45, currency: "RM" },
        { label: "whole", price: 90, currency: "RM" },
      ],
    },
    {
      name: "Braised Stuffed Bitter Gourd",
      description:
        "Bitter gourd stuffed with minced meat, braised until soft and flavorful.",
      imageUrl:
        "https://trello.com/1/cards/68e688204f3ccac1bc5f631c/attachments/68e6882807d031c944e3a5c7/download/page2_img1.png",
      translations: {
        vi: {
          name: "Khổ qua nhồi thịt kho",
          description: "Khổ qua nhồi thịt băm, om mềm trong nước tương đậm đà.",
        },
        th: {
          name: "มะระยัดไส้ตุ๋น",
          description: "มะระยัดไส้หมูสับตุ๋นในซอสรสเข้ม",
        },
        zh: {
          name: "高州酿苦瓜",
          description: "苦瓜酿肉，入口回甘，汤汁鲜香。",
        },
      },
      variants: [
        { label: "4 pcs", price: 28, currency: "RM" },
        { label: "6 pcs", price: 42, currency: "RM" },
      ],
    },
  ],
};
