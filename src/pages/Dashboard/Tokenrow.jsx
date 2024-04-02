import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../../utils/timeUtils.js'
function Tokenrow(props) {
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        const timeRem = calculateTimeRemaining(props.created_at);
        console.log(timeRem)
        let [days, hrs, mins, secs] = timeRem;
        setTimeRemaining(days + " days " + hrs + " hours " + mins + " mins " + secs + " secs");
    }, [props.created_at]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeRem = calculateTimeRemaining(props.created_at);
            // console.log(timeRem)
            let [days, hrs, mins, secs] = timeRem;
            setTimeRemaining(days + " days " + hrs + " hours " + mins + " mins " + secs + " secs"|| "");
        }, 1000); // 1000 milliseconds (1 second) interval
        
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);

    return (
        <div className="token-row">
            <p className="id">{props.id}</p>
            <div>
                <p className="token">{props.token}</p>
                <p className="time-left">Expires in {timeRemaining}</p>
            </div>
            
        </div>
    )
}

export default Tokenrow;