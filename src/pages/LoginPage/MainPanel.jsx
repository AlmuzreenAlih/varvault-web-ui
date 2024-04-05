import { useState, useEffect, useRef } from 'react'
import './MainPanel.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checker from '../../components/Checker/Checker';
import axios from 'axios';
import { config } from 'dotenv';
import Cookies from 'universal-cookie';

function MainPanel() {
  const [registering, setRegistering] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const cancelToken = axios.CancelToken.source();

  const titleMessage = useRef(null);
  const [buttonLabel, setButtonLabel] = useState("Register");
  
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    password_confirm: "",
  });

  const [LoginCheckMsg, setLoginCheckMsg] = useState({
    msg: "",
    sym: ".",
    col: "transparent"
  });

  const [PasswordMatchMsg, setPasswordMatchMsg] = useState({
    msg: "",
    sym: ".",
    col: "transparent"
  })

  useEffect(() => {
    if (!isInitialRender) {
      if ((inputValues.password === inputValues.password_confirm) && (inputValues.password !== "")) {
        setPasswordMatchMsg({
          msg: "Passwords match",
          sym: "check",
          col: "#9BCF53"
        });
      } else {
        setPasswordMatchMsg({
          msg: "Passwords do not match",
          sym: "close",
          col: "red"
        });
      }
    } else {setIsInitialRender(false);}
  }, [inputValues.password, inputValues.password_confirm]);

  function handlerInputChanged(e) {
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
                    col: "#9BCF53"});
            }
        });
      }
    }
    return () => {cancelToken.cancel('Request cancelled');};
  }

  function handlerLoginSubmit() {
    if (registering) {
        axios({ url: 'http://127.0.0.1:3000/private/register',
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                data: { username: inputValues.username, password: inputValues.password },
                cancelToken: cancelToken.token,})
        .then((res) => {
            if (res.data['authenticated']) {
              const cookies = new Cookies();
              cookies.set('TokenSaved', res.data['token'], { path: '/' });
              window.location.replace('/');
            }
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
            console.log("Request cancelled:", err.message);
            } else {
                alert("register wrong2");
            }
        });
    } else {
      axios({ url: 'http://127.0.0.1:3000/private/login',
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
              data: { username: inputValues.username, password: inputValues.password },
              cancelToken: cancelToken.token,})
      .then((res) => {
        console.log(res.data);
        if (res.data['authenticated']) {
          const cookies = new Cookies();
          cookies.set('TokenSaved', res.data['token'], { path: '/' });
          window.location.replace('/');
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          alert("Login wrong2");
        }
      });
    }    
    return () => {cancelToken.cancel('Request cancelled');};
  }

  function handlerRegisterSwitch(e) {
    if (registering) {
      setRegistering(false);
      e.target.innerHTML = "No account? Register."
      titleMessage.current.innerHTML = "Login to your VarVault API Account."
      setButtonLabel("Login");
    }
    else {
      setRegistering(true);
      e.target.innerHTML = "Already have an account? Login."
      titleMessage.current.innerHTML = "Create your VarVault API account."
      setButtonLabel("Register");
    }
  }

  return (
    <div id="body">
      <div className='main-panel'>
        <div className="logo-div">
          <img src="/assets/logo.png" alt="" />
          <p>VarVault Web UI</p>
        </div>
        
        <p ref={titleMessage} className='login-label txt-md'> Create your VarVault API account </p>
        <br />
        
        <Input name="username" hint="Username" 
               onChange={e=>{handlerInputChanged(e)}}/>
        
        <Checker message={LoginCheckMsg['msg']} 
                 symbol={LoginCheckMsg['sym']} 
                 color={LoginCheckMsg['col']}></Checker>
        
        <Input name="password" 
                hint="Password" 
                onChange={e=>handlerInputChanged(e)} 
                type="password" />
                
        <span className='pbrk'></span>
        
        <Input style={!registering ? {visibility: "hidden", position: "absolute"} : null}
                name="password_confirm" 
                hint="Confirm Password" 
                onChange={e=>handlerInputChanged(e)} 
                type="password" />

        <Checker style={!registering ? {visibility: "hidden", position: "absolute"} : null}
                 message={PasswordMatchMsg['msg']} 
                 symbol={PasswordMatchMsg['sym']} 
                 color={PasswordMatchMsg['col']}> </Checker>
        <br />

        <Button className="login" 
                onClick={e=>handlerLoginSubmit(e)} 
                label={buttonLabel} />

        <a className="login-label" onClick={e=>handlerRegisterSwitch(e)}> Already have an account? Login.</a>
      </div>
    </div>
  )
}

export default MainPanel;