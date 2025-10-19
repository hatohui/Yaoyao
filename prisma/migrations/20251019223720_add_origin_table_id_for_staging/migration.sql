/*
  Warnings:

  - The primary key for the `Layout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Layout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slotName]` on the table `Layout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `positionX` to the `Layout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionY` to the `Layout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotName` to the `Layout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Layout` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Layout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Layout" DROP CONSTRAINT "Layout_tableId_fkey";

-- AlterTable
ALTER TABLE "Layout" DROP CONSTRAINT "Layout_pkey",
DROP COLUMN "content",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "positionX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "positionY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "slotName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "tableId" DROP NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Layout_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "originTableId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Layout_slotName_key" ON "Layout"("slotName");

-- CreateIndex
CREATE INDEX "Table_originTableId_idx" ON "Table"("originTableId");

-- AddForeignKey
ALTER TABLE "Layout" ADD CONSTRAINT "Layout_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
