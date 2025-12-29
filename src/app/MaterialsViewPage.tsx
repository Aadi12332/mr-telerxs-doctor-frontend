import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsOverview from "../components/cards/StatCard";
import type { StatItem } from "../components/cards/StatCard";
import BackArrow from "../assets/backarrowicon.svg";
import PlusIcon from "../assets/plusicon.svg";
import UploadImg from "../assets/uploadimg.png";
import UploadCamera from "../assets/uploadcameraicon.svg";
import RequestMaterialModel from "../components/requestMaterialModel";
import PhotoModel from "../components/photoModel";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Pending",
    value: 1,
  },
  {
    key: "completionRate",
    title: "Approved",
    value: 1,
  },
  {
    key: "pendingMaterials",
    title: "Dispatched",
    value: 1,
  },
  {
    key: "safetyScore",
    title: "Delivered",
    value: 1,
  },
];


export default function MaterialsViewPage() {
  const navigate = useNavigate();
  const [openRequestModel, setRequestModel] = useState(false);
  const [openPhotoModel, setPhotoModel] = useState(false);

  const photos = [
    UploadImg,
    UploadImg,
    UploadImg,
    UploadImg,
    UploadImg,
  ];
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-start mb-8 gap-5">
                <button onClick={() => navigate("/materials")}
                  className="
                    flex items-center gap-2
                    bg-[#3F63E1] text-white
                    px-3
                    h-[40px]
                    rounded-[8px]
                    text-[14px] font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  <img src={BackArrow} alt="" />
                  <span>Back</span>
                </button>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold leading-[36px]">
              Statement of Work (SOW)
            </h1>
        </div>
        <StatsOverview stats={stats} />
      </div>
      <div
        className="
          rounded-[8px] p-6 border !bg-white border-[#F3F4F6]
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Project Details
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">ID:</span> PRJ-001
            </p>

            <p className="text-sm text-[#111827] mb-4">
              <span className="font-medium">Project:</span>{" "}
              Downtown Office Complex
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#111827] font-medium">
                Status:
              </span>
              <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
                Approved
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Assigned Manager
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-lg font-medium">
                JS
              </div>

              <div>
                <p className="text-sm font-medium text-[#111827]">
                  John Smith
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  MR-001
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-[#6B7280] mb-3">
              Timeline
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">Start:</span>{" "}
              2024-01-15
            </p>

            <p className="text-sm text-[#111827] mb-3">
              <span className="font-medium">End:</span>{" "}
              2024-08-30
            </p>

            <p className="text-sm text-[#6B7280]">
              Duration: 7.5
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#4CAF50] w-[55%] rounded-full" />
          </div>

          <div className="grid grid-cols-4 mt-4 text-center">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Order Placed
              </p>
              <p className="text-xs text-green-600 mt-1">
                2024-01-15
              </p>
            </div>

            <div>
              <p className="text-sm text-green-600 font-medium">
                Approved
              </p>
              <p className="text-xs text-green-600 mt-1">
                2024-01-18
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B7280] font-medium">
                Dispatched
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B7280] font-medium">
                Delivered
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-[8px] p-6 border !bg-white border-[#F3F4F6]
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div
          className="
            flex items-center justify-between
          "
        >
          <div>
            <p className="text-[14px] uppercase text-[#6B7280] mb-2">
              Requested Material
            </p>
            <p className="text-sm font-medium text-[#111827]">
              Steel Beams
            </p>
            <p className="text-sm text-[#6B7280] mt-1">
              Grade A steel required
            </p>
          </div>

          <button onClick={() => setRequestModel(true)}
            className="
              flex items-center gap-2
              bg-[#3F63E1] text-white
              px-5 py-3 rounded-lg
              text-sm font-medium
              hover:opacity-90 transition
            "
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
      <div
        className="
          rounded-[8px] p-6 border !bg-white border-[#F3F4F6]
          !shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
        "
      >
        <p className="text-xs uppercase text-[#6B7280] mb-4">
          Photos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map((src, idx) => (
            <div
              key={idx}
              className="h-[150px] rounded-[8px] bg-[#F3F4F6]"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover border-2 border-dashed rounded-[8px]"
              />
            </div>
          ))}

          <div onClick={() => {
                          setPhotoModel(true);
                        }}
            className="
              h-[150px]
              rounded-lg border-2 border-dashed
              flex flex-col items-center justify-center
              text-center cursor-pointer
              text-[#6B7280]
              hover:bg-[#F9FAFB]
            "
          >
            <div className="text-2xl mb-2">
              <img src={UploadCamera} alt="" />
            </div>
            <p className="text-sm">
              Click to upload photos or drag and drop
            </p>
            <p className="text-xs mt-1">
              PNG, JPG up to 10MB each
            </p>
          </div>
          <PhotoModel
              open={openPhotoModel}
              onClose={() => {
                setPhotoModel(false);
              }}
            />
        </div>
      </div>
    </div>
  );
}
