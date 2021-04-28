import React, { useEffect } from "react";
import { useVideo } from "../../context/video-context";
import { SET_VIDEO_LIST } from "../../reducers/actionTypes";
import { serverRequest } from "../../utils/serverRequest";
import { VideoCard } from "../Videos";

import "./explore.css";
import { getFilteredVideos, Search } from "./Search";

export function Explore() {
  const {
    state: { videoList, searchText },
    dispatch,
  } = useVideo();

  useEffect(() => {
    (async () => {
      const {
        response: { videos },
        error,
      } = await serverRequest("api/videos", "GET");

      if (!error) {
        dispatch({ type: SET_VIDEO_LIST, payload: videos });
      }
    })();
  }, [dispatch]);

  const searchedVideos = getFilteredVideos(videoList, searchText);

  return (
    <main>
      <div className="page-wrapper">
        <span className="page--title">EXPLORE</span>
      </div>

      <Search />

      <div className="video--container">
        {searchedVideos.map((video) => (
          <VideoCard key={video.id} videoId={video.id} />
        ))}
      </div>
      {searchedVideos.length === 0 && (
        <h3 className="text-center">No videos found</h3>
      )}
    </main>
  );
}
