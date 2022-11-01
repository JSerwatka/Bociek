import { useCallback, useEffect, useState } from "react";
import DataSelector from "./components/DataSelector/DataSelector";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import PageInfo from "./components/PageInfo/PageInfo";
import Map from "./components/Map/Map";
import { DataType, MonthsType } from "./types/commonTypes";
import { fetchData } from "./utils/fetchData";

function App() {
    const [month, setMonth] = useState<MonthsType>(0);
    const [dataType, setDataType] = useState<DataType>("temp");

    // TODO to remove
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState(true);
    const [worldGeojson, setWorldGeojson] = useState(null);
    const [airTemp, setAirTemp] = useState(null);
    const [precipitation, setPrecipitation] = useState(null);
    const [dayLength, setDayLength] = useState(null);

    const handleMonthChange = useCallback((month: MonthsType) => setMonth(month), [month]);
    const handleDataTypeChange = useCallback((dataType: DataType) => setDataType(dataType), [dataType]);

    useEffect(() => {
        (async () => {
            try {
                const fetchedWorldGeojson = await fetchData(
                    "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/world-admin1.json"
                );
                const fetchedTempJson = await fetchData(
                    "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/maximum_air_temperature_centers.json"
                );
                const fetchedRainJson = await fetchData(
                    "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/precipitation_centers.json"
                );
                const fetchedDaylengthJson = await fetchData(
                    "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/daylength_centers.json"
                );

                setWorldGeojson(fetchedWorldGeojson);
                setAirTemp(fetchedTempJson);
                setPrecipitation(fetchedRainJson);
                setDayLength(fetchedDaylengthJson);
            } catch (err) {
                console.error((err as Error).message);
                setError((err as Error).message);
            }

            setIsPending(false);
        })();
    }, []);

    return (
        <>
            {error && <div>Error {error}</div>}
            {isPending && !error && <LoadingScreen />}
            {!isPending && !error && (
                <div className="map-wrapper">
                    <PageInfo />
                    <DataSelector
                        dataType={dataType}
                        handleMonthChange={handleMonthChange}
                        handleDataTypeChange={handleDataTypeChange}
                    />
                    <Map
                        month={month}
                        dataType={dataType}
                        worldGeojson={worldGeojson}
                        airTemp={airTemp}
                        precipitation={precipitation}
                        dayLength={dayLength}
                    />
                </div>
            )}
        </>
    );
}

export default App;
