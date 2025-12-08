# Jafet Rojas - Personal Portfolio Website

Personal page for Jafet Alonso Rojas Bello, handling portfolios, previews of projects and so much more!

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
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── config/    # Database configuration
│   │   ├── models/    # Mongoose models
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/    # API routes
│   │   └── middleware/ # Auth middleware
│   ├── server.js      # Entry point
│   └── package.json
│
└── frontend/          # React + Vite frontend
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   ├── context/     # React context
    │   └── utils/       # Utility functions
    └── package.json
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

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:

Backend (.env):
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jafrojas
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Frontend (.env):
```
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

4. Access the application:
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

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Jafet Alonso Rojas Bello
