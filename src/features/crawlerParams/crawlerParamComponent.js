
import { Autocomplete, Button, Chip, FormControl, InputLabel, TextField, TextareaAutosize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPropertyTypes, removeKey, selectAllPropertyTypes, scraperStop, scrapStart, selectAllLocations, getAllLocationTypes } from '../scraper/scraperSlice';
import OutlinedInput from '@mui/material/OutlinedInput';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';


import './styles.css';


export function CrawlerParamComponent() {


  const propertiesTypes = useSelector(selectAllPropertyTypes);
  const locationsTypes = useSelector(selectAllLocations);
  // const [locationTxt, setLocationTxt] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [minLandSize, setMinLandSize] = useState('');
  const [maxLandSize, setMaxLandSize] = useState('');

  const [selectedTypes, setSelectedTypes] = useState(['All types']);
  

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getAllPropertyTypes());
   
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    let selectedTppes = typeof value === 'string' ? value.split(',') : value;


    
    setSelectedTypes(   selectedTppes   );
  };

  return (
    <div className="crawler_param_component">
      <div className="make_item">
        <div className="make_items">
          <div className="crawler_param_item">
           <div className="property_item">

            <Autocomplete     
              id="controllable-states-demo"
              options={locationsTypes}
              label="Location"
              sx={{ width: 300 }}
              onChange={(event, newValue) => {
                setLocation(newValue)
              }}

              renderInput={(params) => <TextField  onChange={event => dispatch(getAllLocationTypes(event.target.value))}
               {...params} label="Location" />}
            />
            </div>
  
            <div className="property_item">
              <p>Price Range:</p>
                <div className='inputs'>
                <input value={minPrice} 
                placeholder="Min"
                onChange={event => 
                setMinPrice(event.target.value)} 
                type='text' />
                <input 
                value={maxPrice}
                placeholder="Max"
                onChange={event => 
                setMaxPrice(event.target.value)}
                type='text' />
              </div>
            </div>

            <div className="property_item">
              <p>Land Size(m2):</p>
              <div className='inputs'>
                <input value={minLandSize}
                 placeholder="Min"
                 onChange={event => 
                 setMinLandSize(event.target.value)} 
                 type='text' />
                <input value={maxLandSize} 
                placeholder="Max" 
                onChange={event => 
                setMaxLandSize(event.target.value)} 
                type='text' />
              </div>
            </div>

            <div className="property_item">
            <p className="crawler_param_item">Property Types:</p>
            <FormControl sx={{ m: 0, width: 195 }}>
              <InputLabel id="demo-multiple-name-label">All types</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple

                value={selectedTypes}
                onChange={handleChange}
                input={<OutlinedInput label="All types" />}
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
           </div>
          </div>
        </div>

        <div className="crawler_item">
        <div>
          
          </div>
          <div>
            <Button variant="contained" className="add_btn_key" onClick={e => dispatch(scrapStart({ location, minPrice, maxPrice, minLandSize, maxLandSize, selectedTypes }))}>Scrape</Button>
          </div>

          <div>
            <Button variant="contained" className="add_btn_key" onClick={e => dispatch(scraperStop())}>Stop</Button>
          </div>
       
        </div>
      </div>
    </div>
  );
}
