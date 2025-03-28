# Phase 3: Frontend Map with Drawing Tool

## Objective
Integrate an interactive map in the React frontend that allows users to draw a polygon boundary and send that shape to the backend for spatial analysis.

## Tasks Completed

1. **Installed Frontend Mapping Libraries**
   - Installed required packages:
     ```
     npm install react-leaflet leaflet react-leaflet-draw axios
     ```

2. **Imported Leaflet and Draw Tool CSS**
   - To ensure map and drawing tools render correctly, we added:
     ```js
     import 'leaflet/dist/leaflet.css';
     import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
     ```

3. **Created `MapComponent.js`**
   - Rendered the map using `MapContainer` and OpenStreetMap tile layer.
   - Integrated drawing tools using `EditControl` from `react-leaflet-draw`.
   - Captured polygon geometry in GeoJSON format upon drawing.
   - Sent the polygon to the backend via an API request using Axios.

4. **Connected with Backend**
   - On successful API response, displayed the count of businesses returned.
   - Console-logged the spatial results for verification.

5. **Updated `App.js`**
   - Plugged in `MapComponent` as the main component in the app layout.

## Outcome
- A functional map interface is now available.
- Users can draw custom boundaries on the map.
- Spatial data inside the drawn area is successfully fetched from the backend.