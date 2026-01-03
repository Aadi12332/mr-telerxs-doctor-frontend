import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/storage";

const PublicRoute = () => {
  const token = getToken();

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
      <Outlet />
  );
};

export default PublicRoute;

