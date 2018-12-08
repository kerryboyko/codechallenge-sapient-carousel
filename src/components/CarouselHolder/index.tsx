import * as React from "react";
import ImageSquare from "./ImageSquare";
import PrevNext from "./PrevNext";
import "./carousel-holder.css";

const CarouselHolder: React.SFC<any> = (props: any) => {
  const { images, imagesLoaded, actions} = props;
  return (
    <div className="carousel">
      <div className="carousel__header">
        <div className="carousel__header__title">Carousel&nbsp;Test</div>
      </div>
      {imagesLoaded ? (
        <div className="carousel__image-area">
          {images.map((image: any, i: number) => (
            <ImageSquare
              image={image}
              key={image.pageURL || Math.random().toString()}
              position={i}
              actions={actions}
            />
          ))}
        </div>
      ) : null}
      <div className="carousel__footer-area">
        <PrevNext pagePrev={actions.pagePrev} pageNext={actions.pageNext} />
      </div>
    </div>
  );
};

export default CarouselHolder;
