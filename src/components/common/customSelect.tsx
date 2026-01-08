import { useEffect, useRef, useState } from "react";
import downarrowicon from "../../assets/backlongarrow.svg";

type CustomSelectProps = {
  title?: string;
  data: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  openDirection?: "top" | "bottom";
  width?: string;
  className?: string;
  labelclassName?: string;
};

export default function CustomSelect({
  title,
  data,
  value,
  onChange,
  placeholder = "ALL",
  openDirection = "bottom",
  width = "w-full",
  className = "",
  labelclassName = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${width}`}>
      {title && (
        <label
          className={`text-base font-medium text-[#012047] mb-1 block ${labelclassName}`}
        >
          {title}
        </label>
      )}

      <div
        onClick={() => setOpen(!open)}
        className={`border border-[#D9D9D9] rounded-lg px-4 h-[56px] cursor-pointer flex justify-between items-center bg-white ${className}`}
      >
        <span className={value ? "text-[#012047]" : "text-gray-400"}>
          {value || placeholder}
        </span>

        <img
          src={downarrowicon}
          alt=""
          className={`w-4 invert transition-transform ${
            open ? "rotate-90" : "rotate-[270deg]"
          }`}
        />
      </div>

      {open && (
        <div
          className={`absolute z-20 overflow-hidden ${
            openDirection === "top" ? "bottom-[64px]" : "top-[64px]"
          } w-full bg-white border border-[#D9D9D9] rounded-lg shadow-md`}
        >
          {data.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-base"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
