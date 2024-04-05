import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import VariablesContent from './VariablesContent';
import VariableEditPanel from './VariableEditPanel';
import DisablerPage from '../common/DisablerPage';
import './VariablesPage.scss'

function VariablesPage() {
  const [editInputValues, setEditInputValues] = useState({
    variable_id: "",
    variable_name: "none",
    variable_value: "",
    variable_type: "",
    variable_unit:""
  });

  const Disabler = useRef(null);
  const EditPage = useRef(null);

  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  const [userDetails, setuserDetails] = useState({
    created: "",
    variablesList: "",
    tokensList: "",
    logsList: "",
    cnts: []
  })
  useEffect(() => {
    var TokenSaved = cookies.get('TokenSaved');
    axios({ url: 'http://127.0.0.1:3000/private/get-all',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: TokenSaved },
            cancelToken: cancelToken.token,})
    .then((res) => {
      setuserDetails({ ...userDetails, 
        created: res.data['created_at'],
        variablesList: res.data['variables'], 
        tokensList: res.data['tokens'],
        logsList: res.data['logs'],
        cnts: [res.data['cnt_variables'],res.data['cnt_tokens'],res.data['cnt_logs']]
    	})
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
      } else {
        alert("register wrong2");
      }
    });

    return () => {cancelToken.cancel('Request cancelled');};
  }, [])
  
  function showEditPanel(e, id,name,value,type,unit) {
    EditPage.current.classList.remove("vanished");
    Disabler.current.classList.remove("vanished");
    setEditInputValues({
      variable_id: id,
      variable_name: name,
      variable_value: value,
      variable_type: type,
      variable_unit: unit
    })
  }
  function hidePanels(e) {
    e.preventDefault()
    EditPage.current.classList.add("vanished");
    Disabler.current.classList.add("vanished");
  }
  return (
  <div className="">
    <VariableEditPanel className="vanished"
                       forwardedRef={EditPage} hidePanels={hidePanels}
                       editInputValues={editInputValues} setEditInputValues={setEditInputValues}/>
    <DisablerPage forwardedRef={Disabler} className="vanished" />

    <Sidebar isVariables={true} />
    <VariablesContent accountCreation = {userDetails.created} 
                      variablesList = {userDetails.variablesList}
                      cnts = {userDetails.cnts}
                      showEditPanel={showEditPanel}
                      />
    
  </div>
  )
}

export default VariablesPage;