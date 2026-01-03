import { useNavigate } from "react-router-dom";
import closeicon from "../assets/closeicon.svg";
import logo from "../assets/logo.svg";
import newcred from "../assets/newcredicon.svg";
import lockicon from "../assets/lockicon.svg";

export default function NewCredential() {
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

          <div className="flex items-start gap-6 mb-[37px]">
            <img src={newcred} alt="Lock" className="w-10 h-10" />
            <div>
              <h2 className="text-[32px] font-semibold text-[#00598D] leading-[1.3] mb-3">
                NEW CREDENTIALS
              </h2>
              <p className="text-[#000000B2] text-[18px] leading-[1] mb-5">
                Your identity has been verified!
              </p>
              <p className="text-[#000000B2] text-[18px] leading-[1]">
                Set your new password
              </p>
            </div>
          </div>

          <div className="bg-[#F1F5F8] max-w-[502px] mx-auto rounded-xl p-6 flex items-center gap-5 mb-6 cursor-pointer hover:bg-[#EDF2F7] transition">
            <img src={lockicon} alt="Via SMS" className="w-12 h-12" />
            <div>
              <input
                className="text-[#000] text-[22px] font-medium placeholder:text-[#000] bg-transparent outline-none"
                placeholder="New Password"
              />
            </div>
          </div>

          <div className="bg-[#F1F5F8] max-w-[502px] mx-auto rounded-xl p-6 flex items-center gap-5 cursor-pointer hover:bg-[#EDF2F7] transition">
            <img src={lockicon} alt="Via Email" className="w-12 h-12" />
            <div>
              <input
                className="text-[#000] text-[22px] font-medium placeholder:text-[#000] bg-transparent outline-none"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full h-[55px] mt-16 flex items-center justify-center bg-[linear-gradient(133.68deg,#2CBEFF_1.1%,#00598D_98.9%)] text-white py-3 rounded-[14px] text-[20px] font-medium hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
