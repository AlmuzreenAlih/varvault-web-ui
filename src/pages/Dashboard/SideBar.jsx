import './Dashboard.scss'
import Button from '../../components/Button/Button';
import Cookies from 'universal-cookie';

function SideBar(props) {
    const cookies = new Cookies();
    function LogoutFunction() {
        cookies.set('TokenSaved', null, { path: '/' });
        window.location.replace('/');
    }

    return (
        <div className='SideBarDiv'>
            
                <div className='logo-div'>
                    <img src="/assets/logo.png" alt="" />
                    <p>VarVault Web UI</p>
                </div>

                <a className={props.isOverview ? "selected" : null} href=""><i className="material-symbols-outlined">grid_view</i>Overview</a>
                <a className={props.isVariables ? "selected" : null} href=""><i className="material-symbols-outlined">format_list_numbered</i>Variables</a>
                <a className={props.isTokens ? "selected" : null} href=""><i className="material-symbols-outlined">poker_chip</i>Tokens</a>
                <a className={props.isLogs ? "selected" : null} href=""><i className="material-symbols-outlined">breaking_news_alt_1</i>Logs</a>
                <Button className="logout"
                onClick={LogoutFunction} 
                label="Logout" />
        </div>
    )
}

export default SideBar;