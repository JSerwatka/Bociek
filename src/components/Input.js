import { useEffect, useState } from "react/cjs/react.development";
import PropTypes from 'prop-types'

import DataTypeIcons from './DataTypeIcons';
import MonthSlider from './MonthSlider';
import "./Input.css"


function Input({handleMonthChange, handleDataTypeChange, dataType}) {
    const [isSmallScreen, setisSmallScreen] = useState(window.innerWidth < 585);
    
    const updateMedia = () => {
        setisSmallScreen(window.innerWidth < 585);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    return ( 
        <div className={`input-wrapper rounded-box ${isSmallScreen ? "small-screen" : "large-screen"}` }>
            <DataTypeIcons handleDataTypeChange={ handleDataTypeChange } dataType={ dataType } isSmallScreen={ isSmallScreen } />
            <MonthSlider handleMonthChange={ handleMonthChange } isSmallScreen={ isSmallScreen } />
        </div>
     );
}

Input.propTypes = {
    handleMonthChange: PropTypes.func,
    handleDataTypeChange: PropTypes.func,
    dataType: PropTypes.string
}

export default Input;