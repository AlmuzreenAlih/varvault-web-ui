import { useState, useEffect } from 'react'
import './VariableEditPanel.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ComboBox from '../../components/ComboBox/ComboBox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function VariableEditPanel(props) {
    useEffect(() => {
    }, [props.editInputValues])
    function handlerInputChanged(e) {
        const { name, value } = e.target;
        props.setEditInputValues({ ...props.editInputValues, [name]: value });
    }
    function handlerTypeChanged(e) {
        props.setEditInputValues({ ...props.editInputValues, variable_type: e.target.innerHTML })
    }
    return (<>
        { props.editingMode && <div className='whole-page'>
            <form ref={props.forwardedRef} className={"edit-panel " + props.className}>
                <section>{props.editingMode}</section>

                <span className='pbrk'></span>

                <Input name="variable_id" hint="" className="hidden"/>

                <TextField name="variable_name" label="Name" value={props.editInputValues.variable_name}
                    onChange={e=>{handlerInputChanged(e)}} variant="outlined" size='small'
                    className='heightInput'/>

                <span className='pbrk'></span>

                <TextField name="variable_value" label="Value" value={props.editInputValues.variable_value}
                    onChange={e=>{handlerInputChanged(e)}} variant="outlined" size='small'/>
                    
                <span className='pbrk'></span>

                <Autocomplete
                    disablePortal
                    options={["","numeric","text","boolean"]}
                    sx={{width: "100%"}} size='small'
                    renderInput={(params) => <TextField {...params} name="variable_type" label="Type" />}
                    value={props.editInputValues.variable_type} onChange={e=>{handlerTypeChanged(e)}}
                />

                <span className='pbrk'></span>
                <TextField name="variable_unit" label="Unit" value={props.editInputValues.variable_unit}
                    onChange={e=>{handlerInputChanged(e)}} variant="outlined" size='small'/>

                <span className='pbrk'></span>

                <section className='buttons'>
                    <Button style={{}} 
                        className="cancel"
                        onClick={(e)=>{e.preventDefault(); props.setEditingMode(false);}} 
                        label="Cancel" />
                    <Button style={{}} 
                        className="save"
                        onClick={(e)=>{props.saveEditing(e)}} 
                        label="Save" />
                </section>
            </form>
        </div>
        }
    </>)
}

export default VariableEditPanel;