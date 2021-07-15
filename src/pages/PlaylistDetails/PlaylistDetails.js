import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckIcon, DeleteIcon, PencilIcon } from "../../assets/icons";
import SkeletonVideo from "../../components/Skeleton/SkeletonVideo";
import { BASE_URL } from "../../constants/urlConfig";
import { useData } from "../../context/video-context";
import { DELETE_PLAYLIST, UPDATE_PLAYLIST } from "../../reducers/actionTypes";
import { VideoCard } from "../Videos";

import "./playlistDetails.css";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const { playlists, videos, dispatch } = useData();

  const navigate = useNavigate();

  let playlist;
  let playlistOldName;
  if (playlists.length > 0) {
    playlist = playlists.find((item) => item._id === playlistId);

    playlistOldName = playlist.name;
  }

  const isDefaultPlaylist = [
    "Saved Videos",
    "Liked Videos",
    "Watch Later Videos",
  ].some((item) => item === playlistOldName);

  const [isEdit, setIsEdit] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistNameElement = useRef(null);

  const editHandler = async () => {
    if (!isEdit) {
      playlistNameElement.current.focus();
    } else {
      try {
        const response = await axios.post(
          `${BASE_URL}/playlists/update/${playlistId}`,
          {
            newName: playlistName,
          }
        );
        if (response.data.success) {
          dispatch({
            type: UPDATE_PLAYLIST,
            payload: { _id: playlist._id, name: playlistName },
          });
        }
      } catch (error) {}
    }
    setIsEdit((isEdit) => !isEdit);
  };

  const deletePlaylist = async () => {
    navigate("/playlist", { replace: true });

    dispatch({ type: DELETE_PLAYLIST, payload: { playlistId } });
    try {
      await axios.delete(`${BASE_URL}/playlists/${playlistId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return playlist ? (
    <div>
      <div className="flex">
        <div className="flex flex__basis-75">
          <input
            readOnly={!isEdit}
            className="edit__playlist"
            ref={playlistNameElement}
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>

        {!isDefaultPlaylist && (
          <div className="flex">
            <button className="btn__user--action" onClick={() => editHandler()}>
              {isEdit ? <CheckIcon /> : <PencilIcon />}
            </button>

            <button
              className="btn__user--action"
              onClick={() => deletePlaylist()}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      <div className="playlist__list--container playlist_details">
        {videos && playlist?.videos.length !== 0 ? (
          playlist?.videos?.map((video) => {
            const { id } = videos?.find((item) => video === item._id);

            return <VideoCard key={id} videoId={id} />;
          })
        ) : (
          <h2>no video in playlist</h2>
        )}
      </div>
    </div>
  ) : (
    <SkeletonVideo />
  );
}
