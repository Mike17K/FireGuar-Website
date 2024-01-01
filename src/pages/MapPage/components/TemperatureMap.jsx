import React from "react";

export default function TemperatureMap() {
  return (
    <div className="fixed z-[1000] top-[150px] left-4 bg-white flex rounded p-2 gap-2">
      <button
        onClick={(e) => alert("notification sent")}
        className="absolute -translate-y-16 -translate-x-1"
      >
        <img src="icons/alert_button.png" alt="alert button" />
      </button>
      <div className="w-4 h-[150px] rounded bg-gradient-to-t from-green-500 from-25% via-yellow-500 to-red-600"></div>
      <div className="flex flex-col justify-between text-right">
        <span>70°C</span>
        <span>36°C</span>
        <span>0°C</span>
      </div>
    </div>
  );
}
