import { IReduxAction } from "../actions/types";
import actionTypes from "../reduxTypes";

export interface IPhotosState {
  query: string;
  totalHits: number;
  hits: any[];
  total: number;
}

const initializeState = (): IPhotosState => ({
  query: "",
  totalHits: 0,
  hits: [],
  total: 0
});

export const photos = (
  state: IPhotosState = initializeState(),
  action: IReduxAction = { type: "" }
): any => {
  switch (action.type) {
    case actionTypes.photos.LOAD_PHOTOS:
      return action.payload;
    default:
      return state;
  }
};

export const photoCache = (
  state: { [key: string]: IPhotosState } = {},
  action: IReduxAction = { type: "" }
) => {
  switch (action.type) {
    case actionTypes.photos.LOAD_PHOTOS:
      return { ...state, [action.payload.query]: action.payload };
    default:
      return state;
  }
};

export const loading = (state = false, action: IReduxAction = { type: "" }) => {
  switch (action.type) {
    case actionTypes.photos.LOADING:
      return action.payload;
    case actionTypes.photos.LOAD_PHOTOS:
      return false;
    default:
      return state;
  }
};

export const currentQuery = (state = false, action: IReduxAction = { type: "" }) => {
  switch (action.type) {
    case actionTypes.photos.LOADING:
      return action.payload;
    case actionTypes.photos.LOAD_PHOTOS:
      return false;
    default:
      return state;
  }
};
