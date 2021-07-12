import React, { useState } from "react";
import { useData } from "../../context/video-context";
//import { SET_SEARCH_TEXT, CLEAR_SEARCH } from "../../reducers/actionTypes";
import "./explore.css";

export function Search() {
  const [searchText, setSeachText] = useState("");

  const { dispatch } = useData();
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      //  dispatch({ type: SET_SEARCH_TEXT, payload: searchText });
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
        //  onClick={() => dispatch({ type: SET_SEARCH_TEXT, payload: searchText })}
      >
        <i className="fa fa-search"></i>
      </button>

      {searchText && (
        <button
          className="btn--clear"
          onClick={() => {
            //dispatch({ type: CLEAR_SEARCH });
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
  return videoList.filter(
    (video) =>
      video.title.toLowerCase().includes(searchText) ||
      video.autor.toLowerCase().includes(searchText)
  );
};
