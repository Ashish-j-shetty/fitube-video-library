import { createServer, Model, RestSerializer } from "miragejs";
import { data } from "./data";

export const setupMockServer = () => {
  createServer({
    serializers: {
      application: RestSerializer,
    },
    models: {
      video: Model,
    },
    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("videos");
    },
    seeds(server) {
      data.forEach((element) => {
        server.create("video", element);
      });
    },
  });
};
