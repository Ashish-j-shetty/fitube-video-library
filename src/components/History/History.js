import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../context/video-context";
import { REMOVE_FROM_HISTORY } from "../../reducers/actionTypes";
import { VideoCardGeneral } from "../Videos";

export function History() {
  const {
    state: { history },
    dispatch,
  } = useVideo();

  const removeFromHistory = ({ videoId: id }) => {
    dispatch({ type: REMOVE_FROM_HISTORY, payload: id });
  };

  return (
    <React.Fragment>
      <h2 className="text-center">My views history</h2>
      <div>
        <div className="flex">
          {history
            .slice()
            .reverse()
            .map((id) => (
              <VideoCardGeneral
                key={id}
                videoId={id}
                remove={removeFromHistory}
              />
            ))}
        </div>
      </div>
      {history.length === 0 && (
        <div className="flex flex-center">
          <h3 className="text-center">You havent watched any videos</h3>
          <Link className="ml-1" to="/">
            <button className="btn btn--rounded">Watch videos</button>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}
