import { useNavigate } from "react-router-dom";
import closeicon from "../assets/closeicon.svg";
import logo from "../assets/logo.svg";
import forgetpasswordicon from "../assets/forgotpasswordicon.svg";
import viasmsicon from "../assets/viasmsicon.svg";
import viaemailicon from "../assets/vaimailicon.svg";

export default function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E9ED] lg:px-12 px-3 lg:py-16 py-3">
      <div className="w-full max-w-[861px] mx-auto">
        <div className="relative bg-white rounded-3xl lg:px-16 px-5 pt-7 pb-16">
          <button
            className="absolute top-6 right-6"
            onClick={() => navigate("/login")}
          >
            <img src={closeicon} alt="Close" className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="lg:w-[184px]" />
          </div>

          <div className="flex items-start gap-6 mb-[58px]">
            <img src={forgetpasswordicon} alt="Lock" className="w-10 h-10" />
            <div>
                <h2 className="text-[32px] font-semibold text-[#00598D] leading-[1.4] mb-2">
                    FORGET PASSWORD
                </h2>
                <p className="text-[#465D7C] text-[18px] leading-[1]">
                    Select which contact detail should we use to reset your password?
                </p>
            </div>
          </div>


          <div
            className="bg-[#F1F5F8] max-w-[488px] mx-auto rounded-xl p-6 flex items-center gap-5 mb-6 cursor-pointer hover:bg-[#EDF2F7] transition"
            onClick={() => navigate("/new-credential")}
          >
            <img src={viasmsicon} alt="Via SMS" className="w-12 h-12" />
            <div>
              <p className="text-[#000] text-[18px] font-medium">
                Via Sms:
              </p>
              <p className="text-[#000] text-[22px] font-medium">
                +91876543210
              </p>
            </div>
          </div>

          <div
            className="bg-[#F1F5F8] max-w-[488px] mx-auto rounded-xl p-6 flex items-center gap-5 cursor-pointer hover:bg-[#EDF2F7] transition"
            onClick={() => navigate("/new-credential")}
          >
            <img src={viaemailicon} alt="Via Email" className="w-12 h-12" />
            <div>
              <p className="text-[#000] text-[18px] font-medium">
                Via Mail:
              </p>
              <p className="text-[#000] text-[22px] font-medium">
                waseemakram987@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
