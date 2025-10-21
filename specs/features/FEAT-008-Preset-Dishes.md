# FEAT-008: Preset Dishes

**Status**: 🆕 New Feature

**Priority**: P2 (Medium - Useful Admin Feature)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅
- FEAT-010 (Order Management) ✅
- Food/Menu system ✅

## Overview

Allows Yaoyao to define preset orders (e.g., "Welcome Drink", "Appetizer Sampler") and add them to tables automatically. This is useful for standardizing orders across all tables or providing default items that guests can modify later.

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- 🆕 Create/manage preset orders
- 🆕 Add preset to all tables at once
- 🆕 Add preset to specific table(s)
- 🆕 View which tables have which presets

### Table Leader

- ⚠️ See preset orders on their table
- ⚠️ Can remove presets (like any other order)
- ⚠️ Preset orders clearly marked

### Guest

- ⚠️ View preset orders (read-only)

## User Stories

### Yaoyao Stories

- [ ] As Yaoyao, I want to define a preset order (e.g., "Welcome Drink", "Appetizer Sampler") that can be added to tables
- [ ] As Yaoyao, I want to add a preset order to all tables at once
- [ ] As Yaoyao, I want to add a preset order to a specific table or selected tables
- [ ] As Yaoyao, I want the system to check if a table already has the preset order and skip it to avoid duplicates
- [ ] As Yaoyao, I want to save preset templates so I can reuse them for future events
- [ ] As Yaoyao, I want to remove a preset from all tables if plans change

### Table Leader Stories

- [ ] As a table leader, I want to see preset orders clearly marked (e.g., badge "Preset") so I know they were added by the organizer
- [ ] As a table leader, I want to be able to remove preset orders if my table doesn't want them
- [ ] As a table leader, I want to modify preset order quantities if needed

### Guest Stories

- [ ] As a guest, I want to see preset orders so I know what's already planned for my table

## Acceptance Criteria

- [ ] Preset orders are standard `Order` records with a flag indicating they're presets
- [ ] "Add Preset to All Tables" button in dashboard
- [ ] Adding preset checks existing orders: if table already has that food+variant, skip or increment quantity
- [ ] Preset orders can be removed by Yaoyao or Table Leader like any other order
- [ ] Preset templates stored for reuse
- [ ] Visual indicator (badge) on preset orders in UI
- [ ] Bulk operations complete quickly (<5s for 50 tables)

## Data Model Options

### Option 1: Add `isPreset` flag to Order model (simpler)

```prisma
model Order {
  id        String   @id @default(uuid())
  tableId   String
  foodId    String
  variantId String
  quantity  Int
  isPreset  Boolean  @default(false) // ✅ New field
  // ... other fields
}
```

### Option 2: Separate PresetOrder template model (more flexible)

```prisma
model PresetTemplate {
  id          String   @id @default(uuid())
  name        String   // "Welcome Drink", "Appetizer Sampler"
  description String?
  items       PresetItem[]
  createdAt   DateTime @default(now())
}

model PresetItem {
  id              String   @id @default(uuid())
  presetId        String
  foodId          String
  variantId       String
  defaultQuantity Int

  preset          PresetTemplate @relation(fields: [presetId], references: [id], onDelete: Cascade)
  food            Food           @relation(fields: [foodId], references: [id])
}
```

**Recommendation**: Start with Option 1 (simpler), add Option 2 later if needed for complex presets.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Decide on data model approach (Option 1 or 2)
- [ ] Design preset creation UI
- [ ] Plan bulk add logic (add to all tables)
- [ ] Design duplicate detection logic
- [ ] Plan preset badge UI

**References to Study**:

- `prisma/schema.prisma` - Order model
- `src/repositories/order-repo.ts` - Order operations
- `src/components/order/` - Order UI components

### Phase 2: Database Schema 📝

**If using Option 1 (isPreset flag)**:

