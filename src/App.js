import React from "react";
import { Route, Routes } from "react-router";
import { Explore } from "./components/Explore";
import { Header } from "./components/Header";
import { History } from "./components/History";
import { HomePage } from "./components/HomePage";

import { LikedVideos } from "./components/LikedVideos";
import { Playlist } from "./components/Playlist";
import { VideoPlayer } from "./components/VideoPlayer";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/:videoId" element={<VideoPlayer />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
