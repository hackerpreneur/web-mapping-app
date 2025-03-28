import React, { useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import * as turf from '@turf/turf';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapComponent = () => {
  const drawnItemsRef = useRef();
  const [results, setResults] = useState([]);
  const [area, setArea] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const handleCreated = async (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON().geometry;

    const polygon = turf.polygon([geojson.coordinates[0]]);
    const calcArea = turf.area(polygon);
    setArea((calcArea / 10000).toFixed(2));

    try {
      const res = await axios.post('http://localhost:4000/api/query', {
        polygon: geojson
      });

      const enriched = res.data.map((item) => ({
        ...item,
        footfall: Math.floor(Math.random() * 1000)
      }));

      setResults(enriched);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleReset = () => {
    setResults([]);
    setArea(0);
    drawnItemsRef.current?.clearLayers();
  };

  const getMarkerColor = (footfall) => {
    if (footfall > 700) return 'red';
    if (footfall > 300) return 'orange';
    return 'green';
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Latitude', 'Longitude', 'Footfall'];
    const rows = results.map((r) => {
      const coords = JSON.parse(r.geometry).coordinates;
      return [r.name, coords[1], coords[0], r.footfall];
    });

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'businesses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const FlyToMarker = ({ coords }) => {
    const map = useMap();
    if (coords) {
      map.flyTo(coords, 17);
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', height: '90vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '320px',
        padding: '16px',
        backgroundColor: '#fefefe',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        boxShadow: '2px 0 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>📋 Area Insights</h2>
        <p><strong>🧠 Businesses found:</strong> {results.length}</p>
        <p><strong>📏 Area selected:</strong> {area} hectares</p>

        <div style={{ marginTop: '16px', marginBottom: '12px' }}>
          <button onClick={handleReset} style={buttonStyle}>🔄 Clear</button>
          <button onClick={downloadCSV} style={{ ...buttonStyle, marginLeft: 10 }}>⬇️ Export CSV</button>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>📍 Businesses</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {results.map((biz, i) => {
              const coords = JSON.parse(biz.geometry).coordinates;
              return (
                <li key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setSelectedPosition([coords[1], coords[0]])}
                    style={sidebarButtonStyle}
                  >
                    {biz.name} <span style={{ float: 'right' }}>({biz.footfall})</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={14}
          scrollWheelZoom={true}
          whenCreated={setMapRef}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
          url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=YOUR_API_KEY`}
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          />

          <FeatureGroup ref={drawnItemsRef}>
            <EditControl
              position="topright"
              onCreated={handleCreated}
              draw={{
                rectangle: false,
                circle: false,
                marker: false,
                polyline: false,
                circlemarker: false
              }}
            />
          </FeatureGroup>

          {results.map((biz, i) => {
            const coords = JSON.parse(biz.geometry).coordinates;
            const icon = L.divIcon({
              className: 'custom-icon',
              html: `<div style="background:${getMarkerColor(biz.footfall)};width:12px;height:12px;border-radius:50%"></div>`,
              iconSize: [12, 12]
            });
            return (
              <Marker key={i} position={[coords[1], coords[0]]} icon={icon}>
                <Popup>
                  <strong>{biz.name}</strong><br />
                  Footfall: {biz.footfall}
                </Popup>
              </Marker>
            );
          })}

          {selectedPosition && <FlyToMarker coords={selectedPosition} />}
        </MapContainer>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '8px 12px',
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const sidebarButtonStyle = {
  width: '100%',
  textAlign: 'left',
  background: '#f1f1f1',
  border: 'none',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

export default MapComponent;
