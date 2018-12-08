import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos, loadPhotos } from "../store/actions/photos";
import CarouselHolder from "../components/CarouselHolder";
import { testImages } from "../util/testImages";
import wrapAroundSlice from "../util/wrapAroundSlice";
import { IPixabayImage } from "../store/actions/types";
import { get } from "lodash";
import { pagePrev, pageNext } from "../store/actions/carousel";

interface ISearchBoxState {
  queryField: string;
}
export class SearchBox extends React.Component<any, ISearchBoxState> {
  constructor(props: any) {
    super(props);
    this.state = { queryField: "" };
  }
  public render() {
    const { handleQueryChange, handleGetPhotos } = this;
    const { queryField } = this.state;
    const { actions, images, imagesLoaded } = this.props;
    return (
      <CarouselHolder
        images={images}
        imagesLoaded={imagesLoaded}
        actions={actions}
      />
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
    loadMockData: bindActionCreators(() => loadPhotos(testImages), dispatch),
    pagePrev: bindActionCreators(pagePrev, dispatch),
    pageNext: bindActionCreators(pageNext, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);