import * as React from "react";
import {useState} from 'react'; 
import { useDispatch } from "react-redux";
import { getPhotos } from "../store/reducers/photos";
import SearchQuery from "../components/SearchQuery";

const SearchBox = () => {
  const [queryField, setQueryField] = useState<string>('');
  const dispatch = useDispatch();
  const handleQueryChange = (event: any): void => {
    setQueryField(event.target.value);
  };
  const handleGetPhotos = (): void => {
    dispatch(getPhotos(queryField));
    setQueryField('')
  };
  return(<SearchQuery
    handleQueryChange={handleQueryChange}
    handleGetPhotos={handleGetPhotos}
    queryField={queryField}
  />)
}
export default SearchBox;
