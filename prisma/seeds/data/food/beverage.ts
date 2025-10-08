import { FoodData } from "../parsed_foods";

export const beverageData: FoodData = {
  key: "Beverages",
  items: [
    {
      name: "Tie Guan Yin",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c264ba64f610788e0034/download/image.png",
      description: "A popular Chinese oolong tea with a floral aroma.",
      translations: {
        vi: {
          name: "Trà Thiết Quan Âm",
          description: "Một loại trà ô long Trung Quốc phổ biến với hương hoa.",
        },
        th: {
          name: "ชาเถี่ยกวนอิม",
          description: "ชาอู่หลงจีนยอดนิยมที่มีกลิ่นหอมของดอกไม้",
        },
        zh: {
          name: "铁观音",
          description: "一种受欢迎的中国乌龙茶，具有花香。",
        },
      },
      variants: [{ label: "Per person", price: 2.5, currency: "RM" }],
    },
    {
      name: "Xiang Pian",
      description: "Xiang Pian has a light and pleasant floral aroma.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c29323da93445a7b5193/download/image.png",
      translations: {
        vi: {
          name: "Trà Hương Phiến (Hoa Nhài)",
          description:
            "Trà Hương Phiến (Hoa Nhài) có hương thơm nhẹ nhàng, dễ chịu.",
        },
        th: {
          name: "ชาเซียงเปี้ยน",
          description: "ชาเซียงเปี้ยนมีกลิ่นหอมของดอกมะลิ",
        },
        zh: { name: "香片", description: "香片散发着淡淡的茉莉花香。" },
      },
      variants: [{ label: "Per person", price: 2.5, currency: "RM" }],
    },
    {
      name: "Ju Bao",
      description: "Ju Bao has a light and pleasant floral aroma.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c2cd53697f31e6633f93/download/image.png",
      translations: {
        vi: {
          name: "Trà Cúc Bảo",
          description: "Trà Cúc Bảo có hương thơm nhẹ nhàng, dễ chịu.",
        },
        th: { name: "ชาจูเป่า", description: "ชาจูเป่ามีกลิ่นหอมของดอกมะลิ" },
        zh: { name: "菊宝", description: "菊宝散发着淡淡的茉莉花香。" },
      },
      variants: [{ label: "Per person", price: 2.5, currency: "RM" }],
    },
    {
      name: "Cha Wang",
      description: "Cha Wang has a strong and robust flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c30c7e0f81ca254df3a8/download/image.png",
      translations: {
        vi: {
          name: "Trà Vương",
          description: "Trà Vương có hương vị đậm đà, mạnh mẽ.",
        },
        th: { name: "ชาอ๋อง", description: "ชาอ๋องมีกลิ่นหอมของดอกไม้" },
        zh: { name: "茶王", description: "茶王散发着浓郁的花香。" },
      },
      variants: [{ label: "Per person", price: 3.5, currency: "RM" }],
    },
    {
      name: "Pu Er",
      description: "Pu Er tea has a unique and rich flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c343a06f9c22622909b3/download/image.png",
      translations: {
        vi: {
          name: "Trà Phổ Nhĩ",
          description: "Trà Phổ Nhĩ có hương vị đặc trưng, đậm đà.",
        },
        th: {
          name: "ชาผู่เอ๋อร์",
          description: "ชาผู่เอ๋อร์มีกลิ่นหอมเฉพาะตัว",
        },
        zh: { name: "普洱", description: "普洱茶具有独特的浓郁香气。" },
      },
      variants: [{ label: "Per person", price: 3.0, currency: "RM" }],
    },
    {
      name: "Green Tea",
      description: "Green tea has a light and refreshing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c359dbc38a7893ef58b4/download/image.png",
      translations: {
        vi: {
          name: "Trà xanh",
          description: "Trà xanh có hương vị thanh mát, dễ chịu.",
        },
        th: { name: "ชาเขียว", description: "ชาเขียวมีกลิ่นหอมสดชื่น" },
        zh: { name: "绿茶", description: "绿茶具有清新的香气。" },
      },
      variants: [{ label: "Per person", price: 3.0, currency: "RM" }],
    },
    {
      name: "Chrysanthemum + Wolfberry",
      description:
        "Chrysanthemum with wolfberry has a light and pleasant floral aroma.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c37d23b83e1d3e105781/download/image.png",
      translations: {
        vi: {
          name: "Trà Cúc kèm Kỷ tử",
          description: "Trà Cúc kèm Kỷ tử có hương vị nhẹ nhàng, dễ chịu.",
        },
        th: {
          name: "ชาดอกเก๊กฮวยกับเก๋ากี้",
          description: "ชาดอกเก๊กฮวยกับเก๋ากี้มีกลิ่นหอมสดชื่น",
        },
        zh: { name: "菊花杞子", description: "菊花杞子散发着清新的香气。" },
      },
      variants: [{ label: "Per person", price: 3.5, currency: "RM" }],
    },
    {
      name: "Herbal Tea",
      description: "Herbal tea has a pleasant and soothing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c3a13c3985b84f267365/download/image.png",
      translations: {
        vi: {
          name: "Trà thảo mộc",
          description: "Trà thảo mộc có hương vị thơm ngon, dễ chịu.",
        },
        th: {
          name: "ชาสมุนไพร",
          description: "ชาสมุนไพรมีคุณสมบัติช่วยบำรุงร่างกาย",
        },
        zh: { name: "凉茶", description: "凉茶具有清热解毒的功效。" },
      },
      variants: [{ price: 4.9, currency: "RM" }],
    },
    {
      name: "Honey",
      description: "Honey has a natural sweet taste and fragrant aroma.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c3e5bc83d124d1dd54a0/download/image.png",
      translations: {
        vi: {
          name: "Mật ong",
          description: "Mật ong có vị ngọt tự nhiên, thơm ngon.",
        },
        th: { name: "น้ำผึ้ง", description: "น้ำผึ้งมีรสชาติหวานธรรมชาติ" },
        zh: { name: "蜜糖", description: "蜜糖具有天然的甜味，香气扑鼻。" },
      },
      variants: [{ price: 4.9, currency: "RM" }],
    },
    {
      name: "Chrysanthemum Tea",
      description: "Chrysanthemum tea has a light and pleasant floral aroma.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c3fe29c648a6dd61f061/download/image.png",
      translations: {
        vi: {
          name: "Trà hoa cúc",
          description: "Trà hoa cúc có hương thơm nhẹ nhàng, dễ chịu.",
        },
        th: {
          name: "ชาดอกเก๊กฮวย",
          description: "ชาดอกเก๊กฮวยมีกลิ่นหอมของดอกไม้",
        },
        zh: { name: "菊花茶", description: "菊花茶散发着浓郁的花香。" },
      },
      variants: [{ price: 4.9, currency: "RM" }],
    },
    {
      name: "Longan",
      description: "Longan has a sweet and fragrant flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c435b18816336be2f367/download/image.png",
      translations: {
        vi: {
          name: "Nước nhãn",
          description: "Nước nhãn có vị ngọt thanh, thơm ngon.",
        },
        th: { name: "น้ำลำไย", description: "น้ำลำไยมีรสชาติหวานหอม" },
        zh: { name: "龙眼", description: "龙眼具有甜美的香气。" },
      },
      variants: [{ price: 6.9, currency: "RM" }],
    },
    {
      name: "Soya",
      description: "Soya is a nutritious drink.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c44f8bd1d21a2a0b2634/download/image.png",
      translations: {
        vi: {
          name: "Sữa đậu nành",
          description: "Sữa đậu nành giàu dinh dưỡng.",
        },
        th: {
          name: "นมถั่วเหลือง",
          description: "นมถั่วเหลืองมีคุณค่าทางโภชนาการสูง",
        },
        zh: { name: "豆浆", description: "豆浆富含营养。" },
      },
      variants: [{ price: 5.9, currency: "RM" }],
    },
    {
      name: "Soya Cincau",
      description: "Soya with cincau is a refreshing drink.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c47701f77e431fa01223/download/image.png",
      translations: {
        vi: {
          name: "Sữa đậu nành với thạch cỏ",
          description: "Sữa đậu nành với thạch cỏ mát lạnh.",
        },
        th: {
          name: "นมถั่วเหลืองกับเฉาก๊วย",
          description: "นมถั่วเหลืองกับเฉาก๊วยมีรสชาติหวานมัน",
        },
        zh: { name: "豆浆凉粉", description: "豆浆凉粉清凉可口。" },
      },
      variants: [{ price: 6.9, currency: "RM" }],
    },
    {
      name: "Lemon Honey",
      description: "Lemon honey has a sweet and tangy flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c491729d2c007c2e1a07/download/image.png",
      translations: {
        vi: {
          name: "Chanh mật ong",
          description: "Chanh mật ong có vị chua ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำผึ้งมะนาว",
          description: "น้ำผึ้งมะนาวมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "柠檬蜜糖", description: "柠檬蜜糖具有酸甜的味道。" },
      },
      variants: [{ price: 6.9, currency: "RM" }],
    },
    {
      name: "Lemon Juice",
      description: "Lemon juice has a tangy and refreshing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c4ae9c41be0f2bb468e2/download/image.png",
      translations: {
        vi: {
          name: "Nước chanh",
          description: "Nước chanh có vị chua, thơm ngon.",
        },
        th: { name: "น้ำมะนาว", description: "น้ำมะนาวมีรสชาติเปรี้ยวสดชื่น" },
        zh: { name: "柠檬汁", description: "柠檬汁具有清新的酸味。" },
      },
      variants: [{ price: 6.9, currency: "RM" }],
    },
    {
      name: "Lime with Honey",
      description: "Lime with honey has a sweet and tangy flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c4d4aeda74f41914221f/download/image.png",
      translations: {
        vi: {
          name: "Tắc mật ong",
          description: "Tắc mật ong có vị chua ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำมะนาวผสมน้ำผึ้ง",
          description: "น้ำมะนาวผสมน้ำผึ้งมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "金桔蜜糖", description: "金桔蜜糖具有酸甜的味道。" },
      },
      variants: [{ price: 6.9, currency: "RM" }],
    },
    {
      name: "100 Plus",
      description:
        "100 Plus is a popular isotonic drink that helps replenish electrolytes.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c4ee5622d9839c38a685/download/image.png",
      translations: {
        vi: {
          name: "Nước tăng lực 100 Plus",
          description: "Nước tăng lực 100 Plus giúp tăng cường năng lượng.",
        },
        th: {
          name: "เครื่องดื่ม 100 พลัส",
          description: "เครื่องดื่ม 100 พลัสช่วยเพิ่มพลังงาน",
        },
        zh: {
          name: "一百号",
          description: "一百号帮助增强能量。",
        },
      },
      variants: [{ price: 4.9, currency: "RM" }],
    },
    {
      name: "Coke",
      description: "Coke has a sweet and refreshing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c50cc14613d9f70b1e2f/download/image.png",
      translations: {
        vi: {
          name: "Coca-Cola",
          description: "Coca-Cola có vị ngọt, sảng khoái.",
        },
        th: { name: "โค้ก", description: "โค้กมีรสชาติหวานและสดชื่น" },
        zh: { name: "可乐", description: "可乐具有甜美的口感。" },
      },
      variants: [{ price: 4.9, currency: "RM" }],
    },
    {
      name: "Lime with Plum",
      description: "Lime with plum has a sweet and tangy flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c52af7f644b607a95752/download/image.png",
      translations: {
        vi: {
          name: "Tắc muối mận",
          description: "Tắc muối mận có vị chua ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำมะนาวบ๊วย",
          description: "น้ำมะนาวบ๊วยมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "桔子酸梅", description: "桔子酸梅具有酸甜的味道。" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Orange Juice",
      description: "Orange juice has a sweet and refreshing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c54e568b7cf6b3d105ec/download/image.png",
      translations: {
        vi: {
          name: "Nước cam tươi",
          description: "Nước cam tươi có vị ngọt, thơm ngon.",
        },
        th: { name: "น้ำส้มสด", description: "น้ำส้มสดมีรสชาติหวานอมเปรี้ยว" },
        zh: { name: "鲜橙汁", description: "鲜橙汁具有清新的橙香。" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Apple Juice",
      description: "Apple juice has a sweet and refreshing flavor.",
      imageUrl:
        "https://trello.com/1/cards/68e68c4e6fcd1f244adbbbb0/attachments/68e6c57ac954e2dd99b2cf85/download/image.png",
      translations: {
        vi: {
          name: "Nước táo tươi",
          description: "Nước táo tươi có vị ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำแอปเปิ้ลสด",
          description: "น้ำแอปเปิ้ลสดมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "鲜苹果汁", description: "鲜苹果汁具有清新的苹果香。" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Carrot Juice",
      description: "Carrot juice has a sweet and refreshing flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Nước cà rốt tươi",
          description: "Nước cà rốt tươi có vị ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำแครอทสด",
          description: "น้ำแครอทสดมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "鲜萝卜汁", description: "鲜萝卜汁具有清新的萝卜香。" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Pineapple Juice",
      description: "Pineapple juice has a sweet and tangy flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Nước dứa tươi",
          description: "Nước dứa tươi có vị ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำสับปะรดสด",
          description: "น้ำสับปะรดสดมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "鲜凤梨汁", description: "鲜凤梨汁具有清新的凤梨香。" },
      },
      variants: [{ price: 8.9, currency: "RM" }],
    },
    {
      name: "Bitter Gourd with Pineapple Juice",
      description:
        "Bitter gourd with pineapple juice has a unique and refreshing flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Nước khổ qua và dứa",
          description: "Nước khổ qua và dứa có vị ngọt, thơm ngon.",
        },
        th: {
          name: "น้ำมะระกับสับปะรด",
          description: "น้ำมะระกับสับปะรดมีรสชาติหวานอมเปรี้ยว",
        },
        zh: { name: "凤梨苦瓜汁", description: "凤梨苦瓜汁具有清新的凤梨香。" },
      },
      variants: [{ price: 10.9, currency: "RM" }],
    },
    {
      name: "Chinese Tea",
      description: "Chinese tea has a fragrant and delicious flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Trà Trung Hoa",
          description: "Trà Trung Hoa có hương vị thơm ngon.",
        },
        th: { name: "ชาจีน", description: "ชาจีนมีรสชาติกลมกล่อม" },
        zh: { name: "六堡茶", description: "六堡茶具有独特的香气。" },
      },
      variants: [{ price: 1.5, currency: "RM" }],
    },
    {
      name: "Filtered Water with Sliced Lemon",
      description:
        "Filtered water with sliced lemon has a refreshing lemon aroma.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Nước lọc với lát chanh",
          description: "Nước lọc với lát chanh thơm ngon.",
        },
        th: {
          name: "น้ำกรองใส่มะนาวฝาน",
          description: "น้ำกรองใส่มะนาวฝานมีรสชาติสดชื่น",
        },
        zh: {
          name: "过濾水加柠檬片",
          description: "过濾水加柠檬片具有清新的柠檬香。",
        },
      },
      variants: [{ price: 1.0, currency: "RM" }],
    },
    {
      name: "Beer (Tiger / Carlsberg)",
      description:
        "Beer (Tiger / Carlsberg) has a smooth and refreshing flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Bia (Tiger / Carlsberg)",
          description: "Bia (Tiger / Carlsberg) có hương vị thơm ngon.",
        },
        th: {
          name: "เบียร์ (ไทเกอร์ / คาร์ลสเบิร์ก)",
          description: "เบียร์ (ไทเกอร์ / คาร์ลสเบิร์ก) มีรสชาติกลมกล่อม",
        },
        zh: {
          name: "啤酒（虎牌/嘉士伯）",
          description: "啤酒（虎牌/嘉士伯）具有独特的香气。",
        },
      },
      variants: [{ price: 11.9, currency: "RM" }],
    },
    {
      name: "Beer (Heineken)",
      description: "Beer (Heineken) has a smooth and refreshing flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Bia Heineken",
          description: "Bia Heineken có hương vị thơm ngon.",
        },
        th: {
          name: "เบียร์ไฮเนเก้น",
          description: "เบียร์ไฮเนเก้นมีรสชาติกลมกล่อม",
        },
        zh: {
          name: "啤酒（喜力）",
          description: "啤酒（喜力）具有独特的香气。",
        },
      },
      variants: [{ price: 15.9, currency: "RM" }],
    },
    {
      name: "Beer (Guinness)",
      description: "Beer (Guinness) has a rich and creamy flavor.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Bia Guinness",
          description: "Bia Guinness có hương vị thơm ngon.",
        },
        th: {
          name: "เบียร์กินเนสส์",
          description: "เบียร์กินเนสส์มีรสชาติกลมกล่อม",
        },
        zh: {
          name: "啤酒（健力士）",
          description: "啤酒（健力士）具有独特的香气。",
        },
      },
      variants: [{ price: 13.9, currency: "RM" }],
    },
    {
      name: "Mineral Water",
      description: "Mineral water has a refreshing taste.",
      imageUrl: "",
      translations: {
        vi: {
          name: "Nước khoáng",
          description: "Nước khoáng có vị thanh mát.",
        },
        th: {
          name: "น้ำแร่",
          description: "น้ำแร่มีรสชาติสดชื่น",
        },
        zh: {
          name: "矿泉水",
          description: "矿泉水具有清新的口感。",
        },
      },
      variants: [
        { label: "500ml", price: 3.5, currency: "RM" },
        { label: "1.5L", price: 6.0, currency: "RM" },
      ],
    },
    // {
    //   name: "Corkage Charges",
    //   description: "Corkage charges for bringing outside wine.",
    //   imageUrl: "",
    //   translations: {
    //     vi: {
    //       name: "Phí mở rượu",
    //       description: "Phí mở rượu cho rượu vang mang từ bên ngoài vào",
    //     },
    //     th: {
    //       name: "ค่าบริการเปิดขวด",
    //       description: "ค่าบริการเปิดขวดสำหรับไวน์ที่นำเข้าจากภายนอก",
    //     },
    //     zh: {
    //       name: "开瓶费",
    //       description: "外带葡萄酒的开瓶费",
    //     },
    //   },
    //   variants: [
    //     {
    //       label: "Liquor",
    //       price: 20.0,
    //       currency: "RM",
    //     },
    //     {
    //       label: "Wine",
    //       price: 10.0,
    //       currency: "RM",
    //     },
    //   ],
    // },
  ],
};
