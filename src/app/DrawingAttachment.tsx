import { useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import PlusIcon from "../assets/plusicon.svg";
import PdfIcon from "../assets/pdficon.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import DownloadIcon from "../assets/downloadicon.svg";
import DrawingModel from "../components/drawingModel";
import DrawingPreviewModal from "../components/drawingPreviewModel";
const projects = [
  {
    name: "ABC Logistics Warehouse",
    code: "PEB-1021",
    uploadedBy: "Rahul Sharma",
    location: "Pune, Maharashtra",
    updatedOn: "25-April-2025",
    files: [
      {
        id: "PEB-1021-1",
        name: "Architectural Plans.pdf",
        size: "15.2 MB",
        status: "Pending Review",
        key: "Pending",
      },
      {
        id: "PEB-1021-2",
        name: "Structural Drawings.dwg",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
      {
        id: "PEB-1021-3",
        name: "Specifications.docx",
        size: "15.2 MB",
        status: "Revision Required",
        key: "Revision",
      },
    ],
  },
  {
    name: "Metro Cast Factory Shed",
    code: "PEB-0998",
    uploadedBy: "Rahul Sharma",
    location: "Ahmedabad, Gujarat",
    updatedOn: "25-April-2025",
    files: [
      {
        id: "PEB-0998-1",
        name: "Architectural Plans.pdf",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
      {
        id: "PEB-0998-2",
        name: "Structural Drawings.dwg",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
      {
        id: "PEB-0998-3",
        name: "Specifications.docx",
        size: "15.2 MB",
        status: "Approved",
      },
    ],
  },
  {
    name: "Pebson Agro Storage",
    code: "PEB-0872",
    uploadedBy: "Rahul Sharma",
    location: "Indore, MP",
    updatedOn: "25-April-2025",
    files: [
      {
        id: "PEB-0872-1",
        name: "Architectural Plans.pdf",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
      {
        id: "PEB-0872-2",
        name: "Structural Drawings.dwg",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
      {
        id: "PEB-0872-3",
        name: "Specifications.docx",
        size: "15.2 MB",
        status: "Approved",
        key: "Approved",
      },
    ],
  },
];

const statusStyle: Record<string, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  "Revision Required": "bg-red-100 text-red-600",
};

export default function DrawingAttachment() {
  const [openDrawingModel, setDrawingModel] = useState(false);
  const [openDrawingPreviewModel, setDrawingPreviewModel] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold mb-2 leading-[36px]">
            Project Drawings
          </h1>
          <p className="text-[#4B5563] lg:text-[16px] text-[14px]">
            All structural, fabrication, and erection drawings for this project.
          </p>
        </div>
        <div
          className="rounded-[8px] bg-white border border-[#F3F4F6]
                shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
                overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 lg:px-6 px-3 py-4 border-b border-[#0000001A]">
            <p>Projects & Drawings</p>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={() => {
                  setDrawingModel(true);
                }}
                className="bg-[#3F63E1] h-[38px] flex items-center gap-1 text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                <img src={PlusIcon} alt="" />
                Upload Drawings & images
              </button>
              <div className="flex gap-2 items-center px-2 border border-[#D1D5DB] rounded-[8px] h-[38px]">
                <img src={SearchIcon} alt="" />
                <input
                  type="text"
                  placeholder="Search leads, projects..."
                  className="text-[14px] outline-none lg:min-w-[256px] w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:px-6 px-3 py-4">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="
                        rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
                        !shadow-[0px_0px_4px_0px_rgba(0,0,0,0.26)]
                    "
              >
                <div className="flex md:flex-row flex-col gap-6 justify-between items-start mb-6">
                  <div>
                    <p className="text-lg font-semibold text-[#111827]">
                      {project.name}
                    </p>
                    <p className="text-sm text-[#6B7280] mt-1">
                      {project.code}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:gap-10 gap-4 text-sm">
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">Uploaded By:</p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.uploadedBy}
                      </p>
                    </div>
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">Location:</p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.location}
                      </p>
                    </div>
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">Last Update on</p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.updatedOn}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#111827] md:mb-4 mb-6">
                  Attachments & Drawings
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6">
                  {project.files.map((file) => (
                    <div
                      key={file.id}
                      className="relative flex items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] px-5 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                          <img src={PdfIcon} alt="" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#111827]">
                            {file.name}
                          </p>
                          <p className="text-sm text-[#6B7280] mt-1">
                            {file.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button className="hover:opacity-70">
                          <img src={DownloadIcon} alt="" className="min-w-fit" />
                        </button>

                        <button
                          className="hover:opacity-70"
                          onClick={() => {
                            setSelectedFile(file);
                            setSelectedFileId(file.key??"");
                            setDrawingPreviewModel(true);
                          }}
                        >
                          <img src={EyeIcon} alt="" className="min-w-fit" />
                        </button>
                      </div>

                      <span
                        className={`absolute -top-3 right-4 px-4 py-1 rounded-full text-xs font-medium ${
                          statusStyle[file.status]
                        }`}
                      >
                        {file.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DrawingModel
        open={openDrawingModel}
        onClose={() => {
          setDrawingModel(false);
        }}
      />
      <DrawingPreviewModal
        open={openDrawingPreviewModel}
        fileId={selectedFileId ?? ""}
        onClose={() => {
          setDrawingPreviewModel(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
      />
    </>
  );
}
