import React, { useEffect, useState } from 'react'
import './SensorModal.css'

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
  const { id, location } = sensor;
  const [lat, lng] = location;

  const [timeData, setTimeData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const [isHistoryDataModalOpen, setIsHistoryDataModalOpen] = useState(false);
  useEffect(() => {
    setTemperatureData([]);
    setHumidityData([]);
    setCo2Data([]);
    setIsMounted(true);

    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, [sensor]);

  //TODO make it call API instead of random from URLs

  async function updateTreeSensorData(N) {
    if (!isMounted) return;

    const newData = await fetch(`https://iot.alkalyss.gr/trees/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error: " + err);
        return null;
      });

    if (newData === null) return;

    setTemperatureData((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, Math.floor(newData.temperature * 100) / 100];
    });

    setHumidityData((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, Math.floor(newData.humidity * 100)/100];
    });

    setCo2Data((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, Math.floor(newData.co2 * 100) / 100];
    });

    setTimeData((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, new Date(newData.dateObserved).toLocaleTimeString([], { hour12: true })];
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      await updateTreeSensorData(100);
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

  return (
      <div className={`z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 transition-all duration-1000 w-[${isHistoryDataModalOpen?1000 : 350}px] rounded-lg px-10 cursor-default`}>
        <div className='flex justify-end relative h-full'>
          {
            isHistoryDataModalOpen && <HistoryData />
          }
        <div className='w-[250px] h-full relative'>
        <button onClick={closeModal} className='absolute right-2 top-1 font-bold hover:bg-red-500 w-6 h-6rounded-full hover:text-white text-center items-center'>x</button>

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
            {temperatureData.length > 0?temperatureData[temperatureData.length-1]:"-"}°C
          </div>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/humidity.png" alt="humidity icon" width={30} height={30}/>
            {
              humidityData.length > 0?humidityData[humidityData.length-1]:"-"
            }%
          </div>
        </div>
        <div className='flex mt-2'>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/CO2.png" alt="co2 icon" width={30} height={30}/>
            {
              co2Data.length > 0?co2Data[co2Data.length-1]:"-"
            }ppm
          </div>
        </div>
        </div>
        
        <div className='flex flex-col justify-center items-center h-[60%] w-[80%] absolute left-2 right-2 bottom-2 mx-auto'>
            <h1 className='text-[25px]'>History</h1>
            <button onClick={()=>setIsHistoryDataModalOpen(!isHistoryDataModalOpen)} className="bg-blue-500 text-white rounded-md w-[50px] h-[30px] text-[10px]">Show All</button>
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
            labels: timeData,
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
          
          <div className='scrollable-list w-full h-full mb-4 bg-gray-100 shadow-inner overflow-x-hidden overflow-y-auto'>
            {
              temperatureData.map((data,index)=>(
                <div className='text-center flex justify-between px-2 py-1 mt-1 bg-white w-[90%] mx-auto shadow-md rounded'>
                <span>{timeData[temperatureData.length - index-1]}</span>
                <span>{temperatureData[temperatureData.length - index-1]}°C</span>
                <span>{humidityData[temperatureData.length - index-1]}%</span>
                <span>{co2Data[temperatureData.length - index-1]}ppm</span>
              </div>
             ))
            }
          </div>
</div>        
</div>
</div>
</div>
  )
}


function HistoryData(){
  const [historyTemperatureData, setHistoryTemperatureData] = useState([]);
  const [historyHumidityData, setHistoryHumidityData] = useState([]);
  const [historyCo2Data, setHistoryCo2Data] = useState([]);
  const [timeData, setTimeData] = useState([]);
  
  const [show, setShow] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShow(true);
    }, 1000);

    async function fetchData(){
      const historyDataUrl = '';
      return;
      await fetch(historyDataUrl).then((res) => res.json()).then((data) => {
        setHistoryTemperatureData(data.temperature);
        setHistoryHumidityData(data.humidity);
        setHistoryCo2Data(data.co2);
      });
    }

    fetchData();

  }, []);



  return (
    <div className={`w-[70%] h-full relative transition-all transition-1000 ${!show?" hidden opacity-0":"opacity-100"} pt-12`}>
      <h1 className='bold text-[30px] w-full'>History</h1>
      <CustomChart title={"Temperature"} data={historyTemperatureData} time={timeData}/>
      <CustomChart title={"Humidity"} data={historyHumidityData} time={timeData}/>
      <CustomChart title={"Co2"} data={historyCo2Data} time={timeData}/>
      </div>
  );
}


function CustomChart({data,time,title}){
  return <div className='w-full h-[25%]'>
    <h2 className='my-10'>{title}</h2>
    <div className='w-full h-[120px]'>
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
          beginAtZero: true,
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
    </div>

}