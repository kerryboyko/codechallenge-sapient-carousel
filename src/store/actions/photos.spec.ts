import { loadPhotos, clearPhotos } from "./photos";

describe("./src/store/actions/photos", () => {
  describe("photos actions", () => {
    it("loads photos", () => {
      expect(loadPhotos({ foo: "bar" })).toEqual({
        type: "photos.LOAD_PHOTOS",
        payload: { foo: "bar" }
      });
    });
    it("clear photos", () => {
      expect(clearPhotos()).toEqual({
        type: "photos.CLEAR_PHOTOS"
      });
    });
  });
});
