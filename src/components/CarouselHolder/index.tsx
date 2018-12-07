import * as React from "react";
import ImageSquare from "./ImageSquare";
import PrevNext from "./PrevNext";

const CarouselHolder: React.SFC<any> = (props: any) => {
  const { images } = props;
  return (
    <div className="carousel">
      <div className="carousel__header">
        <p className="carousel__header__title">Carousel Test</p>
      </div>
      <div className="carousel__image-area">
        {images.map((image: any) => (
          <ImageSquare
            image={image}
            key={image.title || `${Math.random().toString()}`}
          />
        ))}
      </div>
      <div className="carousel__footer-area">
        <PrevNext />
      </div>
    </div>
  );
};

export default CarouselHolder;
