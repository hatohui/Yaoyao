# FEAT-010: Order Management (Enhancements)

**Status**: ✅ Partially Implemented - Needs Enhancements

**Priority**: P2 (Medium - Quality of Life Improvements)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅
- Food/Menu system ✅

## Overview

The baseline order management system is already implemented. This feature focuses on enhancements to improve usability, analytics, filtering, and order tracking for managing food orders at tables.

## Current Implementation (Baseline)

✅ Yaoyao can add/modify/delete orders for any table
✅ Table leaders can add/modify/delete orders for their table
✅ Guests can view orders (read-only)
✅ Basic CRUD operations exist

## User Roles & Permissions

### Yaoyao (isVerified: true)

- ✅ View all orders across all tables
- ✅ Add/modify/delete orders for any table
- ⚠️ View order summary dashboard with totals
- ⚠️ Filter orders by table, food category, or date
- ⚠️ Track order status (optional: pending, confirmed, prepared)
- ⚠️ Generate order reports for kitchen

### Table Leader

- ✅ Add orders to their table
- ✅ Modify/delete orders from their table
- ✅ See all orders for their table
- ⚠️ See order total/count for their table
- ⚠️ Mark orders as finalized (no more changes)

### Guest

- ✅ View orders (read-only)

## User Stories

### Yaoyao Stories

- [x] As Yaoyao, I can view all orders across all tables (already implemented)
- [x] As Yaoyao, I can add/modify/delete orders for any table (already implemented)
- [ ] As Yaoyao, I want to see an order summary dashboard showing total quantities, most popular items, and revenue estimates
- [ ] As Yaoyao, I want to filter orders by table so I can focus on specific groups
- [ ] As Yaoyao, I want to filter orders by food category (appetizer, main, dessert) for kitchen coordination
- [ ] As Yaoyao, I want to filter orders by date range for historical tracking
- [ ] As Yaoyao, I want to track order status (pending, confirmed, prepared, served) for kitchen workflow
- [ ] As Yaoyao, I want to see which tables have not ordered yet
- [ ] As Yaoyao, I want to duplicate orders from one table to another for similar groups
- [ ] As Yaoyao, I want to export order summary by food item for kitchen planning

### Table Leader Stories

- [x] As a table leader, I can add orders to my table (already implemented)
- [x] As a table leader, I can modify/delete orders from my table (already implemented)
- [x] As a table leader, I can see all orders for my table (already implemented)
- [ ] As a table leader, I want to see order count and total for my table at a glance
- [ ] As a table leader, I want to mark my orders as finalized so no one else can change them
- [ ] As a table leader, I want to see if my table's orders are confirmed or pending

### Guest Stories

- [x] As a guest, I can view orders (read-only) (already implemented)
- [ ] As a guest, I want to see the most popular dishes across all tables

## Acceptance Criteria

- [ ] **Order Summary Dashboard**: Shows total orders, unique foods, popular items, total quantity
- [ ] **Filter by Table**: Dropdown to filter orders by specific table
- [ ] **Filter by Category**: Filter by food category (appetizer, main, dessert, drink)
- [ ] **Filter by Date**: Date range picker for historical orders
- [ ] **Order Status**: Optional status field (pending, confirmed, prepared, served)
- [ ] **Tables Without Orders**: List of tables that haven't ordered
- [ ] **Duplicate Orders**: Copy all orders from one table to another
- [ ] **Order Totals**: Show total quantity and item count per table
- [ ] **Export by Food**: List orders grouped by food item for kitchen

## Data Model

### Current

```prisma
model Order {
  id        String   @id @default(uuid())
  tableId   String
  foodId    String
  variantId String
  quantity  Int

  table     Table    @relation(fields: [tableId], references: [id], onDelete: Cascade)
  food      Food     @relation(fields: [foodId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([tableId])
  @@index([foodId])
}
```

### Optional Enhancements

```prisma
model Order {
  // ... existing fields
  status    String?  @default("pending") // "pending", "confirmed", "prepared", "served"
  notes     String?  // Special instructions
  isPreset  Boolean  @default(false)     // From FEAT-008

  @@index([status])
}
```

**Note**: Status field optional. Can be added if kitchen workflow tracking needed.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present enhancement plan to user
- [ ] Prioritize enhancements (which ones are most valuable?)
- [ ] Design order summary dashboard layout
- [ ] Design filter UI (dropdowns, multi-select, date pickers)
- [ ] Design order status workflow (if implementing)
- [ ] Plan duplicate orders feature

