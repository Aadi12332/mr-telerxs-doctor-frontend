import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import backarrowicon from "../assets/backlongarrowicon.svg";
import cameraicon from "../assets/cameraicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import uploadicon from "../assets/uploadicon.svg";
import addnewicon from "../assets/addnewicon.svg";
import { getDoctorRecentConsultationsApi } from "../api/auth.api";

type Props = {
  onClose: () => void;
  refill?: boolean;
  doctorId?: any;
  consultationsAPI?: any;
  intakeFormId?: string;
};

export default function IntakeFormModal({
  onClose,
  refill,
  intakeFormId,
  doctorId,
}: Props) {
  const [dob, setDob] = useState<any>(null);
  const [items, setItems] = useState<string[]>([
    "Tri-Sprintec",
    "Tri-ESrythromycin-benzoyl peroxide gelprintec benzoyl peroxide gel",
  ]);
  const [consultations, setConsultations] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setLoading(true);
    getDoctorRecentConsultationsApi(doctorId)
      .then((res: any) => {
        const arr = res?.data?.data?.consultations || [];
        const matched = arr.find(
          (item: any) => item.intakeFormId === intakeFormId
        );
        setConsultations(matched || null);

        if (matched?.intakeForm?.basicInformation?.dateOfBirth) {
          setDob(
            dayjs(matched.intakeForm.basicInformation.dateOfBirth)
          );
        }
      })
      .finally(() => setLoading(false));
  }, [doctorId, intakeFormId]);

  const basicInfo = consultations?.intakeForm?.basicInformation;
  const emergency = consultations?.intakeForm?.emergencyContact;
  const medical = consultations?.intakeForm?.medicalQuestions;

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-[#80A2B5] w-full relative h-svh overflow-auto scroll-hide py-20 px-3">
        <button
          onClick={onClose}
          className="absolute lg:left-6 left-3 top-6 text-2xl"
        >
          <img src={backarrowicon} alt="" />
        </button>

        <div className="max-w-[960px] mx-auto bg-[#F9F9F9] pb-1 rounded-[20px]">
          <div className="flex justify-center border-b border-[#E6E8EE] p-5">
            <div className="flex items-center gap-6 border border-[#E6E8EE] bg-white rounded-[10px] p-5">
              <img
                src={basicInfo?.profileImage || ""}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover bg-gray-200 text-sm"
              />
              <button className="w-24 h-24 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                <img src={cameraicon} alt="Camera" />
              </button>
            </div>
          </div>

          {/* ================= BASIC INFO ================= */}

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              <Input label="First Name" defaultValue={basicInfo?.firstName} />
              <Input label="Last Name" defaultValue={basicInfo?.lastName} />
              <Input label="Middle Initial" defaultValue={basicInfo?.middleName} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input
                label="Gender"
                defaultValue={
                  basicInfo?.sex
                    ? basicInfo.sex.charAt(0).toUpperCase() +
                      basicInfo.sex.slice(1)
                    : ""
                }
              />

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
              <Input label="Email" defaultValue={basicInfo?.email} />
              <Input label="Mobile Number" defaultValue={basicInfo?.phone} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Work Phone Number" defaultValue={basicInfo?.workPhone || "-"} />
              <Input label="Primary Phone Number" defaultValue={basicInfo?.primaryPhone || "-"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Address" defaultValue={basicInfo?.address} />
              <Input label="City" defaultValue={basicInfo?.city} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="State" defaultValue={basicInfo?.state} />
              <Input label="Zip" defaultValue={basicInfo?.zip} />
            </div>

            <div className="mb-5">
              <Input label="Marital Status" defaultValue={basicInfo?.maritalStatus} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Government Issued Identification"
                defaultValue={basicInfo?.govtIssuedCertificate}
              />

              <div>
                <label className="text-base font-medium text-[#012047] mb-1 block">
                  Upload Image
                </label>
                <label className="w-full h-[56px] flex items-center justify-between border border-[#D9D9D9] rounded-lg bg-white px-4 cursor-pointer">
                  <span className="text-[14px] text-[#465D7C]">{basicInfo?.certificateUpload || "-"}</span>
                  <img src={uploadicon} className="w-5 h-5" />
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* ================= EMERGENCY CONTACT ================= */}

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-4">
              Emergency Contact
            </h3>

            <div className="mb-5">
              <Input
                label="Relationship to Contact"
                defaultValue={emergency?.relationship}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              <Input label="First Name" defaultValue={emergency?.firstName} />
              <Input label="Middle Name" defaultValue={emergency?.middleName} />
              <Input label="Last Name" defaultValue={emergency?.lastName} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Email" defaultValue={emergency?.email} />
              <Input label="Mobile Number" defaultValue={emergency?.phone} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Primary Phone" defaultValue={emergency?.primaryPhone} />
              <Input label="Work Phone Number" defaultValue={emergency?.workPhone} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input label="Address" defaultValue={emergency?.address} />
              <Input label="City" defaultValue={emergency?.city} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="State" defaultValue={emergency?.state} />
              <Input label="Zip" defaultValue={emergency?.zip} />
            </div>
          </div>

          {/* ================= MEDICAL QUESTIONS ================= */}

          <div className="p-5 border border-[#E6E8EE] rounded-[10px] m-5 bg-white">
            <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
              Medical Question
            </h3>

            <div className="mb-5">
              <Input
                label="List Your Past Medical History"
                defaultValue={medical?.pastMedicalHistory?.join(", ")}
              />
            </div>

            <div className="mb-5">
              <Input
                label="Current Medications"
                defaultValue={medical?.currentMedications?.join(", ")}
              />
            </div>

            <div className="mb-5">
              <Input
                label="Medications Allergy"
                defaultValue={medical?.medicationAllergies?.join(", ")}
              />
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
                      key={index}
                      className="flex items-center gap-3 px-4 h-[56px] border border-[#D9D9D9] rounded-lg text-[14px]"
                    >
                      <span className="truncate max-w-[50vw] text-[#465D7C]">
                        {item}
                      </span>
                      <button onClick={() => removeItem(index)}>×</button>
                    </div>
                  ))}

                  <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center gap-4 px-4 h-[56px] border border-[#D9D9D9] rounded-lg text-[16px] text-[#465D7C]"
                  >
                    Add New
                    <img src={addnewicon} alt="" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-5">
                  <Input
                    label="Please List Your Preferred Pharmacies"
                    defaultValue={medical?.preferredPharmacies
                      ?.map((p: any) => p.pharmacyName)
                      .join(", ")}
                  />
                </div>
              </>
            )}

           {medical?.preferredPharmacies?.map((pharmacy: any, index: number) => (
  <div key={pharmacy._id || index}>
    <h3 className="text-[#00598D] text-[18px] font-semibold mb-5">
      Your Pharmacy Details {index + 1}
    </h3>

    <div className="mb-5">
      <Input
        label="Pharmacy Name"
        defaultValue={pharmacy?.pharmacyName}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
      <Input
        label="Address"
        defaultValue={pharmacy?.address}
      />
      <Input
        label="City"
        defaultValue={pharmacy?.city}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
      <Input
        label="State"
        defaultValue={pharmacy?.state}
      />
      <Input
        label="Zip"
        defaultValue={pharmacy?.zip}
      />
    </div>
  </div>
))}


            <div>
              <Input
                label="How did you hear about us?"
                defaultValue={medical?.howDidYouHearAboutUs}
              />
            </div>

            <div
              className={`flex ${refill ? "justify-end" : "justify-center"} mt-5`}
            >
              {refill ? (
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 h-[38px] w-[214px] rounded-[12px] text-[14px] font-medium text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
                >
                  Submit Details
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 h-[38px] w-[214px] border border-[#0000004D] rounded-[20px] text-[14px] font-medium text-black bg-white"
                >
                  Close
                </button>
              )}
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
        defaultValue={defaultValue || ""}
        className="w-full text-[14px] capitalize placeholder:text-[#465D7C] text-[#465D7C] h-[56px] flex items-center border border-[#D9D9D9] rounded-lg px-4 py-2 outline-none"
      />
    </div>
  );
}
