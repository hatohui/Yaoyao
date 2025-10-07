import { PrismaClient } from "@prisma/client";
import { categories, translations } from "../data/category_data";
const prisma = new PrismaClient();

export async function seedCategories() {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const created = await prisma.category.upsert({
      where: { name: category.name },
      update: { description: category.description },
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
        update: {
          name: translation.name,
          description: translation.description,
        },
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
