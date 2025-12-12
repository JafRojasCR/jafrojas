# Jafet Rojas - Personal Portfolio Website

Personal page for Jafet Alonso Rojas Bello, handling portfolios, previews of projects and so much more!

> Unified setup: install and run everything from the repo root with `npm install` then `npm run dev` (backend on 3000, frontend on 5173 via proxy). Keep all env vars in `.env.local` at the repo root. Deploy to Vercel by running `npm run build`; `/api/*` requests are handled via `api/index.js`.

## Features

- **Landing Page**: Professional landing page with personal information and social media links
- **Portfolio Page**: Display of personal projects with details, technologies used, and links
- **Admin Dashboard**: Protected admin area for content management
- **Project Management**: Create, edit, and delete projects
- **Social Media Management**: Manage social media links (Instagram, LinkedIn, etc.)
- **Authentication**: Secure login system for admin access

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
jafrojas/
├── api/               # Vercel serverless entrypoint (wraps Express app)
├── backend/           # Node.js + Express backend
│   ├── app.js         # Shared Express app
│   ├── server.js      # Local server entry point
│   └── src/           # Config, models, controllers, routes, middleware
├── frontend/          # React + Vite frontend
│   ├── index.html
│   ├── public/
│   └── src/           # Components, pages, services, context
├── .env.local.example # Sample env vars shared by frontend/back
└── package.json       # Single install + script entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JafRojasCR/jafrojas.git
cd jafrojas
```

2. Install dependencies (single command):
```bash
npm install
```

3. Configure environment variables by copying the sample file:
```bash
cp .env.local.example .env.local
# Edit .env.local to match your MongoDB connection + secrets
```

### Running the Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the full stack (backend + frontend) from the repo root:
```bash
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## First Time Setup

1. Create an admin user by making a POST request to `/api/auth/register`:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "your_secure_password"
  }'
```

2. Login at http://localhost:5173/login with your credentials

3. Access the admin dashboard at http://localhost:5173/admin

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user (protected)

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get project by ID
- POST `/api/projects` - Create project (protected)
- PUT `/api/projects/:id` - Update project (protected)
- DELETE `/api/projects/:id` - Delete project (protected)

### Social Media
- GET `/api/social-media` - Get all social media links
- GET `/api/social-media/:id` - Get link by ID
- POST `/api/social-media` - Create link (protected)
- PUT `/api/social-media/:id` - Update link (protected)
- DELETE `/api/social-media/:id` - Delete link (protected)

## Building for Production

Create an optimized production build (frontend assets + serverless API wiring):
```bash
npm run build
```

The compiled frontend lives in `frontend/dist`. When deploying to Vercel, the default settings work:

- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Serverless API**: `/api/index.js` (no extra config needed)

To preview the production build locally:
```bash
npm run preview
```

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Jafet Alonso Rojas Bello
