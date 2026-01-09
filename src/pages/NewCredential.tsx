import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordApi } from "../api/auth.api";
import closeicon from "../assets/closeicon.svg";
import logo from "../assets/logo.svg";
import newcred from "../assets/newcredicon.svg";
import lockicon from "../assets/lockicon.svg";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

export default function NewCredential() {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier;
  const serverOtp = location.state?.otp;

  const [otp, setOtp] = useState(serverOtp || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: any = {};

    if (!otp) e.otp = "OTP is required";
    if (!passwordRegex.test(password))
      e.password = "Min 6 chars, 1 uppercase, 1 special char";
    if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await resetPasswordApi({
        identifier,
        otp,
        newPassword: password,
      });
      navigate("/login");
    } catch (err: any) {
      setErrors({
        api: err?.response?.data?.message || "Failed to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E9ED] lg:px-12 px-3 lg:py-10 py-3">
      <div className="w-full max-w-[861px] mx-auto">
        <div className="relative bg-white rounded-3xl lg:px-16 px-5 pt-7 pb-16">
          <button
            className="absolute top-6 right-6"
            onClick={() => navigate("/login")}
          >
            <img src={closeicon} alt="Close" className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="lg:w-[144px]" />
          </div>

          <div className="flex items-start gap-6 mb-[37px]">
            <img src={newcred} alt="Icon" className="w-10 h-10" />
            <div>
              <h2 className="text-[32px] font-semibold text-[#00598D] mb-4">
                NEW CREDENTIALS
              </h2>
              <p className="text-[#000000B2] text-[18px] mb-5">
                Your identity has been verified!
              </p>
              <p className="text-[#000000B2] text-[18px]">
                Set your new password
              </p>
              {serverOtp && (
                <p className="text-lg font-bold text-gray-500 mt-4">
                  OTP: {serverOtp}
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#F1F5F8] max-w-[502px] mx-auto rounded-xl p-6 flex items-center gap-5 mb-3">
            <img src={lockicon} className="w-12 h-12" />
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-[22px] bg-transparent outline-none w-full placeholder:text-black font-medium"
              placeholder="Enter OTP"
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm text-start max-w-[502px] mx-auto mb-4">
              {errors.otp}
            </p>
          )}

          <div className="bg-[#F1F5F8] max-w-[502px] mx-auto rounded-xl p-6 flex items-center gap-5 mb-3">
            <img src={lockicon} className="w-12 h-12" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-[22px] bg-transparent outline-none w-full placeholder:text-black font-medium"
              placeholder="New Password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm text-start max-w-[502px] mx-auto mb-4">
              {errors.password}
            </p>
          )}

          <div className="bg-[#F1F5F8] max-w-[502px] mx-auto rounded-xl p-6 flex items-center gap-5 mb-3">
            <img src={lockicon} className="w-12 h-12" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-[22px] bg-transparent outline-none w-full placeholder:text-black font-medium"
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm text-start max-w-[502px] mx-auto mb-4">
              {errors.confirmPassword}
            </p>
          )}

          {errors.api && (
            <p className="text-red-500 text-center mt-4">{errors.api}</p>
          )}

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full h-[55px] mt-5 bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white rounded-[14px] text-[20px] font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
