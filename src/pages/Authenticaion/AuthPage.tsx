import LoginForm from "./AuthenticationForm";
import {LoginTwitterIcon,LoginFacebookIcon,LoginGoogleIcon,LoginAppleIcon} from "../../assets"
const AuthenticationPage = ({isBtnType,setBtnType}:{isBtnType:string,setBtnType:React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <div
        className="lg:max-h-[98vh] max-h-[70vh] overflow-auto bg-[linear-gradient(111.7deg,_rgba(32,51,244,0.2)_6.23%,_rgba(153,153,153,0.2)_97.88%)] border border-[#FFFFFF80] backdrop-blur-[6.099999904632568px] space-y-4 rounded-2xl p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[639px] w-[90%]"
      >
        <div className="flex flex-col items-center text-white">

          <LoginForm isBtnType={isBtnType} setBtnType={setBtnType}/>
          <div className="flex gap-3 items-center w-full my-10">
            <p className="flex-1 w-full h-[1px] bg-[#D9D9D966]"></p>
            <p>Or</p>
            <p className="flex-1 w-full h-[1px] bg-[#D9D9D966]"></p>
          </div>

          <div className="grid w-full max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
            <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-3 py-3 backdrop-blur-[6px]">
              <img src={LoginGoogleIcon} className="h-6 w-6" />
              <span className="text-lg font-medium">Continue with Google</span>
            </button>

            <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-3 py-3 backdrop-blur-[6px]">
              <img src={LoginAppleIcon} className="h-6 w-6" />
              <span className="text-lg font-medium">Continue with Apple</span>
            </button>

            <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-3 py-3 backdrop-blur-[6px]">
              <img src={LoginFacebookIcon} className="h-6 w-6" />
              <span className="text-lg font-medium">
                Continue with Facebook
              </span>
            </button>

            <button className="flex items-center gap-4 rounded-xl border border-white/50 bg-white/10 px-3 py-3 backdrop-blur-[6px]">
              <img src={LoginTwitterIcon} className="h-6 w-6" />
              <span className="text-lg font-medium">Continue with Twitter</span>
            </button>
          </div>

          <p className="mt-8 max-w-[520px] text-center text-sm text-white/70">
            By proceeding further you agree to our{" "}
            <span className="font-semibold text-white">Terms & conditions</span>{" "} <br />
            and <span className="font-semibold text-white">Privacy policy</span>
          </p>
        </div>
      </div>
  );
};

export default AuthenticationPage;
