import './Accordion.scss'
import { useState, useRef } from 'react';
function Accordion(props) {
    const [chevron, setChevron] = useState("expand_more");
    const [transform, settransform] = useState("translate(0%,-100%)");
    const timer = useRef(null)
    function handleOnclick() {
        if (transform === "translate(0%,-100%)") {
            settransform("translate(0%,0%)");
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                setChevron("expand_less");
            }, 300);
        }
        else {
            settransform("translate(0%,-100%)");
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                setChevron("expand_more");
            }, 300);
            
        }
    }
    return (
        <div className="accordion" >
            <section onClick={handleOnclick}>
                <i className="material-symbols-outlined">{props.symbol}</i>
                <span>{ props.title }</span>
                <i className="material-symbols-outlined">{chevron}</i>
            </section>
            <div style={{transform: transform}} className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default Accordion;