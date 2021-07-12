import React from "react";
import { Route, Routes } from "react-router";
import { Explore } from "./pages/Explore";
import { Header } from "./pages/Header";
import { History } from "./pages/History";
//import { HomePage } from "./components/HomePage";

import { LikedVideos } from "./pages/LikedVideos";
import { Playlist } from "./pages/Playlist";
import { VideoPlayer } from "./pages/VideoPlayer";

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
