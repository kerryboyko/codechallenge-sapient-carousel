import wrapAroundSlice from "./wrapAroundSlice";

describe("./src/util (utility functions)", () => {
  describe("wrapAroundSlice()", () => {
    const testArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    it("can get a straight slice", () => {
      expect(wrapAroundSlice(testArray, 0, 5, 0)).toEqual([
        "a",
        "b",
        "c",
        "d",
        "e"
      ]);
    });
    it("can get a transposed slice", () => {
      expect(wrapAroundSlice(testArray, 0, 5, 2)).toEqual([
        "i",
        "j",
        "a",
        "b",
        "c"
      ]);
    });
    it("can handle arrays shorter than the size", () => {
      expect(wrapAroundSlice(testArray.slice(0, 3), 0, 5, 2)).toEqual([
        "b",
        "c",
        "a",
        "b",
        "c"
      ]);
      expect(wrapAroundSlice(["q"], 0, 5, 2)).toEqual([
        "q",
        "q",
        "q",
        "q",
        "q"
      ]);
    });
  });
});
