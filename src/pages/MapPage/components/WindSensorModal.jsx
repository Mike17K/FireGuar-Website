import React from 'react'


// TODO implement this component
export default function WindSensorModal({station,closeModal}) {
  if (!station) return null;


  return (
    <div className='z-[1000] fixed right-4 top-50% bg-black'>
        <h1>Wind Sensor Modal</h1>
        <p>{station.id}</p>
    </div>
  )
}
