/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PresetMenu` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `PresetMenu` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PresetMenu` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."PresetMenu_isActive_idx";

-- AlterTable
ALTER TABLE "PresetMenu" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt";
