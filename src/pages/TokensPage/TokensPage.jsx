import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import TokensContent from './TokensContent';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import DialogYesNo from '../../components/DialogYesNo/DialogYesNo';

import './TokensPage.scss'

function TokensPage() {
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
                    page: page , target:"tokens",
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

  
  // Renewing
  const [idToRenew, setIdToRenew] = useState(null);
  
  function renewToken(id) {
    setOnCloseMode("renew");
    setDialog("Are you sure you want to renew?");
    setIdToRenew(id);
  }

  function addNewToken() {
    setOnCloseMode("newtoken");
    setDialog("Do you want to generate a new token?");
  }
  
  // Deleting token
  const [idToDelete, setIdToDelete] = useState(null);
  function deleteToken(id) {
    setOnCloseMode("delete");
    setDialog("Are you sure you want to delete?");
    setIdToDelete(id)
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
    axios({ url: 'http://127.0.0.1:3000/private/delete-multiple-tokens', 
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: { token:cookies.get('TokenSaved') , token_ids: getMatchingIds(CheckBoxes,userDetails.tokensList) },
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
      }
    })
    .finally(()=>{
      setCheckBoxes({boxAll: false,box1: false, box2: false,box3: false, box4: false,box5: false, box6: false,box7: false, box8: false,box9: false, box10: false,})
      setToSave((prev)=>(!prev)); //To Reparse the Tokens List
    });
  }

  const [popup, setPopup] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [onCloseMode, setOnCloseMode] = useState("renew");
  function handleOnClose() {
    if (onCloseMode==="renew") {
      axios({ url: 'http://127.0.0.1:3000/private/renew-token', 
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: { token:cookies.get('TokenSaved') , token_id: idToRenew},
            cancelToken: cancelToken.token})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Renewed Successfully");
          }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the Tokens List
      });
    } 
    else if (onCloseMode==="delete") {
      axios({ url: 'http://127.0.0.1:3000/private/delete-token',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved'), 
                    token_id: idToDelete},
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
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the token List
      });
    }
    else if (onCloseMode==="newtoken") {
      axios({ url: 'http://127.0.0.1:3000/private/new-token',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved') },
            cancelToken: cancelToken.token,})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Token Generated Successfully");
          }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the token List
      });
    }
  }

  return (
  <div className="">

    <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>
    <DialogYesNo msg={dialog} dialog={dialog} setDialog={setDialog} onClose={handleOnClose}/>
    {/* useStateVanishers(state boolean string login), on/eventFunctions, inputValues  */}
    <Sidebar isTokens={true} />
    <TokensContent accountCreation = {userDetails.created} 
                      tokensList = {userDetails.tokensList}
                      cnts = {userDetails.cnts}

                      renewToken={renewToken}
                      deleteToken= {deleteToken}
                      addNewToken={addNewToken}

                      page={page} setPage={setPage}
                      order_by={order_by} setOrder_by={setOrder_by}
                      order={order} setOrder={setOrder}

                      CheckBoxes={CheckBoxes} setCheckBoxes={setCheckBoxes}
                      deleteSelected={deleteSelected}
                      />
  </div>
  )
}

export default TokensPage;