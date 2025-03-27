
# 🗺️ Phase 1: Environment Setup — Web Mapping App

This document walks you through setting up your environment for a simplified web mapping application using:

- React 18 + Leaflet (frontend)
- Node.js + Express (backend)
- PostgreSQL + PostGIS (database)
- Git + GitHub (version control)

---

## ✅ Tools Required

Make sure you have these installed:

| Tool | Purpose | Link |
|------|---------|------|
| Node.js (LTS) | JavaScript runtime for frontend and backend | https://nodejs.org |
| PostgreSQL | Database to store spatial + business data | https://www.postgresql.org/download/windows/ |
| PostGIS | Spatial extension for PostgreSQL | Installed via StackBuilder |
| Git | Version control | https://git-scm.com |

### 🔍 Verify PostGIS Installation

Open pgAdmin or psql, run:

```sql
SELECT PostGIS_version();
```

If it returns a version (like `3.3`), you're ready.

---

## 📁 Folder Structure

Create the project directory and subfolders:

```bash
mkdir web-mapping-app
cd web-mapping-app
mkdir frontend
mkdir backend
```

You now have:

```
web-mapping-app/
├── frontend/   ← React + Leaflet frontend
└── backend/    ← Node + Express backend
```

---

## ⚛️ Frontend Setup (React + Leaflet)

### 📍 Step 1: Initialize React App

```bash
cd web-mapping-app
npx create-react-app . --template cra-template
```

### 📍 Step 2: Install Required Packages

```bash
npm install react-leaflet leaflet axios @turf/turf
```

### 📍 Step 3: Add Leaflet CSS

In `src/index.js` or `src/main.jsx`, import Leaflet’s default styling:

```js
import 'leaflet/dist/leaflet.css';
```

This enables proper rendering of map tiles and controls.

---

## 🔧 Backend Setup (Node + Express + PostgreSQL)

### 📍 Step 1: Initialize Node App

```bash
cd ../web-mapping-app
npm init -y
```

### 📍 Step 2: Install Dependencies

```bash
npm install express pg cors dotenv
```

### 📍 Step 3: Create Core Files

Create an entry point and config file:

```bash
touch index.js
touch .env
```

> These will be set up in Phase 2 for database connection and API routes.

---

## 🌱 Git Repository (Optional)

If you'd like to version control from the beginning:

```bash
cd ..
git init
git add .
git commit -m "Phase 1: Environment setup complete"
```

You can connect to GitHub using:

```bash
git remote add origin https://github.com/yourusername/web-mapping-app.git
git push -u origin main
```

---

## ✅ Summary

At this point, your system is ready with:

- All required tools installed
- Clean folder structure
- Frontend with React + Leaflet set up
- Backend with Express + PostgreSQL ready to build
- Optional Git version control started