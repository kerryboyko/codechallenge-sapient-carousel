import * as React from "react";
import "./search-query.css";

const SearchQuery: React.SFC<any> = (props: any) => {
  const {
    handleQueryChange,
    handleGetPhotos,
    queryField,
  } = props;
  const handleKeyPress = ({ key }: { key: string }) =>
    key === "Enter" ? handleGetPhotos() : null;
  return (
      <div className="search-query">
        <input
          className="search-query__search-input"
          onChange={handleQueryChange}
          onKeyPress={handleKeyPress}
          value={queryField}
          placeholder="Search"
        />
        <button
          className="search-query__search-button"
          onClick={handleGetPhotos}
        >
          Search
        </button>
      </div>
  );
};

export default SearchQuery;