- [ ] Add `isPreset` field to Order model
  - [ ] Migration: `ALTER TABLE Order ADD COLUMN isPreset BOOLEAN DEFAULT false`
  - [ ] Run: `prisma migrate dev --name add_preset_flag`

**If using Option 2 (PresetTemplate model)**:

- [ ] Create PresetTemplate and PresetItem models
  - [ ] Migration: create new tables
  - [ ] Run: `prisma migrate dev --name add_preset_templates`

**🚨 CHECKPOINT**: Show migration, ask for approval before running

**Reference**: Check existing migrations in `prisma/migrations/`

### Phase 3: Repository Layer 📝

- [ ] Update `src/repositories/order-repo.ts`
  - [ ] `createPresetOrder(tableId, foodId, variantId, quantity)` - Create order with isPreset=true
  - [ ] `addPresetToAllTables(foodId, variantId, quantity)` - Bulk add to all production tables
    - [ ] For each table, check if order exists
    - [ ] If exists with same variant, increment quantity OR skip
    - [ ] If not exists, create new preset order
    - [ ] Use transaction for atomic operation
  - [ ] `addPresetToTables(tableIds[], foodId, variantId, quantity)` - Add to specific tables
  - [ ] `removePresetFromAllTables(foodId, variantId)` - Bulk remove
  - [ ] `getPresetOrders(tableId)` - Get preset orders for a table
  - [ ] `hasPresetOrder(tableId, foodId, variantId)` - Check if table has preset

**If using PresetTemplate model**:

- [ ] Create `src/repositories/preset-repo.ts`
  - [ ] `createPresetTemplate(name, description, items)` - Save preset template
  - [ ] `getPresetTemplates()` - Get all templates
  - [ ] `deletePresetTemplate(id)` - Remove template
  - [ ] `applyPresetToTables(presetId, tableIds)` - Apply preset items to tables

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in `src/repositories/order-repo.ts` and `table-repo.ts`

### Phase 4: Type Definitions 📝

- [ ] Update `src/types/models/order.ts`

  - [ ] Add `isPreset?: boolean` field

- [ ] Create `src/types/api/preset.ts`
  - [ ] `AddPresetToAllRequest` - { foodId, variantId, quantity }
  - [ ] `AddPresetToAllResponse` - { success: boolean, addedCount: number, skippedCount: number }
  - [ ] `AddPresetToTablesRequest` - { tableIds, foodId, variantId, quantity }
  - [ ] `RemovePresetRequest` - { foodId, variantId }
  - [ ] `PresetTemplate` - If using template model

**Reference**: Follow patterns in `src/types/api/order.ts`

### Phase 5: API Layer 📝

- [ ] Create `pages/api/orders/preset/add-to-all.ts`

  - [ ] POST: Add preset to all production tables
    - [ ] Auth check: `isYaoyao === true` (Yaoyao only)
    - [ ] Body: `{ foodId, variantId, quantity }`
    - [ ] Call `addPresetToAllTables()`
    - [ ] Return count of added vs skipped tables
    - [ ] Error handling

- [ ] Create `pages/api/orders/preset/add-to-tables.ts`

  - [ ] POST: Add preset to specific tables
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ tableIds, foodId, variantId, quantity }`
    - [ ] Call `addPresetToTables()`

- [ ] Create `pages/api/orders/preset/remove-from-all.ts`
  - [ ] DELETE: Remove preset from all tables
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ foodId, variantId }`
    - [ ] Call `removePresetFromAllTables()`

**If using PresetTemplate model**:

- [ ] Create `pages/api/presets/index.ts` (CRUD for templates)
- [ ] Create `pages/api/presets/[id]/apply.ts` (Apply template to tables)

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Follow patterns in `pages/api/orders/`

### Phase 6: Hook Layer 📝

- [ ] Create `src/hooks/order/useAddPresetToAll.ts`

  - [ ] Mutation hook: `POST /api/orders/preset/add-to-all`
  - [ ] Invalidate order and table queries on success

