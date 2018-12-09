import { loadPhotos, setLoading, getPhotos } from "./photos";

jest.mock("../../ajax/api");
const mockDispatch = jest.fn();
const mockGetState = jest.fn(() => ({
  photoCache: {}
}));

describe("./src/store/actions/photos", () => {
  describe("photos actions", () => {
    it("sets the loading graphic", () => {
      expect(setLoading(true)).toEqual({
        type: "photos.LOADING",
        payload: true
      });
      expect(setLoading(false)).toEqual({
        type: "photos.LOADING",
        payload: false
      });
    });
    it("loads photos", () => {
      expect(loadPhotos({ foo: "bar" })).toEqual({
        type: "photos.LOAD_PHOTOS",
        payload: { foo: "bar" }
      });
    });
    it("gets photos and then dispatches them to the store", async () => {
      await getPhotos("test query")(mockDispatch, mockGetState);
      expect(mockGetState).toHaveBeenCalledTimes(1);
      // because this must match exactly, and I don't know what side effects
      // mocking Date.prototype() would have.
      const tautologyDateStamp = mockDispatch.mock.calls[1][0].payload.cachedAt;
      expect(tautologyDateStamp).toBeTruthy();
      expect(mockDispatch.mock.calls).toEqual([
        [{ payload: true, type: "photos.LOADING" }],
        [
          {
            payload: {
              cachedAt: tautologyDateStamp,
              foo: "bar",
              query: "test+query"
            },
            type: "photos.LOAD_PHOTOS"
          }
        ]
      ]);
    });
  });
});
