/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `slotName` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `isStaging` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `originTableId` on the `Table` table. All the data in the column will be lost.
  - Added the required column `referenceId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Layout_slotName_key";

-- DropIndex
DROP INDEX "public"."Table_isStaging_idx";

-- DropIndex
DROP INDEX "public"."Table_originTableId_idx";

-- AlterTable
ALTER TABLE "Layout" DROP COLUMN "createdAt",
DROP COLUMN "isLocked",
DROP COLUMN "slotName",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "isStaging",
DROP COLUMN "originTableId",
ADD COLUMN     "referenceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
