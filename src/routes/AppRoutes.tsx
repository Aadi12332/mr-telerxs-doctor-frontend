import { Routes, Route } from "react-router-dom";
import Dashboard from "../app/Dashboard";
import Login from "../pages/Login";
import Layout from "../app/layout";
import Otp from "../pages/Otp";
import ForgetPassword from "../pages/ForgetPassword";
import NewCredential from "../pages/NewCredential";
import Signup from "../pages/SignUp";
// import Setting from "../app/Setting";
import Consultation from "../app/Consultation";
import MedicineOrder from "../app/MedicineOrder";
import Message from "../app/Message";
// import AddBank from "../app/AddBank";

export default function AppRoutes() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/new-credential" element={<NewCredential />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/settings" element={<Setting />} /> */}
          <Route path="/consultations" element={<Consultation />} />
          <Route path="/medicine-orders" element={<MedicineOrder />} />
          <Route path="/messages" element={<Message />} />
          {/* <Route path="/add-bank" element={<AddBank />} /> */}
        </Route>
      </Routes>
  );
}
