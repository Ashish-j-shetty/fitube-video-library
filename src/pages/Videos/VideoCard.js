import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/video-context";

import { getImage } from "../../utils/videoUtils";
import "./video.css";

export function VideoCard({ videoId }) {
  const { videos } = useData();

  const { title, autor, views } = videos.find((video) => video.id === videoId);

  return (
    <div className="card">
      <Link className="link" to={`/${videoId}`}>
        <img
          className="video-thumbnail"
          src={getImage(videoId)}
          alt="video-thumbnail"
        />
        <div className="video--title">{title}</div>
        <div className="video__card--description">
          <span className="video--channel"> {autor} </span>
          <span className="text-muted">{views} views</span>
        </div>
      </Link>
    </div>
  );
}