**References to Study**:

- `prisma/schema.prisma` - Order model
- `src/repositories/order-repo.ts` - Existing order operations
- `src/app/dashboard/orders/` - Orders dashboard
- `src/components/order/` - Order UI components

### Phase 2: Enhancement 1 - Order Summary Dashboard 📝

- [ ] Create `src/repositories/order-repo.ts` enhancements:

  - [ ] `getOrderSummary()` - Aggregate statistics
    - [ ] Total orders count
    - [ ] Total unique foods
    - [ ] Total quantity sum
    - [ ] Most popular foods (top 10)
    - [ ] Orders per table
    - [ ] Optional: Revenue estimate (if food prices exist)
  - [ ] `getOrdersByFoodId(foodId)` - All orders for a specific food

- [ ] Create `src/components/order/OrderSummaryStats.tsx`

  - [ ] Display summary statistics
  - [ ] Props: `summary: OrderSummary`
  - [ ] Cards showing:
    - [ ] Total Orders
    - [ ] Unique Foods
    - [ ] Total Quantity
    - [ ] Most Popular Item

- [ ] Create `src/components/order/PopularFoodsList.tsx`

  - [ ] List of top 10 most ordered foods
  - [ ] Shows food name, category, total quantity
  - [ ] Sorted by quantity DESC

- [ ] Update `src/app/dashboard/orders/page.tsx`
  - [ ] Add `<OrderSummaryStats>` at top
  - [ ] Add `<PopularFoodsList>` sidebar or section

**🚨 CHECKPOINT**: Show order summary dashboard design, ask for approval

**Reference**: Check existing dashboard components for layout patterns

### Phase 3: Enhancement 2 - Filter Orders 📝

- [ ] Update `src/repositories/order-repo.ts`

  - [ ] `getOrders(filters?)` - Enhanced with filters
    - [ ] `tableId?: string` - Filter by table
    - [ ] `categoryId?: string` - Filter by food category
    - [ ] `dateFrom?: Date` - Filter by date range (start)
    - [ ] `dateTo?: Date` - Filter by date range (end)
    - [ ] `status?: string` - Filter by status (if implemented)
  - [ ] Query uses Prisma where clause with filters

- [ ] Create API: `pages/api/orders/index.ts` enhancement

  - [ ] GET: Accept query params for filters
    - [ ] `?tableId=uuid&categoryId=uuid&dateFrom=2025-01-01&dateTo=2025-12-31&status=pending`
  - [ ] Call `getOrders(filters)`

- [ ] Create `src/components/order/OrderFilters.tsx`

  - [ ] Filter controls:
    - [ ] Table dropdown (all tables)
    - [ ] Category dropdown (all categories)
    - [ ] Date range picker
    - [ ] Status dropdown (if implemented)
  - [ ] "Clear Filters" button
  - [ ] Apply button or auto-filter on change

- [ ] Update orders dashboard page
  - [ ] Add `<OrderFilters>` component
  - [ ] Pass filter state to useOrders() hook
  - [ ] Display filtered results

**🚨 CHECKPOINT**: Show filter UI, ask for approval

**Reference**: Check existing filter/search patterns (e.g., SearchBar.tsx)

### Phase 4: Enhancement 3 - Order Status Tracking (Optional) 📝

**Note**: This enhancement adds complexity. Confirm with user if kitchen workflow tracking is needed.

- [ ] Add `status` field to Order model

  - [ ] Migration: `ALTER TABLE Order ADD COLUMN status VARCHAR(50) DEFAULT 'pending'`
  - [ ] Enum values: "pending", "confirmed", "prepared", "served"

- [ ] Update repository functions to support status

  - [ ] `updateOrderStatus(orderId, status)` - Update status
  - [ ] `getOrdersByStatus(status)` - Filter by status

- [ ] Create API: `pages/api/orders/[id]/status.ts`

  - [ ] PUT: Update order status
  - [ ] Auth check: Yaoyao or Table Leader (their table only)

- [ ] Create `src/hooks/order/useUpdateOrderStatus.ts`

  - [ ] Mutation hook for status updates

