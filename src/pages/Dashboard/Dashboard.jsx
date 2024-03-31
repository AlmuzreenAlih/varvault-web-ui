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
    logsList: "",
    variablesList: "",
    tokensList: "",
  })
  useEffect(() => {
    var TokenSaved = cookies.get('TokenSaved');
    axios({ url: 'http://127.0.0.1:3000/private/get-all',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
            data: { token: TokenSaved },
            cancelToken: cancelToken.token,})
    .then((res) => {
      const tokensList = res.data['tokens'];
      const variablesList = res.data['variables'];
      const logsList = res.data['logs'];
      setuserDetails({ ...userDetails, 
        created: res.data['created_at'],
        logsList: logsList,
        variablesList: variablesList, 
        tokensList: tokensList,
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
              tokensList = {userDetails.tokensList} />
  </div>
  )
}

export default Dashboard;