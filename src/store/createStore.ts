import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import * as carousel from "./reducers/carousel";
import * as photos from "./reducers/photos";

import actionTypes from "./reduxTypes";
// import rootReducer from '../reducers/rootReducer';

const middlewares: any[] = [thunk];

// DEV ENVIRONMENT ONLY
middlewares.push(createLogger());

const enhancer = compose(applyMiddleware(...middlewares));
const appReducer = combineReducers({ ...carousel, ...photos });
const rootReducer = (state: any = {}, action: any = {}) => {
  // DEV ENVIRONMENT ONLY
  if (action.type === actionTypes.debug.HYDRATE) {
    return action.payload;
  }
  return appReducer(state, action);
};

export const configureStore = (initialState: any = {}) =>
  createStore(rootReducer, initialState, enhancer);

export default configureStore();
