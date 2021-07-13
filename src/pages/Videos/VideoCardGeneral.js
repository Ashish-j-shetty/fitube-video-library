import { Link } from "react-router-dom";
import VideoPlaylistCard from "../../components/VideoplaylistCard/VideoPlaylistCard";

import "./video.css";
import { VideoCard } from "./VideoCard";

export function VideoCardGeneral({ playlist }) {
  return (
    <div className="card mr-1 ">
      <div>
        <h2>{playlist.name}</h2>
        {playlist.videos.length !== 0 && (
          <span>{playlist.videos.length} videos</span>
        )}
      </div>
      <Link to={`/playlist/${playlist._id}`}>
        <span>view</span>
      </Link>

      <div>
        {playlist.videos.length !== 0 ? (
          playlist.videos
            .slice(0, 5)
            .map((videoId) => (
              <VideoPlaylistCard key={videoId} videoId={videoId} />
            ))
        ) : (
          <div>
            <h3>No videos found in this playlist </h3>
          </div>
        )}
      </div>
    </div>
  );
}
