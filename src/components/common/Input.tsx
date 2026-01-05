export function Input({ label, value }: { label?: string; value?: string }) {
  return (
    <div>
      <label className="block mb-3 text-[20px]">{label}</label>
      <input
        value={value}
        className="w-full border rounded-[20px] border-[#00000033] text-[20px] placeholder:text-[#00000080] h-[56px] px-4 py-3 outline-none"
      />
    </div>
  );
}
