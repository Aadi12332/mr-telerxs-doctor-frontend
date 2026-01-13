import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertIcon from "../assets/AlertIcon";
import { updateDoctorApi } from "../api/auth.api";

type BankAccountForm = {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  ifscCode: string;
  swiftCode: string;
};

type InputFieldProps = {
  label: string;
  name: keyof BankAccountForm;
  value: string;
  disabled?: boolean;
};



export function BankAccountTab({user,doctor}:any) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  console.log({doctor,saving})
  const [formData, setFormData] = useState(doctor?.bankAccount??{});
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof BankAccountForm;

    setFormData((prev:any) => ({
      ...prev,
      [key]: value,
    }));
  };
const submitBankAccount = async () => {
  const doctorId = user?._id;
console.log({doctorId})
   setSaving(true);
let payload={...doctor,...user}
payload["bankAccount"]=formData
  try {
    const res = await updateDoctorApi(doctor?._id, {...payload,});
    let storeData={
      user: res?.data?.data?.user,
      doctor: res?.data?.data,
      // tokens: res?.data?.data?.tokens,
    }
    localStorage.setItem("auth", JSON.stringify(storeData));
    const updatedDoctor = res?.data?.data?.doctor;
    if (!updatedDoctor) return;
    console.log({res})
    
  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
};
const {bankAccount,...rest}=doctor??{}
  let payload={...rest,...user}
  payload["bankAccount"]=formData
console.log({payload})

  const InputField = ({
    label,
    name,
    value,
    disabled = false,
  }: InputFieldProps) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="block lg:mb-3 mb-1 lg:text-[20px] text-base">{label}</label>
        <input
          name={name}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={`w-full border lg:rounded-[20px] rounded-lg border-[#00000033] lg:text-[20px] text-base placeholder:text-[#00000080] lg:h-[56px] h-[40px] px-4 py-3 outline-none pr-10 ${
            disabled ? "bg-[#F3F4F6] text-gray-500" : "border-[#D1D5DB]"
          }`}
        />
      </div>
    );
  };
console.log({formData})
  return (
    <div className="">
      <div
        className="bg-[linear-gradient(90deg,rgba(63,210,87,0.7)_0%,rgba(141,255,160,0.6)_100%)]
        border border-transparent lg:rounded-[20px] rounded-lg overflow-hidden lg:px-6 px-3 lg:py-5 py-3 flex justify-between mb-8"
      >
        <div className="flex gap-4 items-center">
          <AlertIcon color="#217B30" />
          <div>
            <h3 className="text-[18px] lg:text-[22px] lg:mb-3 mb-1">
              Account Verified
            </h3>
            <p className="text-[#00000080] text-sm lg:text-[18px]">
              All credentials have been verified and approved.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white border border-[#E5E7EB] lg:rounded-[20px] rounded-lg lg:p-6 p-3">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[22px] font-medium">Bank Account Details</h3>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#00598D] font-medium"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Account Holder Name"
            name="accountHolderName"
            value={formData.accountHolderName}
            disabled={!isEditing}
          />

          <InputField
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            disabled={!isEditing}
          />

          <InputField
            label="Account Number"
            name="accountNumber"
            value={formData.accountNumber}
            disabled={!isEditing}
          />

          <InputField
            label="Routing Number"
            name="routingNumber"
            value={formData.routingNumber}
            disabled={!isEditing}
          />

          <InputField
            label="Account Type"
            name="accountType"
            value={formData.accountType}
            disabled={!isEditing}
          />

          <InputField
            label="IFSC Code"
            name="ifscCode"
            value={formData.ifscCode}
            disabled={!isEditing}
          />

          <InputField
            label="SWIFT Code"
            name="swiftCode"
            value={formData.swiftCode}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className={`flex items-center flex-wrap-reverse gap-4 mt-8 ${isEditing ? "justify-between" : "justify-center"}`}>
        <button
          onClick={() => navigate("/add-bank")}
          className="bg-[#00598D] text-white px-6 py-2 lg:rounded-[10px] rounded-lg text-[16px] lg:h-[56px] h-10 font-medium flex items-center gap-2"
        >
          <span className="inline-block lg:text-[30px] text-xl">+</span>
          <span className="lg:text-[24px] text-lg font-medium">
            Add Bank Account
          </span>
        </button>
        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                console.log("Updated Data:", formData);
                setIsEditing(false);
                submitBankAccount()
              }}
              className="bg-[#00598D] text-white px-6 py-2 lg:rounded-[10px] rounded-lg text-[16px] lg:h-[56px] h-10 lg:text-[24px] text-lg font-medium flex items-center gap-2"
            >
              Update Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