- [ ] Create `src/hooks/order/useAddPresetToTables.ts`

  - [ ] Mutation hook: `POST /api/orders/preset/add-to-tables`

- [ ] Create `src/hooks/order/useRemovePresetFromAll.ts`
  - [ ] Mutation hook: `DELETE /api/orders/preset/remove-from-all`

**If using PresetTemplate model**:

- [ ] Create `src/hooks/preset/usePresetTemplates.ts`
- [ ] Create `src/hooks/preset/useCreatePresetTemplate.ts`
- [ ] Create `src/hooks/preset/useApplyPreset.ts`

**Reference**: Follow patterns in `src/hooks/order/`

### Phase 7: Component Layer - Preset Management 📝

- [ ] Create `src/components/preset/AddPresetModal.tsx`

  - [ ] Modal to add preset to tables
  - [ ] Food selector (dropdown or search)
  - [ ] Variant selector
  - [ ] Quantity input
  - [ ] Options:
    - [ ] Radio: "All tables" or "Selected tables"
    - [ ] If selected: multi-select table list
  - [ ] Duplicate handling option:
    - [ ] Radio: "Skip duplicates" or "Increment quantity"
  - [ ] Calls `useAddPresetToAll()` or `useAddPresetToTables()`

- [ ] Create `src/components/preset/PresetBadge.tsx`

  - [ ] Visual badge for preset orders
  - [ ] Props: `isPreset: boolean`
  - [ ] Shows "Preset" tag or icon
  - [ ] Distinct color (e.g., blue)

- [ ] Create `src/components/preset/PresetButton.tsx`
  - [ ] Button to open add preset modal
  - [ ] Only visible to Yaoyao
  - [ ] In dashboard toolbar or orders page

**If using PresetTemplate model**:

- [ ] Create `src/components/preset/PresetTemplateList.tsx` - List saved templates
- [ ] Create `src/components/preset/CreatePresetTemplateModal.tsx` - Create new template
- [ ] Create `src/components/preset/ApplyPresetModal.tsx` - Apply template to tables

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**: Check existing modal and badge components

### Phase 8: UI Integration 📝

- [ ] Update `src/components/order/OrderCard.tsx` (or equivalent)

  - [ ] Add `<PresetBadge>` if order has `isPreset: true`
  - [ ] Different styling for preset orders (optional)

- [ ] Update `src/app/dashboard/orders/page.tsx` (or equivalent)

  - [ ] Add `<PresetButton>` in toolbar
  - [ ] Filter option: "Show only presets" or "Hide presets"

- [ ] Update table view
  - [ ] Show preset orders with badge
  - [ ] Allow table leaders to remove presets

**Reference**: Check existing order UI components

### Phase 9: Duplicate Detection Logic 📝

- [ ] Implement smart duplicate handling:

  - [ ] **Option A (Skip)**: If table already has order with same foodId + variantId, skip
  - [ ] **Option B (Increment)**: If exists, add quantity to existing order
  - [ ] **Option C (User Choice)**: Let Yaoyao choose in modal

- [ ] Return summary after bulk add:
  - [ ] "Added to 10 tables, skipped 5 tables (already had item)"

**Recommendation**: Start with Option A (skip), add Option B later if requested

### Phase 10: Preset Templates (Optional - If using Option 2) 📝

- [ ] Create preset template management page: `src/app/dashboard/presets/page.tsx`

  - [ ] List of saved preset templates
  - [ ] Create new template button
  - [ ] Apply template to tables button
  - [ ] Edit/delete templates

- [ ] Template creation workflow:
  1. Name the template (e.g., "Welcome Package")
  2. Add multiple food items with quantities
  3. Save template
  4. Apply to tables from dashboard

**Note**: This adds complexity. Consider deferring to future enhancement.

### Phase 11: Testing & QA 📝

