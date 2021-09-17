import React, { useState } from 'react';

import Map from './components/Map'
import Input from './components/Input';
import PageInfo from './components/PageInfo';

import './App.css';

function App() {
  const [month, setMonth] = useState(0)
  const [dataType, setDataType] = useState("temp")

  const handleMonthChange = (month) => setMonth(month);
  const handleDataTypeChange = (dataType) => setDataType(dataType)

  return (
    <div className="map-wrapper">
      <PageInfo />
      <Input handleMonthChange={ handleMonthChange } handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
      <Map month={ month } dataType={ dataType }/>
    </div>
  );
}

export default App;
