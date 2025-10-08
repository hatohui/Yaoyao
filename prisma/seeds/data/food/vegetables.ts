import { FoodData } from "../parsed_foods";

export const vegetablesData: FoodData = {
  key: "Vegetables",
  items: [
    {
      name: "Braised Chinese Cabbage with Dried Scallops",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d55467061a696625c72/download/page21_img1.png",
      description:
        "A comforting dish featuring tender Chinese cabbage braised with umami-rich dried scallops, creating a delightful combination of flavors.",
      translations: {
        vi: {
          name: "Cải thảo hầm sò điệp khô",
          description:
            "Món ăn ấm cúng với cải thảo mềm hầm cùng sò điệp khô giàu vị umami, tạo nên sự kết hợp hương vị tuyệt vời.",
        },
        th: {
          name: "กะหล่ำปลีตุ๋นกับหอยเชลล์แห้ง",
          description:
            "จานที่อบอุ่นกับกะหล่ำปลีอ่อนนุ่มตุ๋นกับหอยเชลล์แห้งที่มีรสชาติอูมามิ สร้างความกลมกลืนของรสชาติที่น่าพอใจ",
        },
        zh: {
          name: "千贝扒娃娃菜",
          description:
            "一道舒适的菜肴，采用嫩滑的娃娃菜与干贝炖煮而成，创造出美妙的风味组合。",
        },
      },
      variants: [
        { label: "S", price: 30, currency: "RM" },
        { label: "L", price: 45, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried 'Gao Zhou' Lettuce with Dace in Black Bean",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d22894b1f2ab41a03c2/download/page21_img6.png",
      description:
        "A flavorful stir-fry featuring 'Gao Zhou' lettuce and dace fish cooked in a savory black bean sauce, delivering a delightful blend of textures and tastes.",
      translations: {
        vi: {
          name: "Rau xà lách 'Gao Zhou' xào cá hộp sốt đậu đen",
          description:
            "Một món ăn đầy hương vị với rau xà lách 'Gao Zhou' và cá hộp được nấu trong sốt đậu đen, mang đến sự kết hợp tuyệt vời giữa các kết cấu và hương vị.",
        },
        th: {
          name: "ผักกาด 'Gao Zhou' ผัดปลาซาดีนเต้าเจี้ยว",
          description:
            "ผัดที่มีรสชาติเข้มข้นด้วยผักกาด 'Gao Zhou' และปลาซาดีนที่ปรุงในซอสเต้าเจี้ยวที่มีรสชาติเข้มข้น มอบการผสมผสานที่น่าพอใจของเนื้อสัมผัสและรสชาติ",
        },
        zh: {
          name: "豆豉鲮鱼炒高州生菜",
          description:
            "一道风味十足的炒菜，采用高州生菜和鲮鱼在鲜美的豆豉酱中烹制，带来令人愉悦的口感和味道融合。",
        },
      },
      variants: [
        { label: "S", price: 25, currency: "RM" },
        { label: "L", price: 38, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Baby Lettuce",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d57b45265ee8d3ac014/download/page21_img2.png",
      description:
        "A simple yet delicious dish of baby lettuce stir-fried to perfection, highlighting the fresh and crisp flavors of the greens.",
      translations: {
        vi: {
          name: "Rau xà lách non xào",
          description:
            "Món ăn đơn giản nhưng ngon miệng với rau xà lách non được xào vừa phải, làm nổi bật hương vị tươi mới và giòn của rau xanh.",
        },
        th: {
          name: "ผักกาดหอมอ่อนผัด",
          description:
            "จานที่เรียบง่ายแต่แสนอร่อยของผักกาดหอมอ่อนที่ผัดจนสุกพอดี เน้นรสชาติสดชื่นและกรอบของผัก",
        },
        zh: {
          name: "炒小生菜",
          description:
            "一道简单却美味的炒小生菜，突显了绿叶蔬菜的新鲜和脆嫩口感。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Kangkong with Sambal Belacan",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d58da2aaaf3ab705bab/download/page21_img3.png",
      description:
        "A vibrant stir-fry of kangkong (water spinach) cooked with spicy sambal belacan, offering a perfect balance of heat and savory flavors.",
      translations: {
        vi: {
          name: "Rau muống xào sambal belacan",
          description:
            "Món xào rau muống tươi ngon được nấu cùng sambal belacan cay nồng, mang đến sự cân bằng hoàn hảo giữa vị cay và vị umami.",
        },
        th: {
          name: "ผักบุ้งผัดซัมบัลเบลาคัน",
          description:
            "ผัดผักบุ้งสดใสที่ปรุงด้วยซัมบัลเบลาคันรสเผ็ด มอบความสมดุลที่ลงตัวระหว่างความเผ็ดร้อนและรสชาติอูมามิ",
        },
        zh: {
          name: "炒马来风光",
          description:
            "一道色彩鲜艳的炒空心菜，搭配辛辣的叁巴虾酱，完美平衡了辣味和鲜味。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Spinach In Soup with Anchovy",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d5aadaa89f176742661/download/page21_img4.png",
      description:
        "A comforting soup featuring fresh spinach cooked with anchovies, creating a flavorful and nourishing dish.",
      translations: {
        vi: {
          name: "Rau chân vịt nấu canh với cá cơm",
          description:
            "Món canh ấm áp với rau chân vịt tươi ngon nấu cùng cá cơm, tạo nên một món ăn đầy hương vị và bổ dưỡng.",
        },
        th: {
          name: "ผักโขมในน้ำซุปกับปลาแอนโชวี",
          description:
            "ซุปที่ให้ความอบอุ่นโดยมีผักโขมสดและปลาแอนโชวี ทำให้ได้รสชาติที่กลมกล่อมและมีคุณค่าทางโภชนาการ",
        },
        zh: {
          name: "上汤银丝芫菜",
          description:
            "一道舒适的汤品，采用新鲜的银丝芫菜与凤尾鱼烹制而成，创造出美味又滋养的菜肴。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Braised Broccoli with Mushrooms",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d201165de84139f286e/download/page21_img5.png",
      description:
        "A delightful dish featuring tender broccoli braised with a medley of mushrooms, creating a harmonious blend of flavors and textures.",
      translations: {
        vi: {
          name: "Bông cải xanh hầm với nấm",
          description:
            "Món ăn ngon với bông cải xanh mềm hầm cùng hỗn hợp nấm, tạo nên sự kết hợp hài hòa giữa các hương vị và kết cấu.",
        },
        th: {
          name: "บร็อคโคลี่ตุ๋นกับเห็ด",
          description:
            "จานที่น่ารับประทานด้วยบร็อคโคลี่นุ่มตุ๋นกับเห็ดหลากหลายชนิด สร้างความกลมกลืนของรสชาติและเนื้อสัมผัส",
        },
        zh: {
          name: "冬菇扒西兰花",
          description:
            "一道美味的菜肴，采用嫩滑的西兰花与各种蘑菇炖煮而成，创造出和谐的风味和口感融合。",
        },
      },
      variants: [
        { label: "S", price: 28, currency: "RM" },
        { label: "L", price: 42, currency: "RM" },
      ],
    },
    {
      name: "Lady Finger with Garlic Oil",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d2d6cd7b23db96c9e38/download/page22_img2.png",
      description:
        "A simple yet flavorful dish of lady finger (okra) stir-fried with garlic oil, highlighting the natural taste of the vegetable.",
      translations: {
        vi: {
          name: "Đậu bắp xào dầu tỏi",
          description:
            "Món ăn đơn giản nhưng đầy hương vị với đậu bắp xào dầu tỏi, làm nổi bật hương vị tự nhiên của rau củ.",
        },
        th: {
          name: "ผัดกระเจี๊ยบเขียวกับน้ำมันกระเทียม",
          description:
            "จานที่เรียบง่ายแต่เต็มไปด้วยรสชาติของกระเจี๊ยบเขียวผัดกับน้ำมันกระเทียม เน้นรสชาติธรรมชาติของผัก",
        },
        zh: {
          name: "蒜蓉炒秋葵",
          description:
            "一道简单却风味十足的秋葵炒菜，搭配蒜蓉油，突显了蔬菜的自然味道。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Beans with Sambal",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d31fed6952fc7db80a7/download/page22_img5.png",
      description:
        "A spicy and savory stir-fry of mixed beans cooked with sambal, delivering a burst of flavors in every bite.",
      translations: {
        vi: {
          name: "Đậu xào sambal",
          description:
            "Món đậu xào sambal cay và đậm đà, mang đến hương vị bùng nổ trong từng miếng ăn.",
        },
        th: {
          name: "ผัดถั่วซัมบัล",
          description:
            "การผัดถั่วที่เผ็ดและอร่อยด้วยซัมบัล ส่งมอบรสชาติที่ระเบิดในทุกคำ",
        },
        zh: {
          name: "四大天王",
          description:
            "一道辛辣可口的混合豆类炒菜，搭配沙爹酱，带来每一口的味觉爆炸。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Roasted Pork with Long Bean",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d2bd04c007326dd240a/download/page22_img1.png",
      description:
        "A delicious dish featuring crispy roasted pork stir-fried with long beans, delivering a rich and satisfying flavor.",
      translations: {
        vi: {
          name: "Đậu đũa xào thịt heo quay",
          description:
            "Món đậu đũa xào thịt heo quay giòn tan, mang đến hương vị đậm đà và hấp dẫn.",
        },
        th: {
          name: "ถั่วฝักยาวผัดหมูกรอบ",
          description:
            "จานถั่วฝักยาวผัดหมูกรอบที่กรอบอร่อย มอบรสชาติที่เข้มข้นและน่ารับประทาน",
        },
        zh: {
          name: "烧肉炒蛇豆",
          description:
            "一道美味的菜肴，采用脆皮烧肉与蛇豆炒制而成，带来浓郁的风味和口感。",
        },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 40, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried French Bean with Dried Shrimp",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d33668cbe73185f7aa1/download/page22_img6.png",
      description:
        "A flavorful stir-fry of French beans cooked with dried shrimp, creating a delightful combination of savory and umami flavors.",
      translations: {
        vi: {
          name: "Đậu que xào tôm khô",
          description:
            "Món đậu que xào tôm khô đầy hương vị, tạo nên sự kết hợp tuyệt vời giữa vị ngọt của đậu que và vị umami của tôm khô.",
        },
        th: {
          name: "ถั่วฝักยาวผัดกุ้งแห้ง",
          description:
            "ผัดถั่วฝักยาวที่มีรสชาติเข้มข้นด้วยกุ้งแห้ง สร้างความกลมกล่อมของรสชาติอูมามิและรสเค็ม",
        },
        zh: {
          name: "虾米四季豆",
          description:
            "一道风味十足的炒菜，采用四季豆与虾米烹制而成，创造出鲜美和鲜味的美妙结合。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried French Bean with Minced Pork",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d303972dac0db0a7033/download/page22_img4.png",
      description:
        "A savory stir-fry of French beans cooked with minced pork, delivering a satisfying and flavorful dish.",
      translations: {
        vi: {
          name: "Đậu que xào thịt băm",
          description:
            "Món đậu que xào thịt băm đậm đà, mang đến một món ăn thỏa mãn và đầy hương vị.",
        },
        th: {
          name: "ถั่วฝักยาวผัดหมูสับ",
          description:
            "ผัดถั่วฝักยาวที่มีรสชาติเข้มข้นด้วยหมูสับ มอบจานที่น่าพอใจและเต็มไปด้วยรสชาติ",
        },
        zh: {
          name: "肉碎四季豆",
          description:
            "一道美味的炒菜，采用四季豆与肉碎烹制而成，带来令人满意且风味十足的菜肴。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Sweet Potato Leaves",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d2e83de2c17d7ce5c5c/download/page22_img3.png",
      description:
        "A simple and nutritious dish of sweet potato leaves stir-fried to perfection, highlighting the fresh and earthy flavors of the greens.",
      translations: {
        vi: {
          name: "Rau lang xào",
          description:
            "Món rau lang xào đơn giản và bổ dưỡng, làm nổi bật hương vị tươi ngon và đất đai của rau.",
        },
        th: {
          name: "ผัดยอดมันเทศ",
          description:
            "จานยอดมันเทศผัดที่เรียบง่ายและมีคุณค่าทางโภชนาการ เน้นรสชาติสดใหม่และดินของผัก",
        },
        zh: {
          name: "清炒/腐乳薯苗",
          description:
            "一道简单而营养丰富的炒菜，采用薯苗炒制而成，突显出蔬菜的新鲜和泥土风味。",
        },
      },
      variants: [
        { label: "S", price: 22, currency: "RM" },
        { label: "L", price: 34, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Assorted Mushrooms",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d34bac183344e25dd43/download/page22_img7.png",
      description:
        "A delightful stir-fry featuring a medley of mushrooms, showcasing their unique flavors and textures.",
      translations: {
        vi: {
          name: "Nấm xào thập cẩm",
          description:
            "Món xào ngon với hỗn hợp nấm, làm nổi bật hương vị và kết cấu độc đáo của chúng.",
        },
        th: {
          name: "เห็ดผัดรวมมิตร",
          description:
            "ผัดที่น่ารับประทานด้วยเห็ดหลากหลายชนิด เน้นรสชาติและเนื้อสัมผัสที่เป็นเอกลักษณ์ของพวกมัน",
        },
        zh: {
          name: "什菌炒时蔬",
          description:
            "一道美味的炒菜，采用各种蘑菇，展示了它们独特的风味和口感。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Hot & Sour Vegetables",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d36e2c737cb82c022e3/download/page22_img8.png",
      description:
        "A tangy and spicy vegetable dish that combines a variety of fresh vegetables with a flavorful hot and sour sauce.",
      translations: {
        vi: {
          name: "Rau chua cay",
          description: "Món rau chua cay với hương vị đậm đà và tươi mát.",
        },
        th: {
          name: "ผักเปรี้ยวเผ็ด",
          description: "จานผักเปรี้ยวเผ็ดที่มีรสชาติเข้มข้นและสดชื่น",
        },
        zh: {
          name: "酸辣菜",
          description: "一道酸辣可口的蔬菜菜肴，带来浓郁的风味和清新的口感。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 40, currency: "RM" },
      ],
    },
    {
      name: "Chinese Cabbage with Garlic Oil",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d37ecf2ce1808799fbb/download/page22_img9.png",
      description:
        "A simple yet flavorful dish of Chinese cabbage stir-fried with garlic oil, highlighting the natural taste of the vegetable.",
      translations: {
        vi: {
          name: "Cải thảo xào dầu tỏi",
          description:
            "Món ăn đơn giản nhưng đầy hương vị với cải thảo xào dầu tỏi, làm nổi bật hương vị tự nhiên của rau củ.",
        },
        th: {
          name: "ผัดกะหล่ำปลีน้ำมันกระเทียม",
          description:
            "จานที่เรียบง่ายแต่เต็มไปด้วยรสชาติของกะหล่ำปลีผัดกับน้ำมันกระเทียม เน้นรสชาติธรรมชาติของผัก",
        },
        zh: {
          name: "蒜蓉炒娃娃菜",
          description:
            "一道简单却风味十足的娃娃菜炒菜，搭配蒜蓉油，突显了蔬菜的自然味道。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried / Mustard Leaves with Garlic Oil",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d43948850f5c9256d63/download/page23_img7.png",
      description:
        "A simple yet flavorful dish of mustard leaves stir-fried with garlic oil, highlighting the natural taste of the vegetable.",
      translations: {
        vi: {
          name: "Rau cải xào dầu tỏi",
          description:
            "Món ăn đơn giản nhưng đầy hương vị với rau cải xào dầu tỏi, làm nổi bật hương vị tự nhiên của rau củ.",
        },
        th: {
          name: "ผักกวางตุ้งผัดน้ำมันกระเทียม",
          description:
            "จานที่เรียบง่ายแต่เต็มไปด้วยรสชาติของผักกวางตุ้งผัดกับน้ำมันกระเทียม เน้นรสชาติธรรมชาติของผัก",
        },
        zh: {
          name: "蒜蓉炒芥兰",
          description:
            "一道简单却风味十足的芥兰炒菜，搭配蒜蓉油，突显了蔬菜的自然味道。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Kai Lan with Roasted Pork / Shrimp",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d2bd04c007326dd240a/download/page22_img1.png",
      description:
        "A delicious dish featuring tender kai lan stir-fried with crispy roasted pork or succulent shrimp, delivering a rich and satisfying flavor.",
      translations: {
        vi: {
          name: "Cải rổ xào thịt quay / tôm",
          description:
            "Món cải rổ xào thịt quay giòn tan hoặc tôm tươi ngon, mang đến hương vị đậm đà và hấp dẫn.",
        },
        th: {
          name: "คะน้าผัดหมูกรอบ / กุ้ง",
          description:
            "จานคะน้าผัดหมูกรอบที่กรอบอร่อยหรือกุ้งสด มอบรสชาติที่เข้มข้นและน่ารับประทาน",
        },
        zh: {
          name: "烧肉/虾仁炒芥兰",
          description:
            "一道美味的菜肴，采用嫩滑的芥兰与脆皮烧肉或鲜嫩虾仁炒制而成，带来浓郁的风味和口感。",
        },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 40, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Kai Lan with Ginger & Black Fungus",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d3d278b0a34cc021ff7/download/page23_img3.png",
      description:
        "A flavorful stir-fry of kai lan cooked with ginger and black fungus, creating a delightful combination of savory and aromatic flavors.",
      translations: {
        vi: {
          name: "Cải rổ xào gừng và nấm mèo",
          description:
            "Món cải rổ xào gừng và nấm mèo đầy hương vị, tạo nên sự kết hợp tuyệt vời giữa vị ngọt của cải rổ và vị thơm của gừng cùng nấm mèo.",
        },
        th: {
          name: "คะน้าผัดขิงและเห็ดหูหนู",
          description:
            "ผัดคะน้าที่มีรสชาติเข้มข้นด้วยขิงและเห็ดหูหนู สร้างความกลมกล่อมของรสชาติอูมามิและกลิ่นหอม",
        },
        zh: {
          name: "姜茸木耳炒芥兰",
          description:
            "一道风味十足的炒菜，采用芥兰与姜和木耳烹制而成，创造出鲜美和芳香的美妙结合。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Celery with Dried Cuttlefish",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d40cf8b7427e53f2ecb/download/page23_img5.png",
      description:
        "A flavorful stir-fry of celery cooked with dried cuttlefish, creating a delightful combination of savory and umami flavors.",
      translations: {
        vi: {
          name: "Cần tây xào mực khô",
          description:
            "Món cần tây xào mực khô đầy hương vị, tạo nên sự kết hợp tuyệt vời giữa vị ngọt của cần tây và vị umami của mực khô.",
        },
        th: {
          name: "ขึ้นฉ่ายผัดปลาหมึกแห้ง",
          description:
            "ผัดขึ้นฉ่ายที่มีรสชาติเข้มข้นด้วยปลาหมึกแห้ง สร้างความกลมกล่อมของรสชาติอูมามิและรสเค็ม",
        },
        zh: {
          name: "干贝炒西芹",
          description:
            "一道风味十足的炒菜，采用西芹与干鱿鱼烹制而成，创造出鲜美和鲜味的美妙结合。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Cabbage with Dried Shrimp",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d39c61a772d5725dabb/download/page23_img1.png",
      description:
        "A flavorful stir-fry of cabbage cooked with dried shrimp, creating a delightful combination of savory and umami flavors.",
      translations: {
        vi: {
          name: "Bắp cải xào tôm khô",
          description:
            "Món bắp cải xào tôm khô đầy hương vị, tạo nên sự kết hợp tuyệt vời giữa vị ngọt của bắp cải và vị umami của tôm khô.",
        },
        th: {
          name: "กะหล่ำปลีผัดกุ้งแห้ง",
          description:
            "ผัดกะหล่ำปลีที่มีรสชาติเข้มข้นด้วยกุ้งแห้ง สร้างความกลมกล่อมของรสชาติอูมามิและรสเค็ม",
        },
        zh: {
          name: "虾米炒包菜",
          description:
            "一道风味十足的炒菜，采用包菜与虾米烹制而成，创造出鲜美和鲜味的美妙结合。",
        },
      },
      variants: [
        { label: "S", price: 20, currency: "RM" },
        { label: "L", price: 30, currency: "RM" },
      ],
    },
    {
      name: "Mixed Vegetables Curry",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d3bf3f3d58dc21f1d8d/download/page23_img2.png",
      description:
        "A hearty and flavorful curry dish featuring a variety of mixed vegetables simmered in a rich and aromatic curry sauce.",
      translations: {
        vi: {
          name: "Cà ri rau thập cẩm",
          description:
            "Món cà ri rau thập cẩm đậm đà và đầy hương vị, với nhiều loại rau củ được hầm trong nước sốt cà ri thơm ngon.",
        },
        th: {
          name: "แกงผักรวม",
          description:
            "แกงผักรวมที่เข้มข้นและเต็มไปด้วยรสชาติ มีผักหลากหลายชนิดที่เคี่ยวในซอสแกงที่หอมกรุ่น.",
        },
        zh: {
          name: "咖喱杂菜煲",
          description:
            "一道丰盛美味的咖喱菜肴，采用多种杂菜在浓郁芳香的咖喱酱中慢炖而成。",
        },
      },
      variants: [{ price: 42, currency: "RM" }],
    },
    {
      name: "Stir-Fried Bitter Gourd with Dace in Black Bean",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d451e25248f4e657cd9/download/page23_img8.png",
      description:
        "A flavorful stir-fry featuring bitter gourd and dace fish cooked in a savory black bean sauce, delivering a delightful blend of textures and tastes.",
      translations: {
        vi: {
          name: "Khổ qua xào cá hộp sốt đậu đen",
          description:
            "Món khổ qua xào cá hộp sốt đậu đen đậm đà, kết hợp giữa vị đắng của khổ qua và vị mặn của cá hộp.",
        },
        th: {
          name: "มะระผัดปลาซาดีนเต้าเจี้ยว",
          description:
            "มะระผัดปลาซาดีนเต้าเจี้ยวที่มีรสชาติเข้มข้น สร้างความกลมกล่อมของรสชาติอูมามิและรสเค็ม.",
        },
        zh: {
          name: "豆豉鲮鱼炒苦瓜",
          description:
            "一道风味十足的炒菜，采用苦瓜与豆豉鲮鱼烹制而成，创造出鲜美和鲜味的美妙结合。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Bitter Gourd with Roasted Pork",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d46eb3da2711564f85a/download/page23_img9.png",
      description:
        "A delicious dish featuring crispy roasted pork stir-fried with bitter gourd, delivering a rich and satisfying flavor.",
      translations: {
        vi: {
          name: "Khổ qua xào thịt quay",
          description:
            "Món khổ qua xào thịt quay giòn tan, mang đến hương vị đậm đà và thỏa mãn.",
        },
        th: {
          name: "มะระผัดหมูกรอบ",
          description: "มะระผัดหมูกรอบที่มีรสชาติอร่อยและกลมกล่อม.",
        },
        zh: {
          name: "烧肉炒苦瓜",
          description:
            "一道美味的菜肴，采用脆皮烧肉与苦瓜同炒，带来丰富而令人满意的味道。",
        },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 40, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Bitter Gourd with Minced Pork & Pickles",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d3ef9dd2d4d143bbf0f/download/page23_img4.png",
      description:
        "A savory stir-fry of bitter gourd cooked with minced pork and pickles, delivering a satisfying and flavorful dish.",
      translations: {
        vi: {
          name: "Khổ qua xào thịt băm và dưa chua",
          description:
            "Món khổ qua xào thịt băm và dưa chua đậm đà, mang đến hương vị hài hòa và thỏa mãn.",
        },
        th: {
          name: "มะระผัดหมูสับและผักดอง",
          description: "มะระผัดหมูสับและผักดองที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "咸菜肉碎炒苦瓜",
          description:
            "一道美味的菜肴，采用咸菜与肉碎炒苦瓜，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 26, currency: "RM" },
        { label: "L", price: 40, currency: "RM" },
      ],
    },
    {
      name: "Broccoli with Mushrooms & Bean Curd",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d4b16695da623d40b43/download/page24_img3.png",
      description:
        "A delightful dish featuring tender broccoli stir-fried with mushrooms and bean curd, creating a harmonious blend of flavors and textures.",
      translations: {
        vi: {
          name: "Bông cải xanh xào nấm và đậu hũ",
          description:
            "Món bông cải xanh xào nấm và đậu hũ thơm ngon, mang đến sự hòa quyện hoàn hảo giữa các hương vị và kết cấu.",
        },
        th: {
          name: "บร็อคโคลี่ผัดเห็ดและเต้าหู้",
          description:
            "บร็อคโคลี่ผัดเห็ดและเต้าหู้ที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "冬菇豆根西兰花",
          description:
            "一道美味的菜肴，采用冬菇与豆根西兰花同炒，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 38, currency: "RM" },
        { label: "L", price: 58, currency: "RM" },
      ],
    },
    {
      name: "Stir-Fried Lotus Root with Scallop & Macadamia Nut",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d51dfc900e5cef96dbe/download/page24_img6.png",
      description:
        "A delightful stir-fry featuring crunchy lotus root, tender scallops, and creamy macadamia nuts, creating a harmonious blend of textures and flavors.",
      translations: {
        vi: {
          name: "Củ sen xào sò điệp và hạt macca",
          description:
            "Món củ sen xào sò điệp và hạt macca giòn tan, mang đến sự hòa quyện hoàn hảo giữa các kết cấu và hương vị.",
        },
        th: {
          name: "รากบัวผัดหอยเชลล์และแมคคาเดเมีย",
          description:
            "รากบัวผัดหอยเชลล์และแมคคาเดเมียที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "带子夏果小炒皇",
          description:
            "一道美味的菜肴，采用脆皮带子与夏果同炒，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 58, currency: "RM" },
        { label: "L", price: 88, currency: "RM" },
      ],
    },
    {
      name: "Mixed Vegetables 'Nam Yu' Style",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d4d2a7779ecdf6df4df/download/page24_img4.png",
      description:
        "A flavorful stir-fry of mixed vegetables cooked in a savory 'Nam Yu' (fermented red bean curd) sauce, delivering a delightful blend of textures and tastes.",
      translations: {
        vi: {
          name: "Rau thập cẩm kiểu Nam Yu (đậu đỏ lên men)",
          description:
            "Món rau thập cẩm kiểu Nam Yu (đậu đỏ lên men) thơm ngon, mang đến sự hòa quyện hoàn hảo giữa các hương vị và kết cấu.",
        },
        th: {
          name: "ผักรวมผัดเต้าหู้ยี้",
          description: "ผักรวมผัดเต้าหู้ยี้ที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "南乳家乡斋",
          description:
            "一道美味的菜肴，采用南乳与时蔬同炒，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 24, currency: "RM" },
        { label: "L", price: 36, currency: "RM" },
      ],
    },
    {
      name: "Chicken in Yam Basket",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d4fb7ae28cebe4e8eee/download/page24_img5.png",
      description:
        "A delightful dish featuring tender chicken pieces served in a crispy yam basket, creating a harmonious blend of textures and flavors.",
      translations: {
        vi: {
          name: "Gà trong giỏ khoai môn",
          description:
            "Món gà trong giỏ khoai môn thơm ngon, mang đến sự hòa quyện hoàn hảo giữa các kết cấu và hương vị.",
        },
        th: {
          name: "ไก่ในตะกร้อมันม่วง",
          description: "ไก่ในตะกร้อมันม่วงที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "佛钵鸡丁",
          description:
            "一道美味的菜肴，采用佛钵与鸡丁同炒，带来丰富的口感和味道。",
        },
      },
      variants: [{ price: 45, currency: "RM" }],
    },
    {
      name: "Petai with Minced Pork",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d4a94030962b3e1e8d0/download/page24_img2.png",
      description:
        "A savory stir-fry of petai (stink beans) cooked with minced pork, delivering a satisfying and flavorful dish.",
      translations: {
        vi: {
          name: "Đậu thối xào thịt băm",
          description:
            "Món đậu thối xào thịt băm thơm ngon, mang đến sự hòa quyện hoàn hảo giữa các kết cấu và hương vị.",
        },
        th: {
          name: "สะตอผัดหมูสับ",
          description: "สะตอผัดหมูสับที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "臭豆炒肉碎",
          description:
            "一道美味的菜肴，采用臭豆与肉碎同炒，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 30, currency: "RM" },
        { label: "L", price: 48, currency: "RM" },
      ],
    },
    {
      name: "Petai with Shrimp",
      imageUrl:
        "https://trello.com/1/cards/68e68c3decad984cfbe00109/attachments/68e68d48b5b59eba724bca82/download/page24_img1.png",
      description:
        "A flavorful stir-fry of petai (stink beans) cooked with succulent shrimp, creating a delightful combination of savory and umami flavors.",
      translations: {
        vi: {
          name: "Đậu hũ thối xào tôm",
          description: "Món đậu thối xào tôm thơm ngon.",
        },
        th: {
          name: "สะตอผัดกุ้ง",
          description: "สะตอผัดกุ้งที่มีรสชาติกลมกล่อมและอร่อย.",
        },
        zh: {
          name: "臭豆炒虾仁",
          description:
            "一道美味的菜肴，采用臭豆与虾仁同炒，带来丰富的口感和味道。",
        },
      },
      variants: [
        { label: "S", price: 32, currency: "RM" },
        { label: "L", price: 50, currency: "RM" },
      ],
    },
  ],
};
