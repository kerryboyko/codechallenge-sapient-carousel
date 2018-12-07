import actionTypes from "../reduxTypes";
import { ICarouselReduxAction, IPixabayImage } from "./types";
import { get } from "lodash";
import { Dispatch } from "redux";

export const setPage = (num: number): ICarouselReduxAction => ({
  type: actionTypes.carousel.SET_PAGE,
  payload: num
});
/* The pattern here is most often used in asynchronous actions, but
   can work anytime you need to access the state before making a 
   decision. In this case, we want to ensure that the selected carousel is
   inbounds for the existing results */
export const pageTo = (addToPage: number) => (
  dispatch: Dispatch,
  getState: any
) => {
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
