export const getImage = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const getVideo = (id) => `https://www.youtube.com/watch?v=${id}`;

export const dateFormatter = (date) => {
  const formatDate = new Date(date);
  return formatDate.toDateString().substring(4);
};

export const isVideoPresentInUserSelection = (videoList, id) =>
  videoList.some((video) => video === id);
