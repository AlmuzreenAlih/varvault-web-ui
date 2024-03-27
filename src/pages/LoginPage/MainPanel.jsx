import { useState, useEffect } from 'react'
import './MainPanel.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checker from '../../components/Checker/Checker';
import axios from 'axios';
import { config } from 'dotenv';

function MainPanel() {

    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
        password_confirm: "",
    });

    const [LoginCheckMsg, setLoginCheckMsg] = useState({
        msg: "minimum of 8 characters",
        sym: "close",
        col: "red"
    });

    const [registering, setRegistering] = useState(true);
    function handlerInputChanged(e) {
        const cancelToken = axios.CancelToken.source();
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });

        if (name == "username") {
            if (value.length < 7) {
                setLoginCheckMsg({...LoginCheckMsg, 
                    msg: "minimum of 8 characters",
                    sym: "close",
                    col: "#E72929"})
            }
            else {
                setLoginCheckMsg({...LoginCheckMsg, 
                    msg: "checking",
                    sym: "clock_loader_20",
                    col: "#6AD4DD"});
                
                axios({ url: 'http://127.0.0.1:3000/private/username-check',
                        method: 'post',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                        data: { username: value },
                        cancelToken: cancelToken.token,})
                .then((res) => {
                    if (res.data['availability']) {
                        setLoginCheckMsg({...LoginCheckMsg, 
                            msg: value + " is available",
                            sym: "check",
                            col: "#9BCF53"});
                    }
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                    console.log("Request cancelled:", err.message);
                    } else {
                        setLoginCheckMsg({...LoginCheckMsg, 
                            msg: value + " is already used.",
                            sym: "close",
                            col: "#E72929"});
                    }
                });
            }
        }
        if (name=="password") {
            if (registering) {

            }
        }
        return () => {cancelToken.cancel('Request cancelled');};
    }

    function handlerLoginSubmit() {

        
    }

    return (
        <div id="body">
            <div className='main-panel'>
                <div className="logo-div">
                    <img src="/assets/logo.png" alt="" />
                    <p>VarVault Web UI</p>
                </div>
                <p className='login-label txt-md'>Create your VarVault API account</p><br />
                <Input name="username" placeholder="Username" 
                       onChange={e=>{handlerInputChanged(e)}} 
                       checker="http://127.0.0.1:3000/private/username-check" />
                <Checker message={LoginCheckMsg['msg']} symbol={LoginCheckMsg['sym']} color={LoginCheckMsg['col']}></Checker>
                <Input name="password" placeholder="Password" 
                       onChange={e=>handlerInputChanged(e)} type="password" />
                       <br />
                <Input name="password_confirm" placeholder="Confirm Password" 
                       onChange={e=>handlerInputChanged(e)} type="password" />
                       <br />
                <Button className="login" onClick={e=>handlerLoginSubmit(e)} label="Register" />

                <p className="login-label">Already have an account? Login.</p>

                {/* <Button className="register" onClick={e=>handlerLoginSubmit(e)} label="Registration"></Button> */}

            </div>
        </div>
    )
}

export default MainPanel;