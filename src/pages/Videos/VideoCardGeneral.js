import { Link } from "react-router-dom";
import { useVideo } from "../../context/video-context";
import { getImage } from "../../utils/videoUtils";
import "./video.css";

export function VideoCardGeneral({ videoId, remove, listId }) {
  const {
    state: { videoList },
  } = useVideo();

  const { title } = videoList.find((video) => video.id === videoId);

  return (
    <div className="card mr-1 ">
      <Link className="link " to={`/${videoId}`}>
        <img
          className="video-thumbnail"
          src={getImage(videoId)}
          alt="video-thumbnail"
        />
        <div className="video--title">{title}</div>
      </Link>
      <span
        className="btn--cross"
        onClick={() => {
          remove({ videoId, listId });
        }}
      >
        <i className="fas fa-times-circle"></i>
      </span>
    </div>
  );
}