- [ ] Create `src/components/order/OrderStatusBadge.tsx`

  - [ ] Display status with color-coding:
    - [ ] Pending: Gray
    - [ ] Confirmed: Blue
    - [ ] Prepared: Orange
    - [ ] Served: Green
  - [ ] Props: `status: string`

- [ ] Create `src/components/order/OrderStatusDropdown.tsx`

  - [ ] Dropdown to change status
  - [ ] Only visible to Yaoyao (or kitchen staff role)

- [ ] Update order list/cards to show status badge

**🚨 CHECKPOINT**: Show order status workflow, ask if needed

**Recommendation**: Defer to future enhancement unless kitchen workflow is critical

### Phase 5: Enhancement 4 - Tables Without Orders 📝

- [ ] Update `src/repositories/table-repo.ts`

  - [ ] `getTablesWithoutOrders()` - Query tables where order count = 0
    - [ ] LEFT JOIN orders, filter where orders.id IS NULL

- [ ] Create API: `pages/api/tables/without-orders.ts`

  - [ ] GET: List tables with no orders
  - [ ] Auth check: Yaoyao only

- [ ] Create `src/hooks/table/useTablesWithoutOrders.ts`

  - [ ] Query hook

- [ ] Create `src/components/order/TablesWithoutOrders.tsx`

  - [ ] List component showing tables with 0 orders
  - [ ] Warning banner: "X tables have not ordered yet"
  - [ ] Link to each table

- [ ] Add to orders dashboard
  - [ ] Show at top if any tables without orders
  - [ ] Collapsible section

**🚨 CHECKPOINT**: Show UI for tables without orders

### Phase 6: Enhancement 5 - Duplicate Orders 📝

- [ ] Update `src/repositories/order-repo.ts`

  - [ ] `duplicateOrders(sourceTableId, targetTableId)` - Copy orders
    - [ ] Fetch all orders from source table
    - [ ] Create new orders for target table with same foodId, variantId, quantity
    - [ ] Use Prisma createMany for efficiency
    - [ ] Transaction for atomicity

- [ ] Create API: `pages/api/orders/duplicate.ts`

  - [ ] POST: Duplicate orders
  - [ ] Body: `{ sourceTableId, targetTableId }`
  - [ ] Auth check: Yaoyao only

- [ ] Create `src/hooks/order/useDuplicateOrders.ts`

  - [ ] Mutation hook

- [ ] Create `src/components/order/DuplicateOrdersModal.tsx`

  - [ ] Modal to select source and target tables
  - [ ] Dropdown: source table (with order count)
  - [ ] Dropdown: target table
  - [ ] Preview: "This will copy X orders from Table A to Table B"
  - [ ] Confirm button

- [ ] Add "Duplicate Orders" button to orders dashboard
  - [ ] Yaoyao only

**🚨 CHECKPOINT**: Show duplicate orders flow, ask for approval

**Use Case**: Family table orders same items, want to copy to Friends table

### Phase 7: Enhancement 6 - Order Totals per Table 📝

- [ ] Update `src/repositories/table-repo.ts`

  - [ ] `getTableWithOrderCount(id)` - Include order count and total quantity
  - [ ] Aggregate: COUNT(orders), SUM(quantity)

- [ ] Update `src/components/dashboard/TableCard.tsx`

  - [ ] Display order statistics:
    - [ ] "5 orders (12 items total)"
    - [ ] Or: "No orders yet"
  - [ ] Visual indicator: badge or small text

- [ ] Update table detail view
  - [ ] Show order summary at top
  - [ ] Total orders, total quantity, most ordered item

**Reference**: Check existing TableCard component

### Phase 8: Enhancement 7 - Export Orders by Food Item 📝

**Note**: This may overlap with FEAT-005 (Export to Excel). Coordinate if needed.

- [ ] Create `src/utils/exportOrdersByFood.ts`

  - [ ] Function to generate CSV or Excel
  - [ ] Group orders by foodId
  - [ ] Columns: Food Name, Category, Total Quantity, Tables Ordered, Variants

- [ ] Create API: `pages/api/orders/export-by-food.ts`

  - [ ] GET: Export orders grouped by food
  - [ ] Auth check: Yaoyao only
  - [ ] Return CSV or Excel file

- [ ] Add "Export by Food" button to orders dashboard
  - [ ] Yaoyao only
  - [ ] Downloads file: `orders-by-food-[date].csv`

**Alternative**: Integrate with FEAT-005 Export to Excel (Menu Summary sheet)

