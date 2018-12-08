import * as React from "react";

const PrevNext: React.SFC<any> = (props: any) => (
  <div className="prevnext__buttons">
    <div onClick={props.pagePrev} className="prevnext__buttons__button prev">
      Prev
    </div>
    <div onClick={props.pageNext} className="prevnext__buttons__button next">
      Next
    </div>
  </div>
);

export default PrevNext