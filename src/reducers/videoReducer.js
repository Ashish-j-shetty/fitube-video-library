import {
  CLEAR_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  INITIALIZE_PLAYLISTS,
  INITIALIZE_VIDEOS,
  TOGGLE_PLAYLIST,
  UPDATE_PLAYLIST,
} from "./actionTypes";

export const initialState = {
  videos: [],
  playlists: [],
};

const addToPlaylist = (state, videoId, playlistId) => ({
  ...state,

  playlists: state.playlists.map((item) => {
    return item._id === playlistId
      ? { ...item, videos: [...item.videos, videoId] }
      : item;
  }),
});

const removeFromPlalist = (state, videoId, playlistId) => {
  return {
    ...state,
    playlists: state.playlists.map((item) => {
      return item._id === playlistId
        ? { ...item, videos: item.videos.filter((video) => video !== videoId) }
        : item;
    }),
  };
};

export const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case INITIALIZE_VIDEOS:
      return { ...state, videos: payload };

    case INITIALIZE_PLAYLISTS:
      return { ...state, playlists: payload };

    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            name: payload.playlistName,
            _id: payload._id,
            videos: [payload.videoId],
          },
        ],
      };

    case TOGGLE_PLAYLIST:
      const currentPlaylist = state.playlists.find(
        (playlist) => playlist._id === payload.playlistId
      );

      const isInPlaylsit = currentPlaylist.videos.find(
        (video) => video === payload.videoId
      );

      return isInPlaylsit
        ? removeFromPlalist(state, payload.videoId, payload.playlistId)
        : addToPlaylist(state, payload.videoId, payload.playlistId);

    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map((item) =>
          item._id === payload._id ? { ...item, name: payload.name } : item
        ),
      };

    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlistId.filter(
          (item) => item._id === payload.playlistId
        ),
      };

    case CLEAR_PLAYLIST:
      return {
        ...state,
        playlists: [],
      };

    default:
      return state;
  }
};
