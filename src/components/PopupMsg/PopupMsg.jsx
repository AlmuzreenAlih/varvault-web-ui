import { useEffect,useRef } from 'react';
import './PopupMsg.scss'

// const [popup, setPopup] = useState(false);
// <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>
// setPopup("Saved Successfully");

function PopupMsg(props) {
    const timer = useRef(null);
    useEffect(() => {
        if (props.popup) {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                props.setPopup(false);
            }, 3000);
        }    
      }, [props.popup]);

    return (
    <>
        {props.popup &&
            <div className={props.centered ? "centered popup-msg" : "popup-msg"} style={{opacity: props.popup ? 1 : 0}}>
                {props.msg}
            </div>
        }
    </>
    )
}

export default PopupMsg;