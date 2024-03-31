import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Sidebar from './Sidebar';
import Content from './Content'
import './Dashboard.scss'

function Dashboard() {
    const cookies = new Cookies();
    const cancelToken = axios.CancelToken.source();

    useEffect(() => {
        var TokenSaved = cookies.get('TokenSaved');
        axios({ url: 'http://127.0.0.1:3000/private/get-all',
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                    data: { token: TokenSaved },
                    cancelToken: cancelToken.token,})
        .then((res) => {
            console.log(res.data);
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
        <Sidebar isOverview={true}/>
        <Content />
    </div>
    )
}

export default Dashboard;