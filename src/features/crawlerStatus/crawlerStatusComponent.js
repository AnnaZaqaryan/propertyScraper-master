
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCrawlerStatus, selectCrawlerStatuses } from './crawlerStatusSlice';
import './styles.css';

export function CrawlerStatusComponent() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCrawlerStatus())
  }, []);


  function updateStatus() {
    dispatch(getCrawlerStatus())
  }

  const statuses = useSelector(selectCrawlerStatuses);
  
  return (
    <div>
      {
        statuses.map((e, index) => (
          <div key={index} className="crawler_status_item">
            <p>{e.type} </p>
            <p>{e.status}</p>
            <p>{e.lastUpd}</p>
          </div>
        ))
      }
       <div className="btn">
       <Button  variant="outlined" onClick={updateStatus}> Scraping Status </Button>
       </div>
    </div>
  )
}