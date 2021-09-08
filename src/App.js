import React, { useState } from 'react';
import './App.css';
import Map from './components/Map'
import MonthSlider from './components/MonthSlider';


function App() {
  const [month, setMonth] = useState(0)

  function handleMonthChange(month) {
    setMonth(month)
  }

  return (
    <div className="map-wrapper">
      <MonthSlider handleMonthChange={handleMonthChange}/>
      <Map month={month} />
    </div>
  );
}

export default App;
