import { UserCard, VariablesCard, TokensCard, LogsCard } from './Card'
import Variablerow from './Variablerow';
import Tokenrow from './Tokenrow';
import { useState, useEffect, useRef } from 'react';
import Logrow from './Logrow';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Content(props) {
	const cookies = new Cookies();
	const cancelToken = axios.CancelToken.source();
  const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];

	// COUNTINGS
	const [countings, setCountings] = useState({
		variables: 0,
		tokens: 0,
		logs: 0,
	});
	useEffect(() => {
		setCountings({ variables: props.cnts[0],
									 tokens: props.cnts[1],
									 logs: props.cnts[2],
		})
	}, [props.cnts])
	
	// VARIABLE LIST
	const [variablesList, setVariablesList] = useState([]);
	useEffect(() => {
		setVariablesList(props.variablesList || []);
	}, [props.variablesList]); // Update variableList when props.variablesList changes

  // TOKENS LIST
  const [tokensList, setTokenList] = useState([]);
  useEffect(() => {
    setTokenList(props.tokensList || []);
  }, [props.tokensList]); // Update variableList when props.variablesList changes

  // LOGS LIST
  const [logsList, setLogsList] = useState([]); 
  const [logsCursor, setLogsCursor] = useState(0);
  useEffect(() => {
    if (props.logsList) {
      setLogsList(props.logsList.sort((a,b)=>b.id-a.id));
      setLogsCursor(props.logsList.sort((a,b)=>b.id-a.id)[props.logsList.length-1].id);
    }
  }, [props.logsList]); // Update variableList when props.variablesList changes

  // LOADERS
  const loader_var = useRef(null);
  const loader_tok = useRef(null);
  const loader_log = useRef(null);
  const logsScrollTimer = useRef(null);

  // SCROLL HANDLERS
  function Handler_Scroll_logs() {
    var log_div = loader_log.current.parentNode;
    if (logsList.length < countings.logs) {
      if (log_div.clientHeight  + log_div.scrollTop >= log_div.scrollHeight - 30) {
        loader_log.current.style.visibility = "visible";  
        clearTimeout(logsScrollTimer.current)
        logsScrollTimer.current = setTimeout(() => {
          axios({ url: 'http://127.0.0.1:3000/private/get-logs', method: 'post',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  data: { token:cookies.get('TokenSaved') , cursor: logsCursor },
                  cancelToken: cancelToken.token})
          .then((res) => {
            const logsToAdd = res.data['logs'].sort((a, b) => b.id - a.id);
            log_div.scrollTop = log_div.scrollTop - 50;
            setLogsList((prev) => [...prev, ...logsToAdd]);
            setLogsCursor(logsToAdd[logsToAdd.length - 1].id);
            loader_log.current.style.visibility = "hidden";
          })
          .catch((err) => { if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
                            else {alert("wrong2");}})
        }, 1000);
      }
    }
  }

  return (
    <div className='ContentDiv'>
      <UserCard className="user-card">
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
      </UserCard>

      <LogsCard className="logs-card">
        <strong className="title">Logs ({logsList.length}/{countings.logs})</strong>
        <div className='logs-part' onScroll={Handler_Scroll_logs}>
          {logsList.map((Logg, index) => (
              <Logrow key = {index}
                      id = {Logg.id}
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
      </LogsCard>

      <VariablesCard title="Variables" className="variables-card">
        <strong className="title">Variables ({variablesList.length}/{countings.variables})</strong>
        <div className="variable-part">
          {variablesList.sort((a, b) => a.id - b.id).map((Var, index) => (
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
      </VariablesCard>
      
      <TokensCard className="tokens-card">
        <strong className="title">Generated Tokens ({tokensList.length}/{countings.tokens})</strong>
        <div className="tokens-part">
          {tokensList.slice(0, 5).map((Tok, index) => (
              <Tokenrow key={index} id = {index + 1} token={Tok.token} created_at={Tok.created_at} />
          ))}
          <div ref={loader_tok} style={{visibility: true}} className="loader"></div>
        </div>
        <p className='view-all'>View All</p>
      </TokensCard>
    </div>
  )
}

export default Content;