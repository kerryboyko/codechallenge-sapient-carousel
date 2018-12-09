import * as React from "react";
import SearchQuery from "./index";
import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

const uglifyHtml = (parentHTML: string | null) =>
  parentHTML ? parentHTML.replace(/(^|>)[ \n\t]+/g, ">") : "";

const snapshot = uglifyHtml(
  `<input class=\"search-query__search-input\" placeholder=\"Search\">
   <button class=\"search-query__search-button\">Search</button>`
);

const { render } = enzyme;
describe("SearchQuery", () => {
  it("renders", () => {
    const testRender = render(<SearchQuery />);
    expect(uglifyHtml(testRender.html())).toBe(snapshot);
  });
});
