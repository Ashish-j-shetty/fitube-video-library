import axios from "axios";
export const serverRequest = async (url, requestType) => {
  switch (requestType) {
    case "GET":
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
          return { response: data, error: false };
        } else {
          throw new Error();
        }
      } catch (error) {
        return { response: error, error: true };
      }
    default:
      throw new Error("Unknown request type");
  }
};
