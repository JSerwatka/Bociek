import DataTypeIcons from './DataTypeIcons';
import MonthSlider from './MonthSlider';
import "./Input.css"


function Input({handleMonthChange, handleDataTypeChange}) {
    return ( 
        <div className="input-wrapper">
            <DataTypeIcons handleDataTypeChange={ handleDataTypeChange } />
            <MonthSlider handleMonthChange={ handleMonthChange }/>
        </div>
     );
}

export default Input;