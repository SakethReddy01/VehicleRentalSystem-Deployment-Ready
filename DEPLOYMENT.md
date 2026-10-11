# Vehicle Rental System — Deployment Guide

This repository contains a React/Vite frontend and Spring Boot Java 21 backend. Deployment services must be configured using your own hosting accounts.

## Recommended hosting
- Frontend: Vercel (root directory `frontend`)
- Backend + MySQL: Railway (root directory `backend`, Dockerfile included)

## 1. Keep the GitHub repository up to date
Commit and push future project changes to this repository before importing it into Vercel or Railway. Do not upload `node_modules`, `target`, or secrets.

## 2. Deploy backend on Railway
1. Sign in at https://railway.app and create a project from your GitHub repository.
2. Add a MySQL database to the same Railway project.
3. Create a service from the repository and set its Root Directory to `backend`. Railway should detect `backend/Dockerfile`.
4. In the backend service variables, add:
   - `DB_URL=jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true`
   - `DB_USERNAME=${{MySQL.MYSQLUSER}}`
   - `DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}`
   - `APP_CORS_ALLOWED_ORIGINS=https://YOUR-VERCEL-DOMAIN.vercel.app`
5. Railway variable reference syntax may require selecting the MySQL service from its variable picker. Ensure the generated DB URL is a `jdbc:mysql://...` URL.
6. Deploy and copy the public backend domain. Confirm the service is listening on its assigned `PORT`. API endpoints are under `/api`.

## 3. Deploy frontend on Vercel
1. Sign in at https://vercel.com and import the same GitHub repository.
2. Set Root Directory to `frontend`. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install`.
3. Add environment variable `VITE_API_URL` with the backend's public origin only, e.g. `https://your-backend.up.railway.app` (do not append `/api`).
4. Deploy. Copy the Vercel domain and update the backend's `APP_CORS_ALLOWED_ORIGINS` to that exact origin, then redeploy the backend.

## Important
- The frontend now reads `VITE_API_URL`; locally it falls back to `http://localhost:8080`.
- Controller CORS origins are configurable using `APP_CORS_ALLOWED_ORIGINS` (Spring maps this to `app.cors.allowed-origins`).
- Do not expose database credentials in frontend variables or commit them to GitHub.
- Before public use, replace the demo admin password and add proper authentication/authorization. The existing API has college-demo limitations and should not be treated as production-secure.
- If the GitHub repo's current branch differs from the branch Vercel/Railway imports, select the branch containing these changes.
