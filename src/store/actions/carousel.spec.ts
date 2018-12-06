import * as carouselActions from "./carousel";

describe("./src/store/actions/carousel.ts", () => {
  describe("Action creators for Carousel", () => {
    it("pages left and right", () => {
      expect(carouselActions.pageLeft()).toEqual({ type: "carousel.LEFT" });
      expect(carouselActions.pageRight()).toEqual({
        payload: { max: undefined },
        type: "carousel.RIGHT"
      });
      expect(carouselActions.pageRight(10)).toEqual({
        payload: { max: 10 },
        type: "carousel.RIGHT"
      });
    });
  });
});
