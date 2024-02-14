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
  LineController,
} from "chart.js";

// setup chartjs
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController
);

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
  const { id, name, location } = data;
  const {
    curentTemperatureUrl,
    curentHumidityUrl,
    curentWindSpeedUrl,
    cameraImageUrls,
  } = data;

  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [forestStatus, setForestStatus] = useState({
    "dateObserved": "2024-02-14T21:25:25.052Z",
    "fireDetected": true,
    "fireDetectedConfidence": 0,
    "location": [
      [
        [
          null,
          null
        ]
      ]
    ]
  });
  
  useEffect(() => {
    async function fetchData(){
      const forestStatusUrl = 'https://iot.alkalyss.gr/forest_status';
      // fetching data
      await fetch(forestStatusUrl).then((res) => res.json()).then((data) => {
        setForestStatus(data);
      });
    }
    setInterval(fetchData, 2000);

    // Cleanup function
    return () => {
      clearInterval(fetchData);
    };
  }, []);

  useEffect(() => {
    async function fetchData(){
      const historyDataUrl = 'https://iot.alkalyss.gr/history/' + "tree_sensor_1";
      // fetching data
      await fetch(historyDataUrl).then((res) => res.json()).then((data) => {
          let temperatureData = [];
          let humidityData = [];
          let co2Data = [];
          let timeData = [];
          data.forEach((d) => {
              temperatureData.push(d.temperature);
              humidityData.push(d.humidity);
              co2Data.push(d.co2);
              timeData.push(d.dateObserved);
          });
        setTemperatureData(temperatureData);
        setHumidityData(humidityData);
        setTimeData(timeData);
      });
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData(){
      const forestStatusUrl = 'https://iot.alkalyss.gr/forest_status';
      // fetching data
      await fetch(forestStatusUrl).then((res) => res.json()).then((data) => {
        setForestStatus(data);
      });
    }

    fetchData();
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
        ForeestColor(forestStatus.fireDetectedConfidence)
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
              {Math.floor(forestStatus.fireDetectedConfidence * 100)}%
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <h2>History</h2>
          <DataGraphs
          time={timeData}
          img={"icons/temperature.png"}
          data={temperatureData}
          measurement="°C"
          />

          <DataGraphs
          time={timeData}
          img={"icons/humidity.png"}
          data={humidityData}
          measurement="%"
          />

          <DataGraphs
          time={timeData}
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

function DataGraphs({ img, time, data, measurement }) {
  const currentValue = data.length > 0 ? data[data.length - 1] : " - ";
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <div className="w-[350px] h-[80px]">
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
            labels: time,
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
          {Math.floor(currentValue*100)/100}
          {measurement}
        </span>
      </div>
    </div>
  );
}
