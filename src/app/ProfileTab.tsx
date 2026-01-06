import { useState } from "react";
import { Input } from "../components/common/Input";
import CameraIcon from "../assets/cameraicon.svg";
import ConfirmUpload from "../assets/confirmuploadicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import CustomSelect from "../components/common/customSelect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OrderTrackingModal from "./OrderTrackingModal";
const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];
export function ProfileTab() {
  const [specialization, setSpecialization] = useState("");
  const [dob, setDob] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const status = "In Transit";

  return (
    <div className="space-y-[30px]">
      <div className="flex items-center gap-6">
        <div className="w-[100px] h-[100px] rounded-full bg-[#D9D9D999] flex items-center justify-center">
          <img src={CameraIcon} alt="" />
        </div>
        <div>
          <button className="bg-[#C8DFFF] text-[#0E1E38] px-4 py-2 rounded-[10px] text-base font-medium">
            Change Photo
          </button>
          <p className="text-sm text-[#00000080] mt-4">
            JPG, PNG. Max size 5MB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="Full Name" value="Dr. John Smith" />
        <Input label="Gender" value="Male" />
        <div>
          <label className="text-[20px] text-[#012047] mb-3 block">DOB</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dob}
              onChange={(newValue) => setDob(newValue)}
              slots={{
                openPickerIcon: () => (
                  <img src={calendaricon} className="w-5 h-5" />
                ),
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  placeholder: "DD/MM/YYYY",
                  InputProps: {
                    sx: {
                      height: "56px",
                      borderRadius: "20px",
                      fontSize: "20px",
                      padding: "0 16px",
                      border: "1px solid #00000033",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                    className:
                      "w-full text-[20px] placeholder:text-[#00000080] outline-none bg-white",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <Input label="Mobile Number" value="+1 (555) 000-0000" />
        <Input label="Email" value="doctor@example.com" />
        <CustomSelect
          title="Specialization"
          data={SPECIALIZATIONS}
          value={specialization}
          onChange={setSpecialization}
          placeholder="ALL"
          openDirection="bottom"
          width="w-full"
          className="rounded-[20px] !text-[20px] !border-[#00000033]"
          labelclassName="!mb-4 !text-[20px] !font-normal"
        />
        <Input label="Years of Experience" value="10" />
        <Input label="Hospital Affiliation" value="412101" />
        <Input label="Language Spoken" value="English" />
      </div>

      <div>
        <label className="block mb-3 text-[20px]">Professional Bio</label>
        <textarea
          placeholder="Tell patients about your experience.."
          className="w-full border rounded-[20px] border-[#00000033] text-[20px] placeholder:text-[#00000080] px-4 py-3 h-28 outline-none"
        />
      </div>

      <div className="border rounded-[20px] border-[#00000033] p-6">
        <p className="text-[20px] mb-6">Medical License Number</p>

        <div className="bg-[#D9D9D966] px-5 py-3 rounded-[20px] flex items-center justify-between bg-gray-50">
          <div className="flex gap-5 items-center">
            <img src={ConfirmUpload} alt="" />
            <div>
              <p className="text-[20px] mb-5">File Name</p>
              <p className="text-[18px] text-[#00000080]">
                Verified on Nov 15, 2024
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <button className="text-[#00598D] text-[18px]">
              Replace/Upload
            </button>
            <button onClick={() => setOpen(true)} className="border border-[#0000004D] px-6 py-2.5 rounded-[10px] text-[18px] bg-white">
              View
            </button>
            {open && (
              <OrderTrackingModal
                status={status}
                onClose={() => setOpen(false)}
              />
            )}  
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#00598D] text-white px-6 py-2 rounded-[10px] text-[16px] font-medium">
          Save changes
        </button>
      </div>
    </div>
  );
}
