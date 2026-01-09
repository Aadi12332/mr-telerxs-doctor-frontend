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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState<any>(null);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [open, setOpen] = useState(false);
  const status = "In Transit";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors: any = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!dob) newErrors.dob = "DOB is required";
    if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Enter valid mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter valid email";
    if (!specialization) newErrors.specialization = "Required";
    if (!experience) newErrors.experience = "Required";
    if (!hospital) newErrors.hospital = "Required";
    if (!language) newErrors.language = "Required";
    if (!bio) newErrors.bio = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
  };

  return (
    <div className="space-y-[30px]">
      <div className="flex items-center gap-6">
        <div className="w-[100px] h-[100px] rounded-full bg-[#D9D9D999] flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img src={profileImage} className="w-full h-full object-cover" />
          ) : (
            <img src={CameraIcon} />
          )}
        </div>
        <div>
          <label className="bg-[#C8DFFF] text-[#0E1E38] px-4 py-2 rounded-[10px] text-base font-medium cursor-pointer">
            Change Photo
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </label>
          <p className="text-sm text-[#00000080] mt-4">
            JPG, PNG. Max size 5MB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e)} />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>

        <div>
          <Input label="Gender" value={gender} onChange={(e) => setGender(e)} />
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
        </div>

        <div>
          <label className="lg:text-[20px] text-base text-[#012047] lg:mb-3 mb-1 block leading-[24px]">DOB</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dob}
              onChange={(newValue) => setDob(newValue)}
              slots={{
                openPickerIcon: () => <img src={calendaricon} className="w-5 h-5" />,
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
                      "@media(max-width:1024px)": {
                        borderRadius: "8px",
                        fontSize: "16px",
                        height: "40px",
                      },
                      "& fieldset": { border: "none" },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
          {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
        </div>

        <div>
          <Input label="Mobile Number" value={mobile} onChange={(e) => setMobile(e)} />
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
        </div>

        <div>
          <Input label="Email" value={email} onChange={(e) => setEmail(e)} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <CustomSelect
            title="Specialization"
            data={SPECIALIZATIONS}
            value={specialization}
            onChange={setSpecialization}
            placeholder="ALL"
            openDirection="bottom"
            width="w-full"
            className="lg:!rounded-[20px] !rounded-lg !text-[16px] lg:!text-[20px] !border-[#00000033] h-[40px] lg:h-[56px]"
            labelclassName="lg:!mb-3 !mb-1 !text-[16px] lg:!text-[20px] !font-normal leading-[24px]"
          />
          {errors.specialization && <p className="text-red-500 text-xs">{errors.specialization}</p>}
        </div>

        <div>
          <Input label="Years of Experience" value={experience} onChange={(e) => setExperience(e)} />
          {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
        </div>

        <div>
          <Input label="Hospital Affiliation" value={hospital} onChange={(e) => setHospital(e)} />
          {errors.hospital && <p className="text-red-500 text-xs">{errors.hospital}</p>}
        </div>

        <div>
          <Input label="Language Spoken" value={language} onChange={(e) => setLanguage(e)} />
          {errors.language && <p className="text-red-500 text-xs">{errors.language}</p>}
        </div>
      </div>

      <div>
        <label className="block lg:mb-3 mb-1 text-base lg:text-[20px]">Professional Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell patients about your experience.."
          className="w-full border lg:rounded-[20px] rounded-lg border-[#00000033] text-base lg:text-[20px] placeholder:text-[#00000080] px-4 py-3 h-28 outline-none"
        />
        {errors.bio && <p className="text-red-500 text-xs">{errors.bio}</p>}
      </div>

      <div className="border lg:rounded-[20px] rounded-lg border-[#00000033] lg:p-6 p-3">
        <p className="text-[20px] mb-6">Medical License Number</p>

        <div className="bg-[#D9D9D966] lg:px-5 px-3 py-3 lg:rounded-[20px] rounded-lg flex md:flex-row flex-col gap-5 md:items-center justify-between bg-gray-50">
          <div className="flex sm:gap-5 gap-3 items-center">
            <img src={ConfirmUpload} />
            <div>
              <p className="text-base lg:text-[20px] md:mb-5 sm:mb-1">File Name</p>
              <p className="text-sm lg:text-[18px] text-[#00000080]">
                Verified on Nov 15, 2024
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-between md:justify-end">
            <button className="text-[#00598D] text-sm lg:text-[18px]">
              Replace/Upload
            </button>
            <button
              onClick={() => setOpen(true)}
              className="border border-[#0000004D] px-6 md:py-2.5 py-1.5 rounded-lg lg:rounded-[10px] text-sm lg:text-[18px] bg-white"
            >
              View
            </button>
            {open && (
              <OrderTrackingModal status={status} onClose={() => setOpen(false)} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-[#00598D] text-white px-6 py-2.5 lg:rounded-[10px] rounded-lg text-[16px] font-medium mt-3"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
