import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../features/property/propertySlice';


import crawlerParamReducer from '../features/crawlerParams/crawlerParamsSlice';
import crawlerStatusReducer from '../features/crawlerStatus/crawlerStatusSlice';

import scraperReducer from '../features/scraper/scraperSlice'
import { asyncDispatchMiddleware } from './asyncDispatchMiddleware';


export const store = configureStore({
  reducer: {
    propertyState : propertyReducer,
    crawlerParamsState : crawlerParamReducer,
    crawlerStatusState : crawlerStatusReducer,
    scraperState : scraperReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncDispatchMiddleware)
});
