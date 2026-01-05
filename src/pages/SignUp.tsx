import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import medicationcompany from "../assets/medicationcompanylogo.svg";
import backarrowicon from "../assets/backlongarrow.svg";
import profileimg from "../assets/profileimg.svg";
import cameraicon from "../assets/cameraicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import uploadicon from "../assets/uploadicon.svg";
import CustomSelect from "../components/common/customSelect";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

export default function Signup() {
  const navigate = useNavigate();
  const [dob, setDob] = useState<any>(null);
  const [specialization, setSpecialization] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-[#fff]">
      <div className="bg-white py-2 border-b border-[#E6E8EE]">
        <header className="flex items-center justify-between max-w-[1440px] px-3 mx-auto">
          <img src={medicationcompany} alt="Company" className="h-[53px]" />
          <h2 className="text-2xl font-bold text-black">
            Complete Your Profile
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-[#0B1C39] text-white px-4 py-1.5 rounded-full text-[13px] font-medium"
          >
            <img src={backarrowicon} alt="Back" className="w-4 h-4" />
            Back
          </button>
        </header>
      </div>

      <div className="px-3 py-[70px] h-[calc(100vh-71px)] overflow-auto scroll-hide">
        <div className="bg-[#F9F9F9] border border-[#E6E8EE] rounded-2xl shadow-sm max-w-[960px] mx-auto">
          <div className="flex justify-center border-b border-[#E6E8EE] p-5">
            <div className="flex items-center gap-6 border border-[#E6E8EE] rounded-[10px] p-5">
              <img
                src={profileimg}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="w-24 h-24 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                <img src={cameraicon} alt="Camera" className="" />
              </button>
            </div>
          </div>

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              <Input label="First Name" defaultValue="John" />
              <Input label="Last Name" defaultValue="Doe" />
              <Input label="Middle Initial" defaultValue="-" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Gender" defaultValue="Male" />

              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  DOB
                </label>
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
                            borderRadius: "8px",
                            fontSize: "14px",
                            padding: "0 16px",
                            border: "1px solid #D9D9D9",
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
                            "w-full text-[14px] placeholder:text-[#465D7C] outline-none bg-white",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <Input label="Email" defaultValue="johndoe@gmail.com" />
              <Input label="Mobile Number" defaultValue="0987654321" />

              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  Upload Medical License Number
                </label>
                <label
                  className="
                    w-full
                    h-[56px]
                    flex items-center justify-between
                    border border-[#D9D9D9]
                    rounded-lg bg-white
                    px-4
                    cursor-pointer
                  "
                >
                  <span className="text-[14px] text-[#465D7C] truncate">
                    {file ? file.name : "Browse File"}
                  </span>

                  <img src={uploadicon} className="w-5 h-5" />

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              <CustomSelect
                title="Specialization"
                data={SPECIALIZATIONS}
                value={specialization}
                onChange={setSpecialization}
                placeholder="ALL"
                openDirection="bottom"
                width="w-full"
              />

              <Input label="Years of Experience" defaultValue="10" />
              <Input label="Hospital Affiliation" defaultValue="412101" />
              <Input label="Language Spoken" defaultValue="English" />
            </div>

            <div className="mt-6">
              <label className="text-base font-medium text-[#012047] mb-1 block">
                Professional Bio
              </label>
              <textarea className="w-full border rounded-lg px-4 py-3 h-28 outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={() => navigate("/login")} className="px-12 py-2 max-w-[383px] w-full rounded-[14px] text-white text-base font-medium bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)]">
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, defaultValue }: any) {
  return (
    <div>
      <label className="text-base font-medium text-[#012047] mb-1 block">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className="w-full text-[14px] placeholder:text-[#465D7C] h-[56px] flex items-center border border-[#D9D9D9] rounded-lg px-4 py-2 outline-none"
      />
    </div>
  );
}
