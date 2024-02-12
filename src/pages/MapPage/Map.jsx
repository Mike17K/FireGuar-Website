import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./MapPage.css";
import dammyData from "./dammyData.json";

import ControlMapView from "./components/ControlMap.jsx";
import IconsExplanationView from "./components/IconsExplanation.jsx";

// leaflet
import { MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import TemperatureMap from "./components/TemperatureMap/TemperatureMap.jsx";
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


export default function MapPage({lat,lng,id,focusedElement,setFocusedElement}) {
  const [zoomLevel, setZoomLevel] = useState(12);

  const [treesensors, setTreesensors] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [windsensors, setWindsensors] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [showHeatMap, setShowHeatMap] = useState(true);
  
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

    setInterval(fetchData, 2000);

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
      <MapContainer
        zoom={zoomLevel}
        center={[lat || 38.29291, lng || 21.905664]}
        scrollWheelZoom={false}
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
          let color = getColor(sensor.temperature);
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
        

      </MapContainer>
  );
}

function getColor(t,MaxTemp=100){
  const clampTemp = t > MaxTemp ? MaxTemp : t < 0 ? 0 : t;

  const green = [34,197,94];
  const persentGreen = 0.5;
  const yellow = [234,172,10];
  const red = [221,52,35];
  if(t < MaxTemp * persentGreen){
    const factor = clampTemp / (MaxTemp * persentGreen);
    // bettwen green and yellow
    const R = interpolateValue(green[0], yellow[0], factor);
    const G = interpolateValue(green[1], yellow[1], factor);
    const B = interpolateValue(green[2], yellow[2], factor);
    return `rgb(${R},${G},${B})`;
  }else{
    // bettwen yellow and red
    const factor = (clampTemp - (MaxTemp * persentGreen)) / (MaxTemp * (1 - persentGreen));
    const R = interpolateValue(yellow[0], red[0], factor);
    const G = interpolateValue(yellow[1], red[1], factor);
    const B = interpolateValue(yellow[2], red[2], factor);
    return `rgb(${R},${G},${B})`;
  }
}

function interpolateValue(v1, v2, factor) {
  return v1 + (v2 - v1) * factor;
}
