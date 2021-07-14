import React from "react";

import { useData } from "../../context/video-context";

import { VideoCardGeneral } from "../Videos";

export function Playlist() {
  const { playlists } = useData();

  return (
    <div className="container">
      <h1>Playlists</h1>
      {playlists.map((item) => (
        <VideoCardGeneral key={item._id} playlist={item} />
      ))}
    </div>
  );
}
