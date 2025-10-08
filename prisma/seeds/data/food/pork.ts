import { FoodData } from "../parsed_foods";

export const porkData: FoodData = {
  key: "Pork",
  items: [
    {
      name: "Braised Pig Offal",
      description: "Assorted pork offal braised in aromatic soy sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6898e60d7e6a519bf9440/download/page3_img3.png",
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
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6898a6e0f15724eed6530/download/page3_img1.png",
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
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6898c8142b61a24686cc8/download/page3_img2.png",
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
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68993bc0b8d9e804f3c35/download/page3_img6.png",
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
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e689913fbde26b71b6fe6b/download/page3_img5.png",
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
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6899014516750504ca9ce/download/page3_img4.png",
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
    {
      name: "Braised Nam Yu Pork with Black Fungus",
      description:
        "Pork belly braised with red fermented bean curd and black fungus.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6899afc21687df5f4b29d/download/page4_img3.png",
      translations: {
        vi: {
          name: "Thịt heo kho Nam Yu với mộc nhĩ",
          description: "Ba chỉ heo om với Nam Yu và mộc nhĩ.",
        },
        th: {
          name: "หมูตุ๋นเต้าเจี้ยวแดงกับเห็ดหูหนูดำ",
          description: "หมูสามชั้นตุ๋นในซอสเต้าเจี้ยวแดงกับเห็ดหูหนูดำ",
        },
        zh: {
          name: "南乳五香焖炸肉",
          description: "南乳黑木耳焖五花肉，香浓入味。",
        },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 52, currency: "RM" },
      ],
    },
    {
      name: "Spare Ribs with Special Sauce",
      description:
        "Crispy fried spare ribs tossed in our signature special sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6899899a2416fb2c408c6/download/page4_img2.png",
      translations: {
        vi: {
          name: "Sườn heo sốt đặc biệt",
          description: "Sườn heo chiên giòn sốt đặc biệt.",
        },
        th: {
          name: "ซี่โครงหมูซอสพิเศษ",
          description: "ซี่โครงหมูทอดกรอบราดซอสพิเศษ",
        },
        zh: {
          name: "招牌长骨",
          description: "招牌炸排骨，外脆内嫩，香气四溢。",
        },
      },
      variants: [{ label: "4 pcs", price: 48, currency: "RM" }],
    },
    {
      name: "Stir-Fried Pork Belly with Salted Fish in Claypot",
      description: "Stir-fried pork belly with salted fish in a claypot.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e689a4351585fcc8aaa69f/download/page4_img5.png",
      translations: {
        vi: {
          name: "Ba rọi xào cá mặn trong nồi đất",
          description: "Ba rọi xào với cá mặn trong nồi đất.",
        },
        th: {
          name: "หมูสามชั้นผัดปลาเค็มในหม้อดิน",
          description: "หมูสามชั้นผัดกับปลาเค็มในหม้อดิน",
        },
        zh: {
          name: "成鱼花腩煲",
          description: "咸鱼花腩煲，香气扑鼻，滋味浓郁。",
        },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Pork Ribs with Marmite Sauce",
      description: "Pork ribs stir-fried in savory Marmite sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68995ca36e2ceb2d951d1/download/page4_img1.png",
      translations: {
        vi: {
          name: "Sườn heo sốt Marmite",
          description: "Sườn heo chiên giòn sốt Marmite.",
        },
        th: {
          name: "ซี่โครงหมูซอสมาร์ไมต์",
          description: "ซี่โครงหมูทอดกรอบราดซอสมาร์ไมต์",
        },
        zh: { name: "妈蜜排骨", description: "妈蜜排骨，外脆内嫩，香气四溢。" },
      },
      variants: [
        { label: "S", price: 36, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
    {
      name: "Fried Nam Yu Pork Ribs",
      description: "Crispy pork ribs marinated with red fermented bean curd.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6896d8acfe59762dfe172/download/page4_img6.png",
      translations: {
        vi: {
          name: "Sườn heo chiên Nam Yu",
          description: "Sườn heo chiên với đậu phụ lên men đỏ.",
        },
        th: {
          name: "ซี่โครงหมูทอดเต้าเจี้ยวแดง",
          description: "ซี่โครงหมูทอดกับเต้าเจี้ยวแดง.",
        },
        zh: {
          name: "南乳加厚骨",
          description: "南乳加厚骨，外脆内嫩，香气四溢。",
        },
      },
      variants: [{ price: 40, currency: "RM" }],
    },
    {
      name: "Braised Pork + Bun",
      description: "Braised pork belly served with steamed buns.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6899b82f3cf4c176ae009/download/page4_img4.png",
      translations: {
        vi: {
          name: "Thịt heo kho + bánh bao",
          description: "Thịt ba chỉ kho ăn kèm bánh bao hấp.",
        },
        th: {
          name: "หมูพะโล้เสิร์ฟกับหมั่นโถว",
          description: "หมูพะโล้เสิร์ฟพร้อมหมั่นโถว",
        },
        zh: {
          name: "红烧猪肉+馒头",
          description: "红烧猪肉配馒头，鲜香可口。",
        },
      },
      variants: [{ price: 45, currency: "RM" }],
    },
    {
      name: "Stir-Fried Tender Pork Hong Kong Style",
      description: "Tender pork slices stir-fried Hong Kong style.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6897962823df7b4a58186/download/page5_img4.png",
      translations: {
        vi: {
          name: "Thịt heo mềm xào kiểu Hồng Kông",
          description: "Thịt heo mềm xào kiểu Hồng Kông",
        },
        th: {
          name: "หมูนุ่มผัดสไตล์ฮ่องกง",
          description: "หมูนุ่มผัดสไตล์ฮ่องกง",
        },
        zh: { name: "港式肉根", description: "港式肉根" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Pig Intestine with Pineapple",
      description: "Stir-fried pig intestine with pineapple.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6897400b4930b70a848a8/download/page5_img2.png",
      translations: {
        vi: { name: "Lòng heo xào dứa", description: "Lòng heo xào dứa" },
        th: { name: "ไส้หมูผัดสับปะรด", description: "ไส้หมูผัดสับปะรด" },
        zh: { name: "黄梨大肠", description: "黄梨大肠" },
      },
      variants: [
        { label: "S", price: 25, currency: "RM" },
        { label: "L", price: 48, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Pork Belly Grandpa Style",
      description: "Stir-fried pork belly with unique grandpa style sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68976971a509233fad477/download/page5_img3.png",
      translations: {
        vi: {
          name: "Ba rọi xào kiểu ông nội",
          description: "Ba rọi xào kiểu ông nội",
        },
        th: {
          name: "หมูสามชั้นผัดสไตล์คุณปู่",
          description: "หมูสามชั้นผัดสไตล์คุณปู่",
        },
        zh: { name: "公公炒猪肉", description: "公公炒猪肉" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Steamed Minced Pork with Preserved Vegetables",
      description: "Steamed minced pork with preserved vegetables.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68972b771ff7a4be056fc/download/page5_img1.png",
      translations: {
        vi: {
          name: "Thịt băm hấp với dưa muối",
          description: "Thịt băm hấp với dưa muối",
        },
        th: { name: "หมูนึ่งกับผักดอง", description: "หมูนึ่งกับผักดอง" },
        zh: { name: "冬菜蒸肉饼", description: "冬菜蒸肉饼" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 44, currency: "RM" },
      ],
    },
    {
      name: "Steamed Minced Pork with Dried Squid",
      description: "Steamed minced pork with dried squid.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6897c299cc7006b542aae/download/page5_img5.png",
      translations: {
        vi: {
          name: "Thịt băm hấp mực khô",
          description: "Thịt băm hấp mực khô",
        },
        th: {
          name: "หมูนึ่งกับปลาหมึกแห้ง",
          description: "หมูนึ่งกับปลาหมึกแห้ง",
        },
        zh: { name: "吊片蒸肉饼", description: "吊片蒸肉饼" },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 44, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Pig Intestine with Pickles",
      description: "Stir-fried pig intestine with pickled vegetables.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6897dad7be4c92d4bbdf9/download/page5_img6.png",
      translations: {
        vi: {
          name: "Lòng heo xào dưa chua",
          description: "Lòng heo xào dưa chua",
        },
        th: { name: "ไส้หมูผัดผักดอง", description: "ไส้หมูผัดผักดอง" },
        zh: { name: "成菜大肠", description: "成菜大肠" },
      },
      variants: [
        { label: "S", price: 25, currency: "RM" },
        { label: "L", price: 48, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Roasted Pork with Dark Soy Sauce",
      description: "Crispy roasted pork stir-fried with dark soy sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68984bafbcbc22a776ff3/download/page6_img6.png",
      translations: {
        vi: {
          name: "Thịt heo quay xào xì dầu đen",
          description: "Thịt heo quay xào xì dầu đen",
        },
        th: {
          name: "หมูกรอบผัดซีอิ๊วดำ",
          description: "หมูกรอบผัดซีอิ๊วดำ",
        },
        zh: {
          name: "火爆烧肉",
          description: "火爆烧肉",
        },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Curry Spare Ribs",
      description: "Spare ribs cooked in rich curry sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e689822027f51c24f2e629/download/page6_img5.png",
      translations: {
        vi: { name: "Sườn heo cà ri", description: "Sườn heo cà ri" },
        th: { name: "ซี่โครงหมูแกงกะหรี่", description: "ซี่โครงหมูแกงกะหรี่" },
        zh: { name: "咖喱排骨", description: "咖喱排骨" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
    {
      name: "Home Made Sweet & Sour Pig Trotter",
      description: "Home made sweet & sour pig trotter.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e68981d2ee99f07fb5edb3/download/page6_img4.png",
      translations: {
        vi: {
          name: "Chân giò chua ngọt kiểu nhà làm",
          description: "Chân giò chua ngọt kiểu nhà làm",
        },
        th: {
          name: "ขาหมูเปรี้ยวหวานแบบโฮมเมด",
          description: "ขาหมูเปรี้ยวหวานแบบโฮมเมด",
        },
        zh: { name: "家乡姜醋猪脚", description: "家乡姜醋猪脚" },
      },
      variants: [
        { label: "S", price: 30, currency: "RM" },
        { label: "L", price: 60, currency: "RM" },
      ],
    },
    {
      name: "Pork Rendang",
      description: "Slow-cooked pork in rich and aromatic rendang sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6897f099fafdf24141659/download/page6_img1.png",
      translations: {
        vi: { name: "Thịt heo Rendang", description: "Thịt heo Rendang" },
        th: { name: "หมูเรินดัง", description: "หมูเรินดัง" },
        zh: { name: "冷当猪肉", description: "冷当猪肉" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 56, currency: "RM" },
      ],
    },
    {
      name: "Home Cooked Braised Pork",
      description: "Home cooked braised pork.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e6898613724a71d71c2355/download/page6_img7.png",
      translations: {
        vi: {
          name: "Thịt heo kho kiểu nhà làm",
          description: "Thịt heo kho kiểu nhà làm",
        },
        th: { name: "หมูพะโล้ทำเอง", description: "หมูพะโล้ทำเอง" },
        zh: { name: "家乡卤猪肉", description: "家乡卤猪肉" },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 48, currency: "RM" },
      ],
    },
    {
      name: "Sweet & Sour Pork",
      description: "Sweet & sour pork.",
      imageUrl:
        "https://trello.com/1/cards/68e6894454041fb9f6c24009/attachments/68e689885bc145b67b112fce/download/page6_img8.png",
      translations: {
        vi: { name: "Thịt heo chua ngọt", description: "Thịt heo chua ngọt" },
        th: { name: "หมูเปรี้ยวหวาน", description: "หมูเปรี้ยวหวาน" },
        zh: { name: "咕噜肉", description: "咕噜肉" },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
  ],
};
