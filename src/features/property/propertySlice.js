import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {  exportDataApi, fetchAllPropertyTypeScrapeHistoryApi, fetchAllPropertyTypesFilterApi, fethAllPropertiesApi } from './propertyApi';



const initialState = {
  page : {
    properties :[],
    total : 0
  },

  filterParams : {
    currentPage : 0,
    suburb: '',
    state : '',
    types : ['All types'],
    history: '',

    sort : {
      field : "id",
      dir : "desc"
    },
    
  },

  carIdsToDelate : [],
  allMakeValues : [],
  allCountryValues : [],
  propertyTypes : [],
  srapeHistory : []
};


export const fetchAllPropertyTypeScrapeHistory = createAsyncThunk(
  'key/fetchAllPropertyTypeScrapeHistory',
  async ( arg, { getState }) => {
    const state = getState();
    const response = await fetchAllPropertyTypeScrapeHistoryApi();
    return response;
  }
);


export const getAllPropertyTypesFilter = createAsyncThunk(
  'key/getAllPropertyTypesFilter',
  async ( arg, { getState }) => {
    const state = getState();
    const response = await fetchAllPropertyTypesFilterApi();
    return response;
  }
);



export const exportData = createAsyncThunk(
  'car/exportData',
  async (arg, { getState }) => {
    const state = getState();
    const response = await exportDataApi(state.propertyState.filterParams)
    return response;
  }
);


export const getAllProperties = createAsyncThunk(
  'car/getCars',
  async ( arg, { getState }) => {
    const state = getState();
    const response = await fethAllPropertiesApi(state.propertyState.filterParams)
    
    return response;
  }
);



export const propertySlice = createSlice({
  name: 'car',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    changePage: (state, action ) => {
      
      state.filterParams.currentPage  = action.payload;
      
      action.asyncDispatch(getAllProperties());
    },


    changeSuburb : (state, action) => {
      state.filterParams.suburb  = action.payload;
      action.asyncDispatch(getAllProperties());
    },

    changeState : (state, action) => {
      state.filterParams.state  = action.payload;
      action.asyncDispatch(getAllProperties());
    },
    changeType : (state, action) => {
      state.filterParams.types  = action.payload;
      action.asyncDispatch(getAllProperties());
    },
    changeHistory : (state, action) => {
      state.filterParams.history   = action.payload;
      action.asyncDispatch(getAllProperties());
    },
    changeSort : (state, action) => {
      state.filterParams.sort  = action.payload;
      action.asyncDispatch(getAllProperties());
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
       
        
        state.page  = action.payload;
      })

      .addCase(getAllPropertyTypesFilter.fulfilled, (state, action) => {
        
        state.propertyTypes  = action.payload;
      })

      .addCase(fetchAllPropertyTypeScrapeHistory.fulfilled, (state, action) => {
        
        state.srapeHistory  = action.payload;
      })
  },
});

export const { changePage,  changeSort , changeSuburb, changeType, changeHistory, changeState  } = propertySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPropertyPage = (state) => state.propertyState.page;
export const selectFilterParam = (state) => state.propertyState.filterParams;
export const selectAllMakeFilterValues = (state) => state.propertyState.allMakeValues;
export const selectAllCountryValues = (state) => state.propertyState.allCountryValues;
export const selectAllPropertyTypesFilter = (state) => state.propertyState.propertyTypes;
export const selectAllPropertyTypeScrapeHistory = (state) => state.propertyState.srapeHistory;



export default propertySlice.reducer;
