# FEAT-003: Table Linking

**Status**: 📋 Partially Implemented - Schema Exists, UI Needed

**Priority**: P2 (Medium - Enhances User Experience)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅
- FEAT-002 (Staging) - Should support staging tables too

## Overview

Allows Yaoyao to create logical links between tables for large parties split across multiple tables. For example, a family of 15 people might occupy 3 tables (A, B, C). Linking them together shows guests they're part of the same party and enables coordinated planning.

## Visual Concept

**Deck Stack Display**: Linked tables appear as stacked cards, similar to how playing cards are fanned out. This creates a clear visual indication that these tables are connected.

```
┌─────────────────┐
│   Table A (4)   │ ← Top card (primary)
│ ┌──────────────┐│
│ │  Table B (6) ││ ← Stacked behind
│ │ ┌───────────┐││
│ │ │ Table C (5)│││ ← Stacked behind
│ │ └───────────┘││
│ └──────────────┘│
└─────────────────┘
```

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- ⚠️ Link multiple tables together
- ⚠️ Unlink tables
- ⚠️ Create link groups (A ↔ B ↔ C network)
- ⚠️ View all linked table relationships

### Table Leader

- ⚠️ View which tables are linked to their table
- ❌ Cannot create/remove links (Yaoyao only)

### Guest

- ✅ View linked tables (already supported via schema)

## User Stories

### Yaoyao Stories

- [ ] As Yaoyao, I want to link multiple tables together (e.g., for large groups split across tables) so guests know they're part of the same party
- [ ] As Yaoyao, I want to see linked tables displayed in a "deck stack" style (stacked cards) so the relationship is visually clear
- [ ] As Yaoyao, I want to unlink tables when needed
- [ ] As Yaoyao, I want to create link groups (e.g., Table A ↔ Table B ↔ Table C) forming a network
- [ ] As Yaoyao, I want to see all table links at a glance in the dashboard

### Table Leader Stories

- [ ] As a table leader, I want to see which tables are linked to mine so I know who else is in our group
- [ ] As a table leader, when I view my table, I want to see linked tables displayed nearby

### Guest Stories

- [x] As a guest, I want to see which tables are linked together so I understand the seating groups

## Acceptance Criteria

- [ ] A table can be linked to multiple other tables (many-to-many via TableLink)
- [ ] Links are bidirectional (A→B means B→A automatically)
- [ ] Cannot link a table to itself
- [ ] Linked tables show visual connection (stack cards, connecting lines, or grouped display)
- [ ] Unlinking removes the TableLink record (and its reverse)
- [ ] Linked tables should be displayed together in table views
- [ ] Link operations work in both staging and production modes
- [ ] Bulk link operation available (e.g., "Link selected tables")

## Data Model

```prisma
model TableLink {
  id       String @id @default(uuid())
  tableId  String
  table2Id String

  table    Table  @relation("TableLinks", fields: [tableId], references: [id], onDelete: Cascade)
  table2   Table  @relation("LinkedByTables", fields: [table2Id], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@unique([tableId, table2Id])
  @@index([tableId])
  @@index([table2Id])
}
```

**Note**: Schema already exists. No migration needed.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Read `prisma/schema.prisma` - understand TableLink model
- [ ] Study existing table components for visual integration
- [ ] Design "deck stack" card component mockup
- [ ] Plan link creation UI (modal vs inline)
- [ ] Decide on link deletion UX (individual vs bulk)

**References to Study**:

- `prisma/schema.prisma` - TableLink model structure
- `src/repositories/table-repo.ts` - Repository patterns
- `src/components/dashboard/TableCard.tsx` - Card component to enhance
- `src/app/dashboard/tables/page.tsx` - Dashboard layout

### Phase 2: Repository Layer 📝

- [ ] Update `src/repositories/table-repo.ts` with link functions
  - [ ] `linkTables(tableId, table2Id)` - Create bidirectional link
    - [ ] Validation: cannot link table to itself
    - [ ] Create TableLink record
    - [ ] Create reverse TableLink record (table2Id → tableId)
    - [ ] Handle duplicate prevention (check existing links)
  - [ ] `unlinkTables(tableId, table2Id)` - Remove bidirectional link
    - [ ] Delete both TableLink records (A→B and B→A)
  - [ ] `getTableLinks(tableId)` - Get all tables linked to this table
    - [ ] Return array of Table objects
    - [ ] Include both directions (tables this table links to + tables linking to it)
  - [ ] `getTableLinkIds(tableId)` - Get just the linked table IDs
  - [ ] `areTablesLinked(tableId, table2Id)` - Boolean check

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in existing `table-repo.ts` functions

**Example Query Pattern** (reference only):

