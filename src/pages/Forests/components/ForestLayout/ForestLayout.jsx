import React, { useEffect, useState } from "react";
import "./ForestLayout.css";
import { Link } from "react-router-dom";

// leaflet
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function ForestLayout({ data }) {
  const { id, name, forestFirePropability, location } = data;
  const {
    curentTemperatureUrl,
    curentHumidityUrl,
    curentWindSpeedUrl,
    cameraImageUrls,
  } = data;

  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([20, 30, 40, 50, 60, 70]);
  const [windSpeedData, setWindSpeedData] = useState([2, 3, 4, 5, 6, 7]);

  //TODO make it call api instead of random from urls
  useEffect(() => {
    setInterval(() => {
      setTemperatureData((prev) => {
        if (prev.length > 5) {
          prev.shift();
        }
        return [...prev, Math.floor(Math.random() * 100) / 100];
      });
      setHumidityData((prev) => {
        if (prev.length > 5) {
          prev.shift();
        }
        return [...prev, Math.floor(Math.random() * 100)];
      });
      setWindSpeedData((prev) => {
        if (prev.length > 5) {
          prev.shift();
        }
        return [...prev, Math.floor(Math.random() * 100) / 10];
      });
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  const [cameraImages, setCameraImages] = useState([]);

  //TODO make it call api for photos
  useEffect(() => {
    setInterval(() => {
      //TODO make it call api for photos cameraImageUrls: list of urls
    }, 10000);
  }, []);

  return (
    <Link
      to={"/map?id=" + id + "&lat=" + location.lat + "&lng=" + location.lng}
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
            <div className="w-[4rem] aspect-square rounded-full border-2 border-black bg-white flex justify-center items-center text-lg">
              {Math.floor(forestFirePropability * 100)}%
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <h2>History</h2>
          <DataGraphs
            img={"icons/temperature.png"}
            data={temperatureData}
            measurement="°C"
          />

          <DataGraphs
            img={"icons/humidity.png"}
            data={humidityData}
            measurement="%"
          />

          <DataGraphs
            img={"icons/wind.png"}
            data={windSpeedData}
            measurement="m/s"
          />
        </div>

        <div className="flex flex-col h-full justify-between">
          <h2>Live Phootage</h2>
          <div className="flex flex-col gap-2 items-center justify-between">
            <div className="w-full flex gap-2 items-center justify-between">
              {cameraImages.map((img) => {
                // fix this layout
                return (
                  <img className="w-full h-[70px]" src={img} alt="live view1" />
                );
              })}
              <img
                className="w-full h-[70px]"
                // src="https://via.placeholder.com/107x70"
                src="https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="live view1"
              />
              <img
                className="w-full h-[70px]"
                // src="https://via.placeholder.com/56x70"
                src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="live view2"
              />
            </div>
            <img
              className="w-full h-[123px]"
              // src="https://via.placeholder.com/190x123"
              src="https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

function DataGraphs({ img, data, measurement }) {
  const currentValue = data.length > 0 ? data[data.length - 1] : " - ";
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <div className="w-[150px] h-[57px]">
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
                // suggestedMin: 60, // Set the minimum value based on the lowest data point
                // suggestedMax: 100, // Set the maximum value based on the highest data point
              },
            },
          }}
          name="humidity graph"
          data={{
            labels: ["12am", "1pm", "2pm", "3pm", "4pm", "5pm"],
            datasets: [
              {
                label: "My First dataset",
                data: data,
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 flex-shrink-0 w-[100px]">
        <img src={img} alt="humidity icon" className="w-[50px] h-[50px]" />
        <span className="w-[50px] text-right">
          {currentValue}
          {measurement}
        </span>
      </div>
    </div>
  );
}
