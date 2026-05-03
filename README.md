# GitHub Agent - Frontend

Next.js dashboard for the companion [github-agent-backend](https://github.com/akshat-code21/gh-pr-agent-backend) FastAPI service: sign in with GitHub, pick a pull request, run an AI review through that API, and browse saved reviews in PostgreSQL.

## Features

- GitHub OAuth via [Better Auth](https://www.better-auth.com/)
- Dashboard with review history and stats.
- Submit a PR URL; the app calls the Python agent, persists the result, and the backend posts the review to GitHub (see the backend README).

## Tech stack

- Bun (package manager & script runner), Next.js 16 (App Router, Turbopack in dev), React 19, TypeScript
- Tailwind CSS 4, shadcn/ui-style components
- Prisma 7 + PostgreSQL (`@prisma/adapter-pg`)
- Better Auth, TanStack Query / Form / Table, Octokit

## Prerequisites

- [Bun](https://bun.sh/) (latest stable; this repo uses a `bun.lock` lockfile)
- PostgreSQL database
- [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) with callback URL: `{BETTER_AUTH_URL}/api/auth/callback/github` (for local dev, `http://localhost:3000/api/auth/callback/github`)
- The FastAPI review API running if you want end-to-end reviews (see the backend repo)

## Environment variables

Create a `.env` in the project root (do not commit secrets):

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Long random string for signing sessions |
| `BETTER_AUTH_URL` | Public origin of this app (e.g. `http://localhost:3000`) |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |
| `NEXT_PUBLIC_API_URL` | Same origin as the app in most setups (e.g. `http://localhost:3000`); used by the auth client and browser API calls to this Next.js server |
| `NEXT_PUBLIC_FASTAPI_SERVER_URL` | Base URL of the review API (e.g. `http://127.0.0.1:8000`) |

## Setup

Install dependencies (Prisma client is generated on `postinstall`):

```bash
bun install
```

Apply database migrations:

```bash
bunx prisma migrate deploy
```

For local development you can use `bunx prisma migrate dev` instead when you change the schema.

## Scripts

```bash
bun run dev        # Next dev server with Turbopack (default: http://localhost:3000)
bun run build      # Production build
bun run start      # Start production server
bun run lint       # ESLint
bun run format     # Prettier (TS/TSX)
bun run typecheck  # TypeScript --noEmit
```

## Local workflow

1. Start PostgreSQL and set `DATABASE_URL`.
2. Run migrations (`bunx prisma migrate deploy` or `migrate dev`).
3. Configure GitHub OAuth and all env vars above.
4. Start the FastAPI backend (`NEXT_PUBLIC_FASTAPI_SERVER_URL`) if you are testing reviews.
5. Run `bun run dev` and open `http://localhost:3000`.

## Project layout (high level)

- `app/` - routes, dashboard, auth UI, API routes (`/api/auth`, `/api/reviews`, `/api/github/*`)
- `components/` - UI and feature components
- `lib/auth.ts` - Better Auth server config and shared Prisma client
- `prisma/` - schema and migrations
- `generated/prisma/` - Prisma client output (generated; do not edit by hand)

## Adding shadcn components

This repo uses the shadcn CLI. Example:

```bash
bunx shadcn@latest add button
```

Import from `@/components/ui/...` as usual.
