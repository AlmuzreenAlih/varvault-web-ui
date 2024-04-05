import { useState } from 'react'
import './DisablerPage.scss'

function DisablerPage(props) {
    return (
        <div ref={props.forwardedRef} className={'DisablerPage ' + props.className}>

        </div>
    )
}

export default DisablerPage;