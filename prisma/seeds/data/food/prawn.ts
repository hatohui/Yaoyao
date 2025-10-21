export const prawnData: FoodData = {
  key: "Prawn",
  items: [
    {
      name: "Fresh Water Prawn with Glass Noodle Soup",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b322252b2f0280593a3/download/page13_img3.png",
      description:
        "Fresh water prawns cooked with glass noodles in a savory claypot soup.",
      translations: {
        vi: {
          name: "Tôm càng nấu miến",
          description: "Tôm càng tươi nấu cùng miến trong nồi đất đậm đà.",
        },
        th: {
          name: "กุ้งน้ำจืดตุ๋นวุ้นเส้น",
          description: "กุ้งน้ำจืดปรุงกับวุ้นเส้นในหม้อดินรสกลมกล่อม",
        },
        zh: {
          name: "生虾冬粉煲",
          description: "鲜活河虾与冬粉同煮，汤汁鲜美。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Fresh Water Prawn",
      description:
        "Fresh prawns steamed with garlic or yellow wine for natural sweetness.",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b34fe34a022920efedc/download/page13_img4.png",
      translations: {
        vi: {
          name: "Tôm càng hấp",
          description:
            "Tôm càng hấp cùng tỏi hoặc rượu vàng, giữ trọn vị ngọt tự nhiên.",
        },
        th: {
          name: "กุ้งน้ำจืดนึ่ง",
          description:
            "กุ้งน้ำจืดนึ่งกับกระเทียมหรือเหล้าเหลือง หอมหวานธรรมชาติ",
        },
        zh: {
          name: "清蒸/蒜蓉蒸/黄酒蒸生虾",
          description: "以清蒸、蒜蓉蒸或黄酒蒸方式烹制的鲜虾。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Stir-Fried Fresh Water Prawn with Superior Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b2e87cba8805b8f40ee/download/page13_img1.png",
      description:
        "Fresh prawns stir-fried with premium soy sauce for rich flavor.",
      translations: {
        vi: {
          name: "Tôm càng xào nước tương đặc biệt",
          description:
            "Tôm càng tươi xào cùng nước tương hảo hạng, thơm đậm đà.",
        },
        th: {
          name: "กุ้งน้ำจืดผัดซีอิ๊วพรีเมียม",
          description: "กุ้งน้ำจืดผัดซีอิ๊วสูตรพิเศษ รสเข้มข้น",
        },
        zh: {
          name: "酱油生虾",
          description: "鲜虾以特制酱油炒制，咸香浓郁。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Deep-Fried Prawn",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b30671030142688cf89/download/page13_img2.png",
      description: "Golden fried prawns, crispy and juicy.",
      translations: {
        vi: {
          name: "Tôm chiên giòn",
          description: "Tôm chiên vàng giòn, thịt ngọt mềm bên trong.",
        },
        th: {
          name: "กุ้งทอดกรอบ",
          description: "กุ้งทอดจนเหลืองกรอบ เนื้อนุ่มฉ่ำ",
        },
        zh: {
          name: "炸虾球",
          description: "外酥里嫩的炸虾球。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Pan-Fried Prawn",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b377ef400d627868f3b/download/page13_img5.png",
      description: "Lightly pan-fried prawns with a golden crust.",
      translations: {
        vi: {
          name: "Tôm áp chảo",
          description:
            "Tôm áp chảo vàng nhẹ, giòn bên ngoài, mọng nước bên trong.",
        },
        th: {
          name: "กุ้งทอดกระทะ",
          description: "กุ้งทอดกระทะจนเหลืองหอม",
        },
        zh: {
          name: "干煎虾球",
          description: "香煎虾球，外焦里嫩。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Assam Prawn",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b39976b0b42d82fd285/download/page13_img6.png",
      description:
        "Prawns cooked in tangy tamarind sauce with a hint of spice.",
      translations: {
        vi: {
          name: "Tôm rim me",
          description:
            "Tôm kho với sốt me chua ngọt cay nhẹ, đậm đà vị truyền thống.",
        },
        th: {
          name: "กุ้งผัดน้ำมะขาม",
          description: "กุ้งปรุงในซอสมะขามเปรี้ยวหวาน เผ็ดเล็กน้อย",
        },
        zh: {
          name: "亚参虾球",
          description: "酸辣可口的亚参酱炒虾球。",
        },
      },
      variants: [
        { label: "S", price: 52, currency: "RM" },
        { label: "L", price: 85, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Butter & Egg Floss",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b2d692f459ec628afbe/download/page14_img9.png",
      description:
        "Buttery prawns tossed with golden egg floss for a creamy aroma.",
      translations: {
        vi: {
          name: "Tôm xào bơ trứng muối",
          description: "Tôm xào với bơ béo và sợi trứng giòn thơm.",
        },
        th: {
          name: "กุ้งผัดเนยกับไข่ฝอย",
          description: "กุ้งผัดเนยหอมคลุกไข่ฝอยกรอบ",
        },
        zh: {
          name: "奶油虾",
          description: "奶油炒虾，搭配金黄蛋丝。",
        },
      },
      variants: [
        { label: "S", price: 52, currency: "RM" },
        { label: "L", price: 85, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Salted Egg Yolk",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b44414c2729f1ff7bce/download/page14_img7.png",
      description: "Crispy prawns coated in creamy salted egg yolk sauce.",
      translations: {
        vi: {
          name: "Tôm xóc trứng muối",
          description: "Tôm chiên giòn phủ sốt trứng muối béo ngậy.",
        },
        th: {
          name: "กุ้งทอดไข่เค็ม",
          description: "กุ้งทอดกรอบคลุกซอสไข่เค็มเข้มข้น",
        },
        zh: {
          name: "成蛋虾球",
          description: "裹上咸蛋黄酱的香脆虾球。",
        },
      },
      variants: [
        { label: "S", price: 52, currency: "RM" },
        { label: "L", price: 85, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Mixed Vegetables",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b3cf60f7a26ebfef6fd/download/page14_img2.png",
      description: "Colorful mix of vegetables stir-fried with fresh prawns.",
      translations: {
        vi: {
          name: "Tôm xào rau củ",
          description: "Tôm tươi xào cùng rau củ đầy màu sắc, vị thanh nhẹ.",
        },
        th: {
          name: "กุ้งผัดผักรวม",
          description: "กุ้งสดผัดกับผักรวมสีสันสดใส",
        },
        zh: {
          name: "碧玉虾球",
          description: "虾球搭配多种蔬菜炒制，清爽可口。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Broccoli",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b465ec8219ed4c724d6/download/page14_img8.png",
      description: "Tender prawns and crisp broccoli stir-fried to perfection.",
      translations: {
        vi: {
          name: "Tôm xào bông cải xanh",
          description: "Tôm tươi xào với bông cải xanh giòn, vị thanh mát.",
        },
        th: {
          name: "กุ้งผัดบร็อคโคลี่",
          description: "กุ้งผัดกับบร็อคโคลี่กรอบ สดอร่อย",
        },
        zh: {
          name: "西兰花炒虾球",
          description: "虾球与西兰花同炒，鲜脆爽口。",
        },
      },
      variants: [
        { label: "S", price: 58, currency: "RM" },
        { label: "L", price: 88, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with XO Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b4301ffb7dd5ac9dbd2/download/page14_img6.png",
      description: "Rich and savory XO sauce wok-fried with prawns.",
      translations: {
        vi: {
          name: "Tôm xào sốt XO",
          description: "Tôm xào với sốt XO đậm đà vị hải sản.",
        },
        th: {
          name: "กุ้งผัดซอส XO",
          description: "กุ้งผัดซอส XO รสเข้มข้นกลมกล่อม",
        },
        zh: {
          name: "XO酱炒虾球",
          description: "香辣XO酱炒虾球，味浓香厚。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Marmite",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b3bdb03267315507b00/download/page14_img1.png",
      description: "Prawns coated in rich, umami Marmite sauce.",
      translations: {
        vi: {
          name: "Tôm sốt Marmite",
          description: "Tôm chiên xóc với sốt Marmite mặn ngọt độc đáo.",
        },
        th: {
          name: "กุ้งซอสมาร์ไมต์",
          description: "กุ้งผัดซอสมาร์ไมต์ รสเค็มหวาน",
        },
        zh: {
          name: "妈蜜虾球",
          description: "妈蜜酱炒虾球，香浓可口。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Prawn with Petai",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b3e64abbf8d87dcfbc8/download/page14_img3.png",
      description: "Spicy prawns stir-fried with pungent petai beans.",
      translations: {
        vi: {
          name: "Tôm xào đậu stink bean",
          description: "Tôm xào với đậu petai cay nồng và thơm đặc trưng.",
        },
        th: {
          name: "กุ้งผัดสะตอ",
          description: "กุ้งผัดกับสะตอน้ำพริกเผา เผ็ดหอม",
        },
        zh: {
          name: "臭豆炒虾球",
          description: "香辣臭豆炒虾球，风味独特。",
        },
      },
      variants: [
        { label: "S", price: 58, currency: "RM" },
        { label: "L", price: 88, currency: "RM" },
      ],
    },
    {
      name: "Salad Prawn",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b4099164aab47bbfb3a/download/page14_img4.png",
      description: "Crispy fried prawns topped with creamy salad dressing.",
      translations: {
        vi: {
          name: "Tôm sốt salad",
          description: "Tôm chiên giòn phủ sốt salad béo ngậy.",
        },
        th: {
          name: "กุ้งสลัด",
          description: "กุ้งทอดราดซอสสลัดมันหอม",
        },
        zh: {
          name: "沙汁虾球",
          description: "香脆虾球搭配沙拉酱。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
    {
      name: "Fried Prawn with Garlic",
      imageUrl:
        "https://trello.com/1/cards/68e68b27fee7d351019a8aff/attachments/68e68b423b70e41686be18ab/download/page14_img5.png",
      description: "Golden fried prawns tossed with crispy garlic bits.",
      translations: {
        vi: {
          name: "Tôm chiên tỏi",
          description: "Tôm chiên giòn xóc tỏi phi thơm vàng.",
        },
        th: {
          name: "กุ้งทอดกระเทียม",
          description: "กุ้งทอดกรอบคลุกกระเทียมเจียวหอม",
        },
        zh: {
          name: "蒜香虾球",
          description: "蒜香浓郁的炸虾球。",
        },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 80, currency: "RM" },
      ],
    },
  ],
};

import { FoodData } from "../../scripts/food";
