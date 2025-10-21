# FEAT-004: Restaurant Layout & Table Slot Assignment

**Status**: 🆕 New Feature

**Priority**: P1 (High - Core Visual Feature)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅
- FEAT-003 (Table Linking) - Recommended (linked tables should show visually on layout)

## Overview

Create a visual restaurant layout system where Yaoyao can assign tables to specific physical positions in the restaurant. The restaurant has a **FIXED** layout image showing the dining room floor plan. This feature adds "table slots" (like parking spaces) on that layout where tables can be placed via drag-and-drop.

**Key Concept**:

- Layout = Background image of restaurant floor plan (static, not editable)
- Slots = Clickable positions where tables can be assigned
- Tables = Existing Table entities (from FEAT-001) that get "parked" in slots

## Visual Reference

See `specs/layout.png` for the fixed restaurant layout image.

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- 🆕 Create/edit/delete layout slots
- 🆕 Assign tables to slots (drag & drop)
- 🆕 Swap tables between slots
- 🆕 Lock/unlock slot positions
- 🆕 View full layout with all assignments

### Table Leader

- 🆕 View read-only layout
- 🆕 See their table highlighted on layout

### Guest

- 🆕 View read-only layout
- 🆕 See all table positions

## User Stories

### Yaoyao Stories

#### Layout Slot Management

- [ ] As Yaoyao, I want to create layout slots on the fixed restaurant layout (e.g., "A1", "B3", "VIP-1") by clicking positions on the layout image
- [ ] As Yaoyao, I want each slot to have a unique name and x/y coordinates (absolute positioning)
- [ ] As Yaoyao, I want to view all created slots on the layout as markers/indicators
- [ ] As Yaoyao, I want to edit slot positions (drag to reposition) and delete slots if needed
- [ ] As Yaoyao, I want to lock/unlock slots - when locked, slot positions are fixed

#### Table Assignment (Drag & Drop)

- [ ] As Yaoyao, I want to see a list of all existing tables (from `Table` model) alongside the layout
- [ ] As Yaoyao, I want to drag a table from the list and drop it onto a slot to assign it
- [ ] As Yaoyao, I want to drag a table from one slot to another slot to swap positions
- [ ] As Yaoyao, I want to remove a table from a slot (unassign) by dragging it back to the table list
- [ ] As Yaoyao, I want visual feedback showing which slots are occupied vs empty
- [ ] As Yaoyao, I want to see table names/numbers displayed on occupied slots

#### Visual Features

- [ ] As Yaoyao, I want the fixed restaurant layout image as background
- [ ] As Yaoyao, I want color-coding for slots (empty = gray, occupied = green, linked tables = blue)
- [ ] As Yaoyao, I want to see table capacity and occupancy displayed on each slot

### Table Leader & Guest Stories

