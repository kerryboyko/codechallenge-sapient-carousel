import * as React from "react";
import {useSelector, useDispatch} from 'react-redux'; 
import {pagePrev, pageNext} from '../store/reducers/carousel';
import CarouselHolder from "../components/CarouselHolder";
import wrapAroundSlice from "../util/wrapAroundSlice";
import { IPixabayImage } from "../store/actions/types";
import * as get from "lodash.get";


const MainCarousel: React.FC<{}> = () => {
  const {images, imagesLoaded, currentQuery, isNoHits, isLoading} = useSelector(
    (state: any) => {
      const imagesInStore: IPixabayImage[] = get(state, "photos.photos.hits", []);
      const imagesLoaded: boolean = imagesInStore.length > 0;
      const root = state.carousel;
      const size = 5; // hardcoded for now, but can be dynamic;
      const transpose = 2; // again, hardcoded for now.
      return {
        images: wrapAroundSlice(imagesInStore, root, size, transpose),
        imagesLoaded,
        currentQuery: state.photos.photos.query,
        isNoHits: state.photos.photos.query !== "" && state.photos.photos.hits.length === 0,
        isLoading: state.photos.isLoading
      };
    }
  )
  const dispatch = useDispatch();
  return <div className="main-carousel">
    <CarouselHolder {...{images, imagesLoaded, currentQuery, isNoHits, isLoading}} actions={{pagePrev: () => dispatch(pagePrev()), pageNext: () => dispatch(pageNext())}}/>
  </div>
}

export default MainCarousel
