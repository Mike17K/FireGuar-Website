import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dammyData from "./dammyData.json";

// leaflet
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapboxCredentials from "../../credentials/mapbox.credentials.json";
import SensorModal from "./components/SensorModal";
import CameraModal from "./components/CameraModal";
import WindSensorModal from "./components/WindSensorModal";

const { mapboxAccessToken } = mapboxCredentials;

// Sensor icon
const sensorIcon = new L.Icon({
  iconUrl: "icons/map/tree_sensor_icon.png", 
  iconSize: [20, 20],
});

const sensorIconActive = new L.Icon({
  iconUrl: "icons/map/tree_sensor_icon_active.png", 
  iconSize: [20, 20],
});

const cameraIcon = new L.Icon({
  iconUrl: "icons/map/camera_icon.png",
  iconSize: [20, 20],
});

const cameraIconActive = new L.Icon({
  iconUrl: "icons/map/camera_icon_active.png",
  iconSize: [20, 20],
});

const windIcon = new L.Icon({
  iconUrl: "icons/map/wind_sensor_icon.png",
  iconSize: [20, 20],
});

const windIconActive = new L.Icon({
  iconUrl: "icons/map/wind_sensor_icon_active.png",
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

  const [focusedElement, setFocusedElement] = useState({id:null,element:null});

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
        style={{ width: "100%", height: "100%" , zIndex: 0 }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {treesensors.map((sensor) => (
          <Marker
            key={"s-"+sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={(focusedElement.id === "s-"+sensor.id)? sensorIconActive:sensorIcon}
            eventHandlers={{
              click: () => {
                setFocusedElement({id:"s-"+sensor.id,element:sensor});
              },
            }}
          />
        ))}
        {cameras.map((camera) => (
          <Marker
            key={"c-"+camera.id}
            position={[camera.lat, camera.lng]}
            icon={(focusedElement.id === "c-"+camera.id)? cameraIconActive:cameraIcon}
            eventHandlers={{
              click: () => {
                setFocusedElement({id:"c-"+camera.id,element:camera});
              },
            }}
          />
        ))}
        {windsensors.map((sensor) => (
          <Marker
            key={"w-"+sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={(focusedElement.id === "w-"+sensor.id)? windIconActive:windIcon}
            eventHandlers={{
              click: () => {
                setFocusedElement({id:"w-"+sensor.id,element:sensor});
              },
            }}
          />
        ))}
        {
          focusedElement.id && focusedElement.id[0] === 's' && <SensorModal sensor={focusedElement.element} />
        }
        {
          focusedElement.id && focusedElement.id[0] === 'c' && <CameraModal camera={focusedElement.element} />
        }
        {
          focusedElement.id && focusedElement.id[0] === 'w' && <WindSensorModal station={focusedElement.element} />
        }
        
        
      </MapContainer>

      
    </div>
  );
}