- [ ] As a table leader or guest, I want to view the read-only layout to see where tables are positioned in the restaurant
- [ ] As a table leader or guest, I want to see my table highlighted on the layout (if I'm a table leader)

## Acceptance Criteria

### Layout Slot System

- [ ] Layout slots stored in `Layout` model with `slotName`, `positionX`, `positionY`, `tableId`
- [ ] Each slot can have 0 or 1 table assigned (one-to-one relationship)
- [ ] Slot positions are absolute coordinates relative to layout image (e.g., x: 300px, y: 450px)
- [ ] Yaoyao can create slots by clicking on layout image
- [ ] Slots can be locked to prevent accidental repositioning

### Table Assignment

- [ ] Tables exist independently in `Table` model (created via FEAT-001)
- [ ] Assigning a table to a slot updates `Layout.tableId` field
- [ ] Unassigning a table sets `Layout.tableId` to null
- [ ] Swapping tables between slots updates both slot records atomically
- [ ] A table can only be assigned to one slot at a time

### UI Layout

```
+----------------------------------+--------------------+
|                                  |  Available Tables  |
|     Fixed Restaurant Layout      |  ----------------  |
|     (specs/layout.png)           |  [ ] Table 1 (4)   |
|                                  |  [ ] Table 2 (6)   |
|  [Slot A1: Table 5]              |  [ ] Table 3 (2)   |
|                                  |  ...               |
|  [Slot A2: Empty]                |                    |
|                                  |  Assigned Tables   |
|  [Slot B1: Table 1]              |  ----------------  |
|                                  |  [x] Table 5 (A1)  |
|  ...                             |  [x] Table 1 (B1)  |
|                                  |                    |
+----------------------------------+--------------------+
```

### Drag & Drop Behavior

- [ ] Drag from "Available Tables" → Drop on empty slot → Assign table
- [ ] Drag from slot → Drop on another slot → Swap tables (if target occupied) or move (if empty)
- [ ] Drag from slot → Drop on "Available Tables" area → Unassign table
- [ ] Visual feedback: highlight valid drop zones, show "ghost" table while dragging

## Data Model

```prisma
model Layout {
  id         String   @id @default(uuid())
  slotName   String   @unique // e.g., "A1", "VIP-2"
  positionX  Float    // Absolute X coordinate (pixels or percentage)
  positionY  Float    // Absolute Y coordinate
  tableId    String?  @unique // One-to-one with Table
  isLocked   Boolean  @default(false)

  table      Table?   @relation(fields: [tableId], references: [id], onDelete: SetNull)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

**Note**: Check if migration needed. Schema may already exist partially.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Study `specs/layout.png` - understand restaurant layout
- [ ] Read existing drag-and-drop libraries available
  - [ ] Check if GSAP Draggable is already installed
  - [ ] Check `package.json` for drag-and-drop libraries
- [ ] Design slot marker component (circle, square, or icon?)
- [ ] Plan drag-and-drop interaction flow
- [ ] Design slot creation modal
- [ ] Plan locked slot visual indicator

**References to Study**:

- `specs/layout.png` - Restaurant layout image
- `package.json` - Available libraries
- GSAP Draggable docs: https://gsap.com/docs/v3/Plugins/Draggable/
- `src/config/gsap.ts` - GSAP configuration (if exists)

### Phase 2: Database Schema 📝

- [ ] Check if `Layout` model exists in `prisma/schema.prisma`
- [ ] If not, create migration for Layout model
  - [ ] `slotName` - String, unique
  - [ ] `positionX` - Float
  - [ ] `positionY` - Float
  - [ ] `tableId` - String?, unique (one-to-one)
  - [ ] `isLocked` - Boolean, default false
- [ ] Add `layout` relation to `Table` model (if not exists)
- [ ] Run migration: `prisma migrate dev --name add_layout_slots`

**🚨 CHECKPOINT**: Show migration file, ask for approval before running

**Reference**: Check existing migration files in `prisma/migrations/`

### Phase 3: Repository Layer 📝

- [ ] Create `src/repositories/layout-repo.ts`
  - [ ] `createSlot(slotName, positionX, positionY)` - Create empty slot
  - [ ] `getSlots()` - Get all slots with table data included
  - [ ] `getSlotById(id)` - Get single slot
  - [ ] `updateSlotPosition(id, positionX, positionY)` - Move slot
  - [ ] `deleteSlot(id)` - Remove slot
  - [ ] `assignTableToSlot(slotId, tableId)` - Assign table
  - [ ] `unassignTableFromSlot(slotId)` - Set tableId to null
  - [ ] `swapTablesBetweenSlots(slot1Id, slot2Id)` - Atomic swap
  - [ ] `getSlotByTableId(tableId)` - Find which slot a table is in
  - [ ] `toggleSlotLock(slotId)` - Lock/unlock slot

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in `src/repositories/table-repo.ts`

**Example Patterns**:

```typescript
// Reference only - check actual patterns in table-repo.ts
// - Use Prisma client from common/prisma.ts
// - Include related data with Prisma include
// - Handle errors with try-catch
// - Use transactions for atomic operations
```

### Phase 4: Type Definitions 📝

- [ ] Create `src/types/models/layout.ts`

  - [ ] `Layout` type (mirror Prisma model)
  - [ ] `LayoutSlot` type (Layout with table included)

- [ ] Create `src/types/api/layout.ts`
  - [ ] `CreateSlotRequest` - { slotName, positionX, positionY }
  - [ ] `CreateSlotResponse` - { slot: Layout }
  - [ ] `UpdateSlotPositionRequest` - { positionX, positionY }
  - [ ] `AssignTableRequest` - { tableId }
  - [ ] `AssignTableResponse` - { success: boolean }
  - [ ] `SwapTablesRequest` - { slot1Id, slot2Id }
  - [ ] `GetSlotsResponse` - { slots: LayoutSlot[] }

**Reference**: Follow patterns in `src/types/api/table.ts`

### Phase 5: API Layer 📝

- [ ] Create `pages/api/layouts/index.ts`

  - [ ] GET: Get all slots
    - [ ] Call `getSlots()`
    - [ ] Return array of slots with table data
  - [ ] POST: Create new slot
    - [ ] Auth check: `isYaoyao === true` (Yaoyao only)
    - [ ] Body: `{ slotName, positionX, positionY }`
    - [ ] Call `createSlot()`
    - [ ] Return created slot

- [ ] Create `pages/api/layouts/[id].ts`

  - [ ] GET: Get single slot
  - [ ] PUT: Update slot position
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ positionX, positionY }`
    - [ ] Check if slot is locked - reject if locked
    - [ ] Call `updateSlotPosition()`
  - [ ] DELETE: Delete slot
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Check if slot is locked - reject if locked
    - [ ] Call `deleteSlot()`

- [ ] Create `pages/api/layouts/[id]/assign.ts`

  - [ ] POST: Assign table to slot
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ tableId }`
    - [ ] Validation: table must exist, table not already assigned
    - [ ] Call `assignTableToSlot()`
  - [ ] DELETE: Unassign table from slot
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `unassignTableFromSlot()`

- [ ] Create `pages/api/layouts/swap.ts`

  - [ ] POST: Swap tables between two slots
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ slot1Id, slot2Id }`
    - [ ] Check neither slot is locked
    - [ ] Call `swapTablesBetweenSlots()` (atomic transaction)

