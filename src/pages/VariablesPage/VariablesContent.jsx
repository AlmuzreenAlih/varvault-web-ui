import Cookies from 'universal-cookie';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import VariablesCard from './VariablesCard';
import VariableRow from './VariableRow';
import DisablerPage from '../common/DisablerPage';
import Pagination from '@mui/material/Pagination';
import Button from '../../components/Button/Button';
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "var(--color_contrast)"
    }
  }
}));

function VariablesContent(props) {
	const cookies = new Cookies();
	const cancelToken = axios.CancelToken.source();
  const classes = useStyles();
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
  }, [props.CheckBoxes]);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 600); // Set the breakpoint as per your requirement
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {window.removeEventListener('resize', handleResize);};
    }, []); // Only run once on mount

  // Pagination
  function handleChange(e,value) {
    props.setPage(value);
  }

  // Order Functions
  function Orderby_Variable() {props.setOrder_by("variable_name"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Value()    {props.setOrder_by("value");         props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Type()     {props.setOrder_by("variable_type"); props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Created()  {props.setOrder_by("id");            props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}
  function Orderby_Updated()  {props.setOrder_by("updated_at");    props.setOrder(!props.order); props.setPage(1); props.resetCheckboxes();}

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
  const [TFStyles, setTFStyles] = useState(
    { input: { color: 'var(--color_contrast)',
               '&::placeholder': {opacity: 0.5, color:'var(--color_contrast)'}},
      label: {color:'var(--color_contrast)'},
      fieldset: { borderColor: 'var(--color_tertiary)' } });
  const [search, setSearch] = useState("");
  const timer = useRef(null)
  function handleInputChange(e) {
    const { name, value } = e.target;
    setSearch(value);
    if (value === "") {
      clearTimeout(timer.current);
      props.setSearch(value);
    } else {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        props.setSearch(value);
      }, 300);
    }
  }

  function handleSearch() {
    props.setSearch(search);
  }

  function handleCancel() {
    setSearch("");
    props.setSearch("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      props.setSearch(search);
    }
  }
  return (
    <div className='VariablesContentDiv'>
      <VariablesCard title="Variables" className="variables-card">
        <div className="title">
          <strong> Variables </strong> 
          {/* <SearchIcon onClick={handleSearch} style={{color: "var(--color_tertiary)", cursor: "pointer"}}/> */}
          <SearchIcon style={{color: "var(--color_tertiary)"}}/>
          <InputBase sx={{...TFStyles, ml: 1, flex: 1}} placeholder="Search Variable" value={search}
                    inputProps={{ 'aria-label': 'search' }} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
          {/* {search!=="" && <CloseIcon onClick={handleCancel} style={{color: "var(--color_tertiary)", cursor: "pointer"}}/>} */}
        </div>
        <div className="variable-part">
          <div className="variable-row header">
            <div className='col1'><input type="checkbox" name="boxAll" checked={props.CheckBoxes["boxAll"]} onChange={handleCheckBox}/></div>
            <div className='col2 span2' onClick={Orderby_Variable}> VARIABLE        {props.order_by==="variable_name" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'       onClick={Orderby_Value}>    CURRENT VALUE   {props.order_by==="value"         && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'       onClick={Orderby_Type}>     TYPE            {props.order_by==="variable_type" && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col4'       onClick={Orderby_Created}>  CREATED AT      {props.order_by==="id"            && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col5'       onClick={Orderby_Updated}>  LAST UPDATED AT {props.order_by==="updated_at"    && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
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
                  label={isMobile ? "Delete" : "Delete Selected"}></Button>
          </div>
          <div className="counts">(Displaying {(props.page-1)*10+1} - {props.page*10 < countings.variables ? props.page*10 : countings.variables} of {countings.variables})</div>
          
          <div className="button2">
            <Button className="button_bottom" onClick={props.showAddPanel} 
                    label={isMobile ? "+ Add" : "+ Add Variable"}></Button>
          </div>
        </div>
        <div className="paging">
          <Pagination style={{backgroundColor: "var(--color_mode)", color: "white !important"}} 
                        count={Math.ceil(countings.variables/10)} 
                        defaultPage={1}
                        page={props.page} onChange={handleChange}
                        color="primary" size="small"
                        classes={{ ul: classes.ul }}
                        // func={(e,page)=>{console.log(e,page)}}
                        />
        </div>
        
      </VariablesCard>
    </div>
  )
}

export default VariablesContent;