import { FoodData } from "../parsed_foods";

export const featuredData: FoodData = {
  key: "Featured",
  items: [
    {
      name: "Braised Stuffed Bean Curd",
      description:
        "Soft tofu stuffed with minced meat, braised in savory golden sauce.",
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
    {
      name: "Braised Pig Offal",
      description: "Assorted pork offal braised in aromatic soy sauce.",
      translations: {
        vi: {
          name: "Lòng heo kho nước tương",
          description:
            "Các phần nội tạng heo được kho mềm với nước tương thơm lừng.",
        },
        th: {
          name: "เครื่องในหมูตุ๋นซีอิ๊ว",
          description: "เครื่องในหมูตุ๋นในซอสซีอิ๊วหอมกลิ่นเครื่องเทศ",
        },
        zh: { name: "卤猪杂", description: "多种猪杂卤制入味，香而不腥。" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 44, currency: "RM" },
      ],
    },
    {
      name: "Crispy Nam Yu Pork",
      description: "Crispy pork belly marinated with red fermented bean curd.",
      translations: {
        vi: {
          name: "Thịt heo chiên sốt Nam Dư",
          description:
            "Ba chỉ heo chiên giòn tẩm sốt Nam Dư đỏ, hương vị mặn ngọt đặc trưng.",
        },
        th: {
          name: "หมูกรอบซอสน้ำหมักถั่วแดง",
          description: "หมูกรอบหมักซอสน้ำหมักถั่วแดง รสเข้มกลิ่นหอม",
        },
        zh: { name: "脆香南乳肉", description: "南乳炸肉外脆里嫩，咸香浓郁。" },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 52, currency: "RM" },
      ],
    },
    {
      name: "Boiled Pork Belly",
      description: "Tender boiled pork belly served with ginger-scallion dip.",
      translations: {
        vi: {
          name: "Thịt ba chỉ luộc",
          description:
            "Thịt ba chỉ luộc mềm, ăn kèm nước chấm gừng hành thơm ngon.",
        },
        th: {
          name: "หมูสามชั้นต้ม",
          description: "หมูสามชั้นต้มเสิร์ฟกับน้ำจิ้มขิงและต้นหอม",
        },
        zh: {
          name: "白切猪肉",
          description: "白灼五花肉，配姜葱酱，清香爽口。",
        },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Pork with Ginger & Spring Onion",
      description:
        "Tender pork slices stir-fried with ginger and spring onion.",
      translations: {
        vi: {
          name: "Thịt heo xào gừng hành",
          description: "Thịt heo xào thơm cùng gừng và hành lá tươi.",
        },
        th: {
          name: "หมูผัดขิงและต้นหอม",
          description: "เนื้อหมูผัดกับขิงและต้นหอม กลิ่นหอมสดใหม่",
        },
        zh: { name: "姜葱炒柳梅", description: "姜葱爆炒猪柳，鲜香入味。" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Pork Belly with Red Wine Residion Sauce",
      description:
        "Pork belly braised with rich red wine residue sauce for a deep aroma.",
      translations: {
        vi: {
          name: "Thịt ba chỉ kho rượu đỏ",
          description:
            "Ba chỉ heo om với nước rượu đỏ, hương vị đậm đà quyến rũ.",
        },
        th: {
          name: "หมูสามชั้นซอสราดไวน์แดง",
          description: "หมูสามชั้นตุ๋นในซอสกากไวน์แดง หอมเข้มกลมกล่อม",
        },
        zh: {
          name: "醉酒红谷肉",
          description: "红曲酒糟焖五花肉，香气扑鼻，色泽红亮。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 48, currency: "RM" },
      ],
    },
    {
      name: "Braised Spare Ribs with Bean Paste",
      description: "Tender spare ribs braised in savory bean paste sauce.",
      translations: {
        vi: {
          name: "Sườn heo kho tương",
          description: "Sườn heo om mềm trong nước tương đậm đà vị đậu.",
        },
        th: {
          name: "ซี่โครงหมูตุ๋นซอสเต้าเจี้ยว",
          description: "ซี่โครงหมูตุ๋นในซอสเต้าเจี้ยวรสเข้ม",
        },
        zh: {
          name: "豆瓣酱焖排骨",
          description: "豆瓣酱焖排骨，酱香浓郁，肉质入味。",
        },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
  ],
};
