import React from 'react'


// TODO implement this component
export default function WindSensorModal({station,closeModal}) {
  if (!station) return null;

  return (
    <div className='z-[10000] fixed right-4 top-[6rem] bg-white bottom-4 w-[300px] rounded-lg px-10 cursor-default'>
        <h1>Wind Sensor Modal</h1>
        <p>{station.id}</p>
        <p>{station.windDirection}</p>
        <p>{station.windSpeed}</p>
    </div>
  )
}
