/*
  Warnings:

  - You are about to drop the column `index` on the `Table` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Table_index_key";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "index",
ALTER COLUMN "capacity" SET DEFAULT 2;
