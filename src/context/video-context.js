import { createContext, useContext, useReducer } from "react";
import { initialState, videoReducer } from "../reducers";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
