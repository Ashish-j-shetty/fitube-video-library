import React from "react";
import SkeletonVideo from "../../components/Skeleton/SkeletonVideo";

import { useData } from "../../context/video-context";

import { VideoCard } from "../Videos";

import "./explore.css";
import { getFilteredVideos, Search } from "./Search";

export function Explore() {
  const { videos } = useData();

  const searchedVideos = getFilteredVideos(videos, "");

  return (
    <main>
      <div className="page-wrapper">
        <span className="page--title">EXPLORE</span>
      </div>

      <Search />

      <div className="video--container">
        {searchedVideos.map((video) => {
          return <VideoCard key={video._id} videoId={video.id} />;
        })}
      </div>
      {searchedVideos.length === 0 && (
        <div className="video--container">
          {[...Array(8)].map((_, i) => (
            <SkeletonVideo key={i} />
          ))}
        </div>
      )}
    </main>
  );
}
