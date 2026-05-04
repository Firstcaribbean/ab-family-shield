# Architecture

## System shape

This repository uses a monorepo so mobile, web, and backend can share contracts without copy-paste.

```text
apps/
  api/      Fastify server, realtime alerts, reporting, auth hooks
  mobile/   Expo Router app for parent and child experiences
  web/      Next.js admin and parent dashboard
packages/
  shared/   shared types, DTOs, mock data, constants
```

## Performance-first decisions

- Fastify over heavier Node frameworks for lower request overhead
- Shared DTOs to avoid repeated data transforms
- Server-first dashboard rendering to reduce client bundle size
- Location writes designed for append-only ingestion
- Geofence and alert logic isolated into stateless services

## Core services

- `auth`: email, phone, Google, Apple
- `children`: profiles, device linking, guardianship
- `locations`: realtime GPS ingest and latest snapshot reads
- `alerts`: SOS, zone entry, unsafe activity, device health
- `screen-time`: policy evaluation and schedules
- `browsing`: category filtering, blocked domains, browsing logs
- `reports`: weekly summary aggregation
- `settings`: notification, privacy, and emergency contact controls

## Recommended infrastructure

- API: Node.js on Fly.io, Railway, or AWS ECS
- Database: PostgreSQL with PostGIS if map queries grow
- Cache/realtime: Redis + WebSockets
- Push: Firebase Cloud Messaging and APNs
- Object/event storage: S3-compatible bucket for report exports and audit logs
