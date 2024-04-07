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
  // Pagination
  function handleChange(e,value) {
    props.setPage(value);
  }

  // 
  function Orderby_Variable() {props.setOrder_by("variable_name"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Value() {props.setOrder_by("value"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Type() {props.setOrder_by("variable_type"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Created() {props.setOrder_by("id"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Updated() {props.setOrder_by("updated_at"); props.setOrder(!props.order); props.setPage(1);}

  // CheckBoxes
  const [CheckBoxes, setCheckBoxes] = useState({
    boxAll: false,
    box1: false, box2: false,
    box3: false, box4: false,
    box5: false, box6: false,
    box7: false, box8: false,
    box9: false, box10: false,
  })

  function getMatchingIds(object, array) {
    const matchedIds = [];
    for (const property in object) {
      if (property !== 'boxAll' && object[property] === true) {
        const index = parseInt(property.replace('box', ''), 10); const matchedItem = array[index-1];
        matchedIds.push(matchedItem.id);
      }
    }
    return matchedIds;
  }

  function handleCheckBox(e) {
    const { name, checked } = e.target;
    
    if (name==="boxAll") {
      setCheckBoxes({
        ...CheckBoxes, [name]: checked ,
        box1: checked, box2: checked,
        box3: checked, box4: checked,
        box5: checked, box6: checked,
        box7: checked, box8: checked,
        box9: checked, box10: checked,
    })} else {
      setCheckBoxes({ ...CheckBoxes, [name]: checked });
    }
  }
  function deleteSelected() {
    console.log(getMatchingIds(CheckBoxes,variablesList))
  }
  return (
    <div className='VariablesContentDiv'>
      <VariablesCard title="Variables" className="variables-card">
        <strong className="title"> Variables </strong>
        <div className="variable-part" onScroll={Handler_Scroll_Variables}>
          <div className="variable-row header">
            <div className='col1'><input type="checkbox" name="boxAll" checked={CheckBoxes["boxAll"]} onChange={handleCheckBox}/></div>
            <div className='col2 span2' onClick={Orderby_Variable}> Variable        {props.order_by==="variable_name" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'          onClick={Orderby_Value}> Current Value   {props.order_by==="value"         && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'           onClick={Orderby_Type}> Type            {props.order_by==="variable_type" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col4'        onClick={Orderby_Created}> Created at      {props.order_by==="id"            && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col5'        onClick={Orderby_Updated}> Last Updated at {props.order_by==="updated_at"    && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col6'></div>
          </div>
          
          {variablesList.map((Var, index) => (
              <VariableRow key={index} unit={Var.unit} keyy={index}
                  variable_name={Var.variable_name} variable_value={Var.value} variable_unit={Var.unit}
                  updated_at={Var.updated_at} variable_type={Var.variable_type}
                  id={Var.id}
                  bg = {colorArray[index % colorArray.length]}
                  letter = {Var.variable_name.substring(0, 1)}
                  
                  showEditPanel={props.showEditPanel}
                  deleteVariable={props.deleteVariable}
                  
                  CheckBoxes={CheckBoxes} setCheckBoxes={setCheckBoxes}
                  handleCheckBox={handleCheckBox}
                  />
          ))}
          {/* <div ref={loader_var} style={{visibility: "visible"}} className="loader"><span></span></div> */}
        </div>
        <div className='view-all'>
          <div className="button">(Displaying {(props.page-1)*10+1} - {props.page*10 < countings.variables ? props.page*10 : countings.variables} of {countings.variables})</div>
          <Pagination count={Math.ceil(countings.variables/10)} 
                      defaultPage={1}
                      page={props.page} onChange={handleChange}
                      color="primary" size="small" 
                      // func={(e,page)=>{console.log(e,page)}}
                      />
          <div className="button">
          <Button onClick={deleteSelected} label="Delete Selected"></Button>
            <Button onClick={props.showAddPanel} label="+ New Variable"></Button>
          </div>
        </div>
        
      </VariablesCard>
    </div>
  )
}

export default VariablesContent;