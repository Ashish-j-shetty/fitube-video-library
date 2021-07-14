import { createContext, useContext, useReducer } from "react";
import { initialState, reducerFunc } from "../reducers";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <VideoContext.Provider
      value={{
        videos: state.videos,
        playlists: state.playlists,
        users: state.users,
        searchValue: state.searchValue,
        dispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useData() {
  return useContext(VideoContext);
}
