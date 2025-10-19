/*
  Warnings:

  - You are about to drop the column `tableId` on the `Feedback` table. All the data in the column will be lost.
  - The primary key for the `Layout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Layout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tableLeaderId]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tableId,table2Id]` on the table `TableLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Layout` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Feedback_tableId_idx";

-- DropIndex
DROP INDEX "public"."TableLink_table2Id_key";

-- DropIndex
DROP INDEX "public"."TableLink_tableId_key";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "tableId";

-- AlterTable
ALTER TABLE "FoodVariant" ALTER COLUMN "currency" SET DEFAULT 'RM';

-- AlterTable
ALTER TABLE "Layout" DROP CONSTRAINT "Layout_pkey",
ADD COLUMN     "content" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Layout_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Table_tableLeaderId_key" ON "Table"("tableLeaderId");

-- CreateIndex
CREATE INDEX "Table_isStaging_idx" ON "Table"("isStaging");

-- CreateIndex
CREATE INDEX "Table_tableLeaderId_idx" ON "Table"("tableLeaderId");

-- CreateIndex
CREATE UNIQUE INDEX "TableLink_tableId_table2Id_key" ON "TableLink"("tableId", "table2Id");

-- AddForeignKey
ALTER TABLE "Layout" ADD CONSTRAINT "Layout_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
