import { useCallback, useEffect, useState } from "react";

import DataSelector from "./components/DataSelector/DataSelector";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Map from "./components/Map/Map";
import PageInfo from "./components/PageInfo/PageInfo";
import supabase from "./config/supabaseClient";
import { DataType, GlobalDataType, MonthsType } from "./types/commonTypes";
import {
    fetchData,
    getAllDataTypePolygonWeatherData,
    getGlobalWeatherData,
    getPolygonWeatherData
} from "./utils/fetchData";

function App() {
    const [month, setMonth] = useState<MonthsType>(0);
    const [dataType, setDataType] = useState<DataType>("max_temp");

    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState(true);
    const [worldGeojson, setWorldGeojson] = useState(null);
    const [januaryMaxTemp, setJanuaryMaxTemp] = useState<GlobalDataType>();

    const handleMonthChange = useCallback((month: MonthsType) => setMonth(month), [month]);
    const handleDataTypeChange = useCallback((dataType: DataType) => setDataType(dataType), [dataType]);

    useEffect(() => {
        (async () => {
            try {
                const fetchedWorldGeojson = await fetchData(
                    "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/world-admin1.json"
                );
                const januaryMaxTemp = await getGlobalWeatherData("max_temp", 0, supabase);

                setJanuaryMaxTemp(januaryMaxTemp);
                setWorldGeojson(fetchedWorldGeojson);
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
                        januaryMaxTemp={januaryMaxTemp!}
                        supabase={supabase}
                    />
                </div>
            )}
        </>
    );
}

export default App;
