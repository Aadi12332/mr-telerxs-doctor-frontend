import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";
import successicon from "../assets/successicon.svg";
import { Input } from "../components/common/Input";
import { updateDoctorApi } from "../api/auth.api";

export default function AddBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const doctor = auth?.doctor;

  const [step, setStep] = useState<number>(location.state?.step || 1);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    routingNumber: "",
    accountType: "",
    ifscCode: "",
    swiftCode: "",
  });

  const isActive = (s: number) => step === s;
  const isCompleted = (s: number) => step > s;

  const maskedAccount =
    form.accountNumber.length > 4
      ? "**** **** **** " + form.accountNumber.slice(-4)
      : "";

  const validAccountTypes = ["checking", "savings", "current"];

  const isValidAccountType = validAccountTypes.includes(
    form.accountType.toLowerCase()
  );

  const isValidRoutingNumber = (value: string) => {
    const isUS = /^\d{9}$/.test(value);
    const isIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);
    return isUS || isIFSC;
  };

  const step1Valid =
    form.accountHolderName.trim() &&
    form.bankName.trim() &&
    isValidAccountType;

  const step2Valid =
    form.accountNumber.trim() &&
    form.confirmAccountNumber.trim() &&
    form.accountNumber === form.confirmAccountNumber &&
    isValidRoutingNumber(form.routingNumber);

  const submitBankAccount = async () => {
    if (!doctor?._id) return;

    setSaving(true);

    try {
      const bankAccount: any = {
        accountHolderName: form.accountHolderName,
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        routingNumber: form.routingNumber,
        accountType: form.accountType.toLowerCase(),
        verified: false,
      };

      if (form.ifscCode) bankAccount.ifscCode = form.ifscCode;
      if (form.swiftCode) bankAccount.swiftCode = form.swiftCode;

      const payload = {
        ...doctor,
        bankAccount,
      };

      const res = await updateDoctorApi(doctor._id, payload);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: res?.data?.data?.user,
          doctor: res?.data?.data,
        })
      );

      setStep(4);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          {isActive(1) && (
            <img
              src={backarrow}
              alt=""
              className="invert mb-5 cursor-pointer"
              onClick={() => navigate("/settings")}
            />
          )}

          {isActive(4) && <img src={successicon} alt="" className="mb-5" />}

          <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
            {!isActive(4)
              ? "Add Bank Account"
              : "Bank Account Added Successfully!"}
          </h2>

          <p className="lg:text-[20px] text-base text-[#00000080]">
            {!isActive(4)
              ? "Link your bank account to receive payouts"
              : "Your bank account has been added and is pending verification. We'll send two small deposits to verify your account within 1-2 business days."}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {!isActive(4) && (
            <div className="border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:px-12 px-3 lg:py-10 py-4 flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center w-full last:w-[unset]">
                  <div
                    className={`lg:w-[50px] lg:h-[50px] w-8 min-w-8 h-8 lg:text-[26px] text-lg flex items-center justify-center rounded-full text-white font-medium ${
                      isActive(s) || isCompleted(s)
                        ? "bg-[#0E82FD]"
                        : "bg-[#00000033] text-[#00000066]"
                    }`}
                  >
                    {s}
                  </div>

                  <span
                    className={`lg:ml-6 ml-2 lg:text-[24px] sm:text-lg text-sm ${
                      isActive(s) || isCompleted(s)
                        ? "text-[#000]"
                        : "text-[#00000080]"
                    }`}
                  >
                    {s === 1 && "Account Details"}
                    {s === 2 && "Verification"}
                    {s === 3 && "Review"}
                  </span>

                  {s !== 3 && (
                    <div
                      className={`flex-1 h-[4px] lg:mx-10 sm:mx-4 mx-1 ${
                        isCompleted(s) ? "bg-[#0E82FD]" : "bg-[#00000033]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:p-6 p-3 space-y-6">
              <div>
                <Input
                label="Account Holder Name"
                value={form.accountHolderName}
                onChange={(v) =>
                  setForm({ ...form, accountHolderName: v })
                }
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted && !form.accountHolderName
                    ? "Please enter account holder name"
                    : ""
                }
              />
               <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base mt-2">
                Enter the full name as it appears on your bank account
              </p>
              </div>

              <Input
                label="Bank Name"
                value={form.bankName}
                onChange={(v) => setForm({ ...form, bankName: v })}
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted && !form.bankName
                    ? "Please enter bank name"
                    : ""
                }
              />

              <Input
                label="Account Type"
                value={form.accountType}
                onChange={(v) =>
                  setForm({ ...form, accountType: v.toLowerCase() })
                }
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted && !isValidAccountType
                    ? "Account type must be checking, savings, or current"
                    : ""
                }
              />

              <button
                onClick={() => {
                  setSubmitted(true);
                  if (step1Valid) {
                    setSubmitted(false);
                    setStep(2);
                  }
                }}
                className="bg-[#00598D] text-white lg:text-[20px] text-base px-10 flex items-center justify-center rounded-[10px] mx-auto max-w-[577px] w-full lg:h-[50px] h-10"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="border border-[#0000004D] lg:rounded-[20px] rounded-lg lg:p-6 p-3 space-y-6">
              <Input
                label="Account Number"
                value={form.accountNumber}
                onChange={(v) =>
                  setForm({ ...form, accountNumber: v })
                }
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted && !form.accountNumber
                    ? "Please enter account number"
                    : ""
                }
              />

              <Input
                label="Confirm Account Number"
                value={form.confirmAccountNumber}
                onChange={(v) =>
                  setForm({ ...form, confirmAccountNumber: v })
                }
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted &&
                  form.confirmAccountNumber !== form.accountNumber
                    ? "Account number does not match"
                    : ""
                }
              />

              <Input
                label="Routing Number (ABA / IFSC)"
                value={form.routingNumber}
                onChange={(v) =>
                  setForm({
                    ...form,
                    routingNumber: v.toUpperCase(),
                  })
                }
                className="border-[#0000004D] lg:h-[65px] h-10"
                labelClassName="lg:text-[22px] sm:text-lg text-base"
                error={
                  submitted && !isValidRoutingNumber(form.routingNumber)
                    ? "Enter valid 9-digit routing number or IFSC code"
                    : ""
                }
              />

              <div className="flex items-center justify-between !mt-10 gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="border border-[#0000004D] lg:h-[50px] h-10 lg:text-[20px] text-base px-10 flex items-center justify-center rounded-[10px] max-w-[398px] w-full"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    setSubmitted(true);
                    if (step2Valid) {
                      setSubmitted(false);
                      setStep(3);
                    }
                  }}
                  className="bg-[#00598D] text-white lg:text-[20px] text-base px-10 rounded-[10px] flex items-center justify-center max-w-[577px] w-full lg:h-[50px] h-10"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div className="border border-[#0000004D] rounded-lg lg:rounded-[20px] lg:p-6 p-3 space-y-6">
                <h2 className="lg:text-[26px] text-xl font-semibold">
                  Review Your Information
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Holder
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.accountHolderName}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Bank Name
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.bankName}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Type
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.accountType}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Number
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {maskedAccount}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Routing Number
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.routingNumber}
                  </p>
                </div>
              </div>

              <div className="flex justify-between !mt-11 gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="border border-[#0000004D] lg:text-[20px] text-base h-10 lg:h-[50px] px-10 flex items-center justify-center rounded-lg lg:rounded-[10px] max-w-[398px] w-full"
                >
                  Back
                </button>

                <button
                  onClick={submitBankAccount}
                  disabled={saving}
                  className="bg-[#00598D] text-white min-w-max lg:text-[20px] text-base px-10 flex items-center justify-center rounded-lg lg:rounded-[10px] max-w-[577px] w-full h-10 lg:h-[50px]"
                >
                  Save Account
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="border border-[#0000004D] rounded-lg lg:rounded-[20px] lg:p-8 p-3 text-center space-y-6">
                <div className="grid grid-cols-2 gap-6 text-left">
                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Holder
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.accountHolderName}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Bank Name
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.bankName}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Type
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.accountType}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Account Number
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {maskedAccount}
                  </p>

                  <p className="text-[#000000B2] lg:text-[22px] sm:text-lg text-base">
                    Routing Number
                  </p>
                  <p className="lg:text-[22px] sm:text-lg text-base text-end">
                    {form.routingNumber}
                  </p>
                </div>
              </div>

              <p className="text-[#042F4D] lg:text-[20px] sm:text-base text-sm lg:!mt-9 !mt-3 !mb-24 text-center">
                You will receive an email with instructions to verify your
                account once the deposits are available
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/settings")}
                  className="bg-[#00598D] lg:text-[20px] text-base text-white px-20 flex items-center justify-center rounded-lg lg:rounded-[10px] max-w-[577px] w-full mx-auto lg:h-[50px] h-10"
                >
                  Go to Payout Settings
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[#b0b0b0]">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
