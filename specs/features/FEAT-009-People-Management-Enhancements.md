# FEAT-009: People Management (Enhancements)

**Status**: ✅ Partially Implemented - Needs Enhancements

**Priority**: P2 (Medium - Quality of Life Improvements)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅

## Overview

The baseline people management system is already implemented. This feature focuses on enhancements to improve usability, validation, and bulk operations for managing guests assigned to tables.

## Current Implementation (Baseline)

✅ Yaoyao can add/remove people to/from any table
✅ Table leaders can add/remove people from their table  
✅ Guests can view people assigned to tables
✅ Basic CRUD operations exist

## User Roles & Permissions

### Yaoyao (isVerified: true)

- ✅ Add/remove people to/from any table
- ✅ View all people across all tables
- ⚠️ Bulk add people (CSV import)
- ⚠️ Search/filter people across tables
- ⚠️ Export people list

### Table Leader

- ✅ Add people to their table
- ✅ Remove people from their table
- ⚠️ See capacity warning when exceeding limit
- ⚠️ Reorder people in table

### Guest

- ✅ View people assigned to tables

## User Stories

### Yaoyao Stories

- [x] As Yaoyao, I can add/remove people to/from any table (already implemented)
- [x] As Yaoyao, I can view all people across all tables (already implemented)
- [ ] As Yaoyao, I want to bulk import people from a CSV file so I can quickly populate tables for large events
- [ ] As Yaoyao, I want to search for a person across all tables so I can find which table they're assigned to
- [ ] As Yaoyao, I want to filter people by table so I can focus on specific groups
- [ ] As Yaoyao, I want to see capacity warnings on tables that exceed their limit
- [ ] As Yaoyao, I want to export people list to CSV/Excel for printing or sharing
- [ ] As Yaoyao, I want to move a person from one table to another easily (drag & drop or modal)

### Table Leader Stories

- [x] As a table leader, I can add people to my table (already implemented)
- [x] As a table leader, I can remove people from my table (already implemented)
- [ ] As a table leader, I want to be notified if table capacity is exceeded so I know to adjust
- [ ] As a table leader, I want to reorder people in my table for seating preferences
- [ ] As a table leader, I want to see total people count vs capacity at a glance

### Guest Stories

- [x] As a guest, I can view people assigned to tables (already implemented)

## Acceptance Criteria

- [ ] **Capacity Validation**: Visual warning when people count > table capacity
- [ ] **Bulk Import**: CSV upload with format: name, tableId (or table name)
- [ ] **Search**: Search across all people by name (returns table assignment)
- [ ] **Filter**: Filter people list by table
- [ ] **Move Person**: Transfer person from one table to another
- [ ] **Export**: Export people list to CSV or Excel
- [ ] **Capacity Display**: Show "X/Y" format (e.g., "6/4" with warning for over capacity)

## Data Model

```prisma
model People {
  id        String   @id @default(uuid())
  by        String   // Person's name
  tableId   String

  table     Table    @relation(fields: [tableId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([tableId])
}
```

**Note**: Model already exists. No schema changes needed for basic enhancements.

**Optional Enhancement**: Add `position` field for ordering:

```prisma
position  Int?     // For manual ordering within table
```

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present enhancement plan to user
- [ ] Prioritize enhancements (which ones are most valuable?)
- [ ] Design capacity warning UI
- [ ] Design bulk import CSV format
- [ ] Design person search/filter UI
- [ ] Design person move/transfer UI

**References to Study**:

- `prisma/schema.prisma` - People model
- `src/repositories/people-repo.ts` - Existing people operations
- `src/components/dashboard/PeopleTableCard.tsx` - People UI

### Phase 2: Enhancement 1 - Capacity Validation & Warning 📝

- [ ] Update `src/repositories/table-repo.ts`

  - [ ] Add `getTableWithPeopleCount(id)` - Returns table with people count
  - [ ] Add `isTableOverCapacity(tableId)` - Boolean check

- [ ] Update `src/components/dashboard/TableCard.tsx`

  - [ ] Display occupancy: "6/4" or "4/6"
  - [ ] Add warning icon/color if over capacity (red/orange)
  - [ ] Tooltip: "Table is over capacity by 2 people"

