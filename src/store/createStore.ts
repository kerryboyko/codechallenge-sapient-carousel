import { createLogger } from "redux-logger";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'; 
import carouselReducer from "./reducers/carousel";
import photosReducer from "./reducers/photos";

const logger = createLogger();
const store = configureStore({
  reducer: {
    photos: photosReducer,
    carousel: carouselReducer
  },
  middleware: getDefaultMiddleware().concat(logger)
})

export default store;