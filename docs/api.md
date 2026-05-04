# API Surface

Base health route:

- `GET /health`

Feature routes:

- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/auth/forgot-password`
- `GET /v1/dashboard`
- `GET /v1/children`
- `GET /v1/children/:id`
- `POST /v1/children`
- `GET /v1/children/:id/location`
- `GET /v1/children/:id/location-history`
- `GET /v1/children/:id/link-invite`
- `GET /v1/alerts`
- `POST /v1/alerts/sos`
- `GET /v1/reports/weekly`
- `GET /v1/settings`
- `GET /v1/rules/screen-time`
- `GET /v1/rules/browsing`
- `GET /v1/browsing/logs`
- `GET /v1/sos-events`

## Notes

- Routes currently return demo-backed data from a shared in-memory store.
- The route shape now goes through repository and service layers so it is ready to swap to Prisma-backed persistence later.
- The dashboard web app already consumes `GET /v1/dashboard` when `NEXT_PUBLIC_API_URL` is configured.
- The onboarding page uses:
  - `POST /v1/auth/login`
  - `POST /v1/auth/register`
  - `POST /v1/children`
