import { useEffect } from 'react';
import './DialogYesNo.scss'
import Button from '../Button/Button';

// const [dialog, setDialog] = useState(false);
// <DialogYesNo msg={dialog} dialog={dialog} setDialog={setDialog} onClose={ondeleteVariable}/>
// setDialog("Are you sure you want to delete");

function DialogYesNo(props) {
    function No() {
        props.setDialog(false);
    }
    return (
    <>
        {props.dialog && <div ref={props.fref} className='whole-page'>
            <div className="dialog-msg">
                <div className='msg'>{props.msg}</div>
                <div className='buttons'>
                    <Button className="yes"
                            onClick={()=>{props.onClose(); No()}} 
                            label="Yes" />
                    <Button className="no"
                            onClick={No} 
                            label="No" />
                </div>
            </div>
        </div>}
    </>
    )
}

export default DialogYesNo;