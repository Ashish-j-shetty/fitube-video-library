import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function SignUp() {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, [navigate, user]);

  const onChangeHandler = (evt) => {
    setFromData((state) => ({ ...state, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await signUp(formData);
  };

  return (
    <div className="login--container">
      <h3>Signup to FitTube</h3>
      <form className="login--form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={onChangeHandler}
        />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={onChangeHandler}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={onChangeHandler}
        />
        <button className="btn--login" type="submit">
          Signup
        </button>
      </form>
      <Link to="/login" className="login--text">
        Have account ? <span className="text--highlight">Login!</span>{" "}
      </Link>
    </div>
  );
}
