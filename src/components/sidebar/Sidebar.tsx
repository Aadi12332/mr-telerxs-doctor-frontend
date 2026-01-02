import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "../../assets/dashboardicon.svg";
import ProjectIcon from "../../assets/projecticon.svg";
import MaterialIcon from "../../assets/materialicon.svg";
import TaskIcon from "../../assets/taskicon.svg";
import CommunicationIcon from "../../assets/communicationicon.svg";
import NotificationIcon from "../../assets/notificationicon.svg";
import ReportIcon from "../../assets/reporticon.svg";
import SidenavigationIcon from "../../assets/sidenavigation.svg";
import LeftArrowIcon from "../../assets/left-arrow.svg";
import RightArrowIcon from "../../assets/right-arrow.svg";

type SidebarTab = {
  key: string;
  icon: string;
  path: string;
  label: string;
  bg: string;
  subtitle?: string;
  subtitlepath?: string | undefined;
};

export const SIDEBAR_TABS: SidebarTab[] = [
  {
    key: "dashboard",
    icon: DashboardIcon,
    path: "/",
    label: "Dashboard",
    bg: "#FD8D5B",
  },
  {
    key: "projects",
    icon: ProjectIcon,
    path: "/projects",
    label: "Projects & Calendar",
    bg: "#A855F7",
    subtitle: "Drawings & Attachments",
    subtitlepath: "/drawing-attachment",
  },
  {
    key: "tasks",
    icon: TaskIcon,
    path: "/tasks",
    label: "Tasks & Progress",
    bg: "#FD8D5B",
  },
  {
    key: "materials",
    icon: MaterialIcon,
    path: "/materials",
    label: "Material Requests",
    bg: "#3AB449",
  },
  {
    key: "reports",
    icon: ReportIcon,
    path: "/reports",
    label: "Reports & KPIs",
    bg: "#000000",
  },
  {
    key: "communication",
    icon: CommunicationIcon,
    path: "/communication",
    label: "Communication",
    bg: "#3AB449",
  },
  {
    key: "notifications",
    icon: NotificationIcon,
    path: "/notifications",
    label: "Notification",
    bg: "#000000",
  },
];

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    SIDEBAR_TABS.find((tab) => {
      if (tab.key === "dashboard") {
        return location.pathname === "/";
      }

      if (tab.key === "materials") {
        return (
          location.pathname.startsWith(tab.path) ||
          location.pathname.startsWith("/material-view-page")
        );
      }

      if (tab.key === "projects") {
        return (
          location.pathname.startsWith(tab.path) ||
          location.pathname.startsWith("/project-view-page") ||
          location.pathname.startsWith("/drawing-attachment")
        );
      }

      return location.pathname.startsWith(tab.path);
    })?.key || "dashboard";

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-svh w-[258px]
          bg-[#E5ECFF] overflow-auto
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 flex lg:min-w-[258px]
        `}
        >
        <div className="w-[67px] h-full bg-[#1D51A4] pt-[147px] flex flex-col items-end py-6">
            <button onClick={() => setOpen(false)} className="p-2 lg:hidden absolute top-7 left-4">
              <div className="space-y-[3px]">
                <span className="block w-5 h-[3px] bg-white"></span>
                <span className="block w-5 h-[3px] bg-white"></span>
                <span className="block w-5 h-[3px] bg-white"></span>
              </div>
            </button>
          <div className="flex flex-col items-center">
            {SIDEBAR_TABS.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setOpen(false);
                    navigate(tab.path);
                  }}
                  className="relative h-[74px] w-[54px] flex items-center justify-center"
                >
                  {isActive && <img src={SidenavigationIcon} alt="" />}

                  <img
                    src={tab.icon}
                    alt=""
                    className={
                      isActive
                        ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        : ""
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="pl-5 py-[14px]">
          <div className="mb-7 pr-2">
            <h1 className="text-[17px] font-bold text-[#1D51A4] mb-1">
              Construction User
            </h1>
            <p className="text-[14px] text-[#272C42]">const@steelpro.com</p>
          </div>

          <div className="flex gap-2 items-center mb-6">
            <div className="bg-[#D8DEEA] h-8 flex justify-center cursor-pointer items-center text-[12px] text-[#272C42] px-5 py-2 min-w-[100px]">
              Today
            </div>

            <div className="w-[60px] flex gap-2 items-center">
              <div className="flex-1 flex items-center justify-center cursor-pointer">
                <img src={LeftArrowIcon} alt="" />
              </div>
              <div className="flex-1 flex items-center justify-center cursor-pointer">
                <img src={RightArrowIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {SIDEBAR_TABS.map((tab) => (
              <div key={tab.key} className="h-[74px] flex items-center">
                {activeTab === tab.key && (
                  <div className="flex flex-col gap-3 relative">
                    <p
                      onClick={() => {
                        setOpen(false);
                        navigate(tab.path);
                      }}

                      className="h-[44px] cursor-pointer flex justify-center px-3 min-w-[150px] items-center text-white font-bold text-[15px] rounded-[11px]"
                      style={{ backgroundColor: tab.bg }}
                    >
                      {tab.label}
                    </p>
                    {tab.subtitle && tab.subtitlepath && (
                      <div
                        onClick={() => {navigate(tab.subtitlepath!); setOpen(false);}}
                        className="absolute px-1 py-3 cursor-pointer bg-[#F9FAFB] rounded-[11px] text-center top-[52px] left-0 text-[#A855F7] w-full"
                      >
                        {tab.subtitle}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
