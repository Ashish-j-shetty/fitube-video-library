import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/video-context";
//import { TOGGLE_LIKE } from "../../reducers/actionTypes";
import { VideoCardGeneral } from "../Videos";

export function LikedVideos() {
  const {
    state: { likedVideos },
    dispatch,
  } = useData();

  const toggleLike = ({ videoId: id }) => {
    // dispatch({ type: TOGGLE_LIKE, payload: id });
  };

  return (
    <React.Fragment>
      <h2 className="text-center">My LikedVideos</h2>
      <div>
        <div className="flex">
          {likedVideos.map((id) => (
            <VideoCardGeneral key={id} videoId={id} remove={toggleLike} />
          ))}
        </div>
      </div>
      {likedVideos.length === 0 && (
        <div className="flex flex-center">
          <h3 className="text-center">You havent liked any videos</h3>
          <Link className="ml-1" to="/">
            <button className="btn btn--rounded">Explore videos</button>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}
