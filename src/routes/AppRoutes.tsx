import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Dashboard from "../app/Dashboard";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
    
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
