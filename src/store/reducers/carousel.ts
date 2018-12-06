import { get } from "lodash";
import { IReduxAction } from "../actions/types";
import actionTypes from "../reduxTypes";

export const carousel = (
  state: number = 0,
  action: IReduxAction = { type: "" }
): number => {
  switch (action.type) {
    case actionTypes.carousel.LEFT:
      return state - 1;
    case actionTypes.carousel.RIGHT:
      if (get(action, "payload.max", false)) {
        return Math.min(state + 1, action.payload.max);
      }
      return state + 1;
    default:
      return state;
  }
};
