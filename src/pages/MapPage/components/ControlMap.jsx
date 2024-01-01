import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export default function ControlMap({ zoom, setZoom }) {
  const map = useMap();
  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current.style.left = `${(zoom - 1) * 5}%`;
  }, [zoom]);

  return (
    <div className="fixed z-[1000] flex gap-2 justify-between px-2 items-center rounded-full bottom-2 left-1/2 -translate-x-1/2 bg-white w-[250px] h-[30px]">
      <button
        onClick={() => {
          map.setView(map.getCenter(), zoom - 1);
          setZoom((zoom) => Math.max(zoom - 1, 1));
        }}
        className="flex items-center justify-center rounded-full h-[90%] aspect-square"
      >
        -
      </button>
      <div className="w-[80%] bg-black rounded-full h-2 relative">
        <div
          ref={zoomRef}
          className={`left-[] w-4 h-4 rounded-full bg-white border-4 border-black absolute -translate-y-1`}
        ></div>
      </div>
      <button
        onClick={() => {
          map.setView(map.getCenter(), zoom + 1);
          setZoom((zoom) => Math.min(zoom + 1, 20));
        }}
        className="flex items-center justify-center rounded-full h-[90%] aspect-square"
      >
        +
      </button>
    </div>
  );
}