- [ ] Update people add form
  - [ ] Show warning before adding if would exceed capacity
  - [ ] Allow override (just warning, not blocking)

**🚨 CHECKPOINT**: Show capacity warning UI, ask for approval

**Reference**: Check existing validation patterns

### Phase 3: Enhancement 2 - Bulk Import (CSV) 📝

- [ ] Create `src/utils/parsePeopleCSV.ts`

  - [ ] Parse CSV file: columns = name, tableId (or tableName)
  - [ ] Validation: name required, table must exist
  - [ ] Return array of people to create + errors

- [ ] Update `src/repositories/people-repo.ts`

  - [ ] `bulkCreatePeople(people[])` - Create multiple people at once
    - [ ] Use Prisma `createMany()` for efficiency
    - [ ] Transaction for atomicity

- [ ] Create API: `pages/api/people/bulk-import.ts`

  - [ ] POST: Upload CSV file
  - [ ] Auth check: `isVerified === true` (Yaoyao only)
  - [ ] Parse CSV
  - [ ] Validate data
  - [ ] Call `bulkCreatePeople()`
  - [ ] Return summary: X created, Y errors

- [ ] Create `src/hooks/people/useBulkImportPeople.ts`

  - [ ] Mutation hook for bulk import
  - [ ] Handles file upload

- [ ] Create `src/components/people/BulkImportModal.tsx`

  - [ ] File upload input (accept .csv)
  - [ ] CSV format example/template download
  - [ ] Upload button
  - [ ] Progress indicator
  - [ ] Result summary (success count, errors)

- [ ] Add import button to people dashboard
  - [ ] "Import from CSV" button (Yaoyao only)
  - [ ] Opens `<BulkImportModal>`

**CSV Format Example**:

```csv
name,tableName
John Doe,Family
Jane Smith,Family
Alice Brown,Friends
Bob Lee,VIP
```

**🚨 CHECKPOINT**: Show bulk import flow, ask for approval

**Reference**: Check if file upload patterns exist in codebase

### Phase 4: Enhancement 3 - Search & Filter 📝

- [ ] Update `src/repositories/people-repo.ts`

  - [ ] `searchPeople(query)` - Search by name across all tables
    - [ ] Case-insensitive search
    - [ ] Returns people with table info included
  - [ ] `getPeopleByTable(tableId)` - Filter by table

- [ ] Create API: `pages/api/people/search.ts`

  - [ ] GET: Search people by name
  - [ ] Query param: `?q=John`
  - [ ] Returns matching people with table assignments

- [ ] Create `src/hooks/people/useSearchPeople.ts`

  - [ ] Query hook with debounced search

- [ ] Create `src/components/people/PeopleSearch.tsx`

  - [ ] Search input
  - [ ] Debounced query (500ms)
  - [ ] Results dropdown showing name + table
  - [ ] Click to navigate to table

- [ ] Add to people/dashboard page
  - [ ] Global search bar
  - [ ] Filter dropdown: "All Tables" or specific table

**🚨 CHECKPOINT**: Show search UI, ask for approval

**Reference**: Check existing search components (e.g., SearchBar.tsx)

### Phase 5: Enhancement 4 - Move Person Between Tables 📝

- [ ] Update `src/repositories/people-repo.ts`

  - [ ] `movePerson(personId, newTableId)` - Update tableId
    - [ ] Validate person exists
    - [ ] Validate new table exists
    - [ ] Update record

- [ ] Create API: `pages/api/people/[id]/move.ts`

  - [ ] PUT: Move person to different table
  - [ ] Body: `{ newTableId }`
  - [ ] Auth check: Yaoyao only (table leaders cannot move people between tables)

- [ ] Create `src/hooks/people/useMovePerson.ts`

  - [ ] Mutation hook for moving person

- [ ] Create `src/components/people/MovePersonModal.tsx`

  - [ ] Modal to select new table
  - [ ] Dropdown: list of all tables
  - [ ] Show capacity warning if new table would exceed capacity
  - [ ] Confirm button

- [ ] Add "Move" button to person item
  - [ ] In people list or table card
  - [ ] Opens `<MovePersonModal>`
  - [ ] Only visible to Yaoyao

**Alternative UI**: Drag & drop person from one table card to another (more complex but better UX)