- [ ] Create `pages/api/layouts/[id]/lock.ts`
  - [ ] POST: Toggle lock status
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `toggleSlotLock()`

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Follow patterns in `pages/api/tables/[id].ts`

### Phase 6: Hook Layer 📝

- [ ] Create `src/hooks/layout/useLayoutSlots.ts`

  - [ ] Query hook: `GET /api/layouts`
  - [ ] Returns all slots with table data

- [ ] Create `src/hooks/layout/useCreateSlot.ts`

  - [ ] Mutation hook: `POST /api/layouts`
  - [ ] Invalidate layout queries on success

- [ ] Create `src/hooks/layout/useUpdateSlotPosition.ts`

  - [ ] Mutation hook: `PUT /api/layouts/[id]`
  - [ ] Optimistic update for smooth drag experience

- [ ] Create `src/hooks/layout/useDeleteSlot.ts`

  - [ ] Mutation hook: `DELETE /api/layouts/[id]`

- [ ] Create `src/hooks/layout/useAssignTable.ts`

  - [ ] Mutation hook: `POST /api/layouts/[id]/assign`
  - [ ] Invalidate both layout and table queries

- [ ] Create `src/hooks/layout/useUnassignTable.ts`

  - [ ] Mutation hook: `DELETE /api/layouts/[id]/assign`

- [ ] Create `src/hooks/layout/useSwapTables.ts`

  - [ ] Mutation hook: `POST /api/layouts/swap`

