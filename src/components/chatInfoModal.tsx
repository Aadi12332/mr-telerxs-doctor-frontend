import { useState } from "react";
import CloseIcon from "../assets/closeicon.svg";
import MegaphoneIcon from "../assets/megaphoneicon.svg";
import FileIcon from "../assets/fileicon.svg";
import DownloadIcon from "../assets/downloadchaticon.svg";
import MuteIcon from "../assets/muteicon.svg";
import AddUserIcon from "../assets/addusericon.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChatInfoDrawer({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"members" | "files">("members");

  if (!open) return null;

  return (
    <div className="absolute right-[-1px] top-0 -bottom-[1px] inset-0 z-50 flex justify-end">
      <div className="w-[332px] h-full bg-white flex flex-col shadow-[0px_4px_4px_0px_#00000040]">
        <div className="p-4 flex items-center gap-8">
          <button onClick={onClose}>
            <img src={CloseIcon} alt="close" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <img src={MegaphoneIcon} alt="" />
            </div>

            <div>
                <p className="font-semibold text-[#111827]">Marketing Team</p>
                <p className="text-sm text-[#6B7280]">2 members · Marketing</p>
            </div>
          </div>
        </div>

        <p className="px-4 text-sm text-[#6B7280]">
          Marketing department discussions and campaigns
        </p>

        <button className="flex items-center justify-center gap-2 px-4 py-4 pt-6 text-[#6B7280]">
           <img src={MuteIcon} alt="" />
           Mute
        </button>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex-1 py-3 text-sm ${
              activeTab === "members"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-[#6B7280] border-b-2 border-transparent"
            }`}
          >
            Members
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`flex-1 py-3 text-sm ${
              activeTab === "files"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-[#6B7280] border-b-2 border-transparent"
            }`}
          >
            Files
          </button>
        </div>

        <div className="flex-1 overflow-auto scroll-hide p-4">
          {activeTab === "members" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#111827]">John Doe</p>
                  <p className="text-sm text-[#6B7280]">Marketing</p>
                </div>
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  Admin
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-[#111827]">James Wilson</p>
                  <p className="text-sm text-[#6B7280]">Marketing</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-[#111827]">James Wilson</p>
                  <p className="text-sm text-[#6B7280]">Marketing</p>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 !mt-6 w-full">
                <img src={AddUserIcon} alt="" />
                 Add member
              </button>
            </div>
          )}

          {activeTab === "files" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <img src={FileIcon} alt="" />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-[#111827]">
                    Q1-Marketing-Budget-2024
                  </p>
                  <p className="text-sm text-[#6B7280]">Sarah Johnson</p>
                </div>

                <button>
                  <img src={DownloadIcon} alt="download" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <img src={FileIcon} alt="" />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-[#111827]">
                    Campaign-Strategy-Deck
                  </p>
                  <p className="text-sm text-[#6B7280]">Michael Chen</p>
                </div>

                <button>
                  <img src={DownloadIcon} alt="download" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <img src={FileIcon} alt="" />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-[#111827]">
                    Market-Research-Report
                  </p>
                  <p className="text-sm text-[#6B7280]">Emily Davis</p>
                </div>

                <button>
                  <img src={DownloadIcon} alt="download" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
