import successcheckicon from "../assets/successcheckicon.svg";
import pendingalerticon from "../assets/pendingalerticon.svg";
import carriericon from "../assets/carriericon.svg";
import trackingicon from "../assets/trackingicon.svg";
import locationmodalicon from "../assets/localtionmodalicon.svg";

const ORDER_INFO = [
  {
    label: "Medicine",
    value: "Albuterol Inhaler",
    width: "w-[27%]",
  },
  {
    label: "Pharmacy",
    value: "CVS Pharmacy–Main St",
    width: "w-[32%]",
  },
  {
    label: "Order Date",
    value: "2025-12-06",
    width: "w-[22%]",
  },
  {
    label: "Est. Delivery",
    value: "2025-12-08",
    width: "min-w-max",
  },
];

const TRACKING_INFO = [
  {
    icon: trackingicon,
    label: "Tracking Number",
    value: "TRK-8901234567",
    width: "w-[37%]",
  },
  {
    icon: carriericon,
    label: "Carrier",
    value: "FedEx",
    width: "w-[26%]",
  },
  {
    icon: locationmodalicon,
    label: "Current Location",
    value: "Distribution Center – Chicago",
    width: "w-[37%]",
  },
];

const TIMELINE_COLUMNS = [
  {
    lineColor: "bg-[#3E8E2B]",
    steps: [
      {
        icon: successcheckicon,
        title: "Order Placed",
        date: "2025-12-06 • 10:30 AM",
        active: true,
      },
      {
        icon: successcheckicon,
        title: "Order Confirmed",
        date: "2025-12-06 • 02:15 PM",
        active: true,
      },
    ],
  },
  {
    lineColor: "bg-[#3E8E2B]",
    steps: [
      {
        icon: successcheckicon,
        title: "Shipped",
        date: "2025-12-06 • 09:00 AM",
        active: true,
      },
      {
        icon: successcheckicon,
        title: "In Transit",
        date: "2025-12-07 • 03:45 PM",
        active: true,
      },
    ],
  },
  {
    lineColor: "bg-[#00000080]",
    steps: [
      {
        icon: pendingalerticon,
        title: "Out for Delivery",
        date: "2025-12-08",
        active: false,
      },
      {
        icon: pendingalerticon,
        title: "Delivered",
        date: "2025-12-08",
        active: false,
      },
    ],
  },
];

type OrderTrackingModalProps = {
  status: string | null;
  onClose: () => void;
};

type OrderStatus = "In Transit" | "Delivered" | "Processing" | "Cancelled";

const STATUS_STYLES: Record<OrderStatus, string> = {
  "In Transit": "bg-[#3E70B1]",
  Delivered: "bg-[#5DBB4D]",
  Processing: "bg-[#9B5DE5]",
  Cancelled: "bg-[#D63A2E]",
};

const STATUS_STYLES_bg: Record<OrderStatus, string> = {
  "In Transit": "bg-[#CDE1FF80]",
  Delivered: "bg-[#DDFDDD80]",
  Processing: "bg-[#F4EEF999]",
  Cancelled: "bg-[#FFC8C866]",
};

export default function OrderTrackingModal({
  status,
  onClose,
}: OrderTrackingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white max-h-[100vh] overflow-auto scroll-hide w-[100vw] p-6">
        <div className="flex justify-end items-start mb-4">
          <button
            onClick={onClose}
            className="border border-[#0000004D] px-5 py-2 rounded-[8px] text-[20px]"
          >
            Hide
          </button>
        </div>

        <div className={`rounded-[20px] px-16 py-12 ${
                    STATUS_STYLES_bg[status as OrderStatus] || "bg-gray-100"
                  }`}>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center max-w-[500px] w-full justify-between">
                <p className="text-[32px] font-medium text-[#000]">
                  ORD-2025-001
                </p>
                <span
                  className={`text-white px-4 py-1 rounded-full text-[15px] font-medium ${
                    STATUS_STYLES[status as OrderStatus] || "bg-gray-400"
                  }`}
                >
                  {status}
                </span>
              </div>
              <p className="text-[24px] text-[#00000080]">Sarah Johnson</p>
            </div>

            <div className="text-right">
              <p className="text-[24px] text-[#00000080]">Expected Delivery</p>
              <p className="text-[28px] text-[#000]">2025-12-20</p>
            </div>
          </div>

          <div className="flex gap-10 mb-6 mt-16">
            {ORDER_INFO.map((item, i) => (
              <div key={i} className={item.width}>
                <p className="text-[24px] text-[#00000080]">{item.label}</p>
                <p className="text-[26px] font-medium text-[#000]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[20px] p-6 flex items-center gap-6">
            {TRACKING_INFO.map((item, i) => (
              <div key={i} className={`flex gap-5 items-center ${item.width}`}>
                <img src={item.icon} alt="" />
                <div>
                  <p className="text-[22px] font-medium text-[#00000080]">
                    {item.label}
                  </p>
                  <p className="text-[24px] text-[#000] font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[24px] font-semibold text-[#000] mt-10 mb-4">
            Delivery Timeline
          </p>

          <div className="grid grid-cols-3 gap-10 bg-white rounded-[20px] p-6">
            {TIMELINE_COLUMNS.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col items-center gap-6">
                {col.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="flex items-center gap-10">
                      <img src={step.icon} alt="" />

                      <div className="w-[250px]">
                        <p
                          className={`text-[26px] font-medium ${
                            step.active ? "text-[#000]" : "text-[#00000080]"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-[18px] text-[#00000080] mt-1">
                          {step.date}
                        </p>
                      </div>
                    </div>

                    {stepIndex === 0 && (
                      <div
                        className={`w-[4px] h-[93px] ${col.lineColor} rounded-full`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
