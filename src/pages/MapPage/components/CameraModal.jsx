import React from 'react'

// TODO implement this component
export default function CameraModal({camera,closeModal}) {
    if (!camera) return null;

  return (
    <div className='z-[1000] fixed right-4 top-50% bg-black'>
        <h1>Camera Modal</h1>
        <p>{camera.id}</p>
    </div>
  )
}
