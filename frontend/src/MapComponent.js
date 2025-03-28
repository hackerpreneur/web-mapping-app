import React, { useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapComponent = () => {
  const drawnItemsRef = useRef();

  const handleCreated = async (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON().geometry;

    try {
      const res = await axios.post('http://localhost:4000/api/query', {
        polygon: geojson
      });

      console.log('Results:', res.data);
      alert(`Found ${res.data.length} businesses in this area`);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={14} style={{ height: '90vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
    </MapContainer>
  );
};

export default MapComponent;