- [ ] Create `src/hooks/layout/useToggleSlotLock.ts`
  - [ ] Mutation hook: `POST /api/layouts/[id]/lock`

**Reference**: Follow patterns in `src/hooks/table/useCreateTable.ts`

### Phase 7: Component Layer - Slot Components 📝

- [ ] Create `src/components/layout/LayoutSlot.tsx`

  - [ ] Display a single slot marker on layout
  - [ ] Props: `slot: LayoutSlot`, `isDraggable: boolean`, `onDrop: (tableId) => void`
  - [ ] Absolute positioning using `positionX` and `positionY`
  - [ ] Visual states:
    - [ ] Empty slot: gray circle/square
    - [ ] Occupied slot: green with table name
    - [ ] Linked table slot: blue (check if table has links)
    - [ ] Locked slot: lock icon overlay
  - [ ] GSAP Draggable integration for slot repositioning (Yaoyao only)
  - [ ] Drop zone for table drag & drop
  - [ ] Click handler to open slot details/edit modal

- [ ] Create `src/components/layout/CreateSlotModal.tsx`

  - [ ] Modal to create new slot
  - [ ] Triggered by clicking on layout background (Yaoyao only)
  - [ ] Shows click coordinates
  - [ ] Input: slot name (e.g., "A1", "VIP-2")
  - [ ] Validation: unique slot name
  - [ ] Calls `useCreateSlot()` on submit

- [ ] Create `src/components/layout/SlotControls.tsx`
  - [ ] Floating controls for selected slot
  - [ ] Buttons: "Lock/Unlock", "Delete", "Edit Name"
  - [ ] Only visible when slot selected (Yaoyao only)

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**: Check existing modal/dialog patterns in codebase

### Phase 8: Component Layer - Table Assignment 📝

- [ ] Create `src/components/layout/AvailableTablesList.tsx`

  - [ ] Sidebar showing all unassigned tables
  - [ ] Each table as draggable item (GSAP Draggable)
  - [ ] Props: `tables: Table[]`
  - [ ] Drag ghost shows table name and capacity
  - [ ] Section: "Available Tables" (unassigned)
  - [ ] Section: "Assigned Tables" (with slot name shown)

- [ ] Create `src/components/layout/DraggableTable.tsx`

  - [ ] Individual draggable table item
  - [ ] Props: `table: Table`, `assignedSlot?: string`
  - [ ] GSAP Draggable configuration
  - [ ] Visual: table card with name, capacity, people count
  - [ ] Drag start: clone element as ghost
  - [ ] Drag end: trigger drop handler

- [ ] Create `src/components/layout/LayoutBackground.tsx`
  - [ ] Container for layout image
  - [ ] Background: `specs/layout.png`
  - [ ] Responsive sizing (maintain aspect ratio)
  - [ ] Click handler for creating new slots (Yaoyao only)
  - [ ] Overlay slots on top of image
  - [ ] Grid lines (optional, for alignment)

**Reference**: Check existing card components for styling patterns

### Phase 9: Main Layout Page 📝

- [ ] Create `src/app/dashboard/layout/page.tsx`

  - [ ] Two-column layout:
    - [ ] Left: `<LayoutBackground>` with slots
    - [ ] Right: `<AvailableTablesList>`
  - [ ] Fetch data:
    - [ ] `useLayoutSlots()` - Get all slots
    - [ ] `useTables()` - Get all tables
  - [ ] Drag & drop logic:
    - [ ] Handle drop on slot: call `useAssignTable()`
    - [ ] Handle drop on empty slot: assign table
    - [ ] Handle drop on occupied slot: call `useSwapTables()`
    - [ ] Handle drop on sidebar: call `useUnassignTable()`
  - [ ] Auth guard: Yaoyao can edit, others read-only
  - [ ] Mode toggle: "Edit Mode" vs "View Mode"