**🚨 CHECKPOINT**: Show move person flow, ask for approval

**Reference**: Check existing modal patterns

### Phase 6: Enhancement 5 - Export People List 📝

- [ ] Integrate with FEAT-005 (Export to Excel)

  - [ ] People list already included in table export

- [ ] Alternative: Standalone CSV export

  - [ ] Create API: `pages/api/people/export.ts`
  - [ ] GET: Export all people as CSV
  - [ ] Columns: name, table name, table capacity
  - [ ] Auth check: Yaoyao only

- [ ] Add "Export People" button to dashboard
  - [ ] Downloads CSV file: `people-export-[date].csv`

**Note**: If FEAT-005 already covers this, skip standalone CSV export

**🚨 CHECKPOINT**: Confirm if standalone export needed or FEAT-005 sufficient

### Phase 7: Enhancement 6 - Reordering (Optional) 📝

- [ ] Add `position` field to People model

  - [ ] Migration: `ALTER TABLE People ADD COLUMN position INT`
  - [ ] Default: order by createdAt

- [ ] Update repository to support ordering

  - [ ] `getPeopleByTable(tableId)` - Order by position

- [ ] Add drag-to-reorder UI
  - [ ] Drag handles on people items
  - [ ] Update position on drop
  - [ ] Smooth animations

**Note**: Reordering is low priority. Consider deferring to future enhancement.

### Phase 8: Testing & QA 📝

- [ ] **Capacity Warning Testing**:

  - [ ] Create table with capacity 4
  - [ ] Add 5 people
  - [ ] Verify warning appears showing "5/4"
  - [ ] Verify warning color/icon visible
  - [ ] Add 6th person - verify still allows but shows warning

- [ ] **Bulk Import Testing**:

  - [ ] Create CSV with 10 people
  - [ ] Upload CSV
  - [ ] Verify all 10 people created
  - [ ] Upload CSV with errors (invalid table) - verify error report
  - [ ] Upload CSV with duplicate names - verify handles correctly

- [ ] **Search Testing**:

  - [ ] Search for "John" - verify finds all Johns across tables
  - [ ] Search with partial name "Jo" - verify fuzzy search works
  - [ ] Search non-existent name - verify shows "No results"
  - [ ] Verify search is case-insensitive

- [ ] **Move Person Testing**:

  - [ ] Move person from Table 1 to Table 2
  - [ ] Verify person appears in Table 2
  - [ ] Verify removed from Table 1
  - [ ] Move to table over capacity - verify warning shown
  - [ ] Confirm move - verify succeeds

- [ ] **Export Testing**:

  - [ ] Export people list
  - [ ] Open CSV file
  - [ ] Verify all people present with correct table assignments
  - [ ] Verify columns correct (name, table, capacity)

- [ ] **Permissions Testing**:
  - [ ] Yaoyao can do all operations
  - [ ] Table leaders cannot bulk import, search globally, or move people
  - [ ] Guests read-only

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 9: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document CSV import format
- [ ] Document capacity warning behavior
- [ ] Note any limitations

## Technical Notes

### Capacity Warning Logic

```typescript
// Reference: Check existing capacity logic
const isOverCapacity = people.length > table.capacity;
const occupancyText = `${people.length}/${table.capacity}`;
const warningColor = isOverCapacity ? "text-red-500" : "text-green-500";
```

### CSV Parsing

**Library Options**:

- **PapaParse**: Popular CSV parser for JavaScript
- **csv-parse**: Node.js CSV parser

**Installation**: `npm install papaparse` (if needed)

**Example Pattern**:

```typescript
import Papa from "papaparse";

const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
});
```

### Bulk Create Performance

- Use Prisma `createMany()` for efficiency
- For 100+ people, use batching (50 at a time)
- Wrap in transaction for atomicity

### Search Performance

- Add database index on `People.by` field for faster search
- Use `contains` query with case-insensitive mode

```typescript
// Reference: Check Prisma query patterns
const people = await prisma.people.findMany({
  where: {
    by: {
      contains: query,
      mode: "insensitive",
    },
  },
  include: { table: true },
});
```

## Files Reference

**New Files to Create**:

