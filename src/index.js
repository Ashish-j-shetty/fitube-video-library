import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import { AuthProvider } from "./context/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <App />
        </VideoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
