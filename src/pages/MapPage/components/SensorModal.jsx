import React, { useEffect, useState } from 'react'

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

export default function SensorModal({sensor,closeModal}) {
    const { id, name, forestFirePropability, lat, lng } = sensor;
    const {
      curentTemperatureUrl,
      curentHumidityUrl,
      curentWindSpeedUrl,
      cameraImageUrls,
    } = sensor;
  
    const [temperatureData, setTemperatureData] = useState([20, 30, 40, 50, 60, 70]);
    const [humidityData, setHumidityData] = useState([20, 30, 40, 50, 60, 70]);
    const [co2Data, setCo2Data] = useState([20, 30, 40, 50, 60, 70]);

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
      setCo2Data((prev) => {
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


  return (
    <div className='z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 w-[300px] rounded-lg px-10'>
        <button onClick={closeModal} className='absolute right-2 top-1 font-bold'>x</button>

        <div className='text-center text-[1.5rem] mt-[20px]'>
          Sensor: {id}
        </div>

        <div className='px-4'>
        <div className='text-[1rem] mt-[20px] flex items-center justify-center gap-2'>
          <img src="icons/location.png" alt="location icon" width={20} height={20}/>
          {lat}, {lng}
        </div>
        <div className='text-[1rem] mt-[20px] flex items-center justify-between gap-2'>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/temperature.png" alt="temp icon" width={30} height={30}/>
            {temperatureData.length > 0?temperatureData[-1]:"-"}°C
          </div>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/humidity.png" alt="humidity icon" width={30} height={30}/>
            {
              humidityData.length > 0?humidityData[-1]:"-"
            }%
          </div>
        </div>
        <div className='flex mt-2'>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/CO2.png" alt="co2 icon" width={30} height={30}/>
            {
              co2Data.length > 0?co2Data[-1]:"-"
            }ppm
          </div>
        </div>
        </div>
        
        <div className='flex flex-col justify-center items-center h-[70%] w-[80%] absolute left-2 right-2 bottom-2 mx-auto'>
          <h1 className='text-[25px]'>History</h1>
          <div>

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
                data: temperatureData,
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          }}
          />
          </div>

</div>
        
    </div>
  )
}
