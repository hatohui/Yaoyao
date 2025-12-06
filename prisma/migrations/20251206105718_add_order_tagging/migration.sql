-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "tagType" TEXT NOT NULL DEFAULT 'shared',
ADD COLUMN     "taggedPersonId" UUID;

-- CreateIndex
CREATE INDEX "Order_taggedPersonId_idx" ON "Order"("taggedPersonId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_taggedPersonId_fkey" FOREIGN KEY ("taggedPersonId") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;
