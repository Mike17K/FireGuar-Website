import React from "react";

export default function TemperatureMap({setShowHeatMap}) {
  return (
    <div className="fixed z-[1000] top-[150px] left-4 flex flex-col">
      <button
        onClick={(e) => alert("notification sent")}
        className="absolute -translate-y-20 -translate-x-1"
      >
        <img src="icons/alert_button.png" alt="alert button" />
      </button>
      <div className="flex bg-white w-[80px] rounded p-2 gap-2">
        <div className="w-4 h-[150px] rounded bg-gradient-to-t from-green-500 from-25% via-yellow-500 to-red-600"></div>
        <div className="flex flex-col justify-between text-right">
          <span>70°C</span>
          <span>20°C</span>
          <span>0°C</span>
        </div>
      </div>
      <button
        onClick={(e) => setShowHeatMap((prev) => !prev)}
        className="bg-yellow-200 border-4 border-white p-2 rounded mt-2 shadow-inner"
      >
        Toggle Heat Map
      </button>

    </div>
  );
}
