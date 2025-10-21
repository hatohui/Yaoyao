import { FoodData } from "../../scripts/food";

export const fishData: FoodData = {
  key: "Fish",
  items: [
    {
      name: "Deep Fried Threadfin (Tilapia / Grouper / Grass Carp)",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ad73f777895df374251/download/page10_img2.png",
      description: "Fish skin crispy, meat tender. Served with special sauce.",
      translations: {
        vi: {
          name: "Cá chỉ vàng chiên giòn (Cá rô phi / Cá mú / Cá trắm)",
          description: "Da cá giòn, thịt mềm. Dùng kèm với sốt đặc biệt.",
        },
        th: {
          name: "ปลากระพงเหลืองทอดกรอบ (ปลานิล / ปลากะรัง / ปลาคาร์พ)",
          description: "หนังปลากรอบ เนื้อนุ่ม เสิร์ฟพร้อมซอสพิเศษ",
        },
        zh: {
          name: "油浸马友鱼（金凤鱼/石斑鱼/鲩鱼",
          description: "鱼皮酥脆，鱼肉鲜嫩。配特制酱汁。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Homemade Braised Threadfin with Pickles (Tilapia / Grouper / Grass Carp)",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68adbeb17f12a5c5f2cdd/download/page10_img4.png",
      description: "Homemade style braised threadfin with pickles.",
      translations: {
        vi: {
          name: "Cá chỉ vàng hầm dưa chua kiểu nhà làm (Cá rô phi / Cá mú / Cá trắm)",
          description: "Cá chỉ vàng hầm kiểu nhà làm với dưa chua.",
        },
        th: {
          name: "ปลากระพงเหลืองตุ๋นผักดองสไตล์บ้านๆ (ปลานิล / ปลากะรัง / ปลาคาร์พ)",
          description: "ปลากระพงเหลืองตุ๋นสไตล์บ้านๆ กับผักดอง",
        },
        zh: {
          name: "家乡咸菜焖马友鱼（金凤鱼/石斑鱼/鲩鱼",
          description: "家乡风味咸菜焖马友鱼。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Grass Carp with Ginger Paste (Tilapia / Grouper Meat)",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ad99191f5e3a1a31769/download/page10_img3.png",
      description: "Fresh grass carp steamed with ginger paste.",
      translations: {
        vi: {
          name: "Cá trắm hấp gừng (Cá rô phi / Thịt cá mú)",
          description: "Cá trắm tươi hấp với gừng.",
        },
        th: {
          name: "ปลาคาร์พนึ่งซอสขิง (ปลานิล / เนื้อปลากะรัง)",
          description: "ปลาคาร์พสดนึ่งกับซอสขิง",
        },
        zh: {
          name: "姜蓉蒸鲩鱼（金凤鱼/石斑肉",
          description: "鲜鲩鱼配姜蓉蒸制。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Curry Garoupa Fish Head",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68adf39360a5a332b0596/download/page10_img5.png",
      description: "Fresh garoupa fish head cooked in curry style.",
      translations: {
        vi: {
          name: "Đầu cá mú nấu cà ri",
          description: "Đầu cá mú tươi nấu theo kiểu cà ri.",
        },
        th: {
          name: "หัวปลากะรังแกงกะหรี่",
          description: "หัวปลากะรังสดปรุงสไตล์แกงกะหรี่",
        },
        zh: { name: "咖喱龙虎斑鱼头", description: "鲜龙虎斑鱼头咖喱烹制。" },
      },
      variants: [{ price: 68, currency: "RM" }],
    },
    {
      name: "Stir-Fried Fish Skin with Salted Egg",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ad5a7870333d4e367e5/download/page10_img1.png",
      description: "Crispy fish skin stir-fried with salted egg yolk.",
      translations: {
        vi: {
          name: "Da cá chiên trứng muối",
          description: "Da cá giòn chiên với lòng đỏ trứng muối.",
        },
        th: {
          name: "หนังปลาทอดไข่เค็ม",
          description: "หนังปลาทอดกรอบกับไข่เค็ม.",
        },
        zh: { name: "咸蛋鱼皮", description: "咸蛋黄炒脆皮鱼皮。" },
      },
      variants: [{ price: 28, currency: "RM" }],
    },
    {
      name: "Sweet & Sour Garoupa",
      description: "Fresh garoupa cooked in sweet and sour sauce.",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ae93a800fae587ac33b/download/page11_img5.png",
      translations: {
        vi: {
          name: "Cá mú chua ngọt",
          description: "Cá mú tươi nấu sốt chua ngọt.",
        },
        th: {
          name: "ปลากะรังเปรี้ยวหวาน",
          description: "ปลากะรังสดปรุงสไตล์เปรี้ยวหวาน.",
        },
        zh: { name: "五柳石斑", description: "鲜五柳石斑鱼烹制。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Garoupa Meat with Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ae53d1edf635171a746/download/page11_img3.png",
      description: "Fresh garoupa meat steamed with soy sauce.",
      translations: {
        vi: {
          name: "Thịt cá mú hấp xì dầu",
          description: "Thịt cá mú tươi hấp với xì dầu.",
        },
        th: {
          name: "เนื้อปลากะรังนึ่งซีอิ๊ว",
          description: "เนื้อปลากะรังสดนึ่งกับซีอิ๊ว.",
        },
        zh: { name: "清蒸石斑肉", description: "鲜石斑鱼肉清蒸。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Stir-Fried Garoupa with Butter & Egg Floss",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ae77cde8cca38da48f8/download/page11_img4.png",
      description: "Fresh garoupa stir-fried with butter and egg floss.",
      translations: {
        vi: {
          name: "Cá mú chiên bơ và trứng sợi",
          description: "Cá mú tươi chiên với bơ và trứng sợi.",
        },
        th: {
          name: "ปลากะรังผัดเนยและไข่ฝอย",
          description: "ปลากะรังสดผัดกับเนยและไข่ฝอย.",
        },
        zh: { name: "奶油石斑片", description: "鲜石斑鱼片炒奶油和蛋丝。" },
      },
      variants: [
        { label: "S", price: 50, currency: "RM" },
        { label: "L", price: 75, currency: "RM" },
      ],
    },
    {
      name: "Garoupa with Curry Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68aebccf2683d63020e52/download/page11_img7.png",
      description: "Fresh garoupa cooked in curry sauce.",
      translations: {
        vi: {
          name: "Cá mú sốt cà ri",
          description: "Cá mú tươi nấu với sốt cà ri.",
        },
        th: {
          name: "ปลากะรังซอสแกงกะหรี่",
          description: "ปลากะรังสดนึ่งกับซอสแกงกะหรี่.",
        },
        zh: { name: "香辣石斑片", description: "鲜石斑鱼片炒香辣酱。" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Garoupa with Ginger & Spring Onion",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ae18a1cf0b04ae5fb27/download/page11_img1.png",
      description: "Fresh garoupa stir-fried with ginger and spring onion.",
      translations: {
        vi: {
          name: "Cá mú xào gừng hành",
          description: "Cá mú tươi xào với gừng và hành.",
        },
        th: {
          name: "ปลากะรังผัดขิงและต้นหอม",
          description: "ปลากะรังสดผัดกับขิงและต้นหอม.",
        },
        zh: { name: "姜葱石斑片", description: "鲜石斑鱼片炒姜葱。" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Sweet & Sour Garoupa",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68ae3ebc676bb6901d929/download/page11_img2.png",
      description: "Fresh garoupa cooked in sweet and sour sauce.",
      translations: {
        vi: {
          name: "Cá mú chua ngọt",
          description: "Cá mú tươi nấu sốt chua ngọt.",
        },
        th: {
          name: "ปลากะรังเปรี้ยวหวาน",
          description: "ปลากะรังสดปรุงสไตล์เปรี้ยวหวาน.",
        },
        zh: { name: "甜酸石斑片", description: "鲜石斑鱼片炒甜酸酱。" },
      },
      variants: [
        { label: "S", price: 48, currency: "RM" },
        { label: "L", price: 70, currency: "RM" },
      ],
    },
    {
      name: "Steamed Coral Trout with Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68afa636fda723db09129/download/page12_img6.png",
      description: "Fresh coral trout steamed with soy sauce.",
      translations: {
        vi: {
          name: "Cá mú san hô hấp xì dầu",
          description: "Cá mú san hô tươi hấp với xì dầu.",
        },
        th: {
          name: "ปลากะรังปะการังนึ่งซีอิ๊ว",
          description: "ปลากะรังปะการังสดนึ่งกับซีอิ๊ว.",
        },
        zh: { name: "清蒸七星斑", description: "鲜七星斑鱼清蒸。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Marble Goby with Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68aed944a9c236c48b08b/download/page12_img1.png",
      description: "Fresh marble goby steamed with soy sauce.",
      translations: {
        vi: {
          name: "Cá song hấp xì dầu",
          description: "Cá song tươi hấp với xì dầu.",
        },
        th: { name: "ปลาหินนึ่งซีอิ๊ว", description: "ปลาหินสดนึ่งกับซีอิ๊ว." },
        zh: { name: "清蒸笋壳", description: "鲜笋壳鱼清蒸。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Pomfret 'Chao Zhou' Style",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68af9598d534b74f4a1cc/download/page12_img5.png",
      description: "Fresh pomfret steamed in 'Chao Zhou' style.",
      translations: {
        vi: {
          name: "Cá chim hấp kiểu Triều Châu",
          description: "Cá chim tươi hấp kiểu Triều Châu.",
        },
        th: {
          name: "ปลาปอมเฟรตนึ่งสไตล์แต้จิ๋ว",
          description: "ปลาปอมเฟรตสดนึ่งสไตล์แต้จิ๋ว.",
        },
        zh: { name: "潮州蒸斗鲳", description: "鲜斗鲳鱼潮州蒸。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Cod Fish with Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68af6bbeb8f202ebbe994/download/page12_img3.png",
      description: "Fresh cod fish steamed with soy sauce.",
      translations: {
        vi: {
          name: "Cá tuyết hấp xì dầu",
          description: "Cá tuyết tươi hấp với xì dầu.",
        },
        th: {
          name: "ปลาค็อดนึ่งซีอิ๊ว",
          description: "ปลาค็อดสดนึ่งกับซีอิ๊ว.",
        },
        zh: { name: "清蒸银鳕鱼", description: "鲜银鳕鱼清蒸。" },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Steamed Red Snapper with Soy Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68af5c2cef3cf02d217ac/download/page12_img2.png",
      description: "Fresh red snapper steamed with soy sauce.",
      translations: {
        vi: {
          name: "Cá hồng hấp xì dầu",
          description: "Cá hồng tươi hấp với xì dầu.",
        },
        th: {
          name: "ปลาสแนปเปอร์แดงนึ่งซีอิ๊ว",
          description: "ปลาสแนปเปอร์แดงสดนึ่งกับซีอิ๊ว.",
        },
        zh: {
          name: "清蒸红枣鱼",
          description: "鲜红枣鱼清蒸。",
        },
      },
      variants: [{ isSeasonal: true }],
    },
    {
      name: "Tilapia with Curry Sauce",
      imageUrl:
        "https://trello.com/1/cards/68e68a9ffa58e971661f3797/attachments/68e68af7daab478f656ab785/download/page12_img4.png",
      description: "Fresh tilapia cooked in curry sauce.",
      translations: {
        vi: {
          name: "Cá rô phi sốt cà ri",
          description: "Cá rô phi tươi sốt cà ri.",
        },
        th: {
          name: "ปลานิลซอสแกงกะหรี่",
          description: "ปลานิลสดซอสแกงกะหรี่.",
        },
        zh: { name: "香辣金凤鱼", description: "鲜金凤鱼香辣。" },
      },
      variants: [{ isSeasonal: true }],
    },
  ],
};