- `src/utils/parsePeopleCSV.ts`
- `pages/api/people/bulk-import.ts`
- `pages/api/people/search.ts`
- `pages/api/people/[id]/move.ts`
- `pages/api/people/export.ts` (if standalone export)
- `src/hooks/people/useBulkImportPeople.ts`
- `src/hooks/people/useSearchPeople.ts`
- `src/hooks/people/useMovePerson.ts`
- `src/components/people/BulkImportModal.tsx`
- `src/components/people/PeopleSearch.tsx`
- `src/components/people/MovePersonModal.tsx`
- `src/components/people/CapacityWarning.tsx`

**Files to Modify**:

- `src/repositories/people-repo.ts` - Add enhancement functions
- `src/repositories/table-repo.ts` - Add capacity check functions
- `src/components/dashboard/TableCard.tsx` - Add capacity warning
- `src/components/dashboard/PeopleTableCard.tsx` - Add move/search features
- People dashboard page - Add import/export/search buttons

**Reference Files** (Study These First):

- `src/repositories/people-repo.ts` - Existing people operations
- `src/components/dashboard/PeopleTableCard.tsx` - People UI
- `src/hooks/people/*` - Existing people hooks

## QA Testing Steps

### Test: Capacity Warning

1. Create table "Family" with capacity 4
2. Add 4 people - verify shows "4/4" (green or neutral)
3. Add 5th person - verify shows "5/4" (red/orange with warning icon)
4. Hover warning icon - verify tooltip explains over capacity

### Test: Bulk Import CSV

1. Create CSV file with format: name, tableName
2. Add 10 people to various tables
3. Navigate to people dashboard (Yaoyao)
4. Click "Import from CSV"
5. Upload file
6. Verify success message: "10 people imported"
7. Check tables - verify all people added correctly

### Test: CSV with Errors

1. Create CSV with invalid table name
2. Upload
3. Verify error report shows: "Table 'InvalidTable' not found for John Doe"
4. Verify valid rows still imported, invalid rows skipped

### Test: Search People

1. Add people with names: John Doe, Jane Doe, Alice Smith
2. In search bar, type "Doe"
3. Verify dropdown shows: John Doe (Family), Jane Doe (Family)
4. Click on John Doe - verify navigates to Family table

### Test: Move Person

1. John Doe is in Table "Family"
2. Click "Move" next to John Doe
3. Select new table: "Friends"
4. Verify warning if Friends over capacity
5. Confirm move
6. Verify John Doe now in Friends table
7. Verify removed from Family table

### Test: Export People

1. Click "Export People" button
2. Verify CSV file downloads
3. Open file
4. Verify columns: name, table, capacity
5. Verify all people present

## Edge Cases & Limitations

- [ ] **Capacity Enforcement**: System warns but doesn't block adding people over capacity (by design)
- [ ] **CSV Duplicates**: Same name can be added multiple times (no uniqueness constraint)
- [ ] **Bulk Import Size**: Very large CSV (1000+ rows) may timeout or be slow
- [ ] **Search Performance**: Search across 1000+ people may be slow without proper indexing

## Known Risks

- ⚠️ **CSV Format Errors**: Users may upload incorrectly formatted CSV causing errors
- ⚠️ **Over Capacity**: Without hard limit, tables can become unrealistically large
- ⚠️ **Data Loss**: Moving person between tables is immediate (no undo)

## Success Metrics

- [ ] Capacity warnings reduce over-capacity tables
- [ ] Bulk import saves time for large events
- [ ] Search helps quickly locate guests
- [ ] Move person feature used for table adjustments

## Future Enhancements

- [ ] **Contact Information**: Add email/phone fields to People model
- [ ] **Dietary Restrictions**: Add notes field for allergies, preferences
- [ ] **Check-In Status**: Track who has arrived at event
- [ ] **Guest Groups**: Link related people (e.g., family members)
- [ ] **Seating Preferences**: Note who wants to sit together
- [ ] **RSVP Status**: Track confirmed vs pending guests

## Notes

- Focus on high-impact enhancements first (capacity warning, bulk import)
- Defer low-priority features (reordering) to future versions
- Leverage existing FEAT-005 export rather than building separate export
- Keep UI simple and intuitive - don't overwhelm users with too many options
