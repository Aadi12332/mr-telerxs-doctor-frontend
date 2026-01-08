import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import locationicon from "../../assets/locationicon.svg";
import downarroricon from "../../assets/downarrowicon.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import Logo from "../../assets/logo.svg";

const LOCATIONS = ["Pune", "Mumbai", "Delhi", "Bangalore"];

const TABS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Consultations", path: "/consultations" },
  { label: "Medicine Orders", path: "/medicine-orders" },
  { label: "Messages", path: "/messages" },
  {
    label: "Settings",
    path: "/settings",
    activePaths: ["/settings", "/add-bank"],
  },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [locationList, setLocationList] = useState("Pune");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="bg-white">
        <header className="lg:h-[103px] h-[70px] flex items-center justify-between max-w-[1440px] mx-auto w-full lg:px-6 px-3 shadow-sm">
          <div className="flex gap-3 items-center">
            <img src={Logo} alt="" className="lg:w-[108px] w-[80px]" onClick={()=>navigate("/dashboard")}/>
            <div className="relative w-full max-w-[520px] hidden lg:block">
              <div
                onClick={() => setOpen(!open)}
                className="
                  flex items-center justify-between
                  bg-[#88888824]
                  rounded-[12px]
                  px-3
                  py-2.5
                  cursor-pointer
                  shadow-sm
                "
              >
                <div className="flex items-center gap-1">
                  <img src={locationicon} alt="Location" className="w-6" />
                  <span className="text-[#1F5A8F] text-[16px] font-semibold">
                    Delivering to:
                  </span>
                  <span className="text-[#4F4F4F] text-[16px] font-semibold">
                    {locationList}
                  </span>
                </div>

                  <img
                    src={downarroricon}
                    alt="Dropdown"
                    className={`lg:w-4 w-3 ml-4 transition-transform duration-300 ease-in-out ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
              </div>

              {open && (
                <div className="absolute left-0 right-0 mt-3 bg-white rounded-xl shadow-lg overflow-hidden z-[11]">
                  {LOCATIONS.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setLocationList(item);
                        setOpen(false);
                      }}
                      className="px-6 py-3 text-[16px] hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center lg:pl-5 pl-2 pr-2 py-3 border border-[#D1D5DB] rounded-[8px] lg:h-[48px] h-10">
              <input
                type="text"
                placeholder="Search for Medicine, orders, or names…"
                className="outline-none lg:min-w-[486px] sm:w-[170px] w-[120px] placeholder:text-[#9F9F9F] lg:text-[16px] text-sm"
              />
              <img src={SearchIcon} alt="" className="w-5 lg:w-6" />
            </div>
            <div
              className="lg:hidden cursor-pointer text-[#000]"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="3"
                  y="16"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </header>
      </div>
      <div className="w-full bg-[#F2F2F2] shadow-sm z-10 hidden lg:block">
        <div className="max-w-[1440px] mx-auto lg:px-6 px-3">
          <div className="flex items-center justify-between gap-16 h-[56px]">
            {TABS.map((tab) => {
              const isActive = tab.activePaths
                ? tab.activePaths.some((p) => location.pathname.startsWith(p))
                : location.pathname === tab.path;

              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={`relative h-full flex items-center text-[18px] font-semibold transition ${
                    isActive ? "text-[#1F5A8F]" : "text-[#4F4F4F]"
                  }`}
                >
                  <>
                    {tab.label}
                    {isActive && (
                      <span className="absolute left-0 -bottom-[5px] w-full h-[5px] bg-[#1F5A8F] rounded-b-md" />
                    )}
                  </>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" />

          <div
            ref={sidebarRef}
            className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl py-3 px-3"
          >
            <div className="flex flex-col gap-6">
              <img src={Logo} alt="" className="lg:w-[108px] w-[80px] mb-5" />
              <div className="relative w-full max-w-[520px]">
                <div
                  onClick={() => setOpen(!open)}
                  className="
                  flex items-center justify-between
                  bg-[#88888824]
                  rounded-[12px]
                  px-3
                  py-2.5
                  cursor-pointer
                  shadow-sm
                "
                >
                  <div className="flex items-center gap-1">
                    <img src={locationicon} alt="Location" className="w-6" />
                    <span className="text-[#1F5A8F] text-[16px] font-semibold">
                      Delivering to:
                    </span>
                    <span className="text-[#4F4F4F] text-[16px] font-semibold">
                      {locationList}
                    </span>
                  </div>

                  <img
                    src={downarroricon}
                    alt="Dropdown"
                    className={`lg:w-5 w-3 ml-4 transition-transform duration-300 ease-in-out ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {open && (
                  <div className="absolute left-0 right-0 mt-3 bg-white rounded-xl shadow-lg overflow-hidden z-[11]">
                    {LOCATIONS.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setLocationList(item);
                          setOpen(false);
                        }}
                        className="px-6 py-3 text-[16px] hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {TABS.map((tab) => {
                const isActive = tab.activePaths
                  ? tab.activePaths.some((p) => location.pathname.startsWith(p))
                  : location.pathname === tab.path;

                return (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`text-[18px] font-semibold border rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-[#1F5A8F] text-white border-[#1F5A8F]"
                        : "text-[#4F4F4F] border-[#4F4F4F]"
                    }`}
                  >
                    {tab.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
