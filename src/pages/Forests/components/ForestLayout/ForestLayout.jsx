import React from 'react'
import "./ForestLayout.css";
import { Link } from 'react-router-dom';

function ForeestColor(propability){
    if(propability<0.4){
        return "bg-green-200"
    } else if(propability<0.7){
        return "bg-yellow-100"
    } else {
        return "bg-red-200"
    }
}

export default function ForestLayout({data}) {
    const {id,name,forestFirePropability,location} = data;
    const { curentTemperature, curentHumidity, curentWindSpeed } = data;

  return (
        <Link to={"/map?id="+id} className={`w-full h-[366px] rounded-[13px] p-4 shadow-inner shadow-gray-600 ` + ForeestColor(forestFirePropability)}>
            <div className="text-2xl font-bold">{name}</div>
            <div className='flex gap-4 justify-between h-[80%]'>
                <div className='flex flex-col h-full justify-between'>
                    <h2>Info</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <img className="w-[31px] h-[31px]" src="icons/location.png" />
                        <span>{location.lng}</span>
                        <span>{location.lat}</span>
                    </div>
                    <img className="w-[205px] h-[57px]" src="https://via.placeholder.com/205x57" />
                    
                    <div className="flex gap-4 justify-center items-center">
                        <div>Fire Propability</div>
                        <div className='w-[4rem] aspect-square rounded-full border-2 border-black bg-gray-300 flex justify-center items-center'>
                            {Math.floor(forestFirePropability*100)}%
                        </div>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-between'>
                    <h2>History</h2>
                    <div className='flex gap-2 items-center justify-center'>
                        <img className="w-[251px] h-[57px]" src="https://via.placeholder.com/251x57" />
                        <img src="icons/temperature.png" alt="temperature icon" className='w-[50px] h-[50px]'/>
                        <span>{Math.floor(curentTemperature)}°C</span>
                    </div>
                    <div className='flex gap-2 items-center justify-center'>
                        <img className="w-[251px] h-[57px]" src="https://via.placeholder.com/251x57" />
                        <img src="icons/humidity.png" alt="humidity icon" className='w-[50px] h-[50px]'/>
                        <span>{Math.floor(curentHumidity)}%</span>
                    </div>
                    <div className='flex gap-2 items-center justify-center'>
                        <img className="w-[251px] h-[57px]" src="https://via.placeholder.com/251x57" />
                        <img src="icons/wind.png" alt="wind icon" className='w-[50px] h-[50px]'/>
                        <span>{Math.floor(curentWindSpeed)} m/s</span>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-between'>
                    <h2>Live Phootage</h2>
                    <div className='flex flex-col gap-2 items-center justify-between'>
                        <div className='flex gap-2 items-center justify-between'>
                            <img className="w-[107px] h-[70px]" src="https://via.placeholder.com/107x70" />
                            <img className="w-[56px] h-[70px]" src="https://via.placeholder.com/56x70" />
                        </div>
                        <img className="w-[190px] h-[123px]" src="https://via.placeholder.com/190x123" />
                    </div>
                </div>
                <img className="w-[367px] h-full rounded-[15px] shadow-inner border-2 border-black" src="https://via.placeholder.com/367x257" />
            </div>
        </Link>
  )
}
