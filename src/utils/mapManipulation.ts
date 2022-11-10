// @ts-nocheck
// TODO remove??
// import L from "leaflet";

// import { DataType } from "../types/commonTypes";
// import getColor, { grades } from "./getColor";

// export const createLegend = (dataType: DataType) => {
//     const div = L.DomUtil.create("div", "legend rounded-box slide-in");
//     const currentGrade = grades[dataType];

//     let from;
//     let to;
//     let range;
//     let color;

//     // Slide button
//     const slideButton = L.DomUtil.create("div", "slide-btn");

//     slideButton.addEventListener("click", () => {
//         div.classList.toggle("slide-in");
//         div.classList.toggle("slide-out");
//     });

//     div.appendChild(slideButton);

//     // Main legend
//     const mainLegend = L.DomUtil.create("div");
//     div.appendChild(mainLegend);

//     // Create legend label
//     mainLegend.innerHTML += `<div class="legend-title">${getlegendLabel(dataType)}</div>`;

//     for (let i = 0; i < currentGrade.length; i++) {
//         from = currentGrade[i];
//         to = currentGrade[i + 1];
//         color = getColor(dataType, from + 1);

//         // Create a proper range info based on: first, last or other
//         if (i === 0) {
//             range = "< " + to;
//         } else if (i === currentGrade.length - 1) {
//             range = "> " + from;
//         } else {
//             range = from + " to " + to;
//         }

//         // Add range with color
//         mainLegend.innerHTML += `<div><i style="background:${color}"></i> ${range}</div>`;
//     }

//     return div;
// };

// const getlegendLabel = (dataType: DataType): string => {
//     switch (dataType) {
//         case "max_temp":
//             return "Average maximum air temperature in °C";
//         case "precipitation":
//             return "Average monthly precipitations in <em>mm</em>";
//         case "day_length":
//             return "Day length in hours for the 15th day of the month";
//         default:
//             throw new Error("Incorrect data type");
//     }
// };
const a = 10;
export {};
