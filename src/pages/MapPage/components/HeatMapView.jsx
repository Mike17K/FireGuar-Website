import React, { useEffect } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";


export default function HeatMapView({data}) {
    const map = useMap();

    useEffect(() => {
      let  dataLow = []
      let  dataMid = []
      let  dataHigh = []

      data.forEach((d) => {
        if (d[2] < 30 && d[2] > 10 ) {
          if (d[2] < 20){
            dataLow.push([d[0], d[1], 1]);
          } else {
            dataMid.push([d[0],d[1], 1]);
          }
        } else if (d[2] >= 30) {
          if (d[2] < 80){
            dataMid.push([d[0], d[1], 1]);
            dataHigh.push([d[0],d[1], 1]);
          } else {
            dataHigh.push([d[0],d[1], 1]);
          }
        }         

      });

      var highHeat = L.heatLayer(dataHigh, {
        radius: 50,
        blur: 40,
        gradient: {0.5: 'orange', 1: 'red'},
        minOpacity: 1,
        }).addTo(map); 
      var midHeat = L.heatLayer(dataMid, {
          radius: 50,
          blur: 40,
          gradient: {0.5:'yellow' ,1: 'orange'},
          minOpacity: 0.8,
          }).addTo(map); 
      var lowHeat = L.heatLayer(dataLow, {
          radius: 50,
          blur: 80,
          gradient: {1: 'lime'},
          minOpacity: 0.5,
          }).addTo(map); 

      return () => {
        map.removeLayer(highHeat);
        map.removeLayer(midHeat);
        map.removeLayer(lowHeat);
      };      
    }, [data]);

  return (
    <div></div>
  );
}

