Summary of Progress
I've successfully implemented the core infrastructure and UI components for the restaurant layout feature! Here's what's complete:

✅ Phase 1: Core Infrastructure (Complete)
Created 2 new hooks:

useUnassignedTables.ts - Fetches tables not assigned to any slot
useAssignedTables.ts - Fetches tables currently in slots
Enhanced useLayoutMutations.ts with 5 mutations:

assignTableToSlot - Assign a table to a slot
unassignTable - Remove table from slot
deleteSlot - Delete entire slot
swapTables - Swap two tables between slots
updateLayout - Update slot position (already existed)
✅ Phase 2: UI Components (Mostly Complete)
Created 4 new components:

CollapsibleSection.tsx - Reusable collapsible section with chevron icons
DraggableTableItem.tsx - Individual table card in sidebar (drag-enabled)
LayoutSidebar.tsx - Right sidebar with two collapsible sections:
Available Tables (unassigned)
Assigned Tables (currently in slots)
SlotActionModal.tsx - Modal for slot actions:
Unassign Table (yellow)
Delete Slot (red)
Enhanced LayoutSlot.tsx:

Color coding: Empty=gray, Occupied=green
Lock/unlock button
Shows table name and capacity
Modern card design
Hover effects
Updated RestaurantLayout.tsx:

Integrated sidebar (no conflict with DashboardSidebar - different routes!)
Modal state management
Drag state tracking (prepared for drag-drop)
Full-screen layout with flex design
🚧 Next Steps:
The remaining work focuses on:

Drag & Drop Logic - Wire up the actual drag operations between sidebar and slots
API Backend - Need to create the API endpoints these mutations call
Create New Slots - Click-to-create functionality
Polish - Animations, responsive design, error handling
📝 Important Note:
No sidebar conflicts! The /layout page is separate from /dashboard, so:

/dashboard/\* → Has DashboardSidebar (left nav)
/layout → Has LayoutSidebar (right panel for tables)

Schema & Documentation Updates:

Added zone field to Layout model for multi-floor support
Removed isLocked from database (client-side only as requested)
Removed timestamps (not needed as requested)
Updated documentation to reflect the simplified API strategy
API Simplification:

Removed unnecessary /layouts/assigned and /tables/unassigned endpoints
Using single GET /layouts endpoint with client-side filtering
Created /layouts/swap endpoint for table swapping
Added repository functions for swap and unassigned tables
UI Stability Improvements:

Removed SlotActionModal - no more modal causing rerenders
Refactored LayoutSlot to use refs (isLockedRef, controlsRef, lockButtonRef)
Lock state doesn't cause rerenders - only updates DOM directly
Controls visibility managed via refs, not state
Added direct action buttons: Lock, Unassign, Delete
Client-Side Filtering:

useUnassignedTables - filters tables from layouts + all tables
useAssignedTables - filters layouts with assigned tables
Single source of truth, no duplicate API calls
📋 Next Steps:
Implement drop zone detection for drag-and-drop
Add visual feedback during dragging
Create slot on click functionality
Responsive adjustments
