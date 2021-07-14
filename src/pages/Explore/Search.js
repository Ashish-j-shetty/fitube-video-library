import React, { useState } from "react";
import { useData } from "../../context/video-context";
import { CLEAR_SEARCH, SEARCH_VIDOES } from "../../reducers/actionTypes";
import "./explore.css";

export function Search() {
  const { dispatch, searchValue } = useData();

  const [searchText, setSeachText] = useState(searchValue ? searchValue : "");

  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      dispatch({ type: SEARCH_VIDOES, payload: searchText });
    }
  };

  return (
    <div className="flex flex-center">
      <input
        type="text"
        placeholder="search videos"
        value={searchText}
        className="input--searchbar"
        onChange={(evt) => setSeachText(evt.target.value)}
        onKeyDown={handleSearch}
      />
      <button
        className="btn--search"
        onClick={() => dispatch({ type: SEARCH_VIDOES, payload: searchText })}
      >
        <i className="fa fa-search"></i>
      </button>

      {searchText && (
        <button
          className="btn--clear"
          onClick={() => {
            dispatch({ type: CLEAR_SEARCH });
            setSeachText("");
          }}
        >
          <i className="fa fa-times-circle" aria-hidden="true"></i>ClearSearch
        </button>
      )}
    </div>
  );
}

export const getFilteredVideos = (videoList, searchText) => {
  if (!searchText) {
    return videoList;
  }

  return videoList.filter(
    (video) =>
      video.title.toLowerCase().includes(searchText) ||
      video.autor.toLowerCase().includes(searchText)
  );
};
