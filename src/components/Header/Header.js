import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "../../assets/icons";
import { useAuth } from "../../context/auth-context";
import "./header.css";

export function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
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
  let classname = showMenu
    ? "menuDrawer menuDrawerActive "
    : "menuDrawerHidden";
  return (
    <>
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
        <div className="mobile__nav">
          <button
            className="btn__user--action hamburger"
            onClick={() => setShowMenu((showMenu) => !showMenu)}
          >
            <HamburgerIcon />
          </button>
          <div
            className={classname}
            onClick={() => setShowMenu((showMenu) => !showMenu)}
          >
            <ul className="flex flex-coloumn ">
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
        </div>
      </nav>
    </>
  );
}