```typescript
// Check existing Prisma include patterns in table-repo.ts
// Use similar pattern to fetch linked tables
```

### Phase 3: Type Definitions 📝

- [ ] Create/update `src/types/api/table-link.ts`
  - [ ] `LinkTablesRequest` - { tableId, table2Id }
  - [ ] `LinkTablesResponse` - { success, message }
  - [ ] `UnlinkTablesRequest` - { tableId, table2Id }
  - [ ] `GetTableLinksResponse` - { linkedTables: Table[] }
  - [ ] `BulkLinkTablesRequest` - { tableIds: string[] }

**Reference**: Follow patterns in `src/types/api/table.ts`

### Phase 4: API Layer 📝

- [ ] Create `pages/api/tables/[id]/links/index.ts`

  - [ ] GET: Get all linked tables for this table
    - [ ] Call `getTableLinks(tableId)`
    - [ ] Return array of linked Table objects
  - [ ] POST: Link this table to another table
    - [ ] Auth check: `isYaoyao === true` (Yaoyao only)
    - [ ] Body: `{ table2Id }`
    - [ ] Call `linkTables(tableId, table2Id)`
    - [ ] Return success message

- [ ] Create `pages/api/tables/[id]/links/[linkId].ts`

  - [ ] DELETE: Unlink this table from another table
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `unlinkTables(tableId, linkId)`
    - [ ] Return success message

- [ ] Create `pages/api/tables/links/bulk.ts`
  - [ ] POST: Link multiple tables together
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Body: `{ tableIds: string[] }`
    - [ ] Create links between all pairs (full mesh)
    - [ ] Return success count

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Follow patterns in `pages/api/tables/[id].ts`

### Phase 5: Hook Layer 📝

- [ ] Create `src/hooks/table/useTableLinks.ts`

  - [ ] Query hook: `GET /api/tables/[id]/links`
  - [ ] Returns linked tables for a given table

- [ ] Create `src/hooks/table/useLinkTables.ts`

  - [ ] Mutation hook: `POST /api/tables/[id]/links`
  - [ ] Invalidate table queries on success

- [ ] Create `src/hooks/table/useUnlinkTables.ts`

  - [ ] Mutation hook: `DELETE /api/tables/[id]/links/[linkId]`
  - [ ] Invalidate table queries on success

- [ ] Create `src/hooks/table/useBulkLinkTables.ts`
  - [ ] Mutation hook: `POST /api/tables/links/bulk`
  - [ ] Invalidate table queries on success

**Reference**: Follow patterns in `src/hooks/table/useCreateTable.ts`

### Phase 6: Component Layer - Core Link Components 📝

- [ ] Create `src/components/table/LinkedTablesStack.tsx`

  - [ ] **Deck Stack Display Component**
  - [ ] Props: `tables: Table[]`, `primaryTableId: string`
  - [ ] Visual: Stack cards with offset (CSS transforms)
  - [ ] Primary table on top, linked tables behind
  - [ ] Click to expand/collapse stack
  - [ ] Show capacity totals for all linked tables

- [ ] Create `src/components/table/LinkButton.tsx`

  - [ ] Button to open link modal
  - [ ] Props: `tableId: string`
  - [ ] Only visible to Yaoyao

- [ ] Create `src/components/table/LinkModal.tsx`

  - [ ] Modal to select tables to link
  - [ ] Checkbox list of available tables
  - [ ] Cannot select current table
  - [ ] Shows already linked tables (greyed out)
  - [ ] Confirm/Cancel buttons
  - [ ] Calls `useLinkTables()` on submit

- [ ] Create `src/components/table/LinkedTablesBadge.tsx`
  - [ ] Small badge showing link count
  - [ ] Example: "🔗 2 linked tables"
  - [ ] Click to expand full list

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**: Check existing modal/dialog patterns in codebase

### Phase 7: Component Layer - Visual Integration 📝

- [ ] Update `src/components/dashboard/TableCard.tsx`

  - [ ] Check if table has links via `useTableLinks()`
  - [ ] If linked, render `<LinkedTablesStack>` instead of single card
  - [ ] If not linked, render single card as before
  - [ ] Add `<LinkedTablesBadge>` indicator
  - [ ] Add link/unlink buttons (Yaoyao only)

- [ ] Create `src/components/table/UnlinkButton.tsx`

  - [ ] Button to remove a specific link
  - [ ] Props: `tableId: string`, `linkedTableId: string`
  - [ ] Confirmation dialog before unlinking
  - [ ] Calls `useUnlinkTables()`

- [ ] Update table list view
  - [ ] Group linked tables together visually
  - [ ] Option to collapse/expand linked groups

**Reference**: Study `src/components/dashboard/TableCard.tsx` current structure

### Phase 8: Dashboard Integration 📝

