import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos, loadPhotos } from "../store/actions/photos";
import CarouselHolder from "../components/CarouselHolder";
import { testImages } from "../util/testImages";
import wrapAroundSlice from "../util/wrapAroundSlice";
import { IPixabayImage } from "../store/actions/types";
import { get } from "lodash";

interface IMainCarouselState {
  queryField: string;
}
export class MainCarousel extends React.Component<any, IMainCarouselState> {
  constructor(props: any) {
    super(props);
    this.state = { queryField: "" };
  }
  public render() {
    const { handleQueryChange, handleGetPhotos } = this;
    const { queryField } = this.state;
    const { actions, images, imagesLoaded } = this.props;
    return (
      <div className="main-carousel">
        <CarouselHolder images={images} imagesLoaded={imagesLoaded} />
        <div>
          <input onChange={handleQueryChange} value={queryField} />
          <button onClick={handleGetPhotos}>Search</button>
          <h2>{queryField}</h2>
          <button onClick={actions.loadMockData}>Load Mock Data</button>
        </div>
      </div>
    );
  }
  private handleQueryChange = (event: any): void => {
    this.setState({ queryField: event.target.value });
  };
  private handleGetPhotos = (): void => {
    this.props.actions.getPhotos(this.state.queryField);
  };
}

const mapStateToProps = (state: any) => {
  const imagesInStore: IPixabayImage[] = get(state, "photos.hits", []);
  const imagesLoaded: boolean = imagesInStore.length > 0;
  const root = state.carousel;
  const size = 5; // hardcoded for now, but can be dynamic;
  const transpose = 2; // again, hardcoded for now.
  return {
    images: wrapAroundSlice(imagesInStore, root, size, transpose),
    imagesLoaded
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getPhotos: bindActionCreators(
      (query: string) => getPhotos(query),
      dispatch
    ),
    loadMockData: bindActionCreators(() => loadPhotos(testImages), dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainCarousel);
