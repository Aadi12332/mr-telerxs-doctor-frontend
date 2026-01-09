import { axiosInstance } from "./axiosInstance";

export const authLoginApi = (payload: {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}) => {
  return axiosInstance.post("/api/v1/auth/doctor/login", payload);
};

export const loginOtpApi = (payload: {
  identifier: string;
}) => {
  return axiosInstance.post("/api/v1/auth/login-otp", payload);
};

export const verifyOtpApi = (payload: {
  identifier: string;
  otp: string;
}) => {
  return axiosInstance.post("/api/v1/auth/login-otp", payload);
};

export const resendOtpApi = (payload: {
  phoneNumber: string;
}) => {
  return axiosInstance.post(
    "/api/v1/auth/resend-otp",
    payload
  );
};

export const forgotPasswordApi = (payload: {
  identifier: string;
}) => {
  const isPhone = /^\d{10}$/.test(payload.identifier);

  return axiosInstance.post(
    "/api/v1/auth/forgot-password",
    isPhone
      ? {
          identifier: payload.identifier,
          countryCode: "+91",
        }
      : {
          identifier: payload.identifier,
        }
  );
};

export const changePasswordApi = (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  return axiosInstance.put("/api/v1/auth/change-password", payload);
};

export const createDoctorApi = (payload: {
  firstName: string;
  lastName: string;
  middleInitial?: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  specialty: string;
  licenseNumber: string;
  experience: number;
  hospitalAffiliation: string;
  languages: string[];
  bio: string;
  consultationFee: number;
  password: string;
  agreeConfirmation: boolean;
  profilePicture?: string;
  medicalLicense?: string;
}) => {
  return axiosInstance.post(
    "/api/v1/auth/doctor/register",
    payload
  );
};

export const resetPasswordApi = (payload: {
  identifier: string;
  otp: string;
  newPassword: string;
}) => {
  return axiosInstance.post("/api/v1/auth/reset-password", payload);
};


