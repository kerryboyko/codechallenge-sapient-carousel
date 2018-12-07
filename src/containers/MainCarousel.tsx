import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos } from "../store/actions/photos";

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

    return (
      <div>
        <input onChange={handleQueryChange} value={queryField} />
        <button onClick={handleGetPhotos}>Search</button>
        <h2>{queryField}</h2>
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

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      getPhotos: bindActionCreators(
        (query: string) => getPhotos(query),
        dispatch
      )
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MainCarousel);
