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

export default function HistoryData({isOpen,sensor}){
    const [historyTemperatureData, setHistoryTemperatureData] = useState([]);
    const [historyHumidityData, setHistoryHumidityData] = useState([]);
    const [historyCo2Data, setHistoryCo2Data] = useState([]);
    const [timeData, setTimeData] = useState([]);

    const [chartTemperature, setChartTemperature] = useState(true);
    const [chartHumidity, setChartHumidity] = useState(true);
    const [chartCo2, setChartCo2] = useState(true);
    
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
        const historyDataUrl = 'https://iot.alkalyss.gr/history/' + sensor.id;
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
          setHistoryTemperatureData(temperatureData);
          setHistoryHumidityData(humidityData);
          setHistoryCo2Data(co2Data);
          setTimeData(timeData);
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
                    <button className={`rounded-full border-2 px-2 ${chartTemperature? "bg-green-600 text-white border-green-600" : "bg-red-600 text-white border-red-600"}`} onClick={e=> setChartTemperature(prev => !prev)}>Temperature</button>
                    <button className={`rounded-full border-2 px-2 ${chartHumidity? "bg-green-600 text-white border-green-600" : "bg-red-600 text-white border-red-600"}`} onClick={e=> setChartHumidity(prev => !prev)}>Humidity</button>
                    <button className={`rounded-full border-2 px-2 ${chartCo2? "bg-green-600 text-white border-green-600" : "bg-red-600 text-white border-red-600"}`} onClick={e=> setChartCo2(prev => !prev)}>Co2</button>
                </div>
            </div>
            <div className='overflow-y-hidden'>
                <CustomChart className={`${(chartTemperature? "block" : "hidden")}`} title={"Temperature"} data={historyTemperatureData} time={timeData}/>
                <CustomChart className={`${(chartHumidity? "block" : "hidden")}`} title={"Humidity"} data={historyHumidityData} time={timeData}/>
                <CustomChart className={`${(chartCo2? "block" : "hidden")}`} title={"Co2"} data={historyCo2Data} time={timeData}/>
            </div>
        </div>
    </div>
    );
  }
  
  function calculateHeght(v1,v2,v3){
    const sum = (v1? 1:0) + (v2?1:0) + (v3?1:0);
    return `${Math.floor(100/sum)}`;
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