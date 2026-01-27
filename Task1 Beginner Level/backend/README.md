# MongoDB Backend Integration Guide

## What Was Created

A complete Node.js/Express backend with MongoDB integration for your LinkedIn-style portfolio platform.

### Backend Structure
```
server/
├── server.js                  # Main Express server
├── package.json              # Dependencies
├── .env                      # Environment variables
├── models/
│   └── Models.js            # Mongoose schemas
├── routes/
│   ├── auth.js              # Authentication endpoints
│   ├── profile.js           # Profile management
│   ├── posts.js             # Posts & comments & likes
│   ├── skills.js            # Skills management
│   ├── projects.js          # Projects CRUD
│   ├── certifications.js    # Certifications CRUD
│   ├── experience.js        # Experience CRUD
│   ├── education.js         # Education CRUD
│   └── analytics.js         # Analytics tracking
└── middleware/
    └── auth.js              # JWT authentication
```

### Frontend Updates
- `api-service.js`: New API service to replace localStorage

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on **http://localhost:5000**

### 3. Update Frontend
Replace all `data-store.js` imports with `api-service.js`:

```javascript
// OLD
import dataStore from './data-store.js';

// NEW
import apiService from './api-service.js';
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Profile (Public GET, Admin PUT)
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile (admin only)

### Posts (Public GET, Admin CUD)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

### Comments (Public)
- `GET /api/posts/:id/comments` - Get comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:postId/comments/:commentId` - Delete (admin)

### Likes (Public)
- `GET /api/posts/:id/likes` - Get likes
- `POST /api/posts/:id/like` - Toggle like

### Skills, Projects, Certifications, Experience, Education
All follow same pattern:
- `GET /api/{resource}` - Get all (public)
- `POST /api/{resource}` - Create (admin)
- `PUT /api/{resource}/:id` - Update (admin)
- `DELETE /api/{resource}/:id` - Delete (admin)

### Analytics
- `GET /api/analytics` - Get analytics
- `POST /api/analytics/profile-view` - Increment views

## Authentication Flow

### Admin Login
```javascript
const result = await apiService.login('admin', 'admin123');
// Token stored in localStorage automatically
```

### Protected Routes
All admin-only endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

## Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

## MongoDB Connection
Your connection string is configured in `.env`:
```
mongodb+srv://portfolio:giri@portfolio.sdlegg2.mongodb.net/?appName=portfolio
```

## Migration Notes

### From localStorage to MongoDB
The new system stores data in MongoDB instead of browser localStorage:

**Benefits:**
- ✅ Data persists across browsers
- ✅ No storage limits
- ✅ Centralized data management
- ✅ Proper user authentication
- ✅ Public can view, only admin can  edit

**Changes Needed:**
1. Update all frontend files to use `apiService` instead of `dataStore`
2. Start backend server before using the app
3. Both servers must run: frontend (Vite) + backend (Express)

## Running Both Servers

### Terminal 1 - Frontend
```bash
npm run dev
```
Runs on: http://localhost:5173

### Terminal 2 - Backend
```bash
cd server
npm run dev
```
Runs on: http://localhost:5000

## Next Steps

1. ✅ Backend server created
2. ✅ API endpoints implemented
3. ✅ MongoDB models defined
4. ✅ Authentication middleware added
5. ⏳ Update frontend files to use API service
6. ⏳ Test all features with MongoDB

## Frontend Files to Update

Priority files that need `dataStore` → `apiService` migration:
1. `admin.html` - Login page
2. `admin-dashboard.html` - Dashboard with all management
3. `feed.html` - Posts feed
4. Any other files importing `data-store.js`

The migration is mostly find-and-replace with async/await:

```javascript
// Before
const profile = dataStore.getProfile();

// After
const profile = await apiService.getProfile();
```

Let me know when you're ready and I'll help update the frontend files!
