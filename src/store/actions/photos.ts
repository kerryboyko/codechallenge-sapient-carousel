import { IReduxAction, ISearchResult } from "./types";
import actionTypes from "../reduxTypes";
import Api from "../../ajax/api";
import { Dispatch } from "redux";

const api = new Api();

export const loadPhotos = (payload: any): IReduxAction => ({
  type: actionTypes.photos.LOAD_PHOTOS,
  payload
});

export const clearPhotos = (): IReduxAction => ({
  type: actionTypes.photos.CLEAR_PHOTOS
});

export const getPhotos = (query: string) => (dispatch: Dispatch) =>
  api.getImages(query.trim().replace(/\s+/g, "+"))
    .then((response: any) => {
    const body: ISearchResult = response.body;
    dispatch(loadPhotos({ query, ...body }));
  });
