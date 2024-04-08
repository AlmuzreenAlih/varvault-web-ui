import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import VariablesContent from './VariablesContent';
import VariableEditPanel from './VariableEditPanel';
import DisablerPage from '../common/DisablerPage';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import DialogYesNo from '../../components/DialogYesNo/DialogYesNo';

import './VariablesPage.scss'

function VariablesPage() {
  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  const [userDetails, setuserDetails] = useState({
    created: "",
    variablesList: "",
    tokensList: "",
    logsList: "",
    cnts: null
  })
  const [toSave, setToSave] = useState(false);
  const [page, setPage] = useState(1) // Pagination
  const [order_by, setOrder_by] = useState("id") // Order by column
  const [order, setOrder] = useState(true) // true is DESC and false is ASC
  useEffect(() => {
    axios({ url: 'http://127.0.0.1:3000/private/get-all',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved'), 
                    page: page , target:"variable",
                    order_by: order_by, order: order}, 
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
  }, [toSave,page,order_by,order])

  // Editing
  const [editingMode, setEditingMode] = useState(false); //To Show the editing dialog
  const [editInputValues, setEditInputValues] = useState({
    variable_id: "",
    variable_name: "none",
    variable_value: "",
    variable_type: "",
    variable_unit:""
  });
  function showEditPanel(id,name,value,type,unit) {
    setEditingMode("Edit Variable");
    setEditInputValues({
      variable_id: id,
      variable_name: name,
      variable_value: value,
      variable_type: type,
      variable_unit: unit
    })
  }
  function showAddPanel(id,name,value,type,unit) {
    setEditingMode("Add Variable");
    setEditInputValues({
      variable_id: "add",
      variable_name: "",
      variable_value: "",
      variable_type: "",
      variable_unit: ""
    })
  }
  function saveEditing(e) {
    e.preventDefault();
    if (editInputValues.variable_id == "add") {
      axios({ url: 'http://127.0.0.1:3000/private/add-variable',
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
              data: { token: cookies.get('TokenSaved'), variable_id: editInputValues.variable_id, 
                      variable_name: editInputValues.variable_name, variable_value: editInputValues.variable_value,          
                      variable_type: editInputValues.variable_type, variable_unit: editInputValues.variable_unit },
              cancelToken: cancelToken.token,})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Saved Successfully");
          setEditingMode(false);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
          if (err.response.status === 451) {setPopup("Mismatch of type and value");}
          if (err.response.status === 452) {setPopup("Variable name is required.");}
          if (err.response.status === 409) {setPopup("Something");}
          if (err.response.status === 422) {setPopup("Variable Name already used in other variables.");}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the Variable List
      });
    }
    else {
      axios({ url: 'http://127.0.0.1:3000/private/edit-variable',
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
              data: { token: cookies.get('TokenSaved'), variable_id: editInputValues.variable_id, 
                      variable_name: editInputValues.variable_name, variable_value: editInputValues.variable_value,          
                      variable_type: editInputValues.variable_type, variable_unit: editInputValues.variable_unit },
              cancelToken: cancelToken.token,})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Saved Successfully");
          setEditingMode(false);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
          if (err.response.status === 451) {setPopup("Mismatch of type and value");}
          if (err.response.status === 409) {setPopup("Something");}
          if (err.response.status === 422) {setPopup("Variable Name already used in other variables.");}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the Variable List
      });
    }
  }

  // Deleting variable
  const [idToDelete, setIdToDelete] = useState(null);
  function deleteVariable(id) {
    setDialog("Are you sure you want to delete?");
    setIdToDelete(id)
  }
  function ondeleteVariable() {
    axios({ url: 'http://127.0.0.1:3000/private/delete-variable',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved'), 
                    variable_id: idToDelete},
            cancelToken: cancelToken.token,})
    .then((res) => {
      if (res.data['msg'] === "Success") {
        setPopup("Deleted Successfully");
        }
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
      } else {
        if (err.response.status === 401) {setPopup("Unauthorized");}
        if (err.response.status === 451) {setPopup("Mismatch of type and value");}
        if (err.response.status === 409) {setPopup("Something");}
        if (err.response.status === 422) {setPopup("Variable Name already used in other variables.");}
      }
    })
    .finally(()=>{
      setToSave((prev)=>(!prev)); //To Reparse the Variable List
    });
  }

  //Checkboxes
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
        try {
          const index = parseInt(property.replace('box', ''), 10); const matchedItem = array[index-1];
          matchedIds.push(matchedItem.id); 
        } catch {
          return matchedIds;
        }
      }
    }
    return matchedIds;
  }

  function deleteSelected() {
    axios({ url: 'http://127.0.0.1:3000/private/delete-multiple-variables', 
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: { token:cookies.get('TokenSaved') , variable_ids: getMatchingIds(CheckBoxes,userDetails.variablesList) },
            cancelToken: cancelToken.token})
    .then((res) => {
      if (res.data['msg'] === "Success") {
        setPopup("Deleted Successfully");
        }
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
      } else {
        if (err.response.status === 401) {setPopup("Unauthorized");}
        if (err.response.status === 451) {setPopup("Mismatch of type and value");}
        if (err.response.status === 409) {setPopup("Something");}
        if (err.response.status === 422) {setPopup("Variable Name already used in other variables.");}
      }
    })
    .finally(()=>{
      setCheckBoxes({boxAll: false,box1: false, box2: false,box3: false, box4: false,box5: false, box6: false,box7: false, box8: false,box9: false, box10: false,})
      setToSave((prev)=>(!prev)); //To Reparse the Variable List
    });
  }

  const [popup, setPopup] = useState(false);
  const [dialog, setDialog] = useState(false);

  return (
  <div className="">
    <VariableEditPanel editingMode={editingMode} setEditingMode={setEditingMode}
                       saveEditing={saveEditing}
                       editInputValues={editInputValues} setEditInputValues={setEditInputValues}/>

    <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>
    <DialogYesNo msg={dialog} dialog={dialog} setDialog={setDialog} onClose={ondeleteVariable}/>
    {/* useStateVanishers(state boolean string login), on/eventFunctions, inputValues  */}
    <Sidebar isVariables={true} />
    <VariablesContent accountCreation = {userDetails.created} 
                      variablesList = {userDetails.variablesList}
                      cnts = {userDetails.cnts}

                      showEditPanel={showEditPanel}
                      deleteVariable= {deleteVariable}
                      showAddPanel={showAddPanel}

                      page={page} setPage={setPage}
                      order_by={order_by} setOrder_by={setOrder_by}
                      order={order} setOrder={setOrder}

                      CheckBoxes={CheckBoxes} setCheckBoxes={setCheckBoxes}
                      deleteSelected={deleteSelected}
                      />
  </div>
  )
}

export default VariablesPage;