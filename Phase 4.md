# Phase 4: Spatial Analysis, Business Markers, Footfall & CSV Export

This phase added spatial querying and frontend visual analysis. It connected the map's drawing tools to backend spatial queries and delivered useful business insights in a visual, interactive format.

---

## ✅ Features Completed

### 📍 Spatial Query & Drawing Integration
- Users can draw a polygon on the map using Leaflet Draw.
- Drawn shape is converted to GeoJSON and sent to the backend.
- Backend queries PostGIS to return businesses inside the selected polygon using `ST_Within`.

### 🧮 Area Calculation (Frontend)
- Uses Turf.js to calculate area of the drawn polygon.
- Displayed in hectares for easy understanding.

### 📊 Business Markers on the Map
- Returned results are shown as Leaflet markers.
- Each marker includes:
  - Business name
  - Randomly generated mock footfall number

### 🎨 Color-coded Footfall Markers
- Green: Low footfall
- Orange: Medium footfall
- Red: High footfall
- Implemented using Leaflet `divIcon` for simple colored dots.

### 📋 Sidebar Insights
- Shows:
  - Total number of businesses found
  - Area of selected polygon
  - Clickable business names (fly-to location)

### 🔁 Reset Functionality
- "Clear" button to remove drawn polygons and reset the results state.

### 📤 CSV Export
- Button to export current business results to CSV file with:
  - Name
  - Coordinates
  - Footfall

---

## 🛠️ Stack Used
- React + React Leaflet
- Leaflet Draw for polygon tools
- Turf.js for area calculations
- PostGIS for spatial backend queries
- Axios for API calls between frontend and backend

