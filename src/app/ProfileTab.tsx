import { useEffect, useState } from "react";
import { Input } from "../components/common/Input";
import CameraIcon from "../assets/cameraicon.svg";
import ConfirmUpload from "../assets/confirmuploadicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import CustomSelect from "../components/common/customSelect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createSpecializationApi,
  getSpecializationsApi,
  updateDoctorApi,
} from "../api/auth.api";
import AlertIcon from "../assets/AlertIcon";

export function ProfileTab({ user, doctor }: any) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDob] = useState<any>(null);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [specializationMap, setSpecializationMap] = useState<
    { id: string; label: string }[]
  >([]);
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  console.log(licenseFile);
  const [licenseFileName, setLicenseFileName] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [licensePreviewUrl, setLicensePreviewUrl] = useState<string | null>(
    null
  );

  const [openSpecModal, setOpenSpecModal] = useState(false);
  const [specName, setSpecName] = useState("");
  const [specDesc, setSpecDesc] = useState("");
  const [specLoading, setSpecLoading] = useState(false);
  const [specError, setSpecError] = useState("");

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
  useEffect(() => {
    const fetchSpecializations = async () => {
      const res = await getSpecializationsApi({});
      const list = res.data.data.map((item: any) => ({
        id: item._id,
        label: item.name,
      }));

      setSpecializationMap(list);
    };

    fetchSpecializations();
  }, []);

  useEffect(() => {
    if (user || doctor) {
      setFirstName(user?.firstName || "");
      setMiddleName(user?.middleName || "-");
      setLastName(user?.lastName || "");
      setMobile(user?.phoneNumber || "");
      setEmail(user?.email || "");
      setDob(user?.dateOfBirth ? dayjs(user.dateOfBirth) : null);
      setGender(user?.gender || "");
      setSpecialization(doctor?.specialty?.name || "");
      setSpecializationId(doctor?.specialty?._id || "");
      setExperience(
        doctor?.experience !== undefined ? String(doctor.experience) : ""
      );
      setHospital(doctor?.address?.clinicName || "");
      setLanguages(doctor?.languages || []);
      setBio(doctor?.bio || "");
      setConsultationFee(
        doctor?.consultationFee !== undefined
          ? String(doctor.consultationFee)
          : ""
      );
      setLicenseNumber(doctor?.licenseNumber || "");

      if (doctor?.profileImage?.url) {
        setProfileImage(
          `${doctor.profileImage.url}`
        );
      }
    }
  }, [user, doctor]);

  useEffect(() => {
    if (!doctor?.specialty || !specializationMap.length) return;

    const found = specializationMap.find(
      (item) => item.id === doctor.specialty
    );

    if (found) {
      setSpecialization(found.label);
      setSpecializationId(found.id);
    }
  }, [doctor?.specialty, specializationMap]);

//   const MAX_SIZE_MB = 2;
// const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

// const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   if (!ALLOWED_TYPES.includes(file.type)) {
//     alert("Only JPG, PNG, JPEG, WEBP images are allowed");
//     return;
//   }

