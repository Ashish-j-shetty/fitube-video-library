import React, { useEffect } from "react";
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
import { useData } from "./context/video-context";
import { useAuth } from "./context/auth-context";
import axios from "axios";
import { BASE_URL } from "./constants/urlConfig";
import {
  INITIALIZE_PLAYLISTS,
  INITIALIZE_VIDEOS,
} from "./reducers/actionTypes";

function App() {
  const { dispatch } = useData();
  const { user } = useAuth();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${BASE_URL}/video`);
        const { videos } = response.data;

        dispatch({ type: INITIALIZE_VIDEOS, payload: videos });
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    user &&
      (async function () {
        try {
          const response = await axios.get(
            `${BASE_URL}/playlists/${user.userId}`
          );

          const { playlists } = response.data;

          dispatch({ type: INITIALIZE_PLAYLISTS, payload: playlists });
        } catch (error) {
          console.error(error.message);
        }
      })();
  }, [dispatch, user]);

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
