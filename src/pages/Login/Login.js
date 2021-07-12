import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, user } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, [navigate, user]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const { success, message } = await login({ email, password });

    if (success) {
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setError(message);
    }
  };

  return (
    <div className="login--container">
      {error && <div>{error}</div>}
      <h3>Login to Fitcart</h3>
      <form className="login--form" onSubmit={(e) => loginHandler(e)}>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button className="btn--login" type="submit">
          Login
        </button>
      </form>

      <Link to="/signup" className="login--text">
        Dont have account ? <span className="text--highlight">Sign Up!</span>{" "}
      </Link>
    </div>
  );
}
