import { useState } from 'react'
import { Pressure, Temperature, Weight, Default } from '../../utils/Icons.jsx';
import { isPressure, isTemperature } from '../../utils/icons.js';
import { formatDate } from '../../utils/timeUtils.js';
import Button from '../../components/Button/Button';

function VariableRow(props) {
    function LogoutFunction() {
    }
    return (
        <div className="variable-row content">
            <div className='col1'><input type="checkbox" /></div>
            <div className="col2">
                { isPressure(props.unit) ? <Pressure bg={props.bg} /> : 
                ( isTemperature(props.unit) ? <Temperature bg={props.bg} /> :  
                  <Default bg={props.bg} letter={props.letter}/>)}
            </div>
            <div className='col3'>{props.variable_name}</div>
            <div className='col4'>{props.variable_value + " " + props.variable_unit}</div>
            <div className='col4'>{props.variable_type}</div>
            <div className='col5'>{formatDate(props.updated_at)}</div>
            <div className='col5'>{formatDate(props.updated_at)}</div>
            <div className='col6'>
                <Button style={{}} 
                    className="edit"
                    onClick={(e)=>{props.showEditPanel(e, props.id,props.variable_name, props.variable_value,props.variable_type,props.variable_unit)}} 
                    label="Edit" />
                <Button style={{}} 
                    className="delete"
                    onClick={LogoutFunction} 
                    label="Delete" />
            </div>
        </div>
    )
}

export default VariableRow;