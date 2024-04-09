import { useState } from 'react'
import { Pressure, Temperature, Weight, Voltage, Default } from '../../utils/Icons.jsx';
import { isPressure, isTemperature, isWeight, isVoltage } from '../../utils/icons.js';
import { formatDate } from '../../utils/timeUtils.js';
import Button from '../../components/Button/Button';

function VariableRow(props) {
    return (
        <div className="variable-row content">
            <div className='col1'><input type="checkbox" name={"box"+(props.keyy+1)} checked={props.CheckBoxes["box"+(props.keyy+1)]} onChange={props.handleCheckBox}/></div>
            <div className="col2">
                { isPressure(props.unit) ? <Pressure /> : 
                  isTemperature(props.unit) ? <Temperature /> :  
                  isWeight(props.unit) ? <Weight /> :  
                  isVoltage(props.unit) ? <Voltage /> : 
                  <Default bg={props.bg} letter={props.letter}/>}
            </div>
            <div className='col3'>{props.variable_name}</div>
            <div className='col4'>{props.variable_value + " " + props.variable_unit}</div>
            <div className='col4'>{props.variable_type}</div>
            <div className='col5'>{formatDate(props.created_at)}</div>
            <div className='col5'>{formatDate(props.updated_at)}</div>
            <div className='col6'>
                <Button style={{}} 
                    className="edit"
                    onClick={()=>{props.showEditPanel(props.id,props.variable_name, props.variable_value,props.variable_type,props.variable_unit)}} 
                    label="Edit" />
                <Button style={{}} 
                    className="delete"
                    onClick={()=>{props.deleteVariable(props.id)}} 
                    label="Delete" />
            </div>
        </div>
    )
}

export default VariableRow;