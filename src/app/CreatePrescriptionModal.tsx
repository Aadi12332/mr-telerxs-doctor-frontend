import { useNavigate } from "react-router-dom";
import createfileicon from "../assets/whitecreatefileicon.svg";
import sendparmacy from "../assets/sendparmacyicon.svg";
import { useState } from "react";
import CustomSelect from "../components/common/customSelect";
import toast from "react-hot-toast";
import { createPrescriptionApi, sendPharmacyApi } from "../api/auth.api";

type Props = {
  onClose: () => void;
  selectedConsultation?: any;
  doctorId?: string;
  patientId?: string;
  patientName?: string;
};

const FREQUENCY_OPTIONS = [
  "Once a day",
  "Twice a day",
  "Thrice a day",
];

const REFILL_OPTIONS = [
  "No refills",
  "1 refill",
  "2 refills",
];

export default function CreatePrescriptionsModal({
  onClose,
  selectedConsultation,
  doctorId,
  patientId,
  patientName: selectedPatientName,
}: Props) {
  const [frequency, setFrequency] = useState("");
  const [refill, setRefill] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [instruction, setInstruction] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [patientName, setPatientName] = useState(selectedPatientName ?? "");
const hasOrderId = !!selectedConsultation?.order?._id;
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!dosage || !duration || !frequency) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await createPrescriptionApi({
        doctor: doctorId || selectedConsultation?.doctor?.id,
        patientId: patientId || selectedConsultation?.patient?.id,
        medicine: medicine,
        brand: "Generic",
        description: dosage,
        duration,
        frequency,
        refillsAllowed: refill,
        instruction,
        warning,
        patientName
      });
   
      if (res.status === 201) {
        navigate("/consultations");
        onClose();
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPharmacy = async () => {
  if (!dosage || !duration || !frequency) {
    alert("Please fill required fields");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      doctor: doctorId || selectedConsultation?.doctor?.id,
      patientId: patientId || selectedConsultation?.patient?.id,
      medicine: medicine,
      brand: "Generic",
      description: dosage,
      duration,
      frequency,
      refillsAllowed: refill,
      instruction,
      warning,
      patientName,
    };

    const res = await sendPharmacyApi({orderId: selectedConsultation?.order?._id || "", prescriptionData: payload});
    if (res.status === 200 || res.status === 201) {
      toast.success(res.data?.message || "Prescription sent successfully");
      navigate("/consultations");
      onClose();
    } else {
      toast.error(res.data?.message || "Something went wrong");
    }
  } catch (err: any) {
    console.log(err);
    toast.error(err?.response?.data?.message || "API Error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white w-full lg:p-5 p-3 relative h-svh overflow-auto scroll-hide flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-2 items-center mb-5">
        <p
  className={`px-2 py-1 rounded-lg ${
    hasOrderId ? "bg-green-300" : "bg-red-300"
  }`}
>
  Note:{" "}
  {hasOrderId
    ? "Ready for send to pharmacy"
    : "Order ID not found, unable to send to pharmacy"}
</p>
        <button
            onClick={onClose}
            className="border border-[#0000004D] px-5 sm:py-2 py-1.5 rounded-[8px] sm:text-[16px] text-sm"
          >
            Hide
          </button>
        </div>

        <div className="bg-[#E6F5FD] lg:rounded-[20px] rounded-lg lg:p-6 p-3">
          <p className="text-[26px] font-medium text-[#000] mb-4">
            Create Prescription
          </p>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Patient Name
              </p>
              <input
                value={patientName}
                placeholder="Enter Patient Name"
                className="w-full h-[56px] rounded-lg lg:rounded-[14px] px-4 text-base lg:text-[20px] outline-none"
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Medicine Name
              </p>
              <input
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                placeholder="Enter medicine name"
                className="w-full h-[56px] rounded-lg lg:rounded-[14px] px-4 text-base lg:text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Dosage
              </p>
              <input
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 500mg, 2 tablets"
                className="w-full h-[56px] rounded-lg lg:rounded-[14px] px-4 text-base lg:text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Duration
              </p>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="7 days, 30 days"
                className="w-full h-[56px] rounded-lg lg:rounded-[14px] px-4 text-base lg:text-[20px] outline-none"
              />
            </div>

            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Frequency
              </p>

              <CustomSelect
                data={FREQUENCY_OPTIONS}
                value={frequency}
                onChange={setFrequency}
                placeholder="Select frequency"
                openDirection="bottom"
                width="w-full"
                className="h-[56px] lg:rounded-[14px] text-base lg:text-[20px] !border-none"
                labelclassName=""
              />
            </div>

            <div>
              <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
                Refills Allowed
              </p>

              <CustomSelect
                data={REFILL_OPTIONS}
                value={refill}
                onChange={setRefill}
                placeholder="Select refills"
                openDirection="bottom"
                width="w-full"
                className="h-[56px] lg:rounded-[14px] text-base lg:text-[20px] !border-none"
                labelclassName=""
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
              Instructions for Patient
            </p>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Take with food, avoid alcohol, etc."
              className="w-full h-[96px] rounded-lg lg:rounded-[14px] p-4 text-base lg:text-[20px] outline-none"
            />
          </div>

          <div className="mt-2">
            <p className="text-sm lg:text-[16px] text-[#00000080] mb-2">
              Disclaimers / Warnings
            </p>
            <textarea
              value={warning}
              onChange={(e) => setWarning(e.target.value)}
              placeholder="May cause drowsiness, do not drive if affected, etc."
              className="w-full h-[96px] rounded-lg lg:rounded-[14px] p-4 text-base lg:text-[20px] outline-none"
            />
          </div>
        </div>
        </div>

        <div className="flex justify-between sm:gap-6 gap-2 mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-3 h-[40px] lg:h-[60px] w-full rounded-lg px-2 lg:rounded-[14px] text-base lg:text-[26px] font-medium text-white bg-[linear-gradient(90deg,#25AEED_0%,#0A70A7_100%)]"
          >
            <img src={createfileicon} alt="" />
            {loading ? "Creating..." : "Issue Prescription"}
          </button>

          <button
  onClick={handleSubmitPharmacy}
  disabled={!hasOrderId}
  className={`flex items-center justify-center gap-3 h-[40px] lg:h-[60px] w-full rounded-lg px-2 lg:rounded-[14px] text-base lg:text-[26px] font-medium text-white ${
    hasOrderId
      ? "bg-[linear-gradient(270deg,#308D32_0%,#86C987_100%)] cursor-pointer"
      : "bg-[linear-gradient(270deg,#308D32_0%,#86C987_100%)] cursor-not-allowed"
  }`}
>
  <img src={sendparmacy} alt="" />
  Send to Pharmacy
</button>
        </div>
      </div>
    </div>
  );
}