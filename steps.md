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

- [x] Layout slots stored in `Layout` model with `id`, `positionX`, `positionY`, `zone`, `tableId`
- [x] Each slot can have 0 or 1 table assigned (one-to-one relationship)
- [x] Slot positions are absolute coordinates relative to layout image (e.g., x: 300px, y: 450px)
- [x] Slots have zone field to organize by floor/area
- [x] Lock state is client-side only (UI state, not persisted)
- [ ] Yaoyao can create slots by clicking on layout image

### Table Assignment

- [x] Tables exist independently in `Table` model (created via FEAT-001)
- [x] Assigning a table to a slot updates `Layout.tableId` field
- [x] Unassigning a table sets `Layout.tableId` to null
- [x] Swapping tables between slots updates both slot records atomically
- [x] A table can only be assigned to one slot at a time
- [x] Client filters tables into assigned/unassigned from single data source

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
  id         Int      @id @default(autoincrement())
  positionX  Float    // Absolute X coordinate (pixels or percentage)
  positionY  Float    // Absolute Y coordinate
  zone       Int      @default(1) // Floor/zone number (1 = ground floor, 2 = second floor, etc.)
  tableId    String?  @unique @db.Uuid // One-to-one with Table

  table      Table?   @relation(fields: [tableId], references: [id], onDelete: SetNull)

  @@index([zone])
}
```

**Key Changes from Spec:**

- Using `Int` ID (auto-increment) instead of UUID for simpler slot numbering
- Added `zone` field to support multiple floors/areas
- `isLocked` is client-side UI state only (not persisted)
- Removed `slotName` - using numeric ID as slot identifier
- No timestamps needed for layout slots

**API Strategy:**

- Single endpoint `GET /layouts` returns all layouts with tables
- Client-side filtering for assigned/unassigned tables
- Simpler and more efficient than multiple endpoints

## Implementation Checklist

### Phase 1: Core Infrastructure ✅

- [x] Create useUnassignedTables hook in hooks/layout
- [x] Create useAssignedTables hook in hooks/layout
- [x] Add assignTableToSlot mutation in useLayoutMutations
- [x] Add unassignTable mutation in useLayoutMutations
- [x] Add deleteSlot mutation in useLayoutMutations
- [x] Add swapTables mutation in useLayoutMutations

### Phase 2: UI Components ✅

- [x] Create LayoutSidebar component with collapsible sections
- [x] Create DraggableTableItem component for sidebar
- [x] Enhance LayoutSlot with color coding and improved display
- [x] Create SlotActionModal for delete/unassign options
- [x] Add slot creation on click functionality

### Phase 3: Drag & Drop Logic ✅

- [x] Implement drop zone detection (slot-to-slot, sidebar-to-slot, slot-to-sidebar)
- [x] Add visual drag feedback (ghost element, highlights)
- [x] Implement table swap logic between slots
- [x] Add lock state with API call prevention
- [x] Integrate all drag operations in RestaurantLayout

### Phase 4: Visual Enhancements ✅

- [x] Add color coding (empty=gray, occupied=green, linked=blue)
- [x] Display table capacity and occupancy on slots
- [x] Add linked tables visual indicator
- [x] Responsive layout adjustments
- [x] Loading skeletons and error states

### Phase 5: Testing & Polish ✅

- [x] Test all drag-drop scenarios
- [x] Fix bugs and edge cases
- [x] Add animations and transitions
- [x] Final UI polish
- [x] Add help/instructions modal
- [x] Mobile responsive sidebar
- [x] Empty state messaging
