import { useState, useEffect } from 'react'
import { TokenIcon } from '../../utils/Icons.jsx';
import { formatDate } from '../../utils/timeUtils.js';
import Button from '../../components/Button/Button.jsx';
import { calculateTimeRemaining } from '../../utils/timeUtils.js'

function TokenRow(props) {
    const [timeRemaining, setTimeRemaining] = useState("")
    
    useEffect(() => {
        const timeRem = calculateTimeRemaining(props.updated_at);
        let [days, hrs, mins, secs] = timeRem;
        setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s");
    }, [props.updated_at]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeRem = calculateTimeRemaining(props.updated_at);
            // console.log(timeRem)
            let [days, hrs, mins, secs] = timeRem;
            setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s"|| "");
        }, 1000); // 1000 milliseconds (1 second) interval
        
        return () => clearInterval(interval); // Clear interval on component unmount
      }, [props.updated_at]);

    return (
        <div className="token-row content">
            <div className='col1'><input type="checkbox" name={"box"+(props.keyy+1)} checked={props.CheckBoxes["box"+(props.keyy+1)]} onChange={props.handleCheckBox}/></div>
            <div className="col2">
                <TokenIcon id={props.id}/>
            </div>
            <div className='col3'>{props.token}</div>
            

            <div className='col4'>{timeRemaining}</div>
            <div className='col5'>{formatDate(props.created_at)}</div>
            <div className='col5'>{formatDate(props.updated_at)}</div>
            <div className='col6'>
                <Button style={{}} 
                    className="renew"
                    onClick={()=>{props.renewToken(props.id)}} 
                    label="Renew" />
                <Button style={{}} 
                    className="delete"
                    onClick={()=>{props.deleteToken(props.id)}} 
                    label="Delete" />
            </div>
        </div>
    )
}

export default TokenRow;