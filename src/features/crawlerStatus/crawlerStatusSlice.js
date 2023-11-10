import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCrawlerStatus } from './crawlerStatusApi';


const initialState = {
 statuses : []
};

export const getCrawlerStatus = createAsyncThunk(
  'crawlerStatus/getValues',
  async ( arg, { getState }) => {
    const response = await fetchCrawlerStatus();
    return response;
  }
);



export const crawlerStatusSlice = createSlice({
  name: 'crawlerStatus',
  initialState,
  reducers: {


  },

  extraReducers: (builder) => {
    builder
      .addCase(getCrawlerStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCrawlerStatus.fulfilled, (state, action) => {
        
        state.statuses  = action.payload;
      })
      ;
  },
});

export const {  changeCalcParams, changeUsdParam,  changeCADParam} = crawlerStatusSlice.actions;

export const selectCrawlerStatuses = (state) => state.crawlerStatusState.statuses;

export default crawlerStatusSlice.reducer;
