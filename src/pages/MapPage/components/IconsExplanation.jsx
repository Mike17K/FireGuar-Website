import React, { useEffect, useRef, useState } from "react";

export default function IconsExplanation({ firePropability }) {
  const [show, setShow] = useState(false);
  const propRef = useRef(null);

  useEffect(() => {
    const color = ColorChoise(firePropability);
    propRef.current.style.backgroundColor = color;
  }, [firePropability]);

  useEffect(() => {
    propRef.current.style.bottom = show ? "170px" : "50px";
  }, [show]);

  return (
    <div className="fixed z-[1000] bottom-4 left-4">
      <img
        src="icons/menu.png"
        className="w-[30px] aspect-square bg-white p-2 rounded"
        alt="icon"
        onClick={() => setShow((prev) => !prev)}
      />
      {show && (
        <div className="absolute bottom-10 bg-white rounded w-[150px] gap-2 flex flex-col p-2">
          <div className="flex items-center gap-2 ">
            <img
              src="icons/map/tree_sensor_icon.svg"
              alt=""
              className="w-[20px] aspect-square inline-block"
            />
            <span>Sensor</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="icons/map/camera_icon.png"
              alt=""
              className="w-[20px] aspect-square inline-block"
            />
            <span>Camera</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="icons/map/weather_station_icon.png"
              alt=""
              className="w-[20px] aspect-square inline-block"
            />
            <span>Weather Station</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="icons/map/wind_sensor_icon.svg"
              alt=""
              className="w-[20px] aspect-square inline-block"
            />
            <span>Wind Sensor</span>
          </div>
        </div>
      )}
      <div
        ref={propRef}
        className={`absolute left-0 flex justify-center items-center w-[80px] border-2 border-black aspect-square text-white rounded-full`}
      >
        {firePropability}%
      </div>
    </div>
  );
}

function ColorChoise(value) {
  return value < 30 ? "#93EF2A" : value < 60 ? "#EFE72A" : "#D52A2A";
}
