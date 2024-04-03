export function UserCard(props) {return (
    <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
        {props.children}
    </div>
)}
export function VariablesCard(props) {return (
    <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
        {props.children}
    </div>
)}
export function TokensCard(props) {return (
    <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
        {props.children}
    </div>
)}
export function LogsCard(props) {return (
    <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
        {props.children}
    </div>
)}

// export  { UserCard, VariablesCard, TokensCard, LogsCard};