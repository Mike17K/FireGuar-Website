import React, { useEffect, useRef, useState } from 'react'

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

export default function HistoryData({station,isOpen}){
    const [timeData, setTimeData] = useState([]);
    const [historyWindSpeedData, setHistoryWindSpeedData] = useState([]);
    const [historyWindDirectionData, setHistoryWindDirectionData] = useState([]);

    const [chartWindSpeed, setChartWindSpeed] = useState(true);
    const [chartWindDirection, setChartWindDirection] = useState(true);
    
    const historySectionRef = useRef(null);
  
    useEffect(() => {
        const opacityControl = (value) => historySectionRef.current.style.opacity = value;
        const widthControl = (showing) => historySectionRef.current.style.width = showing? "1000px":"0px";
        opacityControl(0);
        
        if(isOpen){
            widthControl(true);
        }else{
            setTimeout(() => {
                widthControl(false);
            },1000);
        }

        setTimeout(() => {
            opacityControl(isOpen? 1: 0);
        },1000);
    }, [isOpen]);
  
    useEffect(() => {
      async function fetchData(){
        const historyDataUrl = 'https://iot.alkalyss.gr/history/' + station.id;
        // fetching data
        await fetch(historyDataUrl).then((res) => res.json()).then((data) => {
            let timeData = [];
            let windSpeedData = [];
            let windDirectionData = [];
            data.forEach((d) => {
                windSpeedData.push(d.windSpeed);
                windDirectionData.push(d.windDirection);

                timeData.push(d.dateObserved);
            });
            setTimeData(timeData);
            setHistoryWindSpeedData(windSpeedData);
            setHistoryWindDirectionData(windDirectionData);            
        });
      }
  
      fetchData();
    }, []);

    return (
      <div ref={historySectionRef} className={`h-full relative transition-all w-0 transition-1000 p-4`}>
        <div className='w-[70%] h-full flex flex-col'>
            <div className='flex h-10'>
                <h1 className='bold text-[30px] w-full'>History</h1>
                <div className='flex gap-2'>
                    <button className={`rounded-full w-[150px] border-2 px-2 ${chartWindSpeed? "bg-green-600 text-white border-green-600" : "bg-red-600 text-white border-red-600"}`} onClick={e=> setChartWindSpeed(prev => !prev)}>Wind Speed</button>
                    <button className={`rounded-full w-[150px] border-2 px-2 ${chartWindDirection? "bg-green-600 text-white border-green-600" : "bg-red-600 text-white border-red-600"}`} onClick={e=> setChartWindDirection(prev => !prev)}>Wind Direction</button>
                </div>
            </div>
            <div className='overflow-y-hidden'>
                <CustomChart className={`${(chartWindSpeed? "block" : "hidden")}`} title={"Wind Speed"} data={historyWindSpeedData} time={timeData}/>
                <CustomChart className={`${(chartWindDirection? "block" : "hidden")}`} title={"Wind Direction"} data={historyWindDirectionData} time={timeData}/>
            </div>
        </div>
    </div>
    );
  }
    
  function CustomChart({className,data,time,title,sum}){
    return <div className={`${className} w-full`}>
      <h2 className='my-0'>{title}</h2>
      <div className=''>
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