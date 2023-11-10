
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeSort, changeState, changeSuburb, exportData, getAllProperties, selectPropertyPage, selectFilterParam, getAllPropertyTypesFilter, selectAllPropertyTypesFilter, changeType, fetchAllPropertyTypeScrapeHistory, changeHistory, selectAllPropertyTypeScrapeHistory } from './propertySlice';

import { DataGrid } from '@mui/x-data-grid';

import { Button, Grid, Tooltip } from '@mui/material';

import { CrawlerParamComponent } from '../crawlerParams/crawlerParamComponent';

import { CrawlerStatusComponent } from '../crawlerStatus/crawlerStatusComponent';

import { getAllPropertyTypes } from '../scraper/scraperSlice';
import OutlinedInput from '@mui/material/OutlinedInput';

import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import './styles.css';


export function CarComponent() {

  const page = useSelector(selectPropertyPage);
  const filterParams = useSelector(selectFilterParam);
  const propertiesTypes = useSelector(selectAllPropertyTypesFilter);
  const srapeHistorys = useSelector(selectAllPropertyTypeScrapeHistory);

  const [selectedTypes, setSelectedTypes] = useState(['All types']);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties())
    dispatch(getAllPropertyTypes())
    dispatch(getAllPropertyTypesFilter())
    dispatch(fetchAllPropertyTypeScrapeHistory())
  }, []);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    let selectedTppes = typeof value === 'string' ? value.split(',') : value;


    dispatch(changeType(selectedTppes))
  };

  const columns = [
    {
      field: 'first',
      headerAlign: 'center',
      field: 'address', headerName: 'Address', width: 200,
      renderCell: (params) => (
          <a href={params.row.propertyUrl} target='_blank' className="table-cell-trucate">{params.row.address}</a>
      ),
    },
    {
      headerAlign: 'center', field: 'suburb', headerName: 'Suburb', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.suburb} >
          <span className="table-cell-trucate">{params.row.suburb}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'state', headerName: 'State', width: 100,
      renderCell: (params) => (
        <span className="table-cell-trucate">{params.row.state}</span>
      ),
    },
    {
      headerAlign: 'center', field: 'postcode', headerName: 'Postcode', width: 100,
      renderCell: (params) => (
        <span className="table-cell-trucate">{params.row.postcode}</span>
      ),
    },
    {
      headerAlign: 'center', field: 'propertyType', headerName: 'Property Type', width: 120,
      renderCell: (params) => (
        <span className="table-cell-trucate">{params.row.propertyType}</span>
      ),
    },
    {
      headerAlign: 'center', field: 'price', headerName: 'Price', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.price} >
          <span className="table-cell-trucate">{params.row.price}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'lowestPrice', headerName: 'Lowest Price', width: 100,
      renderCell: (params) => (
                <a href={params.row.lowestUrl} target='_blank' className="table-cell-trucate">{params.row.lowestPrice}</a>
      ),
    },
    {
      headerAlign: 'center', field: 'highestPrice', headerName: ' Highest Price', width: 150,
      renderCell: (params) => (
           <a href={params.row.highestUrl} target='_blank' className="table-cell-trucate">{params.row.highestPrice}</a>
      ),
    },

    {
      headerAlign: 'center', field: 'highestLandSize', headerName: 'Highest Land Size', width: 140,
      renderCell: (params) => (
      <Tooltip title={params.row.highestLandSize}>
           <span  className="table-cell-trucate">{params.row.highestLandSize}</span>
       </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'priceDevLandSize', headerName: 'Price/Land Size', width: 130,
      renderCell: (params) => (
      <Tooltip title={params.row.priceDevLandSize}>
           <span  className="table-cell-trucate">{params.row.priceDevLandSize}</span>
       </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'highDevPrice', headerName: 'Highest Price/Price', width: 140,
      renderCell: (params) => (
      <Tooltip title={params.row.highDevPrice}>
           <span  className="table-cell-trucate">{params.row.highDevPrice}</span>
       </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'highPriceDevLandSize', headerName: 'H. Price/H. Land Size', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.highPriceDevLandSize} >
          <span className="table-cell-trucate">{params.row.highPriceDevLandSize}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'landSize', headerName: 'Land Size', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.landSize} >
          <span className="table-cell-trucate">{params.row.landSize}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'bedrooms', headerName: 'Bedrooms', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.bedrooms} >
          <span className="table-cell-trucate">{params.row.bedrooms}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'bathrooms', headerName: 'Bathrooms', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.bathrooms} >
          <span className="table-cell-trucate">{params.row.bathrooms}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'parkingSpaces', headerName: 'Parkings', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.parkingSpaces} >
          <span className="table-cell-trucate">{params.row.parkingSpaces}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'buildCost', headerName: 'Build Cost', width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.buildCost}>
          <span className="table-cell-trucate">{params.row.buildCost}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'totalOutlay', headerName: 'Total Outlay', width: 130,
      renderCell: (params) => (
        <Tooltip title={params.row.totalOutlay}>
          <span className="table-cell-trucate">{params.row.totalOutlay}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'highPriceDevOutlay', headerName: 'H. Price/Total Outlay', width: 100,
      renderCell: (params) => (
        <Tooltip title={params.row.highPriceDevOutlay}>
          <span className="table-cell-trucate">{params.row.highPriceDevOutlay}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'highPriceWithSameBedroom', headerName: 'H. Price With S. Bedroom', width: 100,
      renderCell: (params) => (
        <Tooltip title={params.row.highPriceWithSameBedroom}>
          <span className="table-cell-trucate">{params.row.highPriceWithSameBedroom}</span>
        </Tooltip>
      ),
    },
    {
      headerAlign: 'center', field: 'updatedAt', headerName: 'Updated', width: 210,
      renderCell: (params) => (
        <Tooltip title={params.row.updatedAt}>
          <span className="table-cell-trucate">{params.row.updatedAt}</span>
        </Tooltip>
      ),
    }
  ];

  const rows = page.properties;

  return (
    <>
      <Grid container spacing={2} className="container">
        <Grid item xs={6} md={6} xl={6}>
          <CrawlerParamComponent />
        </Grid>
        <Grid item xs={6} md={6} xl={6}>
          <CrawlerStatusComponent />
        </Grid>
      </Grid>

      <div style={{ height: 700, width: '100%', maxWidth: '100%', fontSize: '18px' }}>
        <div className='car_component'>
        <div className='propertyType'>
            <p className="crawler_param_item">Scrape History</p>
            <FormControl sx={{ m: 0, width: 195 }}>
              <InputLabel id="demo-simple-select-error-label">Scrape History</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterParams.history}
              label="Scrape History"
              onChange={event => dispatch(changeHistory(event.target.value))}
            >
              {srapeHistorys.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                   >
                    {name}
                  </MenuItem>
                ))}
            </Select>
            </FormControl>
            
        </div>
          <div className='propertyType'>
            <p className="crawler_param_item">Property Types:</p>
            <FormControl sx={{ m: 0, width: 195 }}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={filterParams.types}
              label="Age"
              onChange={handleChange}
            >
              {propertiesTypes.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                   >
                    {name}
                  </MenuItem>
                ))}
            </Select>
              </FormControl>
            
            </FormControl>
        </div>
          <div className="car_component_item">
            Suburb 
            <input className="inputSuburb" value={filterParams.suburb} onChange={event => dispatch(changeSuburb(event.target.value))} type='text' />

            State
            <input className="inputState" value={filterParams.state} onChange={event => dispatch(changeState(event.target.value))} type='text' />
          </div>
        <div className="exportBtn">
            {/* <Button variant="outlined" color="error" onClick={handDelete}>Delete</Button> */}
            <Button variant="contained" className="add_btn" onClick={e => dispatch(exportData())}>Export</Button>
          </div>
      </div>
        
        <DataGrid
          rows={rows}
          rowCount={page.total}
          page={filterParams.currentPage}
          columns={columns}
          pageSize={10}
          paginationMode="server"
          pagination
          onPageChange={(newPage) => dispatch(changePage(newPage))}

          onSortModelChange={(model) => {
            const s = {
              field: model[0].field,
              dir: model[0].sort
            };
            dispatch(changeSort(s));
          }}
        />
      </div>
    </>
  );
}
