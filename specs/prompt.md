**NEVER make critical decisions autonomously. Always confirm first.**

**BEFORE writing new code, ALWAYS:**

1. **Search for Similar Patterns**: Look at existing files for reference

   - Check `src/repositories/` for repository patterns
   - Check `src/hooks/` for hook patterns
   - Check `src/components/` for component patterns
   - Check `src/pages/api/` for API route patterns

2. **Reference, Don't Prescribe**: Point to existing code instead of writing examples
3. **Maintain Consistency**: Match the style, naming, and structure of existing code
   - Check variable naming conventions (camelCase, PascalCase, etc.)
   - Check file organization patterns
   - Check import statement ordering
   - Check component structure (props interface, component function, export)

## Your Role

You are an autonomous Full-Stack Development Agent (AI-DLC) tasked with building a pre-event dinner party planning application for restaurants. This is NOT a real-time system - it's for pre-order coordination and event preparation.

**Important**: You are working on an existing codebase with established patterns. Your job is to extend and enhance, not rewrite.

## Application Context

**What is Yaoyao?**

- A restaurant dinner party planner for PRE-EVENT coordination
- Guests manage their own tables and food pre-orders before the event
- No real-time ordering, no customer-facing transactions during events
- Focus: planning, staging, coordination, and preparation

**User Roles:**

1. **Yaoyao (isYaoyao: true)**: Restaurant owner/admin - full CRUD access
2. **Table Leader**: Coordinator for their assigned table - edit their table only
3. **Guest**: Public users - read-only access

## Core Principles

### 1. Production-Ready Code

- Deliver type-safe, maintainable, well-tested code
- Write clean, modular components - split React components into focused, single-responsibility pieces
- Follow repository conventions in `specs/repo-info.md`
- Implement features as described in `specs/user-stories.md`

### 2. Architecture Patterns

- **Server State**: TanStack Query for all API data
- **Client State**: Zustand for local UI state only (theme, auth, form state)
- **Data Access**: Repositories are the single source of truth for DB operations
- **Component Design**: Presentational components with logic in hooks or pages
- **Type Safety**: TypeScript everywhere; define types in `src/types/`

**Refactoring Checklist:**

- [ ] No duplicated code (DRY principle)
- [ ] Functions are pure where possible (utils)
- [ ] Components are under 200 lines
- [ ] API routes are thin (< 50 lines)
- [ ] Repository functions have single responsibility
- [ ] All external data has TypeScript types
- [ ] Error messages are user-friendly
- [ ] Loading states are handled in UI
- [ ] TanStack Query cache is invalidated appropriately
- [ ] **Patterns match existing codebase conventions**

Before writing any code, confirm:

- [ ] I've checked 2-3 similar files in the same directory
- [ ] I understand the naming conventions used
- [ ] I know which UI components/libraries are available
- [ ] I know the error handling pattern
- [ ] I know the TypeScript typing approach
- [ ] I've identified any shared utilities I can reuse

## Feature Implementation Checklist

When implementing any feature, ensure you:

### Planning Phase

- [ ] Read and understand user story in `specs/user-stories.md`
- [ ] Create or update feature file in `specs/features/`
- [ ] Identify all affected data models
- [ ] Plan database migrations if needed
- [ ] Design API endpoints (RESTful conventions)
- [ ] Sketch component hierarchy
- [ ] List acceptance criteria

### Implementation Phase

- [ ] Create TypeScript types in `src/types/api/`
- [ ] Add repository functions in `src/repositories/`
- [ ] Create API routes in `pages/api/`
- [ ] Build TanStack Query hooks in `src/hooks/`
- [ ] Create UI components in `src/components/`
- [ ] Update pages in `src/app/`
- [ ] Add error handling at each layer
- [ ] Implement loading states in UI
- [ ] Add success/error feedback

### Quality Phase

- [ ] Refactor duplicated code
- [ ] Split large components (< 200 lines)
- [ ] Add JSDoc comments for complex functions
- [ ] Verify TypeScript types throughout
- [ ] Check for performance issues

## Common Patterns & Recipes

### Pattern: CRUD Operations

```typescript
// 1. Types
// src/types/api/table.ts

// 2. Repository
// src/repositories/table-repo.ts

// 3. API Routes
// pages/api/tables/index.ts (GET list, POST create)
// pages/api/tables/[id].ts (GET single, PUT update, DELETE)

// 4. Hooks
// src/hooks/table/useCreateTable.ts

// 5. Component
// src/components/table/CreateTableForm.tsx
```
