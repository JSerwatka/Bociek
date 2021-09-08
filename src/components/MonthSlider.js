import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import reactDom from 'react-dom';
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

function handleAfterChange(e) {
    //TODO load new data
    console.log(e)
}


function MonthSlider() {
    return ( 
        <div className="month-slider-wrapper">
            <p>Choose month</p>
            <Slider min={0} max={11} defaultValue={0} marks={marks} step={null} onAfterChange={handleAfterChange}/>
        </div>
    );
}

export default MonthSlider;