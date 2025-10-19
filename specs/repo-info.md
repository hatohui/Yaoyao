# repo-info (compact)

Folder map (one-liners)

- `app/` — Next App Router
- `pages/api/` — API routes; thin handlers, call `repositories/`.
- `common/` — infra: axios, prisma, language helpers, shared constants.
- `components/` — presentational components grouped by domain (common, nav, menu, dashboard, order, table).
- `hooks/` — client hooks for data + UI logic (group by domain, use TanStack Query inside hooks).
- `repositories/` — server-side data access & business logic (Prisma wrappers).
- `config/` — providers and app-level wiring (TanStack, animations).
- `stores/` — client stores for local UI state (auth, theme), not server data.
- `types/` — `api/` request/response shapes, `models/` domain types.
- `utils/` — pure helpers and mappers.
- `language/` — locale JSON files.

Quick decision rules

- New page: `app/<route>/page.tsx` + `components/<domain>/` + `hooks/<domain>/`.
- New API: `pages/api/...` + `repositories/`.
- Shared UI: `components/common/`.
- Data logic: `hooks/` (client) and `repositories/` (server).

Minimal 5-step feature flow

1. Contract: inputs, outputs, errors, acceptance criteria.
2. Types & mappers: add `types/api` & `utils` mappers.
3. Server: add `repositories/<domain>` functions (Prisma use).
4. API & Hook: add `pages/api/...` endpoint (if needed) and `hooks/<domain>/useX` that uses axios/TanStack.
5. UI & tests: add `components/<domain>/` and update `app/` page; add unit tests for mappers/repos and a hook/component test.

Example skeleton (where things go)

- types: `src/types/api/updateFoodAvailability.ts`
- repo: `src/repositories/food-repo.ts` -> `setFoodAvailability(id, available)`
- api: `pages/api/admin/food/[id]/availability.ts`
- hook: `src/hooks/food/useFoodAvailabilityMutation.ts`
- component: `src/components/dashboard/FoodRow.tsx` (toggle)

- Use TanStack Query for server data; stores only for local UI state.
- Keep repos as single source of truth for DB access.
