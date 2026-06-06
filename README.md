<div align="center">

# 🌆 UrbanEye

### Urban Safety & Traffic Intelligence Platform

*A full-stack geospatial civic intelligence platform enabling real-time reporting and monitoring of urban safety incidents*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Real-Time Events](#-real-time-events)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌐 Overview

**UrbanEye** is a production-grade, full-stack geospatial civic intelligence platform designed to improve urban safety by enabling citizens to report infrastructure issues and road incidents in real time. The platform bridges the gap between communities and authorities by providing intelligent, data-driven insights into urban safety patterns.

The platform combines modern web technologies, geospatial databases, and real-time communication systems to deliver a scalable, intelligent urban monitoring solution — featuring interactive mapping, AI-ready incident classification, live updates, and comprehensive administrative tooling.

> **Built with**: MERN Stack · Socket.IO · MongoDB Geospatial Queries · Cloudinary · JWT RBAC

---

## ✨ Features

### 👤 Citizen Features

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | JWT-based login and registration with session management |
| 🗺️ Interactive Map Reporting | Report incidents directly on a Leaflet-powered map using your current geolocation |
| 📸 Image Upload | Attach images to incident reports via a secure Cloudinary pipeline |
| 📰 Incident Feed & Search | Browse, filter, and search all reported incidents in your area |
| 📍 Nearby Incident Discovery | Find incidents within a configurable radius using MongoDB geospatial queries |
| ⚠️ Severity Classification | Tag incidents with severity levels (Low / Medium / High / Critical) |
| 🔔 Real-Time Updates | Receive live incident notifications powered by Socket.IO |
| 🗂️ Personal Incident Management | View, edit, and track the status of your own reported incidents |

### 🛡️ Admin Features

| Feature | Description |
|---|---|
| 📊 Moderation Dashboard | Review and moderate all citizen-submitted incidents |
| 🔄 Status Management | Update incident status (Pending → Verified → Resolved) |
| 📈 Analytics Dashboard | View platform-wide statistics, trends, and category breakdowns |
| 🧭 Severity & Category Insights | Drill into severity distributions and incident categories |
| 🏙️ Urban Safety Monitoring | Real-time overview of citywide safety across all incident types |

### 🌍 Geospatial Features

- Interactive maps powered by **Leaflet** and **React Leaflet**
- Real-time **geolocation-based incident reporting**
- **Distance-based incident search** with configurable radius filters
- **2dsphere geospatial indexing** on MongoDB for high-performance spatial queries
- **GeoJSON** data handling for all location data

### ⚡ Real-Time Features

- Live incident broadcasting to all connected clients
- Real-time admin dashboard synchronization
- Socket.IO-powered event system for instant updates

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React.js](https://reactjs.org) | UI component library |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [React Query (TanStack)](https://tanstack.com/query) | Server state management and caching |
| [Axios](https://axios-http.com) | HTTP client |
| [Leaflet](https://leafletjs.com) / [React Leaflet](https://react-leaflet.js.org) | Interactive maps |
| [Socket.IO Client](https://socket.io) | Real-time WebSocket communication |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [Express.js](https://expressjs.com) | REST API framework |
| [Socket.IO](https://socket.io) | Real-time WebSocket server |
| [JWT](https://jwt.io) | Authentication tokens |
| [Multer](https://github.com/expressjs/multer) | Multipart form data / file uploads |
| [Cloudinary](https://cloudinary.com) | Cloud-based image storage & optimization |
| [Mongoose](https://mongoosejs.com) | MongoDB ODM |

### Database

| Technology | Purpose |
|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud-hosted NoSQL database |
| Mongoose ODM | Schema modeling and query building |
| 2dsphere Index | Geospatial indexing for location queries |

### Deployment

| Service | Purpose |
|---|---|
| [Vercel](https://vercel.com) | Frontend hosting and CDN |
| [Render](https://render.com) / [Railway](https://railway.app) | Backend API hosting |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [Cloudinary](https://cloudinary.com) | Media asset management |

---

## 🏗️ Architecture

### Project Structure

```
urbaneye/
├── client/                         # React frontend
│   └── src/
│       ├── app/                    # App-level configuration
│       ├── api/                    # Axios API client setup
│       ├── assets/                 # Static assets (images, icons)
│       ├── components/             # Reusable UI components
│       ├── context/                # React context providers
│       ├── hooks/                  # Custom React hooks
│       ├── layouts/                # Page layout wrappers
│       ├── pages/                  # Route-level page components
│       ├── routes/                 # React Router configuration
│       ├── services/               # Business logic & API calls
│       ├── styles/                 # Global styles
│       ├── utils/                  # Helper functions
│       ├── App.jsx
│       └── main.jsx
│
└── server/                         # Node.js backend
    └── src/
        ├── config/                 # DB and environment config
        ├── controllers/            # Route handler logic
        ├── routes/                 # Express route definitions
        ├── models/                 # Mongoose data models
        ├── middleware/             # Auth, validation, error handlers
        ├── services/               # Business logic layer
        ├── sockets/                # Socket.IO event handlers
        ├── validators/             # Request validation schemas
        ├── utils/                  # Utility functions
        ├── app.js                  # Express app setup
        ├── server.js               # HTTP server entry point
        └── socketServer.js         # Socket.IO server setup
```

### System Design Overview

```
┌────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                       │
│  Leaflet Map · React Query · Socket.IO Client · Tailwind   │
└───────────────────────┬────────────────────────────────────┘
                        │ HTTP / WebSocket
┌───────────────────────▼────────────────────────────────────┐
│                   BACKEND (Express.js)                      │
│  REST API · JWT Auth · Socket.IO · Multer · Cloudinary     │
└──────────┬─────────────────────────────────┬───────────────┘
           │ Mongoose ODM                    │ Cloudinary SDK
┌──────────▼──────────┐           ┌──────────▼──────────────┐
│   MongoDB Atlas     │           │      Cloudinary CDN      │
│  (2dsphere Index)   │           │   (Image Storage)        │
└─────────────────────┘           └─────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org) `v18.0.0` or higher
- [npm](https://npmjs.com) `v9+` or [yarn](https://yarnpkg.com) `v1.22+`
- [Git](https://git-scm.com)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- A [Cloudinary](https://cloudinary.com) account (free tier works)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/urbaneye.git
cd urbaneye
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Install client dependencies**

```bash
cd ../client
npm install
```

### Environment Variables

**Server — create `server/.env`**

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urbaneye

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_URL=http://localhost:5173
```

**Client — create `client/.env`**

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files to version control.** They are included in `.gitignore` by default.

### Running the Application

**Development — run both servers concurrently**

```bash
# From the project root (if concurrently is set up)
npm run dev

# Or run separately in two terminals:

# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

**The application will be available at:**

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000` |
| API Health Check | `http://localhost:5000/api/v1/health` |

**Production build**

```bash
# Build frontend
cd client
npm run build

# Start backend in production mode
cd server
npm start
```

---

## 📡 API Reference

All API endpoints are prefixed with `/api/v1`. Authentication endpoints are public; all others require a valid JWT Bearer token in the `Authorization` header.

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT token | ❌ |

**Register Request Body:**
```json
{
  "name": "Aditya Raj",
  "email": "aditya@example.com",
  "password": "securepassword123"
}
```

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Aditya Raj",
    "email": "aditya@example.com",
    "role": "citizen"
  }
}
```

---

### Incidents

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/incidents` | Create a new incident report | ✅ |
| `GET` | `/incidents` | Get all incidents (with filters) | ✅ |
| `GET` | `/incidents/:id` | Get a single incident by ID | ✅ |
| `PATCH` | `/incidents/:id` | Update an incident | ✅ |
| `DELETE` | `/incidents/:id` | Delete an incident | ✅ Admin |
| `GET` | `/incidents/nearby` | Get incidents near coordinates | ✅ |

**Create Incident Request Body (multipart/form-data):**
```
title        : "Pothole on MG Road"
description  : "Large pothole causing traffic disruption near signal #4"
category     : "Road Damage"
severity     : "High"
latitude     : 28.6139
longitude    : 77.2090
images       : [file1.jpg, file2.jpg]   (optional)
```

**Query Parameters for `GET /incidents`:**
```
?category=Road Damage
&severity=High
&status=Pending
&page=1
&limit=20
&search=pothole
```

**Query Parameters for `GET /incidents/nearby`:**
```
?latitude=28.6139
&longitude=77.2090
&radius=5000        # radius in meters (default: 5000)
```

---

### Analytics

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/analytics/overview` | Platform-wide statistics | ✅ Admin |
| `GET` | `/analytics/trends` | Incident trends over time | ✅ Admin |

**Overview Response:**
```json
{
  "totalIncidents": 1284,
  "pendingIncidents": 342,
  "resolvedIncidents": 891,
  "criticalIncidents": 51,
  "categoryBreakdown": {
    "Road Damage": 412,
    "Flooding": 198,
    "Streetlight": 156
  },
  "severityBreakdown": {
    "Low": 489,
    "Medium": 531,
    "High": 213,
    "Critical": 51
  }
}
```

---

### Making Authenticated Requests

Include the JWT token in every protected request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },           // bcrypt hashed
  role:      { type: String, enum: ["citizen", "admin"], default: "citizen" },
  createdAt: { type: Date, default: Date.now }
}
```

### Incident Model

```javascript
{
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  severity:    { type: String, enum: ["Low", "Medium", "High", "Critical"] },
  status:      { type: String, enum: ["Pending", "Verified", "In Progress", "Resolved"], default: "Pending" },
  images:      [{ type: String }],                       // Cloudinary URLs
  createdBy:   { type: ObjectId, ref: "User" },

  location: {
    type:        { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]                                // [longitude, latitude]
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}

// Geospatial index for proximity queries
incidentSchema.index({ location: "2dsphere" });
```

> **Note:** MongoDB GeoJSON stores coordinates as `[longitude, latitude]`, not `[latitude, longitude]`.

---

## 🔌 Real-Time Events

UrbanEye uses Socket.IO for bidirectional real-time communication.

### Server → Client Events

| Event | Payload | Description |
|---|---|---|
| `incident:new` | `{ incident }` | A new incident has been reported |
| `incident:updated` | `{ incident }` | An incident has been updated |
| `incident:deleted` | `{ incidentId }` | An incident has been deleted |
| `dashboard:refresh` | `{ stats }` | Admin dashboard stats refreshed |

### Client → Server Events

| Event | Payload | Description |
|---|---|---|
| `subscribe:area` | `{ lat, lng, radius }` | Subscribe to incidents in an area |
| `unsubscribe:area` | — | Unsubscribe from area updates |

### Socket.IO Connection Example

```javascript
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: { token: localStorage.getItem("token") }
});

socket.on("incident:new", (data) => {
  console.log("New incident reported:", data.incident);
});
```

---

## 🔐 Security

UrbanEye implements a comprehensive security model:

| Layer | Implementation |
|---|---|
| **Authentication** | JWT tokens with expiry (`7d` default) |
| **Authorization** | Role-based access control (RBAC) — `citizen` and `admin` roles |
| **Request Validation** | Schema-based input validation on all endpoints |
| **Rate Limiting** | express-rate-limit on auth endpoints to prevent brute force |
| **Input Sanitization** | Strips dangerous characters and HTML from all user inputs |
| **File Upload Security** | MIME type validation, file size limits, Cloudinary-hosted assets |
| **Error Handling** | Centralized error middleware — no stack traces leaked in production |
| **CORS** | Configured to allow only the frontend origin |

---

## ☁️ Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel --prod
```

Set environment variables in your [Vercel Dashboard](https://vercel.com/dashboard):
- `VITE_API_BASE_URL`
- `VITE_SOCKET_URL`

### Backend (Render / Railway)

1. Connect your GitHub repository to [Render](https://render.com) or [Railway](https://railway.app)
2. Set the **root directory** to `server/`
3. Set the **start command** to `npm start`
4. Add all environment variables from `server/.env`

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Whitelist your server's IP address (or `0.0.0.0/0` for development)
3. Create a database user and copy the connection string to `MONGODB_URI`
4. The 2dsphere index is created automatically via Mongoose on first run

---

## 🔮 Future Enhancements

### AI-Powered Features
- [ ] Automatic incident classification using NLP
- [ ] Severity prediction from image analysis
- [ ] Duplicate incident detection with similarity scoring
- [ ] Smart risk assessment and danger zone alerts

### Advanced Geospatial Features
- [ ] Heatmaps for visualizing incident density
- [ ] Marker clustering for high-density areas
- [ ] Danger zone polygon detection and alerting
- [ ] Traffic congestion analytics integration

### Infrastructure & DevOps
- [ ] Redis caching for analytics and frequently accessed data
- [ ] Background job processing (Bull / BullMQ)
- [ ] Full Dockerization with `docker-compose`
- [ ] CI/CD pipelines via GitHub Actions
- [ ] Centralized logging with Winston + Datadog / Logtail
- [ ] Performance monitoring with New Relic or Sentry

---

## 🤝 Contributing

Contributions are welcome! Please follow the steps below:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org) specification for commit messages.

### Development Guidelines

- Run `npm run lint` before submitting a PR
- Write clear, descriptive commit messages
- Keep PRs focused — one feature or fix per PR
- Update documentation if you change API contracts or environment variables

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Aditya Raj**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

<div align="center">

**UrbanEye** — Making cities safer, one report at a time. 🏙️

⭐ If you found this project helpful, please consider giving it a star!

</div>
