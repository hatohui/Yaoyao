-- CreateTable
CREATE TABLE "PresetMenu" (
    "id" UUID NOT NULL,
    "foodId" UUID NOT NULL,
    "variantId" UUID,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PresetMenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PresetMenu_foodId_idx" ON "PresetMenu"("foodId");

-- CreateIndex
CREATE INDEX "PresetMenu_isActive_idx" ON "PresetMenu"("isActive");

-- AddForeignKey
ALTER TABLE "PresetMenu" ADD CONSTRAINT "PresetMenu_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresetMenu" ADD CONSTRAINT "PresetMenu_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "FoodVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
