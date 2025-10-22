# Yaoyao Restaurant Management System - AI Agent Instructions

You are an expert senior full stack nextjs developer

#### Rules:

- Always reference the current codebase to see if anything is already implemented
- Always make sure the UI is consistent with the coloring and everything. UX must be acceptable.
- Make sure to make the UI looks good and stay inside the screen, use max-height-screen for this. And the UI should be able to control light/dark mode.
- Make sure to always split components as much as possible, I want a react component with 30-60 lines, not 200 lines.
- Split hooks and utils into the utils and hooks folders respectively.

## Project Overview

Yaoyao is a Next.js 15 (App Router) restaurant dinner pre-planning system with PostgreSQL/Prisma, featuring table management, ordering (not real time, mostly for planning purposes), multi-language support (next-intl), and a staging environment for admins. Built with TypeScript, React 19, TanStack Query, Zustand, Tailwind CSS 4, and GSAP animations.

## Architecture & Key Concepts

### Authentication Pattern

- **Role-based access**: Uses `isYaoyao` boolean (stored in Zustand + localStorage via persist middleware)
  - Located in: `src/stores/useAuthStore.ts`
  - Password-based auth constant: `PASSWORD` in `src/config/app.ts`
  - Hook: `useYaoAuth()` for accessing auth state in components
  - Protected routes: Check `isYaoyao` in page components, return `notFound()` if unauthorized

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

### Internationalization (i18n)

- **Library**: next-intl (integrated via plugin in `next.config.ts`)
- **Config**: `src/config/language.ts` (reads from cookies, fallback to "en")
- **Supported locales**: en, th, vi, zh (defined in `src/common/language.ts`)
- **Translation files**: `src/language/{locale}.json`
- **Usage**: `const t = useTranslations("namespace");` then `t("key")`
- **Pattern**: Always namespace translations (e.g., "dashboard.tablesManagement")

### Type System Patterns

- **API Types**: Organized by entity in `src/types/api/{entity}/{METHOD}.ts`
  - GET.ts: Response types
  - POST.ts: Request/Response types
  - PUT.ts: Request types
  - DELETE.ts: Response types
- **Omit pattern**: API types omit internal fields (e.g., `Omit<Table, "tableLeaderId" | "createdAt">`)
- **Validation**: Use Zod v4 (`zod/v4`) - see `src/utils/validation/idValidation.ts` for UUID validation pattern

### Styling

- **Tailwind CSS 4** with PostCSS
- **Dark mode**: Theme stored in Zustand (`useThemeStore`), applied via `ThemeProvider` wrapper
- **Classes**: Use semantic color tokens (e.g., `text-darkest dark:text-slate-100`)

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

## Key Files for Reference

- **Table CRUD**: `src/repositories/table-repo.ts` (includes staging functions)
- **API Pattern**: `src/pages/api/tables/index.ts` (pagination + filtering example)
- **Protected Page**: `src/app/dashboard/tables/page.tsx` (auth check, animations, search)
- **Hook Pattern**: `src/hooks/table/useTables.ts` (TanStack Query wrapper)
- **Prisma Schema**: `prisma/schema.prisma` (full data model with staging support)
