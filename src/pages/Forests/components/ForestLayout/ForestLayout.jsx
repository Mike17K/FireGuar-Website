import React, { useEffect, useRef } from "react";
import "./ForestLayout.css";
import { Link } from "react-router-dom";

// leaflet
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapboxCredentials from "../../../../credentials/mapbox.credentials.json";

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

function ForeestColor(propability) {
  if (propability < 0.4) {
    return "bg-green-200";
  } else if (propability < 0.7) {
    return "bg-yellow-100";
  } else {
    return "bg-red-200";
  }
}

const { mapboxAccessToken } = mapboxCredentials;

export default function ForestLayout({ data }) {
  const { id, name, forestFirePropability, location } = data;
  const { curentTemperature, curentHumidity, curentWindSpeed } = data;

  return (
    <Link
      to={"/map?id=" + id}
      className={
        `w-full h-[366px] rounded-[13px] p-4 shadow-inner shadow-gray-600 ` +
        ForeestColor(forestFirePropability)
      }
    >
      <div className="text-2xl font-bold">{name}</div>
      <div className="flex gap-4 justify-between h-[80%]">
        <div className="flex flex-col h-full justify-between">
          <h2>Info</h2>
          <div className="flex gap-2 justify-center items-center">
            <img
              className="w-[31px] h-[31px]"
              src="icons/location.png"
              alt="location icon"
            />
            <span>{location.lng}</span>
            <span>{location.lat}</span>
          </div>

          <MapContainer
            center={[location.lat, location.lng]}
            zoom={6}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ width: "100%", height: "5rem" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CircleMarker
              center={[location.lat, location.lng]}
              pathOptions={{
                radius: 4,
                color: "red",
                fillOpacity: 0.3,
              }}
            ></CircleMarker>
          </MapContainer>

          <div className="flex gap-4 justify-center items-center">
            <div>Fire Propability</div>
            <div className="w-[4rem] aspect-square rounded-full border-2 border-black bg-gray-300 flex justify-center items-center">
              {Math.floor(forestFirePropability * 100)}%
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <h2>History</h2>
          <div className="flex gap-2 items-center justify-between">
            <img
              className="w-[251px] h-[57px]"
              src="https://via.placeholder.com/251x57"
              alt="temperature graph"
            />
            <img
              src="icons/temperature.png"
              alt="temperature icon"
              className="w-[50px] h-[50px]"
            />
            <span>{Math.floor(curentTemperature)}°C</span>
          </div>
          <div className="flex gap-2 items-center  justify-between">
            <div className="w-[251px] h-[57px]">
              <Chart
                type="line"
                options={{
                  layout: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true, // Start the y-axis from 0
                      suggestedMin: 60, // Set the minimum value based on the lowest data point
                      suggestedMax: 100, // Set the maximum value based on the highest data point
                    },
                  },
                }}
                name="humidity graph"
                data={{
                  labels: ["12am", "1pm", "2pm", "3pm", "4pm", "5pm"],
                  datasets: [
                    {
                      label: "My First dataset",
                      data: [65, 59, 80, 81, 56, 55, 40],
                      fill: false,
                      backgroundColor: "rgb(255, 99, 132)",
                      borderColor: "rgba(255, 99, 132, 0.2)",
                    },
                  ],
                }}
              />
            </div>

            <img
              src="icons/humidity.png"
              alt="humidity icon"
              className="w-[50px] h-[50px]"
            />
            <span>{Math.floor(curentHumidity)}%</span>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <img
              className="w-[251px] h-[57px]"
              src="https://via.placeholder.com/251x57"
              alt="wind graph"
            />
            <img
              src="icons/wind.png"
              alt="wind icon"
              className="w-[50px] h-[50px]"
            />
            <span>{Math.floor(curentWindSpeed)} m/s</span>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <h2>Live Phootage</h2>
          <div className="flex flex-col gap-2 items-center justify-between">
            <div className="w-full flex gap-2 items-center justify-between">
              <img
                className="w-full h-[70px]"
                src="https://via.placeholder.com/107x70"
                alt="live view1"
              />
              <img
                className="w-full h-[70px]"
                src="https://via.placeholder.com/56x70"
                alt="live view2"
              />
            </div>
            <img
              className="w-full h-[123px]"
              src="https://via.placeholder.com/190x123"
              alt="live view3"
            />
          </div>
        </div>

        <MapContainer
          center={[location.lat, location.lng]}
          zoom={10}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          style={{ width: "370px", height: "100%" }}
          className="rounded-[15px] shadow-inner border-2 border-black"
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
          />
        </MapContainer>
      </div>
    </Link>
  );
}
