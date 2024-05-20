import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import LogsContent from './LogsContent';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import DialogYesNo from '../../components/DialogYesNo/DialogYesNo';
import Loader from '../../components/Loader/Loader';
// import './LogsPage.scss'

function LogsPage() {
  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  const [userDetails, setuserDetails] = useState({
    logsList: [],
    cnts: {logs: 0}
  })
  const [toSave, setToSave] = useState(false);
  const [page, setPage] = useState(1) // Pagination
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("")
  const [Loader_z_index, setLoader_z_index] = useState(90);
  useEffect(() => {
    setLoader_z_index(90);
    axios({ url: process.env.HOST_ADDRESS+'/private/get-all',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: cookies.get('TokenSaved'), 
                    page: page , target:"Logs",
                    order_by: "", order: "",
                    startDate: startDate, endDate: endDate,
                    category:category}, 
            cancelToken: cancelToken.token,})
    .then((res) => {
      setuserDetails({ ...userDetails, 
        logsList: res.data['logs'],
        cnts: {logs: res.data['cnt_logs']}
    	})
      if ((res.data['logs'].length === 0) && (res.data['cnt_logs'] !== 0)) {setPage(1);}
      setLoader_z_index(-1500);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {console.log("Request cancelled:", err.message);} 
      else {console.log(err)}
    });
    console.log("first")
    return () => {cancelToken.cancel('Request cancelled');};
    
  }, [toSave,page,startDate,endDate,category])

  const [popup, setPopup] = useState(false);
  const [dialog, setDialog] = useState(false);

  return (
  <div className="">
    <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>
    {/* <DialogYesNo msg={dialog} dialog={dialog} setDialog={setDialog} onClose={handleOnClose}/> */}
    {/* useStateVanishers(state boolean string login), on/eventFunctions, inputValues  */}
    <Sidebar isLogs={true} />
    <LogsContent logsList = {userDetails.logsList}
                 cnts = {userDetails.cnts}
                 page={page} setPage={setPage}
                 popup={popup} setPopup={setPopup}
                 startDate={startDate} setStartDate={setStartDate}
                 endDate={endDate} setEndDate={setEndDate}

                 category={category} setCategory={setCategory}
                />
    <Loader z_index={Loader_z_index}/>
  </div>
  )
}

export default LogsPage;