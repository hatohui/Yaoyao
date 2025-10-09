# src/ — Project source overview

This README summarizes the main folders and important files inside `src/` for the Yaoyao project. It is intended to help developers new to the repository quickly understand where code lives and what each area is responsible for.

## Top-level folders inside `src/`

- app/

  - The Next.js App Router application code (routes and server/client components).
  - Key files:
    - `layout.tsx` — App layout for the application (common header/footer, providers).
    - `globals.css` — global Tailwind/custom styles.
    - `not-found.tsx` — custom not-found UI for routes.
    - `page.tsx` — the main landing/home page (also other page route files live here).
  - Notable subfolders: `menu/`, `tables/`, `orders/` — route segments implemented as React components.

- common/

  - Shared utilities and small helpers used across the app.
  - Examples: `axios.ts` (configured Axios instance), `language.ts` (i18n helpers), `prisma.ts`.

- components/

  - Reusable React components used by pages and features.
  - Subfolders organized by feature or UI area:
    - `auth/` — authentication-related UI (logins, overlays, logos).
    - `common/` — small, generic UI components (buttons, form inputs, messages).
    - `menu/` — components for menu/category UI (FoodGallery, Categories).
    - `nav/` — navigation components (NavBar, NavLinks).
    - `table/` — table-specific UI (PeopleInTable, TableDetail, mutation boxes).

- config/

  - Application configuration (e.g., TanStack providers, app-level constants, language configs).

- hooks/

  - Custom React hooks for domain logic and data fetching.
  - Examples: `useTables`, `useFoods`, `useTableDetail`, `usePeopleInTable`.

- language/

  - Locale JSON files for i18n (e.g., `en.json`, `vi.json`, `th.json`, `zh.json`).
  - Contains localized strings used with next-intl.

- pages/

  - API routes (Next.js API routes if used) are implemented here.
  - Example routes: `api/categories`, `api/foods`, `api/tables`.

- repositories/

  - Thin data-layer helpers that wrap API calls or Prisma queries.
  - Example: `table-repo.ts`, `food-repo.ts`.

- stores/

  - Client-side state stores (e.g., Zustand) used for auth or UI state.

- types/

  - Shared TypeScript types/interfaces used across the app for API responses, models, etc.

- utils/
  - Miscellaneous helper functions (query client creation, validation helpers, mapping functions).

## How this maps to runtime

- The `app/` folder contains the route handlers and components that Next.js composes into pages. Data fetching for SSR/SSG can happen in server components or API routes in `pages/api`.
- Hooks in `hooks/` typically use `@tanstack/react-query` for client state and can call APIs in `pages/api` or directly hit server endpoints.

## Quick navigation tips

- To find table-related UI: `src/components/table` and `src/hooks/table`.
- To change copy/translations: `src/language/*.json`.
- To modify server DB schemas or seeds: `prisma/schema.prisma` and `prisma/seeds`.

## Maintainer notes

- Keep translations in `src/language` synchronized. When adding new error keys, prefer `errors.*` top-level keys (e.g., `errors.SAME_CAPACITY`) to avoid duplication.
- Centralized hooks (e.g., `useMutationWithError`) live in `src/hooks/common` — reuse them to standardize mutation error handling and UI messages.

If you want, I can expand this with file-level examples, a diagram of the data flow (client → api → prisma), or add `CODEOWNERS` and contributor notes. Tell me which additions you'd like.
