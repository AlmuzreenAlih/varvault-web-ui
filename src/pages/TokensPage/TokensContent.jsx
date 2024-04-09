import Cookies from 'universal-cookie';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import TokensCard from './TokensCard';
import TokenRow from './TokenRow';
import DisablerPage from '../common/DisablerPage';
import Pagination from '@mui/material/Pagination';
import Button from '../../components/Button/Button';

function TokensContent(props) {
	const cookies = new Cookies();
	const cancelToken = axios.CancelToken.source();
  const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",];
  
	// COUNTINGS
	const [countings, setCountings] = useState({
    tokens: 0,
	});
	useEffect(() => {
    if (props.cnts) {
      setCountings({ tokens: props.cnts[1],
    })
    }
	}, [props.cnts])
	
	// VARIABLE LIST
	const [tokensList, setTokensList] = useState([]);
	useEffect(() => {
    if (props.tokensList) {
      setTokensList(props.tokensList);
    }
	}, [props.tokensList]); // Update tokenList when props.tokensList changes

  // LOADERS
  const loader_var = useRef(null);

  // Pagination
  function handleChange(e,value) {
    props.setPage(value);
  }

  // 
  function Orderby_Token() {props.setOrder_by("token"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Created() {props.setOrder_by("id"); props.setOrder(!props.order); props.setPage(1);}
  function Orderby_Updated() {props.setOrder_by("updated_at"); props.setOrder(!props.order); props.setPage(1);}

  // CheckBoxes
  function handleCheckBox(e) {
    const { name, checked } = e.target;
    console.log(name,checked)
    if (name==="boxAll") {
      props.setCheckBoxes({
        ...props.CheckBoxes, [name]: checked ,
        box1: checked, box2: checked,
        box3: checked, box4: checked,
        box5: checked, box6: checked,
        box7: checked, box8: checked,
        box9: checked, box10: checked,
    })} else {
      props.setCheckBoxes({ ...props.CheckBoxes, [name]: checked });
    }
  }
  
  return (
    <div className='TokensContentDiv'>
      <TokensCard title="Tokens" className="tokens-card">
        <strong className="title"> Tokens </strong>
        <div className="token-part">
          <div className="token-row header">
            <div className='col1'><input type="checkbox" name="boxAll" checked={props.CheckBoxes["boxAll"]} onChange={handleCheckBox}/></div>
            <div className='col2 span2'  onClick={Orderby_Token}>   Token           {props.order_by==="token"       && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col3'        onClick={Orderby_Updated}> Expiration      {props.order_by==="updated_at"  && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col4'        onClick={Orderby_Created}> Created at      {props.order_by==="id"          && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col5'        onClick={Orderby_Updated}> Last Updated at {props.order_by==="updated_at"  && <i className="material-symbols-outlined">{props.order===true ? <>arrow_upward</> : <>arrow_downward</>}</i>}</div>
            <div className='col6'></div>
          </div>
          
          {tokensList.map((Var, index) => (
              <TokenRow key={index} keyy={index} id={Var.id}
                  token={Var.token} 
                  created_at={Var.created_at} updated_at={Var.updated_at} 
                  
                  bg = {colorArray[index % colorArray.length]}
                  letter = {Var.token.substring(0, 1)}
                  
                  renewToken={props.renewToken}
                  deleteToken={props.deleteToken}
                  
                  CheckBoxes={props.CheckBoxes} setCheckBoxes={props.setCheckBoxes}
                  handleCheckBox={handleCheckBox}
                  />
          ))}
          {/* <div ref={loader_var} style={{visibility: "visible"}} className="loader"><span></span></div> */}
        </div>
        <div className='view-all'>
        <div className="button1">
          <Button onClick={props.deleteSelected} label="Delete Selected"></Button>
          </div>
          <div className="counts">(Displaying {(props.page-1)*10+1} - {props.page*10 < countings.tokens ? props.page*10 : countings.tokens} of {countings.tokens})</div>
          
          <div className="button2">
            <Button onClick={props.addNewToken} label="+ New Token"></Button>
          </div>
        </div>
        <div className="paging">
          <Pagination count={Math.ceil(countings.tokens/10)} 
                        defaultPage={1}
                        page={props.page} onChange={handleChange}
                        color="primary" size="small" 
                        // func={(e,page)=>{console.log(e,page)}}
                        />
        </div>
        
      </TokensCard>
    </div>
  )
}

export default TokensContent;