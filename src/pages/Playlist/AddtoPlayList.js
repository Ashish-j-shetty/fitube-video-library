import axios from "axios";
import { useEffect, useState } from "react";
import { PlaylistIcon } from "../../assets/icons";
import { BASE_URL } from "../../constants/urlConfig";
import { useAuth } from "../../context/auth-context";
import { useData } from "../../context/video-context";
import { CREATE_PLAYLIST, TOGGLE_PLAYLIST } from "../../reducers/actionTypes";
import { isVideoPresentInUserSelection } from "../../utils/videoUtils";
import "./playlist.css";

export const AddToPlayList = ({ id }) => {
  const { videos, playlists, dispatch } = useData();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [newList, setListName] = useState("");

  useEffect(() => {
    const modal = document.querySelector(".modal");
    window.onclick = (evt) => {
      if (evt.target === modal) {
        setShowModal(false);
      }
    };
  }, [showModal]);

  const getPlaylistName = (name) => {
    return playlists?.filter((item) => item.name === name)?.[0];
  };

  const video = videos?.find((video) => video.id === id);

  const createPlaylist = async (evt) => {
    setListName("");

    if (newList && !getPlaylistName(newList)) {
      try {
        const { data } = await axios.post(`${BASE_URL}/playlists`, {
          owner: user.userId,
          name: newList,
          videos: [video._id],
        });

        if (data.success) {
          dispatch({
            type: CREATE_PLAYLIST,
            payload: {
              _id: data.playlist._id,
              playlistName: newList,
              videoId: video._id,
            },
          });
        }
      } catch (err) {}
    }
  };

  const getPlaylistById = (playlistId) => {
    return playlists?.filter((item) => item._id === playlistId)?.[0];
  };

  const isInPlaylist = (playlistId) => {
    const playlist = getPlaylistById(playlistId);
    return playlist?.videos.find((item) => item === video._id);
  };

  const togglePlaylist = (playlistId) => {};

  return (
    <>
      <span
        className=" cursor--pointer"
        onClick={() => setShowModal((modal) => !modal)}
      >
        <PlaylistIcon />
      </span>

      {showModal && (
        <div className="modal modal-display">
          <div className="card modal-body modal-background">
            <h3 className="modal--header">Playlists</h3>

            <ul className="playlist--list">
              {playlists.map(({ _id, name }) => (
                <li key={_id}>
                  <input
                    type="checkbox"
                    onChange={() => togglePlaylist(_id)}
                    checked={isInPlaylist(_id)}
                  />
                  {name}
                </li>
              ))}
            </ul>
            <div className="newplaylist--action">
              <input
                className="playlist-txt--input"
                value={newList}
                onChange={(evt) => setListName(evt.target.value)}
                type="text"
                placeholder="Enter new playlist name"
              />

              <span className="cursor--pointer" onClick={createPlaylist}>
                <i className="fas fa-lg fa-plus-circle playlist-btn--add"></i>
              </span>
              <span
                className="btn--cross"
                onClick={() => {
                  setShowModal((modal) => !modal);
                }}
              >
                <i className="fas fa-times-circle"></i>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
