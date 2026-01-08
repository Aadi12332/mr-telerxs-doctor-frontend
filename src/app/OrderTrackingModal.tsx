import successcheckicon from "../assets/successcheckicon.svg";
import pendingalerticon from "../assets/pendingalerticon.svg";
import carriericon from "../assets/carriericon.svg";
import trackingicon from "../assets/trackingicon.svg";
import locationmodalicon from "../assets/localtionmodalicon.svg";

const ORDER_INFO = [
  {
    label: "Medicine",
    value: "Albuterol Inhaler",
    width: "lg:w-[25%] w-[45%]",
  },
  {
    label: "Pharmacy",
    value: "CVS Pharmacy–Main St",
    width: "lg:w-[30%] w-[45%]",
  },
  {
    label: "Order Date",
    value: "2025-12-06",
    width: "lg:w-[20%] w-[45%]",
  },
  {
    label: "Est. Delivery",
    value: "2025-12-08",
    width: "lg:w-[17%] w-[45%] ",
  },
];

const TRACKING_INFO = [
  {
    icon: trackingicon,
    label: "Tracking Number",
    value: "TRK-8901234567",
    width: "lg:w-[33%] sm:w-[45%]",
  },
  {
    icon: carriericon,
    label: "Carrier",
    value: "FedEx",
    width: "lg:w-[23%] sm:w-[45%]",
  },
  {
    icon: locationmodalicon,
    label: "Current Location",
    value: "Distribution Center – Chicago",
    width: "lg:w-[37%] w-[100%]",
  },
];

