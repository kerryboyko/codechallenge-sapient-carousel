import * as React from "react";
import ImageSquare from "./ImageSquare";
import PrevNext from "./PrevNext";
import LoadingBar from "./LoadingBar";
import "./carousel-holder.css";

const CarouselDisplayArea = (props: any) => {
  const {
    isLoading,
    images,
    imagesLoaded,
    actions,
    currentQuery,
    isNoHits
  } = props;
  if (isLoading) {
    return <LoadingBar />;
  }
  if (isNoHits) {
    return <div className="no-hits">No hits found for {currentQuery}</div>;
  }
  if (imagesLoaded) {
    return images.map((image: any, i: number) => (
      <ImageSquare
        image={image}
        key={`${i}-${image.pageURL}`}
        position={i}
        actions={actions}
      />
    ));
  }

  return <div />;
};

const CarouselHolder: React.SFC<any> = (props: any) => {
  const { actions } = props;
  return (
    <div className="carousel">
      <div className="carousel__header">
        <div className="carousel__header__title">Carousel&nbsp;Test</div>
      </div>
      <div className="carousel__image-area">
        <CarouselDisplayArea {...props} />
      </div>

      <div className="carousel__footer-area">
        <PrevNext pagePrev={actions.pagePrev} pageNext={actions.pageNext} />
      </div>
    </div>
  );
};

export default CarouselHolder;
