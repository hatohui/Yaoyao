import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function seedCategories() {
  const categories = [
    { name: "Fish", description: "Fresh and cooked fish dishes." },
    { name: "Prawn", description: "Sea prawn and shrimp specialties." },
    { name: "Squid", description: "Squid-based meals and side dishes." },
    { name: "Crab", description: "Crab delicacies in various styles." },
    { name: "Shark fin & Abalone", description: "Premium seafood delicacies." },
    { name: "Bean Curd", description: "Tofu and soy-based dishes." },
    { name: "Vegetables", description: "Healthy vegetable options." },
    { name: "Egg", description: "Egg-centered meals and sides." },
    { name: "Soup", description: "Warm, hearty soups and broths." },
    { name: "Noodles", description: "Noodle dishes of all varieties." },
    { name: "Rice", description: "Rice dishes and fried rice options." },
    { name: "Dessert", description: "Sweet treats and desserts." },
    {
      name: "Soft Drinks",
      description: "Carbonated beverages like Coke, Pepsi, and Sprite.",
    },
    { name: "Juice", description: "Fresh fruit and vegetable juices." },
    { name: "Alcohol", description: "Beer, wine, cocktails, and spirits." },
    {
      name: "Other",
      description: "Smoothies, milkshakes, water, and others.",
    },
  ];

  const translations = {
    zh: [
      { name: "鱼类", description: "新鲜和熟制的鱼类菜肴。" },
      { name: "虾类", description: "海虾和虾类特色菜。" },
      { name: "鱿鱼", description: "以鱿鱼为主的菜肴和小吃。" },
      { name: "螃蟹", description: "各种风格的螃蟹美食。" },
      { name: "鱼翅与鲍鱼", description: "高档海味珍品。" },
      { name: "豆腐", description: "豆腐与黄豆制品菜肴。" },
      { name: "蔬菜", description: "健康蔬菜选项。" },
      { name: "鸡蛋", description: "以鸡蛋为主的餐点与配菜。" },
      { name: "汤类", description: "温暖、浓郁的汤品与高汤。" },
      { name: "面食", description: "各式面条料理。" },
      { name: "米饭", description: "米饭与炒饭料理。" },
      { name: "甜点", description: "甜品与甜食。" },
      { name: "汽水", description: "碳酸饮料，如可乐、百事、雪碧等。" },
      { name: "果汁", description: "新鲜果汁与蔬菜汁。" },
      { name: "酒类", description: "啤酒、葡萄酒、鸡尾酒与烈酒。" },
      { name: "其他", description: "奶昔、冰沙、水等其他饮品。" },
    ],
    vi: [
      {
        name: "Cá",
        description: "Các món ăn chế biến từ cá tươi hoặc nấu chín.",
      },
      { name: "Tôm", description: "Các món đặc sản từ tôm biển." },
      { name: "Mực", description: "Các món ăn và món phụ từ mực." },
      { name: "Cua", description: "Các món cua chế biến đa dạng." },
      { name: "Vi cá & Bào ngư", description: "Đặc sản hải sản cao cấp." },
      { name: "Đậu hũ", description: "Các món ăn làm từ đậu nành và đậu hũ." },
      { name: "Rau củ", description: "Các món rau củ lành mạnh." },
      { name: "Trứng", description: "Các món ăn và món phụ từ trứng." },
      { name: "Súp", description: "Các loại súp và nước dùng nóng." },
      { name: "Mì", description: "Các món mì đa dạng." },
      { name: "Cơm", description: "Các món cơm và cơm chiên." },
      { name: "Tráng miệng", description: "Các món ngọt và tráng miệng." },
      {
        name: "Nước ngọt",
        description: "Đồ uống có gas như Coke, Pepsi, Sprite.",
      },
      { name: "Nước ép", description: "Các loại nước ép trái cây và rau củ." },
      {
        name: "Rượu",
        description: "Bia, rượu vang, cocktail và đồ uống có cồn.",
      },
      {
        name: "Khác",
        description: "Sinh tố, sữa lắc, nước lọc và các loại khác.",
      },
    ],
    th: [
      { name: "ปลา", description: "อาหารที่ทำจากปลาสดหรือปรุงสุก." },
      { name: "กุ้ง", description: "เมนูพิเศษจากกุ้งทะเล." },
      { name: "ปลาหมึก", description: "อาหารและของกินเล่นที่ทำจากปลาหมึก." },
      { name: "ปู", description: "อาหารปูในหลากหลายรูปแบบ." },
      { name: "หูฉลามและเป๋าฮื้อ", description: "อาหารทะเลระดับพรีเมียม." },
      { name: "เต้าหู้", description: "อาหารที่ทำจากถั่วเหลืองและเต้าหู้." },
      { name: "ผัก", description: "เมนูผักเพื่อสุขภาพ." },
      { name: "ไข่", description: "อาหารและเครื่องเคียงที่ทำจากไข่." },
      { name: "ซุป", description: "ซุปและน้ำซุปอุ่น ๆ." },
      { name: "ก๋วยเตี๋ยว", description: "เมนูก๋วยเตี๋ยวหลากหลาย." },
      { name: "ข้าว", description: "อาหารจากข้าวและข้าวผัด." },
      { name: "ของหวาน", description: "ของหวานและขนมหวาน." },
      {
        name: "น้ำอัดลม",
        description: "เครื่องดื่มมีฟอง เช่น โค้ก เป๊ปซี่ สไปรท์.",
      },
      { name: "น้ำผลไม้", description: "น้ำผลไม้และน้ำผักสด." },
      { name: "แอลกอฮอล์", description: "เบียร์ ไวน์ ค็อกเทล และเหล้า." },
      { name: "อื่น ๆ", description: "สมูทตี้ มิลค์เชค น้ำเปล่า และอื่น ๆ." },
    ],
  };

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const created = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });

    for (const lang of ["zh", "vi", "th"] as const) {
      const translation = translations[lang][i];
      await prisma.categoryTranslation.upsert({
        where: {
          categoryId_language: {
            categoryId: created.id,
            language: lang,
          },
        },
        update: {},
        create: {
          categoryId: created.id,
          language: lang,
          name: translation.name,
          description: translation.description,
        },
      });
    }
  }

  console.log("✅ Categories + Translations seeded successfully!");
}