const getTimelineColumns = (status: OrderStatus) => {
  if (status === "Processing") {
    return [
      {
        lineColor: "bg-[#00000080]",
        steps: [
          {
            icon: pendingalerticon,
            title: "Order Placed",
            date: "2025-12-06 • 10:30 AM",
            active: false,
          },
          {
            icon: pendingalerticon,
            title: "Order Confirmed",
            date: "2025-12-06 • 02:15 PM",
            active: false,
          },
        ],
      },
      {
        lineColor: "bg-[#00000080]",
        steps: [
          {
            icon: pendingalerticon,
            title: "Shipped",
            date: "2025-12-06 • 09:00 AM",
            active: false,
          },
          {
            icon: pendingalerticon,
            title: "In Transit",
            date: "2025-12-07 • 03:45 PM",
            active: false,
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
  }

  if (status === "In Transit") {
    return [
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
  }

  if (status === "Delivered") {
    return [
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
        lineColor: "bg-[#3E8E2B]",
        steps: [
          {
            icon: successcheckicon,
            title: "Out for Delivery",
            date: "2025-12-08",
            active: true,
          },
          {
            icon: successcheckicon,
            title: "Delivered",
            date: "2025-12-08",
            active: true,
          },
        ],
      },
    ];
  }

  return [
    {
      lineColor: "bg-[#000000]",
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
      steps: [
        {
          icon: successcheckicon,
          title: "Cancelled",
          date: "2025-12-07 • 09:00 AM",
          active: true,
        },
      ],
    },
  ];
};

type OrderTrackingModalProps = {
  status: OrderStatus;
  onClose: () => void;
};

export type OrderStatus = "In Transit" | "Delivered" | "Processing" | "Cancelled"|string;

const STATUS_STYLES: Record<OrderStatus, string> = {
  "In Transit": "bg-[#3E70B1]",
  Delivered: "bg-[#5DBB4D]",
  Processing: "bg-[#9B5DE5]",
  Cancelled: "bg-[#D63A2E]",
};

export const STATUS_STYLES_bg: Record<OrderStatus, string> = {
  "In Transit": "bg-[#CDE1FF80]",
  Delivered: "bg-[#DDFDDD80]",
  Processing: "bg-[#F4EEF999]",
  Cancelled: "bg-[#FFC8C866]",
};

export default function OrderTrackingModal({
  status,
  onClose,
}: OrderTrackingModalProps) {
  const TIMELINE_COLUMNS = getTimelineColumns(status);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white max-h-[100vh] overflow-auto scroll-hide w-[100vw] lg:p-6 p-3">
        <div className="flex justify-end items-start mb-4">
          <button
            onClick={onClose}
            className="border border-[#0000004D] px-5 sm:py-2 py-1.5 rounded-[8px] sm:text-[20px] text-base"
          >
            Hide
          </button>
        </div>

        <div
          className={`xl:rounded-[20px] rounded-lg xl:px-16 sm:px-5 p-3 xl:py-12 sm:py-5 ${
            STATUS_STYLES_bg[status as OrderStatus] || "bg-gray-100"
          }`}
        >
          <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-2 gap-4">
            <div className="flex-1">
              <div className="flex items-center xl:max-w-[500px] max-w-[400px] w-full justify-between">
                <p className="xl:text-[32px] sm:text-[24px] text-[20px] font-medium text-[#000]">
                  ORD-2025-001
                </p>
                <span
                  className={`text-white px-4 py-1 rounded-full xl:text-[15px] text-[13px] font-medium ${
                    STATUS_STYLES[status as OrderStatus] || "bg-gray-400"
                  }`}
                >
                  {status}
                </span>
              </div>
              <p className="xl:text-[24px]  sm:text-[20px] text-[16px] text-[#00000080]">
                Sarah Johnson
              </p>
            </div>

            <div className="md:text-right">
              <p className="xl:text-[24px] sm:text-[20px] text-[16px] text-[#00000080]">
                Expected Delivery
              </p>
              <p className="xl:text-[28px] sm:text-[24px] text-[20px] text-[#000]">
                2025-12-20
              </p>
            </div>
          </div>

          <div className="flex flex-wrap lg:gap-10 gap-6 mb-6 md:mt-16 mt-6">
            {ORDER_INFO.map((item, i) => (
              <div key={i} className={`${item.width}`}>
                <p className="xl:text-[24px] sm:text-[20px] text-[16px] text-[#00000080]">
                  {item.label}
                </p>
                <p className="xl:text-[26px] sm:text-[22px] text-[16px] font-medium text-[#000]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg lg:rounded-[20px] xl:p-6 p-3 flex flex-wrap items-center gap-6">
            {TRACKING_INFO.map((item, i) => (
              <div
                key={i}
                className={`flex xl:gap-5 gap-3 items-center ${item.width}`}
              >
                <img src={item.icon} alt="" className="lg:w-10 w-7" />
                <div>
                  <p className="xl:text-[22px] text-[18px] font-medium text-[#00000080]">
                    {item.label}
                  </p>
                  <p className="xl:text-[24px] sm:text-[20px] text-[16px] text-[#000] font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[24px] font-semibold text-[#000] mt-10 mb-4">
            Delivery Timeline
          </p>

          <div className="bg-white rounded-lg lg:rounded-[20px] xl:p-6 p-3">
            <div className="grid md:grid-cols-3 md:gap-10 gap-6">
              {TIMELINE_COLUMNS.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="relative flex flex-col md:items-center gap-6 md:mb-0 mb-[110px] last:mb-0"
                >
                  {colIndex !== 0 && (
                    <div
                      className={`absolute -top-[110px] md:hidden left-[100px] md:left-1/2 -translate-x-1/2 w-[4px] h-[93px] rounded-full ${
                        status === "Cancelled" ? "bg-black" : col.lineColor
                      }`}
                    />
                  )}

                  {col.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex flex-col md:items-center gap-6"
                    >
                      <div className="flex items-center xl:gap-10 gap-3">
                        <img
                          src={step.icon}
                          alt=""
                          className="xl:w-[47px] w-[30px]"
                        />

                        <div className="xl:w-[250px] w-[200px]">
                          <p
                            className={`xl:text-[26px] sm:text-[22px] text-[18px] font-medium ${
                              step.active ? "text-[#000]" : "text-[#00000080]"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="xl:text-[18px] text-sm text-[#00000080] xl:mt-1">
                            {step.date}
                          </p>
                        </div>
                      </div>

                      {stepIndex === 0 && (
                        <div
                          className={`w-[4px] h-[93px] ${col.lineColor} rounded-full relative left-[100px] md:left-[unset] `}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {status === "Cancelled" && (
              <p className="text-[#DD2424] lg:text-[26px] sm:text-xl text-base mt-6 text-end">
                Cancellation Reason: Patient requested cancellation
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
