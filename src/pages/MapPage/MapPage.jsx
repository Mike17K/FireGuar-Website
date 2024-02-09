import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./MapPage.css";
import dammyData from "./dammyData.json";

import ControlMapView from "./components/ControlMap.jsx";
import IconsExplanationView from "./components/IconsExplanation.jsx";

// leaflet
import { LayersControl, MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import SensorModal from "./components/SensorModal/SensorModal.jsx";
import CameraModal from "./components/CameraModal";
import WindSensorModal from "./components/WindSensorModal";
import TemperatureMap from "./components/TemperatureMap.jsx";
import TreeSensorMarker from "./components/markers/TreeSensorMarker.jsx";
import WindSensorMarker from "./components/markers/WindSensorMarker.jsx";
import HeatMapView from "./components/HeatMapView.jsx";

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const cameraIcon = new L.Icon({
  iconUrl: "icons/map/camera_icon.png",
  iconSize: [20, 20],
});

const cameraIconActive = new L.Icon({
  iconUrl: "icons/map/camera_icon_active.png",
  iconSize: [20, 20],
});

// const CustomIcon = L.DivIcon.extend({
//   createIcon: function (oldIcon) {
//     const div = L.DivIcon.prototype.createIcon.call(this, oldIcon);
//     div.innerHTML = "<div class='rotate-["+this.options.rotationAngle+"deg] z-1000'>" + this.options.html + "</div>";
//     return div;
//   },
// });


export default function MapPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // use this to target sensors position
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [zoomLevel, setZoomLevel] = useState(12);
  // const zoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 20));
  // const zoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 1, 1));

  const [treesensors, setTreesensors] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [windsensors, setWindsensors] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [showHeatMap, setShowHeatMap] = useState(true);

  const [focusedElement, setFocusedElement] = useState({
    id: null,
    element: null,
  });

  
  useEffect(() => {
    setTreesensors([]);
    setCameras([]);
    setWindsensors([]);
    setIsMounted(true);

    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, [id, lat, lng]);
  
  async function updateSensorData(N) {
    if (!isMounted) return;
    
    fetch("https://iot.alkalyss.gr/trees").then((res) => {
      res.json().then((data) => {
        setTreesensors(data);
      });
    });
    setCameras(dammyData.cameras);
    
    fetch("https://iot.alkalyss.gr/wind").then((res) => {
      res.json().then((data) => {
        setWindsensors(data);
      });
    });    
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await updateSensorData(10);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    if (!isMounted) return;

    setInterval(fetchData, 1000);

    // Cleanup function
    return () => {
      setIsMounted(false);
      clearInterval(fetchData);
    };
  }, [isMounted]);

  useEffect(() => {
    document.querySelectorAll(".w-svg").forEach((el) => {
      el.style.transform = `rotate(${el.getAttribute("value")}deg)`;
      el.style.display = "block";
    });
  }, [windsensors]);

  return (
    <div className="w-[100vw] h-[100vh]">
      <MapContainer
        zoom={zoomLevel}
        center={[lat || 38.29291, lng || 21.905664]}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        doubleClickZoom={false}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        {
          showHeatMap && <HeatMapView data={treesensors.map((sensor) => [sensor.location[0], sensor.location[1],sensor.temperature])} />
        }
        <ControlMapView zoom={zoomLevel} setZoom={setZoomLevel} />
        <IconsExplanationView firePropability={60} />
        <TemperatureMap setShowHeatMap={setShowHeatMap} />
        {/* TODO add firePropability from id and backend */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {treesensors.map((sensor) => {
          let color = SensorColorChoise(sensor.temperature);
          return ( <TreeSensorMarker key={"s-" + sensor.id} sensor={sensor} color={color} focusedElement={focusedElement} setFocusedElement={setFocusedElement} /> );
        })}
        {cameras.map((camera) => (
          <Marker
            key={"c-" + camera.id}
            position={[camera.lat, camera.lng]}
            icon={
              focusedElement.id === "c-" + camera.id
                ? cameraIconActive
                : cameraIcon
            }
            eventHandlers={{
              click: () => {
                setFocusedElement({ id: "c-" + camera.id, element: camera });
              },
            }}
          />
        ))}
        {windsensors.map((sensor) => ( <WindSensorMarker key={"w-" + sensor.id} sensor={sensor} focusedElement={focusedElement} setFocusedElement={setFocusedElement} /> ))}
        
        {focusedElement.id && focusedElement.id[0] === "s" && (
          <SensorModal
            key={focusedElement.id}
            sensor={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}
        {focusedElement.id && focusedElement.id[0] === "c" && (
          <CameraModal
            key={focusedElement.id}
            camera={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}
        {focusedElement.id && focusedElement.id[0] === "w" && (
          <WindSensorModal
            key={focusedElement.id}
            station={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}

      </MapContainer>
    </div>
  );
}

function SensorColorChoise(value) {
  return value < 30 ? "#93EF2A" : value < 60 ? "#EFE72A" : "#D52A2A";
}
