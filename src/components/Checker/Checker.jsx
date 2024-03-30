import { useState } from 'react'

function Checker(props) {
    return (
        <>
            <span {...props}>
                <p>{props.message}</p><i className="material-symbols-outlined" style={{color: props.color}}>{props.symbol}</i>
            </span>
        </>
    )
}

export default Checker;