// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/storage";

const ProtectedRoute = () => {
  const token = getToken();
  console.log("token", token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

