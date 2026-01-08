import { axiosInstance } from "./axiosInstance";

export const loginApi = (payload: {
  email?: string;
  password?: string;
  region: string;
  mobileNumber?: string;
}) => {
  return axiosInstance.post("/api/v1/user/loginWithPhone", payload);
};

export const signupApi = (payload: {
  rePassword?: string;
  region: string;
  email?: string;
  password?: string;
  mobileNumber?: string;
}) => {
  return axiosInstance.post("/api/v1/user/signup", payload);
};

export const authLoginApi = (payload: {
  identifier: string;
  password: string;
  rememberMe: boolean;
}) => {
  return axiosInstance.post("/api/v1/auth/login", payload);
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