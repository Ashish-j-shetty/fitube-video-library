import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteIcon, PencilIcon } from "../../assets/icons";
import SkeletonVideo from "../../components/Skeleton/SkeletonVideo";
import { useData } from "../../context/video-context";
import { VideoCard } from "../Videos";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const { playlists, videos, dispatch } = useData();

  console.log("videos", videos);
  console.log("playlists", playlists);

  const playlist = playlists.find((item) => item._id === playlistId);

  console.log("playlist", playlist);

  const [isEdit, setIsEdit] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistNameElement = useRef(null);

  return playlist ? (
    <div>
      <div>
        <input
          readOnly={!isEdit}
          ref={playlistNameElement}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.targe.value)}
        />
      </div>
      <div>
        <PencilIcon /> <DeleteIcon />
      </div>
      <div>
        {playlist?.videos.length !== 0 ? (
          playlist?.videos?.map((video) => {
            const { id } = videos.find((item) => video === item._id);
            return <VideoCard videoId={id} />;
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
