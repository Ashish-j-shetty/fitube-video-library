import React from "react";

import { useData } from "../../context/video-context";

import { VideoCardGeneral } from "../Videos";

export function Playlist() {
  const { playlists } = useData();

  return (
    <div className="playlist--container">
      <h1>Playlists</h1>

      {playlists.map((item) => (
        <div className="playlists" key={item._id}>
          <VideoCardGeneral key={item._id} playlist={item} />
        </div>
      ))}
    </div>
  );
}
