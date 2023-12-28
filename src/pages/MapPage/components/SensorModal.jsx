import React from 'react'

export default function SensorModal({sensor}) {
    if (!sensor) return null;
    
    console.log("sensor", sensor);
  return (
    <div className='z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 w-[300px] rounded-lg'>
        <h1>Sensor Modal</h1>
        <p>{sensor.id}</p>
    </div>
  )
}
