# FEAT-002: Staging Tables and Admin Planning

**Status**: 📋 Partially Implemented - Needs Completion

**Priority**: P1 (High - Core Admin Feature)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅

## Overview

Allows Yaoyao to create and manage a staging environment for table planning. This enables testing different table arrangements without affecting production data. Think of it as a "draft mode" where Yaoyao can experiment with table layouts, then commit changes to production when ready.

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- ⚠️ Access dedicated staging page (`/dashboard/staging`)
- ⚠️ Full CRUD on staging tables
- ⚠️ Copy production to staging
- ⚠️ Clear all staging data
- ⚠️ Commit staging to production

### Table Leader

- ❌ No access to staging (production only)

### Guest

- ❌ No access to staging (production only)

## User Stories

### Yaoyao Stories

#### Core Staging Functionality

- [ ] As Yaoyao, I want a dedicated staging page (`/dashboard/staging`) where I can plan table arrangements without affecting production
- [ ] As Yaoyao, I want to CRUD staging tables (with `isStaging: true`) just like production tables
- [ ] As Yaoyao, I want staged data to persist in the database so I can work on plans over multiple sessions
- [ ] As Yaoyao, I want a "Copy Production to Staging" button that duplicates all current production tables (including people and orders) into staging mode
- [ ] As Yaoyao, I want a "Clear All Staging" button that deletes all records where `isStaging: true` so I can start fresh
- [ ] As Yaoyao, I want a "Commit to Production" button that replaces production tables with staged tables (and their people/orders)

#### Data Synchronization

- [ ] As Yaoyao, when I fetch staging data and production has changed, I want to be warned that production is newer so I can decide to refresh staging from production
- [ ] As Yaoyao, I want staging and production to be completely isolated - changes in staging don't affect production until I commit

#### Visual Differentiation

- [ ] As Yaoyao, I want staging tables to have a clear visual indicator (badge, color, sgv from icon libraries) so I never confuse them with production

### Table Leader Stories

- [x] As a table leader, I should NOT see or access staging data (production only)

### Guest Stories

- [x] As a guest, I should NOT see or access staging data (production only)

## Acceptance Criteria

- [ ] Staging page requires `isYaoyao: true` authentication
- [ ] Staging tables have `isStaging: true` flag
- [ ] Copy operation creates new UUIDs for all duplicated records
- [ ] Clear staging operation is irreversible with confirmation dialog
- [ ] Commit operation:
  1. Deletes all production tables (`isStaging: false`)
  2. Updates all staging tables to `isStaging: false`
  3. Shows success/failure feedback
- [ ] Staging and production queries are filtered by `isStaging` field
- [ ] Visual indicators: staging badge on cards, different header color, or border styling

## Data Model