- [ ] **Functional Testing**:

  - [ ] Add preset to all tables - verify appears on all tables
  - [ ] Add preset to specific tables - verify only those tables get it
  - [ ] Add duplicate preset - verify skip or increment logic works
  - [ ] Remove preset from all tables - verify all removed
  - [ ] Table leader removes preset - verify only from their table
  - [ ] Check database: verify isPreset flag set correctly

- [ ] **Bulk Operation Testing**:

  - [ ] Add preset to 50 tables - verify completes quickly
  - [ ] Verify no timeout or performance issues
  - [ ] Check transaction atomicity (all or nothing)

- [ ] **UI Testing**:

  - [ ] Preset badge visible on orders
  - [ ] Preset badge distinct and clear
  - [ ] Add preset modal easy to use
  - [ ] Duplicate handling clear to user

- [ ] **Auth Testing**:

  - [ ] Yaoyao can add/remove presets
  - [ ] Table leaders can remove presets from their table
  - [ ] Table leaders cannot add presets to other tables
  - [ ] Guests cannot modify presets

- [ ] **Edge Cases**:
  - [ ] Add preset to 0 tables (all already have it) - verify message
  - [ ] Add preset with invalid foodId - verify error
  - [ ] Add preset to table with 100+ existing orders - verify still works
  - [ ] Remove preset that doesn't exist - verify graceful handling

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 12: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document QA test results
- [ ] Document how Yaoyao should use presets
- [ ] Note any limitations or edge cases

## Technical Notes

### Duplicate Detection

**Query to check if order exists**:

```typescript
// Reference: Check existing order query patterns in order-repo.ts
const existingOrder = await prisma.order.findFirst({
  where: {
    tableId,
    foodId,
    variantId,
  },
});
```

**Skip vs Increment**:

- **Skip**: If exists, do nothing. Simpler and safer.
- **Increment**: If exists, update quantity += new quantity. More flexible but may surprise users.

**Recommendation**: Skip by default, add increment as advanced option if requested.

### Bulk Operations Performance

- Use Prisma transaction to ensure atomicity
- Batch creates rather than individual inserts
- For 50+ tables, may take 1-2 seconds (acceptable)
- Consider background job if 100+ tables

**Example Transaction Pattern**:

```typescript
// Reference: Check transaction patterns in table-repo.ts
await prisma.$transaction([prisma.order.createMany({ data: ordersToCreate })]);
```

### Preset Badge Styling

Suggested colors:

