import { useState } from "react";

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
    <div className="border border-[#00000033] lg:rounded-[20px] rounded-lg lg:p-6 p-3">
      <h3 className="text-[24px] font-medium lg:mb-[30px] mb-5">Notification Preferences</h3>
    <div className="space-y-3">
      {NOTIFICATION_SETTINGS.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-[#F2F2F2] lg:rounded-[20px] rounded-lg lg:p-10 p-4"
        >
          <p className="lg:text-[22px] text-lg text-[#000]">
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
