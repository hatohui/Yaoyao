import { PrismaClient } from "@prisma/client";
import { tables } from "../data/table_data";

const prisma = new PrismaClient();

export async function seedTables() {
  let seeded = 0;

  for (const t of tables) {
    const res = await prisma.table.updateMany({
      where: { name: t.name },
      data: { capacity: t.capacity },
    });
    if (res.count === 0) {
      await prisma.table.create({ data: t });
    }

    seeded += 1;
  }

  console.log(`✅ Seeded ${seeded} tables`);
}
