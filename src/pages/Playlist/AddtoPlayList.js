import { useEffect, useState } from "react";
import { useVideo } from "../../context/video-context";
import { ADD_NEW_PLAYLIST, TOGGLE_PLAYLIST } from "../../reducers/actionTypes";
import { isVideoPresentInUserSelection } from "../../utils/videoUtils";
import "./playlist.css";

export const AddToPlayList = ({ id }) => {
  const {
    state: { playlist },
    dispatch,
  } = useVideo();

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

  const createPlaylist = (evt) => {
    if (evt.key === "Enter") {
      dispatch({ type: ADD_NEW_PLAYLIST, payload: { id, newList } });
      setListName("");
    }
  };

  const isInPlayList = (id) =>
    playlist.some((list) => list.videos.some((videoId) => videoId === id));

  return (
    <>
      {isInPlayList(id) ? (
        <span
          className="icon--liked cursor--pointer"
          onClick={() => setShowModal((modal) => !modal)}
        >
          <i
            className="fa fa-bookmark icon--save  pr-02"
            aria-hidden="true"
          ></i>
          Saved
        </span>
      ) : (
        <span
          className="cursor--pointer"
          onClick={() => setShowModal((modal) => !modal)}
        >
          <i className="fa fa-bookmark icon--save pr-02" aria-hidden="true"></i>
          Save
        </span>
      )}
      {showModal && (
        <div className="modal modal-display">
          <div className="card modal-body modal-background">
            <h3 className="modal--header">Playlists</h3>

            <ul className="playlist--list">
              {playlist.map(({ listId, name, videos }) => (
                <li key={listId}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      dispatch({
                        type: TOGGLE_PLAYLIST,
                        payload: { listId, id },
                      });
                    }}
                    checked={isVideoPresentInUserSelection(videos, id)}
                  />
                  {name}
                </li>
              ))}
            </ul>
            <div className="newplaylist--action">
              <input
                onKeyDown={createPlaylist}
                className="playlist-txt--input"
                value={newList}
                onChange={(evt) => setListName(evt.target.value)}
                type="text"
                placeholder="Enter new playlist name"
              />

              <span
                className="cursor--pointer"
                onClick={() => {
                  dispatch({
                    type: ADD_NEW_PLAYLIST,
                    payload: { id, newList },
                  });
                  setListName("");
                }}
              >
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
