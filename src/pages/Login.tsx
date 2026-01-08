import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authLoginApi } from "../api/auth.api";
import loginsideimg from "../assets/loginimg.jpg";
import closeicon from "../assets/closeicon.svg";
import closeeyeicon from "../assets/closeeyeicon.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import logo from "../assets/logo.svg";
import checkedicon from "../assets/checkedicon.svg";

type LoginForm = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpChecked, setOtpChecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm<LoginForm>({
    defaultValues: { rememberMe: false },
  });

  const identifierValue = watch("identifier");

  const isPhone = (v: string) => /^\d{10}$/.test(v);
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const onSubmit = async (data: LoginForm) => {
    setApiError("");
    try {
      const res = await authLoginApi(data);
      if (res?.data?.success) {
        navigate("/dashboard");
      } else {
        setApiError("Invalid email/phone or password");
      }
    } catch (err: any) {
      setApiError(err?.response?.data?.message || "Something went wrong");
    }
  };
useEffect(() => {
    setValue("rememberMe", rememberMe);
  }, [rememberMe]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E9ED] xl:px-12 lg:px-8 px-3 lg:py-16 py-3">
      <div className="w-full max-w-[1440px] mx-auto flex gap-7 items-center">
        <div className="xl:max-w-[519px] flex-1 w-full lg:block hidden">
          <img
            src={loginsideimg}
            alt="Login Side"
            className="h-[calc(100vh-128px)] w-full rounded-[18px] object-cover"
          />
        </div>

        <div className="flex-1 relative pt-7 pb-10 xl:px-16 lg:px-8 px-3 bg-white rounded-3xl">
          <button className="absolute top-5 right-5">
            <img src={closeicon} alt="Close" className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" />
          </div>

          <h2 className="text-[32px] font-bold text-[#00598D]">Sign in</h2>
          <p className="text-[#465D7C] text-[20px] mb-2.5">
            We'll send a confirmation code to your email.
          </p>

          <p className="text-base text-[#012047] mb-[60px]">
            Sign in with{" "}
            <span className="text-[#0E82FD]">
              Phone Number or Email Address
            </span>
          </p>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

          {otpError && <p className="text-red-500 text-sm mb-4">{otpError}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#012047] mb-1 inline-block">
                Email/Phone
              </label>
              <input
                {...register("identifier", {
                  required: "Email or phone is required",
                  validate: (v) =>
                    isEmail(v) ||
                    isPhone(v) ||
                    "Enter valid email or 10 digit phone",
                })}
                type="text"
                className="w-full border border-[#E6E8EE] rounded-[5px] px-4 py-2 outline-none"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-[#012047]">
                  Password
                </label>
                <span
                  className="text-sm text-[#0E82FD] cursor-pointer"
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password?
                </span>
              </div>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-[#E6E8EE] rounded-[5px] px-4 py-2 pr-10 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5"
                >
                  <img
                    src={showPassword ? closeeyeicon : EyeIcon}
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm mb-[56px]">
              <label
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
              >
                
                {rememberMe ? (
                  <img src={checkedicon} alt="" className="w-5" />
                ) : (
                  <span className="w-5 h-5 rounded-md border border-[#0E82FD]" />
                )}

                <span className="text-[#012047] text-[14px] font-medium">
                  Remember Me
                </span>
              </label>

              <span
                className="flex items-center gap-2 text-[#012047] text-[14px] font-medium cursor-pointer"
                onClick={() => {
                  setOtpError("");
                  if (!isPhone(identifierValue || "")) {
                    setOtpError("Mobile number required for OTP login");
                    return;
                  }
                  setOtpChecked(true);
                  navigate("/otp");
                }}
              >
                {otpChecked ? (
                  <img src={checkedicon} alt="" className="w-5" />
                ) : (
                  <span className="w-5 h-5 rounded-md border border-[#0E82FD]" />
                )}
                Login With OTP
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-[55px] bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white rounded-[14px] text-[20px] font-medium"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-base text-[#465D7C] mt-[40px]">
            Don’t have account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#0E82FD] cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
