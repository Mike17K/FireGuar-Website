import React, { useEffect, useRef, useState } from "react";

export default function IconsExplanation({ firePropability }) {
  const [show, setShow] = useState(false);
  const propRef = useRef(null);

  useEffect(() => {
    const color = getColor(firePropability,100);
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
        className={`absolute left-0 flex justify-center items-center w-[80px] border-2 border-black aspect-square text-black rounded-full`}
      >
        {firePropability}%
      </div>
    </div>
  );
}

function getColor(t,MaxTemp=100){
  const clampTemp = t > MaxTemp ? MaxTemp : t < 0 ? 0 : t;

  const green = [34,197,94];
  const persentGreen = 0.5;
  const yellow = [234,172,10];
  const red = [221,52,35];
  if(t < MaxTemp * persentGreen){
    const factor = clampTemp / (MaxTemp * persentGreen);
    // bettwen green and yellow
    const R = interpolateValue(green[0], yellow[0], factor);
    const G = interpolateValue(green[1], yellow[1], factor);
    const B = interpolateValue(green[2], yellow[2], factor);
    return `rgb(${R},${G},${B})`;
  }else{
    // bettwen yellow and red
    const factor = (clampTemp - (MaxTemp * persentGreen)) / (MaxTemp * (1 - persentGreen));
    const R = interpolateValue(yellow[0], red[0], factor);
    const G = interpolateValue(yellow[1], red[1], factor);
    const B = interpolateValue(yellow[2], red[2], factor);
    return `rgb(${R},${G},${B})`;
  }
}

function interpolateValue(v1, v2, factor) {
  return v1 + (v2 - v1) * factor;
}
