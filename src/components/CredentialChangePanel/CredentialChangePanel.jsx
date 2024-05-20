import { useState, useEffect, useRef } from 'react';
import './CredentialChangePanel.scss';
import Button from '../Button/Button';
import TextField from '@mui/material/TextField';
import Checker from '../Checker/Checker';

function CredentialChangePanel(props) {
    function No() {
        props.setDialog(false);
    }
    function Yes() {
        if (props.changeMode==="pw") {
            if (pwMatched) {
                props.onClose();
            } else {props.setPopup("Passwords do not match.")}
        } else {
            props.onClose();
        }
        
    }
    const [confirmPW, setConfirmPW] = useState("");
    const [pwMatched, setPwMatched] = useState(false);
    useEffect(() => {
        if (props.inputValues[props.inputName1].length < 7) {
            setPwMatched(false); 
            setCheckMsg({msg:"Password: minimum of 8 characters",sym:"close",col:"red"});
        }
        else if (confirmPW !== props.inputValues[props.inputName1]) {
            setPwMatched(false); 
            setCheckMsg({msg:"Passwords: NOT MATCHING",sym:"close",col:"red"});
        }
        else {
            setPwMatched(true); setCheckMsg({msg:"",sym:".",col:"transparent"});
        }
    }, [confirmPW,props.inputValues[props.inputName1]])

    function confirmHandler(e) {
        const { name, value } = e.target;
        setConfirmPW(value)
    }
    const [CheckMsg, setCheckMsg] = useState({
        msg: "not matched",
        sym: "close",
        col: "red"
      });
    const [TFStyles, setTFStyles] = useState(
        { input: { color: 'var(--color_contrast)',
                   '&::placeholder': {opacity: 1, color:'var(--color_contrast)'}},
          label: {color:'var(--color_contrast)'},
          fieldset: { borderColor: 'var(--color_tertiary)' } }
    )
    return (
        <>
            {props.dialog && <form ref={props.fref} className='whole-pageCCP' onSubmit={Yes}>
                <div className="dialog-msg">
                    <div className='msg'>{props.dialog}</div>
                    <div style={{width: "100%"}}>
                    <TextField name={props.inputName1} label={props.inputLabel1} value={props.inputValues[props.inputName1]}
                               onChange={e=>{props.inputHandler(e);}} variant="outlined" size='small'
                               className='inputs' style={{width: "100%", color:"white"}} 
                               sx={TFStyles} inputProps={{ autoComplete: 'new-password',form: {
                                autocomplete: 'off',
                              } }}
                               autoComplete='new-password'
                               type={props.changeMode==="pw" && "password"}/>
                    <br></br>
                    {props.changeMode==="pw" && 
                    <>
                        <TextField name="password_confirm" label="Confirm Password" value={confirmPW}
                                onChange={confirmHandler} variant="outlined" size='small'
                                className='inputs' style={{width: "100%", paddingBottom: "0"}} type="password"
                                sx={TFStyles}/>
                        <Checker message={CheckMsg['msg']} 
                                symbol={CheckMsg['sym']} 
                                color={CheckMsg['col']}></Checker>
                    </>}
                    <TextField name={props.inputName2} label={props.inputLabel2} value={props.inputValues[props.inputName2]}
                               onChange={props.inputHandler} variant="outlined" size='small'
                               className='inputs' style={{width: "100%"}} type="password"
                               sx={TFStyles} inputProps={{ autoComplete: 'nope' }}/>
                    </div>
                    <div className='buttons'>
                        <Button className="no"
                                onClick={No} 
                                label="Cancel" />
                        <Button className="yes"
                                onClick={Yes} 
                                label="Submit" />
                    </div>
                </div>
            </form>}
        </>
    )
}

export default CredentialChangePanel;