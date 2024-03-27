import { useState } from 'react'
import './Button.scss'
function Button(props) {
    return (
        <button className={props.className} onClick={props.onClick}>{props.label}</button>
    )
}

export default Button;