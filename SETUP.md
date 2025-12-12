# Setup Instructions

## MongoDB Setup

This application requires MongoDB to be running. You have several options:

### Option 1: Local MongoDB Installation

**Ubuntu/Debian:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download and install from: https://www.mongodb.com/try/download/community

### Option 2: MongoDB Cloud (Atlas)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `.env.local` with your connection string (see `.env.local.example`):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jafrojas
```

### Option 3: Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Initial Setup

Once MongoDB is running:

1. Install dependencies and create your environment file:
```bash
npm install
cp .env.local.example .env.local
# Update .env.local with your secrets (MongoDB URI, JWT secret, etc.)
```

2. Start the full stack (Express API + Vite frontend):
```bash
npm run dev
```

3. Register the first admin user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

4. Open http://localhost:5173 in your browser

5. Login with the credentials you just created

6. Add some social media links and projects through the admin dashboard

## Testing

You can test the API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Get all projects (public)
curl http://localhost:3000/api/projects

# Get all social media (public)
curl http://localhost:3000/api/social-media

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Create a project (requires authentication)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Project",
    "description": "A sample project",
    "technologies": ["React", "Node.js"],
    "githubUrl": "https://github.com/example/project"
  }'
```
