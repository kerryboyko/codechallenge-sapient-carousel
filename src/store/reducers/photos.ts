import Api from "../../ajax/api";
import {createSlice} from '@reduxjs/toolkit';
import get from 'lodash/get'; 
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
const api = new Api(); 

const photosSlice = createSlice({
  name: 'photos', 
  initialState: {
    photos: initializeState(),
    photoCache: {},
    isLoading: false,
  }, 
  reducers: {
    loadPhotos(state, action){
      state.photos = action.payload;
      state.photoCache[action.payload.query] = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action){
      state.isLoading = action.payload;
    }
  }
})

export const {actions, reducer} = photosSlice; 

export const getPhotos = (query: string) => async (dispatch: any, getState: any) => {
  const formattedQuery: string = query.trim().replace(/\s+/g, "+");
  const state = getState();
  console.log(state);
  const photoCache = state.photos.photoCache
  const now = Date.now();
  if (
    photoCache[formattedQuery] &&
    (now - photoCache[formattedQuery].cachedAt) / 36e5 < 24
  ) {
    if (get(process, "env.NODE_ENV", "development") === "development") {
      console.info(`Cache Hit for ${formattedQuery}`);
    }
    return dispatch(actions.loadPhotos(photoCache[formattedQuery]));
  }
  console.info(`No cache hit, grabing from server`);
  try {
    dispatch(actions.setLoading(true))
    const response = await api.getImages(formattedQuery);
    const {body} = response;
    dispatch(actions.loadPhotos({cachedAt: now, query: formattedQuery, ...body}))
  } catch (err){
    dispatch(actions.setLoading(false))
    console.error(err);
  }
 }

export default reducer;