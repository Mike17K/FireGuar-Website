import React from "react";
import { useSearchParams } from "react-router-dom";

// leaflet
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapboxCredentials from "../../credentials/mapbox.credentials.json";

// chartjs
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";

// setup chartjs
ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement);

const { mapboxAccessToken } = mapboxCredentials;

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id"); // use this to target sensors position
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

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
      </MapContainer>
    </div>
  );
}
