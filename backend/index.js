const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Sample spatial query route
app.post('/api/query', async (req, res) => {
  const { polygon } = req.body; // GeoJSON polygon

  try {
    const query = `
      SELECT name, ST_AsGeoJSON(geom) AS geometry
      FROM businesses
      WHERE ST_Within(
        geom,
        ST_SetSRID(ST_GeomFromGeoJSON($1), 4326)
      )
    `;
    const result = await pool.query(query, [JSON.stringify(polygon)]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error running spatial query');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
