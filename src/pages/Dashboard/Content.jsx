import Card from './Card'

function Content(props) {
    return (
        <div className='ContentDiv'>
            {/* <div className="grid-div"> */}
                <Card title="User Details" className="user-card">
                    <section className='header'>
                        <p>Account Creation</p>
                        <p>Total Requests</p>
                        <p>Variables Added</p>
                        <p>Tokens Added</p>
                    </section>

                    <section className='body'>
                        <p>{props.accountCreation}</p>
                        <p>{props.logsList.length}</p>
                        <p>{props.variablesList.length}</p>
                        <p>{props.tokensList.length}</p>
                    </section>
                </Card>
                <Card title="Logs" className="logs-card">
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                </Card>
                <Card title="Variables">
                    <div className="variables-card">
                    <Card title="Variable1" bg="#d992f5"></Card>
                    <Card title="Variable1" bg="#d992f5"></Card>
                    <Card title="Variable1" bg="#d992f5"></Card>
                    </div>
                </Card>
                <Card title="Generated Tokens" >
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                </Card>
            {/* </div> */}
        </div>
    )
}

export default Content;