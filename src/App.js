// import React, { useCallback, useState } from 'react';
import React, { useCallback, useState, useEffect } from 'react';

import './App.css';
import Map from './components/Map/Map'
import Input from './components/Input/Input';
import PageInfo from './components/PageInfo/PageInfo';
import LoadingScreen from './components/LoadingScreen/LoadingScreen'

import fetchData from './utils/fetchData';

//TODO make sure react leflet img loads correctly
//TODO split additional weather data to multiple files to reduce size (based on month)
//TODO cache data in indexdb
//TODO add turning geojson layer on/off button
//TODO fix names of places with name=null (geojson)
//TODO add geojson to PageInfo
//TODO popup loading spinner only for the first load 
//TODO overall optimalization

function App() {
  const [month, setMonth] = useState(0)
  const [dataType, setDataType] = useState("temp")

  const [error, setError]= useState(null);
  const [isPending, setIsPending] = useState(true);
  const [worldGeojson, setWorldGeojson] = useState(null);
  const [airTemp, setAirTemp] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [dayLength, setDayLength] = useState(null);

  const handleMonthChange = useCallback((month) => setMonth(month), [month]);
  const handleDataTypeChange = useCallback((dataType) => setDataType(dataType), [dataType]);

  useEffect(() => {
    //TODO run function without declaring
    const asyncFunction = async() => {     
      try {
        const fetchedWorldGeojson = await fetchData('https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/world-admin1.json');
        const fetchedTempJson = await fetchData('https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/maximum_air_temperature_centers.json');
        const fetchedRainJson = await fetchData('https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/precipitation_centers.json');
        const fetchedDaylengthJson = await fetchData('https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/daylength_centers.json');

        setWorldGeojson(fetchedWorldGeojson);
        setAirTemp(fetchedTempJson);
        setPrecipitation(fetchedRainJson);
        setDayLength(fetchedDaylengthJson);
      }
      catch(err) {
        console.log('catch', err)
        setError(err.message);
      }
      
      setIsPending(false);
    };

    asyncFunction()
  }, []);

  return (
    <>
      {error && <div>Error {error}</div>}
      {isPending && !error && <LoadingScreen/>}
      {!isPending && !error && 
        <div className="map-wrapper">
          <PageInfo />
          <Input handleMonthChange={ handleMonthChange } handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
          <Map month={ month } 
              dataType={ dataType } 
              worldGeojson={ worldGeojson }
              airTemp = { airTemp }
              precipitation = { precipitation }
              dayLength = { dayLength }
          />
          {/* <Map month={ month } 
              dataType={ dataType } 
          /> */}
        </div>
      }
    </>
  );
}

export default App;
