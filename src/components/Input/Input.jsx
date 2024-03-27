import { useState, useRef } from 'react';
import './Input.scss';


function Input(props) {
  const placeholder = useRef(null);
  const placeholder2 = useRef(null);
  const Timer1 = useRef(null);
  const Timer2 = useRef(null);
  const input = useRef(null);
  const [Loading, setLoading] = useState(false);

  function handleInputBoxClick(e) {
    input.current.focus();
  }
  function handleInputFocused(e) {
    placeholder.current.style.left = "0px";
    placeholder.current.style.transform = "translate(-100%,-50%)";

    clearTimeout(Timer2.current);
    Timer1.current = setTimeout(() => {
      placeholder2.current.style.transform = "translate(0%,-50%)";
    }, 100);
    
  }
  function handleInputBlurred(e) {
    const { _, value } = e.target;

    if (value==="") {
      placeholder2.current.style.transform = "translate(100%,-50%)";

      clearTimeout(Timer1.current);
      Timer2.current = setTimeout(() => {
        placeholder.current.style.transform = "translate(0%,-50%)";
        placeholder.current.style.left = "10px";
      }, 100);
      
    }
  }

  return (
    <div className='parent' onClick={(e)=>handleInputBoxClick(e)}>
      <div className="input-box">
        <input name={props.name} ref={input} className='input' type={props.type} spellCheck="false"
               onFocus={e=>handleInputFocused(e)} onBlur={e=>handleInputBlurred(e)}
               onChange={props.onChange}/>

        <p ref={placeholder} style={{left:"10px"}} className="placeholder">
          {props.placeholder}
        </p>
        <p ref={placeholder2} style={{right:"0%", transform: "translate(100%,-50%)", paddingRight: "10px"}} 
           className="placeholder"> {props.placeholder}
        </p>
      </div>
    </div>
  )
}

export default Input;