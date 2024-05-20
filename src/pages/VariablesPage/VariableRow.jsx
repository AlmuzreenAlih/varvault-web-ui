import { useState, useEffect } from 'react'
import { Pressure, Temperature, Weight, Voltage, Default } from '../../utils/Icons.jsx';
import { isPressure, isTemperature, isWeight, isVoltage } from '../../utils/icons.js';
import { formatDate,formatDate3 } from '../../utils/timeUtils.js';
import Button from '../../components/Button/Button';

function VariableRow(props) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600); // Set the breakpoint as per your requirement
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};
      }, []); // Only run once on mount
    
    useEffect(() => {
      if (isMobile) {
        setButtonVisibility("visible");
      }
    }, [isMobile])

    const [buttonVisibility, setButtonVisibility] = useState("hidden");
    function handleOnMouseOver(e) {
        if (!isMobile) {
            setBackgroundColor("var(--color_theme2)")
            setButtonVisibility("visible")
        }
    }
    function handleOnMouseLeave(e) {
        if (!isMobile) {
            setBackgroundColor("transparent")
            setButtonVisibility("hidden")
        }
    }   
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    return (
        <div className="variable-row content"
             onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
            <div style={{backgroundColor: backgroundColor}} className='col1'>
                <input type="checkbox" name={"box"+(props.keyy+1)} 
                       checked={props.CheckBoxes["box"+(props.keyy+1)]} onChange={props.handleCheckBox}/></div>
            <div style={{backgroundColor: backgroundColor}} className="col2">
                { isPressure(props.unit) ? <Pressure /> : 
                  isTemperature(props.unit) ? <Temperature /> :  
                  isWeight(props.unit) ? <Weight /> :  
                  isVoltage(props.unit) ? <Voltage /> : 
                  <Default bg={props.bg} letter={props.letter}/>}
            </div>
            <div style={{backgroundColor: backgroundColor}} className='col3'>{props.variable_name}</div>
            <div style={{backgroundColor: backgroundColor}} className='col4'>{props.variable_value + " " + props.variable_unit}</div>
            <div style={{backgroundColor: backgroundColor}} className='col4'>{props.variable_type}</div>
            <div style={{backgroundColor: backgroundColor}} className='col5'>{formatDate3(props.created_at)}</div>
            <div style={{backgroundColor: backgroundColor}} className='col5'>{formatDate3(props.updated_at)}</div>
            <div style={{backgroundColor: backgroundColor}} className='col6 height3rem'>
                <Button style={{visibility: buttonVisibility}} 
                    className="edit"
                    onClick={()=>{props.showEditPanel(props.id,props.variable_name, props.variable_value,props.variable_type,props.variable_unit)}} 
                    label="Edit" />
                <Button style={{visibility: buttonVisibility}} 
                    className="delete"
                    onClick={()=>{props.deleteVariable(props.id)}} 
                    label="Delete" />
            </div>
        </div>
    )
}

export default VariableRow;