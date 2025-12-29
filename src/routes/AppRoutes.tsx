import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Dashboard from "../app/Dashboard";
import Projects from "../app/Projects";
import Tasks from "../app/Tasks";
import Materials from "../app/Materials";
import Reports from "../app/Reports";
import Communication from "../app/Communication";
import Notifications from "../app/Notifications";
import MaterialsViewPage from "../app/MaterialsViewPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/material-view-page" element={<MaterialsViewPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
