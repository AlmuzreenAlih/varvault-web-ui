import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import TokensContent from './TokensContent';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import DialogYesNo from '../../components/DialogYesNo/DialogYesNo';
import Loader from '../../components/Loader/Loader';

import './TokensPage.scss'

function TokensPage() {
  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  const [userDetails, setuserDetails] = useState({
    tokensList: [],
    cnts: {tokens: 0}
  })
  const [toSave, setToSave] = useState(false);
  const [page, setPage] = useState(1) // Pagination
  const [order_by, setOrder_by] = useState("id") // Order by column
  const [order, setOrder] = useState(true) // true is DESC and false is ASC
  const [Loader_z_index, setLoader_z_index] = useState(90);
  useEffect(() => {
    setLoader_z_index(90);
    axios({ url: process.env.HOST_ADDRESS+'/private/get-all',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved'), 
                    page: page , target:"tokens",
                    order_by: order_by, order: order}, 
            cancelToken: cancelToken.token,})
    .then((res) => {
      setuserDetails({ ...userDetails, 
        tokensList: res.data['tokens'],
        cnts: {tokens: res.data['cnt_tokens']}
    	})
      if ((res.data['tokens'].length === 0) && (res.data['cnt_tokens'] !== 0)) {setPage(1);}
      resetCheckboxes();
      setLoader_z_index(-1500);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
      else {alert("Cannot connect to the server.")}
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

  function resetCheckboxes() {
    setCheckBoxes({boxAll: false,box1: false, box2: false,box3: false, box4: false,box5: false, box6: false,box7: false, box8: false,box9: false, box10: false,})
  }

  function deleteSelected() {
    console.log(getMatchingIds(CheckBoxes,userDetails.tokensList))
    axios({ url: process.env.HOST_ADDRESS+'/private/delete-multiple-tokens', 
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
        else {setPopup(err.response.data.error);}
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
      axios({ url: process.env.HOST_ADDRESS+'/private/renew-token', 
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
          else {setPopup(err.response.data.error);}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the Tokens List
      });
    } 
    else if (onCloseMode==="delete") {
      axios({ url: process.env.HOST_ADDRESS+'/private/delete-token',
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
          else {setPopup(err.response.data.error);}
        }
      })
      .finally(()=>{
        setToSave((prev)=>(!prev)); //To Reparse the token List
      });
    }
    else if (onCloseMode==="newtoken") {
      axios({ url: process.env.HOST_ADDRESS+'/private/new-token',
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
          else {setPopup(err.response.data.error);}
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
                      deleteSelected={deleteSelected} resetCheckboxes={resetCheckboxes}

                      popup={popup} setPopup={setPopup}
                      />
  <Loader z_index={Loader_z_index}/>
  </div>
  )
}

export default TokensPage;