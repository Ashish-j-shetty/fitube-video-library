import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/video-context";
import { getImage } from "../../utils/videoUtils";

export default function VideoPlaylistCard({ videoId }) {
  const { videos } = useData();

  let video;
  let id;
  if (videos.length > 0) {
    video = videos.find((video) => video._id === videoId);
    id = video.id;
  }

  return video ? (
    <Link className="link" to={`/${videoId}`}>
      <img
        className="video-thumbnail"
        src={getImage(id)}
        alt="video-thumbnail"
      />
      <div className="video--title">{video.title}</div>
      <div className="video__card--description">
        <span className="video--channel"> {video.autor} </span>
      </div>
    </Link>
  ) : (
    <></>
  );
}
