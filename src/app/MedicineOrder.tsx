import TransitIcon from "../assets/transfericon.svg";
import DeliveredIcon from "../assets/deliveredicon.svg";
import ProcessingIcon from "../assets/processingicon.svg";
import CancelledIcon from "../assets/closeordericon.svg";
import OrderTrackingModal from "./OrderTrackingModal";
import { useState } from "react";

const STATUS_CARDS = [
  {
    title: "In Transit",
    count: 1,
    bg: "bg-[#E6F0FF]",
    text: "text-[#1F5A8F]",
    icon: TransitIcon,
  },
  {
    title: "Delivered",
    count: 1,
    bg: "bg-[#E8FFE1]",
    text: "text-[#2E7D32]",
    icon: DeliveredIcon,
  },
  {
    title: "Processing",
    count: 1,
    bg: "bg-[#F3EDF9]",
    text: "text-[#7C3AED]",
    icon: ProcessingIcon,
  },
  {
    title: "Cancelled",
    count: 1,
    bg: "bg-[#FAD3CF]",
    text: "text-[#8B1C13]",
    icon: CancelledIcon,
  },
];

const orders = [
  {
    id: "ORD-2025-001",
    name: "Sarah Johnson",
    medicine: "Albuterol Inhaler",
    status: "In Transit",
    dateLabel: "Est. Delivery",
    date: "2025-12-20",
  },
  {
    id: "ORD-2025-002",
    name: "Michael Chen",
    medicine: "Hydrocortisone Cream 1%",
    status: "Delivered",
    dateLabel: "Delivered",
    date: "2025-12-08",
  },
  {
    id: "ORD-2025-003",
    name: "Emily Davis",
    medicine: "Sumatriptan 50mg",
    status: "Processing",
    dateLabel: "Est. Delivery",
    date: "2025-12-08",
  },
  {
    id: "ORD-2025-004",
    name: "Robert Williams",
    medicine: "Lisinopril 10mg",
    status: "Cancelled",
    dateLabel: "Cancelled",
    date: "2025-12-06",
  },
];

export default function MedicineOrder() {
  const [open, setOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="text-[28px] font-medium text-[#000]">
            Medicine Order Tracking
          </h2>
          <p className="text-[20px] text-[#00000080]">
            Monitor prescription fulfillment and delivery status
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATUS_CARDS.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} rounded-2xl px-6 py-8 flex flex-col items-center justify-center`}
            >
              <div className={`text-3xl mb-4 ${item.text}`}>
                <img src={item.icon} alt="" />
              </div>

              <p className="text-[18px] font-medium text-[#111827] mb-2">
                {item.title}
              </p>

              <p className={`text-[22px] font-semibold ${item.text}`}>
                {item.count}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {orders.map((item) => (
            <div
              key={item.id}
              className="bg-[#EFF1F4] rounded-[28px] px-11 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-1 lg:w-[400px] justify-between">
                  <h3 className="text-lg font-semibold text-black">
                    {item.id}
                  </h3>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      item.status === "In Transit"
                        ? "bg-blue-600 text-white"
                        : item.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : item.status === "Processing"
                        ? "bg-purple-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{item.name}</p>
                <p className="text-gray-500">{item.medicine}</p>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-3">{item.dateLabel}</p>
                  <p className="text-black font-medium mb-5">{item.date}</p>
                </div>

                <button
                    onClick={() => {
    setSelectedStatus(item.status);
    setOpen(true);
  }}
                  className="bg-white px-6 py-2 rounded-xl shadow-sm font-medium"
                >
                  View
                </button>
              </div>
            </div>
          ))}
{open && (
  <OrderTrackingModal
    status={selectedStatus}
    onClose={() => setOpen(false)}
  />
)}        </div>
      </div>
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
