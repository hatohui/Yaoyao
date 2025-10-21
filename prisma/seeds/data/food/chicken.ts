import { FoodData } from "../../scripts/food";

export const chickenData: FoodData = {
  key: "Chicken",
  items: [
    {
      name: "Black Pepper Honey Chicken",
      description: "Chicken cooked with black pepper and honey sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a84ecd6eb38cdd32c2c/download/page7_img5.png",
      translations: {
        vi: {
          name: "Gà Mật Ong Tiêu Đen",
          description: "Gà nấu với tiêu đen và sốt mật ong.",
        },
        th: {
          name: "ไก่น้ำผึ้งพริกไทยดำ",
          description: "ไก่ปรุงด้วยพริกไทยดำและซอสน้ำผึ้ง",
        },
        zh: { name: "黑椒蜜汁鸡", description: "黑椒蜜汁鸡" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Braised Salted Chicken with Ginger",
      description: "Chicken braised with salted sauce, ginger and dried chili.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a79ca36e2ceb2dbfbad/download/page7_img1.png",
      translations: {
        vi: {
          name: "Gà Kho Muối Gừng",
          description: "Gà kho với muối, gừng và ớt khô.",
        },
        th: {
          name: "ไก่เค็มตุ๋นขิง",
          description: "ไก่ตุ๋นกับซอสเค็ม ขิง และพริกแห้ง",
        },
        zh: { name: "特色醉香鸡", description: "特色醉香鸡" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 92, currency: "RM" },
      ],
    },
    {
      name: "Marmite Chicken",
      description: "Chicken cooked with Marmite sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a85fba44de04511679f/download/page7_img6.png",
      translations: {
        vi: { name: "Gà Sốt Marmite", description: "Gà nấu với sốt Marmite." },
        th: { name: "ไก่มาร์ไมต์", description: "ไก่ปรุงด้วยซอสมาร์ไมต์" },
        zh: { name: "媽蜜鸡块", description: "媽蜜鸡块" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Crispy Nam Yu Chicken Wing",
      description:
        "Deep-fried chicken wings marinated with Nam Yu (fermented red tofu) sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a7e0aa91c8c607dc85e/download/page7_img2.png",
      translations: {
        vi: {
          name: "Cánh Gà Chiên Nam Yu Giòn",
          description: "Cánh gà chiên giòn ướp sốt Nam Yu (đậu hũ lên men).",
        },
        th: {
          name: "ปีกไก่ทอดน้ำยูกรอบ",
          description: "ปีกไก่ทอดหมักซอสน้ำยู (เต้าหู้แดงหมัก)",
        },
        zh: { name: "南乳鸡翅", description: "南乳鸡翅" },
      },
      variants: [{ label: "4 pairs", price: 26, currency: "RM" }],
    },
    {
      name: "Steamed Chicken with Mushrooms & Chinese Sausage",
      description: "Chicken steamed with mushrooms and Chinese sausage.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8089427f52b39ba878/download/page7_img3.png",
      translations: {
        vi: {
          name: "Gà Hấp Lạp Xưởng & Nấm Đông Cô",
          description: "Gà hấp với lạp xưởng và nấm đông cô.",
        },
        th: {
          name: "ไก่นึ่งไส้กรอกจีนและเห็ดหอม",
          description: "ไก่นึ่งกับไส้กรอกจีนและเห็ดหอม",
        },
        zh: { name: "冬菇腊肠蒸鸡肉", description: "冬菇腊肠蒸鸡肉" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Steamed Chicken with Dry Day Lily & Fungus",
      description:
        "Chicken steamed with dry day lily and fungus in light soy sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a82e7e997c9d4c81bb4/download/page7_img4.png",
      translations: {
        vi: {
          name: "Gà Hấp Kim Châm & Mộc Nhĩ",
          description: "Gà hấp với kim châm và mộc nhĩ.",
        },
        th: {
          name: "ไก่นึ่งดอกไม้จีนและหูหนู",
          description: "ไก่นึ่งกับดอกไม้จีนและหูหนู",
        },
        zh: { name: "金针云耳蒸鸡肉", description: "金针云耳蒸鸡肉" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Chicken Drumstick with Ginger & Rice Wine",
      description: "Chicken drumstick cooked with ginger and rice wine.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8eb5b59eba7248b173/download/page8_img5.png",
      translations: {
        vi: {
          name: "Đùi Gà Sốt Gừng & Rượu Nếp",
          description: "Đùi gà nấu với gừng và rượu nếp.",
        },
        th: {
          name: "น่องไก่ขิงและเหล้าข้าว",
          description: "น่องไก่ขิงและเหล้าข้าว",
        },
        zh: { name: "煎蛋黄酒鸡腿", description: "煎蛋黄酒鸡腿" },
      },
      variants: [
        { label: "S", price: 40, currency: "RM" },
        { label: "L", price: 75, currency: "RM" },
      ],
    },
    {
      name: "Braised Chicken with Mushrooms & Young Ginger",
      description: "Chicken braised with mushrooms and young ginger.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8724dec1b67ca8572d/download/page8_img1.png",

      translations: {
        vi: {
          name: "Gà Kho Nấm & Gừng Non",
          description: "Gà kho với nấm và gừng non.",
        },
        th: {
          name: "ไก่ตุ๋นเห็ดและขิงอ่อน",
          description: "ไก่ตุ๋นเห็ดและขิงอ่อน",
        },
        zh: { name: "子姜冬菇焖鸡", description: "子姜冬菇焖鸡" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Chicken Cube 'Gong-Bo' Style",
      description:
        "Stir-fried chicken cube with peanuts in spicy 'Gong-Bo' sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8c1b37e570ee91fced/download/page8_img4.png",
      translations: {
        vi: {
          name: "Gà Xào Kiểu Cung Bảo",
          description: "Gà xào kiểu Cung Bảo",
        },
        th: { name: "ไก่ผัดกงเปา", description: "ไก่ผัดกงเปา" },
        zh: { name: "宮保鸡丁", description: "宫保鸡丁" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Salad Chicken",
      description: "Chicken served with special salad dressing.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a88a4885a5e279e5c13/download/page8_img2.png",
      translations: {
        vi: {
          name: "Gà Sốt Salad",
          description: "Gà ăn kèm với sốt salad đặc biệt.",
        },
        th: { name: "ไก่สลัด", description: "ไก่สลัด" },
        zh: { name: "沙汁鸡", description: "沙汁鸡" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
    {
      name: "Salted Egg Butter Chicken",
      description: "Chicken cooked with salted egg and butter sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8f5c1f406e59593efe/download/page8_img6.png",
      translations: {
        vi: {
          name: "Gà Sốt Trứng Muối Bơ",
          description: "Gà nấu với trứng muối và sốt bơ.",
        },
        th: { name: "ไก่ไข่เค็มเนย", description: "ไก่ไข่เค็มเนย" },
        zh: { name: "成蛋渥奶油鸡柳", description: "成蛋渥奶油鸡柳" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Sesame Chicken",
      description: "Chicken cooked with sesame sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a8b2d9df23f86055175/download/page8_img3.png",
      translations: {
        vi: { name: "Gà Sốt Mè", description: "Gà nấu với sốt mè." },
        th: { name: "ไก่งา", description: "ไก่งา" },
        zh: { name: "芝麻鸡柳", description: "芝麻鸡柳" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Steamed Village Chicken with Dry Day Lily & Fungus",
      description: "Chicken steamed with dry day lily and fungus.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a98ae08ae014362ab8d/download/page9_img5.png",
      translations: {
        vi: { name: "Gà Ta Hấp Kim Châm & Mộc Nhĩ" },
        th: { name: "ไก่บ้านนึ่งดอกไม้จีนและหูหนู" },
        zh: { name: "金针云耳蒸菜园鸡" },
      },
      variants: [
        { label: "S", price: 45, currency: "RM" },
        { label: "L", price: 90, currency: "RM" },
      ],
    },
    {
      name: "Steamed Village Chicken with Garlic Oil",
      description: "Chicken steamed with garlic oil.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a918974dcbbf025c3d8/download/page9_img1.png",
      translations: {
        vi: { name: "Gà Ta Hấp Dầu Tỏi", description: "Gà hấp với dầu tỏi." },
        th: {
          name: "ไก่บ้านนึ่งน้ำมันกระเทียม",
          description: "ไก่บ้านนึ่งน้ำมันกระเทียม",
        },
        zh: { name: "葱油菜国鸡", description: "葱油菜国鸡" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 92, currency: "RM" },
      ],
    },
    {
      name: "Steamed Village Chicken Drumstick with Shao Hsing Wine",
      description: "Chicken drumstick steamed with Shao Hsing wine.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a9a13bb49c2341d1aee/download/page9_img6.png",
      translations: {
        vi: {
          name: "Đùi Gà Ta Hấp Rượu Thiệu Hưng",
          description: "Đùi gà hấp với rượu Thiệu Hưng.",
        },
        th: {
          name: "น่องไก่บ้านนึ่งเหล้าเซ้าซิง",
          description: "น่องไก่บ้านนึ่งเหล้าเซ้าซิง",
        },
        zh: { name: "陈年花雕蒸菜园鸡腿", description: "陈年花雕蒸菜园鸡腿" },
      },
      variants: [
        { label: "S", price: 25, currency: "RM" },
        { label: "L", price: 50, currency: "RM" },
      ],
    },
    {
      name: "Steamed Village Chicken with Ginger Paste",
      description: "Chicken steamed with ginger paste.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a95ea3e393456d28779/download/page9_img3.png",
      translations: {
        vi: { name: "Gà Ta Hấp Sốt Gừng", description: "Gà hấp với sốt gừng." },
        th: { name: "ไก่บ้านนึ่งขิงบด", description: "ไก่บ้านนึ่งขิงบด" },
        zh: { name: "姜蓉蒸菜国鸡", description: "姜蓉蒸菜国鸡" },
      },
      variants: [
        { label: "S", price: 45, currency: "RM" },
        { label: "L", price: 90, currency: "RM" },
      ],
    },
    {
      name: "Steamed Village Chicken with Chinese Herbs",
      description: "Chicken steamed with Chinese herbs.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a944d90bf6dea43c342/download/page9_img2.png",
      translations: {
        vi: {
          name: "Gà Ta Hấp Thảo Mộc Trung Hoa",
          description: "Gà hấp với thảo mộc Trung Hoa.",
        },
        th: {
          name: "ไก่บ้านนึ่งสมุนไพรจีน",
          description: "ไก่บ้านนึ่งสมุนไพรจีน",
        },
        zh: { name: "当归枸杞蒸菜园鸡", description: "当归枸杞蒸菜园鸡" },
      },
      variants: [
        { label: "S", price: 45, currency: "RM" },
        { label: "L", price: 90, currency: "RM" },
      ],
    },
    {
      name: "Village Chicken with Ginger & Rice Wine",
      description: "Village chicken cooked with ginger and rice wine.",
      imageUrl:
        "https://trello.com/1/cards/68e689984246e26f3c66eaa4/attachments/68e68a97a1b8a030bf226074/download/page9_img4.png",
      translations: {
        vi: {
          name: "Gà Ta Nấu Rượu Gừng",
          description: "Gà nấu với gừng và rượu nếp.",
        },
        th: { name: "ไก่บ้านเหล้าขิง", description: "ไก่บ้านเหล้าขิง" },
        zh: { name: "黄酒菜园鸡", description: "黄酒菜园鸡" },
      },
      variants: [
        { label: "S", price: 60, currency: "RM" },
        { label: "L", price: 110, currency: "RM" },
      ],
    },
  ],
};
