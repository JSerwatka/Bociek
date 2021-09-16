import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./MonthSlider.css"

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
}

function MonthSlider({handleMonthChange}) {
    // Update global month value
    function handleOnChange(value) {
        handleMonthChange(value)
    }
    
    return (
        <Slider min={ 0 } 
                max={ 11 } 
                defaultValue={ 0 } 
                marks={ marks } 
                step={ null } 
                onChange={ handleOnChange }/>
    );
}

export default MonthSlider;