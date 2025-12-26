import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { loginSchema, type LoginFormValues } from "../../schema/login.schema";
import { loginApi, signupApi } from "../../api/auth.api";
import { setToken } from "../../utils/storage";
import {
  signupSchema,
  type SignupFormValues,
} from "../../schema/signup.schema";
import { z } from "zod";
import type { FieldErrors } from "react-hook-form";

const obj = {
  login: "Log In",
  signup: "Sign Up",
};
type AuthFormValues = z.infer<
  typeof loginSchema | typeof signupSchema
>;


const AuthenticationForm = ({ isBtnType,setBtnType }: { isBtnType: string,setBtnType:React.Dispatch<React.SetStateAction<string>> }) => {
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {  isSubmitting, isValid,errors:errorsFormState },
    setValue,
    watch,
    reset
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isBtnType === "login" ? loginSchema : signupSchema),
    mode: "onChange",
    defaultValues: {
      mode: "email",
    },
  });
  const errors = errorsFormState as FieldErrors<{
  email?: string;
  mobile?: string;
  password?: string;
  rePassword?: string;
}>;

  const navigate = useNavigate();
  const mode = watch("mode");
  const email = watch("email");
  const password = watch("password");
  const rePassword = watch("rePassword");
  const mobile = watch("mobile");
  const isFormFilled =
    mode === "email" ? !!email && !!password : !!mobile && !!password;
  const isSignupFilled = isBtnType === "signup" ? !!rePassword : true;
  const disableButton =
    !isFormFilled || !isSignupFilled  || isSubmitting|| !isValid;
  const onSubmit = async (data: LoginFormValues | SignupFormValues) => {
    try {
      setLoading(true);
      console.log(data)
      const payload =
  data.mode === "email"
    ? {
        email: data.email,
        password: data.password,
        ...(isBtnType === "signup" && { rePassword: data.rePassword }),
        region: "+91",
      }
    : {
        mobileNumber: data.mobile,
        password: data.password,
        ...(isBtnType === "signup" && { rePassword: data.rePassword }),
        region: "+91",
      };

      if (isBtnType === "login") {
        const res = await loginApi(payload);
        setToken(res.data.data);
        toast.success("Login successful");
        reset();
        navigate("/dashboard");

        return;
      }
      if (isBtnType === "signup") {
        const res = await signupApi(payload);
        setToken(res.data.data);
        toast.success("Signup successful");
        setBtnType("login");
        navigate("/login");
        reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="mb-8 text-center text-3xl font-semibold">
          {obj[isBtnType as keyof typeof obj]} Using Number or email
        </h2>

        <div className="mx-auto mb-8 flex w-full max-w-[360px] rounded-xl bg-white/10 backdrop-blur">
          <Button
            title="Mobile"
            type="button"
            onClick={() => setValue("mode", "mobile")}
            className={`flex-1 !rounded-l-lg !rounded-none  py-3 hover:!bg-[#3E7BD6] hover:!text-[#fff] !border-0 text-center font-medium ${
              mode === "mobile" ? "!bg-[#3E7BD6] shadow-[4px_4px_0px_0px_lightgray]" : "bg-[#A79B771C]"
            }`}
          />

          <Button
            title="Email"
            type="button"
            onClick={() => setValue("mode", "email")}
            className={`flex-1 !rounded-r-lg !rounded-none  py-3 hover:!bg-[#3E7BD6] hover:!text-[#fff] !border-0 text-center font-medium ${
              mode === "email" ? "!bg-[#3E7BD6] shadow-[4px_4px_0px_0px_lightgray]" : "bg-[#A79B771C]"
            }`}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[520px] text-white"
          noValidate
        >
          <div className="flex flex-col gap-6">
            {mode === "email" && (
              <>
                <Input
                  type="email"
                  placeholder="Email"
                  label="Email Address"
                  icon={<span className="opacity-70">✉️</span>}
                  className="w-full bg-transparent outline-none placeholder:text-white/60"
                  {...register("email")}
                  error={ errors.email?.message}
                  required={false}
                />
              </>
            )}

            {mode === "mobile" && (
              <>
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  label="Mobile Number"
                  icon={<span className="opacity-70">+91</span>}
                  className="w-full bg-transparent outline-none placeholder:text-white/60"
                  {...register("mobile")}
                  error={errors.mobile?.message}
                />
              </>
            )}
            <div>
              <Input
                type="password"
                placeholder="Password"
                icon={<span className="opacity-70">🔒</span>}
                label="Password"
                isPassword={true}
                className="w-full bg-transparent outline-none placeholder:text-white/60"
                {...register("password")}
                error={errors.password?.message}
              />

              {isBtnType === "login" && (
                <div className="mt-1 text-right text-sm text-white/80">
                  Forgot Password?
                </div>
              )}
            </div>
            {isBtnType === "signup" && (
              <div>
                <Input
                  type="password"
                  placeholder="Re-Enter Password"
                  icon={<span className="opacity-70">🔒</span>}
                  label="Re-Enter Password"
                  isPassword={true}
                  className="w-full bg-transparent outline-none placeholder:text-white/60"
                  {...register("rePassword")}
                  error={errors.rePassword?.message}
                />
              </div>
            )}
            <Button
              title={obj[isBtnType as keyof typeof obj]}
              type="submit"
              disabled={disableButton}
              loading={loading}
              className="w-full rounded-xl mt-4"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthenticationForm;
