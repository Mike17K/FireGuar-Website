import React, { useState } from "react";

// TODO implement this component
export default function CameraModal({ camera, closeModal }) {
  if (!camera) return null;

  return (
    <div className="p-4 z-[1000] fixed right-4 bottom-[60px] top-[100px] w-[70%] bg-white rounded-lg">
      <button
        onClick={closeModal}
        className="absolute right-2 top-1 font-bold hover:bg-red-500 w-6 h-6 rounded-full hover:text-white text-center items-center"
      >
        x
      </button>

      <h1 className="text-[20px]">Camera: {camera.id}</h1>
      <StatusBar camera={camera} />

      <div className="flex justify-between m-4 h-[70%]">
        <CameraView />
        <CameraControls />
      </div>

      <CameraTargetInfo camera={camera} />
    </div>
  );
}

function StatusBar({ camera }) {
  return (
    <div className="flex gap-10 justify-between">
      <div className="flex gap-2 items-center">
        <img src="icons/location.png" alt="location" />
        <span>
          {camera.lat}, {camera.lng}
        </span>
      </div>
      <div className="flex gap-2 items-center mr-4">
        <span>{camera.status || "Live"}</span>
        <div className="w-[20px] aspect-square rounded-full border-2 border-black bg-green-500"></div>
      </div>
    </div>
  );
}

function CameraView() {
  return (
    <div className="w-[70%] h-[90%] overflow-hidden">
      <img
        src="images/camera_view.png"
        alt="camera view"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function CameraControls() {
  const [zoom, setZoom] = useState(1.0);
  const [angle, setAngle] = useState(37);
  return (
    <div className="flex flex-col items-center gap-2 w-[25%]">
      <span>Control</span>
      <div className="flex justify-between w-full gap-2">
        <img
          src="icons/camera_modal/compass.png"
          alt="compass"
          className="w-[20px] h-[20px]"
        />
        <div className="flex justify-between w-full">
          <img
            src="icons/camera_modal/left-arrow.png"
            alt="left arrow"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => setAngle(angle - 1)}
          />
          {angle}°
          <img
            src="icons/camera_modal/right-arrow.png"
            alt="right arrow"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => setAngle(angle + 1)}
          />
        </div>
      </div>
      <div className="flex justify-between w-full gap-2">
        <img
          src="icons/camera_modal/zoom.png"
          alt="compass"
          className="w-[20px] h-[20px]"
        />
        <div className="flex justify-between w-full">
          <img
            src="icons/camera_modal/subtract.png"
            alt="left arrow"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => setZoom(zoom - 0.1)}
          />
          x{Math.round(zoom * 10) / 10}
          <img
            src="icons/camera_modal/add.png"
            alt="right arrow"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => setZoom(zoom + 0.1)}
          />
        </div>
      </div>
    </div>
  );
}

function CameraTargetInfo({ camera }) {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="flex gap-2 items-center">
          <img src="icons/location.png" alt="location" />
          <span>
            {camera.lat}, {camera.lng}
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>Estimated Temperature</span>
          <span>25°C</span>
        </span>
        <span className="flex gap-2 items-center">
          <span>Fire Propability</span>
          <span>12%</span>
        </span>
      </div>
    </div>
  );
}
