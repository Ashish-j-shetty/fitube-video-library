import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export function Header() {
  return (
    <nav className="nav">
      <NavLink to="/" className="logo">
        FitTube
      </NavLink>
      <div>
        <ul className="flex flex-center">
          <NavLink className="header_nav__link " to="/liked-videos">
            Liked
          </NavLink>
          <NavLink className="header_nav__link" to="/playlist">
            Playlist
          </NavLink>
          <NavLink className="header_nav__link" to="/history">
            History
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
