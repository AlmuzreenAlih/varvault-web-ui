import { useState, useEffect } from 'react'
import Button from '../../components/Button/Button';
import Cookies from 'universal-cookie';
import axios from 'axios'

function Dashboard() {
    const cookies = new Cookies();
    const cancelToken = axios.CancelToken.source();

    function LogoutFunction() {
        cookies.set('TokenSaved', null, { path: '/' });
        window.location.replace('/');
    }

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
        <Button className="logout"
                onClick={LogoutFunction} 
                label="Logout" />
    )
}

export default Dashboard;