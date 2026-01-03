import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginsideimg from "../assets/loginimg.jpg";
import closeicon from "../assets/closeicon.svg";
import closeeyeicon from "../assets/closeeyeicon.svg";
import eyeicon from "../assets/eyeicon.svg";
import logo from "../assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
            <img src={logo} alt="Logo" className="" />
          </div>

          <h2 className="text-[32px] font-bold text-[#00598D] leading-[1.5]">
            Sign in
          </h2>
          <p className="text-[#465D7C] text-[20px] leading-[24px] mb-2.5">
            We'll send a confirmation code to your email.
          </p>

          <p className="text-base text-[#012047] mb-[60px]">
            Sign in with{" "}
            <span className="text-[#0E82FD] cursor-pointer">
              Phone Number or Email Address
            </span>
          </p>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#012047] leading-[24px] mb-1 inline-block">
              Email/Phone
            </label>
            <input
              type="text"
              className="w-full border border-[#E6E8EE] rounded-[5px] px-4 py-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-[#012047] leading-[24px]">
                Password
              </label>
              <span className="text-sm leading-[24px] font-medium text-[#0E82FD] cursor-pointer" onClick={() => navigate("/forget-password")}>
                Forgot Password?
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-[#E6E8EE] rounded-[5px] px-4 py-2 pr-10 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                <img
                  src={showPassword ? closeeyeicon : eyeicon}
                  alt="Toggle Password"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-[56px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <span
                className="
                w-5 h-5 rounded-md
                border border-[#0E82FD]
                flex items-center justify-center
                peer-checked:bg-[#0E82FD]
                peer-checked:border-[#0E82FD]
                transition
              "
              >
                <svg
                  className=" peer-checked:block"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L5 9L13 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="text-[#012047] text-[14px] font-medium leading-[24px]">
                Remember Me
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/otp")}>
              <input type="checkbox" className="peer hidden" />
              <span
                className="
                w-5 h-5 rounded-md
                border border-[#0E82FD]
                flex items-center justify-center
                peer-checked:bg-[#0E82FD]
                peer-checked:border-[#0E82FD]
                transition
              "
              >
                <svg
                  className=" peer-checked:block"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L5 9L13 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="text-[#012047] text-[14px] font-medium leading-[24px]">
                Login With OTP
              </span>
            </label>
          </div>

          <button onClick={() => navigate("/dashboard")} className="w-full h-[55px] flex items-center justify-center bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white py-3 rounded-[14px] text-[20px] font-medium hover:opacity-90 transition">
            Sign in
          </button>

          <p className="text-center text-base text-[#465D7C] mt-[40px]">
            Don’t have account?{" "}
            <span onClick={() => navigate("/signup")} className="text-[#0E82FD] cursor-pointer font-medium">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
