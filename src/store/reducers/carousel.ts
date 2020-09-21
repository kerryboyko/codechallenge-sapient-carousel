import {createSlice} from '@reduxjs/toolkit';
import get from 'lodash/get'; 

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    page: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: {
    ['photos/loadPhotos']: (state) => {
      state.page = 0; 
    }
  }
})

export const {actions, reducer} = carouselSlice;

const pageTo = (addToPage: number) => (dispatch: any, getState: any) => {
  const currentState = getState();
  const currentPage = currentState.carousel.page;
  const hits: any[] = get(currentState, "photos.photos.hits", []);
  const length: number = hits.length; 
  if (length === 0) {
    return dispatch(actions.setPage(0));
  }
  return dispatch(actions.setPage((currentPage + addToPage + length) % length));
};
export const pagePrev = () => pageTo(-1);
export const pageNext = () => pageTo(1);

export default reducer; 