- [ ] Update navigation to include layout page
  - [ ] Add link in Yaoyao dashboard sidebar
  - [ ] Add link in public navigation (read-only view)

**🚨 CHECKPOINT**: Show page structure and layout design, ask for approval

**Reference**: Follow `src/app/dashboard/tables/page.tsx` structure

### Phase 10: Read-Only Viewer Component 📝

- [ ] Create `src/components/layout/LayoutViewer.tsx`

  - [ ] Read-only version of layout (for Table Leaders & Guests)
  - [ ] Shows slots and assigned tables
  - [ ] No drag & drop functionality
  - [ ] Highlights user's table (if Table Leader)
  - [ ] Click on slot to see table details (modal)

- [ ] Create public layout page: `src/app/layout-view/page.tsx`
  - [ ] Uses `<LayoutViewer>`
  - [ ] No auth required
  - [ ] Shows table names, capacities, people counts

**Reference**: Check existing read-only components

### Phase 11: GSAP Draggable Integration 📝

- [ ] Install GSAP (if not already): `npm install gsap`
- [ ] Configure GSAP Draggable plugin

  - [ ] Reference: https://gsap.com/docs/v3/Plugins/Draggable/
  - [ ] Check `src/config/gsap.ts` (if exists)

- [ ] Implement drag for slots (position repositioning)

  - [ ] Yaoyao can drag slots to reposition
  - [ ] Update `positionX`, `positionY` on drag end
  - [ ] Call `useUpdateSlotPosition()` mutation
  - [ ] Locked slots cannot be dragged

- [ ] Implement drag for tables (assignment)
  - [ ] Drag from sidebar to slot
  - [ ] Drag from slot to slot (swap)
  - [ ] Drag from slot to sidebar (unassign)
  - [ ] Visual feedback during drag (highlight valid drop zones)

**Reference**: GSAP examples in existing codebase (if any)

**Example GSAP Pattern** (reference only):

```typescript
// Check existing GSAP usage in codebase
// Typical pattern:
// gsap.registerPlugin(Draggable);
// Draggable.create(element, { type: "x,y", onDragEnd: handleDrop });
```

### Phase 12: Visual Polish 📝

