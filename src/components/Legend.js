import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react/cjs/react.development";
import "./Legend.css"

import getColor, {grades} from "../utils/getColor"

function Legend({dataType}) {
    const map = useMap()
    const currentLegend = useRef(null)


    // #TODO fix daylength title (for a/the given month)
    function getlegendLabel() {
      return (
        dataType === 'temp'      ? 'Average maximum air temperature in °C'        :
        dataType === 'rain'      ? 'Average monthly precipitations in <em>mm</em>' :
        dataType === 'daylength' ? 'Day length in hours for 15th day of given month' :
                                    new Error('Incorrect data type')
      );
    }

    function createLegend() {
      const div = L.DomUtil.create("div", "legend rounded-box slide-in");
      const currentGrade = grades[dataType];
      
      let from;
      let to;
      let range;
      let color;

      // Slide button
      const slideButton = L.DomUtil.create('div', 'slide-button')

      slideButton.addEventListener('click', () => {
        div.classList.toggle('slide-in');
        div.classList.toggle('slide-out');
      })

      div.appendChild(slideButton);

      // Main legend
      const mainLegend = L.DomUtil.create('div');
      div.appendChild(mainLegend);

      // Create legend label
      mainLegend.innerHTML += `${getlegendLabel()}`;

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

    useEffect(() => {
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
    }, [dataType])

    return ( <></> );
}

export default Legend;