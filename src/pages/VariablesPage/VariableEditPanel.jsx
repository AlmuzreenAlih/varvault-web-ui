import { useState, useEffect } from 'react'
import './VariableEditPanel.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ComboBox from '../../components/ComboBox/ComboBox';
import TextField from '@mui/material/TextField';
function VariableEditPanel(props) {
    useEffect(() => {
      console.log(props.editInputValues)
    }, [props.editInputValues])
    function handlerInputChanged(e) {
        const { name, value } = e.target;
        props.setEditInputValues({ ...props.editInputValues, [name]: value });
    }
    return (
        <form ref={props.forwardedRef} className={"edit-panel " + props.className}>
            <section>Edit Variable</section>

            <span className='pbrk'></span>

            <Input name="variable_id" hint="" className="hidden"/>

            <Input name="variable_name" hint="Name" value={props.editInputValues.variable_name}
                   onChange={e=>{handlerInputChanged(e)}}/>

            <span className='pbrk'></span>

            <Input name="variable_value" hint="Value" 
                   onChange={e=>{handlerInputChanged(e)}}/>

            <span className='pbrk'></span>

            <ComboBox name="variable_type" hint="Type" 
                onChange={e=>{handlerInputChanged(e)}}>
                <option value="numeric">Numeric</option>
                <option value="text">Text</option>
                <option value="boolean">Boolean</option>
            </ComboBox>

            <span className='pbrk'></span>
            {/* <TextField id="outlined-basic" label="unit" variant="outlined" /> */}
            <Input name="variable_unit" hint="Unit" 
                onChange={e=>{handlerInputChanged(e)}}/>

            <span className='pbrk'></span>

            <section className='buttons'>
                <Button style={{}} 
                    className="cancel"
                    onClick={props.hidePanels} 
                    label="Cancel" />
                <Button style={{}} 
                    className="save"
                    onClick={(e)=>{props.hidePanels(e, )}} 
                    label="Save" />
            </section>
        </form>
    )
}

export default VariableEditPanel;