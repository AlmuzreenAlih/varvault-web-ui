function Card(props) {
    return (
        <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
            {props.children}
        </div>
    )
}

export default Card;