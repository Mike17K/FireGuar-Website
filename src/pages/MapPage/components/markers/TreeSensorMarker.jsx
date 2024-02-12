import React from 'react'
import { Marker } from 'react-leaflet';
import L from "leaflet";


export default function TreeSensorMarker({sensor,color,focusedElement,setFocusedElement}) {
  return (
    <Marker
        key={"s-" + sensor.id}
        position={[sensor.location[0], sensor.location[1]]}
        icon={
        focusedElement.id === "s-" + sensor.id
            ? new L.DivIcon({
                className: "custom-marker-icon",
                html: `<svg width="20" height="20" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4695 4.97746L16 3.90983L14.5305 4.97746L5.01997 11.8873L3.55051 12.9549L4.11179 14.6824L7.74451 25.8627L8.30579 27.5902H10.1221H21.8779H23.6942L24.2555 25.8627L27.8882 14.6824L28.4495 12.9549L26.98 11.8873L17.4695 4.97746Z" fill="${color}" stroke="#880000" stroke-width="5"/>
        </svg>
        `,
                iconSize: [20, 20],
            })
            : new L.DivIcon({
                className: "custom-marker-icon",
                html: `<svg width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L19.5106 6.90983L15.8779 18.0902H4.12215L0.489435 6.90983L10 0Z" fill="${color}" stroke="#000000" stroke-width="1"/>
        </svg>`,
                iconSize: [20, 20],
            })
        }
        eventHandlers={{
        click: () => {
            setFocusedElement({ id: "s-" + sensor.id, element: sensor });
        },
        }}
    />
  )
}
