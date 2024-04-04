import { useState } from 'react'
import { Account } from '../../utils/Icons.jsx';
import { Elapsed, calculateTimeRemaining } from '../../utils/timeUtils.js'
function Logrow(props) {
  function TimeElapsed({ created_at }) {
    const elapsed = Elapsed(created_at);

    let message = '';
    if (elapsed[0] === 0 && elapsed[1] === 0 && elapsed[2] === 0) {
      message = 'Just Now';
    } else if (elapsed[0] === 0 && elapsed[1] === 0) {
      message = `${elapsed[2]} minute${elapsed[2] > 1 ? 's' : ''} ago`;
    } else if (elapsed[0] === 0) {
      message = `${elapsed[1]} hour${elapsed[1] > 1 ? 's' : ''} ago`;
    } else {
      message = `${elapsed[0]} day${elapsed[0] > 1 ? 's' : ''} ago`;
    }

    return <p>{message}</p>;
  }
    
  function LogConstruct(props) {
    return(
      <div className='logs-row'>
        { props.opCat === "acc_reg" && 
          <>  <Account id={props.id} char="person_add"/>
            <div className='msg'>
              <p>You registered your account to VarVault Web UI.</p>
              <TimeElapsed created_at={props.created_at}/>
            </div>
          </>
        }

        { props.opCat === "acc_log" && 
          <>  <Account id={props.id} char="assignment_ind"/>
            <div className='msg'>
              <p>You logged in to your account to Var&shy;Vault Web UI.</p>
              <TimeElapsed created_at={props.created_at}/>
            </div>
          </>
        }
      </div>
    )
  }
  return (
    <>
      { props.category === "account" ? 
        props.operation === "register" ? <LogConstruct id={props.id} opCat="acc_reg" created_at={props.created_at}/> : 
        props.operation === "login" ? <LogConstruct id={props.id} opCat="acc_log" created_at={props.created_at}/> : null
      : null }
    </>
  )
}

export default Logrow;