- [ ] Update `src/app/dashboard/tables/page.tsx`

  - [ ] Add "Bulk Link" feature:
    - [ ] Multi-select mode (checkboxes on cards)
    - [ ] "Link Selected Tables" button
    - [ ] Confirmation dialog showing which tables will be linked
    - [ ] Calls `useBulkLinkTables()`
  - [ ] Filter options:
    - [ ] "Show only linked tables"
    - [ ] "Show only unlinked tables"
    - [ ] "Show all"

- [ ] Add visual indicators:
  - [ ] Linked tables highlighted or grouped
  - [ ] Connection lines between linked cards (optional, may be complex)

**Reference**: Follow existing page layout patterns

### Phase 9: Staging Support 📝

- [ ] Ensure link operations work with staging tables

  - [ ] Repository functions filter by `isStaging` where needed
  - [ ] API routes accept `isStaging` query param
  - [ ] Staging page includes link functionality
  - [ ] Links are copied when copying production to staging

- [ ] Update `copyProductionToStaging()` in table-repo.ts
  - [ ] Copy TableLink records along with tables
  - [ ] Update table IDs to new staging table UUIDs

**Reference**: Check FEAT-002 implementation for staging patterns

### Phase 10: Testing & QA 📝

- [ ] **Functional Testing**:

  - [ ] Link two tables - verify bidirectional link created
  - [ ] Link three tables in a group - verify all pairs linked
  - [ ] Unlink tables - verify both link records deleted
  - [ ] Try to link table to itself - verify error
  - [ ] Link already linked tables - verify idempotent (no error)
  - [ ] Delete a linked table - verify cascade delete removes links

- [ ] **Visual Testing**:

  - [ ] Verify deck stack display renders correctly
  - [ ] Verify stack cards are offset properly (CSS)
  - [ ] Verify click to expand/collapse works
  - [ ] Verify linked badge shows correct count
  - [ ] Test with 2 linked tables
  - [ ] Test with 5+ linked tables (edge case)

- [ ] **Auth Testing**:

  - [ ] Yaoyao can create/delete links
  - [ ] Table leaders can only view links
  - [ ] Guests can only view links
  - [ ] API endpoints reject non-Yaoyao requests for POST/DELETE

- [ ] **Staging Testing**:

  - [ ] Link staging tables - verify works
  - [ ] Copy production to staging - verify links copied
  - [ ] Commit staging to production - verify links preserved

- [ ] **Edge Cases**:

  - [ ] Link large number of tables (10+) - verify performance
  - [ ] Concurrent link operations - verify no race conditions
  - [ ] Link tables with different capacities - verify UI handles
  - [ ] Linked tables in different languages - verify translations

- [ ] **Mobile/Responsive Testing**:
  - [ ] Deck stack display on mobile
  - [ ] Link modal on mobile
  - [ ] Touch interactions for expanding/collapsing

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 11: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document QA test results
- [ ] Document any UX decisions made (e.g., why deck stack vs other styles)
- [ ] Add screenshots of deck stack display
- [ ] Note performance considerations for large link groups

## Technical Notes

### Bidirectional Linking

When linking Table A to Table B, two records are created:

1. `TableLink(tableId: A, table2Id: B)`
2. `TableLink(tableId: B, table2Id: A)`

This allows efficient querying in either direction.

**Reference**: Check existing many-to-many patterns in Prisma schema

### Deck Stack CSS Pattern

Example pattern (check existing CSS/Tailwind patterns in codebase):

```css
/* Reference only - use existing styling approach */
.linked-table-stack {
  position: relative;
}

.linked-table-stack .table-card:nth-child(2) {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: -1;
}

.linked-table-stack .table-card:nth-child(3) {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: -2;
}
```

**Reference**: Check how existing cards are styled in `TableCard.tsx`

### Performance Considerations

- For large link groups (10+ tables), consider lazy loading linked table details
- Use Prisma `select` to fetch only needed fields
- Add indexes on `tableId` and `table2Id` (already in schema)

### Alternative UI Approaches

If deck stack is too complex:

- **Option B**: Simple list with connecting lines
- **Option C**: Grouped cards with shared border
- **Option D**: Badge showing link count, expand to see all

**Decision**: Deck stack is preferred for visual impact, but simpler option can be fallback.

## Files Reference

**New Files to Create**:

- `pages/api/tables/[id]/links/index.ts`
- `pages/api/tables/[id]/links/[linkId].ts`
- `pages/api/tables/links/bulk.ts`
- `src/hooks/table/useTableLinks.ts`
- `src/hooks/table/useLinkTables.ts`
- `src/hooks/table/useUnlinkTables.ts`
- `src/hooks/table/useBulkLinkTables.ts`
- `src/components/table/LinkedTablesStack.tsx`
- `src/components/table/LinkButton.tsx`
- `src/components/table/LinkModal.tsx`
- `src/components/table/LinkedTablesBadge.tsx`
- `src/components/table/UnlinkButton.tsx`
- `src/types/api/table-link.ts`

