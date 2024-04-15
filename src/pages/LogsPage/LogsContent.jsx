import Cookies from 'universal-cookie';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import LogsCard from './LogsCard';
// import LogsRow from './LogsRow';
import LogRow from '../Dashboard/Logrow';
import Pagination from '@mui/material/Pagination';
import Button from '../../components/Button/Button';
import { makeStyles } from '@mui/styles';
import {Box} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './LogsPage.scss'

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "var(--color_contrast)"
    }
  }
}));

function LogsContent(props) {
	const cookies = new Cookies();
	const cancelToken = axios.CancelToken.source();
    const classes = useStyles();
    const colorArray = ["#8B93FF","#E9A89B","#D875C7","#90D26D","#FFEBB2",]

    // Pagination
    function handleChange(e,value) {
        props.setPage(value);
    }

    const [date1, setDate1] = useState(dayjs('2023-12-30'));
    const [date2, setDate2] = useState(dayjs());
    
    function inputOnChange(e) {
        const { name, value } = e.target;
        console.log(value)
        setDate1(value);
    }
    useEffect(() => {
      let start = new Date(date1['$y'], date1['$M'], date1['$D']+1);
      start.setUTCHours(0, 0, 0, 0)
      let end = new Date(date2['$y'], date2['$M'], date2['$D']+1);
      end.setUTCHours(23, 59, 59, 999)
      props.setStartDate(start.toISOString());
      props.setEndDate(end.toISOString());
    }, [date1,date2])
    
    return (
        <div className='LogsContentDiv'>
        <LogsCard title="Logs" className="logs-card">
            <strong className="title"> Logs </strong>
            <div className="log-part">          
                {props.logsList.map((Log, index) => (
                    <LogRow key={index} keyy={index} id={Log.id}
                            operation={Log.operation}
                            category={Log.category}
                            created_at={Log.created_at}
                            popup={props.popup} setPopup={props.setPopup}
                        />
                ))}
            </div>
            <div className='view-all'>
                <div className="counts">(Displaying {(props.page-1)*10+1} - {props.page*10 < props.cnts.logs ? props.page*10 : props.cnts.logs} of {props.cnts.logs})</div>
            </div>

            <div className="paging">
            <Pagination count={Math.ceil(props.cnts.logs/10)} 
                        defaultPage={1}
                        page={props.page} onChange={handleChange}
                        color="primary" size="small" 
                        classes={{ ul: classes.ul }}
                            />
            </div>
        </LogsCard>
        <Box className="date" >
            {/* <div className='title'>Start:</div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar name="date1" value={date1} onChange={(newValue)=>{setDate1(newValue)}}/>
            </LocalizationProvider>
            <ArrowCircleDownIcon className='arrow' sx={{color:"white"}}></ArrowCircleDownIcon>
        </Box>
        <Box className="date" >
            {/* <div className='title'>To:</div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar name="date2" value={date2} onChange={(newValue)=>{setDate2(newValue)}}/>
            </LocalizationProvider>
        </Box>

        </div>
    )
}

export default LogsContent;