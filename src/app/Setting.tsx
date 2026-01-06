import { useState } from "react";
import { ProfileTab } from "./ProfileTab";
import ProfileTabIcon from "../assets/inactiveprofiletab.svg";
import BankTabIcon from "../assets/banktabicon.svg";
import NotificationTabIcon from "../assets/notificationtabicon.svg";
import SecurityTabIcon from "../assets/securitytabicon.svg";
import ActiveProfileTabIcon from "../assets/profiletabicon.svg";
import ActiveBankTabIcon from "../assets/activebanktab.svg";
import ActiveNotificationTabIcon from "../assets/activenotitab.svg";
import ActiveSecurityTabIcon from "../assets/activesecuritytab.svg";
import { SecurityTab } from "./SecurityTab";
import { NotificationTab } from "./NotificationTab";
import { BankAccountTab } from "./BankAccountTab";

const TABS = [
  { key: "profile", label: "Profile", icon: ProfileTabIcon, activeIcon: ActiveProfileTabIcon },
  { key: "bank", label: "Bank account details", icon: BankTabIcon, activeIcon: ActiveBankTabIcon },
  { key: "notification", label: "Notifications", icon: NotificationTabIcon, activeIcon: ActiveNotificationTabIcon },
  { key: "security", label: "Security", icon: SecurityTabIcon, activeIcon: ActiveSecurityTabIcon },
];


export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="min-h-[calc(100vh-160px)] overflow-auto scroll-hide flex flex-col justify-between">
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="text-[28px] font-medium text-[#000]">
            Profile & Settings
          </h2>
          <p className="text-[20px] text-[#00000080]">
            Manage your account and preferences
          </p>
        </div>

        <div className="w-full mb-8">
          <div className="flex gap-6 mb-10 justify-between">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-10 px-6 py-4 rounded-2xl min-w-[220px] min-h-[98px] transition
              ${
                activeTab === tab.key
                  ? "bg-[#0B2A4A] text-white"
                  : "border border-gray-300 text-[#00000066]"
              }
            `}
              >
                    <img
                      src={activeTab === tab.key ? tab.activeIcon : tab.icon}
                      alt=""
                      className="w-10 h-10"
                    />
                <span className="text-[22px]">{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "bank" && <BankAccountTab />}
          {activeTab === "notification" && <NotificationTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </div>
  );
}
