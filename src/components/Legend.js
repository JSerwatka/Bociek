import { useEffect, useRef, memo } from "react/cjs/react.development";

import L from "leaflet";
import { useMap } from "react-leaflet";

import PropTypes from 'prop-types'
import "./Legend.css"

import getColor, {grades} from "../utils/getColor"


const getlegendLabel = (dataType) => {
  return (
    dataType === 'temp'      ? 'Average maximum air temperature in °C'        :
    dataType === 'rain'      ? 'Average monthly precipitations in <em>mm</em>' :
    dataType === 'daylength' ? 'Day length in hours for the 15th day of the month' :
                                new Error('Incorrect data type')
  );
}

function Legend({dataType}) {
    const map = useMap();
    const currentLegend = useRef(null);

    useEffect(() => {
        const createLegend = () => {
          const div = L.DomUtil.create("div", "legend rounded-box slide-in");
          const currentGrade = grades[dataType];
          
          let from;
          let to;
          let range;
          let color;
    
          // Slide button
          const slideButton = L.DomUtil.create('div', 'slide-btn');
    
          slideButton.addEventListener('click', () => {
            div.classList.toggle('slide-in');
            div.classList.toggle('slide-out');
          })
    
          div.appendChild(slideButton);
    
          // Main legend
          const mainLegend = L.DomUtil.create('div');
          div.appendChild(mainLegend);
    
          // Create legend label
          mainLegend.innerHTML += `<div class="legend-title">${getlegendLabel(dataType)}</div>`;
    
          for (let i = 0; i < currentGrade.length; i++) {
            from = currentGrade[i];
            to = currentGrade[i + 1];
            color = getColor(dataType, (from + 1));
    
            // Create a proper range info based on: first, last or other
            if (i === 0) {
              range = '< ' + to;
            }
            else if (i === (currentGrade.length-1)) {
              range = '> ' + from;
            }
            else {
              range = from + ' to ' + to;
            }
    
            // Add range with color
            mainLegend.innerHTML += `<div><i style="background:${color}"></i> ${range}</div>`;
          }
    
          return div;
        }

        // Remove previous legend from DOM
        if (currentLegend.current) {
          currentLegend.current.remove();
        }

        // Add new legend to the map
        const legend = L.control({ position: "bottomright" });

        legend.onAdd = createLegend;
        legend.addTo(map);

        // Update info about current legend
        currentLegend.current = legend;
    }, [dataType, map]);

    return ( <></> );
}

Legend.propTypes = {
  dataType: PropTypes.string
}

export default memo(Legend);