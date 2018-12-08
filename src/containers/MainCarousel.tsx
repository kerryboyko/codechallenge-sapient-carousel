import * as React from "react";
import { connect } from "react-redux";
import CarouselHolder from "../components/CarouselHolder";
import wrapAroundSlice from "../util/wrapAroundSlice";
import { IPixabayImage } from "../store/actions/types";
import { get } from "lodash";

const MainCarousel = (props: any) => {
  const { actions, images, imagesLoaded } = props;
  return (
    <CarouselHolder
      images={images}
      imagesLoaded={imagesLoaded}
      actions={actions}
    />
  );
};

const defaultDisplay = {
  size: 5,
  transpose: 2
};
const mapStateToProps = (state: any) => {
  const imagesInStore: IPixabayImage[] = get(state, "photos.hits", []);
  const imagesLoaded: boolean = imagesInStore.length > 0;
  const root = state.carousel;
  return {
    images: wrapAroundSlice(
      imagesInStore,
      root,
      defaultDisplay.size,
      defaultDisplay.transpose
    ),
    imagesLoaded
  };
};

export default connect(
  mapStateToProps,
  null
)(MainCarousel);
