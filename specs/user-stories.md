# User Stories - Yaoyao Dinner Party Planner

## Context

**Application Purpose**: A pre-event dinner party planning system for restaurants. This is NOT a real-time ordering system or customer-facing application. It's designed for pre-order and pre-event coordination where guests can manage their own tables and food selections before the actual event.

## User Roles

### 1. Yaoyao (Verified Admin)

- **Authentication**: `isYaoyao: true` in `useAuthStore`
- **Permissions**: Full CRUD on all resources (tables, orders, foods, layouts, people)
- **Primary Use Cases**:
  - Restaurant owner/manager preparing for dinner party events
  - Planning table arrangements and layouts
  - Managing staging vs production states
  - Finalizing orders and exporting data

### 2. Table Leader

- **Authentication**: Simple security via `tableLeaderId` match (check if user's ID matches `table.tableLeaderId`)
- **Permissions**: Edit table info and people for THEIR assigned table only
- **Primary Use Cases**:
  - Coordinate with their table members
  - Add/remove people from their table
  - Manage pre-orders for their table
  - View their table details

### 3. Guest

- **Authentication**: None required (public access)
- **Permissions**: Read-only access
- **Primary Use Cases**:
  - Browse menu and food options
  - View table arrangements and linked tables
  - See who's attending which tables (no editing)

---

## FEAT-001: CRUD Tables

**Status**: ✅ Implemented (baseline)

**Related Files**:

- `prisma/schema.prisma` - Table model
- `src/repositories/table-repo.ts`
- `src/pages/api/tables/`
- `src/app/dashboard/tables/`

### User Stories

#### Yaoyao (Verified):

- ✅ As Yaoyao, I want to create new tables with name and capacity so I can plan the seating arrangement
- ✅ As Yaoyao, I want to view all tables in a dashboard so I can see the current state at a glance
- ✅ As Yaoyao, I want to update table details (name, capacity, table leader) so I can adjust plans as needed
- ✅ As Yaoyao, I want to delete tables that are no longer needed
- ✅ As Yaoyao, I want to assign a table leader to each table so they can manage their own group

#### Table Leader:

- ✅ As a table leader, I want to view my assigned table details
- ✅ As a table leader, I want to add/remove people from my table
- ✅ As a table leader, I want to see all orders for my table

#### Guest:

- ✅ As a guest, I want to view all tables and their basic information

**Acceptance Criteria**:

- Table creation requires name (string) and capacity (int, default: 2)
- Tables have unique UUIDs
- Deleting a table cascades to orders and removes people associations
- Only Yaoyao can create/delete tables
- Table leaders can only edit their assigned table

---

## FEAT-002: Staging Tables and Admin Planning

**Status**: 📋 Partially Implemented - Needs completion

**Related Files**:

- `prisma/schema.prisma` - `Table.isStaging` field
- `src/repositories/table-repo.ts` - Add staging-specific queries
- `src/pages/api/tables/staging/` - New API routes needed
- `src/app/dashboard/staging/` - New page needed

### User Stories

#### Yaoyao (Verified):

**Core Staging Functionality**:

- ⚠️ As Yaoyao, I want a dedicated staging page (`/dashboard/staging`) where I can plan table arrangements without affecting production
- ⚠️ As Yaoyao, I want to CRUD staging tables (with `isStaging: true`) just like production tables
- ⚠️ As Yaoyao, I want staged data to persist in the database so I can work on plans over multiple sessions
- ⚠️ As Yaoyao, I want a "Copy Production to Staging" button that duplicates all current production tables (including people and orders) into staging mode
- ⚠️ As Yaoyao, I want a "Clear All Staging" button that deletes all records where `isStaging: true` so I can start fresh
- ⚠️ As Yaoyao, I want a "Commit to Production" button that replaces production tables with staged tables (and their people/orders)

**Data Synchronization**:

- ⚠️ As Yaoyao, when I fetch staging data and production has changed, I want to be warned that production is newer so I can decide to refresh staging from production
- ⚠️ As Yaoyao, I want staging and production to be completely isolated - changes in staging don't affect production until I commit

**Visual Differentiation**:

- ⚠️ As Yaoyao, I want staging tables to have a clear visual indicator (badge, color, icon) so I never confuse them with production

#### Table Leader:

- As a table leader, I should NOT see or access staging data (production only)

#### Guest:

- As a guest, I should NOT see or access staging data (production only)

**Acceptance Criteria**:

- Staging page requires `isYaoyao: true` authentication
- Staging tables have `isStaging: true` flag
- Copy operation creates new UUIDs for all duplicated records
- Clear staging operation is irreversible with confirmation dialog
- Commit operation:
  1. Deletes all production tables (`isStaging: false`)
  2. Updates all staging tables to `isStaging: false`
  3. Shows success/failure feedback
- Staging and production queries are filtered by `isStaging` field

**Technical Implementation Notes**:

- Repository functions needed:
  - `getStagingTables()`
  - `copyProductionToStaging()` - Transaction required
  - `clearStagingData()` - Delete where isStaging = true
  - `commitStagingToProduction()` - Transaction required
- API endpoints needed:
  - `POST /api/tables/staging/copy-from-production`
  - `DELETE /api/tables/staging/clear`
  - `POST /api/tables/staging/commit`

---

## FEAT-003: Table Linking

**Status**: 📋 Partially Implemented - Schema exists, UI needed

**Related Files**:

- `prisma/schema.prisma` - `TableLink` model
- `src/repositories/table-repo.ts` - Add link queries
- `src/pages/api/tables/[id]/links/` - New API routes
- `src/components/table/` - New linked table components

### User Stories

#### Yaoyao (Verified):

- ⚠️ As Yaoyao, I want to link multiple tables together (e.g., for large groups split across tables) so guests know they're part of the same party
- ⚠️ As Yaoyao, I want to see linked tables displayed in a "deck stack" style (stacked cards) so the relationship is visually clear
- ⚠️ As Yaoyao, I want to unlink tables when needed
- ⚠️ As Yaoyao, I want to create link groups (e.g., Table A ↔ Table B ↔ Table C) forming a network

#### Table Leader:

- As a table leader, I want to see which tables are linked to mine so I know who else is in our group

#### Guest:

- ✅ As a guest, I want to see which tables are linked together so I understand the seating groups

**Acceptance Criteria**:

- A table can be linked to multiple other tables (many-to-many via TableLink)
- Links are bidirectional (A→B means B→A)
- Cannot link a table to itself
- Linked tables show visual connection (stack cards, connecting lines, or grouped display)
- Unlinking removes the TableLink record
- Linked tables should be displayed together in table views

**Technical Implementation Notes**:

- Repository functions:
  - `linkTables(tableId, table2Id)` - Create bidirectional link
  - `unlinkTables(tableId, table2Id)`
  - `getLinkedTables(tableId)` - Returns all tables linked to given table
  - `getTableLinks(tableId)` - Returns TableLink records
- UI Components:
  - `LinkedTablesStack.tsx` - Deck/stack card view
  - `TableLinkManager.tsx` - Admin interface for linking
  - Update `TableCard.tsx` to show link indicators

---

## FEAT-004: Restaurant Layout & Table Slot Assignment

**Status**: 🆕 New Feature

**Related Files**:

- `prisma/schema.prisma` - `Layout` model (updated schema)
- `src/repositories/layout-repo.ts` - New repo
- `src/pages/api/layouts/` - New API routes
- `src/app/dashboard/layout/` - New layout management page
- `src/components/layout/` - New layout components
- `specs/layout.png` - Reference image of fixed restaurant layout

### Context

The restaurant has a **FIXED** physical layout (see `specs/layout.png`). This feature is about creating "table slots" on that fixed layout and allowing Yaoyao to assign tables to those slots via drag-and-drop.

**Key Concept**:

- Layout slots are pre-defined positions where tables can be placed
- The restaurant layout image is static (not editable)
- Tables can be assigned/swapped between slots
- Think of it as "parking spaces" for tables

### User Stories

#### Yaoyao (Verified):

**Layout Slot Management**:

- 🆕 As Yaoyao, I want to create layout slots on the fixed restaurant layout (e.g., "A1", "B3", "VIP-1") by clicking positions on the layout image
- 🆕 As Yaoyao, I want each slot to have a unique name and x/y coordinates (absolute positioning)
- 🆕 As Yaoyao, I want to view all created slots on the layout as markers/indicators
- 🆕 As Yaoyao, I want to edit slot positions (drag to reposition) and delete slots if needed
- 🆕 As Yaoyao, I want to lock/unlock slots - when locked, slot positions are fixed

**Table Assignment (Drag & Drop)**:

- 🆕 As Yaoyao, I want to see a list of all existing tables (from `Table` model) alongside the layout
- 🆕 As Yaoyao, I want to drag a table from the list and drop it onto a slot to assign it
- 🆕 As Yaoyao, I want to drag a table from one slot to another slot to swap positions
- 🆕 As Yaoyao, I want to remove a table from a slot (unassign) by dragging it back to the table list
- 🆕 As Yaoyao, I want visual feedback showing which slots are occupied vs empty
- 🆕 As Yaoyao, I want to see table names/numbers displayed on occupied slots

**Visual Features**:

- 🆕 As Yaoyao, I want the fixed restaurant layout image as background
- 🆕 As Yaoyao, I want color-coding for slots (empty = gray, occupied = green, linked tables = blue)
- 🆕 As Yaoyao, I want to see table capacity and occupancy displayed on each slot

#### Table Leader & Guest:

- 🆕 As a table leader or guest, I want to view the read-only layout to see where tables are positioned in the restaurant
- 🆕 As a table leader or guest, I want to see my table highlighted on the layout (if I'm a table leader)

### Acceptance Criteria

**Layout Slot System**:

- Layout slots are stored in `Layout` model with `slotName`, `positionX`, `positionY`, `tableId`
- Each slot can have 0 or 1 table assigned (one-to-one relationship)
- Slot positions are absolute coordinates relative to the layout image (e.g., x: 300px, y: 450px)
- Yaoyao can create slots by clicking on the layout image
- Slots can be locked to prevent accidental repositioning

**Table Assignment**:

- Tables exist independently in `Table` model (created via existing CRUD operations)
- Assigning a table to a slot updates `Layout.tableId` field
- Unassigning a table sets `Layout.tableId` to null
- Swapping tables between slots updates both slot records atomically
- A table can only be assigned to one slot at a time

**UI Layout**:

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

**Drag & Drop Behavior**:

- Drag from "Available Tables" → Drop on empty slot → Assign table
- Drag from slot → Drop on another slot → Swap tables (if target occupied) or move (if empty)
- Drag from slot → Drop on "Available Tables" area → Unassign table
- Visual feedback: highlight valid drop zones, show "ghost" table while dragging

**Technical Implementation Notes**:

- **Schema**: `Layout` model updated (see `prisma/schema.prisma`)
  - `slotName`: Unique identifier for the slot (e.g., "A1", "VIP-2")
  - `positionX`, `positionY`: Float values for absolute positioning
  - `tableId`: Nullable foreign key to `Table`
  - `isLocked`: Boolean to prevent accidental changes
- **Repository Functions** (`src/repositories/layout-repo.ts`):

  - `createLayoutSlot(slotName, positionX, positionY)` - Create new slot
  - `updateLayoutSlot(id, data)` - Update slot position or name
  - `deleteLayoutSlot(id)` - Remove slot
  - `assignTableToSlot(slotId, tableId)` - Set tableId on slot
  - `unassignTableFromSlot(slotId)` - Set tableId to null
  - `swapTables(slot1Id, slot2Id)` - Swap tableIds between slots (transaction)
  - `getAllLayoutSlots()` - Get all slots with table details
  - `getSlotByTableId(tableId)` - Find which slot a table is in

- **Component Structure**:

  - `LayoutManager.tsx` - Main container (Yaoyao only, checks `isYaoyao`)
  - `LayoutCanvas.tsx` - Fixed background image with slot markers
  - `LayoutSlot.tsx` - Individual slot component (droppable zone)
  - `TableListSidebar.tsx` - List of available/assigned tables (draggable)
  - `DraggableTable.tsx` - Table component that can be dragged
  - `LayoutViewer.tsx` - Read-only view (for Table Leaders & Guests)

- **Libraries**:

  - use gsap, ref at: https://gsap.com/docs/v3/Plugins/Draggable/

- **Styling**:
  - Fixed layout image as CSS background-image or `<img>` with absolute positioned slots
  - Responsive design: scale layout proportionally on smaller screens
  - Use existing UI components and design system from codebase

**Example Data Flow**:

1. Yaoyao clicks on layout image at coordinates (300, 450)
2. Modal opens: "Create slot at (300, 450)" → Enter slot name "A1" → Submit
3. API: `POST /api/layouts` → Creates `Layout` record with slotName="A1", positionX=300, positionY=450, tableId=null
4. UI re-renders showing new empty slot marker at (300, 450)
5. Yaoyao drags "Table 5" from sidebar and drops on slot "A1"
6. API: `PUT /api/layouts/:id/assign` → Updates `Layout` record setting tableId="table-5-uuid"
7. UI updates showing "Table 5" displayed at slot A1

---

## FEAT-005: Export to Excel

**Status**: 🆕 New Feature

**Related Files**:

- `src/utils/exportToExcel.ts` - New utility
- `src/pages/api/export/excel/` - New API route
- `src/app/dashboard/export/` - New export page or button in dashboard

### User Stories

#### Yaoyao (Verified):

- 🆕 As Yaoyao, I want to export current production data to an Excel file so I can share with kitchen staff or print for the event
- 🆕 As Yaoyao, I want the export to include: table number, table name, capacity, total people, table leader name, all orders (food name, variant, quantity), and member names
- 🆕 As Yaoyao, I want to choose the language for the export (en, th, vi, zh) so it matches my staff's language
- 🆕 As Yaoyao, I want multiple sheets: "Summary", "Tables", "Orders", "Menu"
- 🆕 As Yaoyao, I want the export to calculate totals (total guests, total orders, per-food quantities)

**Export Format Example**:

**Sheet 1: Summary**
| Metric | Value |
|--------|-------|
| Total Tables | 12 |
| Total Guests | 85 |
| Total Orders | 142 |
| Event Date | [user input or current date] |

**Sheet 2: Tables**
| Table # | Table Name | Capacity | Occupancy | Table Leader | Members |
|---------|-----------|----------|-----------|--------------|---------|
| 1 | Family | 6 | 6 | John Doe | John Doe, Jane Doe, ... |

**Sheet 3: Orders by Table**
| Table # | Table Name | Food Name | Variant | Quantity | Price | Total |
|---------|-----------|-----------|---------|----------|-------|-------|
| 1 | Family | Pad Thai | Large | 3 | RM 15 | RM 45 |

**Sheet 4: Menu Summary**
| Food Name | Total Quantity | Total Revenue |
|-----------|----------------|---------------|
| Pad Thai | 15 | RM 225 |

### Acceptance Criteria

- Export button in dashboard (only visible to Yaoyao)
- Language selector before export
- Uses translations from `src/language/*.json` for food names
- Excel file generated server-side using library like `exceljs` or `xlsx`
- File download named `yaoyao-export-[date].xlsx`
- All production data (not staging)
- Handles linked tables (show as grouped or referenced)

**Technical Implementation Notes**:

- Library: `exceljs` (most feature-rich) or `xlsx` (lighter)
- Install: `npm install exceljs`
- Repository function: `getExportData()` - Aggregates all data with joins
- API: `GET /api/export/excel?lang=en` - Returns file stream
- Map food names using translations based on `lang` query param

---

## FEAT-006: Feedback System

**Status**: 🆕 New Feature

**Related Files**:

- `prisma/schema.prisma` - `Feedback` model (already exists)
- `src/repositories/feedback-repo.ts` - New repo
- `src/pages/api/feedback/` - New API routes
- `src/app/feedback/` - New feedback page

### User Stories

#### All Users (Yaoyao, Table Leader, Guest):

- 🆕 As any user, I want to submit feedback about the app or my experience so improvements can be made
- 🆕 As any user, I want to provide my name and optional comments
- 🆕 As any user, I want feedback submission to be simple and accessible from any page (footer link)

#### Yaoyao (Verified):

- 🆕 As Yaoyao, I want to view all submitted feedback in a dashboard
- 🆕 As Yaoyao, I want to filter/search feedback by name or date
- 🆕 As Yaoyao, I want to delete feedback after addressing it

### Acceptance Criteria

- Public feedback form at `/feedback`
- Required: name (by), Optional: content (textarea)
- No authentication required for submission
- Yaoyao-only dashboard at `/dashboard/feedback` to view all feedback
- List view with sorting by date (newest first)
- Simple, accessible UI (mobile-friendly)

**Technical Implementation Notes**:

- Repository functions:
  - `createFeedback(by, content)`
  - `getAllFeedback()` - Yaoyao only
  - `deleteFeedback(id)` - Yaoyao only
- API endpoints:
  - `POST /api/feedback` - Public
  - `GET /api/feedback` - Protected (Yaoyao)
  - `DELETE /api/feedback/[id]` - Protected (Yaoyao)
- Rate limiting recommended on POST to prevent spam

---

## FEAT-007: Credits Page

**Status**: 🆕 New Feature

**Related Files**:

- `src/app/credits/page.tsx` - New page

### User Stories

#### All Users:

- 🆕 As any user, I want to see credits for the app (developer, libraries used, special thanks)
- 🆕 As any user, I want to access credits from the footer

### Acceptance Criteria

- Simple static page at `/credits`
- Includes: developer name, tech stack, open-source libraries, version number
- Accessible to all users
- Optional: link to GitHub repo if open-source

**Content Suggestions**:

- Developed by: [Your Name]
- Tech Stack: Next.js, Prisma, PostgreSQL, TailwindCSS, TanStack Query
- Libraries: [list major dependencies]
- Version: [from package.json]

---

## FEAT-008: Preset Dishes

**Status**: 🆕 New Feature

**Related Files**:

- `prisma/schema.prisma` - May need new `PresetOrder` model or table setting
- `src/repositories/order-repo.ts`
- `src/pages/api/orders/preset/`

### User Stories

#### Yaoyao (Verified):

- 🆕 As Yaoyao, I want to define a preset order (e.g., "Welcome Drink", "Appetizer Sampler") that can be added to tables
- 🆕 As Yaoyao, I want to add a preset order to all tables at once
- 🆕 As Yaoyao, I want to add a preset order to a specific table
- 🆕 As Yaoyao, I want the system to check if a table already has the preset order and skip it to avoid duplicates

#### Table Leader:

- As a table leader, I want to see preset orders clearly marked (e.g., badge "Preset") so I know they were added by the organizer

### Acceptance Criteria

- Preset orders are standard `Order` records with a flag (or tag) indicating they're presets
- "Add Preset to All Tables" button in dashboard
- Adding preset checks existing orders: if table already has that food+variant, skip
- Preset orders can be removed by Yaoyao or Table Leader like any other order

**Technical Implementation Notes**:

- Option 1: Add `isPreset` boolean to Order model
- Option 2: Create separate `PresetOrder` table with template orders
- Repository functions:
  - `addPresetToTable(tableId, foodId, variantId, quantity)`
  - `addPresetToAllTables(foodId, variantId, quantity)`
  - Logic: Check if order exists before adding
- Consider UI for creating/managing preset definitions

---

## FEAT-009: People Management

**Status**: ✅ Implemented (baseline) - May need enhancement

**Related Files**:

- `prisma/schema.prisma` - `People` model
- `src/repositories/people-repo.ts`
- `src/pages/api/people/`
- `src/components/dashboard/PeopleTableCard.tsx`

### User Stories

#### Yaoyao (Verified):

- ✅ As Yaoyao, I can add/remove people to/from any table
- ✅ As Yaoyao, I can view all people across all tables

#### Table Leader:

- ✅ As a table leader, I can add people to my table
- ✅ As a table leader, I can remove people from my table
- ⚠️ As a table leader, I want to be notified if table capacity is exceeded

#### Guest:

- ✅ As a guest, I can view people assigned to tables

### Enhancements Needed:

- ⚠️ Capacity validation: warn when people count > table capacity
- ⚠️ Bulk add people (CSV import?)
- ⚠️ People search/filter across all tables

---

## FEAT-010: Order Management

**Status**: ✅ Implemented (baseline) - May need enhancement

**Related Files**:

- `prisma/schema.prisma` - `Order` model
- `src/repositories/order-repo.ts`
- `src/pages/api/orders/`
- `src/app/dashboard/orders/`

### User Stories

#### Yaoyao (Verified):

- ✅ As Yaoyao, I can view all orders across all tables
- ✅ As Yaoyao, I can add/modify/delete orders for any table
- ⚠️ As Yaoyao, I want to see order totals (quantity, revenue) in dashboard

#### Table Leader:

- ✅ As a table leader, I can add orders to my table
- ✅ As a table leader, I can modify/delete orders from my table
- ✅ As a table leader, I can see all orders for my table

#### Guest:

- ✅ As a guest, I can view orders (read-only)

### Enhancements Needed:

- ⚠️ Order summary dashboard with totals
- ⚠️ Filter orders by table, food category, or date range
- ⚠️ Order status tracking (if needed for kitchen coordination)

---

## Cross-Cutting Concerns

### Authentication & Authorization

- `useAuthStore`: Manages `isYaoyao` state (persisted in localStorage)
- Route protection: Pages for Yaoyao require `isYaoyao` check
- Table leader auth: Compare user ID (to be implemented) with `table.tableLeaderId`
- Consider adding actual user model and JWT if scaling beyond simple boolean

### Internationalization (i18n)

- Current: `src/language/*.json` files (en, th, vi, zh)
- All UI strings should use translation keys
- Food/category names stored with translations via `FoodTranslation` and `CategoryTranslation`
- Export and reports should use selected language

### Responsive Design

- All pages should work on mobile, tablet, desktop
- Layout editor may be desktop-optimized but should have mobile warning/limited view

### Data Validation

- Use Zod or Yup for API request validation
- Prisma schema enforces DB constraints
- Client-side validation in forms for UX

### Error Handling

- API endpoints return structured errors: `{ error: "message", code: "ERROR_CODE" }`
- Client-side error boundaries for React components
- Toast notifications for user feedback (success/error)

### Performance

- TanStack Query for caching and optimistic updates
- Pagination for large lists (tables, orders, feedback)
- Database indexes on foreign keys and frequently queried fields (already in schema)

---

## Implementation Priority

### Phase 1 (MVP) - Core Functionality

1. ✅ FEAT-001: CRUD Tables (done)
2. ✅ FEAT-009: People Management (done)
3. ✅ FEAT-010: Order Management (done)
4. 🆕 FEAT-007: Credits Page (easy win)

### Phase 2 - Admin Planning Tools

5. 🆕 FEAT-002: Staging Tables (high priority for Yaoyao)
6. 🆕 FEAT-003: Table Linking (moderate complexity)
7. 🆕 FEAT-005: Export to Excel (high value for event execution)

### Phase 3 - Enhanced UX

8. 🆕 FEAT-004: Restaurant Layout Editor (complex, high value)
9. 🆕 FEAT-008: Preset Dishes (quality of life)
10. 🆕 FEAT-006: Feedback System (low priority, easy)

---

## Notes for AI Agent

- Always check `isYaoyao` for admin features
- Use transactions for multi-step operations (copy, commit, delete cascades)
- Follow repository pattern - no direct Prisma calls in API routes
- Use TanStack Query hooks for all data fetching
- Keep components small and focused
- Add TypeScript types for all new API shapes in `src/types/api/`
- Test with different roles (Yaoyao, Table Leader, Guest) after implementing auth changes
- Consider edge cases: empty tables, no orders, capacity exceeded, linked table deletion
