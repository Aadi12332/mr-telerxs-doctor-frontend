import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsOverview from "../components/cards/StatCard";
import PlusIcon from "../assets/plusicon.svg";
import type { StatItem } from "../components/cards/StatCard";
import EyeIcon from "../assets/EyeIcon.svg";
import CameraIcon from "../assets/cameraicon.svg";
import DoubleCheck from "../assets/tickdoubleicon.svg";
import Dispatch from "../assets/dispatchicon.svg";
import Alert from "../assets/alerticon.svg";
import CustomSelect from "../components/common/CustomSelect";
import IssueReportingModal from "../components/reportingIssueModel";
import RequestMaterialModel from "../components/requestMaterialModel";
import PhotoModel from "../components/photoModel";
import FolderIcon from "../assets/clockicon.svg";
import BoxIcon from "../assets/dispatchicon.svg";
import ShieldCheckIcon from "../assets/SieldIcon";
import RightCheckIcon from "../assets/RightTickIcon";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Pending",
    value: 1,
    icon: FolderIcon,
    bg: "#EAB308"
  },
  {
    key: "completionRate",
    title: "Approved",
    value: 1,
    iconsvg: <RightCheckIcon color="#9333EA" />,
    bg: "#9333EA"
  },
  {
    key: "pendingMaterials",
    title: "Dispatched",
    value: 1,
    icon: BoxIcon,
    bg: "#1D51A4"
  },
  {
    key: "safetyScore",
    title: "Delivered",
    value: 1,
    iconsvg: <ShieldCheckIcon color="#3AB449" />,
    bg: "#3AB449"
  },
];

const requests = [
  {
    id: "1",
    requestNo: "MR-001",
    requestedBy: "John Smith",
    projectName: "Downtown Office Complex",
    projectCode: "PRJ-001",
    material: "Steel Beams",
    quantity: "50 units",
    spec: "Grade A steel required",
    needBy: "2025-02-02",
    delivery: "2025-02-18",
    status: "Approved",
    supplier: "Steel Corp Ltd",
  },
  {
    id: "2",
    requestNo: "MR-002",
    requestedBy: "Sarah Wilson",
    projectName: "Residential Tower A",
    projectCode: "PRJ-002",
    material: "Concrete Mix",
    quantity: "200 cubic meters",
    spec: "High strength concrete",
    needBy: "2025-02-15",
    delivery: "2025-02-14",
    status: "Dispatched",
    supplier: "Concrete Solutions",
  },
  {
    id: "3",
    requestNo: "MR-003",
    requestedBy: "Mike Johnson",
    projectName: "Downtown Office Complex",
    projectCode: "PRJ-001",
    material: "Electrical Cables",
    quantity: "500 units",
    spec: "Fire-resistant cable",
    needBy: "2025-02-25",
    delivery: "TBD",
    status: "Pending",
    supplier: "Electro Tech",
  },
  {
    id: "4",
    requestNo: "MR-004",
    requestedBy: "Tom Brown",
    projectName: "Residential Tower A",
    projectCode: "PRJ-002",
    material: "Ceramic Tiles",
    quantity: "1000 sq ft",
    spec: "Premium quality tiles",
    needBy: "2025-03-01",
    delivery: "2025-02-10",
    status: "Delivered",
    supplier: "Tile Masters",
  },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-purple-100 text-purple-700",
  Dispatched: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Delivered: "bg-green-100 text-green-700",
};

