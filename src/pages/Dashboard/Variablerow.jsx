import { useState } from 'react'
import { Pressure, Temperature, Default } from '../../utils/Icons.jsx';
import { isPressure, isTemperature } from '../../utils/icons.js';
import { formatDate } from '../../utils/timeUtils.js';
function Variablerow(props) {
    return (
        <div className="variable-row">
            <div className="icon">
                { isPressure(props.unit) ? <Pressure bg={props.bg} /> : 
                ( isTemperature(props.unit) ? <Temperature bg={props.bg} /> :  
                  <Default bg={props.bg} letter={props.letter}/>)}
            </div>
            <div className="details">
              <p className='name'>{props.variable_name}</p>
              <p className='value'>{props.value}</p>
              <p className='updated_at'>Last Update at {formatDate(props.updated_at)}</p>
            </div>
        </div>
    )
}

export default Variablerow;