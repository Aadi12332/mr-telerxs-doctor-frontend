import {  useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import backarrowicon from "../assets/backlongarrowicon.svg";
import profileimg from "../assets/profileimg.svg";
import cameraicon from "../assets/cameraicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import uploadicon from "../assets/uploadicon.svg";
import addnewicon from "../assets/addnewicon.svg";

type Props = {
  onClose: () => void;
  refill?: boolean;
  doctorId?:any
};

export default function IntakeFormModal({ onClose, refill }: Props) {
  const [dob, setDob] = useState<any>(null);
  const [items, setItems] = useState<string[]>([
    "Tri-Sprintec",
    "Tri-ESrythromycin-benzoyl peroxide gelprintec benzoyl peroxide gel",
  ]);
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
 
  const handleAdd = () => {
    if (!value.trim()) return;
    setItems([...items, value.trim()]);
    setValue("");
    setShowInput(false);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-[#80A2B5] w-full relative h-svh overflow-auto scroll-hide py-20 px-3">
        <button onClick={onClose} className="absolute lg:left-6 left-3 top-6 text-2xl">
          <img src={backarrowicon} alt="" />
        </button>

        <div className="max-w-[960px] mx-auto bg-[#F9F9F9] pb-1 rounded-[20px]">
          <div className="flex justify-center border-b border-[#E6E8EE] p-5">
            <div className="flex items-center gap-6 border border-[#E6E8EE] bg-white rounded-[10px] p-5">
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

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              <Input label="First Name" defaultValue={"John"}/>
              <Input label="Last Name" defaultValue="Doe" />
              <Input label="Middle Initial" defaultValue="-" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                          },
                          className:
                            "w-full text-[14px] placeholder:text-[#465D7C] outline-none bg-white",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Email" defaultValue="johndoe@gmail.com" />
              <Input label="Mobile Number" defaultValue="0987654321" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Work Phone Number" defaultValue="0987654321" />
              <Input label="Primary Phone Number" defaultValue="0987654321" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input
                label="Address"
                defaultValue="Black Purl Society, Baner, Pune"
              />
              <Input label="City" defaultValue="Pune" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="State" defaultValue="Maharashtra" />
              <Input label="Zip" defaultValue="412101" />
            </div>

            <div className="mb-5">
              <Input label="Marital Status" defaultValue="Single" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Government Issued Identification"
                defaultValue="---- ---- ----"
              />

              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  Upload Image
                </label>
                <label className="w-full h-[56px] flex items-center justify-between border border-[#D9D9D9] rounded-lg bg-white px-4 cursor-pointer">
                  <span className="text-[14px] text-[#465D7C]">
                    Browse File
                  </span>
                  <img src={uploadicon} className="w-5 h-5" />
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-4">
              Emergency Contact
            </h3>

            <div className="mb-5">
              <Input label="Relationship to Contact" defaultValue="Brother" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              <Input label="First Name" defaultValue="John" />
              <Input label="Middle Name" defaultValue="-" />
              <Input label="Last Name" defaultValue="Doe" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Email" defaultValue="johndoe@gmail.com" />
              <Input label="Mobile Number" defaultValue="0987654321" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Primary Phone" defaultValue="0987654321" />
              <Input label="Work Phone Number" defaultValue="0987654321" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input
                label="Address"
                defaultValue="Black Purl Society, Baner, Pune"
              />
              <Input label="City" defaultValue="Pune" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="State" defaultValue="Maharashtra" />
              <Input label="Zip" defaultValue="412101" />
            </div>
          </div>

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
              Medical Question
            </h3>

            <div className="mb-5">
              <Input label="List Your Past Medical History" placeholder="Add" />
            </div>

            <div className="mb-5">
              <Input label="Current Medications" placeholder="Add" />
            </div>

            <div className="mb-5">
              <Input label="Medications Allergy" placeholder="Add" />
            </div>

            {refill ? (
              <>
                <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
                  Medication Refills
                </h3>
                {showInput && (
                  <input
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add"
                    className="w-full mb-6 text-[14px] placeholder:text-[#465D7C] h-[56px] flex items-center border border-[#D9D9D9] rounded-lg px-4 py-2 outline-none"
                  />
                )}
                <div className="flex flex-wrap gap-3 mb-5">
                  {items.map((item, index) => (
                    <div
                      key={index} title={item}
                      className="flex items-center gap-3 px-4 h-[56px] border border-[#D9D9D9] rounded-lg text-[14px]"
                    >
                      <span className="truncate w-fit break-words max-w-[50vw] text-[#465D7C]">
                        {item}
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center justify-between gap-4 px-4 h-[56px] border border-[#D9D9D9] rounded-lg text-[16px] text-[#465D7C]"
                  >
                    Add New
                    <img src={addnewicon} alt="" />
                  </button>
                </div>

                <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
                  Your Pharmacy Details
                </h3>
              </>
            ) : (
              <>
                <div className="mb-5">
                  <Input
                    label="Please List Your Preferred Pharmacies"
                    placeholder="Add"
                  />
                </div>

                <div className="mb-5">
                  <Input label="Pharmacy Name" defaultValue="Pharmacy" />
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input
                label="Address"
                defaultValue="Black Purl Society, Baner, Pune"
              />
              <Input label="City" defaultValue="Pune" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="State" defaultValue="Maharashtra" />
              <Input label="Zip" defaultValue="412101" />
            </div>

            <div>
              <Input
                label="How did you hear about us?"
                defaultValue="Website"
              />
            </div>
            <div className={`flex ${refill ? "justify-end" : "justify-center"} mt-5`}>
              {refill ? 
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-3 h-[38px] w-[214px] rounded-[12px] text-[14px] font-medium text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
              >
                Submit Details
              </button> : 
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-3 h-[38px] w-[214px] border border-[#0000004D] rounded-[20px] text-[14px] font-medium text-black bg-white"
              >
                Close
              </button>
              }

            </div>
          </div>
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
