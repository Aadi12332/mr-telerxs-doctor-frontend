import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtpApi } from "../api/auth.api";
import closeicon from "../assets/closeicon.svg";
import logo from "../assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setError("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter 6 digit OTP");
      return;
    }

    try {
      const res = await verifyOtpApi({
        identifier,
        otp: otpValue,
      });

      if (res?.data?.success) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E9ED] lg:px-12 px-3 lg:py-16 py-3">
      <div className="w-full max-w-[861px] mx-auto flex gap-7 items-center">
        <div className="flex-1 relative pt-7 pb-16 sm:px-16 px-3 bg-white rounded-3xl">
          <button
            className="absolute top-5 right-5"
            onClick={() => navigate("/login")}
          >
            <img src={closeicon} alt="Close" className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-[100px]">
            <img src={logo} alt="Logo" className="lg:w-[184px]" />
          </div>

          <h2 className="text-[32px] font-bold text-[#00598D] mb-2">
            Verification
          </h2>
          <p className="text-[#465D7C] text-[20px] mb-10">
            We have sent you an OTP on your Email ID & Phone number
          </p>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#012047] mb-1 inline-block">
              Enter OTP
            </label>

            <div className="flex gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-[#E6E8EE] rounded-[5px] outline-none text-lg font-medium"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-[55px] bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white rounded-[14px] text-[20px] font-medium"
          >
            Submit
          </button>

          <p className="text-center text-base text-[#465D7C] mt-4 py-2.5 cursor-pointer">
            Resend OTP
          </p>
        </div>
      </div>
    </div>
  );
}
