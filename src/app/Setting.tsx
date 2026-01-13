import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { useAuth } from "../routes/AuthContext";
import { getProfileApi } from "../api/auth.api";

const TABS = [
  { key: "profile", label: "Profile", icon: ProfileTabIcon, activeIcon: ActiveProfileTabIcon },
  { key: "bank", label: "Bank account details", icon: BankTabIcon, activeIcon: ActiveBankTabIcon },
  { key: "notification", label: "Notifications", icon: NotificationTabIcon, activeIcon: ActiveNotificationTabIcon },
  { key: "security", label: "Security", icon: SecurityTabIcon, activeIcon: ActiveSecurityTabIcon },
];

export default function Setting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const { auth } = useAuth();
  const user = auth?.user;
  const doctor = auth?.doctor;
  const [loading,setLoading]=useState(false)
  console.log(loading)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, []);
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfileApi({
        doctorId:doctor?._id
      });
      console.log({res})
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(user?._id)
    fetchProfile()
  },[user?._id])
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  return (
    <div className="lg:min-h-[calc(100vh-160px)] min-h-[calc(100vh-70px)] overflow-auto scroll-hide flex flex-col justify-between">
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
            Profile & Settings
          </h2>
          <p className="text-base lg:text-[20px] text-[#00000080]">
            Manage your account and preferences
          </p>
        </div>

        <div className="w-full mb-8">
          <div className="flex xl:gap-6 gap-3 mb-10 md:justify-between flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center xl:gap-10 gap-3 lg:px-6 px-3 lg:py-4 py-2 lg:rounded-[20px] rounded-lg xl:min-w-[220px] lg:min-h-[98px] min-h-[50px] transition
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
                  className="lg:w-10 lg:h-10 sm:w-6 w-5"
                />
                <span className="lg:text-[22px] sm:text-[18px] text-base">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {activeTab === "profile" && <ProfileTab user={user} doctor={doctor} />}
          {activeTab === "bank" && <BankAccountTab user={user} doctor={doctor}/>}
          {activeTab === "notification" && <NotificationTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </div>
  );
}
