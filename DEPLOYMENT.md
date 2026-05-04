# Deployment Guide

This project has three deploy targets:

1. Web dashboard
2. API server
3. Mobile app

## Best first deployment

The easiest first launch is:

1. Deploy `apps/web` to Vercel
2. Deploy `apps/api` to Railway
3. Keep `apps/mobile` in Expo until the app is ready for store builds

That gives you a live web dashboard and a hosted backend quickly.

## Before deploying

From the project root:

```powershell
cd "C:\Users\AB TECH\Desktop\Family safety"
npm install -g pnpm
pnpm install
```

Copy env values:

```powershell
Copy-Item .env.example .env
Copy-Item apps\web\.env.example apps\web\.env.local
```

## Deploy the web dashboard to Vercel

The dashboard lives in `apps/web`.

### Vercel dashboard method

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/).
3. Import the GitHub repository.
4. Set the Root Directory to `apps/web`.
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`
6. Deploy.

### Important note

Because this is a monorepo, Vercel also needs access to the root `package.json` and workspace files. Importing the whole repo is correct. Only the web app root should be set to `apps/web`.

## Deploy the API to Railway

The API lives in `apps/api`.

### Railway dashboard method

1. Push this repository to GitHub.
2. Go to [Railway](https://railway.com/).
3. Create a new project from the GitHub repo.
4. Set the service root to the repository root.
5. Use Docker deployment with `apps/api/Dockerfile`, or configure the start command manually.
6. Add environment variables:
   - `PORT=4000`
   - `HOST=0.0.0.0`
   - `DATABASE_URL=...`

### API start command if not using Docker

```powershell
pnpm install
pnpm --filter @family-safety/shared build
pnpm --filter @family-safety/api build
node apps/api/dist/server.js
```

## Deploy the mobile app

The mobile app is in `apps/mobile`.

For a real mobile release, the simplest route is Expo EAS:

1. Install Expo/EAS CLI
2. Sign in to Expo
3. Configure the project
4. Build Android/iOS packages
5. Submit to Play Store / App Store

Useful docs:

- [Expo EAS Update docs](https://docs.expo.dev/eas-update/introduction/)
- [Expo deployment workflow](https://docs.expo.dev/eas-update/deployment/)

## Current limitation

This repository is a strong starter, not a finished production system yet. Before public launch, you will still want:

- real authentication
- real database migrations
- push notifications
- background location services
- maps integration
- secure device linking
- app store configuration

## Recommended order

1. Deploy the API
2. Put the API URL into `apps/web` as `NEXT_PUBLIC_API_URL`
3. Deploy the web dashboard
4. Test both together
5. Build the Expo mobile app
