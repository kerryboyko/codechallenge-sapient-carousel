import actionTypes from '../reduxTypes'; 
import {carousel} from './carousel';

describe("./src/reducers/carousel.ts", () => {
  describe("Carousel Reducer", () => {
    it("increments and decrements the reducer", () => {
      // this behavior might not make it to the final project;
      expect(carousel(undefined)).toBe(0);
      expect(carousel(1)).toBe(1);
      expect(carousel(3, {type: actionTypes.carousel.LEFT})).toBe(2);
      expect(carousel(7, {type: actionTypes.carousel.RIGHT, payload: {max: 9}})).toBe(8);
      expect(carousel(7, {type: actionTypes.carousel.RIGHT, payload: {max: 7}})).toBe(7);

    })
  })
})