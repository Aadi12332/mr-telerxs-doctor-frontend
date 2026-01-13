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

export const updateDoctorApi = (
  doctorId: string,
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    specialty: string;
    licenseNumber: string;
    licenseVerified: boolean;
    consultationFee: number;
    status: string;
    experience: number;
    isActive: boolean;
    bio: string;
    profilePicture?: string;
    profileImage?: {
      url: string;
      verified: boolean;
    };
    medicalLicense?: {
      licenseNumber: string;
      documentUrl: string;
      verified: boolean;
    };
    education?: {
      degree: string;
      institution: string;
      year: number;
    }[];
    certifications?: {
      name: string;
      issuingOrganization?: string;
      issuedBy: string;
      year: number;
    }[];
    languages?: string[];
    availability?: {
      days: string[];
      timeSlots: {
        from: string;
        to: string;
      }[];
    };
    address?: {
      clinicName: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
    bankAccount?: {
      accountHolderName: string;
      bankName: string;
      accountNumber: string;
      routingNumber?: string;
      accountType: string;
      ifscCode: string;
      swiftCode?: string;
      verified: boolean;
    };
  }
) => {
  return axiosInstance.put(
    `/api/v1/admin/doctors/${doctorId}`,
    payload
  );
};

export const getDoctorDashboardOverviewApi = (doctorId: string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/overview",
    {
      params: { doctorId },
    }
  );
};

export const getDoctorTodaysScheduleApi = (doctorId: string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/todays-schedule",
    {
      params: { doctorId },
    }
  );
};

export const getDoctorRecentConsultationsApi = (doctorId: string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/recent-consultations",
    {
      params: { doctorId },
    }
  );
};

export const getConsultationsApi = (doctorId: string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/recent-consultations",
    {
      params: { doctorId },
    }
  );
};
export const getConsultationsFilterApi = ({
  doctorId,
  status,
  search,
  page = 1,
  limit = 10,
}: {
  doctorId: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get(
    `/api/v1/doctor/consultations/doctor/${doctorId}`,
    {
      params: {
        ...(status && { status }),
        ...(search && { search }),
        ...(page&&{page}),
        ...(limit&&{limit}),
      },
    }
  );
};
export const getProfileApi = ({
  doctorId
}: {
  doctorId: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return axiosInstance.get(
    `api/v1/admin/doctors/${doctorId}`
  );
};