- Preset orders: Blue (#3B82F6) or Purple (#8B5CF6)
- Normal orders: Green or default

**Reference**: Check existing badge/tag components for styling

## Files Reference

**New Files to Create**:

- `src/components/preset/AddPresetModal.tsx`
- `src/components/preset/PresetBadge.tsx`
- `src/components/preset/PresetButton.tsx`
- `src/hooks/order/useAddPresetToAll.ts`
- `src/hooks/order/useAddPresetToTables.ts`
- `src/hooks/order/useRemovePresetFromAll.ts`
- `pages/api/orders/preset/add-to-all.ts`
- `pages/api/orders/preset/add-to-tables.ts`
- `pages/api/orders/preset/remove-from-all.ts`
- `src/types/api/preset.ts`

**If using PresetTemplate model (optional)**:

- Migration: add PresetTemplate and PresetItem models
- `src/repositories/preset-repo.ts`
- `src/hooks/preset/*`
- `pages/api/presets/*`
- `src/app/dashboard/presets/page.tsx`

**Files to Modify**:

- `prisma/schema.prisma` - Add isPreset field to Order model
- `src/repositories/order-repo.ts` - Add preset functions
- `src/components/order/OrderCard.tsx` - Add preset badge
- `src/app/dashboard/orders/page.tsx` - Add preset button
- `src/types/models/order.ts` - Add isPreset field

**Reference Files** (Study These First):

- `src/repositories/order-repo.ts` - Order operations
- `src/components/order/` - Order UI components
- `src/hooks/order/` - Order hooks

## QA Testing Steps

### Setup

1. Set `isYaoyao: true` in `useAuthStore`
2. Create 5+ tables
3. Ensure food items exist

### Test: Add Preset to All Tables

1. Navigate to orders page or dashboard
2. Click "Add Preset" button
3. Modal opens
4. Select food: "Welcome Drink"
5. Select variant: "Regular"
6. Set quantity: 1
7. Select "All tables"
8. Click "Add Preset"
9. Verify success message: "Added to 5 tables"
10. Check each table - verify all have "Welcome Drink" with preset badge
11. Check database: verify all orders have isPreset=true

### Test: Skip Duplicates

1. Add preset "Pad Thai" to all tables
2. Try to add same preset again
3. Verify message: "0 tables added, 5 skipped (already have item)"
4. Check tables - verify only 1 order per table, not duplicated

### Test: Add Preset to Specific Tables

1. Click "Add Preset"
2. Select "Selected tables"
3. Check Table 1 and Table 2
4. Select food: "Spring Rolls"
5. Quantity: 2
6. Click "Add"
7. Verify only Table 1 and Table 2 have Spring Rolls
8. Verify preset badge on both

### Test: Remove Preset from All

1. Add preset "Tom Yum Soup" to all tables
2. Click "Remove Preset" (or similar action)
3. Select "Tom Yum Soup"
4. Confirm removal
5. Verify all tables no longer have Tom Yum Soup preset
6. Check database: verify orders deleted

### Test: Table Leader Removes Preset

1. Set Table Leader auth (tableLeaderId = Table 1)
2. Navigate to Table 1 orders
3. See preset orders with badge
4. Click delete on preset order
5. Confirm delete
6. Verify preset removed from Table 1 only
7. Verify other tables still have it

### Test: Visual Indicators

1. View table with preset orders and normal orders
2. Verify preset badge clearly visible
3. Verify preset orders distinct from normal orders
4. Verify badge says "Preset" or similar

### Test: Large Dataset

1. Create 50 tables
2. Add preset to all tables
3. Verify operation completes in <10 seconds
4. Verify all 50 tables have preset
5. Verify no errors or timeouts

### Test: Permissions

1. Set `isYaoyao: false` (guest mode)
2. Verify cannot see "Add Preset" button
3. Try to access preset API directly - verify 403

## Edge Cases & Limitations

- [ ] **Duplicate Handling**: Skip logic may confuse users if they expect increment. Document behavior clearly.
- [ ] **Performance**: Bulk add to 100+ tables may be slow. Consider async job if needed.
- [ ] **Preset Templates**: Not implemented in MVP. Manual selection each time.
- [ ] **Preset Quantity**: Cannot edit default quantity per table easily. All get same quantity.

## Known Risks

- ⚠️ **Accidental Bulk Add**: Adding preset to all tables is irreversible (unless removed). Need clear confirmation.
- ⚠️ **Performance**: Large bulk operations may timeout or slow down server.
- ⚠️ **User Confusion**: Preset vs normal orders may confuse users. Clear visual indicators needed.

## Success Metrics

- [ ] Yaoyao can add presets to all tables in <5 clicks
- [ ] Bulk operations complete quickly
- [ ] No duplicate orders created
- [ ] Table leaders can remove presets if needed
- [ ] Visual indicators clear and helpful

## Future Enhancements

- [ ] **Preset Templates**: Save presets for reuse
- [ ] **Multi-Item Presets**: Add multiple foods at once (e.g., "Welcome Package" with 3 items)
- [ ] **Conditional Presets**: Add preset only to tables with <X capacity
- [ ] **Preset Analytics**: Track which presets are most popular
- [ ] **Scheduled Presets**: Auto-add presets at certain time before event
- [ ] **Preset Variants**: Different presets for different table types

## Notes

- Start simple with isPreset flag
- Can add PresetTemplate model later if users request advanced features
- Focus on bulk operations performance
- Ensure clear visual distinction between preset and normal orders
