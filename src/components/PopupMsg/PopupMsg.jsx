import { useEffect } from 'react';
import './PopupMsg.scss'

// const [popup, setPopup] = useState(false);
// <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>
// setPopup("Saved Successfully");

function PopupMsg(props) {
    useEffect(() => {
        console.log("popup")
        if (props.popup) {
            setTimeout(() => {
                props.setPopup(false);
            }, 2500);
        }    
      }, [props.popup]);

    return (
        <div className="popup-msg" style={{opacity: props.popup ? 1 : 0}}>
            {props.msg}
        </div>
    )
}

export default PopupMsg;