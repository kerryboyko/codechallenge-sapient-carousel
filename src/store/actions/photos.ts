import { IReduxAction, ISearchResult } from "./types";
import actionTypes from "../reduxTypes";
import Api from "../../ajax/api";
import { Dispatch } from "redux";
import * as get from "lodash.get";

// might want to use dependency injection instead of
// creating the instance of the Api class here for testing
const api = new Api();

export const setLoading = (payload: boolean): IReduxAction => ({
  type: actionTypes.photos.LOADING,
  payload
});

export const loadPhotos = (payload: any): IReduxAction => ({
  type: actionTypes.photos.LOAD_PHOTOS,
  payload
});

/* This function might do too much.  Refactor? */
export const getPhotos = (query: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const formattedQuery: string = query.trim().replace(/\s+/g, "+");
  const { photoCache } = getState();
  const now: number = Date.now();
  if (
    photoCache[formattedQuery] &&
    (now - photoCache[formattedQuery].cachedAt) / 36e5 < 24
  ) {
    if (get(process, "env.NODE_ENV", "development") === "development") {
      console.info(`Cache Hit for ${formattedQuery}`);
    }
    return dispatch(loadPhotos(photoCache[formattedQuery]));
  }
  dispatch(setLoading(true));
  return api
    .getImages(formattedQuery)
    .then((response: any) => {
      const body: ISearchResult = response.body;
      dispatch(loadPhotos({ cachedAt: now, query: formattedQuery, ...body }));
    })
    .catch(e => {
      // perhaps there should be an alert displayed to a user instead of
      // logging to the console.
      dispatch(setLoading(false));
      console.error(e);
    });
};
