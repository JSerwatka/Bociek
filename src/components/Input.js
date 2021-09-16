import { useEffect, useState } from "react/cjs/react.development";

import DataTypeIcons from './DataTypeIcons';
import MonthSlider from './MonthSlider';
import "./Input.css"


function Input({handleMonthChange, handleDataTypeChange, dataType}) {
    const [isSmallScreen, setisSmallScreen] = useState(window.innerWidth < 460);
    
    const updateMedia = () => {
        setisSmallScreen(window.innerWidth < 460);
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

export default Input;