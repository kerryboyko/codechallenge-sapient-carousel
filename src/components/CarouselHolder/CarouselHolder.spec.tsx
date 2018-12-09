import * as React from "react";
import CarouselHolder from "./index";
import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

const placeholder = () => null;

const uglifyHtml = (parentHTML: string | null) =>
  parentHTML ? parentHTML.replace(/(^|>)[ \n\t]+/g, ">") : "";

const snapshot = uglifyHtml(
  `<div class="carousel__header">
    <div class="carousel__header__title">Carousel&#xA0;Test</div>
  </div>
  <div class="carousel__image-area">
    <div></div>
  </div>
  <div class="carousel__footer-area">
    <div class="prevnext__buttons">
      <div class="prevnext__buttons__button prev">Prev</div>
      <div class="prevnext__buttons__button next">Next</div>
    </div>
  </div>`
);

const { render } = enzyme;
describe("Carousel Holder", () => {
  it("renders", () => {
    const testRender = render(
      <CarouselHolder
        actions={{
          pagePrev: placeholder,
          pageNext: placeholder
        }}
      />
    );
    expect(uglifyHtml(testRender.html())).toBe(snapshot);
  });
});
