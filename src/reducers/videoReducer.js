import { isVideoPresentInUserSelection } from "../utils/videoUtils";
import {
  ADD_NEW_PLAYLIST,
  ADD_TO_HISTORY,
  CLEAR_SEARCH,
  REMOVE_FROM_HISTORY,
  SET_SEARCH_TEXT,
  SET_VIDEO_LIST,
  TOGGLE_LIKE,
  TOGGLE_PLAYLIST,
} from "./actionTypes";

export const initialState = {
  videoList: [],
  likedVideos: [],
  history: [],
  playlist: [
    {
      listId: 1,
      name: "Watch later",
      videos: [],
    },
  ],
  searchText: "",
};

export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_VIDEO_LIST:
      return { ...state, videoList: payload };

    case TOGGLE_LIKE:
      return {
        ...state,
        likedVideos: isVideoPresentInUserSelection(state.likedVideos, payload)
          ? state.likedVideos.filter((video) => video !== payload)
          : state.likedVideos.concat(payload),
      };

    case ADD_NEW_PLAYLIST:
      if (payload.newList) {
        return {
          ...state,
          playlist: state.playlist.concat({
            listId: state.playlist.length + 1,
            name: payload.newList,
            videos: [payload.id],
          }),
        };
      } else {
        return { ...state };
      }

    case TOGGLE_PLAYLIST:
      const list = state.playlist.find(
        (list) => list.listId === payload.listId
      );
      const isVideo = list.videos.some((videoId) => videoId === payload.id);

      return {
        ...state,
        playlist: state.playlist.map((item) =>
          item.listId === list.listId
            ? {
                ...item,
                videos: isVideo
                  ? item.videos.filter((videoId) => videoId !== payload.id)
                  : item.videos.concat(payload.id),
              }
            : item
        ),
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: state.history.some((videoId) => videoId === payload)
          ? state.history
              .filter((videoId) => videoId !== payload)
              .concat(payload)
          : state.history.concat(payload),
      };

    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: state.history.filter((videoID) => videoID !== payload),
      };

    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };

    case CLEAR_SEARCH: {
      return {
        ...state,
        searchText: "",
      };
    }
    default:
      return state;
  }
};
