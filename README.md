# UrbanEye – AI-Powered Urban Safety & Traffic Intelligence Platform

## Overview

UrbanEye is a full-stack geospatial civic intelligence platform designed to improve urban safety by enabling citizens to report infrastructure issues and road incidents in real time.

The platform provides interactive mapping, incident reporting, geospatial analytics, real-time updates, and administrative monitoring tools to help communities and authorities identify, track, and respond to public safety concerns efficiently.

UrbanEye combines modern web technologies, geospatial databases, and real-time communication systems to create a scalable and intelligent urban monitoring solution.

---

## Key Features

### Citizen Features

* Secure Authentication & Authorization
* Interactive Map-Based Incident Reporting
* Image Upload Support
* Incident Feed & Search
* Nearby Incident Discovery
* Severity Classification
* Real-Time Incident Updates
* Personal Incident Management

### Admin Features

* Incident Moderation Dashboard
* Incident Status Management
* Analytics Dashboard
* Severity & Category Insights
* Urban Safety Monitoring

### Geospatial Features

* Interactive Maps using Leaflet
* Geolocation-Based Reporting
* Distance-Based Incident Search
* Nearby Incident Discovery
* Geospatial Indexing using MongoDB 2dsphere

### Real-Time Features

* Live Incident Broadcasting
* Real-Time Dashboard Updates
* Socket.IO Integration

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* React Query
* Axios
* Leaflet
* React Leaflet
* Socket.IO Client

### Backend

* Node.js
* Express.js
* JWT Authentication
* Socket.IO
* Multer
* Cloudinary

### Database

* MongoDB Atlas
* Mongoose ODM
* Geospatial Indexes (2dsphere)

### Deployment

* Vercel (Frontend)
* Render / Railway (Backend)
* MongoDB Atlas

---

## Project Architecture

### Backend

```bash
src/
├── config/
├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
├── sockets/
├── validators/
├── utils/
├── app.js
├── server.js
└── socketServer.js
```

### Frontend

```bash
src/
├── app/
├── api/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

---

## Core Modules

### Authentication System

* JWT-based Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* User Session Management

### Incident Management System

* Create Incident Reports
* Upload Incident Images
* Assign Severity Levels
* Categorize Incidents
* Geolocation Storage

### Geospatial Intelligence

* Coordinate-Based Reporting
* Nearby Incident Discovery
* Distance Filtering
* Spatial Queries
* GeoJSON Data Handling

### Analytics Dashboard

* Incident Statistics
* Category Distribution
* Severity Insights
* Trend Analysis

### Real-Time Communication

* Live Incident Broadcasting
* Dashboard Synchronization
* Socket-Based Updates

---

## Database Schema Highlights

### User

```js
{
  name,
  email,
  password,
  role
}
```

### Incident

```js
{
  title,
  description,
  category,
  severity,
  status,
  images,
  createdBy,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  }
}
```

### Geospatial Index

```js
incidentSchema.index({
  location: "2dsphere"
});
```

---

## API Highlights

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Incidents

```http
POST   /api/v1/incidents
GET    /api/v1/incidents
GET    /api/v1/incidents/:id
PATCH  /api/v1/incidents/:id
DELETE /api/v1/incidents/:id
```

### Analytics

```http
GET /api/v1/analytics/overview
GET /api/v1/analytics/trends
```

---

## Security Features

* JWT Authentication
* Role-Based Authorization
* Request Validation
* Rate Limiting
* Input Sanitization
* Secure File Upload Handling
* Error Handling Middleware

---

## Future Enhancements

### AI-Powered Features

* Automatic Incident Classification
* Severity Prediction
* Duplicate Incident Detection
* Smart Risk Assessment

### Advanced Geospatial Features

* Heatmaps
* Marker Clustering
* Danger Zone Detection
* Traffic Congestion Analytics

### Production Enhancements

* Redis Caching
* Background Jobs
* Queue Processing
* Dockerization
* CI/CD Pipelines
* Monitoring & Logging

---

## Learning Outcomes

This project demonstrates practical implementation of:

* Full-Stack MERN Development
* Geospatial Database Design
* Real-Time Systems
* REST API Architecture
* Authentication & Authorization
* File Upload Pipelines
* React Query Data Management
* Socket.IO Communication
* Scalable Backend Design
* System Design Fundamentals

---

## Resume Description

Built **UrbanEye**, a full-stack geospatial civic intelligence platform enabling real-time reporting and monitoring of urban safety incidents. Implemented interactive mapping, geospatial indexing, image uploads, analytics dashboards, role-based access control, and live incident synchronization using the MERN stack, MongoDB geospatial queries, and Socket.IO.

---

## Author

Aditya Raj

UrbanEye © 2026
