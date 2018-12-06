import Api from "./api";

const api = new Api();
describe("src/ajax/api.ts", () => {
  describe("constructor()", () => {
    it("creates a new API interface", () => {
      expect(typeof Api).toBe("function");
    });
    it("has default values if none are provided", () => {
      expect(api.debugInfo()).toEqual({
        key: `9656065-a4094594c34f9ac14c7fc4c39`,
        url: `https://pixabay.com/api/`
      });
    });
  });
  describe("async Api.getImages()", () => {
    it("gets images from pixabay", async () => {
      const images = await api.getImages("beautiful+landscape");
      expect(images.status).toBe(200);
    });
  });
});
