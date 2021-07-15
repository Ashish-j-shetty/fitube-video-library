import { Link } from "react-router-dom";
import { PencilIcon } from "../../assets/icons";
import VideoPlaylistCard from "../../components/VideoplaylistCard/VideoPlaylistCard";

import "./video.css";

export function VideoCardGeneral({ playlist }) {
  return (
    <div>
      <div className="title--container">
        <div>
          <h2 className="playlist--title">{playlist.name}</h2>
          {playlist.videos.length !== 0 && (
            <span className="m-03">{playlist.videos.length} videos</span>
          )}
        </div>
        <div>
          <Link to={`/playlist/${playlist._id}`}>
            <span>
              <PencilIcon />
            </span>
          </Link>
        </div>
      </div>

      <div className="playlist__list--container">
        {playlist.videos.length !== 0 ? (
          playlist.videos
            .slice(0, 5)
            .map((videoId) => (
              <VideoPlaylistCard key={videoId} videoId={videoId} />
            ))
        ) : (
          <div className="no__record">
            <h3>No videos found in this playlist </h3>
          </div>
        )}
      </div>
    </div>
  );
}
