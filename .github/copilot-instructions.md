You are an expert senior full stack nextjs developer

#### Rules:

- Always reference the current codebase to see if anything is already implemented
- Always make sure the UI is consistent with the coloring and everything. UX must be acceptable.
- Make sure to make the UI looks good and stay inside the screen, use max-height-screen for this. And the UI should be able to control light/dark mode.
- Make sure to always split components as much as possible, I want a react component with 30-60 lines, not 200 lines.
- Split hooks and utils into the utils and hooks folders respectively.

### Data Layer Architecture

**Three-tier pattern** (strictly followed):

1. **API Routes** (`src/pages/api/**/*.ts`): Next.js Pages API handlers
   - Use `Status(res)` helper from `src/common/status.ts` for all responses (Ok, BadRequest, NotFound, etc.)
   - Pattern: `const { Ok, BadRequest, NotFound } = Status(res);`
2. **Repositories** (`src/repositories/*-repo.ts`): Prisma queries only
   - Import `prisma` from `src/common/prisma.ts`
   - Pure data access, no business logic
3. **React Hooks** (`src/hooks/**/*.ts`): TanStack Query wrappers
   - Use `axios` instance from `src/common/axios.ts` (baseURL: `/api`)
   - Pattern: `useQuery/useMutation` with queryKey like `["tables", page, search]`

### Type System Patterns

- **API Types**: Organized by entity in `src/types/api/{entity}/{METHOD}.ts`
  - GET.ts: Response types
  - POST.ts: Request/Response types
  - PUT.ts: Request types
  - DELETE.ts: Response types
- **Omit pattern**: API types omit internal fields (e.g., `Omit<Table, "tableLeaderId" | "createdAt">`)
- **Validation**: Use Zod v4 (`zod/v4`) - see `src/utils/validation/idValidation.ts` for UUID validation pattern

### Pagination & Search

- **Constants**: `TABLE_PAGINATION_SIZE`, `MENU_PAGINATION_SIZE`, `SEARCH_DEBOUNCE_DELAY` in `src/config/app.ts`
- **Pattern**: API routes accept `?page=1&count=12&search=query`
- **Response**: Always include `pagination: { page, count, total, totalPages }`

## Critical Gotchas

1. **Prisma Client Location**: Generated client output is `../node_modules/.prisma/client` (see `schema.prisma`)
2. **isStaging Filter**: NEVER forget to filter by `isStaging: false` in production queries
3. **Status Helper**: Always destructure from `Status(res)` - don't call methods directly
4. **UUID Validation**: Use `isValidId()` from `src/utils/validation/idValidation.ts` before DB queries
5. **Axios Instance**: Import from `src/common/axios.ts`, NOT the library directly
6. **Dynamic Imports**: `AuthHydrator` uses `dynamic()` to avoid SSR hydration issues

## Feature Flag

- `TABLE_PUBLIC_ENABLED` in `src/config/app.ts` - Controls public table viewing (currently `true`)
