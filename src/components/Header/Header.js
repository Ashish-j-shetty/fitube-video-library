import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./header.css";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  async function authBtnHandler() {
    if (user) {
      await logout();

      navigate("/", { state: { from: pathname } });
    } else {
      navigate("/login", { state: { form: pathname } });
    }
  }
  return (
    <nav className="nav">
      <NavLink to="/" className="logo">
        FitTube
      </NavLink>
      <div className="desktop--menu">
        <ul className="flex flex-center">
          <NavLink className="header_nav__link " to="/">
            Home
          </NavLink>
          <NavLink className="header_nav__link" to="/playlist">
            Playlist
          </NavLink>
          <NavLink className="header_nav__link" to="/account">
            Account
          </NavLink>
          <span className="header_nav__link " onClick={authBtnHandler}>
            {user ? "Logout" : "Login"}
          </span>
        </ul>
      </div>
    </nav>
  );
}
