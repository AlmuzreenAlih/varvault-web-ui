import Card from './Card'
import Variablerow from './Variablerow';
import Tokenrow from './Tokenrow';
import { useState, useEffect, useRef } from 'react';
import Logrow from './Logrow';

function Content(props) {
    const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];
    // COUNTINGS
    const [countings, setCountings] = useState({
        variables: 0,
        tokens: 0,
        logs: 0,
    });
    useEffect(() => {
      setCountings({
        variables: props.cnts[0],
        tokens: props.cnts[1],
        logs: props.cnts[2],
      })
    }, [props.cnts])
    
    // VARIABLE LIST
    const [variableList, setVariableList] = useState([]);
    useEffect(() => {
        setVariableList(props.variablesList || []);
    }, [props.variablesList]); // Update variableList when props.variablesList changes

    // TOKENS LIST
    const [tokensList, setTokenList] = useState([]);
    useEffect(() => {
        setTokenList(props.tokensList || []);
    }, [props.tokensList]); // Update variableList when props.variablesList changes

    const [logsList, setLogsList] = useState([]);
    const [logsCursor, setLogsCursor] = useState(0);
    useEffect(() => {
        if (props.logsList && props.logsList.length > 0) {
            setLogsList(props.logsList);
            setLogsCursor(props.logsList[0].id);
        } else {
            setLogsList([]);
            setLogsCursor(0);
        }
    }, [props.logsList]); // Update variableList when props.variablesList changes

    // LOADERS
    const loader_var = useRef(null);
    const loader_tok = useRef(null);
    const loader_log = useRef(null);

    // SCROLL HANDLERS
    function Handler_Scroll_logs() {
        var log_div = loader_log.current.parentNode;
        const divScrollHeight = log_div.scrollHeight - 30;
        const scrollPosition = log_div.clientHeight  + log_div.scrollTop;
        if (scrollPosition >= divScrollHeight) {
            log_div.removeEventListener('scroll', Handler_Scroll_logs);
            loader_log.current.style.visibility = "visible";
            // setLogsList((prev) => ([...prev, ...]));
        }
    }
    useEffect(() => {
        var log_div = loader_log.current.parentNode

        log_div.addEventListener('scroll', Handler_Scroll_logs);
        return () => log_div.removeEventListener('scroll', Handler_Scroll_logs);
    }, []);
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
                    <strong className="title">Logs ({logsList.length}/{countings.logs}) {logsCursor}</strong>
                    <div className='logs-part'>
                        {logsList.map((Logg, index) => (
                            <Logrow key = {index}
                                    operation={Logg.operation}
                                    category={Logg.category}
                                    created_at={Logg.created_at}
                                    // operation={Logg.operation}
                                    // operation={Logg.operation}
                                    // operation={Logg.operation}
                                    />
                        ))}
                        <div ref={loader_log} style={{visibility: "hidden"}} className="loader"><span></span></div>

                    </div>
                    <p className='view-all'>View All</p>
                </Card>
                <Card title="Variables" className="variables-card">
                    <strong className="title">Variables ({variableList.length}/{countings.variables})</strong>
                    <div className="variable-part">
                        {variableList.slice(0, 5).map((Var, index) => (
                            <Variablerow key={index} unit={Var.unit} 
                                variable_name={Var.variable_name} value={Var.value + " " + Var.unit}
                                updated_at={Var.updated_at}
                                bg = {colorArray[index % colorArray.length]}
                                letter = {Var.variable_name.substring(0, 1)}
                                />
                        ))}
                        <div ref={loader_var} style={{visibility: true}} className="loader"><span></span></div>
                    </div>
                    <p className='view-all'>View All</p>
                </Card>
                <Card className="tokens-card">
                    <strong className="title">Generated Tokens ({tokensList.length}/{countings.tokens})</strong>
                    <div className="tokens-part">
                        {tokensList.slice(0, 5).map((Tok, index) => (
                            <Tokenrow key={index} id = {index + 1} token={Tok.token} created_at={Tok.created_at} />
                        ))}
                        <div ref={loader_tok} style={{visibility: true}} className="loader"></div>
                        
                    </div>
                    <p className='view-all'>View All</p>
                </Card>
            {/* </div> */}
        </div>
    )
}

export default Content;