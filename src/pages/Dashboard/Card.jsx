function Card(props) {
    return (
        <div className={"card "+ props.className} style={{backgroundColor: props.bg}}>
            <strong className='title'> { props.title } </strong>

            <div style={{height: "100%"}}>
                {props.children}
            </div>
        </div>
    )
}

export default Card;