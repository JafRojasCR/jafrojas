# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Rate Limiting

All API endpoints are rate-limited to prevent abuse:
- **General API calls**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Write operations** (POST/PUT/DELETE): 20 requests per 15 minutes per IP

When rate limit is exceeded, you'll receive a 429 status code with an appropriate error message.

## Authentication

Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 7 days and must be refreshed by logging in again.

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "email": "admin@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Projects

#### Get All Projects
```http
GET /api/projects
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Portfolio Website",
    "description": "A personal portfolio website",
    "longDescription": "Detailed description...",
    "imageUrl": "https://example.com/image.jpg",
    "technologies": ["React", "Node.js", "MongoDB"],
    "githubUrl": "https://github.com/user/project",
    "liveUrl": "https://project.example.com",
    "featured": true,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Project
```http
GET /api/projects/:id
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Portfolio Website",
  "description": "A personal portfolio website",
  "longDescription": "Detailed description...",
  "imageUrl": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/user/project",
  "liveUrl": "https://project.example.com",
  "featured": true,
  "order": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Create Project (Protected)
```http
POST /api/projects
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description",
  "longDescription": "Detailed project description",
  "imageUrl": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "githubUrl": "https://github.com/user/project",
  "liveUrl": "https://project.example.com",
  "featured": false,
  "order": 1
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "New Project",
  "description": "Project description",
  ...
}
```

#### Update Project (Protected)
```http
PUT /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (same as create, all fields optional)

**Response:** Updated project object

#### Delete Project (Protected)
```http
DELETE /api/projects/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

---

### Social Media

#### Get All Social Media Links
```http
GET /api/social-media
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "platform": "instagram",
    "url": "https://instagram.com/username",
    "displayName": "Instagram",
    "icon": "📷",
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Social Media Link
```http
GET /api/social-media/:id
```

**Response:** Single social media object

#### Create Social Media Link (Protected)
```http
POST /api/social-media
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "platform": "linkedin",
  "url": "https://linkedin.com/in/username",
  "displayName": "LinkedIn",
  "icon": "💼",
  "order": 2
}
```

**Platform Options:** `instagram`, `linkedin`, `github`, `twitter`, `facebook`, `other`

**Response:** Created social media object

#### Update Social Media Link (Protected)
```http
PUT /api/social-media/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (same as create, all fields optional)

**Response:** Updated social media object

#### Delete Social Media Link (Protected)
```http
DELETE /api/social-media/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Social media link deleted successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```
or
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!"
}
```

## Examples Using cURL

### Login and Create a Project
```bash
# Login
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | jq -r '.token')

# Create a project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My Awesome Project",
    "description": "A cool project I built",
    "technologies": ["React", "Node.js", "MongoDB"],
    "githubUrl": "https://github.com/user/project"
  }'
```

### Get All Projects
```bash
curl http://localhost:3000/api/projects
```

### Add Social Media Link
```bash
curl -X POST http://localhost:3000/api/social-media \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "platform": "linkedin",
    "url": "https://linkedin.com/in/jafrojas",
    "displayName": "LinkedIn"
  }'
```
