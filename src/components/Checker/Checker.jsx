import { useState } from 'react'

function Checker(props) {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <span>
                <p>{props.message}</p><i className="material-symbols-outlined" style={{color: props.color}}>{props.symbol}</i>
            </span>
        </>
    )
}

export default Checker;