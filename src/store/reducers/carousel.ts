import actionTypes from "../reduxTypes";
import { ICarouselReduxAction } from "../actions/types";

export const carousel = (
  state: number = 0,
  action: ICarouselReduxAction = { type: "" }
): number => {
  switch (action.type) {
    case actionTypes.carousel.SET_PAGE:
      if(action.payload !== undefined){
        return action.payload;
      }
      return state; 
    default:
      return state;
  }
};