- [ ] Color-coding slots:

  - [ ] Empty: Gray (#9CA3AF)
  - [ ] Occupied: Green (#10B981)
  - [ ] Linked table: Blue (#3B82F6)
  - [ ] Locked: Red border (#EF4444)

- [ ] Slot marker design:

  - [ ] Circle or rounded square (consistent with design system)
  - [ ] Size: 60px x 60px (adjust based on layout image scale)
  - [ ] Show table name inside marker
  - [ ] Show capacity badge (e.g., "4/6")

- [ ] Drag ghost styling:

  - [ ] Semi-transparent version of table card
  - [ ] Follow cursor smoothly
  - [ ] Drop preview (show where table will land)

- [ ] Animations:
  - [ ] Slot appears with fade-in when created
  - [ ] Table snaps to slot with smooth transition
  - [ ] Swap animation (tables swap positions)

**Reference**: Check existing animation patterns and design system

### Phase 13: Staging Support 📝

- [ ] Add `isStaging` field to Layout model (if needed)
- [ ] Update repository functions to filter by `isStaging`
- [ ] Layout slots copied when copying production to staging
- [ ] Staging layout page: `src/app/dashboard/staging-layout/page.tsx`

**Reference**: Check FEAT-002 staging patterns

### Phase 14: Testing & QA 📝

- [ ] **Functional Testing**:

  - [ ] Create slot by clicking on layout - verify slot appears
  - [ ] Assign table to slot - verify table displayed on slot
  - [ ] Drag table from slot to slot - verify swap works
  - [ ] Unassign table - verify table returns to sidebar
  - [ ] Lock slot - verify cannot drag or delete
  - [ ] Delete slot - verify slot removed
  - [ ] Try to assign table already assigned - verify error or swap

- [ ] **Drag & Drop Testing**:

  - [ ] Drag table from sidebar to empty slot - verify assignment
  - [ ] Drag table from sidebar to occupied slot - verify swap or error
  - [ ] Drag table from slot to slot - verify swap
  - [ ] Drag table from slot to sidebar - verify unassignment
  - [ ] Drag slot to reposition - verify position updated
  - [ ] Drag locked slot - verify cannot drag

- [ ] **Visual Testing**:

  - [ ] Verify layout image displays correctly
  - [ ] Verify slots positioned accurately on image
  - [ ] Verify color-coding (empty, occupied, linked, locked)
  - [ ] Verify table info displayed on slots
  - [ ] Verify drag ghost appears and follows cursor
  - [ ] Verify animations smooth and performant

- [ ] **Auth Testing**:

  - [ ] Yaoyao: can create, edit, delete slots and assign tables
  - [ ] Table Leader: read-only view, table highlighted
  - [ ] Guest: read-only view, no highlights
  - [ ] API endpoints reject non-Yaoyao requests

- [ ] **Edge Cases**:

  - [ ] Assign same table to two slots (should prevent or auto-unassign from first)
  - [ ] Delete table that's assigned to slot (should unassign automatically)
  - [ ] Create slot with duplicate name (should reject)
  - [ ] Drag outside layout bounds (should snap back or constrain)
  - [ ] Large number of slots (50+) - verify performance

- [ ] **Responsive Testing**:

  - [ ] Test on desktop (1920x1080, 1366x768)
  - [ ] Test on tablet (landscape and portrait)
  - [ ] Test on mobile (may need special layout or zoom)

- [ ] **Cross-Browser Testing**:
  - [ ] Chrome, Firefox, Safari, Edge
  - [ ] GSAP Draggable compatibility

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 15: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document QA test results
- [ ] Create user guide for layout editor (how to use drag & drop)
- [ ] Document GSAP integration patterns for future reference
- [ ] Note any performance optimizations made
- [ ] Screenshot final layout editor for documentation

## Technical Notes

### GSAP Draggable Configuration

**Reference**: https://gsap.com/docs/v3/Plugins/Draggable/

Key configurations to use:

- `type: "x,y"` - Allow dragging in both directions
- `bounds: containerElement` - Constrain dragging within layout bounds
- `onDragEnd: callback` - Trigger API call to update position
- `trigger: element` - Specify drag handle

**Check existing GSAP usage**: Look for GSAP imports in codebase

### Coordinate System

- Use **absolute positioning** (pixels) relative to layout image top-left
- Store coordinates as Float in database (support decimals)
- Consider responsive scaling: coordinates may need to scale with image size
- **Alternative**: Use percentage-based coordinates (0-100%) for better responsiveness

**Decision needed**: Pixels vs Percentages?

### One-to-One Relationship

`Table` ↔ `Layout` is one-to-one:

- A table can be in at most one slot
- A slot can have at most one table

Enforced by:

- `tableId` is unique in Layout model
- Repository functions check if table already assigned

### Atomic Swaps

Swapping tables between slots must be atomic (transaction):

```typescript
// Reference pattern - check actual transaction syntax in table-repo.ts
await prisma.$transaction([
  prisma.layout.update({
    where: { id: slot1Id },
    data: { tableId: slot2TableId },
  }),
  prisma.layout.update({
    where: { id: slot2Id },
    data: { tableId: slot1TableId },
  }),
]);
```

### Performance Considerations

- Fetch all slots and tables in a single query (with Prisma include)
- Use optimistic updates for drag operations (instant UI feedback)
- Debounce position updates during drag (only call API on drag end)
- Consider lazy loading for large restaurant layouts (hundreds of slots)

## Files Reference

**New Files to Create**:

- Migration: `prisma/migrations/[timestamp]_add_layout_slots/migration.sql`
- `src/repositories/layout-repo.ts`
- `src/types/models/layout.ts`
- `src/types/api/layout.ts`
- `pages/api/layouts/index.ts`
- `pages/api/layouts/[id].ts`
- `pages/api/layouts/[id]/assign.ts`
- `pages/api/layouts/swap.ts`
- `pages/api/layouts/[id]/lock.ts`
- `src/hooks/layout/useLayoutSlots.ts`
- `src/hooks/layout/useCreateSlot.ts`
- `src/hooks/layout/useUpdateSlotPosition.ts`
- `src/hooks/layout/useDeleteSlot.ts`
- `src/hooks/layout/useAssignTable.ts`
- `src/hooks/layout/useUnassignTable.ts`
- `src/hooks/layout/useSwapTables.ts`
- `src/hooks/layout/useToggleSlotLock.ts`
- `src/components/layout/LayoutSlot.tsx`
- `src/components/layout/CreateSlotModal.tsx`
- `src/components/layout/SlotControls.tsx`
- `src/components/layout/AvailableTablesList.tsx`
- `src/components/layout/DraggableTable.tsx`
- `src/components/layout/LayoutBackground.tsx`
- `src/components/layout/LayoutViewer.tsx`
- `src/app/dashboard/layout/page.tsx`
- `src/app/layout-view/page.tsx`

**Files to Modify**:

- `prisma/schema.prisma` - Add Layout model (if not exists)
- Navigation components - Add layout link

**Reference Files** (Study These First):

- `specs/layout.png` - Restaurant layout image
- `src/repositories/table-repo.ts` - Repository patterns
- `src/app/dashboard/tables/page.tsx` - Dashboard layout
- `src/components/dashboard/TableCard.tsx` - Card component
- `src/config/gsap.ts` - GSAP configuration (if exists)
- GSAP Draggable docs: https://gsap.com/docs/v3/Plugins/Draggable/

## QA Testing Steps

### Setup

1. Set `isYaoyao: true` in `useAuthStore`
2. Ensure `specs/layout.png` is available
3. Create 5-10 tables via FEAT-001
4. Navigate to `/dashboard/layout`

### Test: Create Slot

1. Click on layout image at a specific position
2. Modal appears with coordinates pre-filled
3. Enter slot name "A1"
4. Click "Create"
5. Verify slot marker appears at clicked position
6. Verify slot is empty (gray color)
7. Check database: verify Layout record created

### Test: Assign Table to Slot

1. Drag "Table 1" from Available Tables list
2. Drop on empty slot "A1"
3. Verify table name appears on slot
4. Verify slot turns green (occupied)
5. Verify "Table 1" moves to "Assigned Tables" section in sidebar
6. Check database: verify Layout.tableId updated

### Test: Swap Tables Between Slots

1. Assign "Table 2" to slot "B1"
2. Drag "Table 1" from slot "A1"
3. Drop on slot "B1" (occupied by Table 2)
4. Verify swap occurs: Table 1 now in B1, Table 2 now in A1
5. Check database: verify both slots updated atomically

### Test: Unassign Table

1. Drag "Table 1" from slot "A1"
2. Drop on "Available Tables" sidebar area
3. Verify table returns to Available Tables list
4. Verify slot "A1" now empty (gray)
5. Check database: verify Layout.tableId set to null

### Test: Reposition Slot

1. Enable "Edit Mode"
2. Drag slot "A1" marker to new position
3. Release drag
4. Verify slot marker remains in new position
5. Check database: verify positionX and positionY updated

### Test: Lock Slot

1. Click on slot "A1"
2. Click "Lock" button in controls
3. Verify lock icon appears on slot
4. Try to drag slot - verify cannot drag (locked)
5. Try to delete slot - verify error or disabled button
6. Click "Unlock" - verify can drag again

### Test: Delete Slot

1. Click on empty slot "B2"
2. Click "Delete" button
3. Confirm deletion dialog
4. Verify slot removed from layout
5. Check database: verify Layout record deleted

### Test: Linked Tables Display

1. Link "Table 1" and "Table 2" (via FEAT-003)
2. Assign both to adjacent slots
3. Verify slots show blue color (linked tables)
4. Optional: verify visual connection line between linked slots

### Test: Read-Only View (Table Leader)

1. Set Table Leader auth (tableLeaderId = Table 1 ID)
2. Navigate to `/layout-view`
3. Verify can see layout with all assignments
4. Verify "Table 1" is highlighted
5. Verify cannot drag or edit slots
6. Click on table slot - verify details modal opens (read-only)

### Test: Read-Only View (Guest)

1. Set Guest auth (isYaoyao = false, no tableLeaderId)
2. Navigate to `/layout-view`
3. Verify can see layout
4. Verify no tables highlighted
5. Verify no edit controls visible

### Test: Edge Cases

1. Try to assign already-assigned table to another slot
   - Should auto-unassign from first slot OR show error
2. Delete a table that's assigned to slot
   - Should auto-unassign (Layout.tableId → null)
3. Create slot with duplicate name "A1"
   - Should reject with error message
4. Drag slot outside layout bounds
   - Should snap back or constrain to bounds

### Test: Performance & Responsiveness

1. Create 50 slots on layout
2. Verify dragging still smooth
3. Verify page load time acceptable
4. Test on mobile device
5. Verify layout scales properly on small screens

## Edge Cases & Limitations

- [ ] **Layout Image Scaling**: Coordinates are absolute pixels. May break if layout image resized. Consider percentage-based coordinates.
- [ ] **Mobile Experience**: Drag & drop may be difficult on touch devices. Consider alternative UI for mobile (tap to select, then tap slot).
- [ ] **Large Restaurants**: 100+ slots may clutter the view. Consider grouping or zoom functionality.
- [ ] **Concurrent Editing**: Multiple Yao users editing at once may cause conflicts. No real-time sync implemented.
- [ ] **Slot Overlap**: No validation to prevent slots from overlapping visually. User must position carefully.

## Known Risks

- ⚠️ **GSAP Dependency**: If GSAP Draggable has issues or licensing concerns, fallback to HTML5 drag & drop or React DnD
- ⚠️ **Coordinate System**: Pixel-based coordinates may not be responsive. May need to switch to percentage-based.
- ⚠️ **Complex Drag Logic**: Swapping, unassigning, and drag states can be tricky to get right. Extensive testing needed.
- ⚠️ **Visual Design**: Getting the slot markers to look good on the layout image may require design iteration.

## Success Metrics

- [ ] Yaoyao can create and position slots easily
- [ ] Drag & drop works smoothly without lag
- [ ] Slot assignments update immediately in UI
- [ ] Read-only view is clear and informative for Table Leaders/Guests
- [ ] No errors or crashes during drag operations
- [ ] Layout is usable on desktop (mobile stretch goal)

## Future Enhancements

- [ ] **Auto-Layout**: Suggest optimal table assignments based on capacity and people
- [ ] **Multi-Layout Support**: Different layouts for different events or rooms
- [ ] **Print View**: Print-friendly version of layout for kitchen/staff
- [ ] **Zoom & Pan**: For large layouts, allow zoom in/out and pan around
- [ ] **Slot Templates**: Pre-defined slot configurations for common restaurant layouts
- [ ] **Connection Lines**: Visual lines connecting linked tables on layout
- [ ] **Real-Time Collaboration**: Multiple users editing layout simultaneously (WebSockets)

## Notes

- This is the most visually complex feature
- GSAP Draggable provides smoothest drag experience, but fallback to simpler library if issues
- Layout image should be high-quality and clear (consider vector SVG if available)
- User testing critical for drag & drop UX - iterate based on feedback
- Consider progressive enhancement: basic click-to-assign first, then add drag & drop
