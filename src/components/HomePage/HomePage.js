import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export function HomePage() {
  return (
    <div>
      <div className="hero image-overlay">
        <div className="hero-text">Let's Start working out</div>
        <div>
          <Link to="/demo">
            <button className="btn bg-primary  m-1">Login</button>
          </Link>
          <Link to="/explore">
            <button className="btn m-1">Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
