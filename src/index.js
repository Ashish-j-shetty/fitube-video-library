import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import { setupMockServer } from "./api/mock-server";

setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <App />
      </VideoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
