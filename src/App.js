import React, { useState } from 'react';
import './App.css';
import Map from './components/Map'
import MonthSlider from './components/MonthSlider';

// #TODO set default month value
// const [month, setMonth] = useState(0)

// function handleMonthChange(month) {
//   setMonth(month)
// }
// #TODO function that changes month value - send to MonthSlider
// #TODO get new data from json for given motnh
// #TODO send the data to the map and render

function App() {
  return (
    <div className="map-wrapper">
      <MonthSlider />
      {/* <MonthSlider handleMonthChange={handleMonthChange}/> */}
      <Map />
    </div>
  );
}

export default App;
