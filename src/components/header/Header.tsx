import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import locationicon from "../../assets/locationicon.svg";
import backarrowicon from "../../assets/backlongarrow.svg";
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
    path: "#",
    activePaths: ["/settings", "/add-bank"],
  },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [locationList, setLocationList] = useState("Pune");

  return (
    <>
      <div className="bg-white">
        <header className="h-[103px] flex items-center justify-between max-w-[1440px] mx-auto w-full lg:px-6 px-3 shadow-sm">
          <div className="flex gap-3 items-center">
            <img src={Logo} alt="" className="w-[108px]" />
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
                  src={backarrowicon}
                  alt="Dropdown"
                  className={`w-5 ml-4 transition invert -rotate-90`}
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
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center pl-5 pr-2 py-3 border border-[#D1D5DB] rounded-[8px] h-[48px]">
              <input
                type="text"
                placeholder="Search for Medicine, orders, or names…"
                className="outline-none lg:min-w-[486px] sm:w-[170px] w-[120px] placeholder:text-[#9F9F9F] text-[16px]"
              />
              <img src={SearchIcon} alt="" />
            </div>
          </div>
        </header>
      </div>
      <div className="w-full bg-[#F2F2F2] shadow-sm z-10">
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
    </>
  );
}
