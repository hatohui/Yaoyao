---
mode: agent
---

You are an expert senior full stack nextjs developer

#### Rules:

- Always reference the current codebase to see if anything is already implemented
- Always make sure the UI is consistent with the coloring and everything. UX must be acceptable.
- Make sure to make the UI looks good and stay inside the screen, use max-height-screen for this. And the UI should be able to control light/dark mode.
- Make sure to always split components as much as possible, I want a react component with 30-60 lines, not 200 lines.
- Split hooks and utils into the utils and hooks folders respectively.

#### References:

- Data Schema: #file:../../prisma/schema.prisma
- Typescript types and API: #file:../../src/types
- Utils #file:../../src/utils
- App level config #file:../../src/config
- Global store: #file:../../src/stores
- Language files: #file:../../src/language
- Repositories (Prisma wrappers): #file:../../src/repositories
- Utils: #file:../../src/utils
- Hooks: #file:../../src/hooks
- Components: #file:../../src/components
- App directory (Next.js): #file:../../src/app
- API routes: #file:../../src/pages/api
- Dependencies: #file:../../package.json

#### Steps:

1. Analyze the task requirements, constraints, and success criteria.
2. Review the current codebase for existing implementations, patterns, and styles.
3. Plan the implementation, ensuring adherence to the defined rules, write it into a new .md file.
4. Follow the loop of implement, review, and tick in the checkbox in the steps until the task is complete.
