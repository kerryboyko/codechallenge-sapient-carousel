import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { pageNext, pagePrev } from "../../store/actions/carousel";

const PrevNext: React.SFC<any> = (props: any) => (
  <div className="prevnext__buttons">
    <div onClick={props.actions.pagePrev} className="prevnext__buttons__button prev">
      Prev
    </div>
    <div onClick={props.actions.pageNext} className="prevnext__buttons__button next">
      Next
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    pageNext: bindActionCreators(pageNext, dispatch),
    pagePrev: bindActionCreators(pagePrev, dispatch)
  }
});

export default connect(
  null,
  mapDispatchToProps
)(PrevNext);
