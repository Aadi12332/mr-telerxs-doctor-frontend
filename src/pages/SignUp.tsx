import { useEffect, useState } from "react";
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
import {
  createDoctorApi,
  createSpecializationApi,
  getSpecializationsApi,
} from "../api/auth.api";
import { Input } from "../components/common/Input";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{6,}$/;

export default function Signup() {
  const navigate = useNavigate();
  const [dob, setDob] = useState<any>(null);
  const [specialization, setSpecialization] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [specializationMap, setSpecializationMap] = useState<
    { id: string; label: string }[]
  >([]);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [openSpecModal, setOpenSpecModal] = useState(false);
  const [specName, setSpecName] = useState("");
  const [specDesc, setSpecDesc] = useState("");
  const [specLoading, setSpecLoading] = useState(false);
  const [specError, setSpecError] = useState("");

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await getSpecializationsApi({});
        const list = res.data.data.map((item: any) => ({
          id: item._id,
          label: item.name,
        }));
        setSpecializationMap(list);
      } catch (err) {
        console.error("Failed to load specializations", err);
      }
    };

    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    const res = await getSpecializationsApi({});
    const list = res.data.data.map((item: any) => ({
      id: item._id,
      label: item.name,
    }));
    setSpecializationMap(list);
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    consultationFee: "",
    password: "",
    experience: "",
    hospital: "",
    language: "",
    bio: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLicenseChange = (e: any) => {
    if (e.target.files?.[0]) setLicenseFile(e.target.files[0]);
  };

  const handleProfileChange = (e: any) => {
    if (e.target.files?.[0]) {
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validate = () => {
    const e: any = {};

    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.gender) e.gender = "Required";
    if (!dob) e.dob = "Required";
    if (!emailRegex.test(form.email)) e.email = "Invalid email";
    if (!/^\d{10}$/.test(form.phoneNumber)) e.phoneNumber = "Invalid number";
    if (!passwordRegex.test(form.password))
      e.password = "Min 6 chars, 1 uppercase, 1 special";
    if (!specializationId) e.specialization = "Required";
    if (!licenseFile) e.license = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createDoctorApi({
        firstName: form.firstName,
        lastName: form.lastName,
        middleInitial: form.middleName || undefined,
        email: form.email,
        phoneNumber: form.phoneNumber,
        countryCode: "+91",
        gender: form.gender as "male" | "female" | "other",
        dateOfBirth: dob.format("YYYY-MM-DD"),
        specialty: specializationId,
        licenseNumber: licenseFile?.name || "",
        experience: Number(form.experience || 0),
        hospitalAffiliation: form.hospital,
        languages: languages,
        bio: form.bio,
        consultationFee: form.consultationFee,
        password: form.password,
        agreeConfirmation: true,
        profilePicture: profilePreview || undefined,
        medicalLicense: licenseFile?.name || undefined,
      });

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fff]">
      <div className="bg-white py-2 border-b border-[#E6E8EE]">
        <header className="flex items-center justify-between max-w-[1440px] px-3 mx-auto">
          <img src={medicationcompany} className="h-[53px]" />
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-[#0B1C39] text-white px-4 py-1.5 rounded-full text-[13px]"
          >
            <img src={backarrowicon} className="w-4 h-4" />
            Back
          </button>
        </header>
      </div>

      <div className="px-3 py-[70px] h-[calc(100vh-71px)] overflow-auto scroll-hide">
        <div className="bg-[#F9F9F9] border border-[#E6E8EE] rounded-2xl max-w-[960px] mx-auto">
          <div className="flex justify-center border-b p-5">
            <div className="flex items-center gap-6 border rounded-[10px] p-5">
              <img
                src={profilePreview || profileimg}
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="w-24 h-24 rounded-full bg-[#D9D9D9] flex items-center justify-center cursor-pointer">
                <img src={cameraicon} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfileChange}
                />
              </label>
            </div>
          </div>

          <div className="p-5 border rounded-[10px] m-5">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-4">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-3 gap-5 mb-5">
              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="First Name"
                value={form.firstName}
                error={errors.firstName}
                onChange={(v: string) => handleChange("firstName", v)}
              />

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Last Name"
                value={form.lastName}
                error={errors.lastName}
                onChange={(v: string) => handleChange("lastName", v)}
              />
              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Middle Name"
                value={form.middleName}
                error={errors.middleName}
                onChange={(v: string) => handleChange("middleName", v)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Gender"
                value={form.gender}
                error={errors.gender}
                onChange={(v: string) => handleChange("gender", v)}
              />
              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  DOB
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dob}
                    onChange={setDob}
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
                            fontSize: "16px",
                            padding: "0 16px",
                            border: "1px solid #D9D9D9",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                             "@media(max-width:1024px)": {
                                height: "40px",
                              },
                          },
                          className:
                            "w-full text-[14px] placeholder:text-[#465D7C] outline-none bg-white",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                )}
              </div>

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Email"
                value={form.email}
                error={errors.email}
                onChange={(v: string) => handleChange("email", v)}
              />

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Mobile Number"
                value={form.phoneNumber}
                error={errors.phoneNumber}
                onChange={(v: string) => handleChange("phoneNumber", v)}
              />

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Medical License Number"
                value={form.licenseNumber}
                error={errors.licenseNumber}
                onChange={(v: string) => handleChange("licenseNumber", v)}
              />
              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  Upload Medical License
                </label>
                <label className="w-full h-10 lg:h-[56px] flex items-center justify-between border border-[#D9D9D9] rounded-lg px-4 cursor-pointer bg-white">
                  <span className="text-[14px] text-[#465D7C] truncate">
                    {licenseFile ? licenseFile.name : "Browse File"}
                  </span>
                  <img src={uploadicon} className="w-5 h-5" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleLicenseChange}
                  />
                </label>
                {errors.license && (
                  <p className="text-red-500 text-xs mt-1">{errors.license}</p>
                )}
              </div>
              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Consultation Fee"
                value={form.consultationFee}
                onChange={(v: string) => handleChange("consultationFee", v)}
              />
              <div>
                <div className="flex items-start gap-2">
                  <CustomSelect
                  title="Specialization"
                  data={specializationMap.map((s) => s.label)}
                  value={specialization}
                  onChange={(label: string) => {
                    setSpecialization(label);

                    const found = specializationMap.find(
                      (item) => item.label === label
                    );

                    setSpecializationId(found?.id || "");
                  }}
                  placeholder="ALL"
                  width="w-full"
                  className="!h-[40px] lg:!h-[56px]"
                />
                </div>

                {errors.specialization && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>

              {openSpecModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                  <div className="bg-white w-full max-w-[420px] rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Add Specialization
                    </h3>

                    <Input
                      label="Specialization Name"
                      value={specName}
                      onChange={setSpecName}
                      labelClassName="!text-base"
                      className="!rounded-lg"
                    />

                    <div className="mt-3">
                      <label className="block mb-1 font-medium text-base">
                        Description
                      </label>
                      <textarea
                        value={specDesc}
                        onChange={(e) => setSpecDesc(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 h-24 outline-none"
                      />
                    </div>

                    {specError && (
                      <p className="text-red-500 text-sm mt-2">{specError}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setOpenSpecModal(false)}
                        className="px-4 py-2 rounded-lg border"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={specLoading}
                        onClick={async () => {
                          if (!specName.trim()) {
                            setSpecError("Name is required");
                            return;
                          }

                          try {
                            setSpecLoading(true);
                            setSpecError("");

                            await createSpecializationApi({
                              name: specName.trim(),
                              description: specDesc.trim(),
                            });

                            // modal close + reset
                            setOpenSpecModal(false);
                            setSpecName("");
                            setSpecDesc("");

                            // dropdown refresh
                            await fetchSpecializations();
                          } catch (err: any) {
                            setSpecError(
                              err?.response?.data?.message ||
                                "Failed to create specialization"
                            );
                          } finally {
                            setSpecLoading(false);
                          }
                        }}
                        className="px-5 py-2 rounded-lg text-white bg-[#00598D] disabled:opacity-60"
                      >
                        {specLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                type="number"
                label="Years of Experience"
                value={form.experience}
                onChange={(v: string) => handleChange("experience", v)}
              />
              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Hospital Affiliation"
                value={form.hospital}
                onChange={(v: string) => handleChange("hospital", v)}
              />
              <div>
                <label className="block mb-1 font-medium text-base">
                  Language Spoken
                </label>

                <div
                  className="w-full border bg-white rounded-lg border-[#00000033]
               flex flex-wrap items-center gap-2 px-3 py-2 min-h-[40px] lg:min-h-[56px]"
                >
                  {languages.map((lang, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-[#E5F8FC] break-all text-[#00598D]
                   px-3 py-1 rounded-full text-sm lg:text-base"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() =>
                          setLanguages(languages.filter((_, i) => i !== index))
                        }
                        className="text-[#00598D] font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && languageInput.trim()) {
                        e.preventDefault();
                        if (!languages.includes(languageInput.trim())) {
                          setLanguages([...languages, languageInput.trim()]);
                        }
                        setLanguageInput("");
                      }
                      if (
                        e.key === "Backspace" &&
                        !languageInput &&
                        languages.length
                      ) {
                        setLanguages(languages.slice(0, -1));
                      }
                    }}
                    placeholder={languages.length ? "" : "Add language"}
                    className="flex-1 outline-none border-none bg-transparent
                 text-base placeholder:text-[#00000080]"
                  />
                </div>

                {errors.language && (
                  <p className="text-red-500 text-xs">{errors.language}</p>
                )}
              </div>

              <Input
                labelClassName="!text-base !font-medium !mb-1"
                className="!rounded-lg !text-base"
                label="Password"
                type="password"
                value={form.password}
                error={errors.password}
                onChange={(v: string) => handleChange("password", v)}
              />
            </div>

            <div className="mt-6">
              <label className="text-base font-medium text-[#012047] mb-1 block">
                Professional Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-28 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-12 py-2 max-w-[383px] w-full rounded-lg lg:rounded-[14px] text-white bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)]"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
