import { useState } from "react";
import { Input } from "../components/common/Input";
import { changePasswordApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export function SecurityTab() {
  const router=useNavigate()
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    apiError?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{6,}$/;

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};
    setErrors({});

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Min 6 chars, 1 uppercase, 1 special character required";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
     const res= await changePasswordApi({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      if(res.status===200){
        router("/login")
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (err: any) {
      setErrors({
        apiError:
          err?.response?.data?.message || "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-[#00000033] lg:rounded-[20px] rounded-lg lg:p-6 p-3">
      <h3 className="text-[24px] font-medium lg:mb-[52px] mb-5">
        Change Password
      </h3>

      <div className="flex flex-col gap-6 mb-2">
        <div>
          <Input
            labelClassName="text-[#00000080]"
            label="Current Password"
            value={currentPassword}
            type="password"
            onChange={(e: any) => setCurrentPassword(e)}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-[10px] sm:text-sm mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <Input
            labelClassName="text-[#00000080]"
            label="New Password"
            value={newPassword}
            type="password"
            onChange={(e: any) => setNewPassword(e)}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-[10px] sm:text-sm mt-1">
              {errors.newPassword}
            </p>
          )}
        </div>

        <div>
          <Input
            labelClassName="text-[#00000080]"
            label="Confirm New Password"
            value={confirmPassword}
            type="password"
            onChange={(e: any) => setConfirmPassword(e)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[10px] sm:text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {errors.apiError && (
        <p className="text-red-500 text-[10px] sm:text-sm mb-4">{errors.apiError}</p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#00598D] text-white px-6 py-2.5 rounded-lg lg:rounded-[10px] mt-8 text-[16px] font-medium disabled:opacity-60"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
