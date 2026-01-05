import { useState } from "react";
import { Input } from "../components/common/Input";

const NOTIFICATION_SETTINGS = [
  { id: "consultation", label: "New patient consultation requests" },
  { id: "messages", label: "Patient messages" },
  { id: "prescription", label: "Prescription updates" },
  { id: "payment", label: "Payment notifications" },
  { id: "policy", label: "Platform policy updates" },
  { id: "reports", label: "Weekly performance reports" },
];
export function NotificationTab() {
    const [toggles, setToggles] = useState<Record<string, boolean>>({
    consultation: false,
    messages: false,
    prescription: false,
    payment: false,
    policy: false,
    reports: false,
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="border border-[#00000033] rounded-[20px] p-6">
      <h3 className="text-[24px] font-medium mb-[30px]">Notification Preferences</h3>
    <div className="space-y-3">
      {NOTIFICATION_SETTINGS.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-[#F2F2F2] rounded-2xl p-10"
        >
          <p className="text-[22px] text-[#000]">
            {item.label}
          </p>

          <button
            onClick={() => handleToggle(item.id)}
            className={`w-[52px] h-[28px] rounded-full relative transition ${
              toggles[item.id]
                ? "bg-[#042F4D]"
                : "bg-white border border-[#888888]"
            }`}
          >
            <span
              className={`absolute w-[22px] h-[22px] rounded-full transition ${
                toggles[item.id]
                  ? "right-[3px] top-[3px] bg-white"
                  : "left-[3px] top-[2px] bg-[#888888]"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}
