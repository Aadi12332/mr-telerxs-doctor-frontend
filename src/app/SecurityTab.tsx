import { Input } from "../components/common/Input";

export function SecurityTab() {

  return (
    <div className="border border-[#00000033] lg:rounded-[20px] rounded-lg lg:p-6 p-3">
      <h3 className="text-[24px] font-medium lg:mb-[52px] mb-5">Change Password</h3>
      <div className="flex flex-col gap-6 mb-8">
        <Input label="Current Password" value="" />
        <Input label="New Password" value="" />
        <Input label="Confirm New Password" value="" />
      </div>
      <div className="flex justify-end">
        <button className="bg-[#00598D] text-white px-6 py-2 rounded-[10px] text-[16px] font-medium">
          Update Password
        </button>
      </div>
    </div>
  );
}
