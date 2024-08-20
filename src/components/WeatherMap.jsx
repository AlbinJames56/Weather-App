 
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ lat, lon }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it doesn't already exist
      mapRef.current = L.map('map').setView([lat, lon], 10);

      // Add OpenStreetMap tile layer (for base map)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      // Add OpenWeatherMap cloud coverage tile layer
      L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d18bc39846dc0f52439dc08c5f950607`,
        {
          attribution: '© OpenWeatherMap',
          maxZoom: 19,
        }
      ).addTo(mapRef.current);

      // Add marker for the current location
      L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup('Current Location')
        .openPopup();
    } else {
      // If the map already exists, just set the new view
      mapRef.current.setView([lat, lon], 10);
    }

    return () => {
      // Cleanup the map instance on component unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div id="map" style={{ height: '400px', width: '50%',margin:"20px" }}></div>;
};

export default WeatherMap;

 
