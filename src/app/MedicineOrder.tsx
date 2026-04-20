import TransitIcon from "../assets/transfericon.svg";
import DeliveredIcon from "../assets/deliveredicon.svg";
import ProcessingIcon from "../assets/processingicon.svg";
import CancelledIcon from "../assets/closeordericon.svg";
import OrderTrackingModal, { type OrderStatus } from "./OrderTrackingModal";
import { useEffect, useState } from "react";
import {
  getOrderList,
  getOrdersByDoctorApi,
} from "../api/auth.api";
import toast from "react-hot-toast";

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

export default function MedicineOrder() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | string>(
    "Cancelled",
  );
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  const filteredOrders =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

  const handleOrder = async () => {
    try {
      setLoading(true);

      const res = await getOrderList();
      const apiOrders = res.data?.data || [];
      const mappedOrders = apiOrders.map((item: any) => ({
        orderid: item._id,
        // orderid: "69e5eb50ba0c00629bbffd73",
        id: item.orderNumber,
        name: item.shippingAddress?.fullName || "Patient",
        medicine: item.items?.[0]?.medicationName || "N/A",
        status:
          item.status === "confirmed"
            ? "Processing"
            : item.status === "delivered"
              ? "Delivered"
              : item.status === "cancelled"
                ? "Cancelled"
                : "In Transit",
        dateLabel:
          item.status === "delivered"
            ? "Delivered"
            : item.status === "cancelled"
              ? "Cancelled"
              : "Est. Delivery",
        date: new Date(item.createdAt).toLocaleDateString(),
      }));

      setOrders(mappedOrders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

const handleOrderDetails = async (orderId: string) => {
  try {
    const res = await getOrdersByDoctorApi(orderId);

    const data = res.data?.data;

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.tracking_available === false) {
      toast.error("Tracking not available for this order");
      return;
    }
console.log({data})
    setSelectedOrder(data);
    setOpen(true);
  } catch (err: any) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Something went wrong");
  }
};

  useEffect(() => {
    handleOrder();
  }, []);

  const getCount = (status: string) =>
    orders.filter((o) => o.status === status).length;

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
            Medicine Order Tracking
          </h2>
          <p className="text-base lg:text-[20px] text-[#00000080]">
            Monitor prescription fulfillment and delivery status
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-3 mb-8">
          {STATUS_CARDS.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} lg:rounded-[20px] rounded-lg px-6 py-8 flex flex-col items-center justify-center`}
            >
              <div className={`text-3xl mb-4 ${item.text}`}>
                <img src={item.icon} alt="" />
              </div>

              <p className="text-[18px] font-medium text-[#111827] mb-2">
                {item.title}
              </p>

              <p className={`text-[22px] font-semibold ${item.text}`}>
                {getCount(item.title)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-[#EFF1F4] rounded-3xl p-2 w-fit flex items-center md:gap-3 gap-1">
            {["All", "In Transit", "Delivered", "Processing", "Cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`md:px-6 px-3 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Fetching your orders...</p>
            </div>
          )}

          {!loading && filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                className="w-20 h-20 mb-4 opacity-70"
              />
              <p className="text-lg font-medium text-gray-700 mb-1">
                No orders found
              </p>
              <p className="text-sm text-gray-500">
                You don’t have any orders in this category
              </p>
            </div>
          )}

          {!loading &&
            filteredOrders.map((item: any) => (
              <div
                key={item.id}
                className="bg-[#EFF1F4] lg:rounded-[28px] rounded-lg md:px-11 px-3 md:py-8 py-3 flex flex-col sm:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1 sm:w-[400px] justify-between">
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

                <div className="flex flex-col sm:items-end">
                  <div className="sm:text-right">
                    <p className="text-gray-400 text-sm mb-3">
                      {item.dateLabel}
                    </p>
                    <p className="text-black font-medium mb-5">{item.date}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStatus(item.status);
                      handleOrderDetails(item.orderid);
                    }}
                    className="bg-white px-6 py-2 rounded-xl shadow-sm font-medium"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {open && (
        <OrderTrackingModal
          status={selectedStatus}
          order={selectedOrder}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[16px] text-[#b0b0b0] font-medium">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
// const orders = [
//   {
//     id: "ORD-2025-001",
//     name: "Sarah Johnson",
//     medicine: "Albuterol Inhaler",
//     status: "In Transit",
//     dateLabel: "Est. Delivery",
//     date: "2025-12-20",
//   },
//   {
//     id: "ORD-2025-002",
//     name: "Michael Chen",
//     medicine: "Hydrocortisone Cream 1%",
//     status: "Delivered",
//     dateLabel: "Delivered",
//     date: "2025-12-08",
//   },
//   {
//     id: "ORD-2025-003",
//     name: "Emily Davis",
//     medicine: "Sumatriptan 50mg",
//     status: "Processing",
//     dateLabel: "Est. Delivery",
//     date: "2025-12-08",
//   },
//   {
//     id: "ORD-2025-004",
//     name: "Robert Williams",
//     medicine: "Lisinopril 10mg",
//     status: "Cancelled",
//     dateLabel: "Cancelled",
//     date: "2025-12-06",
//   },
// ];
