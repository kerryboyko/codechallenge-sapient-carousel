import { IReduxAction, ISearchResult } from "./types";
import actionTypes from "../reduxTypes";
import Api from "../../ajax/api";
import { Dispatch } from "redux";
import { get } from "lodash";

const api = new Api();

export const loadPhotos = (payload: any): IReduxAction => ({
  type: actionTypes.photos.LOAD_PHOTOS,
  payload
});

export const clearPhotos = (): IReduxAction => ({
  type: actionTypes.photos.CLEAR_PHOTOS
});

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
  return api.getImages(formattedQuery).then((response: any) => {
    const body: ISearchResult = response.body;
    dispatch(loadPhotos({ cachedAt: now, query: formattedQuery, ...body }));
  });
};
