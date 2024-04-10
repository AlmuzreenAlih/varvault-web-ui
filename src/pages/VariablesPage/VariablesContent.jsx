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
    if (props.cnts) {
      setCountings({ variables: props.cnts[0],
    })
    }
	}, [props.cnts])
	
	// VARIABLE LIST
	const [variablesList, setVariablesList] = useState([]);
	useEffect(() => {
    if (props.variablesList) {
      setVariablesList(props.variablesList);
    }
	}, [props.variablesList]); // Update variableList when props.variablesList changes

  // Visibilities
  const [deleteVisibility, setDeleteVisibility] = useState("hidden")

  useEffect(() => {
    for (const box in props.CheckBoxes) {
      if (props.CheckBoxes[box] == true) {setDeleteVisibility("visible"); return}
    }
    setDeleteVisibility("hidden");
  }, [props.CheckBoxes])
  

  // Pagination
  function handleChange(e,value) {
    props.setPage(value);
  }

  // Order Functions
  function Orderby_Variable() {props.setOrder_by("variable_name"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Value()    {props.setOrder_by("value"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Type()     {props.setOrder_by("variable_type"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Created()  {props.setOrder_by("id"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Updated()  {props.setOrder_by("updated_at"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}

  // CheckBoxes
  function handleCheckBox(e) {
    const { name, checked } = e.target;
    console.log(name,checked)
    if (name==="boxAll") {
      props.setCheckBoxes({
        ...props.CheckBoxes, [name]: checked ,
        box1: checked, box2: checked,
        box3: checked, box4: checked,
        box5: checked, box6: checked,
        box7: checked, box8: checked,
        box9: checked, box10: checked,
    })} else {
      props.setCheckBoxes({ ...props.CheckBoxes, boxAll: false, [name]: checked });
    }
  }
  
  return (
    <div className='VariablesContentDiv'>
      <VariablesCard title="Variables" className="variables-card">
        <strong className="title"> Variables </strong>
        <div className="variable-part">
          <div className="variable-row header">
            <div className='col1'><input type="checkbox" name="boxAll" checked={props.CheckBoxes["boxAll"]} onChange={handleCheckBox}/></div>
            <div className='col2 span2' onClick={Orderby_Variable}> Variable        {props.order_by==="variable_name" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'          onClick={Orderby_Value}> Current Value   {props.order_by==="value"         && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'           onClick={Orderby_Type}> Type            {props.order_by==="variable_type" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col4'        onClick={Orderby_Created}> Created at      {props.order_by==="id"            && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col5'        onClick={Orderby_Updated}> Last Updated at {props.order_by==="updated_at"    && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col6'></div>
          </div>
          
          {variablesList.map((Var, index) => (
              <VariableRow key={index} id={Var.id} keyy={index} 
                  unit={Var.unit} variable_name={Var.variable_name} 
                  variable_value={Var.value} variable_unit={Var.unit}
                  created_at={Var.created_at} updated_at={Var.updated_at} 
                  variable_type={Var.variable_type}
                  
                  bg = {colorArray[index % colorArray.length]}
                  letter = {Var.variable_name.substring(0, 1)}
                  
                  showEditPanel={props.showEditPanel}
                  deleteVariable={props.deleteVariable}
                  
                  CheckBoxes={props.CheckBoxes} setCheckBoxes={props.setCheckBoxes}
                  handleCheckBox={handleCheckBox}
                  />
          ))}
          {/* <div ref={loader_var} style={{visibility: "visible"}} className="loader"><span></span></div> */}
        </div>
        <div className='view-all'>
        <div className="button1">
          <Button style={{visibility: deleteVisibility}} 
                  className="button_bottom" onClick={props.deleteSelected} 
                  label="Delete Selected"></Button>
          </div>
          <div className="counts">(Displaying {(props.page-1)*10+1} - {props.page*10 < countings.variables ? props.page*10 : countings.variables} of {countings.variables})</div>
          
          <div className="button2">
            <Button className="button_bottom" onClick={props.showAddPanel} 
                    label="+ Add Variable"></Button>
          </div>
        </div>
        <div className="paging">
          <Pagination count={Math.ceil(countings.variables/10)} 
                        defaultPage={1}
                        page={props.page} onChange={handleChange}
                        color="primary" size="small" 
                        // func={(e,page)=>{console.log(e,page)}}
                        />
        </div>
        
      </VariablesCard>
    </div>
  )
}

export default VariablesContent;