//   const maxSize = MAX_SIZE_MB * 1024 * 1024;
//   if (file.size > maxSize) {
//     alert(`Image size must be less than ${MAX_SIZE_MB}MB`);
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = () => {
//     const base64 = reader.result as string;

//     if (!base64.startsWith("data:image/")) {
//       alert("Invalid image format");
//       return;
//     }

//     if (base64.length > 5_000_000) {
//       alert("Image too large after encoding");
//       return;
//     }

//     setProfileImage(base64);
//   };

//   reader.onerror = () => {
//     alert("Failed to read image file");
//   };

//   reader.readAsDataURL(file);
// };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors: any = {};
    if (mobile && !/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter valid mobile number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLicenseFile(file);
    setLicenseFileName(file.name);
    const url = URL.createObjectURL(file);
    setLicensePreviewUrl(url);
  };

  const handleViewLicense = () => {
    if (licensePreviewUrl) {
      setPreviewOpen(true);
      return;
    }

    if (doctor?.medicalLicense) {
      setLicensePreviewUrl(doctor.medicalLicense?.documentUrl);
      setPreviewOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const doctorId = doctor?._id;
    if (!doctorId) return;
    setSaving(true);

    const payload: any = {
      firstName,
      middleName,
      lastName,
      email,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : undefined,
      gender,
      phoneNumber: mobile,
      countryCode: user?.countryCode || "+91",
      specialty: specializationId,
      experience: experience ? Number(experience) : undefined,
      bio,
      languages,
      consultationFee: consultationFee ? Number(consultationFee) : undefined,
      licenseNumber,
      address: {
        clinicName: hospital,
        city: doctor?.address?.city || "",
        state: doctor?.address?.state || "",
        country: doctor?.address?.country || "",
        pincode: doctor?.address?.pincode || "",
      },
      licenseVerified: doctor?.licenseVerified,
      status: doctor?.status,
      isActive: doctor?.isActive,
      medicalLicense: doctor?.medicalLicense,
      education: doctor?.education,
      certifications: doctor?.certifications,
      availability: doctor?.availability,
      bankAccount: doctor?.bankAccount,
    };

    try {
      const res = await updateDoctorApi(doctorId, payload);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: res?.data?.data?.user,
          doctor: res?.data?.data,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
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
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <p className="text-sm text-[#00000080] mt-4">
            JPG, PNG. Max size 5MB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="First Name" value={firstName} onChange={setFirstName} />
        <Input
          label="Middle Name"
          value={middleName}
          onChange={setMiddleName}
        />
        <Input label="Last Name" value={lastName} onChange={setLastName} />

        <CustomSelect
          title="Gender"
          data={["male", "female", "other"]}
          value={gender}
          onChange={setGender}
          placeholder="Select gender"
          className="lg:!rounded-[20px] !rounded-lg !text-[16px] lg:!text-[20px] !border-[#00000033] !h-[40px] lg:!h-[56px] capitalize"
          labelclassName="lg:!mb-3 !mb-1 !text-[16px] lg:!text-[20px] !font-normal leading-[24px]"
        />

        <div>
          <label className="lg:text-[20px] text-base text-[#012047] lg:mb-3 mb-1 block leading-[24px]">
            DOB
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateOfBirth}
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
        </div>

        <div>
          <Input label="Mobile Number" value={mobile} onChange={setMobile} />
          {errors.mobile && (
            <p className="text-red-500 text-xs">{errors.mobile}</p>
          )}
        </div>

        <div>
          <Input label="Email" value={email} onChange={setEmail} />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

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
            openDirection="bottom"
            width="w-full"
            className="lg:!rounded-[20px] !rounded-lg !text-[16px] lg:!text-[20px] !border-[#00000033] !h-[40px] lg:!h-[56px]"
            labelclassName="lg:!mb-3 !mb-1 !text-[16px] lg:!text-[20px] !font-normal leading-[24px]"
          />

          <div>
            <label
              htmlFor=""
              className="lg:mb-3 mb-1 !text-[16px] lg:!text-[20px] !font-normal leading-[24px] block opacity-0"
            >
              Add
            </label>
            <button
              onClick={() => setOpenSpecModal(true)}
              className="border border-[#D9D9D9] rounded-lg lg:rounded-[20px] !text-[16px] lg:!text-[20px] min-w-max px-4 h-10 lg:h-[56px] cursor-pointer flex justify-between text-white items-center bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)]"
            >
              + Add
            </button>
          </div>
        </div>

        {openSpecModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white w-full max-w-[420px] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Add Specialization</h3>

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
          label="Years of Experience"
          value={experience}
          onChange={setExperience}
        />

        <Input
          label="Hospital Affiliation"
          value={hospital}
          onChange={setHospital}
        />

        <Input
          label="Consultation Fee"
          value={consultationFee}
          onChange={setConsultationFee}
        />

        <Input
          label="License Number"
          value={licenseNumber}
          onChange={setLicenseNumber}
        />
      </div>
      <div>
        <label className="block lg:mb-3 mb-1 font-medium lg:text-[20px] text-base">
          Language Spoken
        </label>

        <div
          className="w-full border bg-white lg:rounded-[20px] rounded-lg border-[#00000033]
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
              if (e.key === "Backspace" && !languageInput && languages.length) {
                setLanguages(languages.slice(0, -1));
              }
            }}
            placeholder={languages.length ? "" : "Add language"}
            className="flex-1 outline-none border-none bg-transparent
            lg:text-[20px] text-base placeholder:text-[#00000080]"
          />
        </div>

        {errors.language && (
          <p className="text-red-500 text-xs">{errors.language}</p>
        )}
      </div>

      <div>
        <label className="block lg:mb-3 mb-1 text-base lg:text-[20px]">
          Professional Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell patients about your experience.."
          className="w-full border lg:rounded-[20px] rounded-lg border-[#00000033] text-base lg:text-[20px] placeholder:text-[#00000080] px-4 py-3 h-28 outline-none"
        />
      </div>

      <div className="border lg:rounded-[20px] rounded-lg border-[#00000033] lg:p-6 p-3">
        <p className="text-[20px] mb-6">Medical License Number</p>
        <div className="bg-[#D9D9D966] lg:px-5 px-3 py-3 lg:rounded-[20px] rounded-lg flex md:flex-row flex-col gap-5 md:items-center justify-between">
          <div className="flex sm:gap-5 gap-3 items-center">
            {doctor?.licenseVerified ? (
              <img src={ConfirmUpload} />
            ) : (
              <AlertIcon />
            )}
            <div>
              <p className="text-base lg:text-[20px] md:mb-5 sm:mb-1">
                {licenseFileName || doctor?.licenseNumber || ""}
              </p>
              <p className="text-sm lg:text-[18px] text-[#00000080]">
                {doctor?.licenseVerified
                  ? `Verified on ${doctor?.licenseVerifiedAt ?? ""}`
                  : "UnVerified"}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-between md:justify-end">
            <label className="text-[#00598D] text-sm lg:text-[18px] cursor-pointer">
              Replace/Upload
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleLicenseUpload}
              />
            </label>

            <button
              // onClick={() => setOpen(true)}
              onClick={handleViewLicense}
              className="border border-[#0000004D] px-6 md:py-2.5 py-1.5 rounded-lg lg:rounded-[10px] text-sm lg:text-[18px] bg-white"
            >
              View
            </button>

            {/* {open && (
              <OrderTrackingModal
                status={status}
                onClose={() => setOpen(false)}
              />
            )} */}
            {previewOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="absolute top-6 right-6 text-white text-3xl"
                  >
                    ×
                  </button>

                  {licensePreviewUrl ? (
                    <img
                      src={licensePreviewUrl}
                      className="max-w-[90%] max-h-[90vh] object-contain bg-white rounded-lg min-h-[50vh] min-w-[50vw]"
                    />
                  ) : (
                    <p className="text-white text-lg">No preview available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className={`bg-[#00598D] text-white px-6 py-2.5 lg:rounded-[10px] rounded-lg text-[16px] font-medium mt-3 flex items-center gap-2 ${
            saving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {saving && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Save changes
        </button>
      </div>
    </div>
  );
}