```prisma
model Table {
  id            String   @id @default(uuid())
  name          String
  capacity      Int      @default(2)
  tableLeaderId String?
  isStaging     Boolean  @default(false) // ✅ Already exists

  // Relations cascade to People and Order
  people        People[]
  orders        Order[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Note**: Schema already supports `isStaging` field. No migration needed.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Read existing `table-repo.ts` for reference patterns
- [ ] Read existing `src/app/dashboard/tables/page.tsx` for UI patterns
- [ ] Identify all data that needs staging support (Table, People, Order)
- [ ] Design staging page layout (similar to tables page)
- [ ] Plan atomic commit transaction flow
- [ ] Design warning/confirmation dialogs

**References to Study**:

- `src/repositories/table-repo.ts` - Existing table operations
- `src/app/dashboard/tables/page.tsx` - Dashboard layout patterns
- `src/components/dashboard/TableCard.tsx` - Card component structure
- `src/hooks/table/*` - Query/mutation hook patterns

### Phase 2: Repository Layer 📝

- [ ] Update `src/repositories/table-repo.ts` with staging functions
  - [ ] `getStagingTables()` - Query where `isStaging: true`
  - [ ] `getProductionTables()` - Query where `isStaging: false`
  - [ ] `copyProductionToStaging()` - Deep copy with new UUIDs
    - [ ] Copy tables
    - [ ] Copy associated people
    - [ ] Copy associated orders
  - [ ] `clearAllStaging()` - Delete where `isStaging: true` (cascade)
  - [ ] `commitStagingToProduction()` - Atomic transaction:
    - [ ] Delete all production tables
    - [ ] Update staging tables to `isStaging: false`
    - [ ] Use Prisma transaction (`$transaction`)
  - [ ] `hasProductionChangedSince(lastFetchTimestamp)` - Detect drift

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in existing `table-repo.ts` functions like:

- `getTables()` - for query structure
- `createTable()` - for create operations
- Use `prisma.$transaction()` for atomic operations

### Phase 3: Type Definitions 📝

- [ ] Create/update `src/types/api/staging.ts`
  - [ ] `CopyProductionToStagingResponse`
  - [ ] `ClearStagingResponse`
  - [ ] `CommitStagingToProductionResponse`
  - [ ] `StagingStatusResponse` (includes drift warning)

**Reference**: Follow patterns in `src/types/api/table.ts`

### Phase 4: API Layer 📝

- [ ] Create `pages/api/tables/staging/copy-from-production.ts`

  - [ ] POST endpoint
  - [ ] Auth check: `isYaoyao === true`
  - [ ] Call `copyProductionToStaging()`
  - [ ] Return success/count of copied tables
  - [ ] Error handling (500, 403)

- [ ] Create `pages/api/tables/staging/clear.ts`

  - [ ] DELETE endpoint
  - [ ] Auth check: `isYaoyao === true`
  - [ ] Call `clearAllStaging()`
  - [ ] Return success/count of deleted tables
  - [ ] Error handling

- [ ] Create `pages/api/tables/staging/commit.ts`

  - [ ] POST endpoint
  - [ ] Auth check: `isYaoyao === true`
  - [ ] Call `commitStagingToProduction()`
  - [ ] Return success message
  - [ ] Error handling (transaction rollback on failure)

- [ ] Create `pages/api/tables/staging/status.ts`
  - [ ] GET endpoint
  - [ ] Returns staging table count, production table count, last sync time
  - [ ] Checks for drift (production changed since staging fetched)

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Follow patterns in `pages/api/tables/index.ts` and `pages/api/tables/[id].ts`

### Phase 5: Hook Layer 📝

- [ ] Create `src/hooks/table/useStagingTables.ts`

  - [ ] Query hook: `GET /api/tables?isStaging=true`
  - [ ] Use TanStack Query

- [ ] Create `src/hooks/table/useCopyProductionToStaging.ts`

  - [ ] Mutation hook: `POST /api/tables/staging/copy-from-production`
  - [ ] Invalidate staging queries on success

- [ ] Create `src/hooks/table/useClearStaging.ts`

  - [ ] Mutation hook: `DELETE /api/tables/staging/clear`
  - [ ] Invalidate staging queries on success

- [ ] Create `src/hooks/table/useCommitStaging.ts`

  - [ ] Mutation hook: `POST /api/tables/staging/commit`
  - [ ] Invalidate ALL table queries on success (production + staging)

- [ ] Create `src/hooks/table/useStagingStatus.ts`
  - [ ] Query hook: `GET /api/tables/staging/status`
  - [ ] Use for drift detection

**Reference**: Follow patterns in `src/hooks/table/useTables.ts` and `useCreateTable.ts`

### Phase 6: Component Layer 📝

- [ ] Create `src/components/staging/StagingBadge.tsx`

  - [ ] Visual indicator component (badge or tag)
  - [ ] Props: `isStaging: boolean`
  - [ ] Styling: distinct color (e.g., orange/yellow for staging)

- [ ] Create `src/components/staging/StagingControls.tsx`

  - [ ] Toolbar with three action buttons:
    - [ ] "Copy Production to Staging" button
    - [ ] "Clear All Staging" button
    - [ ] "Commit to Production" button
  - [ ] Each button with confirmation dialog
  - [ ] Loading states during operations
  - [ ] Success/error toast notifications

- [ ] Update `src/components/dashboard/TableCard.tsx`
  - [ ] Add `<StagingBadge>` if `table.isStaging === true`
  - [ ] Optional: different border color for staging

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**:

- `src/components/dashboard/TableCard.tsx` - Card structure
- Existing component patterns for buttons, dialogs, toasts

### Phase 7: Page Implementation 📝

- [ ] Create `src/app/dashboard/staging/page.tsx`

  - [ ] Similar layout to `dashboard/tables/page.tsx`
  - [ ] Use `useStagingTables()` hook
  - [ ] Add `<StagingControls>` toolbar at top
  - [ ] Display staging tables in grid (reuse TableCard)
  - [ ] Auth guard: redirect if not `isYaoyao`
  - [ ] Show drift warning if detected (from `useStagingStatus()`)

- [ ] Update `src/app/dashboard/layout.tsx` or navigation
  - [ ] Add "Staging" link in Yaoyao-only sidebar
  - [ ] Only visible if `isYaoyao === true`

**Reference**: Follow `src/app/dashboard/tables/page.tsx` structure

### Phase 8: Confirmation Dialogs 📝

- [ ] Create `src/components/staging/CopyConfirmDialog.tsx`

  - [ ] Props: `onConfirm`, `onCancel`, `isOpen`
  - [ ] Warning text: "This will duplicate all production tables to staging. Existing staging data will be cleared. Continue?"
  - [ ] Confirm/Cancel buttons

- [ ] Create `src/components/staging/ClearConfirmDialog.tsx`

  - [ ] Warning text: "This will permanently delete all staging tables. This cannot be undone. Continue?"
  - [ ] Confirm/Cancel buttons

- [ ] Create `src/components/staging/CommitConfirmDialog.tsx`
  - [ ] Warning text: "This will REPLACE all production tables with staging tables. Production data will be lost. Continue?"
  - [ ] Two-step confirmation (checkbox: "I understand this is irreversible")
  - [ ] Confirm/Cancel buttons

**Reference**: Check existing dialog patterns in codebase or use headlessui/radix-ui

### Phase 9: Drift Detection 📝

- [ ] Implement drift warning UI

  - [ ] Show banner at top of staging page if production changed
  - [ ] Message: "Production tables have been updated since staging was last synced. Consider refreshing staging from production."
  - [ ] Action button: "Refresh from Production" (triggers copy operation)

- [ ] Store last sync timestamp in localStorage or state
  - [ ] Update timestamp when copying production to staging
  - [ ] Compare with production `updatedAt` timestamps

**Reference**: Use `useEffect` and `useStagingStatus()` hook

## Technical Notes

### Transaction Safety

The commit operation MUST be atomic. Use Prisma transactions:

```typescript
// Example pattern (DO NOT copy verbatim - check existing repo patterns)
await prisma.$transaction([
  prisma.table.deleteMany({ where: { isStaging: false } }),
  prisma.table.updateMany({
    where: { isStaging: true },
    data: { isStaging: false },
  }),
]);
```

**Reference**: Check if similar transaction patterns exist in codebase

### UUID Generation

When copying production to staging, generate new UUIDs:

```typescript
// Reference existing patterns in table-repo.ts for creating records
```

### Cascade Deletes

Ensure Prisma schema has `onDelete: Cascade` for:

- `Table -> People`
- `Table -> Order`

**Check**: Verify in `prisma/schema.prisma`

## Files Reference

**New Files to Create**:

- `src/app/dashboard/staging/page.tsx`
- `pages/api/tables/staging/copy-from-production.ts`
- `pages/api/tables/staging/clear.ts`
- `pages/api/tables/staging/commit.ts`
- `pages/api/tables/staging/status.ts`
- `src/hooks/table/useStagingTables.ts`
- `src/hooks/table/useCopyProductionToStaging.ts`
- `src/hooks/table/useClearStaging.ts`
- `src/hooks/table/useCommitStaging.ts`
- `src/hooks/table/useStagingStatus.ts`
- `src/components/staging/StagingBadge.tsx`
- `src/components/staging/StagingControls.tsx`
- `src/components/staging/CopyConfirmDialog.tsx`
- `src/components/staging/ClearConfirmDialog.tsx`
- `src/components/staging/CommitConfirmDialog.tsx`
- `src/types/api/staging.ts`

**Files to Modify**:

- `src/repositories/table-repo.ts` - Add staging functions
- `src/components/dashboard/TableCard.tsx` - Add staging badge
- `src/app/dashboard/layout.tsx` - Add staging nav link
- Navigation component - Add staging link (Yaoyao only)

**Reference Files** (Study These First):

- `src/repositories/table-repo.ts`
- `src/app/dashboard/tables/page.tsx`
- `src/components/dashboard/TableCard.tsx`
- `src/hooks/table/*`
- `pages/api/tables/*`

## Edge Cases & Limitations

- [ ] **Concurrency**: Last write wins. No optimistic locking implemented.
- [ ] **Large Datasets**: Copying 100+ tables may be slow. Consider background job if needed.
- [ ] **Related Data**: Table links (FEAT-003) and layout assignments (FEAT-004) need staging support too (future work)
- [ ] **Audit Trail**: No history of staging commits (future enhancement)

## Known Risks

- ⚠️ **Data Loss Risk**: Commit operation is destructive. Ensure confirmation dialogs are clear.
- ⚠️ **Transaction Failures**: If commit transaction fails mid-way, data could be inconsistent. Need rollback strategy.
- ⚠️ **Performance**: Deep copy of large datasets may timeout. Test with realistic data volumes.

## Success Metrics

- [ ] Yaoyao can copy production to staging without issues
- [ ] Yaoyao can experiment with staging without affecting production
- [ ] Commit operation completes successfully with proper feedback
- [ ] No production data is accidentally modified through staging
- [ ] Visual indicators prevent confusion between staging and production

## Next Steps After Completion

- [ ] Add staging support to FEAT-003 (Table Links)
- [ ] Add staging support to FEAT-004 (Layout)
