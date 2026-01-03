import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

const NO_HEADER_ROUTES = [
  "/login",
  "/otp",
  "/signup",
  "/forget-password",
  "/new-credential",
];

export default function Layout() {
  const location = useLocation();

  const hideHeader = NO_HEADER_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex min-h-screen bg-[#E5ECFF]">
      <div className="flex flex-1 flex-col">
        {!hideHeader && <Header />}

        <main
          className={`overflow-auto scroll-hide bg-white ${
            hideHeader ? "h-screen" : "h-[calc(100vh-159px)]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
