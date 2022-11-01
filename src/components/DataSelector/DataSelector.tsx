import useMediaQuery from "../../hooks/useMediaQuery";
import "../../styles/DataSelector/data-selector.css";
import { DataType, MonthsType } from "../../types/commonTypes";
import DataTypeIcons from "./partials/DataTypeIcons";
import MonthSlider from "./partials/MonthSlider";

interface DataSelectorInterface {
    dataType: DataType;
    handleDataTypeChange: (dataType: DataType) => void;
    handleMonthChange: (month: MonthsType) => void;
}

const DataSelector = ({ dataType, handleDataTypeChange, handleMonthChange }: DataSelectorInterface) => {
    const isLargeScreen = useMediaQuery("(min-width: 585px)");

    return (
        <div className={`input-wrapper rounded-box ${isLargeScreen ? "large-screen" : "small-screen"}`}>
            <DataTypeIcons handleDataTypeChange={handleDataTypeChange} dataType={dataType} />
            <MonthSlider handleMonthChange={handleMonthChange} isLargeScreen={isLargeScreen} />
        </div>
    );
};

export default DataSelector;
