import * as carouselActions from "./carousel";

describe("./src/store/actions/carousel.ts", () => {
  describe("Action creators for Carousel", () => {
    it('sets the page', () => {
      expect(carouselActions.setPage(3)).toEqual({
        type: "carousel.SET_PAGE",
        payload: 3
      })
    })
    /* Other actions will be tested in context with the reducers */
  });
});
