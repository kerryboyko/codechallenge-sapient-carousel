import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos } from "../store/actions/photos";
import { pagePrev, pageNext } from "../store/actions/carousel";
import SearchQuery from "../components/SearchQuery";

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
    return (
      <SearchQuery
        handleQueryChange={handleQueryChange}
        handleGetPhotos={handleGetPhotos}
        queryField={queryField}
      />
    );
  }
  private handleQueryChange = (event: any): void => {
    this.setState({ queryField: event.target.value });
  };
  private handleGetPhotos = (): void => {
    this.props.actions.getPhotos(this.state.queryField);
    this.setState({ queryField: "" });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getPhotos: bindActionCreators(
      (query: string) => getPhotos(query),
      dispatch
    ),
    pagePrev: bindActionCreators(pagePrev, dispatch),
    pageNext: bindActionCreators(pageNext, dispatch)
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBox);
