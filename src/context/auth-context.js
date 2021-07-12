import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../constants/urlConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const persistUser = ({ user, token }) => {
    setUser(user);
    setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    localStorage?.setItem("authUser", JSON.stringify(user));
    localStorage?.setItem("authToken", JSON.stringify(token));
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const {
        data: { token, user, success, message },
      } = await axios.post(`${BASE_URL}/user/signup`, {
        name,
        email,
        password,
      });

      if (success) {
        persistUser({ token, user });
      }
      return { user, message, success };
    } catch (err) {
      console.error(err.message);
      return { message: err.message, success: false };
    }
  };

  const login = async ({ email, password }) => {
    console.log({ email, password });
    try {
      const {
        data: { token, user, success, message },
      } = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      if (success) {
        persistUser({ user, token });
      }
      return { user, message, success };
    } catch (err) {
      console.error(err.message);
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("authUser");
    localStorage?.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ login, signUp, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
