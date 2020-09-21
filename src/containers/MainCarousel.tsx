import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pagePrev, pageNext } from "../store/reducers/carousel";
import CarouselHolder from "../components/CarouselHolder";
import wrapAroundSlice from "../util/wrapAroundSlice";
import * as get from "lodash.get";

const MainCarousel: React.FC<{}> = () => {
  const props = useSelector((state: any) => {
    const imagesInStore = get(state, "photos.photos.hits", []);
    const imagesLoaded: boolean = imagesInStore.length > 0;
    const root = state.carousel.page;
    const size = 5; // hardcoded for now, but can be dynamic;
    const transpose = 2; // again, hardcoded for now.
    return {
      images: wrapAroundSlice(imagesInStore, root, size, transpose),
      imagesLoaded,
      currentQuery: state.photos.photos.query,
      isNoHits:
        state.photos.photos.query !== "" &&
        state.photos.photos.hits.length === 0,
      isLoading: state.photos.isLoading,
    };
  });
  const dispatch = useDispatch();
  console.log({props})
  return (
    <div className="main-carousel">
      <CarouselHolder
        {...props}
        actions={{
          pagePrev: () => dispatch(pagePrev()),
          pageNext: () => dispatch(pageNext()),
        }}
      />
    </div>
  );
};

export default MainCarousel;
