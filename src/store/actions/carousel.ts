import actionTypes from "../reduxTypes";
import { IReduxAction } from "./types";

export const pageLeft = (): IReduxAction => ({
  type: actionTypes.carousel.LEFT
});

export const pageRight = (max?: number): IReduxAction => ({
  payload: { max },
  type: actionTypes.carousel.RIGHT
});
