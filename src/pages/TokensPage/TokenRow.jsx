import { useState, useEffect } from 'react'
import { TokenIcon } from '../../utils/Icons.jsx';
import { formatDate3 } from '../../utils/timeUtils.js';
import Button from '../../components/Button/Button.jsx';
import { calculateTimeRemaining } from '../../utils/timeUtils.js'

function TokenRow(props) {
    const [timeRemaining, setTimeRemaining] = useState("")
    
    useEffect(() => {
        const timeRem = calculateTimeRemaining(props.updated_at);
        let [days, hrs, mins, secs] = timeRem;
        setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s");
    }, [props.updated_at]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600); // Set the breakpoint as per your requirement
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};
      }, []); // Only run once on mount
    
    useEffect(() => {
      if (isMobile) {
        setButtonVisibility("visible");
      }
    }, [isMobile]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const timeRem = calculateTimeRemaining(props.updated_at);
            // console.log(timeRem)
            let [days, hrs, mins, secs] = timeRem;
            setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s"|| "");
        }, 1000); // 1000 milliseconds (1 second) interval
        
        return () => clearInterval(interval); // Clear interval on component unmount
      }, [props.updated_at]);

    const [buttonVisibility, setButtonVisibility] = useState("hidden");
    function handleOnMouseOver(e) {
        if (!isMobile) {
            setBackgroundColor("var(--color_theme2)")
            setButtonVisibility("visible")
        }
    }
    function handleOnMouseLeave(e) {
        if (!isMobile) {
            setBackgroundColor("transparent")
            setButtonVisibility("hidden")
        }
    }
    function copyToClip(str) {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        props.setPopup("Token Copied Successfuly")
      }
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    return (
        <div className="token-row content" onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}> 
            <div style={{backgroundColor: backgroundColor}} className='col1'>
                <input type="checkbox" name={"box"+(props.keyy+1)} 
                       checked={props.CheckBoxes["box"+(props.keyy+1)]} onChange={props.handleCheckBox}/></div>
            <div style={{backgroundColor: backgroundColor}} className="col2">
                <TokenIcon id={props.id}  color="#D875C7"/>
            </div>
            <div style={{backgroundColor: backgroundColor}} className='col3'>{props.token}</div>
            

            <div style={{backgroundColor: backgroundColor}} className='col4'>{timeRemaining}</div>
            <div style={{backgroundColor: backgroundColor}} className='col5'>{formatDate3(props.created_at)}</div>
            <div style={{backgroundColor: backgroundColor}} className='col5'>{formatDate3(props.updated_at)}</div>
            <div style={{backgroundColor: backgroundColor}} className='col6 height3rem'>
            <Button style={{visibility: buttonVisibility}} 
                    className="copy"
                    onClick={()=>{copyToClip(props.token)}} 
                    label="Copy" />
                <Button style={{visibility: buttonVisibility}} 
                    className="renew"
                    onClick={()=>{props.renewToken(props.id)}} 
                    label="Renew" />
                <Button style={{visibility: buttonVisibility}} 
                    className="delete"
                    onClick={()=>{props.deleteToken(props.id)}} 
                    label="Delete" />
            </div>
        </div>
    )
}

export default TokenRow;