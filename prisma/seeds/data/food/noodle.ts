import { FoodData } from "../../scripts/food";

export const noodleData: FoodData = {
  key: "Noodles",
  items: [
    {
      name: "Fried Flat Rice Noodle / 'Huang Di' Noodle Cantonese Style",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d60c790819f819aad27/download/page29_img3.png",
      description:
        "Stir-fried flat rice noodle or 'Huang Di' noodle with egg, bean sprouts, chives, and your choice of chicken, beef, seafood, or vegetable.",
      translations: {
        vi: {
          name: "Phở xào / Mì Hoàng Đế kiểu Quảng Đông",
          description: "Phở xào / Mì Hoàng Đế kiểu Quảng Đông.",
        },
        th: {
          name: "ก๋วยเตี๋ยวเส้นใหญ่หรือบะหมี่ฮวางตี้แบบกวางตุ้ง",
          description: "ก๋วยเตี๋ยวเส้นใหญ่หรือบะหมี่ฮวางตี้แบบกวางตุ้ง",
        },
        zh: { name: "滑蛋河粉/皇帝面", description: "滑蛋河粉/皇帝面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Braised Noodles with Fresh Water Prawn, Ginger & Spring Onion (Cantonese Style)",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d6406ac502324e08458/download/page29_img6.png",
      description:
        "Braised noodles with fresh water prawn, ginger & spring onion (Cantonese style).",
      translations: {
        vi: {
          name: "Mì tôm sông xào gừng và hành lá kiểu Quảng Đông",
          description: "Mì tôm sông xào gừng và hành lá kiểu Quảng Đông",
        },
        th: {
          name: "บะหมี่กุ้งน้ำจืดผัดขิงและต้นหอมแบบกวางตุ้ง",
          description: "บะหมี่กุ้งน้ำจืดผัดขิงและต้นหอมแบบกวางตุ้ง",
        },
        zh: {
          name: "姜葱生虾面",
          description: "姜葱生虾面",
        },
      },
      variants: [{ label: "per portion", price: 72, currency: "RM" }],
    },
    {
      name: "HK Noodle with Sliced Mushrooms, Shredded Pork & Crab Stick",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d5f2c1b067f9d95af02/download/page29_img2.png",
      description:
        "Hong Kong style noodle with sliced mushrooms, shredded pork & crab stick.",
      translations: {
        vi: {
          name: "Mì Hong Kong với nấm, thịt heo xé và thanh cua",
          description: "Mì Hong Kong với nấm, thịt heo xé và thanh cua",
        },
        th: {
          name: "บะหมี่ฮ่องกงกับเห็ด หมูเส้น และปูอัด",
          description: "บะหมี่ฮ่องกงกับเห็ด หมูเส้น และปูอัด",
        },
        zh: { name: "三丝干烧港伊面", description: "三丝干烧港伊面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Fried 'Huang Di' Noodle",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d5e148fc5866502e097/download/page29_img1.png",
      description: "Fried 'Huang Di' noodle.",
      translations: {
        vi: { name: "Mì Hoàng Đế xào", description: "Mì Hoàng Đế xào" },
        th: { name: "บะหมี่ฮวางตี้ผัด", description: "บะหมี่ฮวางตี้ผัด" },
        zh: { name: "干炒皇帝面", description: "干炒皇帝面" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Fried Glass Noodle",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d62614c9ec58d43890a/download/page29_img5.png",
      description: "Fried glass noodle.",
      translations: {
        vi: { name: "Miến xào", description: "Miến xào" },
        th: { name: "วุ้นเส้นผัด", description: "วุ้นเส้นผัด" },
        zh: { name: "炒冬粉", description: "炒冬粉" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
    {
      name: "Seafood Fried Rice Noodle",
      imageUrl:
        "https://trello.com/1/cards/68e68c45abe043aace9189a3/attachments/68e68d61544693b4e9dd0012/download/page29_img4.png",
      description: "Seafood fried rice noodle.",
      translations: {
        vi: { name: "Bún gạo xào hải sản", description: "Bún gạo xào hải sản" },
        th: { name: "เส้นข้าวผัดซีฟู้ด", description: "เส้นข้าวผัดซีฟู้ด" },
        zh: { name: "海鲜炒米粉", description: "海鲜炒米粉" },
      },
      variants: [{ price: 18.9, currency: "RM" }],
    },
    {
      name: "Singapore Fried Noodle",
      imageUrl:
        "https://trello.com/1/cards/68f3821abfff4483eace1a88/attachments/68f81491198993d51bae602d/download/Hato01.png",
      description: "Singapore fried noodle.",
      translations: {
        vi: { name: "Mì xào Singapore", description: "Mì xào Singapore" },
        th: { name: "บะหมี่ผัดสิงคโปร์", description: "บะหมี่ผัดสิงคโปร์" },
        zh: { name: "星洲炒米粉", description: "星洲炒米粉" },
      },
      variants: [{ price: 16.9, currency: "RM" }],
    },
  ],
};
