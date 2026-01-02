import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  title: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  upperSide?: boolean;
};

export default function CustomSelect({
  title,
  options,
  value,
  onChange,
  width = "150px",
  upperSide = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || title;

  return (
    <div ref={ref} className="relative" style={{ width }}>
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full bg-white px-4 h-[40px]
          rounded-[8px] border
          flex items-center justify-between
          text-sm
        "
      >
        <span className="truncate text-[#111827]">{selectedLabel}</span>

        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`
            absolute w-full bg-white rounded-[8px] border shadow-lg
            overflow-hidden z-50
            ${upperSide ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="
                  w-full px-4 py-2
                  flex items-center justify-between
                  text-sm hover:bg-gray-50
                "
              >
                <span className="text-start">{opt.label}</span>

                {selected && (
                  <svg
                    className="w-4 h-4 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

