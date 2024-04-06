import Cookies from 'universal-cookie';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import VariablesCard from './VariablesCard';
import VariableRow from './VariableRow';
import DisablerPage from '../common/DisablerPage';
import Pagination from '@mui/material/Pagination';
import Button from '../../components/Button/Button';

function VariablesContent(props) {
	const cookies = new Cookies();
	const cancelToken = axios.CancelToken.source();
  const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];
  const pagination = useRef(null);
  
	// COUNTINGS
	const [countings, setCountings] = useState({
		variables: 0,
	});
	useEffect(() => {
		setCountings({ variables: props.cnts[0],
		})
	}, [props.cnts])
	
	// VARIABLE LIST
	const [variablesList, setVariablesList] = useState([]);
  const [variablesCursor, setVariablesCursor] = useState(0);
	useEffect(() => {
    if (props.variablesList) {
      setVariablesList(props.variablesList);
      setVariablesCursor(props.variablesList[props.variablesList.length-1].id)
    }
	}, [props.variablesList]); // Update variableList when props.variablesList changes

  // LOADERS
  const loader_var = useRef(null);

  // SCROLL HANDLERS
  const variablesScrollTimer = useRef(null);
  
  function Handler_Scroll_Variables() {
    var var_div = loader_var.current.parentNode;
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
  function handleChange(e) {console.log(e);}
  return (
    <div className='VariablesContentDiv'>
      <VariablesCard title="Variables" className="variables-card">
        <strong className="title">Variables ({variablesList.length}/{countings.variables}) </strong>
        <div className="variable-part" onScroll={Handler_Scroll_Variables}>
          <div className="variable-row header">
            <div className='col1'><input type="checkbox" /></div>
            <div className='col2 span2'>Variable</div>
            <div className='col3'>Current Value</div>
            <div className='col3'>Type</div>
            <div className='col4'>Created at</div>
            <div className='col5'>Last Updated at</div>
            <div className='col6'>

            </div>
          </div>
          
          {variablesList.sort((a, b) => a.id - b.id).map((Var, index) => (
              <VariableRow key={index} unit={Var.unit} 
                  variable_name={Var.variable_name} variable_value={Var.value} variable_unit={Var.unit}
                  updated_at={Var.updated_at} variable_type={Var.variable_type}
                  id={Var.id}
                  bg = {colorArray[index % colorArray.length]}
                  letter = {Var.variable_name.substring(0, 1)}
                  showEditPanel={props.showEditPanel}
                  deleteVariable={props.deleteVariable}
                  />
          ))}
          {/* <div ref={loader_var} style={{visibility: "visible"}} className="loader"><span></span></div> */}
        </div>
        <div className='view-all'>
          <div className="button"></div>
          <Pagination count={Math.ceil(countings.variables/10)} 
                      defaultPage={1}hahaha
                      page={1} onChange={handleChange}
                      color="primary" size="small" />
          <div className="button">
            <Button onClick={props.showAddPanel} label="+ New Variable"></Button>
          </div>
        </div>
        
      </VariablesCard>
    </div>
  )
}

export default VariablesContent;