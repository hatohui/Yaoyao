# Yaoyao

A practical, production-minded demo for restaurant layout and ordering built with Next.js (App Router), Prisma and TypeScript.

This repository demonstrates a full-stack workflow for managing restaurant layouts, tables, menus, staging flows and orders. It includes dashboard pages, reusable UI components, Prisma migrations and seed data so you can bootstrap a working demo quickly.

## Key facts

- Tech: Next.js (App Router), React, TypeScript, Prisma ORM, PostgreSQL (typical), PostCSS, GSAP, Axios, TanStack Query, Zustand.
- Scope: Dashboard, menu management, ordering, table management, staging/layout workflows, and seed scripts for demo data.
- Important folders:
  - `src/app` — routes, pages and layout components
  - `src/components` — reusable UI pieces
  - `src/hooks`, `src/repositories` — client data logic and repo layer
  - `prisma/` — schema, migrations, and seeds

## What’s included

- Demo-ready Next.js app with dashboard pages (orders, tables, menu, people).
- Prisma schema and migration history under `prisma/migrations`.
- Seed scripts in `prisma/seeds` to populate demo data.

---

## Quick start (local development)

Follow these five steps in order to run the app locally.

1. Install dependencies

```bash
npm i
```

2. Create your environment file

PowerShell (Windows):

```powershell
Copy-Item .example.env .env
```

POSIX (macOS / Linux):

```bash
cp .example.env .env
```

3. Start the database service with Docker Compose

```bash
docker compose up -d
```

4. Run database migrations

```bash
npm run migrate
```

5. Start the Next.js development server

```bash
npm run dev
```

## Notes

- The project expects a SQL database when using Prisma. See `prisma/schema.prisma` for the data model and `prisma/seeds` for example data.
- Ensure required environment variables (for example `DATABASE_URL`) are present in `.env` before running migrations or seeds.

## Development tips

- Use `npm run migrate` to apply migrations locally — `prisma migrate dev` is wrapped by that script.
- To seed the database, run the configured Prisma seed (the project uses `tsx prisma/seeds/index.ts` via the `prisma.seed` config).
