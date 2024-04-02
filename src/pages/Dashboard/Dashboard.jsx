import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from './Sidebar';
import Content from './Content'
import './Dashboard.scss'

function Dashboard() {
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
      
  return (
  <div className="">
    <Sidebar isOverview={true} />
    <Content accountCreation = {userDetails.created} 
             logsList = {userDetails.logsList}
             variablesList = {userDetails.variablesList}
             tokensList = {userDetails.tokensList} 
             cnts = {userDetails.cnts}/>
  </div>
  )
}

export default Dashboard;