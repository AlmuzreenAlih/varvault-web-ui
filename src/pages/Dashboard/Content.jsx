import Card from './Card'

function Content() {
    return (
        <div className='ContentDiv'>
            {/* <div className="grid-div"> */}
                <Card title="User Details">
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
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