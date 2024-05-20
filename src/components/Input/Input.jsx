import { useState, useRef, useEffect } from 'react';
import './Input.scss';


function Input(props) {
  const placeholder = useRef(null);
  const placeholder2 = useRef(null);
  const Timer1 = useRef(null);
  const Timer2 = useRef(null);
  const input = useRef(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    clearTimeout(Timer1.current);
    setTimeout(() => {
      input.current.disabled = false;
    }, 1000);
  }, [])

  useEffect(() => {
    if ((input.current.value !== "") && (placeholder.current.style.left !== "97%")) {
      handleInputFocused();
    }
  })

  
  function handleInputBoxClick() {
    input.current.focus();
  }
  function handleInputFocused() {
    placeholder.current.style.left = "97%";
    placeholder.current.style.transform = "translate(-100%,-50%)";    
  }
  function handleInputBlurred(e) {
    const { _, value } = e.target;

    if (value==="") {
      placeholder.current.style.transform = "translate(0%,-50%)";
      placeholder.current.style.left = "10px";
    }
  }
  
  return (
    <div {...props} className={'parent ' + props.className} onClick={handleInputBoxClick}>
      <div className="input-box">
        <input {...props} ref={input} 
                          className='input'
                          spellCheck="false"
                          onFocus={handleInputFocused} 
                          onBlur={handleInputBlurred} 
                          role="presentation"
                          autoComplete={props.autoComplete}
                          disabled
                          />

        <p ref={placeholder}
           style={{...props.style, left:"10px"}} 
           className="placeholder" >
           {props.hint} 
        </p>
      </div>
    </div>
  )
}

export default Input;