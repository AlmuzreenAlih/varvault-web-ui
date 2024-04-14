import { UserCard, VariablesCard, TokensCard, LogsCard } from './Card'
import Variablerow from './Variablerow';
import Tokenrow from './Tokenrow';
import { useState, useEffect, useRef } from 'react';
import Logrow from './Logrow';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { formatDate2 } from '../../utils/timeUtils.js';

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
  const [variablesCursor, setVariablesCursor] = useState(0);
	useEffect(() => {
    if ((props.variablesList) && (props.variablesList.length > 0)) {
      setVariablesList(props.variablesList);
      setVariablesCursor(props.variablesList[props.variablesList.length-1].id)
    }
	}, [props.variablesList]); // Update variableList when props.variablesList changes

  // TOKENS LIST
  const [tokensList, setTokensList] = useState([]);
  const [tokensCursor, setTokensCursor] = useState(0);
  useEffect(() => {
    if ((props.tokensList) && (props.tokensList.length>0)) {
      setTokensList(props.tokensList);
      setTokensCursor(props.tokensList[props.tokensList.length-1].id)
    }
  }, [props.tokensList]); // Update variableList when props.variablesList changes

  // LOGS LIST
  const [logsList, setLogsList] = useState([]); 
  const [logsCursor, setLogsCursor] = useState(0);
  useEffect(() => {
    if ((props.logsList) && (props.logsList.length > 0)) {
      setLogsList(props.logsList);
      setLogsCursor(props.logsList[props.logsList.length-1].id);
    }
  }, [props.logsList]); // Update variableList when props.variablesList changes

  // LOADERS
  const loader_var = useRef(null);
  const loader_tok = useRef(null);
  const loader_log = useRef(null);

  // SCROLL HANDLERS
  const variablesScrollTimer = useRef(null);
  const tokensScrollTimer = useRef(null);
  const logsScrollTimer = useRef(null);
  function Handler_Scroll_Variables() {
    var var_div = loader_var.current.parentNode;
    console.log(variablesList.length, countings.variables)
    if ((var_div.clientHeight  + var_div.scrollTop >= var_div.scrollHeight - 30) && ((variablesList.length < countings.variables))) {
      loader_var.current.style.visibility = "visible";  
      clearTimeout(variablesScrollTimer.current)
      variablesScrollTimer.current = setTimeout(() => {
        axios({ url: 'http://127.0.0.1:3000/private/get-variables', 
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { token:cookies.get('TokenSaved') , cursor: variablesCursor },
                cancelToken: cancelToken.token})
        .then((res) => {
          const variablesToAdd = res.data['variables'];
          var_div.scrollTop = var_div.scrollTop - 50;
          setVariablesList((prev) => [...prev, ...variablesToAdd]);
          setVariablesCursor(variablesToAdd[variablesToAdd.length - 1].id);
          loader_var.current.style.visibility = "hidden";
        })
        .catch((err) => { if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
                          else {alert("Cannot parse the next 10 logs.");}})
      }, 500);
    }
  }
  function Handler_Scroll_Tokens() {
    var tok_div = loader_tok.current.parentNode;
    if ((tok_div.clientHeight  + tok_div.scrollTop >= tok_div.scrollHeight - 30) && ((tokensList.length < countings.tokens))) {
      loader_tok.current.style.visibility = "visible";  
      clearTimeout(tokensScrollTimer.current)
      tokensScrollTimer.current = setTimeout(() => {
        axios({ url: 'http://127.0.0.1:3000/private/get-tokens', 
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { token:cookies.get('TokenSaved') , cursor: tokensCursor },
                cancelToken: cancelToken.token})
        .then((res) => {
          const tokensToAdd = res.data['tokens'];
          tok_div.scrollTop = tok_div.scrollTop - 50;
          setTokensList((prev) => [...prev, ...tokensToAdd]);
          setTokensCursor(tokensToAdd[tokensToAdd.length - 1].id);
          loader_tok.current.style.visibility = "hidden";
        })
        .catch((err) => { if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
                          else {alert("Cannot parse the next 10 logs.");}})
      }, 500);
    }
  }
  function Handler_Scroll_logs() {
    var log_div = loader_log.current.parentNode;
    if ((log_div.clientHeight  + log_div.scrollTop >= log_div.scrollHeight - 30) && ((logsList.length < countings.logs))) {
      loader_log.current.style.visibility = "visible";  
      clearTimeout(logsScrollTimer.current)
      logsScrollTimer.current = setTimeout(() => {
        axios({ url: 'http://127.0.0.1:3000/private/get-logs', 
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: { token:cookies.get('TokenSaved') , cursor: logsCursor },
                cancelToken: cancelToken.token})
        .then((res) => {
          const logsToAdd = res.data['logs'];
          log_div.scrollTop = log_div.scrollTop - 50;
          setLogsList((prev) => [...prev, ...logsToAdd]);
          setLogsCursor(logsToAdd[logsToAdd.length - 1].id);
          loader_log.current.style.visibility = "hidden";
        })
        .catch((err) => { if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
                          else {alert("Cannot parse the next 10 logs.");}})
      }, 500);
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
          <p>{formatDate2(props.accountCreation)}</p>
          <p>{countings.logs}</p>
          <p>{countings.variables}</p>
          <p>{countings.tokens}</p>
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
                      />
          ))}
          <div ref={loader_log} style={{visibility: "hidden"}} className="loader"><span></span></div>
        </div>
        <p className='view-all'><a href="/logs">View All</a></p>
      </LogsCard>

      <VariablesCard title="Variables" className="variables-card">
        <strong className="title">Variables ({variablesList.length}/{countings.variables})</strong>
        <div className="variable-part" onScroll={Handler_Scroll_Variables}>
          {variablesList.map((Var, index) => (
              <Variablerow key={index} unit={Var.unit} 
                  variable_name={Var.variable_name} value={Var.value + " " + Var.unit}
                  updated_at={Var.updated_at}
                  bg = {colorArray[index % colorArray.length]}
                  letter = {Var.variable_name.substring(0, 1)}
                  />
          ))}
          <div ref={loader_var} style={{visibility: "hidden"}} className="loader"><span></span></div>
        </div>
        <p className='view-all'><a href="/variables">View All</a></p>
      </VariablesCard>
      
      <TokensCard className="tokens-card">
        <strong className="title">Generated Tokens ({tokensList.length}/{countings.tokens})</strong>
        <div className="tokens-part" onScroll={Handler_Scroll_Tokens}>
          {tokensList.map((Tok, index) => (
              <Tokenrow key={index} id = {index + 1} token={Tok.token} created_at={Tok.created_at} />
          ))}
          <div ref={loader_tok} style={{visibility: "hidden"}} className="loader"><span></span></div>
        </div>
        <p className='view-all'><a href="/tokens">View All</a></p>
      </TokensCard>
    </div>
  )
}

export default Content;