**🚨 CHECKPOINT**: Confirm if standalone export needed or use FEAT-005

### Phase 9: Testing & QA 📝

- [ ] **Order Summary Testing**:

  - [ ] Create orders across multiple tables
  - [ ] Navigate to orders dashboard
  - [ ] Verify summary stats correct (total orders, unique foods, etc.)
  - [ ] Verify popular foods list shows top items
  - [ ] Verify counts match database

- [ ] **Filter Testing**:

  - [ ] Filter by Table 1 - verify shows only Table 1 orders
  - [ ] Filter by Appetizer category - verify shows only appetizers
  - [ ] Filter by date range - verify shows orders in range
  - [ ] Combine filters - verify works correctly
  - [ ] Clear filters - verify shows all orders again

- [ ] **Status Tracking Testing** (if implemented):

  - [ ] Create order with status "pending"
  - [ ] Update status to "confirmed" - verify updates
  - [ ] Filter by status "confirmed" - verify shows only confirmed
  - [ ] Verify status badge color-coding correct

- [ ] **Tables Without Orders Testing**:

  - [ ] Create 3 tables, add orders to 2
  - [ ] Navigate to orders dashboard
  - [ ] Verify banner shows "1 table has not ordered yet"
  - [ ] Verify list shows Table 3

- [ ] **Duplicate Orders Testing**:

  - [ ] Create 5 orders on Table 1
  - [ ] Click "Duplicate Orders"
  - [ ] Select source: Table 1, target: Table 2
  - [ ] Confirm
  - [ ] Verify Table 2 now has same 5 orders
  - [ ] Verify Table 1 orders unchanged

- [ ] **Order Totals Testing**:

  - [ ] Create orders on Table 1 (3 orders, 10 total quantity)
  - [ ] View Table 1 card
  - [ ] Verify shows "3 orders (10 items)"
  - [ ] Verify accurate

- [ ] **Export Testing** (if standalone):

  - [ ] Click "Export by Food"
  - [ ] Open file
  - [ ] Verify grouped by food
  - [ ] Verify totals correct

- [ ] **Permissions Testing**:
  - [ ] Yaoyao can access all features
  - [ ] Table leaders can only see their table orders
  - [ ] Guests read-only

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 10: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document filter usage
- [ ] Document duplicate orders workflow
- [ ] Note any performance considerations
- [ ] Update user guide if needed

## Technical Notes

### Order Summary Aggregation

**Prisma Aggregation Example**:

```typescript
// Reference: Check existing aggregation patterns
const summary = await prisma.order.aggregate({
  _count: { id: true },
  _sum: { quantity: true },
});

const popularFoods = await prisma.order.groupBy({
  by: ["foodId"],
  _sum: { quantity: true },
  orderBy: { _sum: { quantity: "desc" } },
  take: 10,
});
```

**Performance**: Aggregations may be slow with 1000+ orders. Consider caching or materialized views.

### Filter Performance

- Ensure indexes on `tableId`, `foodId`, `createdAt`, `status` fields
- Use Prisma where clause efficiently
- Consider pagination for large result sets

### Date Filtering

- Use date-fns or native Date for date range filtering
- Store dates as DateTime in Prisma (ISO format)

### Duplicate Orders

