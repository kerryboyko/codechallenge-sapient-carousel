import * as React from "react";

/* NB: One side-effect of the implementation is that it takes a little while to load
   each image as the component rerenders and it comes on screen. 
   There are number of approaches one could take to fix this problem:
   * Preloading the images to the left and right before they are rendered on screen
   * Delaying the reaction of the previous/next buttons until after the image has loaded with 
     a promise resolution on new Image().onload. 
   * Replacing the image with a placeholder
   * Simply expanding the array to 7 places but with display:none on
     the left and rightmost images
   There may not be time to get to this issue, 
   and may not be in the scope of the MVP
   but this NB is here to explain this behavior.
   Some information on onload events can be found at these StackOverflow pages
   https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache
   https://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
*/
const UserCredit: React.SFC<any> = (props: any) => {
  return (
    <div className="user-credit">
      <div className="user-credit__icon-user">
        <img
          className="user-credit__icon-user__icon"
          src={props.userImageURL}
          alt={props.user}
        />
        <div className="user-credit__icon-user__user"><a href={`https://pixabay.com/en/users/${props.user}-${props.user_id}/`}>{props.user}</a></div>
      </div>
      <div className="user-credit__likes">Likes: {props.likes}</div>
    </div>
  );
};

export default UserCredit;
