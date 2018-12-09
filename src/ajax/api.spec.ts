import Api from "./api";

const api = new Api();
describe("src/ajax/api.ts", () => {
  describe("constructor()", () => {
    it("creates a new API interface", () => {
      expect(typeof Api).toBe("function");
    });
  });
  xdescribe("async Api.getImages()", () => {
    // this test is removed because we do not want to overload the API
    it("gets images from pixabay", async () => {
      const images = await api.getImages("beautiful+landscape");
      expect(images.status).toBe(200);
    });
  });
});
