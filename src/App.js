import React from "react";
import { Route, Routes } from "react-router";
import { Explore } from "./pages/Explore";
import { Header } from "./components/Header";
import { History } from "./pages/History";

import { LikedVideos } from "./pages/LikedVideos";
import { Login } from "./pages/Login";
import { Playlist } from "./pages/Playlist";
import { Signup } from "./pages/Signup";
import { VideoPlayer } from "./pages/VideoPlayer";
import { PrivateRoutes } from "./utils/privateRoutes";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:videoId" element={<VideoPlayer />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <PrivateRoutes path="/playlist" element={<Playlist />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
