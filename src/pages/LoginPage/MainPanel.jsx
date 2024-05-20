import { useState, useEffect, useRef } from 'react'
import './MainPanel.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checker from '../../components/Checker/Checker';
import axios from 'axios';
import { config } from 'dotenv';
import Cookies from 'universal-cookie';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import Loader from '../../components/Loader/Loader';

function MainPanel() {
  const [registering, setRegistering] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const cancelToken = axios.CancelToken.source();

  const titleMessage = useRef(null);
  const [buttonLabel, setButtonLabel] = useState("Register");

  const timer1 = useRef(null);
  
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

  function loginCheck() {
    if (!(inputValues.username) || !(inputValues.password)) {return "Please, fill out all fields."; }
    return true;
  }

  const [usernameAvailability, setUsernameAvailability] = useState(false);
  function registerCheck() {
    if (!(inputValues.username) || !(inputValues.password) || !(inputValues.password_confirm)) {
      return "Please, fill out all fields."; 
    }
    if (inputValues.username.length < 7) {return "Username should be minimum of 8 characters"}
    if (inputValues.password.length < 7) {return "Passwordqwwwwww should be minimum of 8 characters"}
    if (inputValues.password !== inputValues.password_confirm) {return "Passwords do not match."}
    if (usernameAvailability === false) {return "Username is already used"}
    return true;
  }

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
        
        clearTimeout(timer1.current);
        // console.log("edited")
        timer1.current = setTimeout(() => {
          // console.log("checked")
          axios({ url: process.env.HOST_ADDRESS+'/private/username-check',
                  method: 'post',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                  data: { username: value },
                  cancelToken: cancelToken.token,})
          .then((res) => {
            setUsernameAvailability(true);
            if (res.data['availability']) {
                setLoginCheckMsg({...LoginCheckMsg, 
                    msg: value + " is available",
                    sym: "check",
                    col: "#9BCF53"});
            }
          })
          .catch((err) => {
            setUsernameAvailability(false);
            if (axios.isCancel(err)) {
            console.log("Request cancelled:", err.message);
            } else {
                setLoginCheckMsg({...LoginCheckMsg, 
                    msg: value + " is already used.",
                    sym: "close",
                    col: "#E72929"});
            }
          });
        }, 2000);
          
      }
    }
    return () => {cancelToken.cancel('Request cancelled');};
  }

  function handlerLoginSubmit(e) {
    e.preventDefault();
    if (registering) {
      if (!(registerCheck() === true)) {setPopup(registerCheck()); return;}
      setLoader_z_index(90);
      axios({ url: process.env.HOST_ADDRESS+'/private/register',
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
                setPopup(setPopup("Registering went wrong."));
            }
        })
        .finally(()=>{setLoader_z_index(-1500)});
    } else {
      if (!(loginCheck() === true)) {setPopup(loginCheck()); return;}
      setLoader_z_index(90);
      axios({ url: process.env.HOST_ADDRESS+'/private/login',
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
        console.log(err);
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          setPopup('Wrong username/password');
        }
      })
      .finally(()=>{setLoader_z_index(-1500)});
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

  const [popup, setPopup] = useState(false);
  const [Loader_z_index, setLoader_z_index] = useState(-1500);

  return (
    <div id="body">
      <Loader z_index={Loader_z_index}/>

      <PopupMsg msg={popup} popup={popup} setPopup={setPopup} centered={true}/>
      <form className='main-panel' autoComplete='nope' method='post'>
        <div className="logo-div">
          <img src="/assets/logo2.png?x=1s" alt="" />
          <p>VarVault Web UI</p>
        </div>
        
        <p ref={titleMessage} className='login-label txt-md'> Create your VarVault API account </p>
        <span className='pbrk'></span>
        
        <Input name="username" hint="Username" 
               onChange={e=>{handlerInputChanged(e)}}
               autoComplete="123456" required/>
        
        {registering ? 
          <Checker message={LoginCheckMsg['msg']} 
                  symbol={LoginCheckMsg['sym']} 
                  color={LoginCheckMsg['col']}></Checker> :
          <span className='pbrk'></span>
        }
        
        <Input name="password" 
                hint="Password" 
                onChange={e=>handlerInputChanged(e)} 
                type="password" 
                autoComplete="1234567" required/>
                
        <span className='pbrk'></span>
        
        {registering && (
          <>
            <Input name="password_confirm" 
                   hint="Confirm Password" 
                   onChange={e=>handlerInputChanged(e)} 
                   type="password" 
                   autoComplete="12345678"/>

            <Checker message={PasswordMatchMsg['msg']} 
                     symbol={PasswordMatchMsg['sym']} 
                     color={PasswordMatchMsg['col']} /> 
            <br />
          </>
        )}

        <Button className="login" 
                onClick={handlerLoginSubmit} 
                label={buttonLabel} />

        <a className="login-label" onClick={e=>handlerRegisterSwitch(e)}> Already have an account? Login.</a>
        {/* <p className='footer1'>© 2024 Almuzreen Alih</p> */}
        
      </form>
      <p className='footer'>© 2024 Almuzreen Alih</p>

    </div>
  )
}

export default MainPanel;