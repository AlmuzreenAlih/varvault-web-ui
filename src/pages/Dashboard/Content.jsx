import Card from './Card'
import Variablerow from './Variablerow';
import Tokenrow from './Tokenrow';
import { useState, useEffect } from 'react';
function Content(props) {
    const [variableList, setVariableList] = useState([]);
    const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];

    useEffect(() => {
        setVariableList(props.variablesList || []);
        console.log(props.variablesList);
    }, [props.variablesList]); // Update variableList when props.variablesList changes

    const [tokensList, setTokenList] = useState([]);

    useEffect(() => {
        setTokenList(props.tokensList || []);
        console.log(props.tokensList);
    }, [props.tokensList]); // Update variableList when props.variablesList changes

    return (
        <div className='ContentDiv'>
            {/* <div className="grid-div"> */}
                <Card className="user-card">
                    <strong className="title">User Details</strong>
                    <section className='header'>
                        <p>Account Creation</p>
                        <p>Total Write Operations <i title="Only counts the API calls" className='material-symbols-outlined'>help</i></p>
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
                <Card className="logs-card">
                    <strong className="title">Logs</strong>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                    <p>fdgfd</p>
                </Card>
                <Card title="Variables" className="variables-card">
                    <strong className="title">Variables</strong>
                    <div className="variable-part">
                        {variableList.slice(0, 5).map((Var, index) => (
                            <Variablerow key={index} unit={Var.unit} 
                                variable_name={Var.variable_name} value={Var.value + " " + Var.unit}
                                updated_at={Var.updated_at}
                                bg = {colorArray[index % colorArray.length]}
                                letter = {Var.variable_name.substring(0, 1)}
                                />
                        ))}
                    </div>
                    <p className='view-all'>View All</p>
                </Card>
                <Card className="tokens-card">
                    <strong className="title">Generated Tokens</strong>
                    <div className="tokens-part">
                        {tokensList.slice(0, 5).map((Tok, index) => (
                            <Tokenrow key={index} id = {index + 1} token={Tok.token} created_at={Tok.created_at} />
                        ))}
                    </div>
                    <p className='view-all'>View All</p>
                </Card>
            {/* </div> */}
        </div>
    )
}

export default Content;