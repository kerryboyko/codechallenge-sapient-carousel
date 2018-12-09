import actionTypes from "../reduxTypes";
import { ICarouselReduxAction, IPixabayImage } from "./types";
import { get } from "lodash";
import { Dispatch } from "redux";

export const setPage = (num: number): ICarouselReduxAction => ({
  type: actionTypes.carousel.SET_PAGE,
  payload: num
});
const pageTo = (addToPage: number) => (dispatch: Dispatch, getState: any) => {
  const currentState = getState();
  const currentPage = currentState.carousel;
  const hits: IPixabayImage[] = get(currentState, "photos.hits", []);
  const length: number = hits.length; 
  if (length === 0) {
    return dispatch(setPage(0));
  }
  return dispatch(setPage((currentPage + addToPage + length) % length));
};

export const pagePrev = () => pageTo(-1);
export const pageNext = () => pageTo(1);
