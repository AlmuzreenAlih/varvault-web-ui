import { useState, useEffect } from 'react';
import './Loading.scss';

function Loading() {
    const [delayIsDone, setDelayIsDone] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDelayIsDone(true);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
        {delayIsDone &&
            <div className='lds-parent'>
                <p>Please wait while the VarVault API project is initializing. VarVault API is hosted on a free account registered on a cloud provider, so this may take a while due to the cloud provider's free instance spin down with inactivity which can delay requests by 50 seconds or more.</p>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>}
        </>
    );
}

export default Loading;
