import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { useVideo } from "../../context/video-context";
import { TOGGLE_LIKE } from "../../reducers/actionTypes";
import {
  dateFormatter,
  getVideo,
  isVideoPresentInUserSelection,
} from "../../utils/videoUtils";

import { AddToPlayList } from "../Playlist/AddtoPlayList";

import "./videoplayer.css";

export function VideoPlayer() {
  const { videoId } = useParams();

  const {
    state: { videoList, likedVideos },
    dispatch,
  } = useVideo();

  const {
    title,
    autor,
    description,
    views,
    date,
    subscribers,
  } = videoList.find((video) => video.id === videoId);

  return (
    <React.Fragment>
      <ReactPlayer
        className="video__player"
        url={getVideo(videoId)}
        playing={false}
        controls
        volume={1}
      />
      <section className="video--details">
        <h3>{title}</h3>
        <div>
          <span>
            {`${views} `} <i className="fa fa-eye" aria-hidden="true"></i>
          </span>
          <span className="ml-1">{dateFormatter(date)}</span>

          <div className="pt-1">{description}</div>
        </div>

        <div>
          <section className="user--actions">
            <i
              onClick={() => dispatch({ type: TOGGLE_LIKE, payload: videoId })}
              className={
                isVideoPresentInUserSelection(likedVideos, videoId)
                  ? "fas fa-thumbs-up icon--liked cursor--pointer"
                  : "fas fa-thumbs-up cursor--pointer"
              }
            ></i>
            <AddToPlayList id={videoId} />
          </section>

          <div className="video--channel pt-1">
            {autor}
            <small className="ml-1">{`${subscribers} subscribers`}</small>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
