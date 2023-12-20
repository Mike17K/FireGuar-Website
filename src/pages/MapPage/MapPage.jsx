import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dammyData from "./dammyData.json";

// leaflet
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapboxCredentials from "../../credentials/mapbox.credentials.json";

const { mapboxAccessToken } = mapboxCredentials;

// Sensor icon
const sensorIcon = new L.Icon({
  iconUrl: "icons/location.png", // TODO change icon
  iconSize: [20, 20],
});

const cameraIcon = new L.Icon({
  iconUrl: "icons/location.png", // TODO change icon
  iconSize: [20, 20],
});

const windIcon = new L.Icon({
  iconUrl: "icons/location.png", // TODO change icon
  iconSize: [20, 20],
});

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id"); // use this to target sensors position
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [treesensors, setTreesensors] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [windsensors, setWindsensors] = useState([]);

  useEffect(() => {
    // TODO fetch data from api
    // fetch("http://localhost:3000/treesensors")
    //   .then((res) => res.json())
    //   .then((data) => setTreesensors(data));
    // fetch("http://localhost:3000/cameras")
    //   .then((res) => res.json())
    //   .then((data) => setCameras(data));
    // fetch("http://localhost:3000/windsensors")
    //   .then((res) => res.json())
    //   .then((data) => setWindsensors(data));

    // TODO remove dammy data
    setTreesensors(dammyData.treesensors);
    setCameras(dammyData.cameras);
    setWindsensors(dammyData.windsensors);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <MapContainer
        center={[lat || 8.243934, lng || 21.905568]}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {treesensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={sensorIcon}
            eventHandlers={{
              click: () => {
                console.log("marker clicked");
              },
            }}
          />
        ))}
        {cameras.map((camera) => (
          <Marker
            key={camera.id}
            position={[camera.lat, camera.lng]}
            icon={cameraIcon}
            eventHandlers={{
              click: () => {
                console.log("marker clicked");
              },
            }}
          />
        ))}
        {windsensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={windIcon}
            eventHandlers={{
              click: () => {
                console.log("marker clicked");
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
