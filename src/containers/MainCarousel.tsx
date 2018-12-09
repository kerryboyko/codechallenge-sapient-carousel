import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import CarouselHolder from "../components/CarouselHolder";
import wrapAroundSlice from "../util/wrapAroundSlice";
import { IPixabayImage } from "../store/actions/types";
import { get } from "lodash";
import { pagePrev, pageNext } from "../store/actions/carousel";

interface IMainCarouselState {
  queryField: string;
}
export class MainCarousel extends React.Component<any, IMainCarouselState> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div className="main-carousel">
        <CarouselHolder {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const imagesInStore: IPixabayImage[] = get(state, "photos.hits", []);
  const imagesLoaded: boolean = imagesInStore.length > 0;
  const root = state.carousel;
  const size = 5; // hardcoded for now, but can be dynamic;
  const transpose = 2; // again, hardcoded for now.
  return {
    images: wrapAroundSlice(imagesInStore, root, size, transpose),
    imagesLoaded,
    currentQuery: state.photos.query,
    isNoHits: state.photos.query !== "" && state.photos.hits.length === 0,
    isLoading: state.loading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    pagePrev: bindActionCreators(pagePrev, dispatch),
    pageNext: bindActionCreators(pageNext, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainCarousel);
