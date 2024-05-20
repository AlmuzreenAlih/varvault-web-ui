import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from '../common/Sidebar';
import Content from './Content'
import './Dashboard.scss'
import Loader from '../../components/Loader/Loader';

function Dashboard() {
  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  const [userDetails, setuserDetails] = useState({
    created: "",
    variablesList: [],
    tokensList: [],
    logsList: [],
    cnts: []
  })
  const [Loader_z_index, setLoader_z_index] = useState(90);
  useEffect(() => {
    setLoader_z_index(90);
    var TokenSaved = cookies.get('TokenSaved');
    axios({ url: process.env.HOST_ADDRESS+'/private/get-all',
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
      setLoader_z_index(-1500);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
      } else {
        alert("Cannot connect to the server.");
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
  <Loader z_index={Loader_z_index}/>
  </div>
  )
}

export default Dashboard;