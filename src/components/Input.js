import DataTypeIcons from './DataTypeIcons';
import MonthSlider from './MonthSlider';
import "./Input.css"


function Input({handleMonthChange, handleDataTypeChange, dataType}) {
    return ( 
        <div className="input-wrapper content-box">
            <DataTypeIcons handleDataTypeChange={ handleDataTypeChange } dataType={ dataType }/>
            <MonthSlider handleMonthChange={ handleMonthChange }/>
        </div>
     );
}

export default Input;