import {
  Clock,
  CheckCircle,
  Loader,
  XCircle,
  Truck,
  RefreshCcw,
  Package,
} from "lucide-react";
import OrderTrackingModal, { type OrderStatus } from "./OrderTrackingModal";
import { useEffect, useState } from "react";
import { getOrderList, getOrdersByDoctorApi } from "../api/auth.api";
import toast from "react-hot-toast";

const STATUS_CONFIG: any = {
  pending: {
    title: "Pending",
    bg: "bg-orange-50",
    text: "text-orange-600",
    icon: Clock,
  },
  confirmed: {
    title: "Confirmed",
    bg: "bg-green-50",
    text: "text-green-600",
    icon: CheckCircle,
  },
  processing: {
    title: "Processing",
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: Loader,
  },
  shipped: {
    title: "Shipped",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    icon: Truck,
  },
  delivered: {
    title: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: Package,
  },
  cancelled: {
    title: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    icon: XCircle,
  },
  refunded: {
    title: "Refunded",
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: RefreshCcw,
  },
};

export default function MedicineOrder() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | string>(
    "Cancelled",
  );
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orderCounts, setOrderCounts] = useState("");
  const filteredOrders = orders;

const handleOrder = async () => {
  try {
    setLoading(true);

    const res = await getOrderList({
      page,
      limit: 10,
      status: activeTab === "All" ? undefined : activeTab,
    });

    setPagination(res.data?.pagination);

    if (activeTab === "All") {
      setOrderCounts(res.data?.statusCounts);
    }

    const apiOrders = res.data?.data || [];
    const mappedOrders = apiOrders.map((item: any) => ({
      orderid: item._id,
      id: item.orderNumber,
      name: item.shippingAddress?.fullName || "Patient",
      medicine: item.items?.[0]?.medicationName || "N/A",
      status: item.status,
      dateLabel: item.dateLabel || "Order Date",
      date: new Date(item.createdAt).toLocaleDateString(),
    }));

    setOrders(mappedOrders);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
    setInitialLoading(false); // 👈 important
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
      console.log({ data });
      setSelectedOrder(data);
      setOpen(true);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

useEffect(() => {
  handleOrder();
}, [page, activeTab]);

  const cards = Object.entries(orderCounts || {}).map(([key, value]) => ({
    key,
    count: value,
    ...STATUS_CONFIG[key],
  }));

  const tabs = [{ key: "All", title: "All" }, ...cards];

  const getPagination = () => {
    const total = pagination?.pages || 0;
    const current = page;
    const delta = 1;

    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
      rangeWithDots.push("...", total);
    } else {
      if (total > 1) rangeWithDots.push(total);
    }

    return rangeWithDots;
  };

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
          {initialLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 lg:rounded-[20px] rounded-lg px-6 py-8 flex flex-col items-center justify-center animate-pulse"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full mb-4 animate-pulse" />
                  <div className="h-5 bg-gray-300 rounded w-16 mb-2 animate-pulse" />
                  <div className="h-6 bg-gray-300 rounded w-12 animate-pulse" />
                </div>
              ))
            : cards.map((item: any) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.key}
                    className={`${item.bg} lg:rounded-[20px] rounded-lg px-6 py-8 flex flex-col items-center justify-center`}
                  >
                    <div className={`text-3xl mb-4 ${item.text}`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <p className="text-[18px] font-medium text-[#111827] mb-2">
                      {item.title}
                    </p>

                    <p className={`text-[22px] font-semibold ${item.text}`}>
                      {item.count}
                    </p>
                  </div>
                );
              })}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 mt-16">
          <div className="bg-[#EFF1F4] rounded-3xl p-2 w-fit flex items-center md:gap-3 gap-1">
            {loading
              ? [1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="md:px-6 px-3 py-2 rounded-full bg-gray-300 w-16 h-8 animate-pulse"
                  />
                ))
              : tabs.map((tab: any) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setPage(1);
                    }}
                    className={`md:px-6 px-3 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === tab.key
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#EFF1F4] lg:rounded-[28px] rounded-lg md:px-11 px-3 md:py-8 py-3 flex flex-col sm:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-1 sm:w-[400px] justify-between">
                      <div className="h-6 bg-gray-300 rounded w-32 animate-pulse" />
                      <div className="h-6 bg-gray-300 rounded-full w-24 animate-pulse" />
                    </div>

                    <div className="h-4 bg-gray-300 rounded w-40 mb-6 animate-pulse" />
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="sm:text-right">
                      <div className="h-3 bg-gray-300 rounded w-24 mb-3 animate-pulse" />
                      <div className="h-4 bg-gray-300 rounded w-20 mb-5 animate-pulse" />
                    </div>

                    <div className="h-10 bg-gray-300 rounded-xl w-20 animate-pulse" />
                  </div>
                </div>
              ))}
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
            filteredOrders.map((item: any) => {
              const statusKey = item.status?.toLowerCase();
              const statusConfig = STATUS_CONFIG[statusKey];

              return (
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
                          statusConfig
                            ? `${statusConfig.bg} ${statusConfig.text}`
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {statusConfig?.title || item.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">{item.name}</p>
                    <p className="text-gray-500">{item.medicine}</p>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="sm:text-right">
                      <p className="text-gray-400 text-sm mb-1">
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
              );
            })}
          {pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <div className="flex items-center gap-2">
                {getPagination().map((p, i) =>
                  p === "..." ? (
                    <span key={i} className="px-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setPage(p as number)}
                      className={`px-3 py-1 rounded ${
                        page === p ? "bg-black text-white" : "bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
              </div>

              <button
                disabled={page === pagination?.pages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
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
