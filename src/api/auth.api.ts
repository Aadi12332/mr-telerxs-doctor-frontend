import axios from "axios";
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
  consultationFee?: number | string;
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

export const getDoctorDashboardOverviewApi =async (doctorId: string,period?:string) => {
  const res=await axiosInstance.get(
    "/api/v1/doctor/dashboard/overview",
    {
      params: { doctorId, ...(period && period !== "All" && { period }) },
    }
  );
  return res;
};


export const getDoctorTodaysScheduleApi = (doctorId: string,period?:string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/todays-schedule",
    {
params: { doctorId, ...(period && period !== "All" && { period }) }    }
  );
};

export const getDoctorRecentConsultationsApi = (doctorId: string,period?:string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/recent-consultations",
    {
      params: { doctorId, ...(period && period !== "All" && { period }) },
    }
  );
};

export const getGlobalSearch = (searchParam : string) => {
  return axiosInstance.get(
    "/api/v1/doctor/dashboard/globalSearch",
    {
      params: { searchParam },
    }
  );
};

export const getPatientIntakeForm = (patientId: string) => {
  return axiosInstance.get(
    `/api/v1/patient/getIntakeFormByPatientId/${patientId}`
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

export const getNotesApi = (patientId:string) => {
  return axiosInstance.get(
    `/api/v1/patient/intakeForm/Notes/All?${patientId}`
  );
};
export const postNotesApi = (payload:any) => {
  return axiosInstance.post(
    `/api/v1/patient/intakeFormNotes/create/`,
    payload
    
  );
};

export const updateNoteApi = (id:any,payload:any) => {
  return axiosInstance.put(
    `/api/v1/patient/intakeFormNotes/${id}/`,
    payload
    
  );
};
export const deleteNoteApi = (id:any) => {
  return axiosInstance.delete(
    `/api/v1/patient/intakeFormNotes/${id}/`    
  );
};
export const getUsersApi = () => {
  return axios.get(`https://jsonplaceholder.typicode.com/users`);
};

export const createNotesApi = () => {
  return axiosInstance.post(
    "/api/v1/patient/intakeFormNotes/create",{
      intakeFormId:"",
      description:""
    }
  );
};

export const putNotesApi = () => {
  return axiosInstance.put(
    "/api/v1/patient/intakeFormNotes/",{
      intakeFormId:"",
      description:""
    }
  );
};

export const updateNotification = ( payload: any) => {
      const auth = localStorage.getItem("auth");
    const doctorId = auth ? JSON.parse(auth).doctor : null;
console.log({auth,doctorId})
  return axiosInstance.put(
    `/api/v1/admin/doctors/${doctorId?._id}`,
    payload
  );
};

export const deleteNotesApi = () => {
  return axiosInstance.delete(
    "/api/v1/patient/intakeFormNotes/"
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

export const createSpecializationApi = ({
  name,
  description,
  isActive = true,
}: {
  name: string;
  description?: string;
  isActive?: boolean;
}) => {
  return axiosInstance.post("api/v1/admin/specializations", {
    name,
    description,
    isActive,
  });
};


export const getSpecializationsApi = ({
  page = 1,
  limit = 50,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return axiosInstance.get("api/v1/admin/specializations", {
    params: {
      page,
      limit,
      search,
    },
  });
};


  export const getPatientList = () => {
  return axiosInstance.get("api/v1/admin/patients",{
    params:{
      page:1,
      limit:100
    }
  });
};

 export const getDoctorConsultations = (doctorId: string) => {
  return axiosInstance.get(`api/v1/doctor/consultations/${doctorId}`);
};

 export const getNotification = () => {
  return axiosInstance.get(`api/v1/patient/notifications/`);
};

 export const getOrderList = () => {
  return axiosInstance.get(`api/v1/doctor/order/getOrdersForDoctor`);
};

export const getOrdersByDoctorApi = (orderId: string) => {
  return axiosInstance.get(
    `/api/v1/doctor/order/orders/${orderId}`
  );
};

export const createPrescriptionApi = (payload: {
  doctor: string;
  patientId: string;
  medicine: string;
  brand: string;
  description: string;
  duration: string;
  frequency: string;
  refillsAllowed: number|string;
  instruction: string;
  warning: string;
  patientName: string;
}) => {
  return axiosInstance.post("/api/v1/patient/prescriptions/create", payload);
};

export const sendPharmacyApi = ({prescriptionData, orderId}: {
  orderId?:string;
  prescriptionData: {
    doctor: string;
    patientId: string;
    medicine: string;
    brand: string;
    description: string;
    duration: string;
    frequency: string;
    refillsAllowed: number|string;
    instruction: string;
    warning: string;
    patientName: string;
  }  
}) => {
  return axiosInstance.post("/api/v1/doctor/order/ordersByDoctorWithPrescription", {  orderId, prescriptionData});
};