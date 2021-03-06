import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import DataTypeIcons from '../DataTypeIcons/DataTypeIcons';
import MonthSlider from '../MonthSlider/MonthSlider';
import "./Input.css"


function Input({handleMonthChange, handleDataTypeChange, dataType}) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 585);
    
    //TODO use maslianok/react-resize-detector
    const updateMedia = () => {
        setIsSmallScreen(window.innerWidth < 585);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    return ( 
        <div className={`input-wrapper rounded-box ${isSmallScreen ? "small-screen" : "large-screen"}` }>
            <DataTypeIcons handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
            <MonthSlider handleMonthChange={ handleMonthChange } isSmallScreen={ isSmallScreen } />
        </div>
     );
}

Input.propTypes = {
    handleMonthChange: PropTypes.func,
    handleDataTypeChange: PropTypes.func,
    dataType: PropTypes.oneOf(['temp', 'rain', 'daylength'])
}

export default Input;