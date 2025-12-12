# Vercel Deployment Guide

This project is ready to deploy directly to Vercel using a single repository. The frontend (React + Vite) builds to static assets while the Express API runs through a serverless function located at `api/index.js`.

## 1. Prerequisites
- Vercel account (free tier works)
- MongoDB connection string (Atlas recommended)

## 2. Environment Variables
Configure the following variables in the Vercel dashboard (Project Settings → Environment Variables):

| Key | Example | Scope |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/db` | Production / Preview / Development |
| `JWT_SECRET` | `super-secret-string` | Production / Preview / Development |
| `NODE_ENV` | `production` | Production |
| `PORT` | `3000` | Development (optional) |

> Frontend variables must be prefixed with `VITE_` to be exposed. The API URL is already hard-coded to `/api`, so no additional variable is required.

## 3. Project Settings
When importing the repository into Vercel, use the following settings:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `frontend/dist`
- **Development Command** (optional): `npm run dev`

The included `vercel.json` mirrors these settings and adds a rewrite so that `/api/*` routes are handled by the serverless function.

## 4. Deployment Steps
1. Push your changes to GitHub (or another Git provider).
2. On Vercel, click **New Project** → **Import Git Repository**.
3. Select this repository and configure the environment variables.
4. Vercel runs `npm install` and `npm run build` automatically.
5. The build output in `frontend/dist` is served as static assets.
6. API requests to `/api/*` are executed by `api/index.js`, which wraps the Express app using `serverless-http`.

## 5. Local Verification (Recommended)
Before pushing to Vercel:
```bash
npm install
cp .env.local.example .env.local
# fill in MONGODB_URI + JWT_SECRET
npm run dev
```
Visit `http://localhost:5173` to confirm the app works end-to-end.

To test the production build locally:
```bash
npm run build
npm run preview
```
The preview command serves `frontend/dist` on `http://localhost:4173` while the backend remains available on `http://localhost:3000`.

## 6. Troubleshooting
- **Missing dependencies**: ensure `npm install` completes successfully on Vercel. The root `package.json` holds every dependency required for both frontend and backend.
- **API 500 errors**: verify MongoDB credentials (`MONGODB_URI`) and JWT secret.
- **Frontend calling wrong API URL**: the frontend defaults to `/api`, so no extra variables are needed. Double-check that requests are not being made to absolute URLs.
- **Cold starts**: Vercel serverless functions may have cold starts. The MongoDB connection helper caches the connection to minimize this overhead.

## 7. Useful Commands
- `npm run dev` – Local development (Express + Vite)
- `npm run build` – Production build for Vercel
- `npm run preview` – Serve the production build locally
- `npm run seed` – Seed the MongoDB database with sample data

Once deployed, Vercel shows both the static frontend and the `/api` endpoints in the same project, giving you a unified deployment pipeline.
