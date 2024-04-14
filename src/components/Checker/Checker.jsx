import { useState } from 'react'
import './Checker.scss'

function Checker(props) {
    return (
        <>
            <span className='checker' {...props}>
                <p>{props.message}</p><i className="material-symbols-outlined" style={{color: props.color}}>{props.symbol}</i>
            </span>
        </>
    )
}

export default Checker;