import { useCallback, useState } from "react";
import DataSelector from "./components/DataSelector/DataSelector";
import Legend from "./components/Legend/Legend";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import PageInfo from "./components/PageInfo/PageInfo";
import { DataType, MonthsType } from "./types/commonTypes";

function App() {
    const [month, setMonth] = useState<MonthsType>(0);
    const [dataType, setDataType] = useState<DataType>("temp");

    const handleMonthChange = useCallback((month: MonthsType) => setMonth(month), [month]);
    const handleDataTypeChange = useCallback((dataType: DataType) => setDataType(dataType), [dataType]);
    console.log({ month, dataType });
    return (
        <DataSelector
            dataType={dataType}
            handleMonthChange={handleMonthChange}
            handleDataTypeChange={handleDataTypeChange}
        />
    );
}

export default App;
