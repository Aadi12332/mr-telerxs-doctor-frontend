import { useState } from "react";
import closeeyeicon from "../../assets/closeeyeicon.svg";
import EyeIcon from "../../assets/EyeIcon.svg";

type InputProps = {
  label?: string;
  value?: string;
  type?: string;
  onChange?: (e: string) => void;
  labelClassName?: string;
  className?: string;
  error?: string;
};

export function Input({
  label,
  value,
  type = "text",
  onChange,
  labelClassName = "",
  className = "",
  error
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>
      {label && (
        <label className={`${labelClassName} block lg:mb-3 mb-1 lg:text-[20px] text-base`}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`${className} w-full border lg:rounded-[20px] rounded-lg border-[#00000033] lg:text-[20px] text-base placeholder:text-[#00000080] lg:h-[56px] h-[40px] px-4 py-3 outline-none pr-10`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <img
              src={showPassword ? closeeyeicon : EyeIcon}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
       {error && <p className="text-red-500 md:text-sm text-xs mt-1">{error}</p>}
    </div>
  );
}
