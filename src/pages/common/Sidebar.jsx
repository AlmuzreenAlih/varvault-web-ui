import { useState, useEffect, useRef } from 'react'
import './Sidebar.scss'
import Button from '../../components/Button/Button';
import Cookies from 'universal-cookie';
import Accordion from '../../components/Accordion/Accordion';
import CredentialChangePanel from '../../components/CredentialChangePanel/CredentialChangePanel';
import PopupMsg from '../../components/PopupMsg/PopupMsg';
import axios from 'axios';

function Sidebar(props) {
  const cookies = new Cookies();
  const cancelToken = axios.CancelToken.source();
  function switchTheme() {
    if (cookies.get('dark-mode')) {
      document.body.classList.remove("dark-theme");
      cookies.set('dark-mode', false, { path: '/' });
    } else {
      document.body.classList.add("dark-theme");
      cookies.set('dark-mode', true, { path: '/' });
    }
  }
  function LogoutFunction() {
    cookies.set('TokenSaved', null, { path: '/' });
    window.location.replace('/');
  }

  const [dialog, setDialog] = useState(false);
  function showChangeUSPanel(e) {
    setChangeMode("us");
    setInputLabels(["New Username","Current Password"]);
    setInputValues({new_value: "", current_password: ""});
    setTimeout(() => {
      setInputValues({new_value: "", current_password: ""});
    }, 1000);
    setDialog("Enter a New Username");
  }
  function showChangePWPanel(e) {
    setChangeMode("pw");
    setInputLabels(["New Password","Current Password"]);
    setInputValues({new_value: "", current_password: ""});
    setDialog("Enter a New Password");
  }

  const [inputValues, setInputValues] = useState({
    new_value: "",
    current_password: ""
  })
  const [changeMode, setChangeMode] = useState(null);
  const [inputLabels, setInputLabels] = useState(["",""])

  function inputHandler(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  function onSubmit() {
    if (changeMode === "us") {
      axios({ url: 'http://127.0.0.1:3000/private/change-username', 
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: { token:cookies.get('TokenSaved'), 
                      new_username: inputValues.new_value, password_input: inputValues.current_password },
              cancelToken: cancelToken.token})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Username Change Successfully");
          setDialog(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
          else {setPopup(err.response.data.error);}
        }
      });
    } else {
      axios({ url: 'http://127.0.0.1:3000/private/change-password', 
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: { token:cookies.get('TokenSaved'), 
                      new_password: inputValues.new_value, password_input: inputValues.current_password },
              cancelToken: cancelToken.token})
      .then((res) => {
        if (res.data['msg'] === "Success") {
          setPopup("Username Change Successfully");
          setDialog(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          if (err.response.status === 401) {setPopup("Unauthorized");}
          else {setPopup(err.response.data.error);}
        }
      });
    }
  }
  const [Expander, setExpander] = useState("keyboard_double_arrow_right");
  const Sidebar = useRef(null)
  function handleExpandClick() {
    Sidebar.current.classList.toggle('left-adjust');
    if (Expander == "keyboard_double_arrow_right") {setExpander("keyboard_double_arrow_left")} else {setExpander("keyboard_double_arrow_right")}
  }
  const [popup, setPopup] = useState(false);
  return (
    <>
      <PopupMsg msg={popup} popup={popup} setPopup={setPopup}/>

      <CredentialChangePanel msg={dialog} dialog={dialog} 
                             setDialog={setDialog} onClose={onSubmit} 
                             inputName1="new_value" inputName2="current_password"
                             inputLabel1={inputLabels[0]} inputLabel2={inputLabels[1]}
                             inputValues={inputValues} setInputValues={setInputValues} inputHandler={inputHandler}
                             changeMode={changeMode} setPopup={setPopup}
                             />
      <div ref={Sidebar} className={'SideBarDiv left-adjust'}>
        <div className='logo-div'>
          <img src="/assets/logo.png" alt="" />
          <p>VarVault Web UI</p>
        </div>

        <a className={props.isOverview ? "selected" : null} href="/"><i className="material-symbols-outlined">grid_view</i>Overview</a>
        <a className={props.isVariables ? "selected" : null} href="/variables"><i className="material-symbols-outlined">format_list_numbered</i>Variables</a>
        <a className={props.isTokens ? "selected" : null} href="/tokens"><i className="material-symbols-outlined">poker_chip</i>Tokens</a>
        <a className={props.isLogs ? "selected" : null} href="/logs"><i className="material-symbols-outlined">breaking_news_alt_1</i>Logs</a>

        <div className="user-settings">     
          <Accordion symbol="settings" title="Settings">
            <a style={{paddingLeft: "20px"}} href="#" onClick={showChangeUSPanel}>
              <i className="material-symbols-outlined">id_card</i>Change Username
            </a>

            <a style={{paddingLeft: "20px"}} href="#" onClick={showChangePWPanel}>
              <i className="material-symbols-outlined">password</i>Change Password
            </a>
            
            <a style={{paddingLeft: "20px"}} href="#" onClick={switchTheme}>
              <i className="material-symbols-outlined">dark_mode</i>Dark Theme
            </a>
          </Accordion>      
                  
          <Button style={{}} 
                  className="logout"
                  onClick={LogoutFunction} 
                  label="Logout" />
        </div>   
      </div>

      <div className='expand-button' onClick={handleExpandClick}>
        <i className="material-symbols-outlined">{Expander}</i> 
      </div>
    </>
  )
}

export default Sidebar;