**Files to Modify**:

- `src/repositories/table-repo.ts` - Add link functions
- `src/components/dashboard/TableCard.tsx` - Add link display
- `src/app/dashboard/tables/page.tsx` - Add bulk link feature
- `src/app/dashboard/staging/page.tsx` - Add link support (if FEAT-002 done)

**Reference Files** (Study These First):

- `prisma/schema.prisma` - TableLink model
- `src/repositories/table-repo.ts` - Repository patterns
- `src/components/dashboard/TableCard.tsx` - Card component
- `src/hooks/table/*` - Hook patterns

## QA Testing Steps

### Setup

1. Set `isYaoyao: true` in `useAuthStore`
2. Create 5 production tables
3. Navigate to `/dashboard/tables`

### Test: Link Two Tables

1. Click on Table A
2. Click "Link Tables" button
3. Select Table B from modal
4. Click "Confirm"
5. Verify success toast
6. Verify Table A and B now show deck stack display
7. Verify link badge shows "🔗 1 linked table"
8. Check database: verify two TableLink records (A→B and B→A)

### Test: Link Multiple Tables (Network)

1. Click "Bulk Link" button
2. Select Tables C, D, E (3 tables)
3. Click "Link Selected Tables"
4. Confirm bulk link dialog
5. Verify success toast
6. Verify all three tables now show deck stack together
7. Verify link badge shows "🔗 2 linked tables" on each
8. Check database: verify 6 TableLink records (all pairs)

### Test: Unlink Tables

1. Click on linked Table A
2. Click "Unlink" button next to Table B
3. Confirm unlink dialog
4. Verify success toast
5. Verify Table A and B now separate
6. Verify deck stack no longer shows them together
7. Check database: verify both link records deleted

### Test: Visual Display

1. Link 3 tables together
2. Verify deck stack shows all 3 as stacked cards
3. Click on stack - verify expands to show all tables
4. Verify primary table on top
5. Verify linked tables offset behind
6. Test on mobile - verify responsive layout

### Test: Cannot Link to Self

1. Try to link Table A to Table A
2. Verify error message or prevention (checkbox disabled)

### Test: Permissions

1. Set `isYaoyao: false` (guest mode)
2. View tables page
3. Verify can see linked tables (deck stack)
4. Verify no "Link" or "Unlink" buttons visible

### Test: Cascade Delete

1. Link Table F to Table G
2. Delete Table F
3. Verify Table G no longer shows as linked
4. Check database: verify TableLink records deleted

### Test: Staging Support

1. Link tables in production
2. Copy production to staging
3. Verify staging tables also show as linked
4. Verify new UUIDs in staging TableLink records
5. Edit staging links
6. Commit staging to production
7. Verify production links updated

## Edge Cases & Limitations

- [ ] **Large Link Groups**: Deck stack may be cluttered with 10+ tables. Consider pagination or collapse.
- [ ] **Circular Links**: System allows any link pattern (tree, mesh, star). No validation of "sensible" groupings.
- [ ] **Link Semantics**: No concept of "primary" table in a group (all equal). May need enhancement if user feedback suggests hierarchy needed.
- [ ] **Visual Complexity**: Deck stack requires good CSS. Fallback to simple list if implementation too complex.

## Known Risks

- ⚠️ **CSS Complexity**: Deck stack display may be challenging to get right, especially with dynamic table counts
- ⚠️ **Performance**: Querying links for many tables may cause N+1 queries. Optimize with Prisma includes.
- ⚠️ **UX Confusion**: Users may not understand what "linked" means. Need clear help text or onboarding.

## Success Metrics

- [ ] Yaoyao can link tables with 2 clicks
- [ ] Linked tables are visually distinct and easy to identify
- [ ] Deck stack display renders correctly in all cases
- [ ] No performance degradation with linked tables
- [ ] Table leaders and guests understand linked table concept

## Future Enhancements

- [ ] **Link Groups with Names**: Name a link group (e.g., "Smith Family", "Corporate Team A")
- [ ] **Link Hierarchy**: Designate one table as "primary" in a group
- [ ] **Link Analytics**: Show statistics (total capacity of linked group, total orders)
- [ ] **Shared Orders**: Option to merge orders across linked tables
- [ ] **Notification**: Alert table leaders when new table linked to their group

## Notes

- Deck stack is the preferred visual style, but implementation may reveal UX challenges
- If deck stack proves too complex, pivot to simpler badge + list view
- Consider user feedback after implementation for visual refinements
