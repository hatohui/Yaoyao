/*
  Warnings:

  - You are about to drop the column `paid` on the `Table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[index]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Table_name_key";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "paid",
ADD COLUMN     "index" SERIAL NOT NULL,
ADD COLUMN     "isStaging" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL,
    "tableId" UUID NOT NULL,
    "by" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableLink" (
    "id" UUID NOT NULL,
    "tableId" UUID NOT NULL,
    "table2Id" UUID NOT NULL,

    CONSTRAINT "TableLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layout" (
    "id" UUID NOT NULL,
    "tableId" UUID NOT NULL,

    CONSTRAINT "Layout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Feedback_tableId_idx" ON "Feedback"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "TableLink_tableId_key" ON "TableLink"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "TableLink_table2Id_key" ON "TableLink"("table2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Layout_tableId_key" ON "Layout"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "Table_index_key" ON "Table"("index");

-- AddForeignKey
ALTER TABLE "TableLink" ADD CONSTRAINT "TableLink_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableLink" ADD CONSTRAINT "TableLink_table2Id_fkey" FOREIGN KEY ("table2Id") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
