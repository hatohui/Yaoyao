/*
  Warnings:

  - The primary key for the `Layout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Layout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Layout" DROP CONSTRAINT "Layout_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Layout_pkey" PRIMARY KEY ("id");
