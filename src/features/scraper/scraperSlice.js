import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCrawlerStatus } from '../crawlerStatus/crawlerStatusSlice';
import { fetchAllLocaltionTypesApi, fetchAllPropertyTypesApi, scrapStartApi, scraperStopApi } from './scraperApi';


const initialState = {
 propertyTypes : [],
 locations: []
};

export const getAllPropertyTypes = createAsyncThunk(
  'key/getValues',
  async ( arg, { getState }) => {
    const response = await fetchAllPropertyTypesApi();
    return response;
  }
);

export const getAllLocationTypes = createAsyncThunk(
  'key/getLocationValues',
  async ( arg, { getState }) => {
    console.log(JSON.stringify(arg))
    const response = await fetchAllLocaltionTypesApi(arg);
    return response;
  }
);




export const scrapStart = createAsyncThunk(
  'scraper/scrapStart',
  async ( arg,  { getState, dispatch }) => {
    const response = await scrapStartApi(arg);
    dispatch(getCrawlerStatus())
    
    return response;
  }
);


export const scraperStop = createAsyncThunk(
  'scraper/stop',
  async ( arg, { getState, dispatch }) => {
   
    const response = await scraperStopApi();
    
    return response;
  }
);

// export const scraperSearch = createAsyncThunk(
//   'scraper/search',
//   async ( arg, { getState, dispatch }) => {
   
//     const response = await scraperStopApi();
    
//     return response;
//   }
// );





export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {


  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPropertyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPropertyTypes.fulfilled, (state, action) => {
        
        state.propertyTypes  = action.payload;
      })

      .addCase(getAllLocationTypes.fulfilled, (state, action) => {
        
        state.locations  = action.payload;
      })


      ;
  },
});



export const selectAllPropertyTypes = (state) => state.scraperState.propertyTypes;
export const selectAllLocations = (state) => state.scraperState.locations;

export default scraperSlice.reducer;
