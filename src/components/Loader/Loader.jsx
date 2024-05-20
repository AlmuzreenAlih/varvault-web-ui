import { useState } from 'react'
import './Loader.scss'
function Loader(props) {
    // const [z_index, setZ_index] = useState(null);
    return (
        <div style={{zIndex:props.z_index}} className="ldds-parent">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;