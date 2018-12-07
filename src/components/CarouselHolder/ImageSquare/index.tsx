import * as React from "react";

const ImageSquare: React.SFC<any> = (props: any) => {
  const {image, position} = props;
  const isMainImage: boolean = position === 2; 
  return (
  <div className="image-square__container">
    <div className={`image-square ${isMainImage ? "main-image" : ""}`} 
     style={{backgroundImage: `url(${isMainImage ? image.largeImageURL : image.previewURL})`}}/>
    <div className="image-square__title">{props.title}</div>
  </div>
)};

export default ImageSquare;
