import { carousel } from "./carousel";
import store from "../createStore";
import * as carouselActions from "../actions/carousel";
import actionTypes from "../reduxTypes";

describe("./src/reducers/carousel.ts", () => {
  describe("Carousel Reducer", () => {
    it("returns the state on default", () => {
      expect(carousel(undefined)).toBe(0);
      expect(carousel(1)).toBe(1);
    });
  });
  describe("integration tests", () => {
    // initialize state;
    store.dispatch({
      type: actionTypes.debug.HYDRATE,
      payload: {
        carousel: 0,
        photos: {
          query: "transistor",
          totalHits: 29,
          hits: [
            {
              largeImageURL: "A1",
              pageURL: "A1",
              previewURL: "A1"
            },
            {
              largeImageURL: "B2",
              pageURL: "B2",
              previewURL: "B2"
            },
            {
              largeImageURL: "C3",
              pageURL: "C3",
              previewURL: "C3"
            },
            {
              largeImageURL: "D4",
              pageURL: "D4",
              previewURL: "D4"
            },
            {
              largeImageURL: "E5",
              pageURL: "E5",
              previewURL: "E5"
            },
            {
              largeImageURL: "F6",
              pageURL: "F6",
              previewURL: "F6"
            },
            {
              largeImageURL: "G7",
              pageURL: "G7",
              previewURL: "G7"
            }
          ],
          total: 29
        }
      }
    });
    const c = () => store.getState().carousel;
    it("increments the number properly", () => {
      // .forEach() would be the natural case for this, but
      // copy/paste is okay in a test suite.  
      expect(c()).toBe(0);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(1);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(2);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(3);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(4);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(5);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(6);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(0);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(1);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(2);
      store.dispatch(carouselActions.pageNext());
      expect(c()).toBe(3);
    });
    it("decrements the number properly", () => {
      expect(c()).toBe(3);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(2);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(1);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(0);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(6);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(5);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(4);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(3);
      store.dispatch(carouselActions.pagePrev());
      expect(c()).toBe(2);
      store.dispatch(carouselActions.pagePrev());
    });
  });
});
