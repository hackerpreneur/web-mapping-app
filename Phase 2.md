# ✅ Phase 2: Backend with Express + PostgreSQL (PostGIS)

## 🎯 Goal
Set up a backend API using Express.js that connects to PostgreSQL + PostGIS and returns spatial data for a user-defined polygon.

---

## 📁 Folder Structure
This phase works inside your `/backend` folder.

---

## 🔧 Step 1: Setup `.env`
Create a `.env` file with your PostgreSQL connection details:
```
DB_USER=your_db_user  
DB_PASS=your_db_password  
DB_NAME=your_db_name  
DB_HOST=localhost  
DB_PORT=5432  
```

---

##⚙️ Step 2: Install Dependencies
In `/backend`, install the required packages:
```bash
npm init -y
npm install express pg cors dotenv
```

---

## 📦 Step 3: Create API Server

Create `index.js` in the `backend` folder.  
This file:
- Starts an Express server
- Connects to your database
- Has a `/api/query` route to receive GeoJSON and return spatial results

(You’ll push the actual file to your repo)

---

## 🗃️ Step 4: Create a Sample Table in PostgreSQL

In pgAdmin or psql, create a `businesses` table:

- Columns: `id`, `name`, `geom`
- Geometry type: `Point`, SRID 4326
- Insert 2–3 sample points using `ST_SetSRID(ST_Point(...), 4326)`

---

## 🚀 Step 5: Run the Server

```bash
node index.js
```

Check it’s running at: `http://localhost:4000`

---

## 🧪 Step 6: Test the API

Use **Postman**:
- **POST** to `http://localhost:4000/api/query`
- Body: A GeoJSON polygon (that includes some of your test points)

If successful, you’ll get back GeoJSON features from the database.

---