- Use Prisma `createMany()` for bulk insert (efficient)
- Wrap in transaction to ensure atomicity
- Handle errors gracefully (e.g., target table doesn't exist)

### Status Workflow

If implementing status tracking:

- Define state machine (pending → confirmed → prepared → served)
- Prevent invalid transitions (e.g., served → pending)
- Consider notifications when status changes

## Files Reference

**New Files to Create**:

- `src/components/order/OrderSummaryStats.tsx`
- `src/components/order/PopularFoodsList.tsx`
- `src/components/order/OrderFilters.tsx`
- `src/components/order/OrderStatusBadge.tsx` (if status tracking)
- `src/components/order/OrderStatusDropdown.tsx` (if status tracking)
- `src/components/order/TablesWithoutOrders.tsx`
- `src/components/order/DuplicateOrdersModal.tsx`
- `src/hooks/order/useUpdateOrderStatus.ts` (if status tracking)
- `src/hooks/order/useDuplicateOrders.ts`
- `src/hooks/table/useTablesWithoutOrders.ts`
- `src/utils/exportOrdersByFood.ts` (if standalone export)
- `pages/api/orders/[id]/status.ts` (if status tracking)
- `pages/api/orders/duplicate.ts`
- `pages/api/orders/export-by-food.ts` (if standalone)
- `pages/api/tables/without-orders.ts`

**Files to Modify**:

- `prisma/schema.prisma` - Add status field to Order (if implementing)
- `src/repositories/order-repo.ts` - Add enhancement functions
- `src/repositories/table-repo.ts` - Add tables without orders function
- `src/components/dashboard/TableCard.tsx` - Add order totals
- `src/app/dashboard/orders/page.tsx` - Add summary, filters, buttons
- Existing order components - Add status badges

**Reference Files** (Study These First):

- `src/repositories/order-repo.ts` - Existing order operations
- `src/app/dashboard/orders/` - Orders dashboard
- `src/components/order/` - Order UI components
- `src/hooks/order/` - Order hooks

## QA Testing Steps

### Test: Order Summary Dashboard

1. Create 10 orders across 3 tables
2. Navigate to `/dashboard/orders`
3. Verify summary stats:
   - Total Orders: 10
   - Unique Foods: 5 (or actual count)
   - Total Quantity: sum of all quantities
   - Popular Foods: list of top items
4. Verify numbers accurate

### Test: Filter by Table

1. In orders dashboard, select "Table 1" from table filter
2. Verify only Table 1 orders shown
3. Verify other tables' orders hidden
4. Clear filter - verify all orders shown again

### Test: Filter by Category

1. Select "Appetizer" from category filter
2. Verify only appetizer orders shown
3. Verify main courses and desserts hidden

### Test: Filter by Date Range

1. Create orders on different dates
2. Set date range: Jan 1 - Jan 31
3. Verify only orders in range shown
4. Change range - verify updates

### Test: Duplicate Orders

1. Table 1 has 5 orders
2. Click "Duplicate Orders" button
3. Select source: Table 1
4. Select target: Table 2
5. Preview shows: "Copy 5 orders from Table 1 to Table 2"
6. Confirm
7. Verify success toast
8. Check Table 2 - verify 5 new orders (same foods/quantities)

### Test: Tables Without Orders

1. Create 5 tables, add orders to 3
2. Navigate to orders dashboard
3. Verify banner: "2 tables have not ordered yet"
4. Expand section - verify lists Table 4 and Table 5
5. Click on Table 4 - verify navigates to that table

### Test: Order Totals on Table Card

1. Table 1 has 3 orders (quantities: 2, 4, 5 = total 11)
2. View Table 1 card on dashboard
3. Verify shows "3 orders (11 items)"
4. Create new order - verify updates

## Edge Cases & Limitations

- [ ] **Large Datasets**: Aggregations slow with 10,000+ orders. Consider pagination or caching.
- [ ] **Duplicate Orders**: Duplicating 100+ orders may timeout. Consider batching or async job.
- [ ] **Filter Combinations**: Complex filter combinations may be slow. Optimize queries.
- [ ] **Status Workflow**: If implemented, requires careful state management and validation.

## Known Risks

- ⚠️ **Performance**: Order summary aggregations may be slow on large datasets
- ⚠️ **Duplicate Errors**: Duplicating to table with existing orders may cause confusion
- ⚠️ **Status Confusion**: If status tracking added, kitchen staff must update consistently

## Success Metrics

- [ ] Order summary helps Yaoyao understand ordering patterns
- [ ] Filters allow quick focus on specific tables/categories
- [ ] Duplicate orders saves time for similar tables
- [ ] Tables without orders list ensures no table is missed

## Future Enhancements

- [ ] **Order Notes**: Add special instructions field (allergies, preferences)
- [ ] **Order History**: Track changes to orders over time (audit log)
- [ ] **Order Templates**: Save common order combinations
- [ ] **Kitchen Display**: Separate view for kitchen staff showing orders by status
- [ ] **Order Notifications**: Notify table leaders when order status changes
- [ ] **Revenue Tracking**: Calculate total revenue if food prices exist
- [ ] **Order Analytics**: Charts showing ordering trends over time

## Notes

- Focus on high-value enhancements first (summary, filters, duplicate)
- Defer status tracking unless kitchen workflow is critical requirement
- Coordinate with FEAT-005 (Export) to avoid duplication
- Keep UI simple - don't overwhelm with too many features
- Performance testing critical for aggregations with large datasets
