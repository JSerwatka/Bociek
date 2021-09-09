import React, { useState } from 'react';
import './App.css';
import Map from './components/Map'
import Input from './components/Input';


function App() {
  const [month, setMonth] = useState(0)
  const [dataType, setDataType] = useState("temp")

  function handleMonthChange(month) {
    setMonth(month)
  }

  function handleDataTypeChange(dataType) {
    setDataType(dataType)
  }

  return (
    <div className="map-wrapper">
      <Input handleMonthChange={ handleMonthChange } handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
      <Map month={month} dataType={ dataType }/>
    </div>
  );
}

export default App;
