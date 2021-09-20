import React, { useCallback, useState } from 'react';

import Map from './components/Map'
import Input from './components/Input';
import PageInfo from './components/PageInfo';

import './App.css';

//#TODO make sure ract leflet img loads
//#TODO https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
function App() {
  const [month, setMonth] = useState(0)
  const [dataType, setDataType] = useState("temp")

  const handleMonthChange = useCallback((month) => setMonth(month), [month]);
  const handleDataTypeChange = useCallback((dataType) => setDataType(dataType), [dataType]);

  return (
    <div className="map-wrapper">
      <PageInfo />
      <Input handleMonthChange={ handleMonthChange } handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
      <Map month={ month } dataType={ dataType }/>
    </div>
  );
}

export default App;
