import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./MapPage.css";
import dammyData from "./dammyData.json";

// leaflet
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapboxCredentials from "../../credentials/mapbox.credentials.json";
import SensorModal from "./components/SensorModal/SensorModal.jsx";
import CameraModal from "./components/CameraModal";
import WindSensorModal from "./components/WindSensorModal";

const { mapboxAccessToken } = mapboxCredentials;

const cameraIcon = new L.Icon({
  iconUrl: "icons/map/camera_icon.png",
  iconSize: [20, 20],
});

const cameraIconActive = new L.Icon({
  iconUrl: "icons/map/camera_icon_active.png",
  iconSize: [20, 20],
});



export default function MapPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // use this to target sensors position
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [zoomLevel, setZoomLevel] = useState(10);
  const zoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 20));
  const zoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 1, 1));

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
        zoom={zoomLevel} 
        center={[lat || 8.243934, lng || 21.905568]}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%" , zIndex: 0 }}
      >
        <ControlMapView zoom={zoomLevel} setZoom={setZoomLevel}/>

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {treesensors.map((sensor) => {
          let color = SensorColorChoise(sensor.temperature);
          return <Marker
            key={"s-"+sensor.id}
            position={[sensor.lat, sensor.lng]}
            icon={(focusedElement.id === "s-"+sensor.id)? 
            new L.DivIcon({
              className: 'custom-marker-icon',
              html: `<svg width="20" height="20" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4695 4.97746L16 3.90983L14.5305 4.97746L5.01997 11.8873L3.55051 12.9549L4.11179 14.6824L7.74451 25.8627L8.30579 27.5902H10.1221H21.8779H23.6942L24.2555 25.8627L27.8882 14.6824L28.4495 12.9549L26.98 11.8873L17.4695 4.97746Z" fill="${color}" stroke="#880000" stroke-width="5"/>
              </svg>
              `,              
              iconSize: [20, 20],
            })
            :     
            new L.DivIcon({
              className: 'custom-marker-icon',
              html: `<svg width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L19.5106 6.90983L15.8779 18.0902H4.12215L0.489435 6.90983L10 0Z" fill="${color}"/>
              </svg>`,              
              iconSize: [20, 20],
            })}
            eventHandlers={{
              click: () => {
                setFocusedElement({id:"s-"+sensor.id,element:sensor});
              },
            }}
          />
        })}

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
            icon={(focusedElement.id === "w-"+sensor.id)? new L.DivIcon({
              className: 'custom-marker-icon',
              html: `<svg width="20" height="20" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.67949 35L22 5L39.3205 35H4.67949Z" fill="#93EF2A" stroke="#FF0000" stroke-width="5"/>
              </svg>`,              
              iconSize: [20, 20],
            }):
            new L.DivIcon({
              className: 'custom-marker-icon',
              html: `<svg width="20" height="20" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.67949 35L22 5L39.3205 35H4.67949Z" fill="#93EF2A" stroke="black" stroke-width="5"/>
              </svg>`,
              iconSize: [20, 20],
            })
          }
            eventHandlers={{
              click: () => {
                setFocusedElement({id:"w-"+sensor.id,element:sensor});
              },
            }}
          />
        ))}
        {
          focusedElement.id && focusedElement.id[0] === 's' && <SensorModal sensor={focusedElement.element} closeModal={(e)=>setFocusedElement({id:null,element:null})} />
        }
        {
          focusedElement.id && focusedElement.id[0] === 'c' && <CameraModal camera={focusedElement.element} closeModal={(e)=>setFocusedElement({id:null,element:null})}/>
        }
        {
          focusedElement.id && focusedElement.id[0] === 'w' && <WindSensorModal station={focusedElement.element} closeModal={(e)=>setFocusedElement({id:null,element:null})}/>
        }
      </MapContainer>

    </div>
  );
}


function SensorColorChoise(value){
  return value < 30 ? "#93EF2A" : value < 60 ? "#EFE72A" : "#D52A2A";
}


function ControlMapView({ zoom, setZoom }) {
  const map = useMap();
  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current.style.left = `${(zoom - 1) * 5}%`;
  }
  , [zoom]);

  return <div className="fixed z-[1000] flex gap-2 justify-between px-2 items-center rounded-full bottom-2 left-1/2 -translate-x-1/2 bg-white w-[150px] h-[20px]">
  <button
   onClick={
     () => {
       map.setView(map.getCenter(), zoom - 1);
       setZoom(zoom => Math.max(zoom - 1, 1))
      }
    }>-</button>
    <div className="w-[80%] bg-black rounded-full h-2 relative">
        <div ref={zoomRef} className={`left-[] w-4 h-4 rounded-full bg-white border-4 border-black absolute -translate-y-1`}></div>
    </div>
    <button
    onClick={
      () => {
        map.setView(map.getCenter(), zoom + 1);
        setZoom(zoom => Math.min(zoom + 1, 20))
      }
    }>+</button>
  </div>;
}