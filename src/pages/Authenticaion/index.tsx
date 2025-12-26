import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {LogoWhite,LoginBg,LoginTwitterIcon,LoginFacebookIcon,LoginGoogleIcon,LoginAppleIcon} from "../../assets"

import AuthenticationPage from "./AuthPage";
import BackArrow from "../../assets/backarrow.svg";
const AuthPage = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [isBtnType, setBtnType] = useState("");

  useEffect(() => {
    if (params.pathname === "/login") {
      return;
    }
    if (params.pathname === "/signup") {
      setBtnType("signup");
      return;
    }
  }, [params]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2A2E55] relative">
      <div className="flex gap-10 items-center absolute top-5 left-5">
        <img
          src={BackArrow}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            if (isBtnType) {
              setBtnType("");
            } else {
              navigate("/");
            }
          }}
        />
        <img
          src={LogoWhite}
          alt=""
          className="w-[200px] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <img src={LoginBg} alt="" className="w-[100vw] h-[100vh] object-cover" />
      {isBtnType === "" && (
        <div className="max-h-[90vh] overflow-auto bg-[linear-gradient(111.7deg,_rgba(32,51,244,0.2)_6.23%,_rgba(153,153,153,0.2)_97.88%)] border border-[#FFFFFF80] backdrop-blur-[6.099999904632568px] space-y-4 rounded-2xl p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[897px] w-[90%]">
          <div className="flex flex-col items-center text-white">
            <h2 className="text-3xl font-semibold">Let’s Get Started!</h2>
            <p className="mt-2 text-white/70">Let’s dive into your account</p>

            <div className="mt-10 grid w-full max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
              <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-6 py-4 backdrop-blur-[6px]">
                <img src={LoginGoogleIcon} className="h-6 w-6" />
                <span className="text-lg font-medium">
                  Continue with Google
                </span>
              </button>

              <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-6 py-4 backdrop-blur-[6px]">
                <img src={LoginAppleIcon} className="h-6 w-6" />
                <span className="text-lg font-medium">Continue with Apple</span>
              </button>

              <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-6 py-4 backdrop-blur-[6px]">
                <img src={LoginFacebookIcon} className="h-6 w-6" />
                <span className="text-lg font-medium">
                  Continue with Facebook
                </span>
              </button>

              <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-6 py-4 backdrop-blur-[6px]">
                <img src={LoginTwitterIcon} className="h-6 w-6" />
                <span className="text-lg font-medium">
                  Continue with Twitter
                </span>
              </button>
            </div>

            <button
              onClick={() => setBtnType("signup")}
              className="mt-10 w-full max-w-[520px] rounded-xl bg-[#1F7AE0] py-4 text-lg font-semibold"
            >
              SIGN UP
            </button>

            <button
              onClick={() => setBtnType("login")}
              className="mt-4 w-full max-w-[520px] rounded-xl bg-white/20 py-4 text-lg font-semibold backdrop-blur"
            >
              LOG IN
            </button>

            <p className="mt-8 max-w-[520px] text-center text-sm text-white/70">
              By proceeding further you agree to our{" "}
              <span className="font-semibold text-white">
                Terms & conditions
              </span>{" "}
              <br />
              and{" "}
              <span className="font-semibold text-white">Privacy policy</span>
            </p>
          </div>
        </div>
      )}
      {["login", "signup"].includes(isBtnType) && (
        <AuthenticationPage isBtnType={isBtnType} setBtnType={setBtnType} />
      )}
    </div>
  );
};

export default AuthPage;
