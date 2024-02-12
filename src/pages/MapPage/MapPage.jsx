import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./MapPage.css";
import Map from "./Map";
import SensorModal from "./components/SensorModal/SensorModal";
import CameraModal from "./components/CameraModal";
import WindSensorModal from "./components/WindSensorModal/WindSensorModal";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // use this to target sensors position
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  const [focusedElement, setFocusedElement] = useState({
    id: null,
    element: null,
  });

  return (
    <div className="w-[100vw] h-[100vh]">
      <Map id={id} lat={lat} lng={lng} focusedElement={focusedElement} setFocusedElement={setFocusedElement} />
      
      {focusedElement.id && focusedElement.id[0] === "s" && (
          <SensorModal
            key={focusedElement.id}
            sensor={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}
        {focusedElement.id && focusedElement.id[0] === "c" && (
          <CameraModal
            key={focusedElement.id}
            camera={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}
        {focusedElement.id && focusedElement.id[0] === "w" && (
          <WindSensorModal
            key={focusedElement.id}
            station={focusedElement.element}
            closeModal={(e) => setFocusedElement({ id: null, element: null })}
          />
        )}
    </div>
  );
}
