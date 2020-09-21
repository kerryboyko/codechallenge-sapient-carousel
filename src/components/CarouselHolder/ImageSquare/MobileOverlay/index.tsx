import * as React from "react";
import {ReactSVG} from "react-svg";
import arrowSrc from "../../../../images/arrow.svg";

const MobileOverlay: React.FC<any> = (props: any) => {
  const {actions} = props;
  return (
    <div className={`mobile-overlay`}>
      <div onClick={actions.pagePrev} className="mobile-overlay__arrow half-circle hc-right">
        <ReactSVG svgClassName="mobile-overlay__arrow__svg__prev" src={arrowSrc} />
      </div>
      <div onClick={actions.pageNext} className="mobile-overlay__arrow half-circle hc-left">
        <ReactSVG svgClassName="mobile-overlay__arrow__svg__next" src={arrowSrc} />
      </div>
    </div>
  );
};

export default MobileOverlay;
