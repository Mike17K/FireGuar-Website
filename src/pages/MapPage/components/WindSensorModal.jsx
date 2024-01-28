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


// TODO implement this component
export default function WindSensorModal({station,closeModal}) {
  const { id, location, dateObserved,windDirection,windSpeed } = station;
  const [lat, lng] = location;

  const [isMounted, setIsMounted] = useState(true);
  const [windDirectionData, setWindDirectionData] = useState([Math.floor(windDirection*100)/100]);
  const [windSpeedData, setWindSpeedData] = useState([Math.floor(windSpeed*100)/100]);
  const [timeData, setTimeData] = useState([new Date(dateObserved).toLocaleTimeString([], { hour12: true })]);

  useEffect(() => {
    setIsMounted(true);
    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, [station]);

  async function updateWindSensorData(N) {
    if (!isMounted) return;

    const newData = await fetch(`https://iot.alkalyss.gr/wind/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error: " + err);
        return null;
      });

    if (newData === null) return;

    setWindDirectionData((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, Math.floor(newData.windDirection * 100) / 100];
    });

    setWindSpeedData((prev) => {
      if (prev.length > N) {
        prev.shift();
      }
      return [...prev, Math.floor(newData.windSpeed * 100) / 100];
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
      await updateWindSensorData(10);
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
    <div className='z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 w-[300px] rounded-lg px-10 cursor-default'>
        <button onClick={closeModal} className='absolute right-2 top-1 font-bold hover:bg-red-500 w-6 h-6 rounded-full hover:text-white text-center items-center'>x</button>

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
            <img src="icons/compass.png" alt="temp icon" width={30} height={30}/>
            {windDirectionData.length > 0?windDirectionData[windDirectionData.length-1]:"-"}°
          </div>
          <div className='flex items-center justify-center gap-2'>
            <img src="icons/wind.png" alt="humidity icon" width={30} height={30}/>
            {
              windSpeedData.length > 0?windSpeedData[windSpeedData.length-1]:"-"
            }m/s
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
                data: timeData.slice(-6),
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
             timeData.map((data,index)=>(
              <div className='text-center flex justify-between px-2 py-1 mt-1 bg-white w-[90%] mx-auto shadow-md rounded'>
                <span>{timeData[timeData.length - index-1]}</span>
                <span>{windDirectionData[timeData.length - index-1]}°</span>
                <span>{windSpeedData[timeData.length - index-1]}m/s</span>
              </div>
             ))
            }
          </div>

</div>
        
    </div>
  )
}
