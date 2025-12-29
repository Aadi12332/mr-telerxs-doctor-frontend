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
};

export const SIDEBAR_TABS: SidebarTab[] = [
  {
    key: "dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
    label: "Dashboard",
    bg: "#FD8D5B",
  },
  {
    key: "projects",
    icon: ProjectIcon,
    path: "/projects",
    label: "Projects & Calendar",
    bg: "#A855F7",
    subtitle: "Drawings & Attachments"
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

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

const activeTab =
  SIDEBAR_TABS.find((tab) => {
    if (tab.key === "materials") {
      return (
        location.pathname.startsWith(tab.path) ||
        location.pathname.startsWith("/material-view-page")
      );
    }

    return location.pathname.startsWith(tab.path);
  })?.key || "dashboard";


  return (
    <aside className="h-svh overflow-auto flex items-start min-w-[258px]">
      <div className="w-[67px] h-full bg-[#1D51A4] pt-[147px] flex flex-col items-end py-6 space-y-6">
        <div className="flex flex-col items-center">
          {SIDEBAR_TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => navigate(tab.path)}
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
          <p className="text-[14px] text-[#272C42]">
            const@steelpro.com
          </p>
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
                    className="h-[44px] flex justify-center px-3 min-w-[150px] items-center text-white font-bold text-[15px] rounded-[11px]"
                    style={{ backgroundColor: tab.bg }}
                  >
                    {tab.label}
                  </p>
                  {
                    tab.subtitle &&
                    <div className="absolute px-1 py-3 cursor-pointer bg-[#F9FAFB] rounded-[11px] text-center top-[52px] left-0 text-[#A855F7] w-full">{tab.subtitle}</div>
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
