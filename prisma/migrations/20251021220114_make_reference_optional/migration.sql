-- DropForeignKey
ALTER TABLE "public"."Table" DROP CONSTRAINT "Table_referenceId_fkey";

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "referenceId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Table_referenceId_idx" ON "Table"("referenceId");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
