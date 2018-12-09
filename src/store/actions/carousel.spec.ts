import * as carouselActions from "./carousel";

const mockDispatch = jest.fn();
const mockGetStateNext1 = jest.fn(() => ({
  carousel: 4,
  photos: { hits: [0, 1, 2, 3, 4, 5, 6, 7] }
}));
const mockGetStateNext2 = jest.fn(() => ({
  carousel: 7,
  photos: { hits: [0, 1, 2, 3, 4, 5, 6, 7] }
}));
const mockGetStatePrev1 = jest.fn(() => ({
  carousel: 4,
  photos: { hits: [0, 1, 2, 3, 4, 5, 6, 7] }
}));
const mockGetStatePrev2 = jest.fn(() => ({
  carousel: 0,
  photos: { hits: [0, 1, 2, 3, 4, 5, 6, 7] }
}));

describe("./src/store/actions/carousel.ts", () => {
  describe("Action creators for Carousel", () => {
    it("sets the page", () => {
      expect(carouselActions.setPage(3)).toEqual({
        type: "carousel.SET_PAGE",
        payload: 3
      });
    });
    it("pages forward and loops", () => {
      carouselActions.pageNext()(mockDispatch, mockGetStateNext1);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: "carousel.SET_PAGE",
        payload: 5
      });
      carouselActions.pageNext()(mockDispatch, mockGetStateNext2);
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: "carousel.SET_PAGE",
        payload: 0
      });
    });
    it("pages backwards and loops", () => {
      carouselActions.pagePrev()(mockDispatch, mockGetStatePrev1);
      expect(mockDispatch.mock.calls[2][0]).toEqual({
        type: "carousel.SET_PAGE",
        payload: 3
      });
      carouselActions.pagePrev()(mockDispatch, mockGetStatePrev2);
      expect(mockDispatch.mock.calls[3][0]).toEqual({
        type: "carousel.SET_PAGE",
        payload: 7
      });
    });
  });
});
