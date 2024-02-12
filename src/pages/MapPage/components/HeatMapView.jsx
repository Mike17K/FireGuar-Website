import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";




export default function HeatMapView({data}) {
    const map = useMap();

    useEffect(() => {
      document.querySelectorAll("canvas").forEach((el) => {
        el.setAttribute('willReadFrequently', 'true');
      });

      // clussify the data into N groups
      const MaxTemperature = 100;
      const N = 10;
      const groups = Array.from({length: N}, () => []);
      data.forEach((d) => {
        const temperature = d[2];
        const group = Math.floor(temperature / MaxTemperature * N);
        groups[group].push([d[0], d[1], 1]);
      });
      
      // define the color of eatch group
      const colors = groups.map((_,i) => [getColor(0.6*i/N*100,MaxTemperature),getColor(i/N*100,MaxTemperature)]);
      // add the data to the map
      let Layers = [];
      for(let i = 0; i < N; i++){
        const group = groups[i];
        if (group.length === 0) continue;
        const layerElement = L.heatLayer(group, {
          radius: 50,
          blur: 40,
          gradient: {0.5: colors[i][0], 1: colors[i][1]},
          minOpacity: 0.6,
          }).addTo(map); 
        layerElement._canvas.setAttribute('willReadFrequently', 'true');
        Layers.push(layerElement);
      }
      return () => {
        // remove the layers from the map on cleanup
        Layers.forEach(layer => map.removeLayer(layer));
      };
    }, [data]);

  return (
    <div></div>
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
