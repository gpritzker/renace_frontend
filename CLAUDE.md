# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint via Next.js
```

There is no test runner configured (no Jest scripts in package.json despite `jest.setup.ts` being present).

## Architecture

This is a **Next.js 15 app** (App Router) for a digital time-capsule platform called "Renace". The UI language is Spanish (Argentine locale `es-AR`).

### Route groups

- `src/app/(auth)/` — public auth pages (login, register)
- `src/app/(store)/` — main app pages (home, create-capsule, my-capsules, how-it-works)
- `src/app/api/` — Next.js Route Handlers (address lookup: cities, zipcodes)

The root layout (`src/app/layout.tsx`) renders `<Header>` globally and wraps content in a `max-w-7xl` container. There is no `SessionProvider` in the root layout; wrap individual client trees with `SessionWrapper` when needed.

### Auth flow

Authentication is custom cookie-based, **not** a standard NextAuth session flow:

1. Login calls the backend via the `login` Server Action (`src/actions/auth/login.ts`), which stores the returned `accessToken` in an HTTP cookie.
2. `src/middleware.ts` protects `/account/*` routes by checking for that cookie via `getToken` (NextAuth JWT helper is re-used here).
3. Every server-side API call goes through `httpServer` (`src/lib/api/httpServer.ts`) → `getHeader` (`src/lib/api/headerServer.ts`), which reads `accessToken` from cookies and injects it as `Auth-Token` plus a static `Api-Key` from `process.env.API_KEY`.

### API layer

- All backend calls use `httpServer`, a thin `fetch` wrapper that auto-attaches auth headers and throws on non-OK responses.
- Endpoints are centralised in `src/constants/apiEndpoints.ts`; the base URL comes from `process.env.BASE_URL`.
- Server Actions (`src/actions/`) are the standard way to call the backend from components — do not call `httpServer` directly from client components.

### State management

Zustand is the chosen state library. Minimize `useEffect`/`useState`; prefer derived state and memoization.

### UI

- Components use **shadcn/ui** (Radix primitives + Tailwind) from `src/components/ui/`.
- Custom app components live in `src/components/<feature>/`.
- Always style with Tailwind classes; avoid inline styles or separate CSS.
- Use `sonner` (`<Toaster richColors />` is mounted in root layout) for toast notifications.

### Forms & validation

Forms use **react-hook-form** + **Zod** schemas (in `src/schemas/`). Resolvers live in `@hookform/resolvers/zod`.

### Code conventions (from `.cursorrules`)

- Prefer `const` arrow functions over `function` declarations.
- Name event handlers with a `handle` prefix (`handleClick`, `handleSubmit`).
- Use early returns to reduce nesting.
- TypeScript interfaces for component props.
- Implement ARIA attributes on interactive elements.
