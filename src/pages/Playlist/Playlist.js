import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/video-context";
import { TOGGLE_PLAYLIST } from "../../reducers/actionTypes";
import { VideoCardGeneral } from "../Videos";

export function Playlist() {
  const { playlists, dispatch } = useData();

  const removeFromPlaylist = ({ videoId: id, listId }) => {
    dispatch({ type: TOGGLE_PLAYLIST, payload: { listId, id } });
  };

  return (
    <React.Fragment>
      <h2 className="text-center">My Playlist</h2>
      <div>
        {playlists.map(({ listId, name, videos }) => (
          <div className="mt-1" key={listId}>
            <span className="playlist--title"> {name} :</span>
            <big>{videos.length}</big>
            <div className="flex">
              {videos.map((id) => (
                <VideoCardGeneral
                  key={id}
                  videoId={id}
                  listId={listId}
                  remove={removeFromPlaylist}
                />
              ))}
              {videos.length === 0 && (
                <div className="flex flex-center">
                  <h3 className="text-center">
                    You do not have any videos in playlist: {name}
                  </h3>
                  <Link className="ml-1" to="/">
                    <button className="btn btn--rounded">Add videos</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
