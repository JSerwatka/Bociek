import useMediaQuery from "../../hooks/useMediaQuery";
import { DataType } from "../../types/commonTypes";
import DataTypeIcons from "./partials/DataTypeIcons";
import MonthSlider from "./partials/MonthSlider";

import "../../styles/DataSelector/data-selector.css";

interface DataSelectorInterface {
    dataType: DataType;
    handleMonthChange: () => void;
    handleDataTypeChange: () => void;
}

const DataSelector = ({ dataType, handleMonthChange, handleDataTypeChange }: DataSelectorInterface) => {
    const isLargeScreen = useMediaQuery("(min-width: 585px)");

    return (
        <div className={`input-wrapper rounded-box ${isLargeScreen ? "large-screen" : "small-screen"}`}>
            <DataTypeIcons handleDataTypeChange={handleDataTypeChange} dataType={dataType} />
            <MonthSlider handleMonthChange={handleMonthChange} isLargeScreen={isLargeScreen} />
        </div>
    );
};

export default DataSelector;
