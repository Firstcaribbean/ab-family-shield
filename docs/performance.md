# Performance Strategy

## API

- Use Fastify schema validation to keep handlers cheap and predictable.
- Separate hot paths:
  - location ingest
  - latest location reads
  - alert fan-out
- Store latest child location in a fast lookup table or materialized view.
- Batch writes where eventual consistency is acceptable.

## Database

- Index `(childId, recordedAt desc)` for location history
- Index `(childId, createdAt desc)` for alerts feed
- Partition large telemetry tables once growth demands it
- Precompute weekly reports instead of aggregating on every request

## Web

- Keep dashboard widgets server-rendered until interactivity is necessary.
- Stream slower widgets independently.
- Use dynamic imports only for maps and large charting modules.
- Avoid fetching duplicate child status data in multiple components.

## Mobile

- Sync essential state only: latest location, alerts, rules
- Throttle background GPS updates based on movement and battery state
- Cache dashboard data locally for cold-start speed
- Defer heavy analytics screens until requested

## Product rollout order

1. Auth
2. Child linking
3. Live location
4. Alerts and SOS
5. Screen time and browsing controls
6. Reports and analytics
