import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  paramData : {

     
    makes: [

    ]

  },
  makeValues : [],
};

export const crawlerParamsSlice = createSlice({
  name: 'crawlerParams',
  initialState,
  reducers: {
  },
});

export const {  changePostalCode, changeDistanceKm , changeMinYear, changeMaxYear, changeMinMileageKm, changeMaxMileageKm, addNewMake, removeMake
  } = crawlerParamsSlice.actions;

export const selectCrawlerParams = (state) => state.crawlerParamsState.paramData;
export const selectMakeValues = (state) => state.crawlerParamsState.makeValues;


export default crawlerParamsSlice.reducer;
