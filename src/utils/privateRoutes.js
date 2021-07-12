import React from "react";
import { Navigate, Route, useParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function PrivateRoutes({ path, ...props }) {
  const { user } = useAuth();
  const { playlistId } = useParams();

  const orignalPath = playlistId ? `/playlist/${playlistId}` : path;

  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: orignalPath }} replace to="/login" />
  );
}
