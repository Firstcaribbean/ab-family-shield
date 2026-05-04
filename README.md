# Family Safety Platform

Performance-first starter architecture for a family safety product with:

- parent and child mobile experience
- web dashboard for monitoring and reporting
- Fastify API for authentication, location, rules, alerts, and reporting
- shared TypeScript domain models
- PostgreSQL-ready Prisma schema
- multi-page dashboard modules for locations, alerts, controls, reports, and settings

## Stack

- `apps/api`: Fastify + TypeScript + WebSocket-ready architecture
- `apps/web`: Next.js App Router dashboard
- `apps/mobile`: Expo Router starter for parent and child flows
- `packages/shared`: reusable types, mock data, and feature contracts
- `packages/config`: shared lint/type config placeholder space for scaling

## Why this setup performs well

- Fastify keeps the API lean and low-overhead.
- Shared types reduce drift and duplicated parsing logic.
- Next.js server components keep dashboard rendering efficient by default.
- Expo Router gives a clean mobile structure without over-engineering early.
- The data model is shaped around indexed reads for live tracking and alerts.

## Suggested next steps

1. Install dependencies with `pnpm install`
2. Run the API: `pnpm dev:api`
3. Run the web dashboard: `pnpm dev:web`
4. Run the mobile app: `pnpm dev:mobile`
5. Wire real auth, push, maps, and background location services

## Included feature skeletons

- Authentication: register, login, password recovery route scaffolds
- Child management: list child profiles, create child, device link invites
- Live location: latest location and history endpoints
- Alerts and SOS: alert feed and SOS submission endpoint
- Digital safety: screen-time and browsing rule endpoints
- Reports: weekly report snapshots
- Settings: notification and privacy snapshot
- Onboarding UI: parent auth and child profile creation forms

## View On iPhone

1. Start the API with `pnpm dev:api`
2. Start the web app on your local network with `pnpm dev:web:host`
3. Make sure your iPhone is on the same Wi-Fi as your laptop
4. Open `http://YOUR_COMPUTER_IP:3000` in Safari

Example local IP from Windows `ipconfig`: `http://172.20.10.5:3000`

See [docs/architecture.md](/C:/Users/AB%20TECH/Desktop/Family%20safety/docs/architecture.md) and [docs/performance.md](/C:/Users/AB%20TECH/Desktop/Family%20safety/docs/performance.md) for the build strategy.
API endpoints are summarized in [docs/api.md](/C:/Users/AB%20TECH/Desktop/Family%20safety/docs/api.md).
