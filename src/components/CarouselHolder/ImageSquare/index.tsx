import * as React from "react";
import UserCredit from "./UserCredit";
import MobileOverlay from "./MobileOverlay";
/* NB: One side-effect of the implementation is that it takes a little while to load
   each image as the component rerenders and it comes on screen. 
   There are number of approaches one could take to fix this problem:
   * Preloading the images to the left and right before they are rendered on screen
   * Delaying the reaction of the previous/next buttons until after the image has loaded with 
     a promise resolution on new Image().onload. 
   * Replacing the image with a placeholder
   There may not be time to get to this issue, but this NB is here to explain this behavior.
   Some information on onload events can be found at these StackOverflow pages
   https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache
   https://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
*/

const positionClass: { [key: number]: string } = {
  0: "far-edge",
  1: "edge",
  2: "center",
  3: "edge",
  4: "far-edge"
};

const ImageSquare: React.SFC<any> = (props: any) => {
  const { image, position, actions } = props;
  return (
    <div className={`image-square position-${positionClass[position]}`}>
      <div className={`image-square__container`}>
        <MobileOverlay actions={actions} />
        <a href={image.pageURL}>
          <img
            className={`image-square__primary-image position-${
              positionClass[position]
            }`}
            src={image.largeImageURL}
            alt={image.tags}
          />
        </a>
      </div>
      <UserCredit {...image} />
    </div>
  );
};

export default ImageSquare;
