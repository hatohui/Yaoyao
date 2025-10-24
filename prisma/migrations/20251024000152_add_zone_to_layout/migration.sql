-- AlterTable
ALTER TABLE "Layout" ADD COLUMN     "zone" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Layout_zone_idx" ON "Layout"("zone");
