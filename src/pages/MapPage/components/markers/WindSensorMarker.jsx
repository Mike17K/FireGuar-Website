import React, { useEffect, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export default function WindSensorMarker({
  sensor,
  focusedElement,
  setFocusedElement,
}) {
  const icon = useMemo(
    () =>
      new L.DivIcon({
        className: 'custom-marker-icon',
        html: `<div><svg width="20" height="20" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.67949 35L22 5L39.3205 35H4.67949Z" fill="#93EF2A" stroke="black" stroke-width="5"/>
          </svg><svg class="w-svg" id="${'w-' + sensor.id + '-wrapper'}" style="display: block;" value="${sensor.windDirection + 45}" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 32 32"><path d="M3.41 2H16V0H1a1 1 0 0 0-1 1v16h2V3.41l28.29 28.3 1.41-1.41z" data-name="7-Arrow Up"/></svg></div>`,
        iconSize: [20, 20],
      }),
    [sensor]
  );

  useEffect(() => {
    const el = document.getElementById('w-' + sensor.id + '-wrapper');
    console.log(el);
    if (!el) {
      return;
    }

    el.style.transform = `rotate(${el.getAttribute('value')}deg)`;
    el.style.display = 'block';
  }, [sensor]);

  return (
    <Marker
      key={'w-' + sensor.id}
      position={[sensor.location[0], sensor.location[1]]}
      icon={focusedElement.id === 'w-' + sensor.id ? icon : icon}
      eventHandlers={{
        click: () => {
          setFocusedElement({ id: 'w-' + sensor.id, element: sensor });
        },
      }}
    />
  );
}
