# FEAT-001: CRUD Tables

**Status**: ✅ Implemented (baseline)

**Priority**: P0 (Foundation)

**Dependencies**: None (baseline feature)

## Overview

Basic table management system allowing Yaoyao to create, read, update, and delete tables for dinner party planning. This is the foundation feature that other features build upon.

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- ✅ Full CRUD access on all tables
- ✅ Can assign table leaders
- ✅ Can view all tables

### Table Leader

- ✅ View their assigned table
- ✅ Edit people on their table
- ✅ View orders for their table

### Guest

- ✅ Read-only access to all tables

## User Stories

### Yaoyao Stories

- [x] As Yaoyao, I want to create new tables with name and capacity so I can plan the seating arrangement
- [x] As Yaoyao, I want to view all tables in a dashboard so I can see the current state at a glance
- [x] As Yaoyao, I want to update table details (name, capacity, table leader) so I can adjust plans as needed
- [x] As Yaoyao, I want to delete tables that are no longer needed
- [x] As Yaoyao, I want to assign a table leader to each table so they can manage their own group

### Table Leader Stories

- [x] As a table leader, I want to view my assigned table details
- [x] As a table leader, I want to add/remove people from my table
- [x] As a table leader, I want to see all orders for my table

### Guest Stories

- [x] As a guest, I want to view all tables and their basic information

## Acceptance Criteria

- [x] Table creation requires name (string) and capacity (int, default: 2)
- [x] Tables have unique UUIDs
- [x] Deleting a table cascades to orders and removes people associations
- [x] Only Yaoyao can create/delete tables
- [x] Table leaders can only edit their assigned table

## Data Model

```prisma
model Table {
  id            String   @id @default(uuid())
  name          String
  capacity      Int      @default(2)
  tableLeaderId String?
  isStaging     Boolean  @default(false)

  // Relations
  people        People[]
  orders        Order[]
  layout        Layout?
  linkedTables  TableLink[] @relation("TableLinks")
  linkedBy      TableLink[] @relation("LinkedByTables")

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Implementation Checklist

### Phase 1: Planning ✅

- [x] Read user story requirements
- [x] Identify data models (Table, People, Order relationships)
- [x] Plan API endpoints (REST conventions)
- [x] Sketch component hierarchy
- [x] List acceptance criteria

### Phase 2: Types & Data Layer ✅

- [x] Create TypeScript types in `src/types/models/table.ts`
- [x] Create API request/response types in `src/types/api/table.ts`
- [x] Implement repository functions in `src/repositories/table-repo.ts`
  - [x] `createTable(name, capacity, tableLeaderId?)`
  - [x] `getTables(isStaging?)`
  - [x] `getTableById(id)`
  - [x] `updateTable(id, data)`
  - [x] `deleteTable(id)`
  - [x] `getTablesByLeaderId(leaderId)`

### Phase 3: API Layer ✅

- [x] Create `pages/api/tables/index.ts` (GET list, POST create)
- [x] Create `pages/api/tables/[id].ts` (GET single, PUT update, DELETE)
- [x] Add authentication middleware checks
- [x] Add input validation
- [x] Add error handling (400, 403, 404, 500)

### Phase 4: Hook Layer ✅

- [x] Create `src/hooks/table/useTables.ts` (TanStack Query)
- [x] Create `src/hooks/table/useTable.ts` (single table)
- [x] Create `src/hooks/table/useCreateTable.ts` (mutation)
- [x] Create `src/hooks/table/useUpdateTable.ts` (mutation)
- [x] Create `src/hooks/table/useDeleteTable.ts` (mutation)
- [x] Configure query keys and cache invalidation

### Phase 5: Component Layer ✅

- [x] Create `src/components/dashboard/TableCard.tsx`
- [x] Create table list components
- [x] Create table form components (create/edit)
- [x] Add loading states
- [x] Add error states
- [x] Add success feedback (toasts)

### Phase 6: Page Integration ✅

- [x] Create/update `src/app/dashboard/tables/page.tsx`
- [x] Create table detail view
- [x] Implement authentication guards
- [x] Implement role-based access control
- [x] Add mobile responsive design

### Phase 7: Quality Assurance ✅

- [x] Refactor duplicated code
- [x] Split large components (< 200 lines)
- [x] Add error handling at each layer
- [x] Test with different user roles (Yaoyao, Table Leader, Guest)
- [x] Test edge cases (delete with orders, capacity validation)
- [x] Test on mobile, tablet, desktop
- [x] Verify internationalization

## Files Reference

**Existing Files (Reference These)**:

- `src/repositories/table-repo.ts` - Repository patterns
- `src/types/models/table.ts` - Type definitions
- `src/types/api/table.ts` - API contracts
- `src/hooks/table/*` - Hook patterns
- `src/components/dashboard/TableCard.tsx` - Component structure
- `src/app/dashboard/tables/page.tsx` - Page layout
- `pages/api/tables/*` - API route structure

## QA Testing Steps

### As Yaoyao (isYaoyao: true)

1. ✅ Navigate to `/dashboard/tables`
2. ✅ Click "Create Table" button
3. ✅ Fill form: name="Family", capacity=6
4. ✅ Submit - verify table appears in list
5. ✅ Click edit on table - verify form pre-fills
6. ✅ Update capacity to 8 - verify saves
7. ✅ Assign table leader - verify updates
8. ✅ Delete table - verify confirmation dialog
9. ✅ Confirm delete - verify table removed and cascade works

### As Table Leader

1. ✅ Set `useAuthStore` with tableLeaderId matching a table
2. ✅ Navigate to tables page
3. ✅ Verify can only see assigned table
4. ✅ Verify cannot create/delete tables
5. ✅ Verify can add/remove people from table
6. ✅ Verify can view orders for table

### As Guest

1. ✅ Set `useAuthStore` with isYaoyao=false, no tableLeaderId
2. ✅ Navigate to tables page
3. ✅ Verify can view all tables (read-only)
4. ✅ Verify no edit/delete buttons visible
5. ✅ Verify cannot access create forms

## Edge Cases & Limitations

- [x] **Cascade Delete**: Deleting a table removes all associated orders and people relationships
- [x] **Capacity Validation**: System allows exceeding capacity (warning needed in FEAT-009)
- [x] **Table Leader**: Currently stored as string ID (needs user model for full auth)
- [x] **Concurrency**: No optimistic locking (last write wins)

## Known Issues

- ⚠️ No warning when adding people exceeds capacity (tracked in FEAT-009)
- ⚠️ Table leader authentication is simplified (string comparison)
- ⚠️ No audit trail for table changes

## Next Steps

- This feature is complete and serves as baseline
- Other features build on this foundation
- Enhancements tracked in FEAT-009 (People Management)

## Notes

This is a baseline feature already implemented. Use the existing code as reference patterns for new features. Key patterns to follow:

- Repository layer uses Prisma with proper error handling
- API routes are thin and delegate to repositories
- Hooks use TanStack Query for server state
- Components are split into presentational pieces
- Types are defined separately from implementations
