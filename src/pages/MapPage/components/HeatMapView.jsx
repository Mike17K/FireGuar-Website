import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";


export default function HeatMapView({data}) {
    const map = useMap();

    useEffect(() => {
      var heat = L.heatLayer(data, {
        radius: 50,
        blur: 80,
        gradient: {0: 'green', 0.3: 'lime',0.7: 'yellow', 0.9: 'red'}, //  TODO : change gradient
        minOpacity: 0.8,
        max: 1.0,
        }).addTo(map); 

      return () => {
        map.removeLayer(heat);
      };      
    }, [data]);

  return (
    <div id="map" style={{ height: "100vh" }}>test</div>
  );
}

