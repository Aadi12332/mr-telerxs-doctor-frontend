export function Input({ label, value }: { label?: string; value?: string }) {
  return (
    <div>
      <label className="block lg:mb-3 mb-1 lg:text-[20px] text-base">{label}</label>
      <input
        value={value}
        className="w-full border lg:rounded-[20px] rounded-lg border-[#00000033] lg:text-[20px] text-base placeholder:text-[#00000080] lg:h-[56px] h-[40px] px-4 py-3 outline-none"
      />
    </div>
  );
}
