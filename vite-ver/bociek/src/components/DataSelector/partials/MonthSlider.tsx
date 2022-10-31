import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { MonthsType } from "../../../types/commonTypes";

const marks = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec"
};

interface MonthSliderProps {
    isLargeScreen: boolean;
    handleMonthChange: (month: MonthsType) => void;
}

const MonthSlider = ({ isLargeScreen, handleMonthChange }: MonthSliderProps) => {
    // Update global month value
    const handleOnChange = (value: number | number[]) => {
        handleMonthChange(value as MonthsType);
    };

    return (
        <Slider
            min={0}
            max={11}
            defaultValue={0}
            marks={marks}
            step={null}
            vertical={!isLargeScreen}
            onChange={handleOnChange}
        />
    );
};

export default MonthSlider;
