import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../../utils/timeUtils.js'
import { TokenIcon } from '../../utils/Icons.jsx';

function Tokenrow(props) {
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        const timeRem = calculateTimeRemaining(props.created_at);
        let [days, hrs, mins, secs] = timeRem;
        setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s");
    }, [props.created_at]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeRem = calculateTimeRemaining(props.created_at);
            // console.log(timeRem)
            let [days, hrs, mins, secs] = timeRem;
            setTimeRemaining(days + "days " + hrs + "hrs " + mins + "mins " + secs + "s"|| "");
        }, 1000); // 1000 milliseconds (1 second) interval
        
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);

    return (
        <div className="token-row">
            <TokenIcon id={props.id} color="#D875C7"/>
            <div className='details'>
                <p className="token">{props.token}</p>
                <p className="time-left">Expires in {timeRemaining}</p>
            </div>
            
        </div>
    )
}

export default Tokenrow;