// routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/storage";

const PublicRoute = () => {
  const token = getToken();
  console.log("protexttoken", token);
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
