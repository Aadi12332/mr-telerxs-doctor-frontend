import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/storage";
import Layout from "../app/layout";

const PublicRoute = () => {
  const token = getToken();
  return token ? <Navigate to="/dashboard" replace /> :<Layout><Outlet /></Layout>;
};

export default PublicRoute;