const options = [
  { label: "All Requests", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Pending", value: "pending" },
  { label: "Delivered", value: "delivered" },
];

export default function Materials() {
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();
  const [openReportModel, setReportModel] = useState(false);
  const [openRequestModel, setRequestModel] = useState(false);
  const [openPhotoModel, setPhotoModel] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex xl:flex-row flex-col gap-6 xl:items-center justify-between mb-8">
          <div>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold leading-[36px]">
              Material Requests & Tracking
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CustomSelect
              title="All Requests"
              options={options}
              value={status}
              onChange={setStatus}
            />

            <button
              onClick={() => setReportModel(true)}
              className="
              bg-[#4B5563] text-white
              px-6 flex items-center justify-center rounded-[8px] h-[38px]
              text-sm font-medium
            "
            >
              Issue Reporting
            </button>
            <IssueReportingModal
              open={openReportModel}
              onClose={() => setReportModel(false)}
            />

            <button
              onClick={() => setRequestModel(true)}
              className="bg-[#2563EB] h-[38px] gap-2 text-[14px] flex justify-center items-center text-white px-4 rounded-[8px]"
            >
              <img src={PlusIcon} alt="" />
              Requests Material
            </button>
            <RequestMaterialModel
              open={openRequestModel}
              onClose={() => setRequestModel(false)}
            />
          </div>
        </div>
        <StatsOverview stats={stats} />

        <div className="rounded-[8px] bg-white border border-[#F3F4F6] shadow mt-6 overflow-hidden">
          <div className="overflow-x-auto scroll-hide w-[calc(100vw-26px)] lg:w-[calc(100vw-324px)]">
            <table className="min-w-[900px] w-full border-collapse rounded-[8px]">
              <thead>
                <tr className="text-[12px] uppercase text-[#6B7280] bg-[#F9FAFB] border-b">
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Request</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Project</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Material</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Timeline</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Status</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Supplier</th>
                  <th className="lg:px-6 px-3 lg:py-4 py-3 font-normal text-start">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b last:border-b-0 even:bg-[#F9FAFB]"
                  >
                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-sm text-[#111827]">{r.requestNo}</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        by {r.requestedBy}
                      </p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-sm text-[#111827]">{r.projectName}</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        {r.projectCode}
                      </p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-sm text-[#111827]">{r.material}</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        {r.quantity}
                      </p>
                      <p className="text-xs text-[#6B7280]">{r.spec}</p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <p className="text-sm text-[#111827]">
                        Need by: {r.needBy}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Delivery: {r.delivery}
                      </p>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <span
                        className={`px-4 py-1 rounded-full text-sm ${
                          statusStyle[r.status]
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3 text-sm text-[#111827]">
                      {r.supplier}
                    </td>

                    <td className="lg:px-6 px-3 lg:py-6 py-3">
                      <div className="flex gap-4 text-[#2563EB]">
                        <button
                          onClick={() => navigate("/material-view-page")}
                          className="hover:opacity-70"
                        >
                          <img src={EyeIcon} alt="" className="min-w-fit" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRequestId(r.id);
                            setPhotoModel(true);
                          }}
                          className="hover:opacity-70"
                        >
                          <img src={CameraIcon} alt="" className="min-w-fit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PhotoModel
          open={openPhotoModel}
          requestId={selectedRequestId}
          onClose={() => {
            setPhotoModel(false);
            setSelectedRequestId(null);
          }}
        />

        <div
          className="
            rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6] mt-6
            !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
          "
        >
          <h2 className="text-[18px] font-semibold text-[#111827] mb-6">
            Material Requests & Tracking
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 border border-[#4ADE80] rounded-[8px] p-4 bg-[#F0FDF4]">
              <div className="text-[#166534] mt-1">
                <img src={DoubleCheck} alt="Double Check" />
              </div>
              <div>
                <p className="text-[#166534] font-medium text-[15px]">
                  Inventory Connected
                </p>
                <p className="text-[#166534] text-[13px] mt-1 opacity-80">
                  Real-time stock levels available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-[#6366F1] rounded-[8px] p-4 bg-[#EEF2FF]">
              <div className="text-[#4338CA] mt-1">
                <img src={Dispatch} alt="Dispatch icon" />
              </div>
              <div>
                <p className="text-[#4338CA] font-medium text-[15px]">
                  Auto Dispatch
                </p>
                <p className="text-[#4338CA] text-[13px] mt-1 opacity-80">
                  Automatic delivery scheduling
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-[#FACC15] rounded-[8px] p-4 bg-[#FEFCE8]">
              <div className="text-[#854D0E] mt-1">
                <img src={Alert} alt="Alert Icon" />
              </div>
              <div>
                <p className="text-[#854D0E] font-medium text-[15px]">
                  Low Stock Alerts
                </p>
                <p className="text-[#854D0E] text-[13px] mt-1 opacity-80">
                  Proactive inventory monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
