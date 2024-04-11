import { useState } from 'react'
import { Pressure, Temperature, Weight, Voltage, Default } from '../../utils/Icons.jsx';
import { isPressure, isTemperature, isWeight, isVoltage } from '../../utils/icons.js';
import { formatDate3 } from '../../utils/timeUtils.js';
function Variablerow(props) {
    return (
        <div className="variable-row">
            <div className="icon">
                { isPressure(props.unit) ? <Pressure bg={props.bg} /> : 
                  isTemperature(props.unit) ? <Temperature /> :  
                  isWeight(props.unit) ? <Weight /> : 
                  isVoltage(props.unit) ? <Voltage /> : 
                  <Default bg={props.bg} letter={props.letter}/>}
            </div>
            <div className="details">
              <p className='name'>{props.variable_name}</p>
              <p className='value'>{props.value}</p>
              <p className='updated_at'>Last Update at {formatDate3(props.updated_at)}</p>
            </div>
        </div>
    )
}

export default Variablerow;